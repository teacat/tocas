package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"path/filepath"
	"time"

	"github.com/radovskyb/watcher"
	"github.com/teacat/pathx"
	"github.com/urfave/cli/v2"
	"gopkg.in/yaml.v2"
)

var (
	langMeta = make(map[string]Meta)
)

func build() error {
	
}

func load() error {
	langs, err := filepath.Glob("./translations/*")
	if err != nil {
		return err
	}
	for _, v := range langs {
		b, err := ioutil.ReadFile(pathx.Join(v, "meta.yml"))
		if err != nil {
			return err
		}
		var m Meta
		if err := yaml.Unmarshal(b, &m); err != nil {
			return err
		}
		langMeta[filepath.Base(v)] = m
	}
	return nil
}

func watch(c *cli.Context) error {
	load()

	w := watcher.New()
	w.SetMaxEvents(1)
	go processWatch(w)

	if err := w.AddRecursive("./translations"); err != nil {
		return err
	}
	if err := w.Start(time.Millisecond * 100); err != nil {
		log.Fatalln(err)
	}
	return nil
}

func processWatch(w *watcher.Watcher) {
	for {
		select {
		case event := <-w.Event:
			fmt.Println(event)
		case <-w.Closed:
			return
		}
	}
}
