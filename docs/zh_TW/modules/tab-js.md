---
layout: single
tabs  :
    - styles
    - module
---

# 分頁籤

.ts.tab

## JavaScript

分頁籤有提供可用的 JavaScript 模塊。

### 初始化

你需要透過 JavaScript 初始化分頁籤功能，初始化時有這些參數選項可供使用。透過 `[data-tab]` 替每個分頁命名，並記得在選單的項目中也加上相同的名稱，這樣才能夠令項目點擊時切換到指定分頁。

有趣的是分頁名稱不一定要是英文，這讓你能夠使用自己國家的語言進行命名且更易於近人。

|          	| 參數                                           | 註釋                                                                                  |
|----------	|-------------------------------------------	|------------------------------------------------------------------------------------	|
| onSwitch 	| tabName[_string_], groupName[_string_|null] 	| 當分頁籤切換時所會呼叫的函式，函式會傳入兩個參數，分別是欲切換至的分頁與群組名稱。 	             |
|          	|                                         	    |                                                                                    	|


```html
<div id="first" class="ts top attached tabbed menu">
    <a class="active item" [[data-tab]]="首要分頁">首要</a>
    <a class="item" [[data-tab]]="次要分頁">次要</a>
</div>
<div [[data-tab]]="首要分頁" class="ts active bottom attached tab segment">
    第一個分頁內容！
</div>
<div [[data-tab]]="次要分頁" class="ts bottom attached tab segment">
    然後這是第二個。
</div>
```

```js
ts('#first.tabbed.menu .item').tab({
    onSwitch: (tabName, groupName) => {
        alert("你切換到了「" + tabName + "」分頁，而群組是「" + groupName + "」。");
    }
});
```

### 分頁群組

你能夠在網頁中放入多層分頁，透過 `[data-tab-group]` 將有關連的分頁牽連起來成為群組並為其命名，一但依照群組區分之後，分頁的名稱可以和另一個群組的分頁相互重複而不起衝突。

而分頁群組的名稱不一定要是英文，甚至也可以帶有符號。

```html
<div class="ts secondary menu">
    <a class="active item" data-tab="首要" [[data-tab-group]]="群組">首要</a>
    <a class="item" data-tab="次要" [[data-tab-group]]="群組">次要</a>
</div>
<div data-tab="首要" [[data-tab-group]]="群組" class="ts active tab segment">
    <p>第一個分頁。</p>
    <div class="ts top attached tabbed menu">
        <a class="active item" data-tab="首要" [[data-tab-group]]="群組/分頁1">首要</a>
        <a class="item" data-tab="次要" [[data-tab-group]]="群組/分頁1">次要</a>
    </div>
    <div data-tab="首要" [[data-tab-group]]="群組/分頁1" class="ts active bottom attached tab segment">
        第一個分頁群組的第一個分頁。
    </div>
    <div data-tab="次要" [[data-tab-group]]="群組/分頁1" class="ts bottom attached tab segment">
        第一個分頁群組的第二個分頁。
    </div>
</div>
<div data-tab="次要" [[data-tab-group]]="群組" class="ts tab segment">
    <p>第二個分頁。</p>
    <div class="ts top attached tabbed menu">
        <a class="active item" data-tab="首要" [[data-tab-group]]="群組/分頁2">首要</a>
        <a class="item" data-tab="次要" [[data-tab-group]]="群組/分頁2">次要</a>
    </div>
    <div data-tab="首要" [[data-tab-group]]="群組/分頁2" class="ts active bottom attached tab segment">
        第二個分頁群組的第一個分頁。
    </div>
    <div data-tab="次要" [[data-tab-group]]="群組/分頁2" class="ts bottom attached tab segment">
        第二個分頁群組的第二個分頁。
    </div>
</div>
```

```js
ts('.secondary.menu .item').tab();
ts('.tabbed.menu .item').tab();
```