---
layout: single
---

# 手風琴

.ts.accordion

## 說明

手風琴採用的是 HTML5 原生的標籤而不是 jQuery 或 TocasJS，樣式已經在所有瀏覽器上統一化了。手風琴內的下拉圖示會依照展開與否更換成不同的形態。

## 種類

在這裡瀏覽手風琴的種類。

### 表格

最基本的手風琴。

```html
<details class="ts [[accordion]]" open>
    <summary>
        <i class="dropdown {{icon}}"></i>
        什麼是夏希？
    </summary>
    <div class="content">
        <p>夏希是一個基於 PHP 的時間類別，用以取得現在的時間，或者是數天後的現在時刻。</p>
    </div>
</details>
```

## 內容

手風琴的內部構造不僅一種。

### 標題

手風琴的標題，作為欲展開內容的大鋼。

```html
<details class="ts accordion">
    <[[summary]]>
        <i class="dropdown {{icon}}"></i>
        我是標題，我永遠不會被收縮。
    </[[summary]]>
</details>
```

### 內容

擺放欲收縮和展開的內容容器。

```html
<details class="ts accordion" open>
    <summary>
        <i class="dropdown {{icon}}"></i>
        我是手風琴標題
    </summary>
    <div class="[[content]]">
        <p>按下標題可以收縮或是展開我。</p>
    </div>
</details>
```

## 外觀

手風琴的外觀可以有所不同。

### 反色

手風琴可以是反色的。

```html
<div class="ts inverted {{segment}}">
    <details class="ts [[inverted]] accordion" open>
        <summary>
            <i class="dropdown {{icon}}"></i>
            什麼是風紀委員？
        </summary>
        <div class="content">
            <p>Jajjimento（ジャッジメント）中文涵意是風紀委員，這是用來驗證表單的 PHP 類別。</p>
        </div>
    </details>
</div>
```