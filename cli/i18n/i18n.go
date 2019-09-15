// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package i18n

import (
	"errors"
	"fmt"
	"strings"

	"github.com/AlecAivazis/survey"
	"github.com/teacat/tocas/cli/config"
)

var (
	// ErrNoLongerExists 表示選擇的翻譯已經被移除或消失了。
	ErrNoLongerExists = errors.New("tocas: the selected translation does no longer exist")
)

var (
	// CurrentTranslation 是目前所使用的語系資料。
	CurrentTranslation Translation
)

// Translations 匯集了所有不同語系的翻譯。
var Translations = map[string]Translation{
	"zh-tw": zhTW,
}

// Translation 呈現了一個翻譯資料。
type Translation struct {
	// Name 是翻譯的區域代碼（如：`zh-tw`）。
	Name string
	// DisplayName 是顯示的名稱。
	DisplayName string
	// Contributors 是此語系的貢獻者。
	Contributors []Contributor
	// Strings 是此翻譯語系的字串。
	Strings Strings
}

// Strings 呈現了所有翻譯的字串。
type Strings struct {
	// Message 是訊息字串。
	Message map[string]string
	// Question 是問題字串。
	Question map[string]string
	// Option 是選項字串。
	Option map[string]string
	// Component 是元件字串。
	Component map[string]string
}

// Contributor 是單個翻譯的貢獻者。
type Contributor struct {
	// Name 是貢獻者的名稱。
	Name string
	// Website 是貢獻者個人網站網址。
	Website string
}

// List 會載入所有語系並呈現一個清單。
func List() []Translation {
	var l []Translation
	for _, v := range Translations {
		l = append(l, v)
	}
	return l
}

// Prepare 會依照載入的設定檔案讀取相對應的翻譯語系。
func Prepare() error {
	return Select(config.CurrentConfig.SelectedTranslation)
}

// Select 會選擇並採用指定語系。
func Select(lang string) error {
	if v, ok := Translations[lang]; ok {
		CurrentTranslation = v
		return nil

	}
	return ErrNoLongerExists
}

// Get 會取得語系的指定翻譯文字串。
func Get(t string) (s string) {
	k := strings.TrimLeft(t, strings.Split(t, ".")[0]+".")
	switch strings.Split(t, ".")[0] {
	case "Message":
		s = CurrentTranslation.Strings.Message[k]
	case "Question":
		s = CurrentTranslation.Strings.Question[k]
	case "Option":
		s = CurrentTranslation.Strings.Option[k]
	case "Component":
		s = CurrentTranslation.Strings.Component[k]
	}
	return
}

// O 是 `Get("Option.xxx")` 的縮寫。
func O(t string) string {
	return Get(fmt.Sprintf("Option.%s", t))
}

// M 是 `Get("Message.xxx")` 的縮寫。
func M(t string) string {
	return Get(fmt.Sprintf("Message.%s", t))
}

// Q 是 `Get("Question.xxx")` 的縮寫。
func Q(t string) string {
	return Get(fmt.Sprintf("Question.%s", t))
}

// C 是 `Get("Component.xxx")` 的縮寫。
func C(t string) string {
	return Get(fmt.Sprintf("Component.%s", t))
}

// AskOne 會像使用者詢問一個訊息，而相關字串會自動採用來自翻譯的字串。
func AskOne(t string, opts []string) (i int) {
	for k, v := range opts {
		opts[k] = O(fmt.Sprintf("%s.%s", t, v))
	}
	prompt := &survey.Select{
		Message: Q(t),
		Options: opts,
	}
	survey.AskOne(prompt, &i)
	return
}

// AskOneDynamic 與 `AskOne` 相同作用，但選項不會轉換為翻譯字串。
func AskOneDynamic(t string, opts []string) (i int) {
	prompt := &survey.Select{
		Message: Q(t),
		Options: opts,
	}
	survey.AskOne(prompt, &i)
	return
}
