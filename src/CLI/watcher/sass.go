package watcher

import (
	"fmt"

	"github.com/TeaMeow/TocasUI/src/CLI/path"
	"github.com/radovskyb/watcher"
)

// SassHandler 會監聽所有 Sass 檔案異動並對該檔案進行編譯。
func (w *Watcher) SassHandler(event watcher.Event) {
	// 依照使用者所選的偏好 Sass 編譯器來呼叫不同的編譯指令。
	switch w.Option.SassCompiler {
	case SassCompiler:
		w.Executor.ExecuteWithEvent(event, []string{"sass", "--indented", fmt.Sprintf("%s:%s", path.SassTocasPath, path.CSSTocasPath)})
	case WellingtonCompiler:
		w.Executor.ExecuteWithEvent(event, []string{"wt", "compile", path.SassTocasPath, "-b", path.DistPath})
	case NodeCompiler:
		w.Executor.ExecuteWithEvent(event, []string{"node-sass", path.SassTocasPath, ">", path.CSSTocasPath})
	case SasscCompiler:
		w.Executor.ExecuteWithEvent(event, []string{"sassc", "--sass", path.SassTocasPath, path.CSSTocasPath})
	}
}
