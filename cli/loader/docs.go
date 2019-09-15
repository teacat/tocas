// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package loader

import (
	"io/ioutil"
	"log"

	"github.com/teacat/tocas/cli/path"
)

var Translations = make(map[string]Version)

type Translation struct {
	Name         string
	DisplayName  string
	Flag         string
	Version      string
	Contributors []string
	Strings
	Settings TranslationSettings
}

type Page interface {
}

type TranslationSettings struct {
	Links
	Pages
}

type TranslationLink struct {
	Name string
	URL  string
}

type TranslationPage struct {
	Path string
	URL  string
	Type string
}

type Page struct {
	Type
	Path
	URL
}

func ScanTranslations() {

	files, err := ioutil.ReadDir(path.PathVersionDocumentationTranslations)
	if err != nil {
		log.Fatal(err)
	}
	vs := make(map[string]Version)
	for _, v := range files {
		vs[v.Name()] = LocalVersion{
			tagName: v.Name(),
		}
	}
	return vs
}
