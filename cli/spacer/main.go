package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

type Group struct {
	Lines         []Line
	MaxColonIndex int
}

type Line struct {
	Index              int
	Content            string
	ColonIndex         int
	MaxGroupColonIndex int
}

func main() {
	f := open()
	g := scan(f)
	f = open()
	u := update(f, flatten(g))

	ioutil.WriteFile("./test.css", []byte(u), 0777)
	fmt.Println(u)
}

func open() *os.File {
	f, err := os.OpenFile("./test.css", os.O_RDONLY, os.ModePerm)
	if err != nil {
		log.Fatalf("open file error: %v", err)
		return nil
	}
	return f
}

func scan(f *os.File) []Group {
	sc := bufio.NewScanner(f)
	var lineNo int
	var maxColonIndex int
	var groups []Group
	var lines []Line
	for sc.Scan() {
		lineNo++

		l := sc.Text()

		if l == "" {
			if len(lines) != 0 {
				groups = append(groups, Group{
					Lines:         lines,
					MaxColonIndex: maxColonIndex,
				})
			}

			lines = []Line{}
			maxColonIndex = 0
			continue
		}

		for k, v := range l {
			if k == 0 && (string(v) == ":" || string(v) == ".") {

				break
			}
			if string(v) == ":" {
				if k > maxColonIndex {
					maxColonIndex = k
				}
				lines = append(lines, Line{
					Index:      lineNo,
					Content:    l,
					ColonIndex: k,
				})
				break
			}

			if k == len(l)-1 {

				if len(lines) != 0 {
					groups = append(groups, Group{
						Lines:         lines,
						MaxColonIndex: maxColonIndex,
					})
				}

				lines = []Line{}
				maxColonIndex = 0
			}
		}
	}
	if err := sc.Err(); err != nil {
		log.Fatalf("scan file error: %v", err)
		return []Group{}
	}

	return groups
}

func update(f *os.File, flat map[int]Line) string {
	var content string

	sc := bufio.NewScanner(f)
	var lineNo int

	for sc.Scan() {
		lineNo++

		l := sc.Text()

		v, ok := flat[lineNo]
		if !ok {
			content += l + "\n"
			continue
		}
		spaceNum := v.MaxGroupColonIndex - v.ColonIndex

		if spaceNum == 0 {
			content += l + "\n"
			continue
		}
		r := []rune(l)
		var spaces []rune
		for v := 0; v < spaceNum; v++ {
			spaces = append(spaces, []rune(" ")...)
		}
		var result []rune
		result = append(result, r[0:v.ColonIndex]...)
		result = append(result, spaces...)
		result = append(result, r[v.ColonIndex:]...)
		content += string(result) + "\n"
	}
	return content
}

func flatten(g []Group) map[int]Line {
	for j, v := range g {
		for k := range v.Lines {
			g[j].Lines[k].MaxGroupColonIndex = v.MaxColonIndex
		}
	}

	flat := make(map[int]Line)
	for _, v := range g {
		for _, j := range v.Lines {
			flat[j.Index] = j
		}
	}
	return flat
}
