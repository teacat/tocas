package main

import (
	"context"
	"golang.org/x/sync/errgroup"
	"log"
	"os"
	"os/exec"
	"path"
	"regexp"
	"strings"

	cp "github.com/otiai10/copy"
	"github.com/urfave/cli/v2"
)

// pack 會把 `tocas.css` 的內容打包進 `/dist`。
func pack(*cli.Context) error {
	ctx := context.Background()
	group, ctx := errgroup.WithContext(ctx)

	group.Go(buildCSSMinify)
	group.Go(func() error {
		return updateTo(SrcFile("fonts"), DistFile("fonts"))
	})
	group.Go(func() error {
		return updateTo(SrcFile("flags"), DistFile("flags"))
	})

	if err := group.Wait(); err != nil {
		log.Fatal(err)
	}

	return nil
}

func buildCSSMinify() error {
	if err := buildCSS(); err != nil {
		return err
	}

	return exec.Command(Npx("cleancss"), DistFile("tocas.css"), "-o", DistFile("tocas.min.css")).Run()
}

func buildCSS() error {
	// 先載入 `/src/tocas.css` 的內容。
	b, err := os.ReadFile(SrcFile("tocas.css"))
	if err != nil {
		log.Fatal(err)
	}
	tocas := string(b)

	content := strings.Builder{}
	// 找出所有被 `@import` 的檔案並載入其內容，然後把 `tocas.css` 裡的 `@import` 換成真實的內容。
	for _, v := range regexp.MustCompile(`@import "./(.*?)";`).FindAllStringSubmatch(string(b), -1) {
		b, err := os.ReadFile(path.Join(ProjectDir(), "src", v[1]))
		if err != nil {
			log.Fatal(err)
		}
		// 讀取之後就把這行 `@import` 從原本的 `tocas.css` 裡拿走。
		tocas = strings.ReplaceAll(tocas, v[0], "")
		content.WriteString(string(b))
		content.WriteByte('\n')
	}
	content.WriteString(tocas)

	// 將這個新的組合原始碼儲存至 `/dist/tocas.css`。
	err = os.WriteFile(DistFile("tocas.css"), []byte(content.String()), 0644)
	if err != nil {
		log.Fatal(err)
	}

	return nil
}

func updateTo(src string, tgt string) error {
	if err := os.RemoveAll(tgt); err != nil {
		return err
	}
	if err := cp.Copy(src, tgt); err != nil {
		return err
	}

	return nil
}

// DistDir gets the Tocas dist directory.
func DistDir() string {
	return path.Join(ProjectDir(), "dist")
}

// DistFile is the wrapper of `path.join(DistDir(), ...)`
func DistFile(f string) string {
	return path.Join(DistDir(), f)
}

// SrcDir gets the Tocas source directory.
func SrcDir() string {
	return path.Join(ProjectDir(), "src")
}

// SrcFile is the wrapper of `path.join(SrcDir(), ...)`
func SrcFile(f string) string {
	return path.Join(SrcDir(), f)
}
