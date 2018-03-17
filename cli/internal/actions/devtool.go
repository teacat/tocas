package actions

import (
	"bufio"
	"fmt"
	"os/exec"

	"github.com/AlecAivazis/survey"
)

func DevMain() {
	answer := ""
	prompt := &survey.Select{
		Message: "需要監聽並編譯什麼嗎？",
		Options: []string{
			"Sass 檔案",
			"Coffee 模塊",
			"返回",
		},
	}
	survey.AskOne(prompt, &answer, nil)

	switch answer {
	case "返回":
		Initialize()
	case "Sass 檔案":

		//cmd := exec.Command("wt", "watch", "/Users/YamiOdymel/Workspace/TocasUI/src/tocas.sass", "-b", "dist/", "-s", "compressed")

	case "Coffee 模塊":
		cmd := exec.Command("coffee", "-b", "-c", "-w", "-o", "./dist", "/Users/YamiOdymel/Workspace/TocasUI/src/javascript")

		stdout, _ := cmd.StdoutPipe()
		cmd.Start()

		scanner := bufio.NewScanner(stdout)
		scanner.Split(bufio.ScanWords)
		for scanner.Scan() {
			m := scanner.Text()
			fmt.Println(m)
		}
		cmd.Wait()
	}
}
