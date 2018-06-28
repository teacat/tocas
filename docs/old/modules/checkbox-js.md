---
layout: single
tabs  :
    - styles
    - module
---

# 核取方塊

.ts.checkbox

## JavaScript

核取方塊有提供可用的 JavaScript 模塊。

### 簡單

你可以使用 JavaScript 來省去撰寫 `[id=""]` 和 `[for=""]` 的困擾。

```html
<div class="ts checkbox">
    <input type="checkbox">
    <label>第三性</label>
</div>
```

```js
ts('.ts.checkbox').checkbox();
```