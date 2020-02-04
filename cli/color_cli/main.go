package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"github.com/teacat/noire"
)

func reverse(s []string) []string {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
	return s
}

func getTones(c string) []string {
	color := noire.NewHex(c)
	latestColor := &*color

	var colors []string

	var bgPrevColors []string
	for i := 0; i < 5; i++ {
		latestColor = latestColor.Tint(0.2)
		bgPrevColors = append(bgPrevColors, latestColor.HTML())
	}

	bgPrevColors = reverse(bgPrevColors)

	colors = append(colors, bgPrevColors...)
	colors = append(colors, color.HTML())

	latestColor = &*color
	var bgNextColors []string
	for i := 0; i < 6; i++ {
		latestColor = latestColor.Shade(0.05)
		bgNextColors = append(bgNextColors, latestColor.HTML())
	}

	colors = append(colors, bgNextColors...)

	return colors
}

func main() {
	foreground := getTones(os.Args[1])
	background := getTones(os.Args[2])

	var preview string
	var output string
	for k, v := range foreground {
		preview += fmt.Sprintf(`<div style="width: 100px; height: 100px; display: inline-block; background: %s"></div>`, v)

		output += fmt.Sprintf("    --foregroundTone%d: %s\n", k+1, v)
	}
	preview += "<p></p>"
	for k, v := range background {
		preview += fmt.Sprintf(`<div style="width: 100px; height: 100px; display: inline-block; background: %s"></div>`, v)

		output += fmt.Sprintf("    --backgroundTone%d: %s\n", k+1, v)
	}

	fmt.Println(output)

	ioutil.WriteFile("preview.html", []byte(preview), 0777)
}

/*
map[string]string{
		"textColor":

		"standaloneTextColor":

		"typographyTextColor":
		"typographyHeaderTextColor":
		"typographyDescriptionTextColor":
		"typographyLinkTextColor":
		"typographyBackgroundColor":
		"typographyHoveredBackgroundColor":
		"typographyPressedBackgroundColor":
		"typographySecondaryBackgroundColor":
		"typographyTertiaryBackgroundColor":

		"emphasizedTextColor":
		"emphasizedLinkTextColor":
		"emphasizedBackgroundColor":
		"emphasizedHoveredBackgroundColor":
		"emphasizedPressedBackgroundColor":



		"outlinedTextColor":
		"outlinedBorderColor":

		"borderColor":
		"indicatedBorderColor":
		"indicatedSideBorderColor":

		"disabledTextColor":
		"disabledBackgroundColor":
		"disabledBorderColor":

		"loaderFillColor":
		"loaderLineColor":
	}
*/
