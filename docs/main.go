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
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/alecthomas/template"
	"github.com/urfave/cli"
	blackfriday "gopkg.in/russross/blackfriday.v2"
	yaml "gopkg.in/yaml.v2"
)

type Single struct {
	Title       string     `yaml:"Title"`
	Description string     `yaml:"Description"`
	Outline     string     `yaml:"Outline"`
	Definitions []*Chapter `yaml:"Definitions"`
	Examples    []*Chapter `yaml:"Examples"`
	Modules     []*Chapter `yaml:"Modules"`
	Settings    []*Chapter `yaml:"Settings"`
	Category    string
	Component   string
}

type Chapter struct {
	Title       string     `yaml:"Title"`
	Description string     `yaml:"Description"`
	Sections    []*Section `yaml:"Sections"`
	Settings    []*Setting `yaml:"Settings"`
}

type Section struct {
	Title       string        `yaml:"Title"`
	Description string        `yaml:"Description"`
	Since       string        `yaml:"Since"`
	HTML        string        `yaml:"HTML"`
	Example     string        `yaml:"Example"`
	JavaScript  string        `yaml:"JavaScript"`
	Remove      []string      `yaml:"Remove"`
	Subsections []*Subsection `yaml:"Subsections"`
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

var Templates map[string]*template.Template
var Docs map[string][]*Single

func PrepareTemplate() {
	files, err := ioutil.ReadDir("./templates")
	if err != nil {
		panic(err)
	}
	for _, file := range files {
		tmplFile, err := ioutil.ReadFile("./templates/" + file.Name())
		if err != nil {
			panic(err)
		}
		tmpl := template.New("")
		tmpl, err = tmpl.Parse(string(tmplFile))
		if err != nil {
			panic(err)
		}
		name := strings.TrimSuffix(file.Name(), filepath.Ext(file.Name()))
		Templates[name] = tmpl
	}
}

func PrepareAssets() {

}

func PrepareDocs() {
	languages, err := ioutil.ReadDir("./yaml")
	if err != nil {
		panic(err)
	}
	for _, language := range languages {
		if !language.IsDir() {
			continue
		}
		categories, err := ioutil.ReadDir("./yaml/" + language.Name())
		if err != nil {
			panic(err)
		}
		for _, category := range categories {
			if !category.IsDir() {
				continue
			}
			components, err := ioutil.ReadDir("./yaml/" + language.Name() + "/" + category.Name())
			if err != nil {
				panic(err)
			}
			for _, component := range components {
				data, err := ioutil.ReadFile("./yaml/" + language.Name() + "/" + category.Name() + "/" + component.Name())
				if err != nil {
					panic(err)
				}
				var s *Single
				err = yaml.Unmarshal(data, &s)
				if err != nil {
					panic("./yaml/" + language.Name() + "/" + category.Name() + "/" + component.Name() + ":" + err.Error())
				}
				s.Category = category.Name()
				s.Component = strings.TrimSuffix(component.Name(), filepath.Ext(component.Name()))
				Docs[language.Name()] = append(Docs[language.Name()], s)
			}
		}
	}
}

func RenderTemplate() {

}

func main() {
	Templates = make(map[string]*template.Template)
	Docs = make(map[string][]*Single)

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
						//
						PrepareAssets()
						// 載入並解析文件模板。
						PrepareTemplate()
						//
						PrepareDocs()

						for language, singles := range Docs {
							var wgMain sync.WaitGroup
							wgMain.Add(len(singles))

							for _, single := range singles {
								<-time.After(time.Second * 2)
								go func(single *Single) {
									var wg sync.WaitGroup
									total := 0
									for _, v := range single.Definitions {
										total += len(v.Sections)
										wg.Add(len(v.Sections))
									}
									fmt.Println(total)

									for _, chapter := range single.Definitions {
										chapter.Description = Markdown(chapter.Description)
										go func(chapter *Chapter) {
											for _, section := range chapter.Sections {
												go func(section *Section) {
													section.Description = Markdown(section.Description)
													section.Example = section.HTML
													section.HTML = Tag(Highlight(Trim(section.HTML, section.Remove)))
													wg.Done()
												}(section)
											}
										}(chapter)
									}
									wg.Wait()
									var r bytes.Buffer
									err := Templates["docs"].Execute(&r, single)
									if err != nil {
										panic(err)
									}
									err = os.MkdirAll(fmt.Sprintf("./html/%s/%s/", language, single.Category), os.ModePerm)
									if err != nil {
										panic(err)
									}
									err = ioutil.WriteFile(fmt.Sprintf("./html/%s/%s/%s.html", language, single.Category, single.Component), r.Bytes(), 0644)
									if err != nil {
										panic(err)
									}
									fmt.Println(single.Component)
									wgMain.Done()
								}(single)
							}
							wgMain.Wait()
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

func Markdown(code string) string {
	return string(blackfriday.Run([]byte(code)))
}

func Trim(code string, remove []string) string {
	for _, v := range remove {
		code = strings.Replace(code, v, "", -1)
	}
	return code
}

func Tag(code string) string {
	re := regexp.MustCompile(`\[\[(.*?)\]\]`)
	code = re.ReplaceAllString(code, "<mark>$1</mark>")

	re = regexp.MustCompile("!-(.*?)-!")
	result := ReplaceAllStringSubmatchFunc(re, code, func(groups []string) string {
		if len(groups) == 0 {
			return ""
		}
		switch groups[0] {
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
	return result
}

func Highlight(code string) string {
	cmd := exec.Command("hljs")
	cmd.Stdin = bytes.NewBuffer([]byte(fmt.Sprintf("<pre><code class='html'>%s</code></pre>", html.EscapeString(code))))
	out, err := cmd.CombinedOutput()
	if err != nil {
		panic(err)
	}
	return string(out)
}
