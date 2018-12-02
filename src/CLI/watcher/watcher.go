package watcher

import (
	"log"
	"path/filepath"
	"strings"
	"time"

	"github.com/TeaMeow/TocasUI/src/CLI/executor"
	"github.com/radovskyb/watcher"
)

const (
	// SassCompiler 是 Dart Sass 編譯器。
	SassCompiler = iota
	// WellingtonCompiler 是 Golang Sass 編譯器。
	WellingtonCompiler
	// NodeCompiler 是 Node Sass 編譯器。
	NodeCompiler
	// SasscCompiler 是 C Sass 編譯器。
	SasscCompiler
)

// Watcher 呈現的是一個檔案監聽器的本體。
type Watcher struct {
	Option   *Option
	Executor *executor.Executor
	Watcher  *watcher.Watcher
}

// Option 是檔案監聽器的選項與相關設置。
type Option struct {
	SassCompiler int
}

// New 會初始化一個檔案監聽器。
func New(option *Option) *Watcher {
	return &Watcher{
		Option:   option,
		Executor: executor.New(),
	}
}

// Extension 能夠將路徑中最後的副檔名挑出來，而且不帶任何符號。
func (w *Watcher) Extension(path string) string {
	return strings.TrimLeft(filepath.Ext(path), ".")
}

// Run 會執行檔案監聽器並且在接收到檔案異動時有所行為、編譯。
func (w *Watcher) Run() {
	w.Watcher = watcher.New()
	w.Watcher.SetMaxEvents(1)
	go w.Watch()

	if err := w.Watcher.AddRecursive("../Components"); err != nil {
		log.Fatalln(err)
	}
	if err := w.Watcher.Start(time.Millisecond * 100); err != nil {
		log.Fatalln(err)
	}
}

// Watch 是需要透過 Goroutine 被執行的函式，這會不斷地檢查事件頻道裡有沒有任何檔案異動，
// 並且呼叫相對應的編譯器與手法處理該檔案。
func (w *Watcher) Watch() {
	for {
		select {
		case event := <-w.Watcher.Event:
			switch w.Extension(event.Name()) {
			case "coffee":
				w.CoffeeHandler(event)
			case "sass":
				w.SassHandler(event)
			case "pug":
				w.PugHandler(event)
			case "yaml":
				w.YamlHandler(event)
			}
		case err := <-w.Watcher.Error:
			log.Fatalln(err)
		case <-w.Watcher.Closed:
			return
		}
	}
}
