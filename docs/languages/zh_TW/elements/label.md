# 標籤

<p>標籤會在沒有內容的時候自動隱藏，這也很適合用來當作狀態指標，但對於色盲使用者而言，標籤不應以顏色來引導他人，而是應該以形狀來敘述狀態，例如：在線（圓形）、暫離（正方形）、離線（三角形）。</p>

## 種類

標籤具有不同的種類。

### 基本

一個最基本的標籤。

```html
<div class="ts [[label]]">
    <i class="gift {{icon}}"></i>
    標籤
</div>
```

### 圖片

一個帶有圖片的標籤。

```html
<div class="ts [[image]] label">
    <img src="!-user-!">Yami Odymel
</div>
<div class="ts [[image]] label">
    <img src="!-user2-!">Xiaoan
</div>
<div class="ts [[image]] label">
    <img src="!-user3-!">卡莉絲
    <div class="detail">實況主</div>
</div>
```

### 指向

標籤可以有看起來像是指向某個元素。

```html
<div class="ts [[left pointing]] label">
    左邊
</div>
<div class="ts [[right pointing]] label">
    右邊
</div>
<div class="ts [[pointing top]] label">
    上面
</div>
<div class="ts [[pointing below]] label">
    下面
</div>
<div class="ts basic [[left pointing]] label">
    左邊
</div>
<div class="ts basic [[right pointing]] label">
    右邊
</div>
<div class="ts basic [[pointing top]] label">
    上面
</div>
<div class="ts basic [[pointing below]] label">
    下面
</div>
```

### 語氣

標籤也可以擁有不同的語氣。

```html
<div class="ts circular [[primary]] label">9</div>
<div class="ts circular [[info]] label">14</div>
<div class="ts [[warning]] label">7</div>
<div class="ts [[positive]] label">13</div>
<div class="ts [[inverted]] label">1998</div>
```

### 吸附

吸附在某個容器的角落或是內容中。

```html
<div class="ts segment">
    <p>&nbsp;</p>
    <p>伊繁星最高協議，所有隸屬伊繁星旗下已發佈或是正於計劃中之產品皆須遵守此協議。</p>
    <p>&nbsp;</p>
    <div class="ts [[top right attached]] label">右上標籤</div>
    <div class="ts [[top left attached]] label">左上標籤</div>
    <div class="ts [[bottom right attached]] label">右下標籤</div>
    <div class="ts [[bottom left attached]] label">左下標籤</div>
</div>
```

### 水平

標籤可以是水平用來符合附近文字用的。

```html
<div class="ts [[horizontal]] label">這個標籤</div> 很適合和文字放在一起。
```

## 外觀

標籤具有不同的外觀。

### 浮起附著

標籤可以浮起並附著在某個元素的角落。

```html
<button class="ts primary {{button}}">已讀所有
    <div class="ts [[floating]] circular label">7</div>
</button>
<button class="ts warning {{button}}">檢視
    <div class="ts [[floating]] label">13</div>
</button>
```

## 內容

標籤的內容具有不同的性質。

### 詳細資料

用以詮釋標籤的內容。

```html
<div class="ts label">新郵件
    <div class="[[detail]]">689</div>
</div>
```

### 圖示

在標籤內放置一些點綴或是具有功能的圖示。

```html
<div class="ts [[left icon]] label">
    <i class="mail outline {{icon}}"></i>
    未讀郵件
    <div class="detail">142</div>
</div>
<div class="ts [[right icon]] label">
    吳雨藍
    <i class="user {{icon}}"></i>
</div>
```

### 關閉按鈕

你可以在標籤內擺置一個關閉按鈕，使這個標籤看起來可供關閉或移除。

```html
<div class="ts image label">
    <img src="!-user-!">
    Yami Odymel
    <button class="[[ts small close button]]"></button>
</div>
```

## 外觀

標籤具有不同的外觀。

### 基本結構

標籤可以只留下基本的結構。

```html
<div class="ts [[basic]] label">預設</div>
<div class="ts [[basic]] positive label">正面</div>
<div class="ts [[basic]] negative label">負面</div>
<div class="ts [[basic]] info label">資訊</div>
<div class="ts [[basic]] primary label">主要</div>
<div class="ts [[basic]] warning label">警告</div>
```

### 尺寸

標籤可以有不同的大小尺寸。

```html
<div class="ts [[mini]] label">迷你</div>
<div class="ts [[tiny]] label">微小</div>
<div class="ts [[small]] label">小型</div>
<div class="ts label">預設</div>
<div class="ts [[medium]] label">適中</div>
<div class="ts [[large]] label">大型</div>
<div class="ts [[big]] label">巨大</div>
<div class="ts [[huge]] label">超大</div>
<div class="ts [[massive]] label">重量級</div>
```

### 浮動

標籤可以靠左或靠右浮動。

```html
<div class="ts [[left floated]] label">靠左浮動</div>
<div class="ts [[right floated]] label">靠右浮動</div>
```

### 縮減

標籤內距可以縮減。

```html
<div class="ts [[compact]] label">1,624</div>
<div class="ts [[compact]] primary label">315</div>
```

### 圓形

將標籤變成圓形。

```html
<div class="ts [[circular]] label">1</div>
<div class="ts [[circular]] label">99+</div>
<div class="ts [[circular]] label">1234567</div>
```

### 空的

一個空的標籤。

```html
<div class="ts [[empty]] circular label"></div>
<div class="ts [[empty]] triangle label"></div>
<div class="ts [[empty]] square label"></div>
<div class="ts [[empty]] circular primary label"></div>
<div class="ts [[empty]] circular info label"></div>
<div class="ts [[empty]] square positive label"></div>
<div class="ts [[empty]] square negative label"></div>
<div class="ts [[empty]] triangle info label"></div>
<div class="ts [[empty]] triangle warning label"></div>
```