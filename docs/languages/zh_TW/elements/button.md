---
layout: single
---

# 按鈕

.ts.button

## 說明

按鈕具有多種樣式和語意，請注意的是，語意和顏色不同，請不要為了要新增紅色按鈕，就建立一個「負面」按鈕。請務必遵循 CSS 樣式中的含意。

## 種類

一個按鈕具有多個不同的種類。

### 按鈕

一個正常的按鈕。

```html
<button class="ts [[button]]">按鈕</button>
```

### 基本語氣

用來讓一個按鈕擁有不同的意思，但卻不帶有肯定或否定語氣。

```html
<button class="ts [[primary]] button">主要</button>
<button class="ts [[warning]] button">警告</button>
<button class="ts [[info]] button">資訊</button>
<button class="ts [[inverted]] button">相反色</button>
```

### 肯定和否定

讓按鈕帶有肯定或否定的意思。

```html
<button class="ts [[positive]] button">肯定</button>
<button class="ts [[negative]] button">否定</button>
```

### 次等的

一個次等的按鈕的背景預設是白色的，令其較不顯眼。

```html
<button class="ts [[secondary]] button">次等</button>
```

### 偏見

讓按鈕以背景顏色作為基礎，並以此產生深、暗差異的偏見。

```html
<div class="ts inverted info {{segment}}">
    <button class="ts [[opinion]] button">偏見</button>
    <button class="ts [[secondary opinion]] button">次要偏見</button>
</div>
<div class="ts inverted warning {{segment}}">
    <button class="ts [[opinion]] button">偏見</button>
    <button class="ts [[secondary opinion]] button">次要偏見</button>
</div>
```

### 圖案

只顯示圖案的按鈕。

```html
<button class="ts [[icon]] button">
    <i class="heart {{icon}}"></i>
</button>
```

### 連結

按鈕可以看起來像純文字連結。

```html
這是個<button class="ts [[link]] button">連結按鈕</button>喔！
```

### 關閉

按鈕可以呈現一個用於關閉其他元件的樣式。

```html
<button class="ts mini [[close]] button"></button>
<button class="ts tiny [[close]] button"></button>
<button class="ts small [[close]] button"></button>
<button class="ts [[close]] button"></button>
<button class="ts large [[close]] button"></button>
<button class="ts big [[close]] button"></button>
<button class="ts huge [[close]] button"></button>
<button class="ts massive [[close]] button"></button>
```

### 基本

讓按鈕只帶有基本的架構。

```html
<button class="ts positive [[basic]] button">確定</button>
<button class="ts negative [[basic]] button">拒絕</button>
<button class="ts [[basic]] button">知道</button>
<button class="ts secondary [[basic]] button">取消</button>
```

### 標籤

帶有標籤的按鈕。

```html
<div class="ts [[left labeled]] button">
    <div class="ts basic {{label}}">689</div>
    <button class="ts button">加入募集</button>
</div>
<div class="ts [[labeled]] button">
    <button class="ts button">加入募集</button>
    <div class="ts basic {{label}}">689</div>
</div>
```

### 標籤圖示

帶有標籤和圖示的按鈕。

```html
<button class="ts [[labeled icon]] button">
    <i class="star {{icon}}"></i>
    星號
</button>
<button class="ts [[right labeled icon]] button">
    加入最愛
    <i class="heart {{icon}}"></i>
</button>
```

## 群組

將多個按鈕組成一列，或是擁有同樣性質。

### 按鈕群組

按鈕可以組合成一個群組。

```html
<div class="ts [[buttons]]">
    <button class="ts warning button">橙希</button>
    <button class="ts primary button">雨藍</button>
    <button class="ts inverted button">卡莉絲</button>
</div>
<br>
<br>
<div class="ts icon [[buttons]]">
    <button class="ts button"><i class="align left {{icon}}"></i></button>
    <button class="ts button"><i class="align center {{icon}}"></i></button>
    <button class="ts button active"><i class="align right {{icon}}"></i></button>
    <button class="ts button"><i class="align justify {{icon}}"></i></button>
</div>
```

### 垂直群組

群組也可以是垂直擺放的。

```html
<div class="ts fluid [[vertical]] [[buttons]]">
    <button class="ts warning button">橙希</button>
    <button class="ts primary button">雨藍</button>
    <button class="ts inverted button">卡莉絲</button>
</div>
```

### 分開的

按鈕群組也可以分開、有間距。

```html
<div class="ts [[separated]] [[buttons]]">
    <button class="ts warning button">橙希</button>
    <button class="ts primary button">雨藍</button>
    <button class="ts inverted button">卡莉絲</button>
</div>
```

### 較寬鬆的

按鈕群組之間的間距可以更大、看起來更寬鬆。

```html
<div class="ts [[relaxed]] separated buttons">
    <button class="ts warning button">橙希</button>
    <button class="ts primary button">雨藍</button>
    <button class="ts inverted button">卡莉絲</button>
</div>
```

### 自動層疊

按鈕群組可以在手機版上自動層疊，而不是保持水平排列。欲觀看此效果你需要使用手機來查看此範例。

```html
<div class="ts fluid [[stackable]] buttons">
    <button class="ts info button">希豹</button>
    <button class="ts negative button">祈浪</button>
    <button class="ts inverted button">余望</button>
</div>
```

### 垂直附著

按鈕群組可以垂直附著在某個元素的上下端。

```html
<div class="ts fluid [[top attached]] buttons">
    <div class="ts primary button">按鈕一</div>
    <div class="ts positive button">按鈕二</div>
</div>
<div class="ts attached {{segment}}">
    <p>貓耳就是量子力學</p>
    <p>△×￥○＠％＆＄＃☆□！</p>
    <p>「冷靜一點、把咖啡歐蕾喝下去」</p>
</div>
<div class="ts fluid [[bottom attached]] buttons">
    <div class="ts inverted button">按鈕三</div>
    <div class="ts negative button">按鈕四</div>
</div>
```

## 內容

按鈕內部可以有不同的內容。

### 條件

你能夠在按鈕群組的間隙中間安插像是條件式的文字讓使用者擇其一。

```html
<div class="ts buttons">
    <button class="ts button">取消</button>
    <div class="[[or]]"></div>
    <button class="ts positive button">儲存</button>
    <div class="[[or]]"></div>
    <button class="ts primary button">送出</button>
</div>
```

#### 自訂條件文字

你也能夠透過 <span class="ts horizontal label">[data-text]</span> 來變動條件文字，但注意文字字數不可超過圓圈大小。

```html
<div class="ts buttons">
    <button class="ts button">Cancel</button>
    <div class="or" [[data-text]]="Or"></div>
    <button class="ts positive button">Save</button>
</div>
```

## 狀態

你可以隨時透過樣式類別切換一個按鈕的狀態。

### 已啟用

用以顯示這個按鈕已經被啟用、觸發。

```html
<button class="ts [[active]] button">按鈕</button>
```

### 已停用

用以顯示這個按鈕已經被禁止按下。

```html
<button class="ts [[disabled]] button">按鈕</button>
```

### 讀取中

按鈕也可以變成讀取狀態。

```html
<button class="ts [[loading]] button">按鈕</button>
```

### 脈動中

按鈕能夠看起來正在脈動，令人注意。

```html
<button class="ts [[pulsing]] button">按鈕</button>
```

## 外觀

你可以更改按鈕的位置、大小、或者形狀。

### 尺寸

按鈕可以有不同的大小尺寸。

```html
<button class="ts [[mini]] button">迷你</button>
<button class="ts [[tiny]] button">微小</button>
<button class="ts [[small]] button">小型</button>
<button class="ts [[button]]">預設</button>
<button class="ts [[medium]] button">適中</button>
<button class="ts [[large]] button">大型</button>
<button class="ts [[big]] button">巨大</button>
<button class="ts [[huge]] button">超大</button>
<button class="ts [[massive]] button">重量級</button>
```

### 浮動

按鈕可以向左或向右浮動對齊。

```html
<button class="ts [[left floated]] button">向左浮動</button>
<button class="ts [[right floated]] button">向右浮動</button>
```

### 角落

按鈕可以浮動在某個元素的角落中。

```html
<div class="ts tiny image">
    <img src="!-1:1-!">
    <button class="ts [[top right corner]] close button"></button>
</div>
```

### 垂直附著

按鈕可以單獨垂直附著在某個元素的上下端。

```html
<button class="ts fluid [[top attached]] button">附著於上</button>
<div class="ts flatted attached {{segment}}">
    <p>TeaMeow 是一個社群網站，就像是你正在使用的 Facebook 或是 Twitter，</p>
    <p>不過我們強調的是「自由」和「日常」，我們不會整天刪你文章。</p>
</div>
<button class="ts fluid [[bottom attached]] button">附著於下</button>
```

### 輕巧版

縮小按鈕的內距。

```html
<button class="ts mini [[very compact]] button">非常輕巧</button>
<button class="ts mini [[compact]] button">迷你輕巧</button>
<button class="ts [[compact]] button">輕巧按鈕</button>
```

### 圓形

按鈕可以是圓形的。

```html
<button class="ts [[circular]] large icon button">
    <i class="gift {{icon}}"></i>
</button>
<button class="ts [[circular]] positive button">知道了！</button>
```