package main

import (
	"fmt"
	"io/ioutil"

	yaml "gopkg.in/yaml.v2"
)

// Documentations 是多個語系文件總彙的存放變數。
var Documentations []*Documentation

// UIPath 是 UI 語系檔案的名稱。
const UIPath = "ui.yml"

// MainPath 是主要語系檔案名稱。
const MainPath = "main.yml"

// Collect 會讀取指定的語系路徑中所有的文件資料，並且彙整成一個文件建構體。
func Collect(path string) { //*model.Documentation {
	var ui map[string]interface{}
	var main map[string]interface{}

	Read(Path(path, UIPath), &ui)
	Read(Path(path, MainPath), &main)

	fmt.Printf("%+v", main["Language"].(string))

	//return &model.Documentation{
	//	Language: filepath.Base(path),
	// LocalizedLanguage: main["Language"].(string),
	// Flag: main["Flag"].(string),
	//
	//}
}

// Path 會回傳指定路徑最後面插入一個新的路徑。
func Path(path string, subpath string) string {
	return fmt.Sprintf("%s/%s", path, subpath)
}

// Read 能夠讀取指定路徑的 YAML 格式檔案並映射其內容到指定的目標變數。
func Read(path string, dst interface{}) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(b, dst)
	if err != nil {
		panic(fmt.Sprintf("%s: %+v", path, err))
	}
}
