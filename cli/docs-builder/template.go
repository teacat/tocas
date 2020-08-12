package main

import (
	"html/template"
	"strings"
)

// tmplHTML 會將指定文字以非脫逸字元輸出。
func tmplHTML(html string) template.HTML {
	return template.HTML(html)
}

// tmplCapitalize 會將指定文字的地一個字母開頭大寫。
func tmplCapitalize(s string) string {
	return strings.Title(s)
}
