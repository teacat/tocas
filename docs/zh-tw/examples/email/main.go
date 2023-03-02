package main

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"os/exec"
	"strings"
)

func main() {
	b, err := os.ReadFile("./table.html")
	if err != nil {
		log.Fatalln(err)
	}

	send(string(b))
}

func send(body string) {
	from := "yamiodymel@gmail.com"
	pass := "jvbygvgfbcwhlxbm"
	to := "yamiodymel@gmail.com"

	// 透過 `css-minify` 將 `/dist/tocas.css` 的內容最小化。
	if err := exec.Command("css-minify", "-f", "./email.css", "-o", "./").Run(); err != nil {
		log.Fatal(err)
	}

	b, err := os.ReadFile("./email.min.css")
	if err != nil {
		log.Fatalln(err)
	}

	body = strings.ReplaceAll(body, `<link rel="stylesheet" href="./email.css" />`, fmt.Sprintf(`<style type="text/css">%s</style>`, string(b)))

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Hello there\n" +
		"MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" +
		body

	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return
	}

	log.Print("sentm")
}
