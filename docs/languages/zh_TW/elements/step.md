---
layout: single
---

# 步驟

.ts.step

## 種類

步驟具有不同的種類。

### 步驟

一個最基本的步驟。

```html
<div class="ts steps">
    <div class="[[step]]">
      運送
    </div>
</div>
```

## 群組

步驟可以是一個群組。

### 步驟群組

一個最基本的步驟群組。

```html
<div class="ts [[steps]]">
    <div class="[[step]]">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="active [[step]]">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="disabled [[step]]">
        <i class="info icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
```

### 排序

步驟群組可以有號碼排序。

```html
<div class="ts [[ordered]] steps">
    <div class="completed step">
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="completed step">
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>
```

### 垂直

步驟群組可以是垂直擺放的。

```html
<div class="ts [[vertical]] steps">
    <div class="completed step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="completed step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>
```

## 內容

步驟的內容是各式各樣的。

### 標題

步驟裡面可以有標題。

```html
<div class="ts steps">
    <div class="step">
        <div class="content">
            <div class="[[title]]">運送</div>
        </div>
    </div>
</div>
```

### 註釋

步驟裡面可以包含註釋。

```html
<div class="ts steps">
    <div class="step">
        <div class="content">
            <div class="title">運送</div>
            <div class="[[description]]">選擇你的運送方式</div>
        </div>
    </div>
</div>
```

### 圖示

步驟也能夠擁有圖示。

```html
<div class="ts steps">
    <div class="step">
        <i class="truck [[icon]]"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
</div>
```

### 連結

步驟本身可以是連結。

```html
<div class="ts steps">
    <[[a]] class="active step" href="#!">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </[[a]]>
    <[[a]] class="step" href="#!">
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </[[a]]>
</div>
```

#### 非傳統的連結

步驟的連結樣式也可以出現在非傳統連結標籤上。

```html
<div class="ts steps">
    <div class="[[link]] step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="[[link]] step">
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
</div>
```

## 狀態

步驟有許多不同的狀態。

### 行進中

顯示一個步驟是目前正在行進中的。

```html
<div class="ts steps">
    <div class="[[active]] step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
</div>
```

### 完成

顯示一個已經完成的步驟。

```html
<div class="ts steps">
    <div class="[[completed]] step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
</div>
```

### 已停用

用來顯示一個不能被選擇的步驟。

```html
<div class="ts steps">
    <div class="[[disabled]] step">
        結帳
    </div>
</div>
```

## 外觀

步驟的外觀有所不同。

### 可層疊的

在螢幕縮小時，步驟可以被層疊起來。

```html
<div class="ts [[stackable]] steps">
    <div class="completed step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>
```

### 流動

步驟的寬度可以是填滿容器寬度的。

```html
<div class="ts vertical [[fluid]] steps">
    <div class="completed step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>
<div class="ts [[fluid]] steps">
    <div class="completed step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>
```

### 附著

步驟可以附著在其他元件上。

```html
<div class="ts three [[top attached]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="info {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts flatted attached {{segment}}">
    <p>月月，搭拉安！</p>
    <p>月月，搭拉安！</p>
    <p>月月，搭拉安！</p>
</div>
<div class="ts three [[bottom attached]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="info {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
```

### 尺寸

步驟具有不同尺寸。

```html
<div class="ts [[mini]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[tiny]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[small]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[medium]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[large]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[big]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[huge]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts [[massive]] steps">
    <div class="step">
        <i class="truck {{icon}}"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment {{icon}}"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice {{icon}}"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
```