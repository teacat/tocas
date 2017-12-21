---
layout: single
tabs  :
    - styles
    - module
---

# 下拉式選單

.ts.dropdown

## 種類

下拉式選單有多個種類。

### 基本

最基本的下拉式選單。

```html
<select class="ts [[basic]] dropdown">
    <option>1998</option>
    <option>1999</option>
    <option>2000</option>
</select>
```

### 語意

基本的下拉式選單有著不同的語意。

```html
<select class="ts basic [[primary]] dropdown">
    <option>1998</option>
</select>
<select class="ts basic [[info]] dropdown">
    <option>1998</option>
</select>
<select class="ts basic [[warning]] dropdown">
    <option>1998</option>
</select>
<select class="ts basic [[inverted]] dropdown">
    <option>1998</option>
</select>
```

### 肯定和否定

肯定和否定的語氣可以用在基本的下拉式選單。

```html
<select class="ts basic [[positive]] dropdown">
    <option>1998</option>
</select>
<select class="ts basic [[negative]] dropdown">
    <option>1998</option>
</select>
```

### 多選項

選單可以一次展現出多個選項。

```html
<select class="ts basic dropdown" [[size]]="3">
    <option>1998</option>
    <option>1999</option>
    <option>2000</option>
    <option>2001</option>
    <option>2002</option>
</select>
```

### 複選

選單可以加上 `multiple` 來允許複選。

```html
<select class="ts basic dropdown" size="3" [[multiple]]>
    <option>蘋果</option>
    <option>西瓜</option>
    <option>香蕉</option>
    <option>菠蘿</option>
    <option>拔鳳梨</option>
</select>
```

## 群組

下拉式選單可以是一個群組。

### 下拉式選單群組

一個最基本的下拉式選單群組。

```html
<div class="ts [[dropdowns]]">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>
```

### 分開的

下拉式選單群組裡的選單可以是分開的。

```html
<div class="ts [[separated]] dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>
```

### 較寬鬆

分開的下拉式選單群組間隙可以較為寬鬆。

```html
<div class="ts fluid separated [[relaxed]] dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>
```

## 內容

下拉式選單的內容由多種不同的結構組成。

### 項目

項目是構成選單中最基本的一個部分。

```html
<div class="ts floating dropdown labeled icon {{button}}">
    <i class="caret down {{icon}}"></i>
    <span class="text">更多功能</span>
    <div class="menu">
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
</div>
```

### 標題

選單中可以有標題。

```html
<div class="ts floating dropdown labeled icon {{button}}">
    <i class="filter {{icon}}"></i>
    <span class="text">篩選</span>
    <div class="menu">
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
</div>
```

### 分隔線

選單中可以插入分隔線來劃分兩個區塊。

```html
<div class="ts floating dropdown labeled icon {{button}}">
    <i class="users {{icon}}"></i>
    <span class="text">選擇人物</span>
    <div class="menu">
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
</div>
```

#### 區段分隔線

分隔線的間距可以更大，用以加強分隔區段。

```html
<div class="ts floating dropdown labeled icon {{button}}">
    <i class="users {{icon}}"></i>
    <span class="text">選擇人物</span>
    <div class="menu">
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
</div>
```

#### 群組分隔線

下拉式選單群組也能在中間插入自定義分隔線。

```html
<div class="ts separated dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <div class="[[divider]]">年</div>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <div class="[[divider]]">月</div>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
    <div class="[[divider]]">日</div>
</div>
```

### 圖示

選單內可以有圖示點綴。

```html
<div class="ts floating dropdown {{button}}">
    <span class="text">您的心情？</span>
    <div class="menu">
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
</div>
```

### 註釋

選單內的項目可以帶有註釋，用做詮釋項目的概要。

```html
<div class="ts floating dropdown labeled icon {{button}}">
    <i class="caret down {{icon}}"></i>
    <span class="text">移至資料夾</span>
    <div class="menu">
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
</div>
```

## 外觀

下拉式選單的外觀有所不同。

### 浮動

下拉式功能選單可以看起來像是浮動的，離按鈕更遠，陰影更深。

```html
<div class="ts [[floating]] dropdown labeled icon {{button}}">
    <i class="caret down {{icon}}"></i>
    <span class="text">更多功能</span>
    <div class="menu">
        <div class="item">
            新增
        </div>
        <div class="item">
            重新命名
        </div>
        <div class="item">
            下載並壓縮
        </div>
    </div>
</div>
```

### 尺寸

基本的下拉式選單有多種尺寸。

```html
<select class="ts basic [[mini]] dropdown">
    <option>迷你</option>
</select>
<select class="ts basic [[tiny]] dropdown">
    <option>微小</option>
</select>
<select class="ts basic [[small]] dropdown">
    <option>小的</option>
</select>
<select class="ts basic [[medium]] dropdown">
    <option>適中</option>
</select>
<select class="ts basic [[large]] dropdown">
    <option>大的</option>
</select>
<select class="ts basic [[big]] dropdown">
    <option>大型</option>
</select>
<select class="ts basic [[huge]] dropdown">
    <option>巨大</option>
</select>
<select class="ts basic [[massive]] dropdown">
    <option>重量級</option>
</select>
```

### 動作

下拉式選單的左右可以帶有具動作性質的元素。

```html
<div class="ts [[action]] dropdown">
    <select class="ts basic dropdown">
        <option>1 個</option>
    </select>
    <div class="ts button">
        購買
    </div>
</div>
```

### 流動

下拉式選單可以是流動寬度，填滿容器寬度。

```html
<select class="ts [[fluid]] basic dropdown">
    <option>Kasendra</option>
    <option>Larafel</option>
    <option>Kake</option>
</select>
```

### 自動層疊

下拉式選單群組能夠在手機上自動層疊，而不是保持水平排列。欲看見效果，你可能需要透過手機來查看這個範例。

```html
<div class="ts [[stackable]] dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>
```

### 無邊框

下拉式選單可以沒有邊框。

```html
<select class="ts [[borderless]] basic dropdown">
    <option>1998</option>
    <option>1999</option>
    <option>2000</option>
</select>
```