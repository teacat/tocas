# Modules

Tocas 的所有模組原始碼。

## 使用技術

* CoffeeScript（ECMAScript 6）

## 開始編輯

## 建立模塊

透過一個 `class` 建立單個新模組，其構成基本條件如下。

```coffee
class TocasSidebar
    # 模組名稱。
    $name:
        'sidebar'

    # 模組內部資料。
    $data:
        {}

    # 模組選項。
    $options:
        {}

    # 模組無選項回呼函式。
    $init: ->

    # 模組帶選項回呼函式。
    $opts: ->

    # 模組可供使用方式。
    $methods:
        # show 會顯示側邊欄。
        show: ({$elements}) ->
            # ...

# 註冊側邊欄模組到 Tocas JS 核心中，並將其命名為 `sidebar()`。
ts new TocasSidebar
```