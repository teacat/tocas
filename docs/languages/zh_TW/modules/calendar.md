# 日曆



## 種類

日曆有不同種類可供選擇。

### 基本

最基本的日曆。

```html
<div class="ts [[calendar]]">
    <div class="header">七月</div>
    <div class="content">
        <div class="date">13</div>
    </div>
</div>
```

## 內容

日曆由多個不同的內容構造所組成。

### 標題

日曆的標題，可以用來顯示月份或是當作主要標題。

```html
<div class="ts calendar">
    <div class="[[header]]">十二月</div>
</div>
```

### 日期

日曆中的日期。

```html
<div class="ts calendar">
    <div class="header">九月</div>
    <div class="[[content]]">
        <div class="date">14</div>
    </div>
</div>
```

### 日期範圍

日期可以是一個範圍，而不是單一天。

```html
<div class="ts calendar">
    <div class="header">九月</div>
    <div class="content">
        <div class="date [[range]]">12 - 31</div>
    </div>
</div>
```

### 額外內容

日曆中可以擺放額外的內容。

```html
<div class="ts calendar">
    <div class="header">七月</div>
    <div class="content">
        <div class="date">13</div>
        <div class="[[extra]]">星期三</div>
    </div>
</div>
```

### 前後輟

日曆中的日期可以有前輟或是後輟。

```html
<div class="ts calendar">
    <div class="header">十二月</div>
    <div class="content">
        <div class="date">
            <span class="[[prefix]]">第</span>
            ?
            <span class="[[suffix]]">日</span>
        </div>
    </div>
</div>
<br><br>
<div class="ts calendar">
    <div class="header">十二月</div>
    <div class="content">
        <div class="date">
            25
            <span class="[[suffix]]">日</span>
        </div>
    </div>
</div>
```

## 外觀

日曆的外觀有所不同。

### 圓角

日曆的邊角可以是稍微圓角的。

```html
<div class="ts [[rounded]] calendar">
    <div class="header">七月</div>
    <div class="content">
        <div class="date">13</div>
    </div>
</div>
```

### 尺寸

日曆的尺寸可以改變。

```html
<div class="ts [[mini]] calendar">
    <div class="header">迷你</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[tiny]] calendar">
    <div class="header">微小</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[small]] calendar">
    <div class="header">小的</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[medium]] calendar">
    <div class="header">適中</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[large]] calendar">
    <div class="header">稍大</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[big]] calendar">
    <div class="header">大的</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[huge]] calendar">
    <div class="header">巨大</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts [[massive]] calendar">
    <div class="header">重量級</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
```