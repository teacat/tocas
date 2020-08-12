/*package main

func main() {

	b, err := ioutil.ReadFile("./languages/zh-tw/meta.yml")
	if err != nil {
		panic(err)
	}
	var meta Meta
	err = yaml.Unmarshal(b, &meta)
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	r.StaticFile("global.css", "./templates/global.css")
	r.StaticFile("logo.svg", "./templates/logo.svg")
	r.SetFuncMap(template.FuncMap{
		"html": funcHTML,
		"capitalize": func(s string) string {
			return strings.Title(s)
		},
		"translators": func(s string) template.HTML {
			var ss string
			for _, v := range meta.Contributors {
				ss += fmt.Sprintf(`<a href="%s" target="_blank">%s</a>%s`, v.Website, v.Name, meta.UI.Paragraph["TranslatorSeperator"])
			}
			return template.HTML(fmt.Sprintf(s, strings.TrimRight(ss, meta.UI.Paragraph["TranslatorSeperator"])))
		},
	})
	r.LoadHTMLGlob("./templates/*")
	r.GET("/article", func(c *gin.Context) {
		c.HTML(http.StatusOK, "article.html", Data{
			Meta: meta,
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}*/

package main

import (
	"fmt"
	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "tocas-ui",
		Usage: "The Tocas UI command line tool for building documentations and the styles.",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "docs",
				Value: "generate",
				Usage: "language for the greeting",
			},
		},
		Action: func(c *cli.Context) error {
			c.String("")
			fmt.Println("boom! I say!")
			return nil
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
