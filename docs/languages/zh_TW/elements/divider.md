---
layout: single
---

# 分隔線

.ts.divider

## 種類

分隔線具有不同的種類。

### 基本

一個最基本的分隔線。

```html
<p>我是微笑小安安，歡迎來到小安網站。</p>
<div class="ts [[divider]]"></div>
<p>你將會在這裡看見一個魔法師的日常生活，</p>
<p>沒錯，只要你能夠單身三十年，你也可以跟我一樣成為魔法師。</p>
```

### 段落

分隔線可以增加間距用以區分大型段落。

```html
這裡是一個區段，然後下一行會是新世界。
<div class="ts [[section]] divider"></div>
哈囉！世界！
```

### 水平分隔線

這種分隔線可以讓你在中間插入文字。

```html
<p>嗶嗶嗶。</p>
<div class="ts [[horizontal]] divider">我是分隔線</div>
<p>沒錯，你可以在分隔線中間插入一小段文字，</p>
<p>而且只需要一個元素。</p>
```

## 外觀

分隔線的外觀可以有所不同。

### 隱藏

不可見的分隔線，但仍帶有分隔效果。

```html
<p>嗶嗶嗶。</p>
<div class="ts [[hidden]] divider">我是分隔線</div>
<p>你有看見中間的分隔線嗎？。</p>
<p>很多人看不見。</p>
<p>但是很多人不說。</p>
```

### 縮減

分隔線可以沒有間距。

```html
這個分隔線會沒有間距，字看起來會跟分隔線黏在一起。
<div class="ts [[fitted]] divider"></div>
當然這一行也不例外。
```

### 反色

分隔線的顏色是相反色。

```html
<div class="ts inverted {{segment}}">
    下面的分隔線會和一般的分隔線顏色有所不同。
    <div class="ts [[inverted]] divider"></div>
    看見了嗎！奇蹟啊！
</div>
```

### 清理浮動

分隔線可以透過 <span class="ts label">clear: both;</span> 清理上一個元素的浮動狀態。

```html
月月，搭拉安！
<div class="ts [[clearing]] divider"></div>
月月，搭拉安！
```