package actions

import "github.com/AlecAivazis/survey"

func CustomizeMain() {
	answer := ""
	prompt := &survey.Select{
		Message: "想要自訂哪部分呢？",
		Options: []string{
			"元件",
			"JavaScript 模塊",
			"顏色與文字大小",
			"輸出設置",
			"完成並產生",
			"返回",
		},
	}
	survey.AskOne(prompt, &answer, nil)

	switch answer {
	case "返回":
		Initialize()
	}
}

func CustomizeElementIntro() {
	color := ""
	prompt := &survey.Select{
		Message: "你會用到所有元件嗎？",
		Options: []string{"是的", "讓我自己選擇"},
	}
	survey.AskOne(prompt, &color, nil)
}

func CustomizeElement() {
	days := []string{}
	prompt2 := &survey.MultiSelect{
		Message: "請選擇所需的一般元件：",
		Options: []string{
			"按鈕（Button）",
			"容器（Container）",
			"分隔線（Divider）",
			"國旗（Flag）",
			"標題（Header）",
			"圖示（Icon）",
			"圖片（Image）",
			"輸入欄位（Input）",
			"標籤（Label）",
			"清單（List）",
			"讀取指示器（Loader）",
			"片段（Segment）",
			"板岩（Slate）",
			"步驟（Step）",
			"預置區塊（Placeholder）",
			"引言（Quote）",
		},
	}
	survey.AskOne(prompt2, &days, nil)
}

func CustomizeCollection() {
	days := []string{}
	prompt2 := &survey.MultiSelect{
		Message: "請選擇所需的聚合型元件：",
		Options: []string{
			"麵包屑（Breadcrumb）",
			"表單（Form）",
			"網格系統（Grid）",
			"選單（Menu）",
			"訊息（Message）",
			"表格（Table）",
		},
	}
	survey.AskOne(prompt2, &days, nil)
}

func CustomizeModule() {
	days := []string{}
	prompt2 := &survey.MultiSelect{
		Message: "請選擇所需的模塊元件：",
		Options: []string{
			"手風琴（Accordion）",
			"日曆（Calendar）",
			"幻燈片（Carousel）",
			"核取方塊（Checkbox）",
			"圖片比較（Comparison）",
			"複合功能選單（Contextmenu）",
			"淡化幕（Dimmer）",
			"下拉式選單（Dropdown）",
			"嵌入物件（Embed）",
			"對話視窗（Modal）",
			"彈出式訊息（Popup）",
			"進度列（Progress）",
			"評分（Rating）",
			"搜尋（Search）",
			"側邊欄（Sidebar）",
			"滑桿（Slider）",
			"點心條（Snackbar）",
			"分頁籤（Tab）",
			"穿梭框（Transfer）",
			"轉場效果（Transition）",
		},
	}
	survey.AskOne(prompt2, &days, nil)
}

func CustomizeView() {
	days := []string{}
	prompt2 := &survey.MultiSelect{
		Message: "請選擇所需的視圖型元件：",
		Options: []string{
			"卡片（Card）",
			"留言（Comments）",
			"動態消息（Feed）",
			"項目（Items）",
			"對話氣泡（Speeches）",
			"統計數據（Statistic）",
		},
	}
	survey.AskOne(prompt2, &days, nil)
}

func CustomizeJavaScriptIntro() {
	color := ""
	prompt := &survey.Select{
		Message: "你會用到所有的 JavaScript 模塊嗎？",
		Options: []string{"是的", "依我選擇的元件決定", "讓我自己選擇"},
	}
	survey.AskOne(prompt, &color, nil)
}

func CustomizeJavaScript() {
	days := []string{}
	prompt2 := &survey.MultiSelect{
		Message: "請選擇所需的 JavaScript 模塊：",
		Options: []string{
			"手風琴（Accordion）",
			"日曆（Calendar）",
			"幻燈片（Carousel）",
			"核取方塊（Checkbox）",
			"圖片比較（Comparison）",
			"複合式選單（Contextmenu）",
			"淡化幕（Dimmer）",
			"下拉式選單（Dropdown）",
			"嵌入式物件（Embed）",
			"表單（Form）",
			"輸入欄位（Input）",
			"訊息（Message）",
			"對話視窗（Modal）",
			"彈出式訊息（Popup）",
			"評分（Rating）",
			"捲動監聽（Scrollspy）",
			"搜尋（Search）",
			"側邊欄（Sidebar）",
			"滑桿（Slider）",
			"點心條（Snackbar）",
			"表格（Table）",
			"穿梭框（Transfer）",
			"轉場效果（Transition）",
		},
	}
	survey.AskOne(prompt2, &days, nil)
}
