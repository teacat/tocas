---
layout: single
tabs  :
    - styles
    - module
---

# 訊息

.ts.message

## JavaScript

訊息有提供可用的 JavaScript 模塊。

### 可關閉的

訊息中的關閉按鈕預設並沒有動作，僅是裝飾而已。但是你可以透過 JavaScript 將該按鈕套上一個關閉訊息的動作。

```html
<div class="ts [[dismissable]] message">
    <button class="ts close {{button}}"></button>
    <div class="header">
        不喜歡我？
    </div>
    <p>那就關閉我吧。</p>
</div>
```

```js
ts('.dismissable.message').message()
```