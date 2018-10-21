package main

// Language 呈現了一個語系代稱（例如：`en-us`、`zh-tw`）。
type Language string

// Documentation 是單個語系的文件總彙。
type Documentation struct {
	// Language 是此總彙的語系。
	Language Language
	// LocalizedLanguage 是指以當地國家語言所顯示的語系文字（例如：`正體中文（台灣）`）。
	LocalizedLanguage string
	// Flag 是國旗名稱，基於 Tocas UI 的 Flag 元件。
	Flag string
	// Pages 是文件總彙的所有頁面。
	Pages []*Page
	// UI 是界面語系文字。
	UI map[string]interface{}
	// Contributors 是此總彙語系的貢獻者。
	Contributors []*Contributor
}

// Contributor 是單個貢獻者。
type Contributor struct {
	// Name 是貢獻者名稱或暱稱。
	Name string
	// Website 是能夠聯繫到該貢獻者的網址連結。
	Website string
}

// Page 呈現了單個文件頁面資料。
type Page struct {
	// Title 是主要標題。
	Title string
	// Description 是主要的註釋。
	Description string
	// Settings 是設定資料。
	Settings Settings
	// Usages 是使用方法資料。
	Usages Usages
	// Definitions 是樣式定義資料。
	Definitions Definition
	// Metadata 是中繼資料。
	Metadata Metadata
	// ComponentCategory 是元件分類，用於側邊索引。
	ComponentCategory ComponentCategory
}

// TemporaryPage 是暫時的文件資料映射建構體，
// 這會經過正規手續然後轉換到真正的 `Page` 建構體。
type TemporaryPage struct {
	// Title 是主要標題。
	Title string `mapstructure:"Title"`
	// Description 是主要的註釋。
	Description string `mapstructure:"Description"`
	// Settings 是設定資料。
	Settings Settings `mapstructure:"Settings"`
	// Usages 是使用方法資料。
	Usages Usages `mapstructure:"Usages"`
	// Definitions 是樣式定義資料。
	Definitions []Article `mapstructure:"Definitions"`
}

//=======================================================
// 樣式定義
//=======================================================

// Definition 是樣式定義內容。
type Definition struct {
	// Indexes 是文章段落索引。
	Indexes []Index
	// Articles 是章節段落內容。
	Articles []Article
}

//=======================================================
// 設定資料
//=======================================================

// Settings 是文件的設定資料與其章節內容。
type Settings struct {
	// Indexes 是文章段落索引。
	Indexes []Index
	// Properties 是可用的設定屬性。
	Properties []Property `mapstructure:"Properties"`
	// Callbacks 是回呼函式設定。
	Callbacks []Callback `mapstructure:"Callbacks"`
}

// Property 是單個設定屬性資料。
type Property struct {
	// Key 是屬性鍵名。
	Key string `mapstructure:"Key"`
	// Default 是預設的設定值。
	Default string `mapstructure:"Default"`
	// Description 是屬性的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Type 是屬性的型態。
	Type string `mapstructure:"Type"`
}

// Callback 是單個回呼設定資料。
type Callback struct {
	// Name 是名稱。
	Name string `mapstructure:"Name"`
	// Description 是回呼函式的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Context 是本體物件（`this`）資料。
	Context Context `mapstructure:"Context"`
	// Arguments 是函式所接收的參數資料。
	Arguments []Argument `mapstructure:"Arguments"`
}

// Context 是單個回呼函式的本體物件（`this`）。
type Context struct {
	// Description 是本體物件的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Type 是本體物件的資料型態。
	Type string `mapstructure:"Type"`
}

// Argument 是單個回呼函式的參數資料。
type Argument struct {
	// Name 是參數鍵名。
	Name string `mapstructure:"Name"`
	// Description 是參數的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Type 是參數的資料型態。
	Type string `mapstructure:"Type"`
	// Required 表示此參數是否為必填。
	Required bool `mapstructure:"Required"`
}

//=======================================================
// 使用方法
//=======================================================

// Usages 是文件的使用方法與其章節段落。
type Usages struct {
	// Indexes 是文章段落索引。
	Indexes []Index
	// Examples 是使用方法的說明章節段落。
	Examples []Article `mapstructure:"Examples"`
	// Behaviors 是可用的行為。
	Behaviors []Behavior `mapstructure:"Behaviors"`
}

// Behavior 是單個可用行為資料。
type Behavior struct {
	// Name 是行為名稱。
	Name string `mapstructure:"Name"`
	// Description 是行為的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Arguments 是此行為所接收的參數。
	Arguments []Argument `mapstructure:"Arguments"`
	// Return 是此行為所回傳的資料詳細內容。
	Return Return `mapstructure:"Return"`
}

// Return 是一個行為所會回傳的資料。
type Return struct {
	// Description 是資料的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Type 是資料型態。
	Type string `mapstructure:"Type"`
}

//=======================================================
// 中繼資料
//=======================================================

// Metadata 是文件的中繼資料。
type Metadata struct {
	// Category 是這個文件的大分類（如：`collections`、`elements`）。
	Category string
	// Component 是這個文件元件的名稱（如：`button`、`card`）。
	Component string
	// HasDefinition 表示此文件是否有樣式定義章節。
	HasDefinition bool
	// HasSetting 表示此文件是否有設定章節。
	HasSetting bool
	// HasUsage 表示此文件是否有使用方式章節。
	HasUsage bool
}

//=======================================================
// 文章段落
//=======================================================

// Category 是大綱分類。
type Category struct {
	// Title 是大綱分類的標題。
	Title string
	// Description 是大綱的說明，可支援 Markdown 格式。
	Description string
	// Articles 是此分類中的文章內容。
	Articles []Article
}

// Article 是單個文章敘述內容。
type Article struct {
	// Title 是文章標題。
	Title string `mapstructure:"Title"`
	// Subtitle 是子文章標題，若有內容，此文章會以次級文章呈現。
	// 此內容與 `Title` 不會同時存在。
	Subtitle string `mapstructure:"Subtitle"`
	// Description 是文章的說明，可支援 Markdown 格式。
	Description string `mapstructure:"Description"`
	// Since 是此文章的敘述可用起始版本號碼。
	Since string `mapstructure:"Since"`
	// OriginalHTML 是文章所敘述的 HTML 程式碼，支援 Tocas 文件自身的特別標籤。
	OriginalHTML string `mapstructure:"HTML"`
	// OriginalJavaScript 是文章所敘述的 JavaScript 程式碼。
	OriginalJavaScript string `mapstructure:"JavaScript"`
	// OriginalCSS 是文章所敘述的 CSS 程式碼。
	OriginalCSS string `mapstructure:"CSS"`
	// HTML 是經過多方整理之後的 HTML 範例資料。
	HTML Code
	// JavaScript 是經過多方整理之後的 JavaScript 範例資料。
	JavaScript Code
	// CSS 是經過多方整理之後的 CSS 範例資料。
	CSS Code
	// Remove 是指欲從範例程式碼中移除的字串。
	Remove []string `mapstructure:"Remove"`
	// AutoExecute 表示文章的 JavaScript 範例程式碼是否要自動執行。
	AutoExecute bool `mapstructure:"AutoExecute"`
	// Executable 表示文章的 JavaScript 範例程式碼是否為可執行的，
	// 若可執行，即會在文件上呈現執行按鈕。
	Executable bool `mapstructure:"Executable"`
	// Responsive 表示文章的 HTML 預覽範例是否為響應式，
	// 若為響應式，即會在文件上呈現響應式預覽按鈕。
	Responsive bool `mapstructure:"Responsive"`
}

// Index 呈現了一個索引資料。
type Index struct {
	// Title 是此索引名稱。
	Title string
	// Highlights 是索引所標註的特別文字。
	Highlights []string
	// HasSubIndex 表示此索引是否有子索引。
	HasSubIndex bool
	// SubIndexes 是子索引集。
	SubIndexes []Index
	// Anchor 是索引的錨點連結。
	Anchor string
}

//=======================================================
// 索引資料
//=======================================================

// ComponentCategory 是元件的索引分類。
type ComponentCategory struct {
	// Name 是本地化的元件分類名稱。
	Name string
	// Alias 是此分類的英文名稱。
	Alias string
	// Items 是此分類中的元件索引資料。
	Items ComponentIndex
}

// ComponentIndex 是單個元件索引資料。
type ComponentIndex struct {
	// Name 是本地化的元件名稱。
	Name string
	// Alias 是元件的英文名稱。
	Alias string
	// IsActive 表示此文件頁面是否正在表述此元件索引，
	// 若是則為 `true` 表示啟用中。
	IsActive bool
}

//=======================================================
// 程式碼
//=======================================================

// Code 是原始碼的範例資料建構體，包含了原本和整理後的範例（與可供輸出閱讀的格式）。
type Code struct {
	// Dirty 是原始沒有被整理的程式碼內容，包含了 Tocas 文件專用的一些標籤。
	Dirty string
	// Clean 是整理之後的原生程式碼內容，可以直接被執行。
	Clean string
	// Readable 是可供人類閱讀的程式碼，經過縮排且被整理過並帶有螢光標籤。
	Readable string
	// Highlights 是字串切片，其內容為程式碼中被螢光的地方（不重複）。
	Highlights []string
}
