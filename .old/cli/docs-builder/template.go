package main

import (
	"bytes"
	"fmt"
	"html/template"
	"regexp"
	"strings"
	"unicode"

	"github.com/iancoleman/strcase"
)

// tmplHTML 會將傳入的字串以 HTML 型態回傳，這樣 Golang 編譯才不會脫逸部份內容。
func tmplHTML(html string) template.HTML {
	return template.HTML(html)
}

// tmplCapitalize 會將傳入的字串以標題命名法（HelloWorld），大寫後並自動在每個單字後加上空白區隔。
func tmplCapitalize(s string) string {
	s = strings.Title(s)
	buf := &bytes.Buffer{}
	for i, rune := range s {
		if unicode.IsUpper(rune) && i > 0 {
			buf.WriteRune(' ')
		}
		buf.WriteRune(rune)
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
	r := regexp.MustCompile(`(?:\[\[)(.*?)(?:\]\])`).FindAllStringSubmatch(s, -1)
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
