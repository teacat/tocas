---
layout: single
---

# 關於

一些和 Tocas UI 相關的開發歷程，還有其中瑣碎的事物。

## 歷史

Tocas UI 是因為 TeaMeow 的需求所出現的產物，起初還是像 Bootstrap 那樣的命名方式而且元件都帶有沉重的陰影，撰寫的方式也是用傳統的 CSS 而不是 SASS，後期發現了 Semantic UI 之後也就開始將 Tocas UI 帶上正軌，這個時候出現了 Tocas UI 1，所有的原始碼都是自己手動撰寫的，這也造就了後來的問題。

Tocas UI 1 正式地在 TeaMeow 開發過程中使用，但逐漸發現單位不準確（Tocas UI 1 將 `px`、`em`、`rem` 混搭著用），所以讓多個元件看起來不穩定，因此也只好暫時擱置 TeaMeow 轉而重新建立 Tocas UI 2。

而在 Tocas UI 2 開始效仿 Semantic UI 的原始碼分配方式，並且有部分的程式碼是從 Semantic UI 的 LESS 直接轉為 SASS，然後做了合併動作，這讓 Tocas UI 2 解決了先前第一代所擁有的問題（如單位問題，元件配合問題）。

## 為什麼不直接用 Semantic UI？

Semantic UI 的命名精神真的很讚，不過部分元件並沒有像 Tocas UI 一樣有那麼多的點綴樣式（雖然他們的元件比較多），而且 Semantic UI 的文件中文並不友善，曾經嘗試著去翻譯但他們有太多無法翻譯的詞彙（被寫死的，不能編輯），這一點也會增加對其他人上手的難度，

而且在預設情況下 Semantic UI 用了太多的全黑和全白，讓對比太過於明顯，Tocas UI 則是希望能夠像 Flat UI 一樣地明亮卻又不會太過於輕浮。

## 月月，搭拉安

搭啦！