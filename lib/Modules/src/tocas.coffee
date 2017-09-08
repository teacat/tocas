ts = (selector, context=null) ->
    # 如果傳入的選擇器不是物件，那麼就只是普通的選擇器。
    if typeof selector isnt 'function'
        ts.selector = if context isnt null then $selector(selector, context) else $selector(selector)
        return ts.fn

    # 如果傳入的是物件，那麼就是欲註冊的 Tocas 模組。
    # 改名為 module 比較符合接下來的使用方式。
    module = selector

    # 在 Tocas 函式鏈中新增一個相對應的模組函式。
    ts.fn[module::$name] = ($arg=null, $arg2=null, $arg3=null) ->
        # 先用 Tocas Core 核心來選取指定元素，然後放到上下文物件之後傳遞到模組內使用。
        $elements = ts.selector
        $module   = module
        $data     = module::$data    or {}
        $options  = module::$options or {}
        $delay    = (time=0) -> new Promise (resolve) -> setTimeout(resolve, time)
        # 在選項中插入 Tocas 初始化開關，用以檢測模組是否被初始化過。
        $options.tocas = module::$name
        # 上下文物件讓我們可以在模組中展開，使用相關的內容。
        $context = {$elements, $selector, $module, $data, $options, $delay}
        # 初始化一些模組該有的函式。
        methods = module::$methods or { }
        init    = module::$init    or -> ts.fn
        opts    = module::$opts    or -> ts.fn
        # 最終的回傳值。
        value   = ts.fn

        # 每個節點。
        $elements.each (_, index) ->
            $context.$this  = $selector @
            $context.$index = index

            # 如果第一個參數是空的，那麼使用者想直接呼叫這個模組的初始化函式。
            if $arg is null
                # 如果這個模組已經被初始化了，元素已有模組的選項，就離開。
                # 因為我們不需要重複初始化模組。
                return if $context.$this.data('tocas')?
                # 用模組的預設選項，初始化選取的模組。
                $context.$this.data $options
                # 然後呼叫自定義的初始化模組函式。
                value = init.call module, $context

            # 如果第一個參數是物件，就表示使用者想要傳入一個選項物件。
            else if typeof $arg is 'object'
                # 如果該元素還沒被初始化，我們就要先呼叫初始化函式初始化這個元素。
                # 不然變成只有套用設定到該元素，該元素會沒有功能。
                if not $context.$this.data('tocas')?
                    # 用模組的預設選項，初始化選取的模組。
                    $context.$this.data $options
                    # 呼叫初始化函式
                    init.call module, $context
                # 套用新的選項到指定元素。
                $context.$this.data $arg
                # 然後呼叫自定義的選項模組函式。
                value = opts.call module, $context, $arg, $arg2, $arg3

            # 如果第一個是字串，就表示使用者想要呼叫模組的自訂方法。
            else if typeof $arg is 'string'
                # 呼叫指定的自訂方法，並傳入上下文物件好讓我們在模組中使用這些東西，
                # 順便綁定 this 為模組本身，這樣才能呼叫模組自己的其他輔助函式。
                value = methods[$arg]?.call module, $context, $arg2, $arg3

        return value

# 初始化選擇器。
ts.selector = {}
# 初始化 Tocas JS 的函式鏈。
ts.fn = {}