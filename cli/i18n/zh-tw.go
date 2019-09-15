// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。

// Package i18n 是翻譯的字串處理套件。
package i18n

var zhTW = Translation{

	// =======================================================
	//  語系檔案資訊 Translation Information
	//
	//  旗幟的名稱請參考 Tocas UI 中的國旗元件樣式名稱。
	//  版本名稱請依照此文件翻譯的 Tocas UI 版本號碼為主。
	//
	//  Please reference to the Icon component of Tocas UI to name the Flag.
	//  Also make sure the Version is the same as the Tocas UI version which you translated.
	// =======================================================

	Name:        "zh-tw",
	DisplayName: "🇹🇼 正體中文（台灣）",

	//=======================================================
	// 語系協作者 Translation Contributors
	//
	// 當你修改了文件做出任何貢獻（只修了一個錯字也算）之後，
	// 請在這裡追加自己的暱稱與個人網站連結（HTTPS 限定）！
	//
	// Add your name and the personal website (https only) into the following contributors list
	// after you done with the translation (fixed a typo does still count)!
	//=======================================================

	Contributors: []Contributor{
		{
			Name:    "Yami Odymel",
			Website: "https://yami.io/",
		},
	},

	//=======================================================
	// 主要語系內容 Translation
	//
	//=======================================================

	Strings: Strings{
		Message: map[string]string{},
		Question: map[string]string{
			"Menu":                 "君欲何為？",
			"Develop":              "喵哈囉，開發者！",
			"Documentation":        "想要幫助我們翻譯文件嗎？",
			"CompileDocumentation": "你想要編譯哪個語系的文件？",
			"Language":             "欲選擇哪個語系？",
		},
		Option: map[string]string{
			//
			"Menu.Download":     "🔽 下載或選擇版本",
			"Menu.Build":        "🛠️ 自訂並建置與安裝",
			"Menu.Develop":      "🧰 進行開發與編譯",
			"Menu.Contributors": "🧑🏻‍🤝‍🧑🏻 檢視貢獻者",
			"Menu.Language":     "🌏 Change language",
			//
			"Develop.Compile":       "🏗️ 監聽並即時編譯原始碼",
			"Develop.Documentation": "🗎 編譯與更新文件",
			"Develop.FontAwesome":   "☺️ 更新 FontAwesome",
			"Develop.Back":          "🔙 返回",
			//
			"Documentation.Compile": "🏗️ 編譯語系文件",
			"Documentation.Fill":    "🔄 以原生語言補足文件",
			"Documentation.Back":    "🔙 返回",
		},
		Component: map[string]string{
			"Acccordion":   "Accordion（手風琴）",
			"Breadcrumb":   "Breadcrumb（麵包屑）",
			"Button":       "Button（按鈕）",
			"Calendar":     "Calendar（日曆）",
			"Card":         "Card（卡片）",
			"Carousel":     "Carousel（幻燈片）",
			"Checkbox":     "Checkbox（核取方塊）",
			"Color":        "Color（色彩汲取器）",
			"Comment":      "Comment（留言）",
			"Comparison":   "Comparison（圖片比較）",
			"Container":    "Container（容器）",
			"Conversation": "Conversation（會話）",
			"Dimmer":       "Dimmer（淡化幕）",
			"Divider":      "Divider（分隔線）",
			"Dropdown":     "Dropdown（下拉式選單）",
			"Embed":        "Embed（嵌入式物件）",
			"Feed":         "Feed（動態時軸）",
			"Flag":         "Flag（國旗）",
			"Form":         "Form（表單）",
			"Grid":         "Grid（網格系統）",
			"Header":       "Header（標題）",
			"Icon":         "Icon（圖示）",
			"Image":        "Image（圖片）",
			"Input":        "Input（輸入欄位）",
			"Items":        "Items（項目）",
			"Label":        "Label（標籤）",
			"List":         "List（清單）",
			"Loader":       "Loader（讀取指示器）",
			"Menu":         "Menu（選單）",
			"Message":      "Message（訊息）",
			"Modal":        "Modal（對話視窗）",
			"Panes":        "Panes（面板）",
			"Placeholder":  "Placeholder（預置內容）",
			"Popup":        "Popup（彈出式訊息）",
			"Progress":     "Progress（進度指示器）",
			"Quote":        "Quote（引言）",
			"Rating":       "Rating（評分）",
			"Search":       "Search（搜尋）",
			"Segment":      "Segment（片段）",
			"Sidebar":      "Sidebar（側邊欄）",
			"Slate":        "Slate（板岩）",
			"Slider":       "Slider（滑桿）",
			"Snackbar":     "Snackbar（點心條）",
			"Sortable":     "Sortable（可重新排序）",
			"Statistic":    "Statistic（統計數據）",
			"Steps":        "Steps（步驟）",
			"Sticky":       "Sticky（黏性內容）",
			"Tab":          "Tab（分頁籤）",
			"Table":        "Table（表格）",
			"Topic":        "Topic（話題）",
			"Transfer":     "Transfer（穿梭框）",
			"Transition":   "Transition（轉場動畫）",
			"Validation":   "Validation（內容驗證）",
			"Window":       "Window（視窗）",
		},
	},
}
