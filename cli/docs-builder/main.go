package main

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"strings"

	blackfriday "github.com/russross/blackfriday/v2"
	"github.com/teacat/davai"
	"github.com/teacat/pathx"
	cli "github.com/urfave/cli/v2"
	"golang.org/x/net/html"
)

func main() {
	app := &cli.App{
		Name:  "docs-builder",
		Usage: "The command line tool for building Tocas UI documentations.",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "port",
				Aliases: []string{"p"},
				Usage:   "The `PORT` for serving the documentation.",
			},
			&cli.StringFlag{
				Name:    "lang",
				Aliases: []string{"l"},
				Usage:   "The specified documentation `LANGUAGE` to build, can only specify one.",
			},
		},
		Commands: []*cli.Command{
			{
				Name:   "serve",
				Usage:  "Run a web server and serve the documentation.",
				Action: serve,
			},
			{
				Name:   "build",
				Usage:  "Build the documentation as static HTML files.",
				Action: build,
			},
			{
				Name:   "watch",
				Usage:  "[UNIMPLEMENT] Watching the file changes and build the documentation in real-time.",
				Action: build,
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

var (
	// pathLanguages 是文件語系路徑。
	pathLanguages = "./../../docs/languages/"
	// pathTemplate 是模板路徑。
	pathTemplate = "./templates/"
	// pathAssets 是靜態多媒體檔案的路徑。
	pathAssets = pathTemplate + "assets"
	//
	pathSrc = pathTemplate + "../../../src"
	//
	pathIcons = pathAssets + "/icons.yml"
	//
	pathFlags = pathAssets + "/flags.yml"
)

// serve 會執行網頁伺服器服務文件內容。
func serve(c *cli.Context) error {
	d := davai.New()
	//
	fm := template.FuncMap{
		"html":       tmplHTML,
		"capitalize": tmplCapitalize,
		"highlight":  tmplHighlight,
		"code":       tmplCode,
		"markdown":   tmplMarkdown,
		"preview":    tmplPreview,
		"marked":     tmplMarked,
		"kebablize":  tmplKebablize,
		"trim":       tmplTrim,
		"anchor":     tmplAnchor,
	}
	d.ServeFiles("/assets", pathAssets)
	d.ServeFiles("/src", pathSrc)

	d.Get("/{language}", func(w http.ResponseWriter, r *http.Request) {
		//
		d := loadLanguage(davai.Vars(r)["language"], "")
		fm["translators"] = tmplTranslators(d.Meta)
		fm["type"] = tmplType(d.Meta)
		t, err := template.New("index.html").Funcs(fm).ParseFiles(pathx.Join(pathTemplate, "index.html"))
		if err != nil {
			panic(err)
		}
		t.Execute(w, d)
	}).AddPriority(100)
	d.Get("/{language}/{*:path}", func(w http.ResponseWriter, r *http.Request) {
		//
		d := loadLanguage(davai.Vars(r)["language"], davai.Vars(r)["path"])
		fm["translators"] = tmplTranslators(d.Meta)
		fm["type"] = tmplType(d.Meta)
		var t *template.Template
		var err error
		if davai.Vars(r)["path"] == "examples" {
			t, err = template.New("examples.html").Funcs(fm).ParseFiles(pathx.Join(pathTemplate, "examples.html"))
		} else {
			t, err = template.New("article.html").Funcs(fm).ParseFiles(pathx.Join(pathTemplate, "article.html"))
		}
		if err != nil {
			panic(err)
		}
		err = t.Execute(w, d)
		if err != nil {
			panic(err)
		}
	})
	log.Println("Running...")
	err := d.Run(":8080")
	if err != nil {
		panic(err)
	}
	return nil
}

// build 會載入所有文件然後編譯成靜態 HTML 檔案。
func build(c *cli.Context) error {
	return nil
}

// highlight 會將純文字透過 Node 版本的 Highlight.js 來轉化為格式化後的螢光程式碼。
func highlight(s string) string {
	cmd := exec.Command("hljs", "html")
	cmd.Stdin = bytes.NewBuffer([]byte(fmt.Sprintf("<pre><code>%s</code></pre>", html.EscapeString(s))))
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err.Error() + string(output))
	}
	return string(output)
}

// beautify 會透過 js-beautify 美化程式碼。
func beautify(s string, typ string) string {
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
		panic(err.Error() + string(output))
	}
	return string(output)
}

// markdown 會將傳入的字串從 Markdown 轉為 HTML。
func markdown(s string) string {
	return string(blackfriday.Run([]byte(s)))
}

// placeholder 會將預置標籤轉為純文字，避免被 Beautifier 或 Highlight JS 誤認。
func placeholder(s string) string {
	// 螢光標籤。
	s = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(s, `MARK${1}MARKEND`)
	// 元件連結。
	s = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(s, `COMP${1}COMPEND`)
	// 圖片。
	s = regexp.MustCompile(`!-(.*?)-!`).ReplaceAllString(s, `IMAG${1}IMAGEND`)
	return s
}

// decodePlaceholder 會將預置標籤轉為實際可呈現的 HTML 標籤。
func decodePlaceholder(s string) string {
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
		return fmt.Sprintf("<a href='./components/%s'>%s</a>", groups[1], groups[1])
	})
	return s
}

// asset 會將回傳一個檔案路徑，取決於是要回傳真實的路徑用於 HTML 或是一個簡潔虛假的名稱用來做 Demo 展現。
func asset(s string, real bool) string {
	if !real {
		switch s {
		case "16:9":
		case "1:1":
		case "4:3":
			return "image.png"
		case "user":
		case "user2":
		case "user3":
			return "user.png"
		case "embed:karen":
		case "embed:vimeo":
			return "placeholder.png"
		case "embed:video":
			return "video.mp4"
		}
	}
	switch s {
	case "16:9":
		s = "images/16-9.png"
	case "1:1":
		s = "images/1-1.png"
	case "4:3":
		s = "images/4-3.png"
	case "user":
		s = "images/user.png"
	case "user2":
		s = "images/user2.png"
	case "user3":
		s = "images/user3.png"
	case "embed:karen":
		s = "images/videos/karen.png"
	case "embed:vimeo":
		s = "images/videos/vimeo.png"
	case "embed:video":
		s = "videos/video.mp4"
	}
	return pathx.Join(pathAssets, s)
}

// trim 會依照指定的清除詞彙清單，將傳入的字串做清理。
func trim(s string, r []string) string {
	for _, v := range r {
		s = strings.Replace(s, v, "", -1)
	}
	return s
}

// clean 會清除傳入字串的模板字元。
func clean(s string) string {
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
