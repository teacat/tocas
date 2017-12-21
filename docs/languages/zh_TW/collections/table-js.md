---
layout: single
tabs  :
    - styles
    - module
---

# 表格

.ts.table

## JavaScript

表格有提供可用的 JavaScript 模塊。

### 可排序

使用者可以透過點擊欄位標頭來重新排序表格。排序的方式以系統語系設定為主，英文會以 A-Z 與 Z-A 作為排列，中文則是筆畫順序，俄文則是字母排序。

```html
<table class="ts [[sortable]] table">
    <thead>
        <tr>
            <th>檔案名稱</th>
            <th>中文分類</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>endpoints.go</td>
            <td>終端點</td>
            <td>轉繼站會將收到的資訊轉換成終端點並進行下一個操作。</td>
        </tr>
        <tr>
            <td>instrumenting.go</td>
            <td>度量</td>
            <td>將微服務中的函式處理時間整理成一定的格式並且傳送給 Prometheus 伺服器做統計視覺化整理。</td>
        </tr>
        <tr>
            <td>logging.go</td>
            <td>紀錄</td>
            <td>觀察並且記錄微服務中所有函式的呼叫與流向。</td>
        </tr>
        <tr>
            <td>main.go</td>
            <td>主要</td>
            <td>核心檔案，除了開發者外不應由其他人修改。</td>
        </tr>
    </tbody>
</table>
```

```js
ts('.ts.sortable.table').tablesort();
```