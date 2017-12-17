package main

import (
	"bytes"
	"fmt"
	"html/template"
	"path/filepath"

	blackfriday "gopkg.in/russross/blackfriday.v2"
)

// Single 是單個頁面的構成結構。
type Single struct {
	// Title 是頁面的主要標題。
	Title string
	// Description 是頁面的說明副標題。
	Description string
	// Chapters 是頁面中的所有章節。
	Chapters []*Chapter
}

// Chapter 是頁面中單個章節。
type Chapter struct {
	// Title 是章節標題。
	Title string
	// Description 是章節的文字敘述。
	Description string
	// Styles 是本章節所帶有的樣式說明。
	Styles []*Style
}

// Style 是章節中的單個樣式說明。
type Style struct {
	// Title 是樣式名稱。
	Title string
	// Description 是樣式的說明文字。
	Description string
	// Example 是樣式的實際範例 HTML，不可被脫逸。
	Example string
	// Code 是被脫逸後的原始碼。
	Code string
}

// Parser 是一個 Markdown 節點解析器。
type Parser struct {
	Render   *blackfriday.HTMLRenderer
	Markdown *blackfriday.Markdown
	Single   *Single
}

func newParser(render *blackfriday.HTMLRenderer) *Parser {
	return &Parser{
		Render: render,
	}
}

// visitor 會回傳一個能夠取得 blackfriday 所提供的 Markdown 節點資訊函式，並且呼叫其他函式開始收集、解析。
func (p *Parser) visitor() func(*blackfriday.Node, bool) blackfriday.WalkStatus {
	var buf bytes.Buffer
	return func(node *blackfriday.Node, entering bool) blackfriday.WalkStatus {
		//fmt.Println(string(node.Literal))
		return p.Render.RenderNode(&buf, node, entering)
	}
}

// parse 會解析節點並且透過模板輸出成一個完整的頁面內容。
func (p *Parser) parse(markdown []byte) []byte {
	blackfriday.New().Parse(markdown).Walk(p.visitor())
	return p.applyTemplate(p.Single)
}

func (p *Parser) applyTemplate(s *Single) []byte {
	// 指定文件的模板路徑。
	templateName := fmt.Sprintf("%s/../templates/single.html", executablePath())
	// 初始化一個模板引擎並載入模板內容。
	t, err := template.ParseFiles(templateName)
	check(err)
	// 建立緩衝位元組，用來擷取模板輸出內容。
	buf := new(bytes.Buffer)
	// 套用並執行模板編譯。
	t.ExecuteTemplate(buf, filepath.Base(templateName), s)
	// 回傳編譯後的結果。
	return buf.Bytes()
}
