package main

import (
	"bytes"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/teacat/davai"
	"github.com/teacat/pathx"
	"github.com/urfave/cli/v2"
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
)

// serve 會執行網頁伺服器服務文件內容。
func serve(c *cli.Context) error {
	d := davai.New()
	//
	fm := template.FuncMap{
		"html":       tmplHTML,
		"capitalize": tmplCapitalize,
		"highlight":  tmplHighlight,
	}
	d.ServeFiles("/assets", pathAssets)

	d.Get("/{language}", func(w http.ResponseWriter, r *http.Request) {
		//
		d := loadLanguage(davai.Vars(r)["language"], "")
		fm["translators"] = tmplTranslators(d.Meta)
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
		t, err := template.New("article.html").Funcs(fm).ParseFiles(pathx.Join(pathTemplate, "article.html"))
		if err != nil {
			panic(err)
		}
		t.Execute(w, d)
	})
	d.Run()
	return nil
}

// build 會載入所有文件然後編譯成靜態 HTML 檔案。
func build(c *cli.Context) error {
	return nil
}

// highlight 會將純文字透過 Node 版本的 Highlight.js 來轉化為格式化後的螢光程式碼。
func highlight(s string) string {
	cmd := exec.Command("hljs", "-l", "html")
	cmd.Stdin = bytes.NewBuffer([]byte(s))
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err.Error() + string(output))
	}
	return string(output)
}
