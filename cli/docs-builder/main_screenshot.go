package main

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/png"
	"log"
	"math"
	"os"
	"path/filepath"
	"strings"

	"github.com/chromedp/cdproto/emulation"
	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
	"github.com/teacat/pathx"
	cli "github.com/urfave/cli/v2"
	"golang.org/x/image/draw"
)

func screenshot(c *cli.Context) error {
	// 初始化一個 Chrome Headless。
	ctx, cancel := chromedp.NewContext(
		context.Background(),
	)
	defer cancel()

	//
	screenshotPath := c.String("screenshot-path")

	// 先建立螢幕截圖資料夾。
	if err := os.MkdirAll("./../../examples/screenshots", 0777); err != nil {
		return err
	}
	// 載入欲螢幕截圖的網頁資料夾。
	files, err := os.ReadDir("./../../examples")
	if err != nil {
		return err
	}
	// 把資料夾裡面的網頁全部照一遍。
	for _, v := range files {
		if v.IsDir() {
			continue
		}
		log.Printf("正在截圖亮色主題：%s", v.Name())
		if err := chromedp.Run(ctx, takeScreenshot(screenshotPath+v.Name(), false)); err != nil {
			return err
		}
		log.Printf("正在截圖暗色主題：%s", v.Name())
		if err := chromedp.Run(ctx, takeScreenshot(screenshotPath+v.Name(), true)); err != nil {
			return err
		}
	}
	return nil
}

// takeScreenshot
func takeScreenshot(url string, isDark bool) chromedp.Tasks {
	return chromedp.Tasks{
		// 設定裝置是 1481 x 833 解析度裝置並有 1.216 倍縮放。
		// 這個輸出結果是 1801 x 1013。
		emulation.SetDeviceMetricsOverride(1481, 833, 1.216, false),

		// 導向到目標頁面。
		chromedp.Navigate(url),

		//
		chromedp.ActionFunc(func(ctx context.Context) error {
			// 依據條件設定亮或暗色系。
			feature := &emulation.MediaFeature{
				Name:  "prefers-color-scheme",
				Value: "light",
			}
			suffix := "light"
			if isDark {
				feature = &emulation.MediaFeature{
					Name:  "prefers-color-scheme",
					Value: "dark",
				}
				suffix = "dark"
			}
			if err := emulation.SetEmulatedMedia().WithFeatures([]*emulation.MediaFeature{feature}).Do(ctx); err != nil {
				log.Fatal(err)
			}
			// 螢幕截圖。
			b, err := page.CaptureScreenshot().WithQuality(100).Do(ctx)
			if err != nil {
				return err
			}
			//
			base := filepath.Base(url)
			dest := pathx.Join("./../../examples/screenshots", fmt.Sprintf("%s_%s.png", strings.TrimSuffix(base, filepath.Ext(base)), suffix))
			output, _ := os.Create(dest)
			defer output.Close()
			// 將剛才擷取的 PNG 解析為 Image.Image。
			src, _ := png.Decode(bytes.NewReader(b))
			// 縮小 2.8 倍，因為我們不需要太大的截圖。
			dst := image.NewRGBA(image.Rect(0, 0, int(math.Round(float64(src.Bounds().Max.X)/2.8)), int(math.Round(float64(src.Bounds().Max.Y)/2.8))))
			// 透過最佳畫質的 CatmullRom 演算法縮放。
			draw.CatmullRom.Scale(dst, dst.Rect, src, src.Bounds(), draw.Over, nil)
			// 輸出圖片到目標位置。
			png.Encode(output, dst)

			return nil
		}),
	}
}
