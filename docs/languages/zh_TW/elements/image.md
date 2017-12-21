---
layout: single
---

# 圖片

.ts.image

## 說明

圖片在不指定大小的情況下，預設最大至少可以填滿整個容器。

## 種類

圖片具有不同的種類。

### 基本

一個最基本的圖片。

```html
<img class="ts small [[image]]" src="!-4:3-!">
```

### 連結

圖片也可以是被連結包覆住的。

```html
<[[a]] href="http://google.com" class="ts small image">
    <img src="!-4:3-!">
</[[a]]>
```

### 連結性圖片

圖片除了能夠被連結包覆住，亦能夠讓沒被連結包覆著的圖片看起來像連結一樣，這很適合用在非連結但可供點擊的圖片。

```html
<a href="http://google.com" class="ts [[link]] small image">
    <img src="!-4:3-!">
</a>
<img class="ts [[link]] small image" src="!-4:3-!">
```

## 狀態

圖片具有不同的狀態。

### 隱藏

隱藏一個圖片。

```html
<img class="ts [[hidden]] image" src="!-4:3-!">
```

### 已停用

顯示一個圖片已經過時、不可用。

```html
<img class="ts [[disabled]] small image" src="!-4:3-!">
```

### 已選擇

一個已被選取的圖片。

```html
<img class="ts [[selected]] small image" src="!-4:3-!">
```

## 外觀

圖片具有不同的外觀。

### 頭像

頭像的大小會自動調整成比文字稍微大一些。

```html
<img class="ts [[avatar]] image" src="!-user-!">
<span>Yami Odymel</span>
```

### 框線

新增一個預設顏色的框線。

```html
<img class="ts small [[bordered]] image" src="!-1:1-!">
```

### 流動

會填滿整個容器的圖片。

```html
<img class="ts [[fluid]] image" src="!-4:3-!">
```

### 圓角

會加一些少許的圓角在圖片角落。

```html
<img class="ts small [[rounded]] image" src="!-4:3-!">
```

### 圓形

將圖片變成圓形。

```html
<img class="ts small [[circular]] image" src="!-1:1-!">
```

### 垂直對齊

將圖片對齊上、下或中間。

```html
<img class="ts mini [[top aligned]] image" src="!-1:1-!"> 垂直置頂
<div class="ts divider"></div>
<img class="ts mini [[middle aligned]] image" src="!-1:1-!"> 垂直置中
<div class="ts divider"></div>
<img class="ts mini [[bottom aligned]] image" src="!-1:1-!"> 垂直置障
```

### 水平置中

將圖片水平置中。

```html
<img class="ts small [[centered]] image" src="!-1:1-!">
```

### 圖內圖示

圖片裡面可以擺放圖示，這會令圖示浮動在圖片的右下角落。

```html
<div class="ts small image">
    <img src="!-1:1-!">
    <i class="large check [[icon]]"></i>
</div>
```

### 帶空白

新增一些空白在圖片的左右旁。

```html
亞凡芽 <img class="ts mini [[spaced]] image" src="!-1:1-!"> 是一個基於 PHP 的模板引擎， 很適合用在具有 MVC 架構的大型應用程式中，其中亞凡芽還支援了動態 CSS 名稱，你可以隨機命名類別名稱，或者是將類別名稱轉換成 Emoji（表情符號），也可以將 JavaScript 檔案匯集成一個檔案。 Tocas 是一個基於 CSS3 的
<img class="ts mini [[spaced]] image" src="!-1:1-!"> 網頁介面框架， 以行動裝置為主，同時也支援自訂顏色，還有更具有語意的類別名稱。
```

### 左右浮動

讓圖片浮動置左或置右。

```html
<img class="ts tiny [[left floated]] image" src="!-1:1-!">
<p>
    保障任何人的著作權，其中包括二次創作，二次創作僅可在原作者未聲明否決下進行發佈和創作， 在未經原作允許下衍生任何具有原作之內容，基於衍生理念與內容為判決要點，
    原作必須基於合理使用之理念提出移除、上訴任何非符合合理使用概念的衍生內容， 合理使用的理念如下： 使用目的及性質 其著重點在於內容是否有所轉化，如衍生創作另有新意，非僅複製原作內容。版權作品性質 <img class="ts tiny [[right floated]] image" src="!-1:1-!"> 以真實、事實所闡述之作品較虛構作品來的能夠符合合理使用。使用版權作品的多寡 引用少量的原創著作比起引用大量來要的符合合理使用，但倘若原創著作成為衍生著作之核心內容，即使少量的原創著作被引用，也較不可能符合合理使用之原則。使用行為對於版權作品的市場或價值之影響 透過原創著作的內容而進行獲利並造成原創著作部分損害，較不符合合理使用之原則。
</p>
```

### 尺寸

更改圖片的大小，大小從 `mini` 到 `massive`。

```html
<img class="ts [[mini]] image" src="!-1:1-!">
<img class="ts [[tiny]] image" src="!-1:1-!">
<img class="ts [[small]] image" src="!-1:1-!">
<img class="ts [[medium]] image" src="!-1:1-!">
```

## 群組

圖片可以是一個群組。

### 尺寸

群組內的圖片大小將會符合群組所設定的尺寸。

```html
<div class="ts [[tiny]] images">
    <img src="!-1:1-!">
    <img src="!-1:1-!">
    <img src="!-1:1-!">
</div>
```

### 有關聯的

群組內的圖片可以看起來有關聯。

```html
<div class="ts small [[related]] images">
    <img src="!-1:1-!">
    <img src="!-1:1-!">
</div>
<br>
<div class="ts tiny circular [[related]] images">
    <img src="!-1:1-!">
    <img src="!-1:1-!">
</div>
```