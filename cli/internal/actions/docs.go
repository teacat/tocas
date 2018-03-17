package actions

import "github.com/AlecAivazis/survey"

func DocsMain() {
	answer := ""
	prompt := &survey.Select{
		Message: "需要什麼協助嗎？",
		Options: []string{
			"啟動文件伺服器",
			"執行文件編譯工具",
			"返回",
		},
	}
	survey.AskOne(prompt, &answer, nil)

	switch answer {
	case "返回":
		Initialize()
	}
}
