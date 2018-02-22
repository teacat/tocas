---
layout: single
---

# 側邊欄

.ts.sidebar

## 說明

在 Tocas UI 中並沒有漢堡選單（類似 Bootstrap 的響應式選單），因為那較不直覺，容易令人猜測選單的出現位置。為了解決這個問題 Tocas UI 有著類似原生應用程式一樣的選單。

側邊欄只能用於網頁最頂層，而不能嵌套在頁面上的容器內。但為了良好地示範側邊欄的應用，這個頁面上有稍微修改令側邊欄能夠套入容器中。

## 頁面佈局

一但使用了側邊欄，你就必須更改頁面結構。

### 頁面推動器和側邊欄

側邊欄出現時會將頁面向特定方向推動，為了達到這個效果，網頁中 `&lt;body&gt;` 的結構就必須像下面這樣做。

```html
<body>
    <!-- 側邊欄元件 -->
    <div class="ts left [[sidebar]]">
    </div>
    <!-- / 側邊欄元件 -->

    <!-- 頁面推動器 -->
    <div class="[[pusher]]">
        <!-- 網頁內容擺置於此 -->
    </div>
    <!-- / 頁面推動器 -->
</body>
```

### 擠壓的推動器

通常來說側邊欄出現時，會將頁面往某個方向推。但你能讓頁面呈現被擠壓而不是被推出螢幕外。如果你有一個常態的功能側邊欄就很適合使用這種推動器。

```html
<div class="[[squeezable]] pusher">
    <!-- 網頁內容擺置於此 -->
</div>
```

## 種類

側邊欄具有不同的種類。

### 基本

一個最基本的側邊欄會帶有內距，你能夠在內部擺置其他元件。

```html
<div class="ts static visible [[left sidebar]]">
    <div class="ts {{header}}">
        搭拉！
        <div class="sub header">你打開了秘密的側邊欄！</div>
    </div>
    <div class="ts {{segment}}">
        你可以像這樣在側邊欄放置很多不同的元件。
    </div>
</div>
```

### 垂直選單

側邊欄也能夠是一個由選單元件所組成的，這會很常用到。搭配 `inverted` 的反色語氣能讓側邊選單更加的明顯。

```html
<div class="ts static visible left sidebar inverted [[vertical menu]]">
    <a class="item">首頁</a>
    <a class="item">文件</a>
    <a class="item">下載</a>
    <div class="item">
        首頁功能
        <div class="menu">
            <a class="active item">搜尋</a>
            <a class="item">新增</a>
            <a class="item">移除</a>
        </div>
    </div>
    <a class="bottom item">登出</a>
</div>
```

## 狀態

側邊欄和相關的元件有不同的狀態。

### 靜態顯示

側邊欄在預設情況下是隱藏的，你可以手動將其保持在顯示狀態。

```html
<div class="ts [[static visible]] left sidebar">
    <div class="ts {{header}}">
        <i class="unhide {{icon}}"></i>
        預設顯示
    </div>
    <p>這個側邊欄不需要透過 JavaScript 切換，就會直接顯示出來。</p>
</div>
```

## 外觀

側邊欄有著不同的外觀點綴。

### 水平方向

一個側邊欄必須要指定在螢幕上呈現的方向。

```html
<div class="ts static visible [[left]] sidebar">
    <div class="ts {{header}}">
        <i class="left arrow {{icon}}"></i>
        靠左
        <div class="sub header">哇喔！這是個靠左邊的側邊欄呢！</div>
    </div>
</div>
<div class="ts static visible [[right]] sidebar">
    <div class="ts {{header}}">
        <i class="right arrow {{icon}}"></i>
        靠右
        <div class="sub header">或者也能像這樣向右靠齊。</div>
    </div>
</div>
```

### 覆蓋的

側邊欄一般來說會將網頁內容往旁邊推，但你可以讓側邊欄是覆蓋並浮在頁面上的。這麼做的話頁面內容就不會被推到一旁。

```html
<div class="ts static visible [[overlapped]] left sidebar">
    這個側邊欄會覆蓋在頁面內容上方。
</div>
```

### 無內距

側邊欄可以沒有內距，這很適合擺放流動寬度的元件。

```html
<div class="ts static visible [[fitted]] left sidebar">
    <div class="ts small fluid inverted negative {{message}}">
        <div class="header">帳號不安全。</div>
        請確保您已啟用二步驟驗證。
    </div>
</div>
```

### 增加內距

你可以增加側邊欄的內距，看起來會更寬闊。

```html
<div class="ts static visible [[padded]] left sidebar">
    增加內距的側邊欄。
</div>
<div class="ts static visible [[very padded]] right sidebar">
    增加更多內距的側邊欄。
</div>
```

### 寬度

你可以更改側邊欄的寬度。

|              | 64px                   | 180px                   | 230px                 | 300px                                | 360px                               |
|--------------|------------------------|-------------------------|-----------------------|--------------------------------------|-------------------------------------|
| 樣式名稱      | `very thin`             | `thin`                 | 預設                    | `wide`                              | `very wide`                         |
| 中文稱呼      | 非常窄                   | 窄的                    |                        | 寬的                                 | 非常寬                               |
| 行動裝置全寬   | <i class="x icon"></i>  | <i class="x icon"></i> | <i class="x icon"></i> | <i class="positive check icon"></i> | <i class="positive check icon"></i> |


```html
<div class="ts static visible [[wide]] left sidebar vertical {{menu}}">
    <div class="image item">
        <img src="!-16:9-!">
    </div>
    <a class="item">Yami Odymel</a>
    <div class="item">
        個人資料
        <div class="menu">
            <a class="active item">隱私</a>
            <a class="item">好友</a>
            <a class="item">文章</a>
        </div>
    </div>
</div>
```