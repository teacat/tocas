# 滑桿



## 種類

這裡是滑桿的種類。

### 基本

最基本的滑桿。

```html
<div class="ts [[slider]]">
    <input type="range">
</div>
```

## 狀態

滑桿有不同的狀態。

### 已停用

一個滑桿可以呈現出無法使用、已停用的狀態。

```html
<div class="ts [[disabled]] slider">
    <input type="range">
</div>
```

## 內容

滑桿裡可以擺放不同的內容。

### 標籤

滑桿的側邊可以擺放標籤用以標示與滑桿有關的數值。

```html
<div class="ts slider">
    <div class="ts basic right pointing [[label]]">32</div>
    <input type="range">
    <div class="ts basic left pointing [[label]]">96</div>
</div>
```

## 外觀

滑桿的外觀有所不同。

### 流動

滑桿可以是流動且填滿整個容器的寬度。

```html
<div class="ts [[fluid]] slider">
    <input type="range">
</div>
```