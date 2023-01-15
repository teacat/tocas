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
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
