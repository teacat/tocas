package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/radovskyb/watcher"
	"gopkg.in/AlecAivazis/survey.v1"
)

var sassCompiler = "wt"

func main() {
	var value string

	prompt := &survey.Select{
		Message: "歡迎使用 Tocas CLI：",
		Options: []string{"文件工具", "自訂並建置", "開發選項", "Change Language"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "自訂並建置":
	case "文件工具":
		cliDocumentation()
	case "開發選項":
		cliDevelop()
	case "Change Language":
	}
}

func cliDocumentation() {
	var value string

	prompt := &survey.Select{
		Message: "試圖使用何種「文件工具」？",
		Options: []string{"編譯文件"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "編譯文件":
		Collect("../yaml/zh-tw")
	}
}

func cliChangeCompiler() {
	var value string

	prompt := &survey.Select{
		Message: "欲選擇何種 Sass 編譯器？",
		Options: []string{"Sassc（快速、C/C++）", "Wellington（快速、Golang）", "Node Sass（稍慢、Node.js）", "Sass（最慢、Dart）"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "Sassc（快速、C/C++）":
		sassCompiler = "sassc"
	case "Wellington（快速、Golang）":
		sassCompiler = "wt"
	case "Node Sass（稍慢、Node.js）":
		sassCompiler = "node-sass"
	case "Sass（最慢、Dart）":
		sassCompiler = "sass"
	}

	cliDevelop()
}

func executeCommand(action string, command []string, event watcher.Event) {
	now := time.Now()
	cmd := exec.Command(command[0], command[1:]...)
	//cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stdout
	cmd.Start()
	cmd.Wait()
	log.Printf("■ 已執行 %s（%s）：%s\n", action, time.Since(now), event.Path)
}

func cliDevelop() {
	var value string

	prompt := &survey.Select{
		Message: "你現在已成為開發人員，請問何事？",
		Options: []string{"監聽並即時編譯樣式", "更改 Sass 編譯器"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "更改 Sass 編譯器":
		cliChangeCompiler()
	case "監聽並即時編譯樣式":

		w := watcher.New()
		w.SetMaxEvents(1)

		go func() {
			for {
				select {
				case event := <-w.Event:
					switch strings.TrimLeft(filepath.Ext(event.Name()), ".") {
					case "coffee":
						fmt.Printf("■ 已編譯 Coffee：%s\n", event.Path)
					case "sass":
						switch sassCompiler {
						case "sass":
							executeCommand("Sass", []string{"sass", "--indented", "../tocas.sass:../../dist/tocas.css"}, event)
						case "wt":
							executeCommand("Wellington", []string{"wt", "compile", "../tocas.sass", "-b", "../../dist/"}, event)
						case "node-sass":
							executeCommand("Node Sass", []string{"node-sass", "../tocas.sass", ">", "../../dist/tocas.css"}, event)
						case "sassc":
							executeCommand("Sassc", []string{"sassc", "--sass", "../tocas.sass", "../../dist/tocas.css"}, event)
						}
					case "pug":

						//fileContent := test + string(dat)
						//fmt.Print(fileContent)
						//fmt.Printf("%s.html", strings.TrimSuffix(event.Path, filepath.Ext(event.Path)))

						//tmpPath := fmt.Sprintf("%s-tmp.pug", strings.TrimSuffix(event.Path, filepath.Ext(event.Path)))
						//ioutil.WriteFile((tmpPath), dat, 777)
						//executeCommand("Pug", []string{"pug", tmpPath}, event)

						//executeCommand("Pug", []string{"echo", string(fileContent), "|", "pug", ">", fmt.Sprintf("%s.html", strings.TrimSuffix(event.Path, filepath.Ext(event.Path)))}, event)
						executeCommand("Pug", []string{"pug", event.Path}, event)

						tmpPath := fmt.Sprintf("%s.html", strings.TrimSuffix(event.Path, filepath.Ext(event.Path)))
						dat, err := ioutil.ReadFile(tmpPath)
						if err != nil {
							panic(err)
						}

						newContent := fmt.Sprintf(`<html><head><title>%s</title><link rel="stylesheet" href="../../../dist/tocas.css"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="padding: 50px;">%s</body></html>`, strings.TrimSuffix(event.Name(), filepath.Ext(event.Name())), string(dat))

						re, err := regexp.Compile(`<!-- \+ (.*?)-->`)
						if err != nil {
							panic(err)
						}
						newContent = re.ReplaceAllString(newContent, "<br><br><!-- + $1 --><h1>$1</h1>")

						//newContent = strings.Replace(newContent, "<!-- +", "<br><br><!-- +", -1)
						newContent = strings.Replace(newContent, ">", "> ", -1)
						newContent = strings.Replace(newContent, "<", " <", -1)

						ioutil.WriteFile((tmpPath), []byte(newContent), 777)

					}

				case err := <-w.Error:
					log.Fatalln(err)
				case <-w.Closed:
					return
				}
			}
		}()
		if err := w.AddRecursive("../Components"); err != nil {
			log.Fatalln(err)
		}
		if err := w.Start(time.Millisecond * 100); err != nil {
			log.Fatalln(err)
		}
	}
}
