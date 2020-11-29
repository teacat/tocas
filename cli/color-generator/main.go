package main

import (
	"fmt"
	"log"
	"math"
	"os"

	"github.com/teacat/noire"
	"github.com/urfave/cli"
)

var colorWeights = []int{
	50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900,
}
var colorShades = []float64{
	-1, -0.93, -0.87, -0.72, -0.6, -0.3, 0, 0.205, 0.385, 0.58, 0.755,
}

func main() {
	app := &cli.App{
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "name",
				Aliases: []string{"n"},
				Value:   "",
				Usage:   "emphasis name",
			},
			&cli.StringFlag{
				Name:    "color",
				Aliases: []string{"c"},
				Value:   "",
				Usage:   "base color, without #, ex: 00ADEA, FFF",
			},
		},
		Name:   "color-generator",
		Action: endpoint,
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

func endpoint(c *cli.Context) error {
	for k, w := range colorWeights {
		color := noire.NewHex(c.String("color"))
		shade := colorShades[k]
		if shade < 0 {
			color = color.Tint(math.Abs(shade))
		} else if shade > 0 {
			color = color.Shade(math.Abs(shade))
		}
		fmt.Printf("--ts-global_%s-%d: %.0f, %.0f, %.0f;\n", c.String("name"), w, color.Red, color.Green, color.Blue)
	}
	return nil
}
