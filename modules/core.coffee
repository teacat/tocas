ts = (selector, context=null) =>
    # 如果傳入的選擇器不是物件，那麼就只是普通的選擇器。
    if typeof selector isnt 'function'
        ts.selector = if context isnt null then $selector(selector, context) else $selector(selector)
        return ts.fn

    # 如果傳入的是物件，那麼就是欲註冊的 Tocas 模組。
    # 改名為 module 比較符合接下來的使用方式。
    module = selector

    # 延展物件的函式，與 ES 的 `...` 不同之處在於 extend 並不會替換掉整個子物件，而會以補插的方式執行。
    # https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
    extend = ->
        extended = {}
        deep     = true
        i        = 0
        length   = arguments.length
        if Object::toString.call(arguments[0]) == '[object Boolean]'
            deep = arguments[0]
            i++
        merge = (obj) ->
            for prop of obj
                if Object::hasOwnProperty.call(obj, prop)
                    if deep and Object::toString.call(obj[prop]) == '[object Object]'
                        extended[prop] = extend(true, extended[prop], obj[prop])
                    else
                        extended[prop] = obj[prop]
            return
        while i < length
            obj = arguments[i]
            merge obj
            i++
        extended

    # 在 Tocas 函式鏈中新增一個相對應的模組函式。
    ts.fn[module.module] = (arg=null, arg2=null, arg3=null, arg4=null, arg5=null) =>
        # 先用 Tocas Core 核心來選取指定元素，然後放到上下文物件之後傳遞到模組內使用。
        $elements = ts.selector
        # 最終的回傳值。
        value = ts.fn
        # 每個節點。
        $elements.each (element, index) =>
            # 初始化這個模組。
            localModule       = new module()
            localModule.delay = (time=0) -> new Promise (resolve) -> setTimeout(resolve, time)
            # 準備一些此元素的資料。
            $this = $selector element
            # 將此元素的資料放置這個模組中。
            localModule.$origin = $this
            localModule.$this   = $this
            localModule.index   = index

            # 取得元素的標籤，並當作設置選項回傳一個物件。
            getAttributeOptions = (object) =>
                # 初始化一個屬性物件，用以保存此元素的自訂屬性。
                props = {}
                # 遞迴模組的屬性設置，並且找尋元素是否有相對應的屬性。
                # 建立一個遞迴函式讓我們能夠解決錯綜復雜的物件。
                iterate = (object, prefix) =>
                    for name of object
                        # 將設定的 camelCase 屬性名稱轉換成 hyphen-case。
                        hyphenName = name.replace /([A-Z])/g, (g) => "-#{g[0].toLowerCase()}"
                        # 如果有前輟，就將轉換後的名稱加上前輟。
                        if prefix isnt undefined
                            hyphenName = "#{prefix}-#{hyphenName}"
                        # 如果這個設定是物件，就帶入此屬性名稱並繼續遞回這個物件。
                        if object[name]?.constructor is Object
                            iterate object[name], hyphenName
                        # 建立相對應的元素屬性名稱。
                        attr = $this.attr("data-#{hyphenName}")
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
                # 開始遞迴設置。
                iterate object
                return props

            # init 會初始化一個元素，並讓他執行模組中的初始化函式。
            init = =>
                # 初始化一個屬性物件，用以保存此元素的自訂屬性。
                props = getAttributeOptions localModule.props
                # 用模組的預設選項加上元素標籤所設置的選項來初始化選取的模組。
                $this.data extend {}, localModule.props, props
                # 然後呼叫自定義的初始化模組函式。
                value = localModule.init extend {}, localModule.props, props
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
                localModule.destroy() if $this.data('tocas')?
                # 初始化一個屬性物件，用以保存此元素的自訂屬性。
                props = getAttributeOptions localModule.props
                # 套用預設 + 元素設置 + 覆蓋的選項。
                $this.data extend {}, localModule.props, props, arg
                # 以新的選項執行初始化函式並傳入部分參數。
                value = localModule.init extend({}, localModule.props, arg), arg2, arg3, arg4, arg5
                # 將這個元素的 `tocas` 設置為 `true`，表示被初始化過了。
                $this.data 'tocas', true

            # 如果第一個是字串，就表示使用者想要呼叫模組的自訂方法。
            else if typeof arg is 'string'
                # 如果該元素還沒被初始化，我們就要先呼叫初始化函式初始化這個元素。
                init() if not $this.data('tocas')?
                # 呼叫指定的自訂方法並取得回傳值。
                value = localModule.methods()[arg]?(arg2, arg3, arg4, arg5)

        return value

# 初始化選擇器。
ts.selector = {}
# 初始化 Tocas JS 的函式鏈。
ts.fn = {}