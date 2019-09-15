// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package loader

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/mholt/archiver"
	"github.com/teacat/pathx"
	"github.com/teacat/tocas/cli/path"

	"github.com/google/go-github/github"
)

var (
	// ErrUnsupportedCLI 表示目標版本已經有所結構變更，目前使用的終端機指令列工具不被列入支援範圍，必須升級工具。
	ErrUnsupportedCLI = errors.New("tocas: the CLI does no longer been supported by the selected version, please update the CLI version")
	// ErrNoLongerExists 表示選擇的版本已經被移除或消失了。
	ErrNoLongerExists = errors.New("tocas: the selected version does no longer exist")
	// ErrNoVersions 表示無法取得遠端版本，而本地也沒有可用的版本。
	ErrNoVersions = errors.New("tocas: unable to fetch the versions and there're no local versions")
)

var (
	// CurrentVersion 是目前所選擇的版本。
	CurrentVersion Version
)

// RemoteVersions 是網際網路的所有版本。
var RemoteVersions = make(map[string]Version)

// LocalVersions 是本機的所有版本。
var LocalVersions = make(map[string]Version)

// Versions 是網際網路與本機的所有版本。
var Versions = make(map[string]Version)

// Version 奠定了一個版本的介面。
type Version interface {
	TagName() string
}

// RemoteVersion 是遠端版本並帶有 GitHub 釋出相關資訊。
type RemoteVersion struct {
	// Release 是這個版本的 GitHub 釋出資料。
	Release *github.RepositoryRelease
	// TagName 是這個版本的標籤名稱。
	tagName string
}

func (r RemoteVersion) TagName() string {
	return r.tagName
}

// LocalVersion 是本機版本。
type LocalVersion struct {
	// TagName 是這個版本的標籤名稱。
	tagName string
}

func (r LocalVersion) TagName() string {
	return r.tagName
}

// SelectVersion 會選擇指定的版本。
func SelectVersion(tag string) error {
	if v, ok := Versions[tag]; ok {
		CurrentVersion = v
		return nil
	}
	return ErrNoLongerExists
}

// FetchVersions 會連線至 GitHub 取得所有版本的資訊，同時掃描本機是否已經有該版本。
func FetchVersions() (map[string]Version, error) {
	client := github.NewClient(nil)
	r, _, err := client.Repositories.ListReleases(context.Background(), "TeaMeow", "TocasUI", nil)
	if err != nil {
		return nil, err
	}
	vs := make(map[string]Version)
	for _, v := range r {
		vs[*v.TagName] = RemoteVersion{
			Release: v,
			tagName: *v.TagName,
		}
	}
	return vs, nil
}

// ScanVersions 能夠掃描本機的所有版本，這在網路不可用的時候十分方便。
func ScanVersions() map[string]Version {
	files, err := ioutil.ReadDir(path.PathDownloads)
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

// CombineVersions 會將兩個不同的來源版本整合在一起。
func CombineVersions(src map[string]Version, in map[string]Version) map[string]Version {
	for k, v := range in {
		src[k] = v
	}
	return src
}

// DownloadLatestVersion 會從 GitHub 下載最新版本的 Tocas。
func DownloadLatestVersion() error {
	client := github.NewClient(nil)
	r, _, err := client.Repositories.GetLatestRelease(context.Background(), "teacat", "tocas")
	if err != nil {
		return err
	}
	DownloadVersion(*r.TagName)
	return nil
}

// DownloadVersion 會從 GitHub 下載指定版本的 Tocas。
func DownloadVersion(tag string) error {
	client := github.NewClient(nil)
	r, _, err := client.Repositories.GetReleaseByTag(context.Background(), "teacat", "tocas", tag)
	if err != nil {
		return err
	}
	// 在指定的本機儲存路徑中建立一個相對應的壓縮檔案名稱。
	file, err := os.OpenFile(pathx.JoinDir(path.PathDownloads, tag), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	// 將下載的版本壓縮檔案保存在本機的指定路徑。
	log.Printf("正在下載 Tocas：%s", *r.ZipballURL)
	resp, err := http.Get(*r.ZipballURL)
	if err != nil {
		return err
	}
	n, err := io.Copy(file, resp.Body)
	if err != nil {
		return err
	}
	log.Printf("已經複製 Tocas 整體套件（%d Bytes）", n)

	// 解壓縮版本壓縮檔案。
	log.Printf("正在解壓縮套件…")
	err = archiver.Unarchive(file.Name(), pathx.JoinDir(path.PathVersions, tag))
	if err != nil {
		return err
	}

	// 讀取該版本的核准 CLI 版本。
	b, err := ioutil.ReadFile(pathx.Join(path.PathVersions, tag, "CLI_ALLOWED"))
	if err != nil {
		return err
	}
	var v []string
	err = json.Unmarshal(b, &v)
	if err != nil {
		return err
	}
	// 如果該內容沒有此 CLI 的版本則表示錯誤。
	var has bool
	for _, v := range v {
		if v == CurrentVersion.TagName() {
			has = true
		}
	}
	if !has {
		os.RemoveAll(pathx.JoinDir(path.PathVersions, tag))
		os.RemoveAll(pathx.JoinDir(path.PathDownloads, tag))
		return ErrUnsupportedCLI
	}
	return nil
}
