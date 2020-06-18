package main

import (
	"fmt"
	"log"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/teacat/noire"
	"github.com/urfave/cli"
)

type Color struct {
}

type BlockColor struct {
	Background               noire.Color `color:"block_background-color"                 light:"shade(0.1)" dark:"shade(0.1)"`
	Border                   noire.Color `color:"block_border-color"                     light:"shade(0.1)" dark:"shade(0.1)"`
	BorderHover              noire.Color `color:"block_border-hover-color"               light:"shade(0.05)" dark:"shade(0.1)"`
	BorderDisabled           noire.Color `color:"block_border-disabled-color"            light:"shade(0.1)" dark:"shade(0.1)"`
	BorderFocus              noire.Color `color:"block_border-focus-color"               light:"shade(0.1)" dark:"shade(0.1)"`
	OutlineFocus             noire.Color `color:"block_outline-focus-color"              light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundSecondary      noire.Color `color:"block_background-secondary-color"       light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundSecondaryHover noire.Color `color:"block_background-secondary-hover-color" light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundTertiary       noire.Color `color:"block_background-tertiary-color"        light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundTertiaryHover  noire.Color `color:"block_background-tertiary-hover-color"  light:"shade(0.1)" dark:"shade(0.1)"`
	Line                     noire.Color `color:"block_line-color"                       light:"shade(0.1)" dark:"shade(0.1)"`
	BorderIndicated          noire.Color `color:"block_border-indicated-color"           light:"shade(0.1)" dark:"shade(0.1)"`
	ShadowRaised             noire.Color `color:"block_shadow-raised-color"              light:"shade(0.1)" dark:"shade(0.1)"`
}

type TypographyColor struct {
	Symbol      noire.Color `color:"typography_symbol-color"      light:"tint(0.1)" dark:"shade(0.1)"`
	Color       noire.Color `color:"typography_color"             light:"FFF" dark:"333"`
	Description noire.Color `color:"typography_description-color" light:"ECECEC" dark:"777"`
	Placeholder noire.Color `color:"typography_placeholder-color" light:"shade(0.1)" dark:"shade(0.1)"`
	Disabled    noire.Color `color:"typography_disabled-color"    light:"tint(0.2)" dark:"999999"`
	Active      noire.Color `color:"typography_active-color"      light:"shade(0.1)" dark:"shade(0.1)"`
	Link        noire.Color `color:"typography_link-color"        light:"shade(0.1)" dark:"shade(0.1)"`
	LinkHover   noire.Color `color:"typography_link-hover-color"  light:"shade(0.1)" dark:"shade(0.1)"`
}

type EmphasizedColor struct {
	Background               noire.Color `color:"emphasized_background-color"                 light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundHover          noire.Color `color:"emphasized_background-hover-color"           light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundSecondary      noire.Color `color:"emphasized_background-secondary-color"       light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundSecondaryHover noire.Color `color:"emphasized_background-secondary-hover-color" light:"shade(0.1)" dark:"shade(0.1)"`
	BackgroundDisabled       noire.Color `color:"emphasized_background-disabled-color"        light:"shade(0.1)" dark:"shade(0.1)"`
	Disabled                 noire.Color `color:"emphasized_disabled-color"                   light:"shade(0.1)" dark:"shade(0.1)"`
	Color                    noire.Color `color:"emphasized_color"                            light:"shade(0.1)" dark:"shade(0.1)"`
	EmphasizedBorderColor    noire.Color `color:"emphasized_emphasized-border-color"          light:"shade(0.1)" dark:"shade(0.1)"`
	Hover                    noire.Color `color:"emphasized_hover-color"                      light:"shade(0.1)" dark:"shade(0.1)"`
	Border                   noire.Color `color:"emphasized_border-color"                     light:"shade(0.1)" dark:"shade(0.1)"`
	BorderHover              noire.Color `color:"emphasized_border-hover-color"               light:"shade(0.1)" dark:"shade(0.1)"`
	BorderFocus              noire.Color `color:"emphasized_border-focus-color"               light:"shade(0.1)" dark:"shade(0.1)"`
}

var (
	tagColor = "color"
	tagLight = "light"
	tagDark  = "dark"
)

func main() {
	app := &cli.App{
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "name",
				Aliases: []string{"n"},
				Value:   "",
				Usage:   "theme name",
			},
			&cli.StringFlag{
				Name:    "color",
				Aliases: []string{"c"},
				Value:   "",
				Usage:   "base color, without #, ex: 00ADEA, FFF",
			},
			&cli.StringFlag{
				Name:    "scheme",
				Aliases: []string{"s"},
				Value:   "light",
				Usage:   "`light` or `dark` as the color scheme",
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
	baseColor := noire.NewHex(c.String("color"))
	foreColor := c.String("scheme")

	for k, v := range fill(baseColor, foreColor, BlockColor{}) {
		fmt.Printf("--%s: %s;\n", k, v)
	}
	for k, v := range fill(baseColor, foreColor, TypographyColor{}) {
		fmt.Printf("--%s: %s;\n", k, v)
	}
	for k, v := range fill(baseColor, foreColor, EmphasizedColor{}) {
		fmt.Printf("--%s: %s;\n", k, v)
	}
	return nil
}

// fill
func fill(baseColor noire.Color, foreColor string, color interface{}) map[string]string {
	colors := map[string]string{}
	t := reflect.TypeOf(color)

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)

		var color noire.Color
		switch foreColor {
		case "light":
			color = process(baseColor, field.Tag.Get(tagLight))
		case "dark":
			color = process(baseColor, field.Tag.Get(tagDark))
		}
		r, g, b := color.RGB()
		colors[field.Tag.Get(tagColor)] = fmt.Sprintf("%.0f, %.0f, %.0f", r, g, b)
	}

	return colors
}

// process
func process(baseColor noire.Color, tag string) noire.Color {
	switch {
	case strings.HasPrefix(tag, "shade"):
		percent, _ := strconv.ParseFloat(strings.TrimLeft(strings.TrimRight(tag, ")"), "shade("), 10)
		return baseColor.Shade(percent)
	case strings.HasPrefix(tag, "tint"):
		percent, _ := strconv.ParseFloat(strings.TrimLeft(strings.TrimRight(tag, ")"), "tint("), 10)
		return baseColor.Tint(percent)
	default:
		return noire.NewHex(tag)
	}

	return noire.Color{}
}
