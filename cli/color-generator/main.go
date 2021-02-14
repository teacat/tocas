package main

import (
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"

	"github.com/teacat/noire"
	"github.com/urfave/cli"
)

var colorWeights = []int{
	50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900,
}

var colorShadesGray = []float64{
	-1, -0.93, -0.87, -0.72, -0.6, -0.3, 0, 0.205, 0.385, 0.58, 0.755,
}
var colorShadesLight = []float64{
	-1, -0.93, -0.87, -0.72, -0.6, -0.3, 0, 0.06, 0.205, 0.385, 0.58,
}
var colorShadesDark = []float64{
	-1, -0.93, -0.87, -0.72, -0.6, -0.3, 0, 0.1, 0.205, 0.385, 0.58,
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
				Usage:   "base color, hex or r,g,b, ex: #00ADEA or 255, 255, 255",
			},
			&cli.StringFlag{
				Name:    "shades",
				Aliases: []string{"s"},
				Value:   "dark",
				Usage:   "shades level for: gray, light, dark",
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
	var shades []float64
	//
	switch c.String("shades") {
	case "gray":
		shades = colorShadesGray
	case "light":
		shades = colorShadesLight
	case "dark":
		shades = colorShadesDark
	}

	//
	for k, w := range colorWeights {
		//
		var color noire.Color
		if string(c.String("color")[0]) == "#" {
			color = noire.NewHex(c.String("color"))
		} else {
			rgb := strings.Split(c.String("color"), ",")
			r, _ := strconv.Atoi(strings.TrimSpace(rgb[0]))
			g, _ := strconv.Atoi(strings.TrimSpace(rgb[1]))
			b, _ := strconv.Atoi(strings.TrimSpace(rgb[2]))
			color = noire.NewRGB(float64(r), float64(g), float64(b))
		}
		//
		shade := shades[k]
		if shade < 0 {
			color = color.Tint(math.Abs(shade))
		} else if shade > 0 {
			color = color.Shade(math.Abs(shade))
		}
		//
		fmt.Printf("--ts-global_%s-%d: %.0f, %.0f, %.0f;\n", c.String("name"), w, color.Red, color.Green, color.Blue)
	}
	return nil
}
