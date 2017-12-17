package main

import (
	"os"
	"path/filepath"

	"gopkg.in/russross/blackfriday.v2"
)

func main() {
	// 初始化 Markdown 渲染器。
	render := blackfriday.NewHTMLRenderer(blackfriday.HTMLRendererParameters{})
	// 初始化解析器。
	parser := newParser(render)
	// 初始化檔案事件監聽器。
	watcher := newWatcher(parser)
	// 開始監聽。
	watcher.run()
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

// executablePath 會回傳目前執行檔的路徑。
func executablePath() string {
	exe, err := os.Executable()
	check(err)

	return filepath.Dir(exe)
}
