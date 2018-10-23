package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
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
						executeCommand("Pug", []string{"pug", event.Path}, event)
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
