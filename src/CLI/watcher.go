package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/url"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/radovskyb/watcher"
)

// FileSassHandler 會處理 Sass 檔案變更，並且以選定的 Sass 編譯器來編譯原始檔案。
func FileSassHandler(event watcher.Event) {
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
}

// FilePugHandler 會處理 Pug 檔案變更，並且以 Pug 編譯器來編譯相關的元件測試檔案，
// 當檔案轉換成 HTML 之後，在對其進行微調。
func FilePugHandler(event watcher.Event) {
	// 先透過 Pug 將元件測試檔案編譯為 HTML 檔案。
	executeCommand("Pug", []string{"pug", event.Path}, event)

	// 讀取已經轉譯好的 HTML 檔案。
	tmpPath := fmt.Sprintf("%s.html", strings.TrimSuffix(event.Path, filepath.Ext(event.Path)))
	dat, err := ioutil.ReadFile(tmpPath)
	if err != nil {
		panic(err)
	}

	// 保存所有章節標記的按鈕 HTML 內容。
	var buttons string

	// 找到所有的章節標記，然後透過 RegExp 取得其中的章節名稱。
	re, err := regexp.Compile(`<!-- \+ (.*?)-->`)
	if err != nil {
		panic(err)
	}
	headers := re.FindAllStringSubmatch(string(dat), -1)
	for _, v := range headers {
		buttons += fmt.Sprintf(`<a href="#%s" class="ts fluid button">%s</a>`, url.QueryEscape(v[1]), v[1])
	}

	// 初始化一個新的測試頁面 HTML 內容。
	newContent := fmt.Sprintf(`
	<html>
	<head>
	<title>%s</title>
	<link rel="stylesheet" href="../../../dist/tocas.css"><meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style type="text/css">
	.ts.panes .ts.button {
		text-align   : left;
		margin-bottom: 8px;
	}
	</style>
	</head>
	<body>
		<div class="ts panes">
			<div class="two block vertically scrollable padded pane">
				<div class="ts form">
					<fieldset>
						<legend>Core</legend>
						%s
					</fieldset>
				</div>
			</div>
			<div class="stretched vertically scrollable padded pane">
				%s
			</div>
		</div>

	</body>
	</html>`, strings.TrimSuffix(event.Name(), filepath.Ext(event.Name())), buttons, string(dat))

	//
	re, err = regexp.Compile(`<!-- \+ (.*?)-->`)
	if err != nil {
		panic(err)
	}

	newContent = ReplaceAllStringSubmatchFunc(re, newContent, func(groups []string) string {
		return fmt.Sprintf(`<br><br><!-- + %s --><h1 id="%s">%s</h1>`, groups[1], url.QueryEscape(groups[1]), groups[1])
	})

	//
	newContent = strings.Replace(newContent, ">", "> ", -1)
	newContent = strings.Replace(newContent, "<", " <", -1)

	re, err = regexp.Compile(`<a class="([a-zA-Z0-9 -]*)">`)
	if err != nil {
		panic(err)
	}
	newContent = re.ReplaceAllString(newContent, "<a class=\"$1\" href=\"#!\">")

	ioutil.WriteFile((tmpPath), []byte(newContent), 777)
}

func FileCoffeeHandler(event watcher.Event) {
	fmt.Printf("已編譯 Coffee：%s\n", event.Path)
}

// WatchFiles 會監聽檔案事件變動，並且呼叫相對應的編譯器來處理相關的檔案。
func WatchFiles() {
	log.Printf("已經開始監聽檔案…")

	w := watcher.New()
	w.SetMaxEvents(1)

	go func() {
		for {
			select {
			case event := <-w.Event:
				switch strings.TrimLeft(filepath.Ext(event.Name()), ".") {
				case "coffee":
					FileCoffeeHandler(event)
				case "sass":
					FileSassHandler(event)
				case "pug":
					FilePugHandler(event)
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
