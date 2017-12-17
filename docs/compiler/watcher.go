package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"

	"github.com/howeyc/fsnotify"
)

// Watcher 是檔案事件監聽器。
type Watcher struct {
	Parser  *Parser
	Watcher *fsnotify.Watcher
}

// newWatcher 會建立一個新的檔案事件監聽器。
func newWatcher(parser *Parser) *Watcher {
	return &Watcher{
		Parser: parser,
	}
}

// files 會回傳所有的文件檔案。
func (w *Watcher) files() ([]string, error) {
	return filepath.Glob("*")
}

// run 會開始監聽指定目錄的檔案異動事件。
func (w *Watcher) run() {
	// 建立新的檔案監聽器。
	watcher, err := fsnotify.NewWatcher()
	check(err)

	// 保存這個檔案監聽器。
	w.Watcher = watcher

	// 建立一個讓程式阻塞的頻道。
	done := make(chan bool)

	// 透過 Goroutine 不斷等待事件傳入。
	w.listener()

	// 開始監聽指定資料夾。
	err = watcher.Watch(executablePath() + "/../languages/zh_TW/elements")
	check(err)

	// 阻塞程式避免直接結束。
	<-done

	// 結束檔案監聽器。
	watcher.Close()
}

// selector 會等待事件的傳入，並呼叫處理器。
func (w *Watcher) listener() {
	go func() {
		for {
			select {
			// 等待檔案事件。
			case event := <-w.Watcher.Event:
				// 呼叫處理器並傳入有異動的檔案。
				w.processor(event.Name)
			}
		}
	}()
}

// processor 是事件處理函式，會處理接收到有異動事件的檔案。
func (w *Watcher) processor(path string) {
	// 讀取頁面的 Markdown 內容。
	content, err := ioutil.ReadFile(path)
	check(err)
	// 取得編譯後的頁面內容。
	parsedContent := w.Parser.parse(content)
	// 取得該頁面的檔案名稱。
	file := filepath.Base(path)
	// 取得該檔案的名稱（無副檔名）。
	fileName := strings.Replace(file, filepath.Ext(file), "", -1)
	// 取得該檔案的資料夾名稱（分類名稱）。
	dir := filepath.Dir(file)
	dirBase := filepath.Base(dir)
	// 取得該翻譯的語系。
	lang := filepath.Dir(dir)
	langBase := filepath.Base(lang)

	// 將頁面寫入輸出資料夾中的「/語系/分類/名稱.html」路徑。
	err = ioutil.WriteFile(fmt.Sprintf("%s/../dist/%s/%s/%s.html", executablePath(), langBase, dirBase, fileName), parsedContent, 0777)
	check(err)
}
