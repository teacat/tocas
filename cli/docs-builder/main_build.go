package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	cp "github.com/otiai10/copy"
	"github.com/samber/lo"
	"html"
	"log"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"regexp"
	"strings"
	"text/template"

	"github.com/russross/blackfriday/v2"
	"github.com/urfave/cli/v2"
	"golang.org/x/sync/errgroup"
	"gopkg.in/yaml.v2"
)

// build
func build(c *cli.Context) (err error) {
	// Build context
	ctx := context.Background()

	// 取得該語系裡所有的元件檔案。
	lang := c.String("lang")

	files, err := os.ReadDir(path.Join(ProjectDir(), "languages", lang, "components"))
	if err != nil {
		return err
	}

	// 建立暫存資料夾，用來存放 dist 檔案
	tmpdir, err := os.MkdirTemp("tocas-ui", "*-build")
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
			path.Join(ExecutableDir(), "src"),
			"assets/tocas",
		), DMap(
			path.Join(ExecutableDir(), "examples"),
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
	group, ctx := errgroup.WithContext(ctx)

	/**
	 * index.html
	 */
	group.Go(func() error {
		select {
		case <-ctx.Done():
			return nil
		default:
			article := createArticle()

			file, err := os.Create(path.Join(tmpdir, lang, "index.html"))
			if err != nil {
				return err
			}

			tmpl, err := template.New("index.html").Funcs(fmap).ParseFiles(templatePath("index"))
			if err != nil {
				return err
			}

			if err := tmpl.Execute(file, article); err != nil {
				return err
			}

			log.Printf("已編譯：index.html")
			return nil
		}
	})

	/**
	 * examples.html
	 */
	group.Go(func() error {
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

			file, err := os.Create(path.Join(tmpdir, lang, "examples.html"))
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

			if err = tmpl.Execute(file, article); err != nil {
				return err
			}

			log.Printf("已編譯：examples.html")
			return nil
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

		group.Go(func() error {
			select {
			case <-ctx.Done():
				return nil
			default:

				sectionName := strings.TrimSuffix(f.Name(), filepath.Ext(f.Name()))

				// pan: 看起來所有檔案已經是 html 了，所以不再留存 RemoveSuffix 邏輯以加快效率。
				file, err := os.Create(path.Join(tmpdir, lang, f.Name()))
				if err != nil {
					return err
				}

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
					article.Example.FormattedHTML = tmplCode(
						trim(article.Example.HTML, article.Example.Remove),
					)
				}

				// 事後幫 HTML 加上 alt，避免出現在 FormattedHTML 裡。
				article.Example.HTML = imgAlt(meta, article.Example.HTML)
				for vi, v := range article.Definitions {
					definitions := &article.Definitions[vi]

					for ji, j := range v.Sections {
						section := &definitions.Sections[ji]

						// 如果這個段落有附加的 HTML 片段，就透過 Highlight JS 跟 Beautify 處理。
						if j.AttachedHTML != "" {
							section.FormattedHTML = tmplCode(trim(trim(j.AttachedHTML, j.Remove), article.Remove))
						}

						// 如果這個段落有 HTML 標籤內容，就透過 Highlight JS 跟 Beautify 處理。
						if j.HTML != "" {
							section.FormattedHTML = tmplCode(trim(trim(j.HTML, j.Remove), article.Remove))
						}

						// 事後幫 HTML 加上 alt，避免出現在 FormattedHTML 裡。
						section.HTML = imgAlt(meta, j.HTML)
					}
				}

				if err = tmpl.Execute(file, article); err != nil {
					return err
				}
				log.Printf("已編譯：%s.html", sectionName)
				return nil
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
	group, ctx := errgroup.WithContext(ctx)

	for _, s := range src {
		// 防止 `for` 迴圈覆蓋變數。
		s := s
		group.Go(func() error {
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
	group, ctx := errgroup.WithContext(ctx)
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

		group.Go(func() (err error) {
			select {
			case <-ctx.Done():
				return
			default:
				meta, err := readLanguageMeta(lang)
				if err != nil {
					return
				}

				infos[index] = meta.Information
				return
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

// getOrCache 會先尋找有沒有對應的快取。如果有，則取回；反之則
// 根據 `create` 引數的 closure 建立之。
//
// 快取將存在 `caches` 中 namespace 資料夾下，identifier 會用
// `uuid` (with `md5`) 取得 unique identifier。
func getOrCacheByte(namespace string, identifier []byte, create func() ([]byte, error)) (b []byte, err error) {
	// FIXME: We should maintain a lock based on namespace & identifier
	//        to prevent the race condition.

	hash := uuid.NewMD5(uuid.New(), identifier)

	cacheDir := path.Join(ExecutableDir(), "caches", namespace)
	cacheFilename := path.Join(cacheDir, hash.String())

	b, err = os.ReadFile(cacheFilename)
	if err != nil {
		if err := os.MkdirAll(cacheDir, 0755); err != nil {
			return b, err
		}
		// Try again.
		return getOrCacheByte(namespace, identifier, create)
	}

	// Hit!
	if len(b) > 0 {
		return
	}

	// Not hit. Create cache.
	b, err = create()
	if err != nil {
		return
	}

	err = os.WriteFile(cacheFilename, b, 0644)
	return
}

// highlight 會將純文字透過 Node 版本的 Highlight.js 來轉化為格式化後的螢光程式碼。
func highlight(s string) (string, error) {
	b, err := getOrCacheByte("highlight", []byte(s), func() (output []byte, err error) {
		cmd := exec.Command("npx", "hljs", "html")
		cmd.Stdin = bytes.NewBuffer([]byte(fmt.Sprintf("<pre><code>%s</code></pre>", html.EscapeString(s))))
		output, err = cmd.CombinedOutput()
		if err != nil {
			return output, errors.New(err.Error() + string(output))
		}
		return
	})

	return string(b), err
}

// beautify 會透過 js-beautify 美化程式碼。
func beautify(s string, typ string) (string, error) {
	b, err := getOrCacheByte("beautify", []byte(s), func() (output []byte, err error) {
		var cmd *exec.Cmd
		switch typ {
		case "css":
			cmd = exec.Command("npx", "js-beautify", "--css", "-L false", "-N false")
		case "js":
			cmd = exec.Command("npx", "js-beautify")
		case "html":
			cmd = exec.Command("npx", "js-beautify", "--html")
		}
		cmd.Stdin = bytes.NewBuffer([]byte(s))

		if err != nil {
			// Not critical?
			log.Println(err.Error() + string(output))
		}
		return output, nil
	})

	return string(b), err
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

// trim
func trim(s string, r []string) string {
	for _, v := range r {
		s = strings.Replace(s, v+"\n", "", -1)
		s = strings.Replace(s, v, "", -1)
	}
	return s
}

// clean
func clean(s string) string {
	s = regexp.MustCompile(`\(\((.*?)\)\)`).ReplaceAllString(s, "$1")
	s = regexp.MustCompile(`\[\[(.*?)]]`).ReplaceAllString(s, "$1")
	s = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(s, "$1")
	s = replaceAllStringSubmatchFunc(regexp.MustCompile(`!-(.*?)-!`), s, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		return asset(groups[1], true)
	})
	return s
}

// decodePlaceholder 會將預置標籤轉為實際可呈現的 HTML 標籤。
func decodePlaceholder(s string) string {
	//
	s = regexp.MustCompile(`BARK(.*?)BARKEND`).ReplaceAllString(s, "<mark class=\"tag\">$1</mark>")
	// 將螢光標記模板符號轉換回 `<mark>` 的 HTML 標記程式碼。
	s = regexp.MustCompile(`MARK(.*?)MARKEND`).ReplaceAllString(s, "<mark>$1</mark>")
	// 將圖片模板符號轉換成真正的預置圖片路徑。
	s = replaceAllStringSubmatchFunc(regexp.MustCompile(`IMAG(.*?)IMAGEND`), s, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		return asset(groups[1], false)
	})
	// 將元件連結模板符號轉換成真正指向到該元件文件的 HTML 連結程式碼。
	s = replaceAllStringSubmatchFunc(regexp.MustCompile(`COMP(.*?)COMPEND`), s, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		return fmt.Sprintf(`<a href="./%s.html">%s</a>`, strings.ReplaceAll(groups[1], "ts-", ""), groups[1])
	})
	return s
}

// placeholder 會將預置標籤轉為純文字，避免被 Beautifier 或 Highlight JS 誤認。
func placeholder(s string) string {
	// 大標籤標籤。
	s = regexp.MustCompile(`\(\((.*?)\)\)`).ReplaceAllString(s, `BARK${1}BARKEND`)
	// 螢光標籤。
	s = regexp.MustCompile(`\[\[(.*?)]]`).ReplaceAllString(s, `MARK${1}MARKEND`)
	// 元件連結。
	s = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(s, `COMP${1}COMPEND`)
	// 圖片。
	s = regexp.MustCompile(`!-(.*?)-!`).ReplaceAllString(s, `IMAG${1}IMAGEND`)
	return s
}

// markdown 會將傳入的字串從 Markdown 轉為 HTML。
func markdown(s string) string {
	return string(blackfriday.Run([]byte(s)))
}

// replaceAllStringSubmatchFunc
func replaceAllStringSubmatchFunc(re *regexp.Regexp, str string, repl func([]string) string) string {
	result := ""
	lastIndex := 0
	for _, v := range re.FindAllSubmatchIndex([]byte(str), -1) {
		var groups []string
		for i := 0; i < len(v); i += 2 {
			groups = append(groups, str[v[i]:v[i+1]])
		}
		result += str[lastIndex:v[0]] + repl(groups)
		lastIndex = v[1]
	}
	return result + str[lastIndex:]
}
