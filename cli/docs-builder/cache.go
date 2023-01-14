package main

import (
	"github.com/google/uuid"
	"os"
	"path"
)

// getOrCache 會先尋找有沒有對應的快取。如果有，則取回；反之則
// 根據 `create` 引數的 closure 建立之。
//
// 快取將存在 `caches` 中 namespace 資料夾下，identifier 會用
// `uuid` (with `md5`) 取得 unique identifier。
func getOrCacheByte(namespace string, identifier []byte, create func() ([]byte, error)) (b []byte, err error) {
	// FIXME: We should maintain a lock based on namespace & identifier
	//        to prevent the race condition.

	hash := uuid.NewMD5(uuid.New(), identifier)

	cacheDir := path.Join(ExecutableDir(), "caches", namespace)
	cacheFilename := path.Join(cacheDir, hash.String())

	b, err = os.ReadFile(cacheFilename)
	if err != nil {
		if err := os.MkdirAll(cacheDir, 0755); err != nil {
			return b, err
		}
		// Try again.
		return getOrCacheByte(namespace, identifier, create)
	}

	// Hit!
	if len(b) > 0 {
		return
	}

	// Not hit. Create cache.
	b, err = create()
	if err != nil {
		return
	}

	err = os.WriteFile(cacheFilename, b, 0644)
	return
}
