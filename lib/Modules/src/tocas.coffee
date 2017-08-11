ts = (selector, context=null) ->
    # 如果傳入的選擇器不是物件，那麼就只是普通的選擇器。
    if typeof selector isnt 'object'

    # 如果傳入的是物件，那麼就是欲註冊的 Tocas 模組。
    # 改名為 module 比較符合接下來的使用方式。
    module = selector

    # 在 Tocas 函式鏈中新增一個相對應的模組函式。
    ts.fn[module.$name] = ($arg=null, $arg2=null, $arg3=null) ->
        # 先用 Tocas Core 核心來選取指定元素，然後放到上下文物件之後傳遞到模組內使用。
        $elements = context isnt null then $selector(selector, context) else $selector(selector)
        # 上下文物件讓我們可以在模組中展開，使用相關的內容。
        $context = {$elements}

        # 如果第一個是字串，就表示使用者想要呼叫模組的自訂方法。
        if typeof $arg is 'string'
            # 呼叫指定的自訂方法，並傳入上下文物件好讓我們在模組中使用這些東西，
            # 順便綁定 this 為模組本身，這樣才能呼叫模組自己的其他輔助函式。
            module[$arg]($context, $arg2, $arg3).bind module


# 初始化 Tocas JS 的函式鏈。
ts.fn = {}