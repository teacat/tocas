// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package loader

import "github.com/teacat/tocas/cli/config"

// Prepare 會準備版本相關資訊，並且仔細切分網際網路與本機的版本，
// 同時選擇設定檔中所選定的版本。
func Prepare() error {
	RemoteVersions, err := FetchVersions()
	if err != nil {
		// use locale
		// return err
	}
	LocalVersions = ScanVersions()
	Versions = CombineVersions(RemoteVersions, LocalVersions)

	// 如果本機沒有可用的版本，那就先從 GitHub 中下載最新的。
	if len(Versions) == 0 {
		err = DownloadLatestVersion()
		if err != nil {
			return err
		}
		return Prepare()
	}
	return SelectVersion(config.CurrentConfig.SelectedVersion)
}
