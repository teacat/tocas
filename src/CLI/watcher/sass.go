package watcher

import (
	"github.com/radovskyb/watcher"
)

// SassWatcher 會監聽所有 Sass 檔案異動並對該檔案進行編譯。
func (w *Watcher) SassWatcher(event watcher.Event) {
	// 依照使用者所選的偏好 Sass 編譯器來呼叫不同的編譯指令。
	switch w.Option.SassCompiler {
	case SassCompiler:
		w.Executor.ExecuteWithEvent(event, "sass --indented ../tocas.sass:../../dist/tocas.css")
	case WellingtonCompiler:
		w.Executor.ExecuteWithEvent(event, "wt compile ../tocas.sass -b ../../dist/")
	case NodeCompiler:
		w.Executor.ExecuteWithEvent(event, "node-sass ../tocas.sass > ../../dist/tocas.css")
	case SasscCompiler:
		w.Executor.ExecuteWithEvent(event, "sassc --sass ../tocas.sass ../../dist/tocas.css")
	}
	//fmt.Printf("已編譯 Sass：%s\n", event.Path)
}
