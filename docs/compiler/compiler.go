package main

import (
	"os"

	"github.com/urfave/cli"
)

func main() {
	var watch bool
	var compiler *Compiler

	// 初始化應用程式資訊。
	app := cli.NewApp()
	app.Name = "Compiler"
	app.Version = "1.0.0"
	app.Author = "Yami Odymel"
	app.Usage = "The compiler compiles the markdown into the static HTML files."

	// 定義應用程式可用參數。
	app.Flags = []cli.Flag{
		cli.BoolFlag{
			Name:        "watch, w",
			Usage:       "watch and compile the file changes",
			Destination: &watch,
		},
	}

	// 定義應用程式的進入點。
	app.Action = func(c *cli.Context) error {
		compiler = &Compiler{
			Parser:     &Parser{},
			Preparser:  &Preparser{},
			Processor:  &Processor{},
			Transpiler: &Transpiler{},
		}
		return compiler.Startup(watch)
	}

	// 擷取傳入參數並執行此應用程式。
	app.Run(os.Args)
}

// Compiler 是編譯器主體，
// 會呼叫監聽器等函式並進行一連串的動作將文件編譯成可供瀏覽器與人類讀取的靜態 HTML 網頁。
type Compiler struct {
	Parser     *Parser
	Preparser  *Preparser
	Processor  *Processor
	Transpiler *Transpiler
}

// Startup
func (c *Compiler) Startup(watch bool) error {
	return nil
}
