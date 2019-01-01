package watcher

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/TeaMeow/TocasUI/src/CLI/path"
	"github.com/radovskyb/watcher"
)

// CoffeeHandler 會監聽所有 Coffee 檔案異動並對該檔案進行編譯。
func (w *Watcher) CoffeeHandler(event watcher.Event) {
	dest := strings.ToLower(strings.TrimSuffix(filepath.Base(event.Path), filepath.Ext(filepath.Base(event.Path))))

	w.Executor.ExecuteWithEvent(event, []string{"coffee", "-b", "--output", fmt.Sprintf("%s%s.js", path.DistPath, dest), "--compile", event.Path})
}
