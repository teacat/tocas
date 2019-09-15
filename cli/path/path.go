// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package path

import (
	"github.com/teacat/pathx"
	"github.com/teacat/tocas/cli/loader"
)

var (
	// root 是路徑的根位置。
	root = pathx.ExecutableDir()
)

var (
	// PathVersions 是存放 Tocas 版本的位置。
	PathVersions = pathx.JoinDir(root, "tocas_assets", "verions")
	// PathDownloads 是下載目錄的位置。
	PathDownloads = pathx.JoinDir(root, "tocas_assets", "downloads")
	// PathConfigFile 是設定檔案的位置。
	PathConfigFile = pathx.Join(root, "tocas_assets", "config.json")
)

var (
	// versionRoot 是選定版本的路徑根位置。
	versionRoot string
	// PathVersionDocumentationTranslations 選定版本的文件翻譯語系位置。
	PathVersionDocumentationTranslations string
)

// Prepare 會從載入的設定檔中讀取指定版本的文件翻譯資料。
func Prepare() {
	versionRoot = pathx.JoinDir(PathVersions, loader.CurrentVersion.TagName())
	PathVersionDocumentationTranslations = pathx.JoinDir(versionRoot, "docs", "i18n")
}
