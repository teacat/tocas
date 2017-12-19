package main

import (
	"bytes"
	"fmt"
	"html"
	"html/template"
	"path/filepath"
	"regexp"

	"github.com/PuerkitoBio/goquery"

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
	Description template.HTML
	// Sections 是本章節所帶有的樣式說明。
	Sections []*Section
}

// Section 是章節中的單個樣式區段。
type Section struct {
	// Title 是樣式名稱。
	Title string
	// Description 是樣式的說明文字。
	Description template.HTML
	// Example 是樣式的實際範例 HTML，不可被脫逸。
	Example template.HTML
	// Code 是被脫逸後的原始碼。
	Code template.HTML
}

// Parser 是一個 Markdown 節點解析器。
type Parser struct {
	Render   *blackfriday.HTMLRenderer
	Markdown *blackfriday.Markdown
	Document *goquery.Document
	Single   *Single
}

func newParser(render *blackfriday.HTMLRenderer) *Parser {
	return &Parser{
		Render: render,
		Single: &Single{},
	}
}

// visitor 會回傳一個能夠取得 blackfriday 所提供的 Markdown 節點資訊函式，並且呼叫其他函式開始收集、解析。
func (p *Parser) visitor() func(*blackfriday.Node, bool) blackfriday.WalkStatus {
	// 一個擺置文字的緩衝位元組。
	var buf bytes.Buffer
	// 目前是否正在標題區塊中。
	// var inHeadingBlock bool
	// 目前是否正在單個大章節中。
	// var inChapter bool
	// 目前是否正在單個樣式章節中。
	// var inStyle bool

	// 回傳行走的解析函式。
	return func(node *blackfriday.Node, entering bool) blackfriday.WalkStatus {
		//
		return p.Render.RenderNode(&buf, node, entering)
	}
}

// parse 會解析節點並且透過模板輸出成一個完整的頁面內容。
func (p *Parser) parse(markdown []byte) []byte {
	// 將 Markdown 編譯成 HTML。
	content := blackfriday.Run(markdown)

	// 將編譯後的結果匯入到 GoQuery 進行節點捕捉。
	d, err := goquery.NewDocumentFromReader(bytes.NewBuffer(content))
	check(err)

	//
	p.Document = d

	// 取得文件標題。
	p.Single.Title = p.title()
	// 取得文件副標題。
	p.Single.Description = p.description()
	// 取得所有章節。
	p.Single.Chapters = p.chapters(d)

	//fmt.Printf("%+v", p.Single)

	return p.applyTemplate(p.Single)
}

//
func (p *Parser) sections(chapter *goquery.Selection) (sections []*Section) {
	// 每個樣式段落。
	chapter.Find("h3").Each(func(i int, s *goquery.Selection) {
		// 取得到下個段落之中的內容，即是本段落的內容。
		section := s.NextUntil("h3")

		// 取得本段落標題。
		title, err := s.Html()
		check(err)

		// 在本段落中找出在程式碼區塊之前的所有節點，即是本段落的文字註釋。
		desc := p.outerHTML(p.wrapSelf(section).Find("pre").PrevAll())

		// 取得本段落的程式碼內容。
		code, err := p.wrapSelf(section).Find("pre").Html()
		check(err)

		//
		example, err := p.wrapSelf(section).Find("pre code").Html()
		check(err)

		//
		example = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(example, `$1`)
		example = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(example, `$1`)

		//
		code = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(code, `<mark>$1</mark>`)
		code = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(code, `<a href="/elements/#{name}">$1</a>`)

		// 將本段落匯集成一個建構體。
		sections = append(sections, &Section{
			Title:       title,
			Description: template.HTML(desc),
			Example:     template.HTML(html.UnescapeString(example)),
			Code:        template.HTML(code),
		})
	})

	return
}

//
func (p *Parser) chapters(document *goquery.Document) (chapters []*Chapter) {
	// 尋找文件中的每個章節標題。
	document.Find("h2").Each(func(i int, s *goquery.Selection) {
		// 取得到所有於下個章節標題之前的節點，即是本章節的內容。
		chapter := s.NextUntil("h2")

		// 取得本章節標題。
		title, err := s.Html()
		check(err)

		// 取得本章節說明，到區段前的節點即是本章節的說明文字。
		desc := p.outerHTML(p.wrapSelf(s, chapter).Find("h2").NextUntil("h3"))

		// 取得本章節的每個樣式。
		sections := p.sections(p.wrapSelf(s, chapter))

		// 將本章節匯集成一個建構體。
		chapters = append(chapters, &Chapter{
			Title:       title,
			Description: template.HTML(desc),
			Sections:    sections,
		})
	})

	return
}

func (p *Parser) wrapSelf(s *goquery.Selection, sel ...*goquery.Selection) *goquery.Selection {
	// 建立一個包覆用的容器與內容。
	wrapper, err := goquery.NewDocumentFromReader(bytes.NewBuffer([]byte("")))
	check(err)

	//
	for _, v := range sel {
		s = s.AddSelection(v)
	}

	return wrapper.Find("body").AppendSelection(s)
}

// title 會回傳文件的主要標題。
func (p *Parser) title() string {
	return p.Document.Find("h1").Text()
}

// description 會回傳文件的主要副標題。
func (p *Parser) description() string {
	return p.Document.Find("h1 + p").Text()
}

// outerHTML 會接收多個節點，集合並回傳一個總體 HTML。
func (p *Parser) outerHTML(s *goquery.Selection) string {
	// 建立一個包覆用的容器與內容。
	wrapper, err := goquery.NewDocumentFromReader(bytes.NewBuffer([]byte(`<div></div>`)))
	check(err)

	// 將內容推入至此容器，並且取得容器的 HTML。
	html, err := wrapper.Find("div").AppendSelection(s).Html()
	check(err)

	return html
}

//
func (p *Parser) copy(s *goquery.Selection) *goquery.Selection {
	// 建立一個包覆用的容器與內容。
	wrapper, err := goquery.NewDocumentFromReader(bytes.NewBuffer([]byte(p.outerHTML(s))))
	check(err)

	return wrapper.Selection.FindSelection(s)
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
