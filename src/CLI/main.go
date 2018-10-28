package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/google/go-github/github"
	"github.com/mholt/archiver"
	"github.com/radovskyb/watcher"
	"gopkg.in/AlecAivazis/survey.v1"
)

var sassCompiler = "wt"

func main() {
	var value string

	prompt := &survey.Select{
		Message: "歡迎使用 Tocas 指令列程式",
		Options: []string{"自訂並建置", "文件工具", "開發與編譯", "Change Language"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "自訂並建置":
	case "文件工具":
		cliDocumentation()
	case "開發與編譯":
		cliDevelop()
	case "Change Language":
	}
}

func cliDocumentation() {
	var value string

	prompt := &survey.Select{
		Message: "想要編譯或是開發文件嗎？",
		Options: []string{"編譯靜態文件", "監聽並即時轉換文件"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "編譯靜態文件":
		Collect("../yaml/zh-tw")
	case "監聽並即時轉換文件":
	}
}

func cliChangeCompiler() {
	var value string

	prompt := &survey.Select{
		Message: "欲選擇何種 Sass 編譯器？",
		Options: []string{"Sassc（快速、C/C++）", "Wellington（快速、Golang）", "Node Sass（稍慢、Node.js）", "Sass（最慢、Dart）"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "Sassc（快速、C/C++）":
		sassCompiler = "sassc"
	case "Wellington（快速、Golang）":
		sassCompiler = "wt"
	case "Node Sass（稍慢、Node.js）":
		sassCompiler = "node-sass"
	case "Sass（最慢、Dart）":
		sassCompiler = "sass"
	}

	cliDevelop()
}

func executeCommand(action string, command []string, event watcher.Event) {
	now := time.Now()
	cmd := exec.Command(command[0], command[1:]...)
	//cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stdout
	cmd.Start()
	cmd.Wait()
	log.Printf("已執行 %s（%s）：%s\n", action, time.Since(now), event.Path)
}

type Icon struct {
	Changes []string `json:"changes"`
	Label   string   `json:"label"`
	Styles  []string `json:"styles"`
	Unicode string   `json:"unicode"`
}

func cliDevelop() {
	var value string

	prompt := &survey.Select{
		Message: "想要進行什麼開發手續？",
		Options: []string{"監聽並即時編譯", "下載並更新圖示庫", "更改 Sass 編譯器"},
	}
	survey.AskOne(prompt, &value, nil)

	switch value {
	case "更改 Sass 編譯器":
		cliChangeCompiler()
	case "下載並更新圖示庫":

		client := github.NewClient(nil)

		release, _, err := client.Repositories.GetLatestRelease(context.Background(), "FortAwesome", "Font-Awesome")
		if err != nil {
			panic(err)
		}

		for _, asset := range release.Assets {
			//
			url := asset.GetBrowserDownloadURL()
			//
			if !strings.HasSuffix(url, "web.zip") {
				continue
			}

			// 取得檔案名稱，沒有副檔名
			fileprefix := filepath.Base(url)
			fileprefix = strings.TrimSuffix(fileprefix, filepath.Ext(fileprefix))
			//
			filename := filepath.Base(url)

			if _, err := os.Stat(fmt.Sprintf("%s/%s", os.TempDir(), fileprefix)); os.IsNotExist(err) {
				file, err := ioutil.TempFile(os.TempDir(), filename)
				if err != nil {
					panic(err)
				}

				//
				log.Printf("正在下載最新的 Font Awesome：%s", url)
				resp, err := http.Get(url)
				if err != nil {
					panic(err)
				}

				//
				n, err := io.Copy(file, resp.Body)
				if err != nil {
					panic(err)
				}
				log.Printf("已經複製 Font Awesome 整體套件（%d Bytes）", n)

				//
				log.Printf("正在解壓縮套件…")
				err = archiver.Zip.Open(file.Name(), os.TempDir())
				if err != nil {
					panic(err)
				}
			} else {
				//
				log.Printf("已在本地找到最新的 Font Awesome：%s", fileprefix)
			}

			//
			log.Printf("正在將最新的圖示字體複製至 Tocas UI 資料夾…")
			fontsPath, err := filepath.Glob(fmt.Sprintf("%s/%s/webfonts/*", os.TempDir(), fileprefix))
			if err != nil {
				panic(err)
			}
			for _, v := range fontsPath {
				dat, err := ioutil.ReadFile(v)
				if err != nil {
					panic(err)
				}
				err = ioutil.WriteFile(fmt.Sprintf("./../../dist/fonts/icons/%s", filepath.Base(v)), dat, 777)
				if err != nil {
					panic(err)
				}
				log.Printf("已複製 %s", v)
			}

			//
			log.Printf("正在轉譯 Font Awesome 圖示至 Tocas UI 格式…")
			iconList, err := ioutil.ReadFile(fmt.Sprintf("%s/%s/metadata/icons.json", os.TempDir(), fileprefix))
			if err != nil {
				panic(err)
			}

			//
			var icons map[string]Icon
			err = json.Unmarshal(iconList, &icons)
			if err != nil {
				panic(err)
			}

			//
			var newContent string
			for k, v := range icons {
				//
				className := strings.Replace(k, "-", ".", -1)
				//
				className = strings.Replace(k, ".alt.", ".alternate.", -1)
				//
				selector := fmt.Sprintf("i.%s.icon:before", className)
				//
				if v.Styles[0] == "brands" {
					newContent += fmt.Sprintf("%s\n    +extend(brands)\n    content: \"\\%s\"\n", selector, v.Unicode)
				} else {
					newContent += fmt.Sprintf("%s\n    content: \"\\%s\"\n", selector, v.Unicode)
				}
			}

			//
			dat, err := ioutil.ReadFile("./../Components/Icon/_Icon.sass")
			if err != nil {
				panic(err)
			}

			//
			re, err := regexp.Compile(`(\/\/ DO NOT EDIT AFTER THIS LINE \(不要編輯此行之後的樣式\))((.|\n)*)(\/\/ DO NOT EDIT BEFORE THIS LINE \(不要編輯此行之前的樣式\))`)
			if err != nil {
				panic(err)
			}
			newContent = re.ReplaceAllString(string(dat), fmt.Sprintf("$1\n%s$4", newContent))

			//
			re, err = regexp.Compile(`\/\/ DO NOT EDIT THIS LINE \(不要編輯此行\):.*?\n((.|\n)*)`)
			if err != nil {
				panic(err)
			}
			newContent = re.ReplaceAllString(string(dat), fmt.Sprintf("// DO NOT EDIT THIS LINE (不要編輯此行): %s\n$1", fileprefix))

			//
			err = ioutil.WriteFile("./../Components/Icon/_Icon.sass", []byte(newContent), 777)
			if err != nil {
				panic(err)
			}
			log.Printf("已將 Font Awesome 圖示轉譯並存入 Tocas UI 原始碼")
		}

	case "監聽並即時編譯":

		log.Printf("已經開始監聽檔案…")

		w := watcher.New()
		w.SetMaxEvents(1)

		go func() {
			for {
				select {
				case event := <-w.Event:
					switch strings.TrimLeft(filepath.Ext(event.Name()), ".") {
					case "coffee":
						fmt.Printf("已編譯 Coffee：%s\n", event.Path)
					case "sass":
						switch sassCompiler {
						case "sass":
							executeCommand("Sass", []string{"sass", "--indented", "../tocas.sass:../../dist/tocas.css"}, event)
						case "wt":
							executeCommand("Wellington", []string{"wt", "compile", "../tocas.sass", "-b", "../../dist/"}, event)
						case "node-sass":
							executeCommand("Node Sass", []string{"node-sass", "../tocas.sass", ">", "../../dist/tocas.css"}, event)
						case "sassc":
							executeCommand("Sassc", []string{"sassc", "--sass", "../tocas.sass", "../../dist/tocas.css"}, event)
						}
					case "pug":
						executeCommand("Pug", []string{"pug", event.Path}, event)

						tmpPath := fmt.Sprintf("%s.html", strings.TrimSuffix(event.Path, filepath.Ext(event.Path)))
						dat, err := ioutil.ReadFile(tmpPath)
						if err != nil {
							panic(err)
						}

						newContent := fmt.Sprintf(`<html><head><title>%s</title><link rel="stylesheet" href="../../../dist/tocas.css"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="padding: 50px;">%s</body></html>`, strings.TrimSuffix(event.Name(), filepath.Ext(event.Name())), string(dat))

						re, err := regexp.Compile(`<!-- \+ (.*?)-->`)
						if err != nil {
							panic(err)
						}
						newContent = re.ReplaceAllString(newContent, "<br><br><!-- + $1 --><h1>$1</h1>")
						newContent = strings.Replace(newContent, ">", "> ", -1)
						newContent = strings.Replace(newContent, "<", " <", -1)

						re, err = regexp.Compile(`<a class="([a-zA-Z0-9 -]*)">`)
						if err != nil {
							panic(err)
						}
						newContent = re.ReplaceAllString(newContent, "<a class=\"$1\" href=\"#!\">")

						ioutil.WriteFile((tmpPath), []byte(newContent), 777)

					}

				case err := <-w.Error:
					log.Fatalln(err)
				case <-w.Closed:
					return
				}
			}
		}()
		if err := w.AddRecursive("../Components"); err != nil {
			log.Fatalln(err)
		}
		if err := w.Start(time.Millisecond * 100); err != nil {
			log.Fatalln(err)
		}
	}
}
