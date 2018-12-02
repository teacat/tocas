package document

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/TeaMeow/TocasUI/src/CLI/executor"
	"github.com/alecthomas/template"

	"github.com/TeaMeow/TocasUI/src/CLI/util"
	blackfriday "gopkg.in/russross/blackfriday.v2"
	yaml "gopkg.in/yaml.v2"
)

var (
	AssetPath string = "xxx"
)

func Compile(path string) {
	d := New(path)
	// 讀取文件的內容。
	d.Read()
	// 將文件內容的 YAML 資料轉譯並映射到本地結構體。
	d.Unmarshal()
	//
	d.Analyze()
	//
	d.Markdown()
	// 將部份內容轉換成預置模板標籤，避免被 Highlight JS 轉譯。
	d.Placeholder()
	//
	d.Beatify()
	//
	d.Trim()
	// 將範例程式碼透過 Highlight JS 螢光標記。
	d.Highlight()
	// 將原先的預置模板標籤轉換回真正的 HTML 程式碼。
	d.Tag()
	//
	d.Clean()
	// 索引所有章節。
	d.Index()
	//
	d.LoadUI()
	// 將文件透過模板引擎編譯成一個靜態的網頁內容。
	d.Compile()
	// 將靜態網頁保存於指定位置。
	d.Save()
}

func (d *Document) LoadUI() {
	b, err := ioutil.ReadFile(fmt.Sprintf("translations/%s/ui.yml", d.Language))
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(b, &d.UI)
	if err != nil {
		panic(err)
	}
}

func (d *Document) Clean() {
	replace := func(input string) string {
		input = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(input, "$1")
		input = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(input, "$1")
		input = util.ReplaceAllStringSubmatchFunc(regexp.MustCompile(`!-(.*?)-!`), input, func(groups []string) string {
			if len(groups) == 0 {
				return ""
			}
			return d.Asset(groups[1])
		})
		return input
	}
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.HTMLNative = replace(s.HTML)
			}
			if s.CSS != "" {
				s.CSSNative = replace(s.CSS)
			}
			if s.JavaScript != "" {
				s.JavaScriptNative = replace(s.JavaScript)
			}
		}
	}
}

func (d *Document) Markdown() {
	d.Description = string(blackfriday.Run([]byte(d.Description)))
	d.Outline = string(blackfriday.Run([]byte(d.Outline)))
	for _, v := range d.Definitions {
		v.Description = string(blackfriday.Run([]byte(v.Description)))
		for _, s := range v.Sections {
			s.Description = string(blackfriday.Run([]byte(s.Description)))
		}
	}
}

func (d *Document) Trim() {
	replace := func(input string, cutsets []string) string {
		for _, v := range cutsets {
			input = strings.Replace(input, v, "", -1)
		}
		return input
	}
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.HTMLReadable = replace(s.HTMLReadable, s.Remove)
			}
			if s.CSS != "" {
				s.CSSReadable = replace(s.CSSReadable, s.Remove)
			}
			if s.JavaScript != "" {
				s.JavaScriptReadable = replace(s.JavaScriptReadable, s.Remove)
			}
		}
	}
}

func (d *Document) Beatify() {
	replace := func(input string, typ string) string {
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
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.HTMLReadable = replace(s.HTMLReadable, "html")
			}
			if s.CSS != "" {
				s.CSSReadable = replace(s.CSSReadable, "css")
			}
			if s.JavaScript != "" {
				s.JavaScriptReadable = replace(s.JavaScriptReadable, "js")
			}
		}
	}
}

// New 會讀取一個指定路徑中的 YAML 文件資料，
// 並且以此作為基礎建立一個新的文件結構體。
func New(fullpath string) *Document {
	//
	parts := strings.Split(fullpath, "/translations")
	//
	parts = strings.Split(parts[1], "/")
	//
	basename := filepath.Base(fullpath)
	//
	return &Document{
		Language: parts[0],
		Category: parts[1],
		Name:     strings.TrimSuffix(basename, filepath.Ext(basename)),
		Path:     fullpath,
		Executor: executor.New(),
		UI:       make(map[string]interface{}),
	}
}

// Read 會載入文件的內容，並且讀入到結構體中。
func (d *Document) Read() {
	b, err := ioutil.ReadFile(d.Path)
	if err != nil {
		panic(err)
	}
	d.Content = b
}

// Unmarshal 會將讀入的資料透過 YAML 解析並映射到本地的文件欄位來供程式使用。
func (d *Document) Unmarshal() {
	err := yaml.Unmarshal(d.Content, &d)
	if err != nil {
		panic(err)
	}
	//
	if len(d.Settings.Callbacks) > 0 || len(d.Settings.Properties) > 0 {
		d.HasSettings = true
	}
	if len(d.Usages.Behaviors) > 0 {
		d.HasUsages = true
	}
	if len(d.Definitions) > 0 {
		d.HasDefinitions = true
	}
}

//
func (d *Document) Analyze() {
	replace := func(input string) []string {
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
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.Highlights = replace(s.HTML)
			}
			if s.CSS != "" {
				s.Highlights = replace(s.CSS)
			}
			if s.JavaScript != "" {
				s.Highlights = replace(s.JavaScript)
			}
		}
	}
}

//
func (d *Document) Escape() {

}

// Placeholder 會將指定模板符號轉換成更獨特的預置符號避免解析時出錯，
// 在那之後會由另一個程序將預置符號轉換回正常的文字。
func (d *Document) Placeholder() {
	replace := func(input string) string {
		input = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(input, `MARK${1}MARKEND`)
		input = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(input, `COMP${1}COMPEND`)
		input = regexp.MustCompile(`!-(.*?)-!`).ReplaceAllString(input, `IMAG${1}IMAGEND`)
		return input
	}
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.HTMLReadable = replace(s.HTML)
			}
			if s.CSS != "" {
				s.CSSReadable = replace(s.CSS)
			}
			if s.JavaScript != "" {
				s.JavaScriptReadable = replace(s.JavaScript)
			}
		}
	}
}

// Asset 會接收一個檔案的簡寫名稱，並且將其轉換成真正指向到 Tocas 文件靜態圖片、資源檔案的路徑。
func (d *Document) Asset(name string) string {
	switch name {
	case "16:9":
		name = "images/16-9.png"
	case "1:1":
		name = "images/1-1.png"
	case "4:3":
		name = "images/4-3.png"
	case "user":
		name = "images/user.png"
	case "user2":
		name = "images/user2.png"
	case "user3":
		name = "images/user3.png"
	case "embed:karen":
		name = "images/videos/karen.png"
	case "embed:vimeo":
		name = "images/videos/vimeo.png"
	}
	return fmt.Sprintf("%s/%s", AssetPath, name)
}

// Component 會接收一個元件的簡寫，並且將其轉換成指向到該文件的連結路徑。
func (d *Document) Component(name string) string {
	switch name {
	case "button", "container", "divider", "header", "icon", "image",
		"input", "slate", "label", "list", "loader", "quote", "segment", "step":
		name = fmt.Sprintf("<a href='/elements/%s.html'>%s</a>", name, name)
	case "breadcrumb", "form", "grid", "menu", "message", "table":
		name = fmt.Sprintf("<a href='/collections/%s.html'>%s</a>", name, name)
	case "accordion", "calendar", "checkbox", "dimmer", "dropdown",
		"progress", "slider", "popup", "modal", "embed", "siderbar",
		"snackbar", "tab", "contextmenu", "scrollspy":
		name = fmt.Sprintf("<a href='/modules/%s.html'>%s</a>", name, name)
	case "card", "speeches", "comment", "feed", "items", "statistic":
		name = fmt.Sprintf("<a href='/views/%s.html'>%s</a>", name, name)
	default:
		name = fmt.Sprintf("<a href='#'>%s</a>", name)
	}
	return name
}

// Tag 會分析接收到的內容，並且將其中的文件標籤符號轉換成真正的內容和程式碼。
func (d *Document) Tag() {
	replace := func(input string) string {
		// 將螢光標記模板符號轉換回 `<mark>` 的 HTML 標記程式碼。
		input = regexp.MustCompile(`MARK(.*?)MARKEND`).ReplaceAllString(input, "<mark>$1</mark>")
		// 將圖片模板符號轉換成真正的預置圖片路徑。
		input = util.ReplaceAllStringSubmatchFunc(regexp.MustCompile(`IMAG(.*?)IMAGEND`), input, func(groups []string) string {
			if len(groups) == 0 {
				return ""
			}
			return d.Asset(groups[1])
		})
		// 將元件連結模板符號轉換成真正指向到該元件文件的 HTML 連結程式碼。
		input = util.ReplaceAllStringSubmatchFunc(regexp.MustCompile(`COMP(.*?)COMPEND`), input, func(groups []string) string {
			if len(groups) == 0 {
				return ""
			}
			return d.Component(groups[1])
		})
		return input
	}
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.HTMLReadable = replace(s.HTMLReadable)
			}
			if s.CSS != "" {
				s.CSSReadable = replace(s.CSSReadable)
			}
			if s.JavaScript != "" {
				s.JavaScriptReadable = replace(s.JavaScriptReadable)
			}
		}
	}
}

// Index 能夠索引文件的所有段落，並且將其彙整（這個函式必須在整體文件分析完畢後才能夠執行）。
func (d *Document) Index() {
	for _, v := range d.Definitions {
		i := &DocumentIndex{
			Title: v.Title,
			Name:  ToAnchor(v.Title),
		}
		for _, s := range v.Sections {
			i.SubIndexes = append(i.SubIndexes, &DocumentIndex{
				Title:  s.Title,
				Name:   ToAnchor(s.Title),
				Labels: s.Highlights,
			})
		}
		i.HasSubIndex = len(i.SubIndexes) > 0
	}
}

// ToAnchor 可以將傳入的標題字串轉換成更符合連結錨點的名稱，通常是將空白轉換成減號分隔符號。
func ToAnchor(input string) string {
	return strings.ToLower(strings.Replace(input, " ", "-", -1))
}

//
func (d *Document) Highlight() {
	replace := func(input string) string {
		cmd := exec.Command("hljs", "-l", "html")
		cmd.Stdin = bytes.NewBuffer([]byte(input))
		output, err := cmd.CombinedOutput()
		if err != nil {
			panic(err.Error() + string(output))
		}
		return string(output)
	}
	for _, v := range d.Definitions {
		for _, s := range v.Sections {
			if s.HTML != "" {
				s.HTMLReadable = replace(s.HTMLReadable)
			}
			if s.CSS != "" {
				s.CSSReadable = replace(s.CSSReadable)
			}
			if s.JavaScript != "" {
				s.JavaScriptReadable = replace(s.JavaScriptReadable)
			}
		}
	}
}

//
func (d *Document) Compile() {
	parse := func(path string, data map[string]interface{}) string {
		tmpl, err := template.ParseFiles(path)
		if err != nil {
			panic(err)
		}
		buf := bytes.NewBuffer([]byte(""))
		err = tmpl.Execute(buf, data)
		if err != nil {
			panic(err)
		}
		return string(buf.Bytes())
	}

	compile := func(path string) string {
		data := map[string]interface{}{
			"Document": d,
			"UI":       d.UI,
		}
		sub := parse(path, data)
		return parse("templates/views/single.html", map[string]interface{}{
			"Document": d,
			"UI":       d.UI,
			"HTML":     sub,
		})
	}

	d.CompiledContent.Definitions = compile("templates/components/definitions.html")
	d.CompiledContent.Settings = compile("templates/components/settings.html")
	d.CompiledContent.Usages = compile("templates/components/usages.html")
}

// Save 能夠將整個已經解析且編譯完的文件作為靜態檔案而保存到指定的位置。
func (d *Document) Save() {
	save := func(path string, content string) {
		if content != "" {
			err := ioutil.WriteFile(path, content, 777)
			if err != nil {
				panic(err)
			}
		}
	}

	save(fmt.Sprintf("dist/%s/%s.html", d.Category, d.Name), d.CompiledContent.Definitions)
	save(fmt.Sprintf("dist/%s/%s-settings.html", d.Category, d.Name), d.CompiledContent.Settings)
	save(fmt.Sprintf("dist/%s/%s-usages.html", d.Category, d.Name), d.CompiledContent.Usages)
}
