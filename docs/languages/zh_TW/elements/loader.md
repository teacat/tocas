---
layout: single
---

# 讀取指示器

.ts.loader

## 說明

讀取指示器有兩個種類，一個是讀取中，另一個則是未知。未知通常用在還在準備的狀態，例如檔案讀取中，一旦檔案讀取完畢開始上傳，就可以改用讀取中的狀態。

## 種類

讀取指示器具有不同的種類。

### 基本

一個最基本的讀取指示器，讀取指示器通常都是隱藏的，直至給予 <span class="ts horizontal label">active</span> 或放置於一個 <span class="ts horizontal label">active dimmer</span> 的容器中才會顯示。

```html
<div class="ts {{segment}}">
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
    <div class="ts [[active]] {{dimmer}}">
        <div class="ts [[loader]]"></div>
    </div>
</div>
```

### 文字讀取指示器

讀取指示器可以帶有文字。

```html
<div class="ts {{segment}}">
    <div class="ts active {{dimmer}}">
        <div class="ts [[text loader]]">讀取中</div>
    </div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
<br>
<div class="ts {{segment}}">
    <div class="ts active inverted {{dimmer}}">
        <div class="ts [[text loader]]">讀取中</div>
    </div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```

## 狀態

讀取指示器帶有不同的狀態。

### 未知

用以顯示未知、或是準備中的狀態。

```html
<div class="ts {{segment}}">
    <div class="ts active {{dimmer}}">
        <div class="ts [[indeterminate]] text loader">準備檔案中</div>
    </div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```

### 啟用中

正在啟用中的讀取指示器，沒有 <span class="ts horizontal label">dimmer</span> 的話可能會讓你的讀取指示器不清不楚。

```html
<div class="ts {{segment}}">
    <div class="ts [[active]] loader"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```

### 已停用

讀取指示器可以呈現被停用，或是隱藏狀態。

```html
<div class="ts {{segment}}">
    <div class="ts [[disabled]] loader"></div>
    <p></p>
</div>
```

## 外觀

讀取指示器有不同的外觀、尺寸。

### 同列區塊

將讀取指示器從浮動改為一個區塊。

```html
<div class="ts active [[inline]] loader"></div>
<div class="ts active [[inline]] large loader"></div>
<div class="ts active [[inline]] big loader"></div>
```

### 同列置中

讀取指示器就算是區塊也可以置中。

```html
<div class="ts active [[centered]] inline loader"></div>
```

### 尺寸

讀取指示器具有許多不同的尺寸。

```html
<div class="ts active inline [[mini]] loader"></div>
<div class="ts active inline [[tiny]] loader"></div>
<div class="ts active inline [[small]] loader"></div>
<div class="ts active inline [[medium]] loader"></div>
<div class="ts active inline [[large]] loader"></div>
<div class="ts active inline [[big]] loader"></div>
<div class="ts active inline [[huge]] loader"></div>
<div class="ts active inline [[massive]] loader"></div>
```

### 反色

讀取指示器的顏色可以是相反地。

```html
<div class="ts inverted {{segment}}">
    <div class="ts active [[inverted]] loader"></div>
    <br>
    <br>
    <br>
    <br>
</div>
```