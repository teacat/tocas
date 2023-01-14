package main

import (
	"bytes"
	"errors"
	"fmt"
	"github.com/russross/blackfriday/v2"
	"golang.org/x/text/language"
	"html"
	"html/template"
	"log"
	"os/exec"
	"regexp"
	"strings"
	"unicode"

	"github.com/iancoleman/strcase"
	"golang.org/x/text/cases"
)

// tmplHTML 會將傳入的字串以 HTML 型態回傳，這樣 Golang 編譯才不會脫逸部份內容。
func tmplHTML(html string) template.HTML {
	return template.HTML(html)
}

// tmplCapitalize 會將傳入的字串以標題命名法（HelloWorld），大寫後並自動在每個單字後加上空白區隔。
func tmplCapitalize(s string) string {
	s = cases.Title(language.English, cases.NoLower).String(s)
	buf := &bytes.Buffer{}
	for i, chr := range s {
		if unicode.IsUpper(chr) && i > 0 {
			buf.WriteRune(' ')
		}
		buf.WriteRune(chr)
	}
	return buf.String()
}

// tmplKebablize 會將傳入的字串改為 `蛇蛇-命名方式`。
func tmplKebablize(s string) string {
	return strcase.ToKebab(s)
}

// tmplTrim
func tmplTrim(s string, r []string) string {
	return trim(s, r)
}

// tmplAnchor 會將傳入的字串改為 `蛇蛇-命名方式` 作為連結錨點。
func tmplAnchor(s string) string {
	return strcase.ToKebab(s)
}

// tmplI18N 會取得語系的 i18n 字串。
func tmplI18N(meta Meta) func(string) string {
	return func(key string) string {
		return meta.UI.Paragraph[key]
	}
}

// tmplHighlight
func tmplHighlight(s string) template.HTML {
	return template.HTML(highlight(s))
}

// tmplMarkdown
func tmplMarkdown(s string) template.HTML {
	// TODO: LINK EXTERNAL ICON AND _BLANK
	return template.HTML(markdown(s))
}

// tmplCode 會將純文字程式碼螢光標記並整理，解析之後轉為 HTML 標籤。
func tmplCode(s string) template.HTML {
	return template.HTML(decodePlaceholder(highlight(beautify(placeholder(trimLink(s)), "html"))))
}

// trimLink 會移除掉範例裡連結用的 `href="#!"`。
func trimLink(s string) string {
	return strings.Replace(s, `href="#!"`, "", -1)
}

// fillLink 會自動將連結填入 `href="#!"` 為了讓連結在瀏覽器上有視覺效果。
func fillLink(s string) string {
	r, err := regexp.Compile(`<a class="([a-zA-Z0-9 -]*)">`)
	if err != nil {
		panic(err)
	}
	return r.ReplaceAllString(s, "<a class=\"$1\" href=\"#!\">")
}

// tmplPreview
func tmplPreview(s string) template.HTML {
	return template.HTML(fillLink(clean(s)))
}

// tmplMarked
func tmplMarked(s string) string {
	if s == "" {
		return s
	}
	r := regexp.MustCompile(`\[\[(.*?)]]`).FindAllStringSubmatch(s, -1)
	if len(r) == 0 {
		return ""
	}
	return r[0][1]
}

// imgAlt 將所有圖片加上輔助用的 Alt。
func imgAlt(meta Meta, s string) string {
	r, err := regexp.Compile(`<img (.*?)>`)
	if err != nil {
		panic(err)
	}
	return r.ReplaceAllString(s, "<img alt='"+meta.UI.Paragraph["Article_Image_Placeholder_Alt"]+"' $1>")
}

// tmplTranslators 會輸出語系翻譯者的相關名稱並帶有連接符號。
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

// markdown 會將傳入的字串從 Markdown 轉為 HTML。
func markdown(s string) string {
	return string(blackfriday.Run([]byte(s)))
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

// trim
func trim(s string, r []string) string {
	for _, v := range r {
		s = strings.Replace(s, v+"\n", "", -1)
		s = strings.Replace(s, v, "", -1)
	}
	return s
}

// highlight 會將純文字透過 Node 版本的 Highlight.js 來轉化為格式化後的螢光程式碼。
func highlight(s string) string {
	b, err := getOrCacheByte("hljs", []byte(s), func() (output []byte, err error) {
		cmd := exec.Command("npx", "hljs", "html")
		cmd.Stdin = strings.NewReader(fmt.Sprintf("<pre><code>%s</code></pre>", html.EscapeString(s)))
		output, err = cmd.CombinedOutput()
		if err != nil {
			return output, errors.New(err.Error() + string(output))
		}
		return
	})

	if err != nil {
		panic(err)
	}

	return string(b)
}

// beautify 會透過 js-beautify 美化程式碼。
func beautify(s string, typ string) string {
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
		cmd.Stdin = strings.NewReader(s)
		output, err = cmd.CombinedOutput()

		if err != nil {
			// Not critical?
			log.Println(err.Error() + string(output))
		}
		return output, nil
	})

	if err != nil {
		panic(err)
	}

	return string(b)
}
