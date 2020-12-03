package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"regexp"
	"strings"
	"sync"

	"github.com/iancoleman/strcase"
	"github.com/teacat/pathx"
	"gopkg.in/yaml.v2"
)

//
func loadAllLanguages() (m map[string]Meta) {
	files, err := ioutil.ReadDir(pathLanguages)
	if err != nil {
		panic(err)
	}
	for _, f := range files {
		b, err := ioutil.ReadFile(pathx.Join(pathLanguages, f.Name(), "meta.yml"))
		if err != nil {
			panic(err)
		}
		var meta Meta
		err = yaml.Unmarshal(b, &meta)
		if err != nil {
			panic(err)
		}
		m[f.Name()] = meta
	}
	return m
}

//
func loadLanguage(lang string, path string) (d Data) {
	// 載入該語系的中繼檔案。
	b, err := ioutil.ReadFile(pathx.Join(pathLanguages, lang, "meta.yml"))
	if err != nil {
		return d
	}
	var meta Meta
	err = yaml.Unmarshal(b, &meta)
	if err != nil {
		panic(err)
	}
	d.Meta = meta
	if path == "" {
		return d
	}
	// 載入頁面的獨立檔案。
	b, err = ioutil.ReadFile(pathx.Join(pathLanguages, lang, path+".yml"))
	if err != nil {
		return d
	}
	var t map[string]interface{}
	err = yaml.Unmarshal(b, &t)
	if err != nil {
		panic(err)
	}
	d.Type = t["Type"].(string)
	switch d.Type {
	case "Article":
		var a Article
		err = yaml.Unmarshal(b, &a)
		if err != nil {
			panic(err)
		}
		var wg sync.WaitGroup
		for k, v := range a.Definitions {
			for i, j := range v.Sections {
				if j.HTML == "" {
					continue
				}
				wg.Add(1)
				go func(k, i int, j ArticleDefinitionSection) {
					a.Definitions[k].Sections[i].FormattedHTML = tmplCode(trim(j.HTML, j.Remove))
					wg.Done()
				}(k, i, j)
			}
		}
		wg.Wait()

		d.Article = a

		if strings.Contains(path, "icon") {
			b, err := ioutil.ReadFile(pathIcons)
			if err != nil {
				panic(err)
			}
			var t map[string]interface{}
			err = yaml.Unmarshal(b, &t)
			if err != nil {
				panic(err)
			}
			for k, v := range d.Article.Definitions {
				for l, j := range v.Sections {
					if j.Icon == "" || t[j.Icon] == nil {
						continue
					}
					for _, m := range t[j.Icon].([]interface{}) {
						d.Article.Definitions[k].Sections[l].Icons = append(d.Article.Definitions[k].Sections[l].Icons, m.(string))
					}

				}
			}
		}

		if strings.Contains(path, "flag") {
			b, err := ioutil.ReadFile(pathFlags)
			if err != nil {
				panic(err)
			}
			var t map[string][]string
			err = yaml.Unmarshal(b, &t)
			if err != nil {
				panic(err)
			}
			for k, v := range d.Article.Definitions {
				if v.Type == "Flags" {
					d.Article.Definitions[k].Flags = t
				}
			}
		}

		return d
	case "Examples":
		var e Examples
		err = yaml.Unmarshal(b, &e)
		if err != nil {
			panic(err)
		}
		d.Examples = e
		return d
	}
	return d
}

// tmplHTML 會將指定文字以非脫逸字元輸出。
func tmplHTML(html string) template.HTML {

	return template.HTML(html)
}

// tmplCapitalize 會將指定文字的地一個字母開頭大寫。
func tmplCapitalize(s string) string {
	return strings.Title(s)
}

//
func tmplKebablize(s string) string {
	return strcase.ToKebab(s)
}

//
func tmplType(meta Meta) func(string) string {
	return func(s string) string {
		return meta.UI.Types[s]
	}
}

//
func tmplTrim(s string, r []string) string {
	return trim(s, r)
}

func tmplAnchor(s string) string {
	return strcase.ToKebab(s)
}

// tmplHighlight 會將傳入的文字以螢光標記的方式呈現。
func tmplHighlight(s string) template.HTML {
	return template.HTML(highlight(s))
}

// tmplTranslators 會將翻譯者陳列出來成為一個清單字串。
func tmplTranslators(meta Meta) func(string) template.HTML {
	var ss string
	for _, v := range meta.Contributors {
		if v.Website != "" {
			ss += fmt.Sprintf(`<a href="%s" target="_blank">%s</a>%s`, v.Website, v.Name, meta.UI.Paragraph["TranslatorSeperator"])
		} else {
			ss += fmt.Sprintf(`%s%s`, v.Name, meta.UI.Paragraph["TranslatorSeperator"])
		}
	}
	return func(s string) template.HTML {
		return template.HTML(fmt.Sprintf(s, strings.TrimRight(ss, meta.UI.Paragraph["TranslatorSeperator"])))
	}
}

// tmplMarkdown 會將 Markdown 純文字轉譯為 HTML 標籤。
func tmplMarkdown(s string) template.HTML {
	// TODO: LINK EXTERNAL ICON AND _BLANK
	return template.HTML(markdown(s))
}

// tmplCode 會將純文字程式碼螢光標記並整理，解析之後轉為 HTML 標籤。
func tmplCode(s string) template.HTML {
	return template.HTML(decodePlaceholder(highlight(beautify(placeholder(trimLink(s)), "html"))))
	// return template.HTML(decodePlaceholder(highlight(beautify(placeholder(s), typ))))
}

func trimLink(s string) string {
	return strings.Replace(s, `href="#!"`, "", -1)
}

func fillLink(s string) string {
	r, err := regexp.Compile(`<a class="([a-zA-Z0-9 -]*)">`)
	if err != nil {
		panic(err)
	}
	return r.ReplaceAllString(s, "<a class=\"$1\" href=\"#!\">")
}

// tmplPreview 會將傳入的 HTML 純文字移除相關的模板字元然後輸出純淨的 HTML。
func tmplPreview(s string) template.HTML {
	return template.HTML(fillLink(clean(s)))
}

// tmplMarked
func tmplMarked(s string) string {
	if s == "" {
		return s
	}
	r := regexp.MustCompile(`(?:\[\[)(.*?)(?:\]\])`).FindAllStringSubmatch(s, -1)
	if len(r) == 0 {
		return ""
	}
	return r[0][1]
}
