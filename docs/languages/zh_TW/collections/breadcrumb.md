---
layout: single
---

# 麵包屑

.ts.breadcrumb

## 種類

在這裡瀏覽麵包屑的種類。

### 麵包屑

最基本的麵包屑。

```html
<div class="ts [[breadcrumb]]">
    <a class="section">首頁</a>
    <div class="divider"> / </div>
    <a class="section">商店</a>
    <div class="divider"> / </div>
    <div class="active section">T-Shirt</div>
</div>
```

### 圖示分隔

麵包屑也能夠由圖示來當做分隔線。

```html
<div class="ts [[breadcrumb]]">
    <a class="section">首頁</a>
    <i class="right angle [[icon divider]]"></i>
    <a class="section">商店</a>
    <i class="right angle [[icon divider]]"></i>
    <div class="active section">T-Shirt</div>
</div>
```

## 內容

麵包屑由不同的內容所組成。

### 分隔線

麵包屑可以帶有分隔線來表示其中的關係，這個分隔線可以是文字或是圖示。

```html
<div class="ts breadcrumb">
    <a class="section">首頁</a>
    <span class="[[divider]]">/</span>
    <a class="section">註冊程序</a>
    <span class="[[divider]]">/</span>
    <div class="active section">個人資料</div>
</div>
<br><br>
<div class="ts breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon [[divider]]"></i>
    <a class="section">註冊程序</a>
    <i class="right chevron icon [[divider]]"></i>
    <div class="active section">個人資料</div>
</div>
```

### 區塊

麵包屑可以包含區塊，能夠是連結或是純文字。

```html
<div class="ts breadcrumb">
    <div class="[[section]]">首頁</div>
    <div class="divider"> / </div>
    <div class="active [[section]]">搜尋</div>
</div>
```

### 連結

區塊可以是連結，或者帶有連結文字。

```html
<div class="ts breadcrumb">
    <[[a]] class="section">首頁</[[a]]>
    <div class="divider"> / </div>
    <div class="active section">搜尋：<a href="#">衛生紙</a></div>
</div>
```

## 狀態

麵包屑有不同的狀態。

### 已啟用

區塊可以表現出一個已被啟用的狀態。

```html
<div class="ts breadcrumb">
    <a class="section">商品</a>
    <div class="divider"> / </div>
    <div class="[[active]] section">衛生紙</div>
</div>
```

## 外觀

麵包屑有著不同的外觀點綴。

### 尺寸

麵包屑有不同的尺寸可供選擇。

```html
<div class="ts [[mini]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[tiny]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[small]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[medium]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[large]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[big]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[huge]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts [[massive]] breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
```