package main

import (
	"log"
	"os"

	cli "github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "docs-builder",
		Usage: "The command line tool for building Tocas UI documentations.",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "port",
				Aliases: []string{"p"},
				Usage:   "The `PORT` for serving the documentation.",
			},
			&cli.StringFlag{
				Name:    "lang",
				Aliases: []string{"l"},
				Usage:   "The specified documentation `LANGUAGE` to build, can only specify for one.",
			},
		},
		Commands: []*cli.Command{
			// {
			// 	Name:   "serve",
			// 	Usage:  "Run a web server and serve the documentation.",
			// 	Action: serve,
			// },
			{
				Name:   "build",
				Usage:  "Build the documentation as static HTML files.",
				Action: build,
			},
			{
				Name:   "watch",
				Usage:  "Watching the file changes and build the documentation in real-time.",
				Action: watch,
			},
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

// func serve(c *cli.Context) error {
//
// }
