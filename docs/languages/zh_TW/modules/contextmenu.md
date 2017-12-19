# 複合功能選單

<p>複合功能選單不僅能用於電腦上的滑鼠右鍵，還可以在 Android、iOS 平板、智慧型手機上使用（透過長按畫面）。但複合功能選單是不被推薦使用的元件，原因是較不直覺。使用者通常不會按下右鍵查看是否有更多功能。建議僅用於偏向原生應用程式（如：文件編輯器）的頁面上。</p>

## 種類

複合功能選單有不同的種類可供選擇。

### 基本

一個最基本的複合功能選單，這外觀與下拉式選單是一樣的。複合功能選單正常狀況下是隱藏的除非你按下右鍵或是長按螢幕為止。但為了範例的示範需求，我們修改了樣式將其保持常態顯示。

```html
<div class="ts [[contextmenu]]">
    <div class="item">
        新增
    </div>
    <div class="item">
        重新命名
        <span class="description">Ctrl + R</span>
    </div>
    <div class="item">
        <i class="folder icon"></i>
        移動至
    </div>
    <div class="item">
        <i class="trash icon"></i>
        移至垃圾桶
    </div>
    <div class="divider"></div>
    <div class="item">
        下載為 ...
    </div>
</div>
```

## 內容

複合功能選單的內容由多種不同的結構組成。

### 項目

項目是構成選單中最基本的一個部分。

```html
<div class="ts contextmenu">
    <div class="[[item]]">
        新增
    </div>
    <div class="[[item]]">
        重新命名
    </div>
    <div class="[[item]]">
        下載並壓縮
    </div>
</div>
```

### 標題

選單中可以有標題。

```html
<div class="ts contextmenu">
    <div class="[[header]]">
        <i class="tags {{icon}}"></i>
        由下列標籤篩選
    </div>
    <div class="item">
        已完成
    </div>
    <div class="item">
        進行中
    </div>
</div>
```

### 分隔線

選單中可以插入分隔線來劃分兩個區塊。

```html
<div class="ts contextmenu">
    <div class="item">
        橙希
    </div>
    <div class="item">
        吳雨藍
    </div>
    <div class="[[divider]]"></div>
    <div class="item">
        羽田白音
    </div>
</div>
```

#### 區段分隔線

分隔線的間距可以更大，用以加強分隔區段。

```html
<div class="ts contextmenu">
    <div class="item">
        橙希
    </div>
    <div class="item">
        吳雨藍
    </div>
    <div class="[[section divider]]"></div>
    <div class="item">
        羽田白音
    </div>
</div>
```

### 圖示

選單內可以有圖示點綴。

```html
<div class="ts contextmenu">
    <div class="item">
        <i class="frown [[icon]]"></i>
        難過
    </div>
    <div class="item">
        <i class="meh [[icon]]"></i>
        喔
    </div>
    <div class="item">
        <i class="smile [[icon]]"></i>
        開心
    </div>
</div>
```

### 註釋

選單內的項目可以帶有註釋，用做詮釋項目的概要。

```html
<div class="ts contextmenu">
    <div class="item">
        <span class="text">圖片</span>
        <span class="[[description]]">今天上午</span>
    </div>
    <div class="item">
        <span class="text">音樂</span>
        <span class="[[description]]">未曾變動</span>
    </div>
    <div class="item">
        <span class="text">備份</span>
        <span class="[[description]]">一年前</span>
    </div>
</div>
```