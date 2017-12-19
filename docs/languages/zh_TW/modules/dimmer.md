# 淡化幕



## 種類

核取方塊有不同的種類可供選擇。

### 基本

最基本的淡化幕。

```html
<div class="ts {{segment}}">
    <div class="ts active [[dimmer]]"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```

## 狀態

淡化幕有不同的狀態。

### 已啟用

淡化幕只有在啟用時才會出現。

```html
<div class="ts {{segment}}">
    <div class="ts [[active]] dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```

### 已停用

淡化幕可以被停用，如此一來就不會遮蔽或是淡化任何物件。

```html
<div class="ts {{segment}}">
    <div class="ts [[disabled]] dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```

## 外觀

淡化幕有不同的外觀樣式可供點綴。

### 反色

淡化幕可以是反色的。

```html
<div class="ts {{segment}}">
    <div class="ts [[inverted]] active dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>
```