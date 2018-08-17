package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/alecthomas/template"
	dcopy "github.com/otiai10/copy"
	"github.com/tdewolff/minify"
	minifyHTML "github.com/tdewolff/minify/html"

	"github.com/urfave/cli"
	blackfriday "gopkg.in/russross/blackfriday.v2"
	yaml "gopkg.in/yaml.v2"
)

const TemplatePath = "./templates"
const DocsPath = "./yaml"
const AssetSrcPath = "./../dist"
const AssetsPath = "./html/assets/styles"
const DistPath = ""

// Document 是單個文件資料建構體，
// 其包含了單個頁面會有的頁籤章節…等。
type Document struct {
	// Category 是元素分類（例如：`Elements`、`Collections`）。
	Category string
	// Component 是元素名稱（例如：`Button`、`Card`）。
	Component string
	// Title 是標題。
	Title string `yaml:"Title"`
	// Description 是主要註釋。
	Description string `yaml:"Description"`
	// Outline 是開頭導引段落，可使用 Markdown 格式。
	Outline string `yaml:"Outline"`

	// OriginalDefinitions 是多個樣式定義的大章節。
	OriginalDefinitions []*Chapter `yaml:"Definitions"`
	// OriginalModules 是多個 JavaScript 範例的大章節。
	OriginalModules []*Chapter `yaml:"Modules"`
	// OriginalSettings 是多個 JavaScript 屬性設定的大章節。
	OriginalSettings []*Chapter `yaml:"Settings"`
	// Definitions 是整理之後的多個樣式定義的大章節。
	Definitions *Tab
	// Modules 是整理之後的多個 JavaScript 範例的大章節。
	Modules *Tab
	// Settings 是整理之後的多個 JavaScript 屬性設定的大章節。
	Settings *Tab
}

// Tab 是單個文件中的單個頁籤頁面資料建構體，
// 其包含了該頁籤內的所有大章節與巢狀索引。
type Tab struct {
	// Chapters 是所有章節內容。
	Chapters []*Chapter
	// Indexes 是所有章節與其子章節的索引。
	Indexes []*Index
}

// Chapter 是單個章節的資料建構體。
type Chapter struct {
	// Title 是標題。
	Title string `yaml:"Title"`
	// Description 是註釋，可使用 Markdown 格式。
	Description string `yaml:"Description"`
	// Sections 是大章節中的小章節。
	Sections []*Section `yaml:"Sections"`
	// Settings 是章節中的屬性設置資料。
	Settings []*Setting `yaml:"Settings"`
}

// Index 是基於文件章節的索引資料建構體。
type Index struct {
	// Title 是標題。
	Title string
	// Name 是索引的錨點名稱，空白會被轉換成減號（`-`）作為分隔符。
	Name string
	//
	Highlights []string
	// HasSubIndex 表示此索引是否有子索引。
	HasSubIndex bool
	// SubIndexes 是子索引切片。
	SubIndexes []*Index
}

// Code 是原始碼的範例資料建構體，包含了原本和整理後的範例（與可供輸出閱讀的格式）。
type Code struct {
	// Dirty 是原始沒有被整理的程式碼內容，包含了 Tocas 文件專用的一些標籤。
	Dirty string
	// Clean 是整理之後的原生程式碼內容，可以直接被執行。
	Clean string
	// Readable 是可供人類閱讀的程式碼，經過縮排且被整理過並帶有螢光標籤。
	Readable string
	// Highlights 是字串切片，其內容為程式碼中被螢光的地方（不重複）。
	Highlights []string
}

// Section 是單個小章節的資料建構體。
type Section struct {
	// Title 是標題。
	Title string `yaml:"Title"`
	// Description 是註釋，可使用 Markdown 格式。
	Description string `yaml:"Description"`
	// Responsive 表示此段落範例是否需要響應式展示模式。
	Responsive bool `yaml:"Responsive"`

	// OrignalHTML 是包含 Tocas 文件標籤且尚未經過整理的 HTML 範例內容。
	OriginalHTML string `yaml:"HTML"`
	// OriginalJS 是尚未經過整理的 JavaScript 範例程式碼。
	OriginalJS string `yaml:"JavaScript"`
	// HTML 是經過多方整理之後的 HTML 範例資料。
	HTML Code
	// JavaScript 是經過多方整理之後的 JavaScript 範例資料。
	JavaScript Code

	//
	Highlights []string

	// Since 是此章節功能的 Tocas UI 起始版本號（例如：`3.0.0`），用以識別此功能是否為新追加。
	Since string `yaml:"Since"`
	// Remove 是欲從範例中剔除的文字切片。
	Remove []string `yaml:"Remove"`
	// Subsections 是子章節。
	SubSections []*SubSection `yaml:"Subsections"`
}

// SubSection 是單個小章節中的子章節資料建構體。
type SubSection struct {
	// Title 是標題。
	Title string `yaml:"Title"`
	// Description 是註釋，可使用 Markdown 格式。
	Description string `yaml:"Description"`
	// Since 是此章節功能的 Tocas UI 起始版本號（例如：`3.0.0`），用以識別此功能是否為新追加。
	Since string `yaml:"Since"`
	// OrignalHTML 是包含 Tocas 文件標籤且尚未經過整理的 HTML 範例內容。
	OriginalHTML string `yaml:"HTML"`
	// OriginalJS 是尚未經過整理的 JavaScript 範例程式碼。
	OriginalJS string `yaml:"JavaScript"`
	// HTML 是經過多方整理之後的 HTML 範例資料。
	HTML Code
	// JavaScript 是經過多方整理之後的 JavaScript 範例資料。
	JavaScript Code
	// Remove 是欲從範例中剔除的文字切片。
	Remove []string `yaml:"Remove"`
}

// Setting 是單個 JavaScript 模組屬性資料建構體。
type Setting struct {
	// Key 是設置的鍵名。
	Key string `yaml:"Key"`
	// Description 是註釋，可使用 Markdown 格式。
	Description string `yaml:"Description"`
	// Default 是此預設值。
	Default string `yaml:"Default"`
	// DefaultObject 是預設的物件內容，和預設值之間同時只能存在一種。
	DefaultObject string `yaml:"DefaultObject"`
}

// Templates 會保存所有以解析的模板建構體，
// 其模板名稱以模板檔案名稱為主。
var Templates map[string]*template.Template

// Documents 會保存所有已載入的文件資料。
// 其映射鍵名是文件的語系（如：`zh-tw`、`en-us`）。
var Documents map[string][]*Document

//=======================================================
// 準備函式
//=======================================================

// PrepareTemplate 能夠讀取所有模板資料，並且解析成可供 Golang 立即使用的模板建構體。
// 被解析後的模板會被保存至全域變數中，模板名稱以該檔案名稱為主。
func PrepareTemplate() {
	// 讀取模板資料夾裡的所有模板檔案。
	files, err := ioutil.ReadDir(TemplatePath)
	if err != nil {
		panic(err)
	}
	//
	m := minify.New()
	m.AddFunc("text/html", minifyHTML.Minify)
	// 遍歷所有模板檔案，並且讀取出其內容且解析成模板建構體資料。
	for _, file := range files {
		tmplFile, err := ioutil.ReadFile(fmt.Sprintf("%s/%s", TemplatePath, file.Name()))
		if err != nil {
			panic(err)
		}
		tmpl := template.New("")
		tmpl = tmpl.Funcs(template.FuncMap{
			"Markdown": Markdown,
			"ToLower":  strings.ToLower,
		})
		mb, err := m.Bytes("text/html", tmplFile)
		if err != nil {
			panic(err)
		}
		tmpl, err = tmpl.Parse(string(mb))
		if err != nil {
			panic(err)
		}
		// 取得檔案名稱作為鍵名保存至全域模板變數供之後使用。
		Templates[Filename(file.Name())] = tmpl
	}
}

// PrepareAssets 會將最新的 Tocas UI 與其內容重新複製到文件資料夾中供已編譯的模板使用。
func PrepareAssets() {
	err := dcopy.Copy(AssetSrcPath, AssetsPath)
	if err != nil {
		panic(err)
	}
}

// PrepareSearchIndex 會解析所有的文件內容，
// 並且建立搜尋索引供 JavaScript 在頁面上以正規表達式快速搜尋相關內容。
func PrepareSearchIndex() {

}

// ReadDir 會讀取指定的目錄資料夾，並且遍歷檔案並呼叫回呼函式。
func ReadDir(path string, callback func(file os.FileInfo, nestedPath string)) {
	files, err := ioutil.ReadDir(path)
	if err != nil {
		panic(err)
	}
	for _, v := range files {
		callback(v, fmt.Sprintf("%s/%s", path, v.Name()))
	}
}

type Component struct {
	Name  string
	Alias string
	Since string
	Items []Component
}

// PrepareDocs 會預先載入所有語系的文件檔案，
// 這樣就能夠在之後處理相關內容，而不需要邊解析邊處理。
func PrepareDocs() {

	//
	ReadDir(DocsPath, func(language os.FileInfo, nestedPath string) {
		var d *Document
		if !language.IsDir() {
			return
		}
		//
		fmt.Printf("■ Parsing `%s` documentation...\n", Filename(language.Name()))
		//
		UI := make(map[string]interface{})
		Main := make(map[string]interface{})
		ReadYAML(fmt.Sprintf("%s/%s/ui.yml", DocsPath, Filename(language.Name())), &UI)
		ReadYAML(fmt.Sprintf("%s/%s/main.yml", DocsPath, Filename(language.Name())), &Main)

		//
		ReadDir(nestedPath, func(category os.FileInfo, nestedPath string) {
			if !category.IsDir() {
				return
			}
			//
			ReadDir(nestedPath, func(component os.FileInfo, nestedPath string) {
				d = &Document{
					Category:    Filename(category.Name()),
					Component:   Filename(component.Name()),
					Definitions: &Tab{},
					Modules:     &Tab{},
					Settings:    &Tab{},
				}
				ReadYAML(nestedPath, &d)
				//
				d.Definitions = ParseChapters(Filename(component.Name()), d.OriginalDefinitions)
				//
				Documents[language.Name()] = append(Documents[language.Name()], d)
				//
				var r bytes.Buffer
				err := Templates["docs"].Execute(&r, map[string]interface{}{
					"UI":   UI,
					"Docs": d,
					"Main": Main,
				})
				if err != nil {
					panic(err)
				}
				err = os.MkdirAll(fmt.Sprintf("./html/%s/%s/", Filename(language.Name()), Filename(category.Name())), os.ModePerm)
				if err != nil {
					panic(err)
				}

				err = ioutil.WriteFile(fmt.Sprintf("./html/%s/%s/%s.html", Filename(language.Name()), Filename(category.Name()), Filename(component.Name())), r.Bytes(), 0644)
				if err != nil {
					panic(err)
				}
				//
				fmt.Printf("\n")
			})
		})
	})
}

func IndexingChapter(chapter *Chapter) *Index {
	var indexes []*Index
	//
	for _, section := range chapter.Sections {
		var subIndexes []*Index
		//
		for _, subSection := range section.SubSections {
			subIndexes = append(subIndexes, &Index{
				Title: subSection.Title,
				Name:  SpaceToDash(subSection.Title),
			})
		}
		//
		indexes = append(indexes, &Index{
			Title:       section.Title,
			Name:        SpaceToDash(section.Title),
			Highlights:  section.Highlights,
			HasSubIndex: len(subIndexes) > 0,
			SubIndexes:  subIndexes,
		})
	}
	//
	return &Index{
		Title:       chapter.Title,
		Name:        SpaceToDash(chapter.Title),
		HasSubIndex: len(indexes) > 0,
		SubIndexes:  indexes,
	}
}

func PrepareIndex() {

}

func RenderTemplate() {

}

func ReadYAML(path string, dst interface{}) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(b, dst)
	if err != nil {
		panic(fmt.Sprintf("%s: %+v", path, err))
	}
}

func ParseChapters(componentName string, chapters []*Chapter) *Tab {
	var parsedChapters []*Chapter
	var parsedIndexes []*Index
	//
	now := time.Now()
	//
	fmt.Printf("  | Parsing `%s` chapters...", componentName)
	//
	for index, chapter := range chapters {
		//
		percent := int(float64((index + 1)) / float64(len(chapters)) * 100)
		if percent == 100 {
			fmt.Printf("%v%%", percent)
		} else {
			fmt.Printf("%v%%...", percent)
		}

		chapter.Description = Markdown(chapter.Description)

		//
		var wg sync.WaitGroup
		wg.Add(len(chapter.Sections))

		//
		for _, section := range chapter.Sections {
			go func(section *Section) {
				section.Description = Markdown(section.Description)
				//
				section.Highlights = Analyze(section.OriginalHTML)
				section.HTML = Code{
					Dirty:    section.OriginalHTML,
					Clean:    Clean(section.OriginalHTML),
					Readable: Tag(Highlight(Placeholder(Trim(Beautify(section.OriginalHTML, "html"), section.Remove)))),
				}
				section.JavaScript = Code{
					Dirty:    section.OriginalJS,
					Clean:    Clean(section.OriginalJS),
					Readable: Tag(Highlight(Trim(Beautify(section.OriginalJS, "js"), section.Remove))),
				}

				//
				var wgSub sync.WaitGroup
				wgSub.Add(len(section.SubSections))

				//
				for _, subSection := range section.SubSections {
					go func(subSection *SubSection) {
						subSection.Title = Markdown(subSection.Title)
						subSection.Description = Markdown(subSection.Description)
						subSection.HTML = Code{
							Dirty:    subSection.OriginalHTML,
							Clean:    Clean(subSection.OriginalHTML),
							Readable: Highlight(Tag(Trim(Beautify(subSection.OriginalHTML, "html"), subSection.Remove))),
						}
						subSection.JavaScript = Code{
							Dirty:    subSection.OriginalJS,
							Clean:    Clean(subSection.OriginalJS),
							Readable: Tag(Highlight(Trim(Beautify(subSection.OriginalJS, "js"), subSection.Remove))),
						}
						//
						wgSub.Done()
					}(subSection)
				}
				//
				wgSub.Wait()
				//
				wg.Done()
			}(section)
		}
		//
		wg.Wait()
		//
		parsedChapters = append(parsedChapters, chapter)
		//
		parsedIndexes = append(parsedIndexes, IndexingChapter(chapter))
	}
	//
	fmt.Printf(" (%v)", time.Since(now))
	return &Tab{
		Chapters: parsedChapters,
		Indexes:  parsedIndexes,
	}
}

func main() {
	Templates = make(map[string]*template.Template)
	Documents = make(map[string][]*Document)

	app := cli.NewApp()

	app.Commands = []cli.Command{
		{
			Name:    "docs",
			Aliases: []string{"d"},
			Usage:   "編譯或監聽文件檔案",
			Subcommands: []cli.Command{
				{
					Name:  "watch",
					Usage: "監聽文件檔案變更並且自動編譯成靜態頁面",
					Action: func(c *cli.Context) error {
						fmt.Println("new task template: ", c.Args().First())
						return nil
					},
				},
				{
					Name:  "build",
					Usage: "單次編譯文件檔案為靜態頁面並結束程式",
					Action: func(c *cli.Context) error {
						// 複製最新的樣式與腳本至文件目的地。
						PrepareAssets()
						// 載入並解析文件模板。
						PrepareTemplate()
						// 載入並解析所有語系的文件。
						PrepareDocs()
						//
						for language, documents := range Documents {
							//
							UI := make(map[string]string)
							Main := make(map[string]string)
							ReadYAML(fmt.Sprintf("%s/%s/ui.yml", DocsPath, language), &UI)
							ReadYAML(fmt.Sprintf("%s/%s/main.yml", DocsPath, language), &Main)

							for _, v := range documents {
								var r bytes.Buffer
								err := Templates["docs"].Execute(&r, map[string]interface{}{
									"UI":   UI,
									"Docs": v,
									"Main": Main,
								})
								if err != nil {
									panic(err)
								}
								err = os.MkdirAll(fmt.Sprintf("./html/%s/%s/", language, v.Category), os.ModePerm)
								if err != nil {
									panic(err)
								}
								err = ioutil.WriteFile(fmt.Sprintf("./html/%s/%s/%s.html", language, v.Category, v.Component), r.Bytes(), 0644)
								if err != nil {
									panic(err)
								}
							}
						}

						return nil
					},
				},
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

//=======================================================
// 輔助函式
//=======================================================

// Markdown 會以 Markdown 的格式分析接收到的內容並轉換成 HTML 標籤內容。
func Markdown(input string) string {
	return string(blackfriday.Run([]byte(input)))
}

// Trim 會清理字串中的某些文字，這些規則由接收到的字串切片為主。
func Trim(input string, cutsets []string) string {
	for _, v := range cutsets {
		input = strings.Replace(input, v, "", -1)
	}
	return input
}

// Clean 會移除程式碼中的多餘文件標籤符號。
func Clean(input string) string {
	input = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(input, "$1")
	input = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(input, "$1")
	input = ReplaceAllStringSubmatchFunc(regexp.MustCompile(`!-(.*?)-!`), input, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		switch groups[1] {
		case "16:9", "1:1", "4:3", "user", "user2", "user3":
			return "../../assets/images/" + groups[1] + ".png"
		case "embed:karen":
			return "../../assets/images/videos/youtube.png"
		case "embed:vimeo":
			return "../../assets/images/videos/vimeo.png"
		default:
			return ""
		}
	})

	return input
}

func Placeholder(input string) string {
	input = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(input, `MARK${1}MARKEND`)
	input = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(input, `COMP${1}COMPEND`)
	input = regexp.MustCompile(`!-(.*?)-!`).ReplaceAllString(input, `IMAG${1}IMAGEND`)
	return input
}

// Tag 會分析接收到的內容，並且將其中的文件標籤符號轉換成真正的內容和程式碼。
func Tag(input string) string {
	input = regexp.MustCompile(`MARK(.*?)MARKEND`).ReplaceAllString(input, "<mark>$1</mark>")
	input = ReplaceAllStringSubmatchFunc(regexp.MustCompile(`IMAG(.*?)IMAGEND`), input, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		switch groups[1] {
		case "16:9":
			return "image.png"
		case "1:1":
			return "image.png"
		case "4:3":
			return "image.png"
		case "user":
			return "user.png"
		case "user2":
			return "user.png"
		case "user3":
			return "user.png"
		case "embed:karen":
			return "youtube.png"
		case "embed:vimeo":
			return "vimeo.png"
		default:
			return ""
		}
	})
	input = ReplaceAllStringSubmatchFunc(regexp.MustCompile(`COMP(.*?)COMPEND`), input, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		switch groups[1] {
		case "button", "container", "divider", "header", "icon", "image",
			"input", "slate", "label", "list", "loader", "quote", "segment", "step":
			return fmt.Sprintf("<a href='/elements/%s.html'>%s</a>", groups[1], groups[1])
		case "breadcrumb", "form", "grid", "menu", "message", "table":
			return fmt.Sprintf("<a href='/collections/%s.html'>%s</a>", groups[1], groups[1])
		case "accordion", "calendar", "checkbox", "dimmer", "dropdown",
			"progress", "slider", "popup", "modal", "embed", "siderbar",
			"snackbar", "tab", "contextmenu", "scrollspy":
			return fmt.Sprintf("<a href='/modules/%s.html'>%s</a>", groups[1], groups[1])
		case "card", "speeches", "comment", "feed", "items", "statistic":
			return fmt.Sprintf("<a href='/views/%s.html'>%s</a>", groups[1], groups[1])
		default:
			return fmt.Sprintf("<a href='#'>%s</a>", groups[1])
		}
	})
	return input
}

// Highlight 會接收程式碼並且透過 Node.js 的 hljs 套件來標註程式碼顏色。
func Highlight(input string) string {
	cmd := exec.Command("hljs", "-l", "html")
	//cmd.Stdin = bytes.NewBuffer([]byte(input))
	cmd.Stdin = bytes.NewBuffer([]byte(input))
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err.Error() + string(output))
	}
	return string(output)
}

func Analyze(input string) []string {
	var output []string
	result := regexp.MustCompile(`\[\[(.*?)\]\]`).FindAllStringSubmatch(input, -1)
	for _, v := range result {
		var has bool
		for _, vv := range output {
			if vv == v[1] {
				has = true
				break
			}
		}
		if !has {
			output = append(output, v[1])
		}
	}
	return output
}

func Beautify(input string, typ string) string {
	var cmd *exec.Cmd
	switch typ {
	case "css":
		cmd = exec.Command("js-beautify", "--css", "-L false", "-N false")
	case "js":
		cmd = exec.Command("js-beautify")
	case "html":
		cmd = exec.Command("js-beautify", "--html")
	}
	cmd.Stdin = bytes.NewBuffer([]byte(input))
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err)
	}
	return string(output)
}

// Filename 會剃除路徑中多餘的副檔名與符號，最終回傳檔案的名稱。
func Filename(path string) string {
	return strings.TrimSuffix(path, filepath.Ext(path))
}

// SpaceToDash 能夠將接收到的字串中，把空白字符轉換成減（`-`）分隔號。
func SpaceToDash(input string) string {
	return strings.ToLower(strings.Replace(input, " ", "-", -1))
}

// ReplaceAllStringSubmatchFunc 能夠接收一個正規表達式與輸入字串，
// 並將字串中所符合的內容傳入至回呼函式並且能夠依照不同內容替換為不同新內容。
//
// Source: https://gist.github.com/elliotchance/d419395aa776d632d897
func ReplaceAllStringSubmatchFunc(re *regexp.Regexp, str string, repl func([]string) string) string {
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
