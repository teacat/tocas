package main

import (
	"bytes"
	"fmt"
	"html"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/alecthomas/template"
	"github.com/urfave/cli"
	yaml "gopkg.in/yaml.v2"
)

type Single struct {
	Title       string    `yaml:"Title"`
	Description string    `yaml:"Description"`
	Outline     string    `yaml:"Outline"`
	Definitions []Chapter `yaml:"Definitions"`
	Examples    []Chapter `yaml:"Examples"`
	Modules     []Chapter `yaml:"Modules"`
	Settings    []Chapter `yaml:"Settings"`
}

type Chapter struct {
	Title       string    `yaml:"Title"`
	Description string    `yaml:"Description"`
	Sections    []Section `yaml:"Sections"`
	Settings    []Setting `yaml:"Settings"`
}

type Section struct {
	Title       string       `yaml:"Title"`
	Description string       `yaml:"Description"`
	Since       string       `yaml:"Since"`
	HTML        string       `yaml:"HTML"`
	Example     string       `yaml:"Example"`
	JavaScript  string       `yaml:"JavaScript"`
	Remove      []string     `yaml:"Remove"`
	Subsections []Subsection `yaml:"Subsections"`
}

type Subsection struct {
	Title       string   `yaml:"Title"`
	Description string   `yaml:"Description"`
	Since       string   `yaml:"Since"`
	HTML        string   `yaml:"HTML"`
	Example     string   `yaml:"Example"`
	JavaScript  string   `yaml:"JavaScript"`
	Remove      []string `yaml:"Remove"`
}

type Setting struct {
	Key           string `yaml:"Key"`
	Default       string `yaml:"Default"`
	Description   string `yaml:"Description"`
	DefaultObject string `yaml:"DefaultObject"`
}

func main() {

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
						// 讀取文件底下的所有語系。
						files, err := ioutil.ReadDir("./yaml")
						if err != nil {
							panic(err)
						}
						for _, lang := range files {
							if !lang.IsDir() {
								continue
							}
							// 讀取此語系底下的所有檔案和目錄。
							files, err := ioutil.ReadDir("./yaml/" + lang.Name())
							if err != nil {
								panic(err)
							}
							for _, f := range files {
								if !f.IsDir() {
									continue
									//
								}
								// 讀取此語系目錄分類中的所有檔案。
								files, err := ioutil.ReadDir("./yaml/" + lang.Name() + "/" + f.Name())
								if err != nil {
									panic(err)
								}

								for _, category := range files {
									dat, err := ioutil.ReadFile("./yaml/" + lang.Name() + "/" + f.Name() + "/" + category.Name())
									if err != nil {
										panic(err)
									}
									var s Single
									err = yaml.Unmarshal(dat, &s)
									if err != nil {
										panic("./yaml/" + lang.Name() + "/" + f.Name() + "/" + category.Name() + ":" + err.Error())
									}

									//fmt.Printf("%+v", Highlight(s.Definitions[0].Sections[0].HTML))

									tFile, err := ioutil.ReadFile("./templates/docs.tmpl")
									if err != nil {
										panic(err)
									}

									t := template.New("")
									t, err = t.Parse(string(tFile))
									if err != nil {
										panic(err)
									}

									var r bytes.Buffer
									err = t.Execute(&r, s)
									if err != nil {
										panic(err)
									}
									err = os.MkdirAll("./html/"+lang.Name()+"/"+f.Name()+"/", os.ModePerm)
									if err != nil {
										panic(err)
									}
									err = ioutil.WriteFile("./html/"+lang.Name()+"/"+f.Name()+"/"+strings.TrimSuffix(category.Name(), filepath.Ext(category.Name()))+".html", r.Bytes(), 0644)
									if err != nil {
										panic(err)
									}
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

func Highlight(code string) string {
	cmd := exec.Command("hljs")
	cmd.Stdin = bytes.NewBuffer([]byte(fmt.Sprintf("<pre><code class='html'>\n%s\n</code></pre>", html.EscapeString(code))))
	out, err := cmd.CombinedOutput()
	if err != nil {
		panic(err)
	}
	return string(out)
}
