package main

import (
	"fmt"
	"net/smtp"
	"os"
	"os/exec"
	"strings"

	cli "github.com/urfave/cli/v2"
)

func testMail(c *cli.Context) error {
	from := c.String("mailto")
	pass := c.String("mailpwd")
	to := c.String("mailto")

	// 透過 `css-minify` 將 `/dist/tocas.css` 的內容最小化。
	if err := exec.Command("css-minify", "-f", "./../../src/email.css", "-o", "./").Run(); err != nil {
		return err
	}

	b, err := os.ReadFile("./email.min.css")
	if err != nil {
		return err
	}

	bb, err := os.ReadFile(c.String("mailtmpl"))
	if err != nil {
		return err
	}

	body := string(bb)

	body = strings.ReplaceAll(body, `<link rel="stylesheet" href="./email.css" />`, fmt.Sprintf(`<style type="text/css">%s</style>`, string(b)))

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: 測試郵件\n" +
		"MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" +
		body

	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		return err
	}

	return nil
}
