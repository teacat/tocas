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

// tmplHTML
func tmplHTML(html string) template.HTML {
	return template.HTML(html)
}

// tmplCapitalize
func tmplCapitalize(s string) string {
	return addSpace(strings.Title(s))
}

func addSpace(s string) string {
	buf := &bytes.Buffer{}
	for i, rune := range s {
		if unicode.IsUpper(rune) && i > 0 {
			buf.WriteRune(' ')
		}
		buf.WriteRune(rune)
	}
	return buf.String()
}

// tmplKebablize
func tmplKebablize(s string) string {
	return strcase.ToKebab(s)
}

// tmplTrim
func tmplTrim(s string, r []string) string {
	return trim(s, r)
}

// tmplAnchor
func tmplAnchor(s string) string {
	return strcase.ToKebab(s)
}

// tmplI18N
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
	// return template.HTML(decodePlaceholder(highlight(beautify(placeholder(s), typ))))
}

// trimLink
func trimLink(s string) string {
	return strings.Replace(s, `href="#!"`, "", -1)
}

// fillLink
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

// tmplTranslators
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
