---
layout: single
tabs  :
    - styles
    - module
---

# 點心條

.ts.snackbar

## JavaScript

點心條有提供可用的 JavaScript 模塊。

### 選項

呼叫點心條時有這些參數選項可供使用。

|                | 預設值  | 註釋                                               |
|----------------|--------|---------------------------------------------------|
| content        |        | 點心條的訊息內容。                                   |
| action         | 非常窄  | 點心條的動作按鈕文字。                                |
| actionEmphasis |        | 動作按鈕的語意，如：`primary`、`info`、`warning`⋯等。 |
| hoverStay      | false  | 當滑鼠移至點心條上時是否要延長點心條的存在時間。          |
| onClose        |        | 當點心條關閉時所呼叫的函式。                           |
| onAction       |        | 當點心條上的動作按鈕被按下時所會呼叫的函式。              |


```html
<div class="ts snackbar">
    <div class="content"></div>
    <a class="action"></a>
</div>
```

```js
ts('.snackbar').snackbar({
    content: '檔案已經成功地送出了。',
    action: '還原',
    actionEmphasis: 'negative',
    onAction: () => {
        alert('檔案已順利還原！');
    }
});
```