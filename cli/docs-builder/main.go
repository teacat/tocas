package main

import (
	"bytes"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
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
	r := gin.Default()
	// 將所有靜態多媒體檔案都放到 `/` 根目錄下提供。
	r.Static("/assets/images/xx", pathx.JoinDir(pathAssets, "images"))
	r.Static("/assets/syles/x", pathx.JoinDir(pathAssets, "syles"))
	//
	fm := template.FuncMap{
		"html":       tmplHTML,
		"capitalize": tmplCapitalize,
		"highlight":  tmplHighlight,
	}

	//
	r.GET("/:language", func(c *gin.Context) {
		//
		d := loadLanguage(c.Param("language"), "")
		fm["translators"] = tmplTranslators(d.Meta)
		r.SetFuncMap(fm)
		r.LoadHTMLGlob(pathx.Join(pathTemplate, "*.html"))

		c.HTML(http.StatusOK, "index.html", d)
	})
	//
	r.GET("/:language/:path", func(c *gin.Context) {
		//
		d := loadLanguage(c.Param("language"), c.Param("path"))
		fm["translators"] = tmplTranslators(d.Meta)
		r.SetFuncMap(fm)
		r.LoadHTMLGlob(pathx.Join(pathTemplate, "*"))

		c.HTML(http.StatusOK, "article.html", d)
	})
	r.Run()
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
