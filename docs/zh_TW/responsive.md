---
layout : single
indexes: false
---

# 響應式

Tocas UI 內建數個響應式輔助樣式，這可以協助你在指定裝置上顯示或是隱藏一些元素。

## 說明和工具

你可以在這個段落看見一些詳細的判斷基準和偵測工具來檢測你的螢幕符合何種樣式。

### 樣式列表

這裡是輔助樣式的螢幕尺寸判斷基準表格。

<table class="ts small stackable table">
    <thead>
        <tr>
            <th>樣式名稱</th>
            <th>裝置稱呼</th>
            <th>當螢幕尺寸 .. 出現</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="ts horizontal label">mobile only</span></td>
            <td>僅行動裝置</td>
            <td>&lt; 768px</td>
        </tr>
        <tr>
            <td><span class="ts horizontal label">mobile or tablet only</span></td>
            <td>行動裝置或平板</td>
            <td>&lt; 992px</td>
        </tr>
        <tr>
            <td><span class="ts horizontal label">tablet only</span></td>
            <td>僅平板裝置</td>
            <td>&gt; 767px && &lt; 992px</td>
        </tr>
        <tr>
            <td><span class="ts horizontal label">computer only</span></td>
            <td>僅小型電腦螢幕</td>
            <td>&gt; 992 && &lt; 1200px</td>
        </tr>
        <tr>
            <td><span class="ts horizontal label">tablet or large device only</span></td>
            <td>平板或大型裝置</td>
            <td>&gt; 767px</td>
        </tr>
        <tr>
            <td><span class="ts horizontal label">large device only</span></td>
            <td>僅大型裝置</td>
            <td>&gt; 992px</td>
        </tr>
        <tr>
            <td><span class="ts horizontal label">large screen only</span></td>
            <td>僅大型螢幕</td>
            <td>&gt; 1200px</td>
        </tr>
    </tbody>
</table>

### 目前裝置偵測

下方會顯示你目前螢幕正符合哪種輔助樣式。

<span class="mobile only"><span class="ts large info label" style="color: #FFF !important">行動裝置</span></span>
<span class="mobile or tablet only"><span class="ts large info label" style="color: #FFF !important">行動裝置或平板裝置</span></span>
<span class="tablet only"><span class="ts large info label" style="color: #FFF !important">平板裝置</span></span>
<span class="computer only"><span class="ts large info label" style="color: #FFF !important">僅小型電腦螢幕</span></span>
<span class="tablet or large device only"><span class="ts large info label" style="color: #FFF !important">平板或大型裝置</span></span>
<span class="large device only"><span class="ts large info label" style="color: #FFF !important">大型裝置</span></span>
<span class="large screen only"><span class="ts large info label" style="color: #FFF !important">大型螢幕</span></span>

## 樣式用法

這裡會逐一解釋各個輔助樣式的用法。

### 僅行動裝置

套用了這個樣式的容器僅會出現在**行動裝置**（手機、掌上型遊戲機）的橫和直立畫面。

```html
<div class="[[mobile only]]">我只會出現在行動裝置。</div>
```

### 行動裝置或平板

這將會使你的容器出現在**行動裝置**或是**平板螢幕**（如 Nexus 7、iPad）上，在其他裝置時則會隱藏容器。

```html
<div class="[[mobile or tablet only]]">我只會出現在行動或者是平板裝置。</div>
```

### 僅平板裝置

套用此樣式後容器、元素僅會出現在平板螢幕上。

```html
<div class="[[tablet only]]">我只會出現在平板上。</div>
```

### 僅小型電腦螢幕

套用後僅會在小型電腦螢幕上看見該元素、容器，所謂的小型電腦螢幕即是**比傳統筆記型電腦還要小的螢幕**，而**非**家用桌機的 21～24 寸或電視螢幕。

```html
<div class="[[computer only]]">你只能在小型電腦螢幕上看見我。</div>
```

### 平板或大型裝置

這個樣式將會讓你的元素、容器僅出現在**平板螢幕**或者是**大型裝置**中，大型裝置為**電腦螢幕和大於電腦螢幕以上寬度的顯示裝置**（如電視）。

```html
<div class="[[tablet or large device only]]">只要不是行動裝置通常都看得見我。</div>
```

### 僅大型裝置

套用此樣式將會讓你的元素或是容器僅出現在大型裝置（如：電腦螢幕、電視）中。

```html
<div class="[[large device only]]">我不會出現在平板，但會出現在電腦或是電視中！</div>
```

### 僅大型螢幕

「大型螢幕」和「大型裝置」**有所不同**，大型螢幕更為嚴謹（要求的螢幕尺寸更大），不過現今的筆記型電腦幾乎都被概括在內。

```html
<div class="[[large screen only]]">我會出現在大型螢幕中（如果你的筆電不小的話也會 :D）！</div>
```