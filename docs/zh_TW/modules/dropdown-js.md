---
layout: single
tabs  :
    - styles
    - module
---

# 下拉式選單

.ts.dropdown

## JavaScript

下拉式選單有提供可用的 JavaScript 模塊。

### 功能選單

一個用以呈現功能的下拉式功能選單

```html
<div class="ts [[dropdown]]">
    <div class="text">檔案</div>
    <i class="caret down {{icon}}"></i>
    <div class="menu">
        <div class="item">
            新增
        </div>
        <div class="item">
            重新命名
            <span class="description">Ctrl + R</span>
        </div>
        <div class="item">
            <i class="folder {{icon}}"></i>
            移動至
        </div>
        <div class="item">
            <i class="trash {{icon}}"></i>
            移至垃圾桶
        </div>
        <div class="divider"></div>
        <div class="item">
            下載為 ...
        </div>
    </div>
</div>
```

```js
ts('.ts.dropdown:not(.basic)').dropdown();
```