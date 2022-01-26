package main

import (
	"bytes"
	"context"
	"crypto/md5"
	"fmt"
	"html"
	"html/template"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"

	blackfriday "github.com/russross/blackfriday/v2"
	"golang.org/x/sync/errgroup"

	"gopkg.in/yaml.v2"

	cli "github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "docs-builder",
		Usage: "The command line tool for building Tocas UI documentations.",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "lang",
				Aliases: []string{"l"},
				Usage:   "The specified documentation `LANGUAGE` to build, can only specify one.",
			},
		},
		Commands: []*cli.Command{
			{
				Name:   "build",
				Usage:  "Build the documentation as static HTML files.",
				Action: build,
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

// build
func build(c *cli.Context) error {
	files, err := ioutil.ReadDir("./../../docs/" + c.String("lang") + "/components")
	if err != nil {
		log.Fatal(err)
	}

	err = os.MkdirAll("./output/"+c.String("lang")+"/", 0777)
	if err != nil {
		log.Fatal(err)
	}
	if err := exec.Command("rm", "-rf", "./output/"+c.String("lang")+"/assets").Run(); err != nil {
		log.Fatal(err)
	}
	if err := exec.Command("cp", "--recursive", "./templates/assets", "./output/"+c.String("lang")+"/assets").Run(); err != nil {
		log.Fatal(err)
	}

	b, err := os.ReadFile("./../../docs/" + c.String("lang") + "/meta.yml")
	if err != nil {
		return err
	}
	var meta Meta
	if err = yaml.Unmarshal(b, &meta); err != nil {
		return err
	}

	tmpl, err := template.New("article.html").Funcs(template.FuncMap{
		"html":        tmplHTML,
		"capitalize":  tmplCapitalize,
		"highlight":   tmplHighlight,
		"code":        tmplCode,
		"markdown":    tmplMarkdown,
		"preview":     tmplPreview,
		"marked":      tmplMarked,
		"kebablize":   tmplKebablize,
		"trim":        tmplTrim,
		"anchor":      tmplAnchor,
		"translators": tmplTranslators(meta),
	}).ParseFiles("./templates/article.html")
	if err != nil {
		log.Fatal(err)
	}

	group, _ := errgroup.WithContext(context.Background())

	for _, f := range files {
		func(f fs.FileInfo) {
			group.Go(func() error {
				file, err := os.Create("./output/" + c.String("lang") + "/" + strings.TrimSuffix(f.Name(), filepath.Ext(f.Name())) + ".html")
				if err != nil {
					return err
				}
				b, err := os.ReadFile("./../../docs/" + c.String("lang") + "/components/" + f.Name())
				if err != nil {
					return err
				}
				article := Article{
					Meta: meta,
				}
				if err = yaml.Unmarshal(b, &article); err != nil {
					return err
				}
				if article.Example.HTML != "" {
					article.Example.FormattedHTML = tmplCode(trim(trim(article.Example.HTML, []string{}), article.Remove))
				}

				for vi, v := range article.Definitions {
					for ji, j := range v.Sections {
						article.Definitions[vi].Sections[ji].FormattedHTML = tmplCode(trim(trim(j.HTML, j.Remove), article.Remove))
					}
				}
				if err = tmpl.Execute(file, article); err != nil {
					return err
				}
				log.Printf("%s Finished!", strings.TrimSuffix(f.Name(), filepath.Ext(f.Name())))
				return nil
			})
		}(f)
	}
	return group.Wait()
}

// highlight 會將純文字透過 Node 版本的 Highlight.js 來轉化為格式化後的螢光程式碼。
func highlight(s string) string {
	hash := fmt.Sprintf("%x", md5.Sum([]byte(s)))
	b, err := ioutil.ReadFile("./caches/hljs/" + hash)
	if err != nil {
		os.MkdirAll("./caches/hljs/", 0777)
	}
	if len(b) != 0 {
		return string(b)
	}
	cmd := exec.Command("hljs", "html")
	cmd.Stdin = bytes.NewBuffer([]byte(fmt.Sprintf("<pre><code>%s</code></pre>", html.EscapeString(s))))
	output, err := cmd.CombinedOutput()
	if err != nil {
		panic(err.Error() + string(output))
	}
	err = ioutil.WriteFile("./caches/hljs/"+hash, output, 0777)
	if err != nil {
	}
	return string(output)
}

// beautify 會透過 js-beautify 美化程式碼。
func beautify(s string, typ string) string {
	hash := fmt.Sprintf("%x", md5.Sum([]byte(s)))
	b, err := ioutil.ReadFile("./caches/beautify/" + hash)
	if err != nil {
		os.MkdirAll("./caches/beautify/", 0777)
	}
	if len(b) != 0 {
		return string(b)
	}
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
	err = ioutil.WriteFile("./caches/beautify/"+hash, output, 0777)
	if err != nil {
	}
	return string(output)
}

// asset
func asset(s string, real bool) string {
	switch s {
	case "16:9":
		s = "16-9.png"
	case "1:1":
		s = "1-1.png"
	case "1:1_white":
		s = "1-1_white.png"
	case "4:3":
		s = "4-3.png"
	case "user":
		s = "user.png"
	case "user2":
		s = "user2.png"
	case "user3":
		s = "user3.png"
	case "embed:karen":
		s = "karen.png"
	case "embed:vimeo":
		s = "vimeo.png"
	case "embed:video":
		s = "video.mp4"
	}
	if real {
		return "./assets/images/" + s
	}
	return s
}

// trim
func trim(s string, r []string) string {
	for _, v := range r {
		s = strings.Replace(s, v+"\n", "", -1)
		s = strings.Replace(s, v, "", -1)
	}
	return s
}

// clean
func clean(s string) string {
	s = regexp.MustCompile(`\(\((.*?)\)\)`).ReplaceAllString(s, "$1")
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

// decodePlaceholder 會將預置標籤轉為實際可呈現的 HTML 標籤。
func decodePlaceholder(s string) string {
	//
	s = regexp.MustCompile(`BARK(.*?)BARKEND`).ReplaceAllString(s, "<mark class=\"tag\">$1</mark>")
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

// placeholder 會將預置標籤轉為純文字，避免被 Beautifier 或 Highlight JS 誤認。
func placeholder(s string) string {
	// 大標籤標籤。
	s = regexp.MustCompile(`\(\((.*?)\)\)`).ReplaceAllString(s, `BARK${1}BARKEND`)
	// 螢光標籤。
	s = regexp.MustCompile(`\[\[(.*?)\]\]`).ReplaceAllString(s, `MARK${1}MARKEND`)
	// 元件連結。
	s = regexp.MustCompile(`{{(.*?)}}`).ReplaceAllString(s, `COMP${1}COMPEND`)
	// 圖片。
	s = regexp.MustCompile(`!-(.*?)-!`).ReplaceAllString(s, `IMAG${1}IMAGEND`)
	return s
}

// markdown 會將傳入的字串從 Markdown 轉為 HTML。
func markdown(s string) string {
	return string(blackfriday.Run([]byte(s)))
}

// replaceAllStringSubmatchFunc
func replaceAllStringSubmatchFunc(re *regexp.Regexp, str string, repl func([]string) string) string {
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
