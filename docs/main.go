package main

import (
	"html/template"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"

	"gopkg.in/yaml.v2"
)

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
	r.SetFuncMap(template.FuncMap{
		"html": func(html string) template.HTML {
			return template.HTML(html)
		},
	})
	r.LoadHTMLGlob("./templates/*")
	r.GET("/article", func(c *gin.Context) {
		c.HTML(http.StatusOK, "article.html", Data{
			Meta: meta,
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
