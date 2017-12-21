---
layout: single
---

# 輸入欄位

.ts.input

## 種類

輸入欄位具有多個不同的種類。

### 輸入欄位

一個普通的基本欄位可以是正常的 `input` 或 `textarea` 甚至是任何 `[contenteditable]` 的元素。

```html
<div class="ts [[input]]">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts [[input]]">
    <textarea placeholder="多行文字欄位"></textarea>
</div>
<br><br>
<div class="ts [[input]]">
    <div contenteditable>在這裡輸入一些文字</div>
</div>
```

### 反色語意

輸入欄位具有多種語意並將其呈現於背景。

```html
<div class="ts [[inverted primary]] input">
    <input type="text" placeholder="反色主要語氣">
</div>
<br><br>
<div class="ts [[inverted info]] input">
    <input type="text" placeholder="反色提示語氣">
</div>
<br><br>
<div class="ts [[inverted warning]] input">
    <input type="text" placeholder="反色警告語氣">
</div>
<br><br>
<div class="ts [[inverted positive]] input">
    <input type="text" placeholder="反色正面語氣">
</div>
<br><br>
<div class="ts [[inverted negative]] input">
    <input type="text" placeholder="反色否定語氣">
</div>
<br><br>
<div class="ts [[inverted]] input">
    <input type="text" placeholder="反色語氣">
</div>
```

### 基本

輸入欄位可以只擁有基本的結構、背景透明。

```html
<div class="ts [[basic]] input">
    <input type="text" placeholder="這個背景是透明的">
</div>
```

### 發音方式

輸入欄位有不同的發音方式。

```html
<div class="ts [[secondary]] input">
    <input type="text" placeholder="次要發音方式">
</div>
<br><br>
<div class="ts [[tertiary]] input">
    <input type="text" placeholder="其次發音方式">
</div>
```

### 底線的

輸入欄位能夠僅有底線。

```html
<div class="ts [[underlined]] input">
    <input type="text" placeholder="僅有底線的輸入欄位">
</div>
```

## 群組

輸入欄位也具有群組。

### 垂直群組

輸入欄位的群組擺放可以是垂直的。

```html
<div class="ts [[vertical]] [[inputs]]">
    <div class="ts input">
        <input type="text" placeholder="帳號">
    </div>
    <div class="ts input">
        <input type="text" placeholder="電子郵件地址">
    </div>
    <div class="ts input">
        <input type="password" placeholder="密碼">
    </div>
</div>
```

## 狀態

輸入欄位具有不同的狀態。

### 聚焦中

輸入欄位可以看起來是正在被聚焦的。

```html
<div class="ts [[focus]] input">
    <input type="text" placeholder="聚焦中的輸入欄位">
</div>
```

### 讀取中

輸入欄位可以顯示正在讀取的圖示。

```html
<div class="ts [[left icon]] [[loading]] input">
    <input type="text" placeholder="在此搜尋人、事、物">
    <i class="search {{icon}}"></i>
</div>
<br><br>
<div class="ts [[icon]] [[loading]] input">
    <input type="text" placeholder="在此搜尋人、事、物">
    <i class="search {{icon}}"></i>
</div>
```

### 已停用

可以讓輸入欄位呈現一個被停用的狀態。

```html
<div class="ts [[disabled]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

### 錯誤

輸入欄位能夠顯示一個發生錯誤的狀態。

```html
<div class="ts [[error]] input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts basic [[error]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

### 警告

輸入欄位能夠處於一個警告或提示的狀態。

```html
<div class="ts [[warning]] input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts basic [[warning]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

### 成功

輸入欄位能夠處於成功的狀態。

```html
<div class="ts [[success]] input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts basic [[success]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

## 外觀

輸入欄位可以有著不同的外觀點綴。

### 圖示

你可以將圖示放入輸入欄位中。

```html
<div class="ts [[icon]] input">
    <input type="text" placeholder="搜尋...">
    <i class="search {{icon}}"></i>
</div>
<br><br>
<div class="ts [[left icon]] input">
    <input type="text" placeholder="搜尋使用者...">
    <i class="users {{icon}}"></i>
</div>
```

### 連結圖示

輸入欄位中的圖示也能是一種連結，或可供按下的。

```html
<div class="ts [[icon]] input">
    <input type="text" placeholder="搜尋...">
    <i class="circular search [[link icon]]"></i>
</div>
<br><br>
<div class="ts [[icon]] input">
    <input type="text" placeholder="搜尋...">
    <i class="inverted circular search [[link icon]]"></i>
</div>
```

### 帶標籤

輸入欄位可以帶有標籤元素。

```html
<div class="ts [[labeled]] input">
    <div class="ts {{label}}">
        http://
    </div>
    <input type="text" placeholder="您的網址">
</div>
<br><br>
<div class="ts [[right labeled]] input">
    <div class="ts {{label}}">
        $
    </div>
    <input type="text" placeholder="價格">
    <div class="ts basic {{label}}">
        .00
    </div>
</div>
```

### 動作

輸入欄位旁可以附帶具有動作性質的元素。

```html
<div class="ts [[action]] input">
    <input type="text" placeholder="在這搜尋人、事、物">
    <button class="ts {{button}}">搜尋</button>
</div>
<br><br>
<div class="ts labeled [[action]] input">
    <div class="ts basic label">@</div>
    <input type="text">
    <button class="ts button">送出</button>
</div>
<br><br>
<div class="ts [[left action]] input">
    <button class="ts primary labeled icon {{button}}">
        <i class="cart icon"></i>
        結帳
    </button>
    <input type="text" value="$52.03">
</div>
<br><br>
<div class="ts [[action]] input">
    <input type="text" placeholder="搜尋網域名稱">
    <select class="ts basic {{dropdown}}">
        <option>.com</option>
        <option>.org</option>
        <option>.xxx</option>
    </select>
</div>
<br><br>
<div class="ts [[action]] input">
    <input type="text" placeholder="書籍名稱">
    <select class="ts basic {{dropdown}}">
        <option>教育</option>
        <option>娛樂休閒</option>
        <option>經濟</option>
    </select>
    <button class="ts {{button}}">搜尋</button>
</div>
```

### 無邊框

輸入欄位可以沒有邊框，有時可以和基本樣式 <span class="ts horizontal label">.basic</span> 一同搭配。

```html
<div class="ts [[borderless]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

### 流動

輸入欄位的寬度可以是流動的。

```html
<div class="ts [[fluid]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

### 圓形的

輸入欄位的圓角可以更圓。

```html
<div class="ts [[circular]] input">
    <input type="text" placeholder="文字欄位">
</div>
```

### 可伸縮的

輸入欄位可供使用者自由縮放。

```html
<div class="ts [[resizable]] input">
    <textarea placeholder="文章內容..."></textarea>
</div>
```

### 尺寸

輸入欄位的的尺寸有所不同。

```html
<div class="ts [[mini]] input">
    <input type="text" placeholder="迷你">
</div>
<br><br>
<div class="ts [[tiny]] input">
    <input type="text" placeholder="微小">
</div>
<br><br>
<div class="ts [[small]] input">
    <input type="text" placeholder="小的">
</div>
<br><br>
<div class="ts [[medium]] input">
    <input type="text" placeholder="適中">
</div>
<br><br>
<div class="ts [[large]] input">
    <input type="text" placeholder="大的">
</div>
<br><br>
<div class="ts [[big]] input">
    <input type="text" placeholder="更大">
</div>
<br><br>
<div class="ts [[huge]] input">
    <input type="text" placeholder="巨大">
</div>
<br><br>
<div class="ts [[massive]] input">
    <input type="text" placeholder="重量級">
</div>
```