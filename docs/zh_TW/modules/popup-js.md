---
layout: single
tabs  :
    - styles
    - module
---

# 彈出式訊息

.ts.popup

## JavaScript

彈出式訊息有提供可用的 JavaScript 模塊。

### 行動裝置禁用

彈出式訊息就算不用 JavaScript 也能運作，但這會令行動裝置使用者困擾。當他們按下按鈕時瀏覽器會誤以為是將游標移動到元素上，進而出現惱人的彈出式訊息而遮蔽了畫面。為了解決這個問題，你需要執行下列 JavaScript。

```html
<button class="ts info labeled icon button" data-tooltip="早安！我的朋友！你欠錢沒還！">
    <i class="mouse pointer icon"></i>
    行動裝置上點擊此按鈕不會有彈出式訊息
</button>
```

```js
ts('[data-tooltip]').popup();
```