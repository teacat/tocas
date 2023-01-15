package main

import (
	"context"
	"fmt"
	cp "github.com/otiai10/copy"
	"github.com/samber/lo"
	"github.com/sourcegraph/conc/pool"
	"github.com/vbauerster/mpb/v8"
	"github.com/vbauerster/mpb/v8/decor"
	"log"
	"math"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"
	"text/template"

	"github.com/urfave/cli/v2"
	"gopkg.in/yaml.v2"
)

// build
func build(c *cli.Context) (err error) {
	// Build context
	ctx := context.Background()

	// 取得該語系裡所有的元件檔案。
	lang := c.String("lang")

	// 要編譯的 components 總數
	files, err := os.ReadDir(path.Join(ProjectDir(), "languages", lang, "components"))
	if err != nil {
		return err
	}

	// Progress bar
	p := mpb.New(mpb.WithWidth(64))
	name := fmt.Sprintf("Components (%s)", lang)
	total := int64(len(files)) + 2
	bar := createProgressBar(p, name, total)
	log.SetOutput(p)

	// 建立暫存資料夾，用來存放 dist 檔案
	tmpdir, err := os.MkdirTemp("", "*-tocas-build")
	if err != nil {
		return err
	}
	defer func(path string) {
		err := os.RemoveAll(path)
		if err != nil {
			panic(err)
		}
	}(tmpdir)

	// 將 `/assets`, `/src` 和 `/examples` 放入暫存資料夾
	err = copyFromProjects(ctx, []DirMap{
		DMap(
			path.Join(ExecutableDir(), "templates", "assets"),
			"assets",
		), DMap(
			path.Join(ProjectDir(), "src"),
			"assets/tocas",
		), DMap(
			path.Join(ProjectDir(), "examples"),
			"examples",
		),
	}, tmpdir)
	if err != nil {
		return err
	}

	// 建立該語系文件自己的資料夾。
	if err != nil {
		return err
	}
	// 重新複製一份模板的 `/assets` 進去。

	// 載入這個文件語系的 `meta.yml` 主要中繼檔案。
	meta, err := readLanguageMeta(lang)
	if err != nil {
		return err
	}

	// 在這個語系的 Meta 裡擺放所有其他語系的 `MetaInformation`，
	// 這樣我們才能顯示那些語系的名稱。
	meta.GlobalInformations, err = listMetaInformation(ctx)
	if err != nil {
		return err
	}

	// 準備好模板裡會用到的所有 Func。
	fmap := funcMap(meta)

	createArticle := func() Article {
		return Article{Meta: meta}
	}

	// 建立一個貯存 articles 任務的 errgroup
	group := pool.New().WithContext(ctx).WithMaxGoroutines(
		// 把 limits 讓給下方的 tmplCode
		int(math.Max(float64(runtime.NumCPU()/2), 1)),
	)

	/**
	 * index.html
	 */
	group.Go(func(ctx context.Context) error {
		defer bar.Increment()
		defer log.Printf("已編譯：index.html")

		select {
		case <-ctx.Done():
			return nil
		default:
			article := createArticle()

			file, err := os.Create(path.Join(tmpdir, "index.html"))
			if err != nil {
				return err
			}

			tmpl, err := template.New("index.html").Funcs(fmap).ParseFiles(templatePath("index"))
			if err != nil {
				return err
			}

			return tmpl.Execute(file, article)
		}
	})

	/**
	 * examples.html
	 */
	group.Go(func(ctx context.Context) error {
		defer bar.Increment()
		defer log.Printf("已編譯：examples.html")

		select {
		case <-ctx.Done():
			return nil
		default:
			article := createArticle()

			b, err := os.ReadFile(path.Join(ProjectDir(), "languages", lang, "components", "examples.yml"))
			if err != nil {
				return err
			}
			if err = yaml.Unmarshal(b, &article); err != nil {
				return err
			}

			file, err := os.Create(path.Join(tmpdir, "examples.html"))
			if err != nil {
				return err
			}
			if err = yaml.Unmarshal(b, &article); err != nil {
				return err
			}

			tmpl, err := template.New("examples.html").Funcs(fmap).ParseFiles(templatePath("examples"))
			if err != nil {
				return err
			}

			return tmpl.Execute(file, article)
		}
	})

	/**
	 * [component].html
	 */
	tmpl, err := template.New("article.html").Funcs(fmap).ParseFiles(templatePath("article"))
	if err != nil {
		return err
	}
	// 處理每個元件的頁面。
	for _, f := range files {
		// 不要編譯 `examples.yml`，因為那個頁面我們剛才獨立處理了。
		if f.Name() == "examples.yml" {
			continue
		}

		// 防止 `for` 迴圈覆蓋變數。
		f := f

		group.Go(func(ctx context.Context) error {
			defer bar.Increment()

			select {
			case <-ctx.Done():
				return nil
			default:
				group := pool.New().WithContext(ctx)
				group.WithMaxGoroutines(runtime.NumCPU())

				sectionName := strings.TrimSuffix(f.Name(), filepath.Ext(f.Name()))
				defer log.Printf("已編譯：%s.html", sectionName)

				file, err := os.Create(path.Join(tmpdir, sectionName+".html"))
				if err != nil {
					return err
				}

				name := fmt.Sprintf("Temlcode (%s)", sectionName)
				bar := createProgressBar(p, name, 0)
				defer bar.Abort(true)

				article := Article{
					This: sectionName,
					Meta: meta,
				}

				b, err := os.ReadFile(path.Join(ProjectDir(), "languages", lang, "components", f.Name()))
				if err != nil {
					return err
				}
				if err = yaml.Unmarshal(b, &article); err != nil {
					return err
				}

				// 如果這個元件的範例 HTML 不是空的話，就透過 Highlight JS 跟 Beautify 處理。
				if article.Example.HTML != "" {
					group.Go(func(ctx context.Context) error {
						bar.SetTotal(bar.Current()+1, false)
						defer bar.Increment()

						select {
						case <-ctx.Done():
						default:
							article.Example.FormattedHTML = tmplCode(
								trim(article.Example.HTML, article.Example.Remove),
							)
						}

						return nil
					})
				}

				// 事後幫 HTML 加上 alt，避免出現在 FormattedHTML 裡。
				article.Example.HTML = imgAlt(meta, article.Example.HTML)
				for vi, v := range article.Definitions {
					definitions := &article.Definitions[vi]

					for ji, j := range v.Sections {
						section := &definitions.Sections[ji]
						j := j

						// 如果這個段落有附加的 HTML 片段，就透過 Highlight JS 跟 Beautify 處理。
						if j.AttachedHTML != "" {
							group.Go(func(ctx context.Context) error {
								bar.SetTotal(bar.Current()+1, false)
								defer bar.Increment()

								select {
								case <-ctx.Done():
								default:
									section.FormattedHTML = tmplCode(trim(trim(j.AttachedHTML, j.Remove), article.Remove))
								}

								return nil
							})
						}

						// 如果這個段落有 HTML 標籤內容，就透過 Highlight JS 跟 Beautify 處理。
						if j.HTML != "" {
							group.Go(func(ctx context.Context) error {
								bar.SetTotal(bar.Current()+1, false)
								defer bar.Increment()

								select {
								case <-ctx.Done():
								default:
									section.FormattedHTML = tmplCode(trim(trim(j.HTML, j.Remove), article.Remove))
								}

								return nil
							})
						}

						// 事後幫 HTML 加上 alt，避免出現在 FormattedHTML 裡。
						section.HTML = imgAlt(meta, j.HTML)
					}
				}

				if err = group.Wait(); err != nil {
					return err
				}

				return tmpl.Execute(file, article)
			}
		})
	}

	if err := group.Wait(); err != nil {
		return err
	}

	// 將暫存資料夾的結果複製到 docs 中
	docsDir := path.Join(ProjectDir(), "docs", lang)
	if err := os.RemoveAll(docsDir); err != nil {
		return err
	}
	if err := cp.Copy(tmpdir, docsDir); err != nil {
		return err
	}

	return nil
}

// templatePath gets the path of specified template.
func templatePath(template string) string {
	return path.Join(ExecutableDir(), "templates", template+".html")
}

// copyFromProjects 會從專案複製資料夾到暫存資料夾。
func copyFromProjects(ctx context.Context, src []DirMap, tgt string) error {
	group := pool.New().WithContext(ctx)

	for _, s := range src {
		// 防止 `for` 迴圈覆蓋變數。
		s := s
		group.Go(func(ctx context.Context) error {
			select {
			case <-ctx.Done():
				return nil
			default:
				return cp.Copy(s.Src(), s.TargetBasedOn(tgt))
			}
		})
	}

	return group.Wait()
}

// readLanguageMeta 載入這個文件語系的 `meta.yml` 主要中繼檔案。
func readLanguageMeta(language string) (meta Meta, error error) {
	b, err := os.ReadFile(path.Join(ProjectDir(), "languages", language, "meta.yml"))
	if err != nil {
		return
	}

	err = yaml.Unmarshal(b, &meta)
	if err != nil {
		return
	}

	return
}

// listMetaInformation 會取得所有文件裡的 `MetaInformation`，
// 這樣才能從 `zh-tw` 文件中取得如何稱呼 `en-us`。
func listMetaInformation(ctx context.Context) ([]MetaInformation, error) {
	group := pool.New().WithContext(ctx)
	availableDirectories, err := os.ReadDir(path.Join(ProjectDir(), "languages"))
	if err != nil {
		return nil, err
	}

	infos := make([]MetaInformation, len(availableDirectories))
	languages := lo.Map(availableDirectories, func(item os.DirEntry, _ int) string {
		return item.Name()
	})

	for index, lang := range languages {
		// 防止 `for` 迴圈覆蓋變數。
		index, lang := index, lang

		group.Go(func(ctx context.Context) error {
			select {
			case <-ctx.Done():
				return nil
			default:
				meta, err := readLanguageMeta(lang)
				if err != nil {
					return err
				}

				infos[index] = meta.Information
				return nil
			}
		})
	}

	return infos, nil
}

// funcMap 會回傳常用的 `FuncMap` 函式。
func funcMap(meta Meta) template.FuncMap {
	return template.FuncMap{
		"html":        tmplHTML,
		"capitalize":  tmplCapitalize,
		"highlight":   tmplHighlight,
		"code":        tmplCode,
		"markdown":    tmplMarkdown,
		"preview":     tmplPreview,
		"marked":      tmplMarked,
		"kebablize":   tmplKebablize,
		"trim":        tmplTrim,
		"anchor":      tmplAnchor,
		"i18n":        tmplI18N(meta),
		"translators": tmplTranslators(meta),
	}
}

// asset
func asset(s string, real bool) string {
	if real {
		switch s {
		case "16:9":
			s = "16-9.png"
		case "1:1":
			s = "1-1.png"
		case "1:1_white":
			s = "1-1_white.png"
		case "4:3":
			s = "4-3.png"
		case "user":
			s = "user.png"
		case "user2":
			s = "user2.png"
		case "user3":
			s = "user3.png"
		}
		return "./assets/images/" + s
	}
	switch s {
	case "16:9", "1:1", "1:1_white", "4:3":
		s = "image.png"
	case "user", "user2", "user3":
		s = "user.png"
	}
	return s
}

// replaceAllStringSubmatchFunc
func replaceAllStringSubmatchFunc(re *regexp.Regexp, str string, repl func([]string) string) string {
	result := strings.Builder{}
	lastIndex := 0
	for _, v := range re.FindAllSubmatchIndex([]byte(str), -1) {
		// Preallocate the group storage.
		groups := make([]string, 0, len(v)/2+1)

		for i := 0; i < len(v); i += 2 {
			groups = append(groups, str[v[i]:v[i+1]])
		}

		result.WriteString(str[lastIndex:v[0]])
		result.WriteString(repl(groups))
		lastIndex = v[1]
	}

	result.WriteString(str[lastIndex:])
	return result.String()
}

func createProgressBar(p *mpb.Progress, name string, total int64) *mpb.Bar {
	return p.AddBar(total,
		mpb.PrependDecorators(
			// display our name with one space on the right
			decor.Name(name, decor.WC{W: len(name) + 1, C: decor.DSyncSpaceR}),
			// replace ETA decorator with "done" message, OnComplete event
			decor.OnComplete(
				decor.AverageETA(decor.ET_STYLE_GO, decor.WC{W: 14, C: decor.DSyncSpace}), "done!",
			),
			decor.OnComplete(
				decor.CountersNoUnit("%d / %d", decor.WC{W: 14, C: decor.DSyncSpace}),
				"",
			),
		),
		mpb.AppendDecorators(decor.OnComplete(decor.Percentage(), "")),
	)
}
