package main

import (
	"github.com/TeaMeow/TocasUI/docs/program/collector"
	"gopkg.in/AlecAivazis/survey.v1"
)

func main() {
	var value string

	prompt := &survey.Select{
		Message: "謝用 Tocas CLI，君欲何爲？",
		Options: []string{"文件工具", "自訂並建置", "Change Language"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "自訂並建置":
	case "文件工具":
		cliDocumentation()
	case "Change Language":
	}
}

func cliDocumentation() {
	var value string

	prompt := &survey.Select{
		Message: "欲以「文件工具」利何事？",
		Options: []string{"編譯文件"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "編譯文件":
		collector.Collect("../yaml/zh-tw")
	}
}
