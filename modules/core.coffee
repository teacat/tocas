ts = (selector, context=null) ->
    # 如果傳入的選擇器不是物件，那麼就只是普通的選擇器。
    if typeof selector isnt 'function'
        ts.selector = if context isnt null then $selector(selector, context) else $selector(selector)
        return ts.fn

    # 如果傳入的是物件，那麼就是欲註冊的 Tocas 模組。
    # 改名為 module 比較符合接下來的使用方式。
    module = selector

    # 在 Tocas 函式鏈中新增一個相對應的模組函式。
    ts.fn[module.name] = (arg=null, arg2=null, arg3=null) ->
        # 先用 Tocas Core 核心來選取指定元素，然後放到上下文物件之後傳遞到模組內使用。
        $elements = ts.selector
        # 最終的回傳值。
        value = ts.fn

        # 每個節點。
        $elements.each (_, index) ->
            # 初始化這個模組。
            module       = new module()
            module.delay = (time=0) -> new Promise (resolve) -> setTimeout(resolve, time)
            # 準備一些此元素的資料。
            $this = $selector @
            # 將此元素的資料放置這個模組中。
            module.$this = $this
            module.index = index

            # init 會初始化一個元素，並讓他執行模組中的初始化函式。
            init = ->
                # 初始化一個屬性物件，用以保存此元素的自訂屬性。
                props = {}
                # 遞迴模組的屬性設置，並且找尋元素是否有相對應的屬性。
                for name of module.props
                    # 將設定的 camelCase 轉換成 hyphen-case。
                    name = name.replace /([A-Z])/g, (g) => "-#{g[0].toLowerCase()}"
                    # 建立相對應的元素屬性名稱。
                    attr = $this.attr("data-#{name}")
                    # 如果元素沒有相對應的標籤，就略過這個設置。
                    continue if !attr?
                    # 轉換標籤的字串型態到相對應的真正型態，例如：數字字串 -> 數值、布林字串 -> 布林值。
                    switch attr
                        when attr is 'true', attr is 'false'
                            props[name] = attr is 'true'
                        when !isNaN attr
                            props[name] = parseInt attr
                        else
                            props[name] = attr
                # 用模組的預設選項加上元素標籤所設置的選項來初始化選取的模組。
                $this.data {module.props..., props...}
                # 然後呼叫自定義的初始化模組函式。
                value = module.init {module.props..., props...}
                # 將這個元素的 `tocas` 設置為 `true`，表示被初始化過了。
                $this.data 'tocas', true

            # 如果第一個參數是空的，那麼使用者想直接呼叫這個模組的初始化函式。
            if arg is null
                # 如果元素沒有 `tocas` 設置，就表示尚未被初始化。
                # 若真為此，則執行初始化函式。
                init() if not $this.data('tocas')?

            # 如果第一個參數是物件，就表示使用者想要傳入一個選項物件。
            else if typeof arg is 'object'
                # 如果該元素已經被初始化了，我們就呼叫摧毀函式。
                module.destroy() if $this.data('tocas')?
                # 套用新的選項到指定元素。
                $this.data arg
                # 以新的選項執行初始化函式並傳入部分參數。
                value = module.init {module.props..., arg...}, arg2, arg3
                # 將這個元素的 `tocas` 設置為 `true`，表示被初始化過了。
                $this.data 'tocas', true

            # 如果第一個是字串，就表示使用者想要呼叫模組的自訂方法。
            else if typeof arg is 'string'
                # 如果該元素還沒被初始化，我們就要先呼叫初始化函式初始化這個元素。
                init() if not $this.data('tocas')?
                # 呼叫指定的自訂方法並取得回傳值。
                value = module.methods()[arg]?(arg2, arg3)

        return value

# 初始化選擇器。
ts.selector = {}
# 初始化 Tocas JS 的函式鏈。
ts.fn = {}