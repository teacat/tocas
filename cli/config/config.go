// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package config

import (
	"encoding/json"
	"io/ioutil"

	"github.com/teacat/pathx"

	"github.com/teacat/tocas/cli/path"
)

var (
	// CurrentConfig 是目前載入的設定。
	CurrentConfig *Config
)

// Config 呈現了一個設定資料。
type Config struct {
	// SelectedVersion 是已經選擇的版本。
	SelectedVersion string
	// SelectedTranslation 是已經選擇的翻譯語系。
	SelectedTranslation string
	// SelectedSass 是已經選擇的 Sass 編譯器。
	SelectedSass string
}

//
type PreferedTemplate struct {
}

//
type Template struct {
}

// Load 會讀取設定檔案到程式中。
func Load() error {
	b, err := ioutil.ReadFile(path.PathConfigFile)
	if err != nil {
		return err
	}
	err = json.Unmarshal(b, &CurrentConfig)
	if err != nil {
		return err
	}
	return nil
}

// Init 會初始化一個預設的設定檔案。
func Init() error {
	d := &Config{
		SelectedVersion:     "0.0.0",
		SelectedTranslation: "zh-tw",
		SelectedSass:        "wt",
	}
	b, err := json.Marshal(d)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(path.PathConfigFile, b, 0644)
	if err != nil {
		return err
	}
	return nil
}

// Save 會將目前的設定保存於檔案中。
func Save() error {
	b, err := json.Marshal(CurrentConfig)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(path.PathConfigFile, b, 0644)
	if err != nil {
		return err
	}
	return nil
}

// Prepare 會準備並載入整個設定手續。
func Prepare() error {
	if !pathx.Exists(path.PathConfigFile) {
		err := Init()
		if err != nil {
			return err
		}
	}
	err := Load()
	if err != nil {
		return err
	}
	return nil
}
