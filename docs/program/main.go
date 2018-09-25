package main

import (
	"gopkg.in/AlecAivazis/survey.v1"
)

func main() {
	color := ""
	prompt := &survey.Select{
		Message: "謝用 Tocas CLI，君欲何爲？",
		Options: []string{"自訂並建置", "文件工具", "Change Language"},
	}
	survey.AskOne(prompt, &color, nil)
}
