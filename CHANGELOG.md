# 更新日誌

這個檔案會紀錄此專案的主力更新。

格式基於[如何維護更新日誌](http://keepachangelog.com/)，而專案採用[語意化版本號碼](http://semver.org/)（注意的是 2.2.2 之前都沒有按照這個版本）。

## [2.2.2] - 21 Mar 2017
### 極重大更新，多個樣式被修改！

#### 焦點矚目
1. Tocas UI 現在不仰賴 Noto Sans TC CJK 字體了，這樣的好處是：

    1. 加速網頁開啟時間，省去了至少 3 MB 的下載容量。
    2. 支援多國語言，日文、俄文、簡體中文不會有缺字的問題。
    3. 在 macOS 系統上會採用預設字體，比起 Noto Sans 來說要更美觀。

    當然也有壞處。

    1. 這意味著不同使用者、系統、瀏覽器所呈現的字體都不一樣。

2. List 的黑點符號為了確保統一外觀，所以引用了低於 50 KB 的 Lato 字體。
3. Tocas UI 的版本號碼現在沒有 `v` 前輟了。（#205）

#### 新增
1. List 現在會依照階級而有不同的符號黑點。（#215）
2. Ordered List 現在支援透過 `[data-value]` 和 `[value]` 自訂符號了。（#216）
3. 單一個 Statistic 現在可以透過 `centered` 置中了。（#210）

#### Bug 修正
1. 修正 Slate 裡面的 Container 原本會把文字縮到中間的問題。（#220）
2. 修正 Slate 裡面的 `ts.header` 字體大小奇異，被 Slate Header 樣式覆蓋的問題。（#219）
3. 修正 Slate 中 Icon 按鈕的大小。（#218、#208）
4. 修正 `<ol>` 清單的數字會和內文重疊的外距問題。（#217）
5. 修正兩個 List 之間的 Margin。（#198）
6. 修正 List 在空間不足時，黑點會跟內文換行的問題。（#214）

#### 調整
1. List 的 Selection 模式背景不再那麼圓弧了（將圓角改為正常圓角）。
2. List 的黑點現在變得更粗、更符合清單了。（#211）
3. 現在游標的反白顏色從系統預設更改為深灰色。（#200）
6. 多重引言現在不會越來越淡，從原本的透明度改為顏色淡化。（#197）
7. Icon 的外距從 `0.25rem` 改為 `0.35rem`。（@0a5e39d322fc396a6490a860e7faf1ac3710753b）
8. `<strong>` 和 `<optgroup>` 的字體粗度現在改為 `500`。（#205）

#### 文件頁面
1. 所有 Jumbotron 都被 Slate 替代了。
2. 修正 Gallery 範例卡片沒有 Stackable 的問題。（@db8a3dea79c939afe15f83540f290d715a57c89f）

## [v2.2.1] - 19 Feb 2017
### Bug 修正
1. 修正 `.ts.waterfall.card` 不支援 Stackable 的問題。（#196）
2. 修正 `.ts.image.header` 在最底部時會有直角陰影的突兀問題。（#194）

## [v2.2.0] - 14 Jan 2017
### 極重大更新，多個樣式被修改！

距離上個更新好像又是兩個月左右，這次多了 56 個 Commit。然後⋯⋯新年快樂！這次的 Tocas UI 新增了幾個元件，還有多處 Bug 修正，也新增了多個點綴樣式，有些樣式也被更改，所以請詳細閱讀下列清單確認自己正在使用的元件使否也在修改列表其中。

#### 焦點矚目
1. Header 現在的厚度從 `700` 降回 `500`。（#174）
2. Dropdowns 現在的預設樣式是黏再一起的，並為其新增 Separated 樣式。 （#162）
3. 新增 Modal 元件。（@bba66d634f1fa94f1878fdff3bde5a26b2975099）
4. Table 現在支援重新排序了（Sorting）了，耶。（#169）
5. Checkbox 的用法現在可以透過 JavaScript 簡化了。（#170）

#### 新增
1. Basic Dropdown 現在有了 Stackable 模式，可以在手機上層疊而非平行顯示。（#160）
2. Dropdowns 現在可以在中間插入 Divider 來水平分隔下拉式選單了。（#164）
3. Buttons 新增了 Separated 樣式，可以分開按鈕並帶有間距。（#138）
4. Checkboxes 現在有了 Stackable 模式能夠在手機上層疊而非平行顯示。（#159）
5. Header 現在有 Block 樣式可以讓自己像一個區塊那樣顯示了。（@412f430196448c9d685207142dc7c446d578bddd）
6. Header 現在能夠 Attached 在其他元件上、下或中間了。（#144）
7. 你現在能夠在 Slate 裡面放置 Image 當背景圖片了。（#148）
8. Statistic 現在可以在旁邊放入異動數字。（#163）
9. 新增 Reversed Grid 與 Row。（#178）
10. Card 裡面的 Image 現在可以放置 Header。（#132）
11. Images 現在有 Related 樣式可以擺置子圖片。（#86）
12. Checkbox 現在有 Required 樣式可以帶有必填的符號。（@3feea9e2b952d07cf08e55409278b787fc9cebda）

#### Bug 修正
1. Required 的 Checkbox 欄位現在智慧化，如果有欄位中 Label 則星號 Label，如果沒有 Label 則星號所有 Checkbox。（#152）
2. 修正 Definition Table 左側的標頭文字顏色。（#151）
3. 修正 Dropdown Button 會蓋過 Dropdown Menu 的問題。（#157）
4. 修正 Dropdown 原本只能按周遭文字開啟，現在可以按下圖片開啟了。（#167）
5. Action Input 現在可以有更多樣化的搭配。（#153）
6. Menu 中的 List Item 現在不會有奇怪的點擊背景顏色。（#143）
7. Form 裡面的 Textarea 現在可以透過 Resizable Field 來允許使用者重新調整文字框大小。（#146）
8. 修正 Symbol 在 Card 裡面的位移。（#175）
9. 修正 Menu 的 Unread 標記位移。（#165）
10. 修正 Inverted Button 的奇怪顏色。（#156）

#### 調整和新增
1. Dropdown 的右側內距減少了，能夠顯示的內容變多了。（#173）
2. Form Field 現在可以放在 Form 裡的其他容器而不受干擾。（#161）
3. Header 在不指定大小時有預設大小了。（@3120ddd652a5d49c1a92d533d62b6a2d55e43b5c）
4. Card 內容的間距變大了。（#125）
5. Breadcrumb 的顏色稍為調整成沒那麼黑。（#172）

## [v2.1.0] - 28 Nov 2016
### 極重大更新，請注意部分功能被拋棄！
是時候來到了 Tocas UI 2.1 版本，距離 2.0 相差了三個月左右，這其中新增、修改了許多功能與 Bug，然後聖誕快樂！

#### 焦點矚目
這是一個重大版本的更新，其功能亦有重大變更，請仔細查看下方列表。
1. Jumbotron（聚焦看板）現在改名為 Slate（板岩）了，並且有著更多的樣式與外觀。（#141）
2. 新增 Popup（也稱作 Tooltip）元件，這是個純 CSS 而非仰賴 JavaScript 的元件。（#123）

#### 按鈕、連結撰寫注意
本次更新將 `<a>` 與 `<span>` 更改成為了 `display: inline-block`，如果你將按鈕放置於連結內，

並將按鈕設為 `.right.floated` 並不會有效果，這個時候請遵守「**連結就該是連結，按鈕就該是按鈕。**」，

倘若你想用連結把按鈕包住，那麼你可以直接這樣： `<a class="ts right floated button">我是按鈕連結</a>`。

#### 新增
1. Message 現在有了 Secondary 的樣式。（#124）
2. List 的項目現在也有了語氣，並且支援 Inverted。（#128）
3. Card 現在有了 Compact 樣式，可令卡片依內容作為寬度基準。（#122）
4. Checkbox 現在有了 Inverted 樣式。（#113）
5. Image 現在有了 Link 效果，滑鼠移過時圖片會浮起。（#121）

#### Bug 修正
1. Basic Button 的顏色現在都正確而且極具回饋感了。（#117）
2. 修正了 Menu 中的項目會與 List 中項目有所衝突的問題。（#133）
3. 修正了 Menu 項目 Disabled 時，項目中元素並無被停用的問題。
4. 現在 Floated 效果能在 Flexbox 中生效。（#135）

#### 調整和新增
1. 現在可以直接在 Segments 加上 Raised 樣式（#126）
2. 重設（Reset）了更多的基本 HTML5 元素。
3. Segment 的陰影現在可以透過 Insetted 向內嵌。（#140）

## [v2.0.2] - 18 Oct 2016
### 重大改變
1. Body 現在有了 `overflow-x: hidden`。 （#118）

### Bug 修正
1. 修正 Header 原本沒有 `floated` 樣式。

## [v2.0.1] - 7 Oct 2016
### 重大改變
1. 你現在可以將 Dropdown 放入 Menu 了。 （#114）

### Bug 修正
1. 修正幾個 Menu 顏色問題。

### 調整和新增
1. 框線的顏色現在更深了。
2. 陰影現在沒有那麼模糊。
3. Dropdown 的 Divider 現在有了 `.section` 樣式。
4. Dropdown 裡文字右側的圖示現在得到了外距改善。

## [v2.0.0] - 3 Oct 2016
### 重大改變
1. 移除了動畫系統（現在你需要手動使用 [Animate.css](https://github.com/daneden/animate.css/)）。
2. `<figure>` 不再有預設的外距了。

## [v2.0.0-rc.8] - 26 Sep 2016
### 重大修復，請儘早更新至此版本

#### 重大改變
1. 新增動畫系統（尚未完成）。
2. List 現在是 Flexbox 了。
3. Button 新增 `.very.compact`。
4. Label 新增 `.compact`。
5. 當 Label 是 `.empty` 時，會透過 `text-indent` 隱藏文字。
6. `.fluid` Menu 現在沒有圓角了。
7. Checkbox 的標籤現在有預設文字顏色了。

#### Bug 修正
1. 修正 #93 圖片無法水平置中。
2. 修正 `compact` 沒辦法使 `labeled icon` 和 `icon` Button 輕巧。
3. 修正 `stackable` 的 `tabbed` Menu 框線。
4. 修正 Active 的 `tabbed` Menu 項目還能被點擊。
5. 修正 Firefox 的 `inline field` 輸入欄位會偏移。
6. 修正 `.large.screen.only` 的 RWD。
7. 修正 Message 裡面連結的顏色。
8. 修正部分 Menu 有圓角 Hover 問題。

#### 調整和新增
1. 新增反色連結顏色。
2. 移除 Checkbox 群組在 `.field` 內的內距。

## [v2.0.0-rc.7] - 17 Sep 2016
### 重大修復，請儘早更新至此版本

#### 重大改變
1. 新增 `Slider` 滑桿模塊。
2. 新增 `<html data-ts-native>`。
3. 新增 Active 的連結樣式。
4. `waterfall` Cards 現在可以自訂排數了。
5. 新增 Sub Menu。

#### Bug 修正
1. 修正多個 Firefox Bug（如：Dropdown 沒有箭頭、Input 狀態無圖示）。
2. 修正 Segment 的 Loading Loader 偏移。
3. 修正 `stackable` Cards 的頂部間距。
4. 修正 `waterfall` Cards 的卡片間距。

#### 調整和新增
1. 新增 `borderless` 的 Dropdown。
2. 調整 Segment 和 Button 反色時的框線顏色。


## [v2.0.0-rc.6] - 12 Sep 2016
### 重大修復，請儘早更新至此版本

#### 重大改變
1. 拋棄 Grid 的 RWD 樣式，統一採用原生 RWD 輔助樣式。
2. 如果沒有指定 `stackable` 的話，Menu 現在預設是水平捲動。
3. 卡片的重疊樣式現在命名為 `overlapped content` 而不是 `overlay content`。
4. 透過 `stackable` 來讓表格層疊，而不是 `unstackable` 讓表格不層疊。
5. 移除手機上按下 Button 時的藍色高光。
6. 現在 Form 內的 Select Dropdown 不再需要 `.ts.basic.dropdown`。

#### Bug 修正
1. 修正隱藏的 Divider 不會隱藏文字。
2. 修正獨立的 Sub Header 無作用。
3. 修正輸入欄位群組的 Focus 選擇器。
4. 修正上下皆吸附的 Segment 無作用。
5. 聚焦看板 Primary 選擇器錯字。
6. 修正下拉式功能選單的 z-index。
7. 修正 `centered` 的 Grid。
8. 修正 `inverted` 的 List 文字顏色。
9. 修正連結樣式的 Step 顏色。
10. 修正將標籤放置於上的 Statistic 奇怪標籤間距。

#### 調整和新增
1.  新增 Placeholder 給 `[contenteditable]` 的 Div。
2. 新增 `circular` 給 Label。
3. Button 現在是 Relative 位置。
4. 新增 `left floated` 和 `right floated` 給 Segment。
5. Comment 的邊距現在給予 `author` 而不是 `metadata`，這將使得你能夠把作者名和中繼資料放在同行。
6. 減少子 Comment 的間距。
7. Icon 的語氣現在被新增 `!important`。
8. 現在 Form 內的輸入欄位都會是流動寬度。
9. Calendar 現在有背景顏色而不是透明了。
10. Item 現在有帶點式中繼資料。

## [v2.0.0-rc.5] - 29 Aug 2016
### 重大修復，請儘早更新至此版本

#### Bug 修正
1. 統一連結顏色和樣式。
2. 修正 `.vertical` 的輸入欄位邊框。
3. 移除吸附時標籤的邊框。

#### 調整和新增
1.  淡化邊框顏色。
2. 放大 `<h1>` 到 `<h5>` 之間的字體大小
3. 卡片現在支援連結樣式了。
4. 標籤支援 `.floated` 了。
5. 新增 `.horizontal` 標籤。
6. 可以自訂圖示標題中的圖示大小了！
7. 清單現在有著跟頁面文字一樣的顏色。
8. `.extra.content` 現在可以被擺在卡片的上面、中間。

## [v2.0.0-rc.4] - 25 Aug 2016
### 重大修復，請儘早更新至此版本
1. 修正按鈕沒有 Active（按下）效果。
2. 修正卡片中的 opinion 按鈕有背景顏色。
3. 移除卡片中吸附按鈕的框線。
4. 修正下拉式選單按鈕的 Hover 停滯問題。

## [v2.0.0-rc.3] - 24 Aug 2016
### 新功能和拋棄

Tocas 2 拋棄了 SASS 方面的函式支援，現在幾乎都用原生寫法，意思是你將沒有辦法引用 `tocas.sass` 然後使用以往的輔助函式，如：`+block`、`+inline-block`、`+table`...等。

#### 拋棄列表
1. 顏色渲染函式

   _你現在不能「重新編譯」來新增元件顏色了，原有顏色不變（`primary`、`info` ...）。_
2. 輔助函式

   _你現在不能夠透過引用 `tocas.sass` 來使用以往的輔助函式。_
3. 移除了多餘的過場動畫

   _現在的按鈕和輸入欄位都更加地直覺。_

當然，也有好消息要宣布。

#### 新功能列表
1. 所有樣式現在都保存在變數中。

   _意思是你可以簡單地改變變數中的顏色數值或其他樣式，然後重新編譯，個人化你的 Tocas。_  
2. 更少使用 `&` 作為 Selector。

   _現在 Selectors 更簡潔了，不需要死腦筋的去思考這個樣式的 Selector 是哪個。_
3. 沒有多餘的迴圈。

   _現在不常使用迴圈了，所以和上一個特色一樣，不需要推敲原本的 Selector 為何。_
4. Tocas.js 確定加入。

   _更棒的是，你完全不需要 jQuery，Tocas.js 是完全獨立的。_

### 完全重寫和問題修正

Tocas 2 是**完全重寫**，並且包含了部分 Semantic UI 的原始碼（_Less 轉 Sass_），
所以在元件的變化上也**更加的穩定**一些，**不會遇到**有不對齊的部分。

在 Tocas 1 的單位不標準的問題也**已經修正**，現在採用 `px`、`em`、`rem`，但是時機和配合上都**沒有問題**。

### 支援圖示系統！

和 Sematic UI 一樣，引進了 **Font Awesome** 作為圖示系統，現在你可以盡情地採用 `<i class="icon">` 來使用**圖示**並和 Tocas UI 的樣式一同搭配了！例如_圓角_、_旋轉_，等。

**要用的時候請記得將 `font` 和 `tocas.css` 放在同個目錄中。**

## v1.0.0 - 27 Apr 2016