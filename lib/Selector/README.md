# Selector

這是 Tocas 模塊中的核心選擇器，且輕量與輕巧，用以快速選擇並且套用指定樣式至特定元素。

## 功能

這個核心不會有過多的功能，且多數功能是基於 ES6 和原生功能。

### 核心

* .get(*index*)
* .each(*function(element, index)*)
* .eq(*index*)
* .toArray()

### 元素

* .parent()
* .closest(*selector*)
* .find(*selector*)
* .wrap(*element*)
* .append(*element*)
* .appendTo(*selector*)
* .prepend(*element*)
* .prependTo(*selector*)
* .remove()
* .is()
* .slice()
* .children()
* .next()
* .prev()
* .prevAll(*selector*)
* .nextAll(*selector*)
* .addBack()
* .index()

### 標籤和樣式

* .attr(*name*, *value*)
* .removeAttr(*name*)
* .addClass(*name*)
* .removeClass(*name*)
* .toggleClass(*name*)
* .hasClass(*name*)
* .css(*name*, *value*)

### 事件

* .on(*event*, *handler*)
* .one(*event*, *handler*)
* .off(*event*)

### 內容

* .text(*value*)
* .val(*value*)
* .html(*value*)
* .empty()

### 資料

* .prop(*name*, *value*)
* .data(*name*, *value*)
* .removeData(*name*)