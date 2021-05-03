package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/go-github/github"
	"github.com/mholt/archiver"
	"github.com/teacat/pathx"
)

//
func path(typ string) string {
	exe, err := os.Executable()
	if err != nil {
		log.Fatalln(err)
	}
	r := pathx.JoinDir(strings.Split(exe, "tocas-4/")[0], "tocas-4")

	switch typ {
	case "src":
		return pathx.JoinDir(r, "src")
	case "icon":
		return pathx.Join(r, "src/styles/libraries/_icon-maps.sass")
	case "icons":
		return pathx.JoinDir(r, "dist/fonts/icons")
	case "/":
		return r
	}
	log.Fatalf("無法找到 %s 路徑", typ)
	return ""
}

type Icon struct {
	Changes []string `json:"changes"`
	Label   string   `json:"label"`
	Styles  []string `json:"styles"`
	Unicode string   `json:"unicode"`
}

func main() {
	// 初始化一個新的 GitHub 客戶端。
	client := github.NewClient(nil)
	// 取得 Font Awesome 最新的釋出版本。
	release, _, err := client.Repositories.GetLatestRelease(context.Background(), "FortAwesome", "Font-Awesome")
	if err != nil {
		panic(err)
	}

	// 從最新釋出的版本中不斷找出有 `web.zip` 結尾的檔案，
	// 因為這是我們會需要的網頁字型檔。
	for _, asset := range release.Assets {
		// 取得這個釋出檔案的網址。
		url := asset.GetBrowserDownloadURL()

		// 如果檔案網址不包含 `web.zip` 那麼就繼續找下一個檔案，
		// 直到找到我們要的網頁字型檔案。
		if !strings.HasSuffix(url, "web.zip") {
			continue
		}

		// 取得沒有副檔名的檔案名稱。
		fileprefix := strings.TrimSuffix(filepath.Base(url), filepath.Ext(filepath.Base(url)))

		// 檢查本地是否已經有跟遠端一模一樣最新的 Font Awesome 檔案，如果沒有的話…。
		if _, err := os.Stat(fmt.Sprintf("%s/%s", os.TempDir(), fileprefix)); os.IsNotExist(err) {
			// 在系統暫存目錄中，建立一個新的檔案 Font Awesome 暫存檔案。
			file, err := ioutil.TempFile(os.TempDir(), fileprefix)
			if err != nil {
				panic(err)
			}

			// 讀取遠端的 GitHub 檔案二進制資料。
			log.Printf("正在下載最新的 Font Awesome：%s", url)
			resp, err := http.Get(url)
			if err != nil {
				panic(err)
			}

			// 將二進制回應資料轉存到本地的 Font Awesome 暫存檔案。
			n, err := io.Copy(file, resp.Body)
			if err != nil {
				panic(err)
			}
			log.Printf("已經複製 Font Awesome 整體套件（%d Bytes）", n)

			// 解壓縮下載回來的 Font Awesome 檔案資料夾。
			log.Printf("正在解壓縮套件…")
			err = archiver.NewZip().Unarchive(file.Name(), os.TempDir())
			if err != nil {
				panic(err)
			}
		} else {
			// 如果本地的暫存檔案跟遠端的一模一樣，那麼就不用下載，直接用本地現有的。
			log.Printf("已在本地找到最新的 Font Awesome：%s", fileprefix)
		}

		// 取得解壓縮後的所有網頁圖示字型檔案。
		log.Printf("正在將最新的圖示字體複製至 Tocas UI 資料夾…")
		fontsPath, err := filepath.Glob(fmt.Sprintf("%s/%s/webfonts/*", os.TempDir(), fileprefix))
		if err != nil {
			panic(err)
		}

		// 複製圖示字型檔案到 Tocas 資料夾中，並且取代相對應的舊圖示字型檔案。
		for _, v := range fontsPath {
			dat, err := ioutil.ReadFile(v)
			if err != nil {
				panic(err)
			}
			err = ioutil.WriteFile(fmt.Sprintf("%s%s", path("icons"), filepath.Base(v)), dat, 0777)
			if err != nil {
				panic(err)
			}
			log.Printf("已複製 %s", v)
		}

		// 讀取剛下載的 Font Awesome 圖示索引資料。
		log.Printf("正在轉譯 Font Awesome 圖示至 Tocas UI 格式…")
		iconList, err := ioutil.ReadFile(fmt.Sprintf("%s/%s/metadata/icons.json", os.TempDir(), fileprefix))
		if err != nil {
			panic(err)
		}

		// 將讀取的索引結構映射到本地的 map 上，這樣就可以得知總共有哪些可用的圖示。
		var icons map[string]Icon
		err = json.Unmarshal(iconList, &icons)
		if err != nil {
			panic(err)
		}

		// newContent 是新的 Tocas 圖示原始碼內容，會取代舊有機器產生的圖示原始碼。
		// var newContent string
		newContent := "@mixin icons\n"

		// 遞迴每個圖示。
		for k, v := range icons {
			className := k
			// 替這次修改的樣式名稱建立一個 CSS 樣式選擇器。
			selector := fmt.Sprintf(`    &.ts-icon--%s-icon .ts-icon__entity::before`, className)

			// 將這個圖示組合成一個 Sass 語法，稍會會收集所有語法且一次存入 Tocas 圖示原始碼中。
			newContent += fmt.Sprintf("%s\n", selector)
			// 如果這個圖示是 Logo 商標的話，那麼就額外追加商標的樣式。
			if v.Styles[0] == "brands" {
				newContent += fmt.Sprintf("        font-family: \"IconsBrands\"\n")
			}
			newContent += fmt.Sprintf("        content: \"\\%s\"\n\n\n", v.Unicode)
		}

		// 將機器自動修改後的結果存入 Tocas 的圖示原始碼內，完成本次的自動升級。
		err = ioutil.WriteFile(path("icon"), []byte(newContent), 0777)
		if err != nil {
			panic(err)
		}
		log.Printf("已將 Font Awesome 圖示轉譯並存入 Tocas UI 原始碼")
	}
}
