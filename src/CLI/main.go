package main

import (
	"github.com/TeaMeow/TocasUI/src/CLI/watcher"
	"gopkg.in/AlecAivazis/survey.v1"
)

var sassCompiler int

func main() {
	var value string

	prompt := &survey.Select{
		Message: "歡迎使用 Tocas 指令列程式",
		Options: []string{"自訂並建置", "文件工具", "開發與編譯", "Change Language"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "自訂並建置":
	case "文件工具":
		cliDocumentation()
	case "開發與編譯":
		Developer()
	case "Change Language":
	}
}

func cliDocumentation() {
	var value string

	prompt := &survey.Select{
		Message: "想要編譯或是開發文件嗎？",
		Options: []string{"編譯靜態文件", "監聽並即時轉換文件"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "編譯靜態文件":
		//Collect("../yaml/zh-tw")
	case "監聽並即時轉換文件":
	}
}

func ChangeSassCompiler() {
	var value string

	prompt := &survey.Select{
		Message: "欲選擇何種 Sass 編譯器？",
		Options: []string{"Sassc（快速、C/C++）", "Wellington（快速、Golang）", "Node Sass（稍慢、Node.js）", "Sass（最慢、Dart）"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "Sassc（快速、C/C++）":
		sassCompiler = watcher.SasscCompiler
	case "Wellington（快速、Golang）":
		sassCompiler = watcher.WellingtonCompiler
	case "Node Sass（稍慢、Node.js）":
		sassCompiler = watcher.NodeCompiler
	case "Sass（最慢、Dart）":
		sassCompiler = watcher.SassCompiler
	}

	Developer()
}

type Icon struct {
	Changes []string `json:"changes"`
	Label   string   `json:"label"`
	Styles  []string `json:"styles"`
	Unicode string   `json:"unicode"`
}

func Developer() {
	var value string

	prompt := &survey.Select{
		Message: "想要進行什麼開發手續？",
		Options: []string{"監聽並即時編譯", "下載並更新圖示庫", "更改 Sass 編譯器"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "更改 Sass 編譯器":
		ChangeSassCompiler()
	case "下載並更新圖示庫":
		UpdateIcons()
	case "監聽並即時編譯":
		WatchFiles()
	}
}

func WatchFiles() {
	w := watcher.New(&watcher.Option{
		SassCompiler: sassCompiler,
	})
	w.Run()
}
