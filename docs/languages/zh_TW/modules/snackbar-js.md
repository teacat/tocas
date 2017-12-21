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

<p>呼叫點心條時有這些參數選項可供使用。</p>
<table class="ts small celled stackable definition table">
    <thead>
        <tr>
            <th></th>
            <th>預設值</th>
            <th>註釋</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>content</td>
            <td></td>
            <td>點心條的訊息內容。</td>
        </tr>
        <tr>
            <td>action</td>
            <td></td>
            <td>點心條的動作按鈕文字。</td>
        </tr>
        <tr>
            <td>actionEmphasis</td>
            <td></td>
            <td>動作按鈕的語意，如：<span class="ts horizontal label">primary</span>、<span class="ts horizontal label">info</span>、<span class="ts horizontal label">warning</span>⋯等。</td>
        </tr>
        <tr>
            <td>hoverStay</td>
            <td>false</td>
            <td>當滑鼠移至點心條上時是否要延長點心條的存在時間。</td>
        </tr>
        <tr>
            <td>onClose</td>
            <td></td>
            <td>當點心條關閉時所呼叫的函式。</td>
        </tr>
        <tr>
            <td>onAction</td>
            <td></td>
            <td>當點心條上的動作按鈕被按下時所會呼叫的函式。</td>
        </tr>
    </tbody>
</table>


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