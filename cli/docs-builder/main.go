package main

import (
	"log"
	"os"

	cli "github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "docs-builder",
		Usage: "Tocas UI 的相關神奇妙妙工具。",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "lang",
				Aliases: []string{"l"},
				Usage:   "指定要載入的相關語系代號，只能同時間指定一個，例如：`zh-tw`。",
			},
			&cli.StringFlag{
				Name:  "screenshot-path",
				Usage: "會讓 Chrome Headless 螢幕截圖的本地 file:/// 路徑，例如：`file:///C:/Users/yami/tocas/examples/`",
			},
			&cli.StringFlag{
				Name:  "mailto",
				Usage: "Gmail 的電子郵件地址。",
			},
			&cli.StringFlag{
				Name:  "mailpwd",
				Usage: "Gmail 的應用程式密碼。",
			},
			&cli.StringFlag{
				Name:  "mailtmpl",
				Usage: "要寄送信件的 HTML 檔案路徑。",
			},
		},
		Commands: []*cli.Command{
			{
				Name:   "build",
				Usage:  "會建置指定語系的文件。",
				Action: build,
			},
			{
				Name:   "pack",
				Usage:  "會將 Tocas UI 的 /src 轉譯至 /dist。",
				Action: pack,
			},
			{
				Name:   "screenshot",
				Usage:  "會透過 Chrome Headless 螢幕截圖資料夾裡的所有網頁並且存到 /examples/screenshots。",
				Action: screenshot,
			},
			{
				Name:   "compress",
				Usage:  "",
				Action: compressScreenshots,
			},
			{
				Name:   "mail",
				Usage:  "會透過 Gmail 寄送指定網頁給指定的收件人，用來測試 Email 模板。",
				Action: testMail,
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
