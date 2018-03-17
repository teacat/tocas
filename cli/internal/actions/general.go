package actions

import (
	"os"

	"github.com/AlecAivazis/survey"
)

func Initialize() {
	print("\033[H\033[2J")
	answer := ""
	prompt := &survey.Select{
		Message: "歡迎使用 Tocas CLI，君欲做何事？",
		Options: []string{
			"🗜️  自訂與客製化",
			"🔧  開發人員工具",
			"📚  使用文件與教學",
			"🌏  Change Language",
			"離開",
		},
	}
	survey.AskOne(prompt, &answer, nil)

	switch answer {
	case "🗜️  自訂與客製化":
		CustomizeMain()
	case "🔧  開發人員工具":
		DevMain()
	case "📚  使用文件與教學":
		DocsMain()
	case "🌏  Change Language":
		LanguageMain()
	case "離開":
		os.Exit(0)
	}
}
