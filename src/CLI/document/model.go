package document

import (
	"github.com/TeaMeow/TocasUI/src/CLI/executor"
)

type Document struct {
	Language string
	Name     string
	Path     string
	Content  []byte
	Executor *executor.Executor

	//
	UI map[string]interface{}
	//
	Main map[string]interface{}
	//
	CompiledContent *DocumentContent

	// Title 是此文件的標題名稱。
	Title string `yaml:"Title"`
	// Description 是此文件的簡短段落說明。
	Description string `yaml:"Description"`
	// Outline 是文件的較長大綱敘述（支援 Markdown）。
	Outline string `yaml:"Outline"`

	//
	HasSettings bool
	//
	HasUsages bool
	//
	HasDefinitions bool

	// Settings 是文件的設定屬性。
	Settings *DocumentSettings `yaml:"Settings"`
	// Usages 是文件的方法使用教學。
	Usages *DocumentUsages `yaml:"Usages"`
	// Definitions 是文件的樣式定義章節。
	Definitions []*DocumentDefinition `yaml:"Definitions"`

	// Indexes 是文件的索引相關資料。
	Indexes *DocumentIndexes
}

//
type DocumentContent struct {
	Settings    string
	Usages      string
	Definitions string
	Default     string
}

// DocumentIndexes 是文件的索引相關資料。
type DocumentIndexes struct {
	// DefinitionIndexes 是樣式定義的所有索引。
	DefinitionIndexes []*DocumentIndex
}

// DocumentIndex 是基於文件章節的索引資料建構體。
type DocumentIndex struct {
	// Title 是標題。
	Title string
	// Name 是索引的錨點名稱，空白會被轉換成減號（`-`）作為分隔符。
	Name string
	//
	SubIndexes []*DocumentIndex
	//
	HasSubIndex bool
	// Labels 是此索引的額外標註標籤，有時候會呈現於頁面中。
	Labels []string
}

// DocumentSettings 是文件的設定相關內容。
type DocumentSettings struct {
	// Properties 是文件可用的設定屬性。
	Properties []*SettingProperty `yaml:"Properties"`
	// Callbacks 是文件設定的回呼函式。
	Callbacks []*SettingCallback `yaml:"Callbacks"`
}

// SettingProperty 是單個初始化設定的屬性資料。
type SettingProperty struct {
	// Key 是設置的鍵名。
	Key string `yaml:"Key"`
	// Description 是註釋，可使用 Markdown 格式。
	Description string `yaml:"Description"`
	// Default 是此預設值。
	Default string `yaml:"Default"`
	// DefaultObject 是預設的物件內容，和預設值之間同時只能存在一種。
	DefaultObject string `yaml:"DefaultObject"`
}

// SettingCallback 是一個回呼函式說明。
type SettingCallback struct {
	// Name 是回呼函式的英文名稱。
	Name string `yaml:"Name"`
	// Description 是回呼函式的說明。
	Description string `yaml:"Description"`
	// Context 是回呼函式的上下文說明內容。
	Context *CallbackContext `yaml:"Context"`
	// Arguments 是回呼函式傳入的參數資料。
	Arguments []*CallbackArgument `yaml:"Arguments"`
}

// CallbackContext 是回呼函式的上下文 `this` 內容說明。
type CallbackContext struct {
	// Description 是上下文的敘述說明。
	Description string `yaml:"Description"`
	// Type 是上下文的資料型態。
	Type string `yaml:"Type"`
}

// CallbackArgument 是單個回呼函式的傳入參數。
type CallbackArgument struct {
	// Name 是參數的英文名稱。
	Name string `yaml:"Name"`
	// Description 是參數的說明。
	Description string `yaml:"Description"`
	// Type 是參數的資料型態。
	Type string `yaml:"Type"`
}

// DocumentUsages 是文件的使用說明資料。
type DocumentUsages struct {
	// Behaviors 是可供呼叫使用的行為方法說明。
	Behaviors []*UsageBehavior `yaml:"Behaviors"`
}

// UsageBehavior 是單個可呼叫的行為方法說明。
type UsageBehavior struct {
	// Name 是行為的函式名稱。
	Name string `yaml:"Name"`
	// Description 是行為的說明。
	Description string `yaml:"Description"`
	// Arguments 是需要傳入的參數說明。
	Arguments []*BehaviorArgument `yaml:"Arguments"`
	// Return 是行為執行後的回傳說明。
	Return *BehaviorReturn `yaml:"Return"`
}

// BehaviorArgument 是單個行為方法所需傳入的參數說明。
type BehaviorArgument struct {
	// Name 是參數名稱。
	Name string `yaml:"Name"`
	// Required 表示了該參數是否為必需。
	Required bool `yaml:"Required"`
	// Description 是參數的說明。
	Description string `yaml:"Description"`
	// Type 是參數的資料型態。
	Type string `yaml:"Type"`
}

// BehaviorReturn 是單個行為執行後所會回傳的資料內容。
type BehaviorReturn struct {
	// Type 是行為所回傳的資料型態。
	Type string `yaml:"Type"`
	// Description 是形容回傳資料的說明。
	Description string `yaml:"Description"`
}

// DocumentDefinition 是單個樣式定義說明的大章節。
type DocumentDefinition struct {
	// Title 是章節大標題。
	Title string `yaml:"Title"`
	// Description 是章節的說明。
	Description string `yaml:"Description"`
	// Sections 是此說明定義的子章節。
	Sections []*DefinitionSection `yaml:"Sections"`
}

// DefinitionSection 是單個樣式定義大章節中的詳細子章節內容。
type DefinitionSection struct {
	// Title 是段落標題。
	Title string `yaml:"Title"`
	// Description 是段落說明。
	Description string `yaml:"Description"`
	// Since 是敘述此樣式可用於哪個 Tocas 版本，通常是：`2.0.0` 等。
	Since string `yaml:"Since"`
	// HTML 是此段落的 HTML 範例程式碼。
	HTML string `yaml:"HTML"`
	// JavaScript 是此段落的 JavaScript 範例程式碼。
	JavaScript string `yaml:"JavaScript"`
	// CSS 是此段落的 CSS 範例程式碼。
	CSS string `yaml:"CSS"`
	// Remove 是此段落欲在範例中剔除的多餘內容。
	Remove []string `yaml:"Remove"`
	// Responsive 表示此章節的範例是否可在響應式模式下觀看。
	Responsive bool `yaml:"Responsive"`

	// HTMLReadable 是可供人類閱讀的 HTML 程式碼，經過縮排且被整理過並帶有螢光標籤。
	HTMLReadable string
	// HTMLNative 是整理之後的 HTML 原生程式碼內容，可以直接被執行。
	HTMLNative string
	// JavaScriptReadable 是可供人類閱讀的 JavaScript 程式碼，經過縮排且被整理過並帶有螢光標籤。
	JavaScriptReadable string
	// JavaScriptNative 是整理之後的 JavaScript 原生程式碼內容，可以直接被執行。
	JavaScriptNative string
	// CSSReadable 是可供人類閱讀的 CSS 程式碼，經過縮排且被整理過並帶有螢光標籤。
	CSSReadable string
	// CSSNative 是整理之後的 CSS 原生程式碼內容，可以直接被執行。
	CSSNative string
	// Highlights 是此章節的特別標註內容，由程式分析段落內容而彙整的。
	Highlights []string
}
