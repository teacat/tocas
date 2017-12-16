package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/howeyc/fsnotify"

	"gopkg.in/russross/blackfriday.v2"
)

func main() {
	watcher()
}

func currentPath() string {
	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}
	return filepath.Dir(ex)
}

func toHTML(input []byte) []byte {

	render := blackfriday.NewHTMLRenderer(blackfriday.HTMLRendererParameters{})

	//fmt.Printf("%+v", )
	ast := blackfriday.New().Parse(input)
	var buf bytes.Buffer
	ast.Walk(func(node *blackfriday.Node, entering bool) blackfriday.WalkStatus {
		fmt.Println(string(node.Literal))
		return render.RenderNode(&buf, node, entering)
	})

	output := blackfriday.Run(input, blackfriday.WithNoExtensions())
	output = []byte("")
	return output
}

func allFiles() ([]string, error) {
	return filepath.Glob("*")
}

func content(path string) []byte {
	content, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	return content
}

func watcher() {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		panic(err)
	}

	done := make(chan bool)

	// Process events
	go func() {
		for {
			select {
			case ev := <-watcher.Event:

				//log.Println("event:", ev.Name)
				fmt.Println(string(toHTML(content(ev.Name))))

			case err := <-watcher.Error:
				log.Println("error:", err)
			}
		}
	}()

	err = watcher.Watch(currentPath() + "/../languages/zh_TW/elements")
	if err != nil {
		panic(err)
	}

	// Hang so program doesn't exit
	<-done

	/* ... do stuff ... */
	watcher.Close()
}
