package main

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	"github.com/teacat/davai"
	"github.com/teacat/maxim"

	"github.com/teacat/pathx"

	"github.com/radovskyb/watcher"
)

//
func move(sourcePath, destPath string) {
	inputFile, err := os.Open(sourcePath)
	if err != nil {
		log.Fatalf("Couldn't open source file: %s", err)
	}
	outputFile, err := os.Create(destPath)
	if err != nil {
		inputFile.Close()
		log.Fatalf("Couldn't open dest file: %s", err)
	}
	defer outputFile.Close()
	_, err = io.Copy(outputFile, inputFile)
	inputFile.Close()
	if err != nil {
		log.Fatalf("Writing to output file failed: %s", err)
	}
	err = os.Remove(sourcePath)
	if err != nil {
		log.Fatalf("Failed removing original file: %s", err)
	}
}

//
func path(typ string) string {
	exe, err := os.Executable()
	if err != nil {
		log.Fatalln(err)
	}
	r := pathx.JoinDir(strings.Split(exe, "tocas/")[0], "tocas")

	switch typ {
	case "cli":
		return pathx.JoinDir(r, "cli")
	case "src":
		return pathx.JoinDir(r, "src")
	case "dist":
		return pathx.JoinDir(r, "dist")
	case "tests":
		return pathx.JoinDir(r, "tests")
	case "/":
		return r
	}
	log.Fatalf("無法找到 %s 路徑", typ)
	return ""
}

func main() {
	w := watcher.New()
	w.SetMaxEvents(1)

	log.Println("開發者工具已經啟動，正在監聽變更…")

	conf := maxim.DefaultConfig()
	conf.Upgrader = &websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	m := maxim.New(conf)
	d := davai.New()
	b := maxim.NewBucket(&maxim.BucketConfig{})
	d.Get("/ws", m.HandleRequest)

	m.HandleConnect(func(s *maxim.Session) {
		b.Put(s)
	})

	go func() {
		if err := d.Run(":8356"); err != nil {
			panic(err)
		}
	}()

	go func() {
		for {
			select {
			case event := <-w.Event:
				log.Printf("%s", event.Path)
				switch filepath.Ext(event.Path) {
				case ".yml":
					//buildColors(event.Path)
					break
				case ".sass":
					cmd := exec.Command("dart-sass", fmt.Sprintf("%s:%s", pathx.Join(path("src"), "tocas.sass"), pathx.Join(path("dist"), "tocas.css")))
					var stderr bytes.Buffer
					cmd.Stderr = &stderr
					_, err := cmd.Output()
					if err != nil {
						log.Println(err.Error() + ": " + stderr.String())
					}
					b.Write(`{"update":"sass"}`)
					break
				case ".pug":
					_, err := exec.Command("pug", event.Path).Output()
					if err != nil {
						log.Fatalln(err)
					}
					move(fmt.Sprintf("%s.html", strings.TrimSuffix(event.Path, ".pug")), pathx.Join(path("tests"), pathx.Name(event.Path)+".html"))
					build(pathx.Join(path("tests"), pathx.Name(event.Path)+".html"))
					break
				}
			case err := <-w.Error:
				log.Fatalln(err)
			case <-w.Closed:
				return
			}
		}
	}()

	r := regexp.MustCompile(`(\.sass|.pug|.yml)$`)
	w.AddFilterHook(watcher.RegexFilterHook(r, true))
	if err := w.AddRecursive(path("/")); err != nil {
		log.Fatalln(err)
	}

	if err := w.Start(time.Millisecond * 100); err != nil {
		log.Fatalln(err)
	}
}

func build(p string) {
	var buttons string

	//
	b, err := ioutil.ReadFile(p)
	if err != nil {
		log.Fatalln(err)
	}
	s := string(b)

	//
	r := regexp.MustCompile(`<!-- \+ (.*?)-->`)
	for _, v := range r.FindAllStringSubmatch(s, -1) {
		buttons += fmt.Sprintf(`<a href="#%s" class="sidebar__link">%s</a>`, url.QueryEscape(v[1]), v[1])
	}
	//
	r = regexp.MustCompile(`<!-- \+ (.*?)-->`)
	s = r.ReplaceAllString(s, `<a id="$1" href="#$1" class="section__header">$1</a>`)

	//
	r = regexp.MustCompile(`<a class="([a-zA-Z0-9 -]*)">`)
	if err != nil {
		panic(err)
	}
	s = r.ReplaceAllString(s, "<a class=\"$1\" href=\"#!\">")

	//
	t, err := ioutil.ReadFile(pathx.Join(path("cli"), "dev_cli", "test.tmpl"))
	if err != nil {
		log.Fatalln(err)
	}

	s = strings.ReplaceAll(s, "<a>", `<a href="#!">`)
	ioutil.WriteFile(p, []byte(fmt.Sprintf(string(t), filepath.Base(p), buttons, s)), 0777)
}

func reverse(s []string) []string {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
	return s
}

type ColorScheme struct {
	Foreground         string `yaml:"foreground"`
	Brand              string `yaml:"brand"`
	InvertedForeground string `yaml:"invertedForeground"`
	InvertedBrand      string `yaml:"invertedBrand"`
}

type ColorForeground struct {
	Header      string
	SubHeader   string
	Text        string
	Description string
	Link        string
	LinkHover   string
	LinkPress   string
}

/*func buildColors(p string) {
	b, err := ioutil.ReadFile(p)
	if err != nil {
		log.Fatalln(err)
	}

	var dest map[string]ColorScheme
	err = yaml.Unmarshal(b, &dest)
	if err != nil {
		log.Fatalln(err)
	}

	var output string
	for scheme, color := range dest {
		var selectorName string
		if scheme != "default" {
			selectorName = fmt.Sprintf(".-%s", scheme)
		}

		var tones []string
		colorData := noire.NewHex(color.Brand)
		latestColor := &*colorData

		var brandPrevColors []string
		for i := 0; i < 5; i++ {
			latestColor = latestColor.Tint(0.2)
			brandPrevColors = append(brandPrevColors, latestColor.HTML())
		}
		brandPrevColors = reverse(brandPrevColors)

		tones = append(tones, brandPrevColors...)
		tones = append(tones, colorData.HTML())

		latestColor = &*colorData
		var brandNextColors []string
		for i := 0; i < 4; i++ {
			latestColor = latestColor.Shade(0.1)
			brandNextColors = append(brandNextColors, latestColor.HTML())
		}

		tones = append(tones, brandNextColors...)

		output += fmt.Sprintf("*%s%s%s, *%s *\n", selectorName, selectorName, selectorName, selectorName)
		for i, v := range tones {
			output += fmt.Sprintf("    --tone%d: %s\n", i, v)
		}

		var foreground ColorForeground
		f := noire.NewHex(color.Foreground)
		if f.IsDark() {
			foreground = ColorForeground{
				Header: f.Shade(0.2).HTML(),
				SubHeader : f.Shade(0.1).HTML(),
				Text: f.HTML(),
				Description: f.Tint(0.1).HTML(),
				Link: "#036AC7",
				LinkHover: "#024E92",
				LinkPress: "#03315C",
				}
		} else {
			foreground = ColorForeground{
				Header: f.Tint(0.2).HTML(),
	SubHeader : f.Tint(0.1).HTML(),
	Text: f.HTML(),
	Description: f.Shade(0.1).HTML(),
	Link: "#FFF",
				LinkHover: "#FFF",
				LinkPress: "#FFF",
			}
		}


		output += fmt.Sprintf("    --brand: %s\n", color.Brand)

		palettes := map[string]string{
		"standaloneTextColor": "--var(--tone6)",

		"typographyTextColor": foreground.Text,
		"typographyHeaderTextColor": foreground.Header,
		"typographyDescriptionTextColor": foreground.Description,
		"typographyLinkTextColor": foreground.Link,
		"typographyLinkHoveredTextColor": foreground.LinkHover,
		"typographyLinkPressedTextColor": foreground.LinkPress,
		"typographyBackgroundColor": "--var(--tone6)",
		"typographyHoveredBackgroundColor": "--var(--tone7)",
		"typographyPressedBackgroundColor": "--var(--tone8)",
		"typographySecondaryBackgroundColor": "--var(--tone7)",
		"typographyTertiaryBackgroundColor": "--var(--tone8)",

		"emphasizedTextColor": foreground.Text,
		"emphasizedLinkTextColor": foreground.Link,
		"emphasizedBackgroundColor": "--var(--tone6)",
		"emphasizedHoveredBackgroundColor": "--var(--tone7)",
		"emphasizedPressedBackgroundColor": "--var(--tone8)",

		"outlinedTextColor": "--var(--tone6)",
		"outlinedBorderColor": "--var(--tone6)",

		"borderColor": "--var(--tone6)",
		"indicatedBorderColor": "--var(--tone8)",
		"indicatedSideBorderColor": "#E9E9E9",

		"disabledTextColor":
		"disabledBackgroundColor":
		"disabledBorderColor":

		"loaderFillColor":
		"loaderLineColor":
	}
	}
	fmt.Println(output)
}*/

/*func buildColors(p string) {
	b, err := ioutil.ReadFile(p)
	if err != nil {
		log.Fatalln(err)
	}

	var dest map[string]map[string]map[string]string
	err = yaml.Unmarshal(b, &dest)
	if err != nil {
		log.Fatalln(err)
	}

	component := filepath.Base(filepath.Dir(p))
	var content string

	for colorName, colorSchemes := range dest {
		if colorName == "default" {
			colorName = ""
		} else {
			colorName = ".-" + colorName
		}

		//
		//
		//
		/// ADD INVERTED by light or dark oppsite
		//
		//
		///

		content += fmt.Sprintf(".ts.%s%s%s%s,\n.ts.%ss%s .ts.%s\n", component, colorName, colorName, colorName, component, colorName, component)
		for name, color := range colorSchemes["light"] {
			if strings.Contains(color, `(`) {
				color = fmt.Sprintf("#{%s}", color)
			} else {
				color = fmt.Sprintf("#%s", color)
			}
			content += fmt.Sprintf("    --%s: %s\n", name, color)
		}
		content += "    @media (prefers-color-scheme: dark)\n"
		for name, color := range colorSchemes["dark"] {
			if strings.HasPrefix(color, `rgba(`) {
				color = fmt.Sprintf("%s", color)
			} else if strings.Contains(color, `(`) {
				color = fmt.Sprintf("#{%s}", color)
			} else {
				color = fmt.Sprintf("#%s", color)
			}
			content += fmt.Sprintf("        --%s: %s\n", name, color)
		}
	}

	ioutil.WriteFile(pathx.Join(path("src"), "_generated", fmt.Sprintf("_%s.colors.map.sass", component)), []byte(content), 0777)
	//ioutil.WriteFile(pathx.Join(filepath.Dir(path), "_colors.map.sass"), []byte(content), 0777)
}
*/
