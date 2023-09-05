package main

import (
	"log"
	"os"
	"os/exec"
	"regexp"
	"strings"

	cli "github.com/urfave/cli/v2"
)

// pack 會把 `tocas.css` 的內容打包進 `/dist`。
func pack(c *cli.Context) error {
	// 先載入 `/src/tocas.css` 的內容。
	b, err := os.ReadFile("./../../src/tocas.css")
	if err != nil {
		log.Fatal(err)
	}
	tocas := string(b)
	var content string
	// 找出所有被 `@import` 的檔案並載入其內容，然後把 `tocas.css` 裡的 `@import` 換成真實的內容。
	for _, v := range regexp.MustCompile(`@import ".\/(.*?)";`).FindAllStringSubmatch(string(b), -1) {
		b, err := os.ReadFile("./../../src/" + v[1])
		if err != nil {
			log.Fatal(err)
		}
		// 讀取之後就把這行 `@import` 從原本的 `tocas.css` 裡拿走。
		tocas = strings.ReplaceAll(tocas, v[0], "")
		content += string(b) + "\n"
	}
	//
	if err := os.MkdirAll("./../../dist", 0777); err != nil {
		log.Fatal(err)
	}
	// 將這個新的組合原始碼儲存至 `/dist/tocas.css`。
	err = os.WriteFile("./../../dist/tocas.css", []byte(content+tocas), 0777)
	if err != nil {
		log.Fatal(err)
	}
	// 透過 `css-minify` 將 `/dist/tocas.css` 的內容最小化。
	if output, err := exec.Command("css-minify", "-f", "./../../dist/tocas.css", "-o", "./../../dist/").CombinedOutput(); err != nil {
		log.Fatal(err.Error() + string(output))
	}
	// 先載入 `/src/scripts/tocas.js` 的內容。
	b, err = os.ReadFile("./../../src/scripts/tocas.js")
	if err != nil {
		log.Fatal(err)
	}
	tocasjs := string(b)

	content = ""
	// 找出所有被 `@import` 的檔案並載入其內容，然後把 `tocas.js` 裡的 `@import` 換成真實的內容。
	for _, v := range regexp.MustCompile(`// @import "(.*?)";`).FindAllStringSubmatch(string(b), -1) {
		b, err := os.ReadFile("./../../src/scripts/" + v[1])
		if err != nil {
			log.Fatal(err)
		}
		// 讀取之後就把這行 `@import` 從原本的 `tocas.js` 裡取代掉。
		tocasjs = strings.ReplaceAll(tocasjs, v[0], string(b)+"\n")
	}
	// 將這個新的組合原始碼儲存至 `/dist/tocas.js`。
	err = os.WriteFile("./../../dist/tocas.js", []byte(content+tocasjs), 0777)
	if err != nil {
		log.Fatal(err)
	}
	// 使用 `minify` 將 `/dist/tocas.js` 縮小一份並輸出到 `/dist/tocas.min.js`
	b, err = exec.Command("minify", "./../../dist/tocas.js").CombinedOutput()
	if err != nil {
		log.Fatal(err.Error() + string(b))
	}
	if err := os.WriteFile("./../../dist/tocas.min.js", b, 0644); err != nil {
		log.Fatal(err)
	}
	// 移除舊有的 `/dist/fonts` 並從 `/src/fonts` 複製過去一份。
	if output, err := exec.Command("rm", "-rf", "./../../dist/fonts").CombinedOutput(); err != nil {
		log.Fatal(err.Error() + string(output))
	}
	if output, err := exec.Command("cp", "-rf", "./../../src/fonts", "./../../dist/fonts").CombinedOutput(); err != nil {
		log.Fatal(err.Error() + string(output))
	}
	// 移除舊有的 `/dist/flags` 並從 `/src/flags` 複製過去一份。
	if output, err := exec.Command("rm", "-rf", "./../../dist/flags").CombinedOutput(); err != nil {
		log.Fatal(err.Error() + string(output))
	}
	if output, err := exec.Command("cp", "-rf", "./../../src/flags", "./../../dist/flags").CombinedOutput(); err != nil {
		log.Fatal(err.Error() + string(output))
	}
	return nil
}
