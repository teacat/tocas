---
layout: single
tabs  :
    - styles
    - module
---

# 複合功能選單

.ts.context.menu

## JavaScript

複合功能選單有提供可用的 JavaScript 模塊。

### 初始化

你需要透過 JavaScript 初始化一個複合功能選單，同時需指定會觸發複合功能選單的容器，還有觸發的選單為何。

```html
<div class="ts basic padded dashed slate">
    <i class="mouse pointer icon"></i>
    <span class="header">在此點擊右鍵</span>
    <span class="description">在這個板岩上點擊右鍵可以呼叫出 Tocas UI 自訂的複合功能選單。</span>
</div>
<div class="ts [[contextmenu]]">
    <div class="item">
        新增
    </div>
    <div class="item">
        重新命名
        <span class="description">Ctrl + R</span>
    </div>
    <div class="item">
        <i class="folder icon"></i>
        移動至
    </div>
    <div class="item">
        <i class="trash icon"></i>
        移至垃圾桶
    </div>
    <div class="divider"></div>
    <div class="item">
        下載為 ...
    </div>
</div>
```

```js
ts('.basic.dashed.slate').contextmenu({
    menu: '.ts.contextmenu'
});
```