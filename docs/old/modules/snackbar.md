---
layout: single
tabs  :
    - styles
    - module
---

# 點心條

.ts.snackbar

## 說明

點心條和訊息不一樣的地方在於點心條是浮動在頁面角落、且較單調的。同時當多個通知發生時，點心條只會顯示最後一個通知且無法重疊。

倘若出現多個通知是你期望的目標，試著使用清單元件，且謹記避免過度遮蔽螢幕畫面。

## 種類

點心條有不同種類。

### 基本

一個最基本的點心條會出現在螢幕左下角中。

```html
<div class="ts active [[snackbar]]">
    <div class="content">
        你已成功地還原檔案了。
    </div>
    <a class="primary action">重新送出</a>
</div>
```

## 狀態

點心條有不同的呈現狀態。

### 已啟用

點心條預設並不會顯示，直到將其設置為已啟用。

```html
<div class="ts [[active]] snackbar">
    <div class="content">
        早安！我的朋友！這段話是在我凌晨五點沒睡覺時打的。
    </div>
</div>
```

## 內容

你能在點心條中放置不同的內容。

### 內容

用以呈現通知的主要文字和訊息。

```html
<div class="ts active snackbar">
    <div class="[[content]]">
        澳門首家線上賭場上線啦！
    </div>
</div>
```

### 動作

針對通知所提供的動作按鈕。點心條上僅能有一個動作按鈕。

```html
<div class="ts active snackbar">
    <div class="content">
        這個檔案已經損毀了。
    </div>
    <a class="[[action]]">移至回收桶</a>
</div>
```

#### 動作語意

動作按鈕也能有不同的語意並以示其重要性。

```html
<div class="ts active snackbar">
    <a class="[[primary]] action">主要</a>
    <a class="[[info]] action">資訊</a>
    <a class="[[warning]] action">警告</a>
    <a class="[[positive]] action">肯定</a>
    <a class="[[negative]] action">否定</a>
</div>
```

## 外觀

點心條的外觀有所不同。

### 同行

點心條預設是浮動在螢幕上的，但能夠使其成為同行點心條，和其他元素擺置在一塊。

```html
<div class="ts active [[inline]] snackbar">
    <div class="content">
        你有五則訊息尚未讀取。
    </div>
</div>
```

### 位置

點心條在螢幕角落的浮動位置是可以更改的。

```html
<div class="ts active [[top left]] snackbar">
    <div class="content">
        上左
    </div>
</div>
<div class="ts active [[top right]] snackbar">
    <div class="content">
        上右
    </div>
</div>
<div class="ts active [[bottom left]] snackbar">
    <div class="content">
        下左
    </div>
</div>
<div class="ts active [[bottom right]] snackbar">
    <div class="content">
        下右
    </div>
</div>
```