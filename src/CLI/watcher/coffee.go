package watcher

import (
	"fmt"

	"github.com/radovskyb/watcher"
)

// CoffeeHandler 會監聽所有 Coffee 檔案異動並對該檔案進行編譯。
func (w *Watcher) CoffeeHandler(event watcher.Event) {
	fmt.Printf("已編譯 Coffee：%s\n", event.Path)
}
