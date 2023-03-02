package main

import (
	"bytes"
	"context"
	"crypto/md5"
	"fmt"
	"html"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"text/template"
	"time"

	"github.com/russross/blackfriday/v2"
	cli "github.com/urfave/cli/v2"
	"golang.org/x/sync/errgroup"
	"gopkg.in/yaml.v2"
)

// build
func build(c *cli.Context) error {
	// 取得該語系裡所有的元件檔案。
	files, err := ioutil.ReadDir("./../../languages/" + c.String("lang") + "/components")
	if err != nil {
		return err
	}
	// 建立該語系文件自己的資料夾。
	err = os.MkdirAll("./../../docs/"+c.String("lang")+"/", 0777)
	if err != nil {
		return err
	}
	// 重新複製一份模板的 `/assets` 進去。
	log.Printf("正在複製模板 /assets")
	if err := exec.Command("rm", "-rf", "./../../docs/"+c.String("lang")+"/assets").Run(); err != nil {
		return err
	}
	if err := exec.Command("cp", "-rf", "./templates/assets", "./../../docs/"+c.String("lang")+"/assets").Run(); err != nil {
		return err
	}
	log.Printf("正在打包成為 /dist")
	if err := pack(c); err != nil {
		return err
	}
	log.Printf("正在複製 /dist 到本語系的 /assets/tocas")
	if err := exec.Command("rm", "-rf", "./../../docs/"+c.String("lang")+"/assets/tocas").Run(); err != nil {
		return err
	}
	if err := exec.Command("cp", "-rf", "./../../dist", "./../../docs/"+c.String("lang")+"/assets/tocas").Run(); err != nil {
		return err
	}

	// 重新複製一份 `/src` 到文件的 `/assets/tocas` 進去。
	if err := exec.Command("rm", "-rf", "./../../docs/"+c.String("lang")+"/assets/tocas/src").Run(); err != nil {
		return err
	}
	if err := exec.Command("cp", "-rf", "./../../src", "./../../docs/"+c.String("lang")+"/assets/tocas/src").Run(); err != nil {
		return err
	}

	// 重新複製一份 `/examples` 到文件的 `/examples` 進去。
	log.Printf("正在複製 /examples")
	if err := exec.Command("rm", "-rf", "./../../docs/"+c.String("lang")+"/examples").Run(); err != nil {
		return err
	}
	if err := exec.Command("cp", "-rf", "./../../examples", "./../../docs/"+c.String("lang")+"/examples").Run(); err != nil {
		return err
	}
	// 載入這個文件語系的 `meta.yml` 主要中繼檔案。
	b, err := os.ReadFile("./../../languages/" + c.String("lang") + "/meta.yml")
	if err != nil {
		return err
	}
	var meta Meta
	if err = yaml.Unmarshal(b, &meta); err != nil {
		return err
	}
	// 在這個語系的 Meta 裡擺放所有其他語系的 `MetaInformation`，
	// 這樣我們才能顯示那些語系的名稱。
	meta.GlobalInformations, err = listMetaInformations()
	if err != nil {
		return err
	}
	// 準備好模板裡會用到的所有 Func。
	fmap := funcMap(meta)

	/**
	 * index.html
	 */

	article := Article{
		Meta: meta,
	}
	file, err := os.Create("./../../docs/" + c.String("lang") + "/index.html")
	if err != nil {
		return err
	}
	indexTmpl, err := template.New("index.html").Funcs(fmap).ParseFiles("./templates/index.html")
	if err != nil {
		return err
	}
	if err = indexTmpl.Execute(file, article); err != nil {
		return err
	}
	log.Printf("已編譯：index.html")

	/**
	 * examples.html
	 */

	article = Article{
		Meta: meta,
	}
	b, err = os.ReadFile("./../../languages/" + c.String("lang") + "/components/examples.yml")
	if err != nil {
		return err
	}
	if err = yaml.Unmarshal(b, &article); err != nil {
		return err
	}
	file, err = os.Create("./../../docs/" + c.String("lang") + "/examples.html")
	if err != nil {
		return err
	}
	if err = yaml.Unmarshal(b, &article); err != nil {
		return err
	}
	exampleTmpl, err := template.New("examples.html").Funcs(fmap).ParseFiles("./templates/examples.html")
	if err != nil {
		return err
	}
	if err = exampleTmpl.Execute(file, article); err != nil {
		return err
	}
	log.Printf("已編譯：examples.html")

	/**
	 * [component].html
	 */

	tmpl, err := template.New("article.html").Funcs(fmap).ParseFiles("./templates/article.html")
	if err != nil {
		return err
	}
	// 建立一個 WaitGroup 這樣就能平行編譯所有元件文件，
	// 而用等一個一個慢慢來 😎👌。
	group, _ := errgroup.WithContext(context.Background())
	// 處理每個元件的頁面。
	for _, f := range files {
		// 不要編譯 `examples.yml`，因為那個頁面我們剛才獨立處理了。
		if f.Name() == "examples.yml" {
			continue
		}
		// 獨立一個閉包函式執行，這樣才不會被 `for` 迴圈覆蓋變數。
		func(f fs.FileInfo) {
			group.Go(func() error {
				file, err := os.Create("./../../docs/" + c.String("lang") + "/" + strings.TrimSuffix(f.Name(), filepath.Ext(f.Name())) + ".html")
				if err != nil {
					return err
				}
				article := Article{
					This: strings.TrimSuffix(f.Name(), filepath.Ext(f.Name())),
					Meta: meta,
				}
				b, err := os.ReadFile("./../../languages/" + c.String("lang") + "/components/" + f.Name())
				if err != nil {
					return err
				}
				if err = yaml.Unmarshal(b, &article); err != nil {
					return err
				}
				// 如果這個元件的範例 HTML 不是空的話，就透過 Highlight JS 跟 Beautify 處理。
				if article.Example.HTML != "" {
					article.Example.FormattedHTML = tmplCode(trim(trim(article.Example.HTML, []string{}), article.Example.Remove))
				}
				// 事後幫 HTML 加上 alt，避免出現在 FormattedHTML 裡。
				article.Example.HTML = imgAlt(meta, article.Example.HTML)
				for vi, v := range article.Definitions {
					for ji, j := range v.Sections {
						// 如果這個段落有附加的 HTML 片段，就透過 Highlight JS 跟 Beautify 處理。
						if j.AttachedHTML != "" {
							if strings.Contains(j.AttachedHTML, "{- email.css -}") {
								b, err := os.ReadFile("./../../src/email.css")
								if err != nil {
									panic(err)
								}
								j.AttachedHTML = cssminify(string(b))
							}

							article.Definitions[vi].Sections[ji].FormattedHTML = tmplCode(trim(trim(j.AttachedHTML, j.Remove), article.Remove))
						}
						// 如果這個段落有 HTML 標籤內容，就透過 Highlight JS 跟 Beautify 處理。
						if j.HTML != "" {
							article.Definitions[vi].Sections[ji].FormattedHTML = tmplCode(trim(trim(j.HTML, j.Remove), article.Remove))
						}
						// 事後幫 HTML 加上 alt，避免出現在 FormattedHTML 裡。
						article.Definitions[vi].Sections[ji].HTML = imgAlt(meta, j.HTML)
					}
				}

				if err = tmpl.Execute(file, article); err != nil {
					return err
				}
				log.Printf("已編譯：%s.html", strings.TrimSuffix(f.Name(), filepath.Ext(f.Name())))
				return nil
			})
		}(f)
	}
	return group.Wait()
}

// listMetaInformations 會取得所有文件裡的 `MetaInformation`，
// 這樣才能從 `zh-tw` 文件中取得如何稱呼 `en-us`。
func listMetaInformations() ([]MetaInformation, error) {
	var infos []MetaInformation
	files, err := filepath.Glob("./../../languages/*/meta.yml")
	if err != nil {
		return infos, err
	}
	for _, match := range files {
		b, err := os.ReadFile(match)
		if err != nil {
			return infos, err
		}
		var meta Meta
		if err = yaml.Unmarshal(b, &meta); err != nil {
			return infos, err
		}
		infos = append(infos, meta.Information)
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

// highlight 會將純文字透過 Node 版本的 Highlight.js 來轉化為格式化後的螢光程式碼。
func highlight(s string) string {
	hash := fmt.Sprintf("%x", md5.Sum([]byte(s)))
	b, err := ioutil.ReadFile("./caches/hljs/" + hash)
	if err != nil {
		os.MkdirAll("./caches/hljs/", 0777)
	}
	if len(b) != 0 {
		return string(b)
	}
	cmd := exec.Command("hljs", "html")
	cmd.Stdin = bytes.NewBuffer([]byte(fmt.Sprintf("<pre><code>%s</code></pre>", html.EscapeString(s))))
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err.Error() + string(output))
	}
	ioutil.WriteFile("./caches/hljs/"+hash, output, 0777)
	return string(output)
}

// cssminify 會將透過 css-minify 最小化 CSS 樣式。
func cssminify(content string) string {
	hash := fmt.Sprintf("%x", md5.Sum([]byte(content)))
	b, err := ioutil.ReadFile("./caches/cssminify/" + hash)
	if err != nil {
		os.MkdirAll("./caches/cssminify/", 0777)
	}
	if len(b) != 0 {
		return string(b)
	}
	tmp, err := os.Create("./caches/cssminify/" + strconv.Itoa(int(time.Now().Unix())))
	if err != nil {
		panic(err)
	}
	if _, err := tmp.WriteString(content); err != nil {
		panic(err)
	}
	if err := tmp.Close(); err != nil {
		panic(err)
	}
	if err := exec.Command("css-minify", "-f", tmp.Name(), "-o", "./caches/cssminify/").Run(); err != nil {
		panic(err)
	}
	b, err = os.ReadFile(tmp.Name() + ".min.css")
	if err != nil {
		panic(err)
	}
	ioutil.WriteFile("./caches/cssminify/"+hash, b, 0777)
	return string(b)
}

// beautify 會透過 js-beautify 美化程式碼。
func beautify(s string, typ string) string {
	hash := fmt.Sprintf("%x", md5.Sum([]byte(s)))
	b, err := ioutil.ReadFile("./caches/beautify/" + hash)
	if err != nil {
		os.MkdirAll("./caches/beautify/", 0777)
	}
	if len(b) != 0 {
		return string(b)
	}
	var cmd *exec.Cmd
	switch typ {
	case "css":
		cmd = exec.Command("js-beautify", "--css", "-L false", "-N false")
	case "js":
		cmd = exec.Command("js-beautify")
	case "html":
		cmd = exec.Command("js-beautify", "--html")
	}
	cmd.Stdin = bytes.NewBuffer([]byte(s))
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Println(err.Error() + string(output))
	}
	ioutil.WriteFile("./caches/beautify/"+hash, output, 0777)
	return string(output)
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
	s = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(s, "$1")
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
	s = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(s, `MARK${1}MARKEND`)
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
		groups := []string{}
		for i := 0; i < len(v); i += 2 {
			groups = append(groups, str[v[i]:v[i+1]])
		}
		result += str[lastIndex:v[0]] + repl(groups)
		lastIndex = v[1]
	}
	return result + str[lastIndex:]
}
