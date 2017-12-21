---
layout: single
---

# 進度列

.ts.progress

## 種類

進度列具有多個不同的種類。

### 基本

一個最基本的進度列架構。

```html
<div class="ts [[progress]]">
    <div class="bar" style="width: 30%"></div>
</div>
```

### 語意

進度列有著不同的語意。

```html
<div class="ts [[primary]] progress">
    <div class="bar" style="width: 30%"></div>
</div>
<div class="ts [[info]] progress">
    <div class="bar" style="width: 45%"></div>
</div>
<div class="ts [[warning]] progress">
    <div class="bar" style="width: 65%"></div>
</div>
<div class="ts [[inverted]] progress">
    <div class="bar" style="width: 30%"></div>
</div>
```

### 肯定和否定

進度列也可以帶有肯定或否定的語氣。

```html
<div class="ts [[positive]] progress">
    <div class="bar" style="width: 60%"></div>
</div>
<div class="ts [[negative]] progress">
    <div class="bar" style="width: 35%"></div>
</div>
```

## 內容

進度列的內容有一些不一樣的元素。

### 進度列

一個顯示進度最基本的「列」。

```html
<div class="ts progress">
    <div class="[[bar]]"></div>
</div>
```

### 文字

可以在進度列上顯示文字的元素，例如擺放進度百分比。

```html
<div class="ts progress">
    <div class="bar" style="width: 32%">
        <span class="[[text]]">32%</span>
    </div>
</div>
```

## 狀態

進度列的有不同的狀態。

### 活動中

顯示一個進度列正在進行中。

```html
<div class="ts [[active]] progress">
    <div class="bar" style="width: 60%"></div>
</div>
```

### 準備中

顯示一個可能位於準備中的進度列。

```html
<div class="ts [[preparing]] progress">
    <div class="bar"></div>
</div>
```

### 未知

顯示一個尚未取得狀態的進度列。

```html
<div class="ts [[indeterminate]] progress">
    <div class="bar"></div>
</div>
```

### 已詢問未知

一個已經向伺服器發送請求，但狀態仍處於未知的進度列。

```html
<div class="ts [[queried indeterminate]] progress">
    <div class="bar"></div>
</div>
```

### 緩衝中

一個正在緩衝，並帶有緩衝條的進度列。

```html
<div class="ts [[buffering]] progress">
    <div class="bar" style="width: 30%"></div>
    <div class="[[buffer]] bar" style="width: 50%"></div>
</div>
```

## 群組

進度列可以是一個群組。

### 進度列堆疊

進度列可以由多個列來進行堆疊排列。

```html
<div class="ts progress">
    <div class="[[bar]]" style="width: 20%; background: lightskyblue">
        <label class="text">檔案</label>
    </div>
    <div class="[[bar]]" style="width: 50%; background: orange">
        <label class="text">音樂</label>
    </div>
    <div class="[[bar]]" style="width: 30%; background: green">
        <label class="text">圖片</label>
    </div>
</div>
```

## 外觀

進度列有多種外觀型態。

### 流動

進度列可以是流動寬度並適合用來貼齊容器的左右邊，因為沒有圓角。

```html
<div class="ts [[fluid]] progress">
    <div class="bar" style="width: 60%"></div>
</div>
```

### 吸附

進度列可以吸附在某些元件內。

```html
<div class="ts {{card}}">
    <div class="ts positive [[top attached]] progress">
        <div class="bar" style="width: 25%"></div>
    </div>
    <div class="content">
        這個卡片的上下方都各有一個獨立的吸附式進度條。
    </div>
    <div class="ts [[bottom attached]] progress">
        <div class="bar" style="width: 70%"></div>
    </div>
</div>
<br><br>
<div class="ts top attached {{segment}}">
    將進度列擺放於片段中間。
</div>
<div class="ts [[attached]] progress">
    <div class="bar" style="width: 35%"></div>
</div>
<div class="ts bottom attached {{segment}}">
    就像你看到的ㄧ樣，這個範例示範著你可以將進度列安插在多個片段之中。
</div>
```

### 尺寸

進度列提供多種尺寸。

```html
<div class="ts [[tiny]] progress">
    <div class="bar" style="width: 40%"></div>
</div>
<div class="ts [[small]] progress">
    <div class="bar" style="width: 50%"></div>
</div>
<div class="ts [[medium]] progress">
    <div class="bar" style="width: 60%"><span class="text">60%</span></div>
</div>
<div class="ts [[large]] progress">
    <div class="bar" style="width: 70%"><span class="text">70%</span></div>
</div>
<div class="ts [[big]] progress">
    <div class="bar" style="width: 80%"><span class="text">80%</span></div>
</div>
```