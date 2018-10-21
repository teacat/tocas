package main

import (
	"os"
	"os/exec"

	"gopkg.in/AlecAivazis/survey.v1"
)

func main() {
	var value string

	prompt := &survey.Select{
		Message: "歡迎使用 Tocas CLI，君欲何爲？",
		Options: []string{"文件工具", "自訂並建置", "開發人員選項", "Change Language"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "自訂並建置":
	case "文件工具":
		cliDocumentation()
	case "開發人員選項":
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

func cliDevelop() {
	var value string

	prompt := &survey.Select{
		Message: "你現在已成為開發人員，請問何事？",
		Options: []string{"監聽並即時編譯樣式"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "監聽並即時編譯樣式":
		command := exec.Command("wt", "watch", "../tocas.sass", "-b", "../../dist/", "-s", "compressed")
		command.Stdout = os.Stdout
		command.Stderr = os.Stdout

		command.Start()
		command.Wait()

		//pipe, _ := cmd.StdoutPipe()
		//if err := cmd.Start(); err != nil {
		//	// handle error
		//}
		//reader := bufio.NewReader(pipe)
		//line, err := reader.ReadString('\n')
		//for err == nil {
		//	fmt.Println(line)
		//	line, err = reader.ReadString('\n')
		//}
	}
}
