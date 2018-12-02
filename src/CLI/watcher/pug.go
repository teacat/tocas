package watcher

import (
	"fmt"
	"io/ioutil"
	"net/url"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/TeaMeow/TocasUI/src/CLI/util"
	"github.com/radovskyb/watcher"
)

// PugHandler 會監聽所有 Pug 檔案異動並對該檔案進行編譯。
func (w *Watcher) PugHandler(event watcher.Event) {
	// 先透過 Pug 將元件測試檔案編譯為 HTML 檔案。
	w.Executor.ExecuteWithEvent(event, []string{"pug", event.Path})

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

	newContent = util.ReplaceAllStringSubmatchFunc(re, newContent, func(groups []string) string {
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
