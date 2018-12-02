package watcher

import (
	"fmt"

	"github.com/TeaMeow/TocasUI/src/CLI/document"
	"github.com/radovskyb/watcher"
)

// YamlHandler 會監聽所有 YAML 檔案異動並對該檔案進行編譯。
func (w *Watcher) YamlHandler(event watcher.Event) {
	document.Compile(event.Path)
	fmt.Printf("已編譯 YAML：%s\n", event.Path)
}
