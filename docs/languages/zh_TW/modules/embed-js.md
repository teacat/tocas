---
layout: single
tabs  :
    - styles
    - module
---

# 嵌入物件

.ts.embed

## JavaScript

嵌入物件有提供可用的 JavaScript 模塊。

### 初始化

你需要透過 JavaScript 初始化嵌入物件才能正常運作並載入正確的內容。

```html
<div class="ts embed" data-source="youtube" data-id="I6hHkf9mIcU" data-placeholder="!-embed:karen-!"></div>
```

```js
ts('.ts.embed').embed();
```

### 中繼選項

<p>你能夠透過中繼選項來變更嵌入物件的一些參數或是外觀。</p>
<table class="ts small stackable definition table">
    <thead>
        <tr>
            <th></th>
            <th>註釋</th>
            <th>範例</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data-placeholder</td>
            <td>預置封面的圖片路徑，這個圖片會在嵌入物件尚未載入時出現。</td>
            <td><code>data-placeholder="image.png"</code></td>
        </tr>
        <tr>
            <td>data-options</td>
            <td>這會變動嵌入物件的標籤（Attributes），你亦能透過選項使影片自動播放、顯示影片控制元件等。選項可以是鍵值，並以逗點分隔。</td>
            <td><code>data-options="controls, data-user-id=12345"</code></td>
        </tr>
        <tr>
            <td>data-query</td>
            <td>你能夠手動指定網址參數，當請求遠端影片時，這段參數會被追加在請求網址之後。像是指定 YouTube 的自動播放時很好用。</td>
            <td><code>data-query="autoplay=true"</code></td>
        </tr>
        <tr>
            <td>data-icon</td>
            <td>影片尚未播放前的圖示是可以修改的，可用來表示此嵌入物件的型態。相關圖示名稱請參考圖示元件。</td>
            <td><code>data-icon="map"</code></td>
        </tr>
    </tbody>
</table>


```html
<div class="ts embed" data-source="youtube" data-id="I6hHkf9mIcU" [[data-query]]="autoplay=true" [[data-placeholder]]="!-16:9-!"></div>
```