// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package view

import (
	"fmt"

	"github.com/teacat/tocas/cli/loader"

	"github.com/teacat/tocas/cli/i18n"

	"github.com/AlecAivazis/survey"
)

//
func Menu() {
	switch i18n.AskOne("Menu", []string{"Download", "Build", "Develop", "Contributors", "Language"}) {
	// 下載或選擇版本
	case 0:
		downloads()
	// 自訂並建置與安裝
	case 1:
		installation()
	// 進行開發與編譯
	case 2:
		develop()
	// 檢視貢獻者
	case 3:
		contributors()
	// Change language
	default:
		language()
	}
}

//
func downloads() {

	var options []string
	var list []loader.Version
	//
	for _, v := range loader.LocalVersions {
		if loader.CurrentVersion.TagName == v.(loader.LocalVersion).TagName {
			options = append(options, fmt.Sprintf("%s（已安裝、已選擇）", v.(loader.LocalVersion).TagName))
		} else {
			options = append(options, fmt.Sprintf("%s（已安裝）", v.(loader.LocalVersion).TagName))
		}
		list = append(list, v)
	}
	//
	for _, v := range loader.RemoteVersions {
		options = append(options, fmt.Sprintf("%s", v.(loader.RemoteVersion).TagName))
		list = append(list, v)
	}

	var index int
	prompt := &survey.Select{
		Message: "選擇欲採用的 Tocas 版本",
		Options: options,
	}
	survey.AskOne(prompt, &index)

	switch v := list[index].(type) {
	case loader.RemoteVersion:
		loader.DownloadVersion(v.TagName())
	}

	loader.SelectVersion(list[index].TagName())
	Menu()
}

//
func installation() {

}

//
func develop() {
	switch i18n.AskOne("Develop", []string{"Compile", "Documentation", "FontAwesome", "Back"}) {
	// 監聽並即時編譯原始碼
	case 0:
	// 編譯與更新文件
	case 1:
		documentation()
	// 更新 FontAwesome
	case 2:
	// 返回
	default:
		Menu()
	}
}

//
func documentation() {
	switch i18n.AskOne("Documentation", []string{"Compile", "Fill", "Back"}) {
	// 編譯語系文件
	case 0:
		compileDocumentation()
	// 以原生語言補足文件
	case 1:
		fillDocumentation()
	// 返回
	default:
		Menu()
	}
}

func compileDocumentation() {
	l := loader.ListDocumentationTranslations()
	//
	var list []string
	for _, v := range l {
		list = append(list, v.Name)
	}

	switch i := i18n.AskOneDynamic("CompileDocumentation"); i {
	// 編譯語系文件
	default:

	// 返回
	case len(l) + 1:
		Menu()
	}
}

//
func fillDocumentation() {

}

//
func fontAwesome() {

}

//
func contributors() {
	fmt.Println("他們功不可沒！")
	Menu()
}

//
func language() {
	l := i18n.List()
	var list []string
	for _, v := range l {
		list := append(list, v.DisplayName)
	}
	switch i := i18n.AskOneDynamic("Language", list); i {
	// 語系
	default:
		Select(l[i].Name)
	// 返回
	case len(l) + 1:
		Menu()
	}
}
