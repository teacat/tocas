# 分頁籤



## 種類

分頁籤有不同種類。

### 基本

一個最基本的分頁籤組，但在沒有啟用之前頁籤內容會被隱藏。

```html
<div class="ts top attached tabbed menu">
    <a class="item">分頁</a>
</div>
<div class="ts bottom attached tab segment">
    這是分頁內容。
</div>
```

## 狀態

分頁籤有不同的呈現狀態。

### 已啟用

一個已啟用的分頁籤會顯示在頁面上。

```html
<div class="ts top attached tabbed menu">
    <a class="active item">分頁</a>
</div>
<div class="ts [[active]] bottom attached tab segment">
    這是分頁內容。
</div>
```

### 讀取中

一個分頁籤可以呈現正在讀取的狀態。

```html
<div class="ts top attached tabbed menu">
    <a class="active item">分頁</a>
</div>
<div class="ts active [[loading]] bottom attached tab segment">
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
</div>
```