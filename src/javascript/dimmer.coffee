# Dimmer
#
# 淡化幕

ts.fn.dimmer = value: (parameters) ->

    # ------------------------------------------------------------------------
    # 變數與常數設置
    # ------------------------------------------------------------------------

    # 模組名稱。
    NAME             = 'dimmer'
    # 模組事件鍵名。
    EVENT_NAMESPACE  = ".#{NAME}"
    # 模組命名空間。
    MODULE_NAMESPACE = "module-#{NAME}"

    # 模組設定。
    Settings =
        # 是否僅允許單個手風琴只有一個分頁能被打開。
        exclusive     : true
        # 消音所有提示，甚至是錯誤訊息。
        silent        : false
        # 顯示除錯訊息。
        debug         : true
        # 監聽 DOM 結構異動並自動重整快取。
        observeChanges: true
        # 可否在點擊的時候關閉。
        closable : false
        # 當出現時會呼叫的回呼函式。
        onShow   : ->
        # 當隱藏時會呼叫的回呼函式。
        onHide   : ->
        # 當出現或隱藏時會呼叫的回呼函式。
        onChange : ->
        # 當淡化幕自動產生時所要追加的樣式類別，例如 `inverted`。
        variation: false

    # 事件名稱。
    Event =
        SHOW  : "SHOW#{EVENT_NAMESPACE}"
        HIDE  : "HIDE#{EVENT_NAMESPACE}"
        CHANGE: "CHANGE#{EVENT_NAMESPACE}"
        CLICK : "click#{EVENT_NAMESPACE}"

    # 樣式名稱。
    ClassName =
        ACTIVE   : 'active'
        ANIMATING: 'animating'
        DIMMER   : 'dimmer'

    # 選擇器名稱。
    Selector =
        DIMMER: ':scope > .ts.dimmer'

    # 錯誤訊息。
    Error =
        METHOD: '欲呼叫的方法並不存在'

    # ------------------------------------------------------------------------
    # 私有變數
    # ------------------------------------------------------------------------

    $allModules    = ts @
    query          = arguments[0]
    queryArguments = [].slice.call arguments, 1
    methodInvoked  = typeof query is 'string'
    returnedValue  = undefined

    # ------------------------------------------------------------------------
    # 元素遍歷
    # ------------------------------------------------------------------------

    $allModules.each ->

        # ------------------------------------------------------------------------
        # 區域變數
        # ------------------------------------------------------------------------

        $this    = ts @
        element  = @
        instance = $this.data MODULE_NAMESPACE
        settings = if ts.isPlainObject(parameters) then ts.extend(Settings, parameters) else ts.extend(Settings)
        $dimmer  = if $this.hasClass ClassName.DIMMER then $this else $this.find Selector.DIMMER

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            # Show
            #
            # 顯示

            show: =>
                module.debug '顯示淡化幕', element
                if module.is.active()
                    return
                $this.trigger Event.SHOW, element
                $this.trigger Event.CHANGE, element
                $dimmer.addClass ClassName.ACTIVE

            # Hide
            #
            # 隱藏

            hide: =>
                module.debug '隱藏淡化幕', element
                if module.is.hidden()
                    return
                $this.trigger Event.HIDE, element
                $this.trigger Event.CHANGE, element
                $dimmer.removeClass ClassName.ACTIVE

            # Toggle
            #
            # 切換

            toggle: =>
                module.debug '切換淡化幕', element
                if module.is.active()
                    module.hide()
                else
                    module.show()

            # Create
            #
            # 建立

            create: ->
                if module.has.dimmer()
                    return
                ts '<div>'
                    .addClass 'ts dimmer'
                    .prependTo $this
                module.refresh()
                $dimmer.reflow()

            # Is
            #
            # 是否

            is:
                dimmer: ->
                    $this.hasClass ClassName.DIMMER
                active: ->
                    $dimmer.hasClass ClassName.ACTIVE
                hidden: ->
                    not $dimmer.hasClass ClassName.ACTIVE
                animating: ->
                    $dimmer.hasClass ClassName.ANIMATING

            # Get
            #
            # 取得

            get:
                dimmer: ->
                    $dimmer.get()

            # Has
            #
            # 是否有

            has:
                dimmer: ->
                    $this.find(Selector.DIMMER).length isnt 0

            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>
                    $this.on Event.SHOW, (event, context) ->
                        module.debug "發生 SHOW 事件", context
                        settings.onShow.call context, event
                    $this.on Event.HIDE, (event, context) ->
                        module.debug "發生 HIDE 事件", context
                        settings.onHide.call context, event
                    $this.on Event.CHANGE, (event, context) ->
                        module.debug "發生 CHANGE 事件", context
                        settings.onChange.call context, event

            # ------------------------------------------------------------------------
            # 模組核心
            # ------------------------------------------------------------------------

            # Initialize
            #
            # 初始化

            initialize: ->
                module.debug '初始淡化幕', element
                module.bind.events()
                if not module.is.dimmer() and not module.has.dimmer()
                    module.create()
                if settings.observeChanges
                    module.observeChanges()
                module.instantiate()

            # Instantiate
            #
            # 實例化

            instantiate: ->
                module.debug '實例化淡化幕', element
                instance = module
                $this.data MODULE_NAMESPACE, instance

            # Observe Changes
            #
            # 結構異動觀察者

            observeChanges: ->
                if not 'MutationObserver' of window
                    module.debug '找不到樹狀結構變更觀測者，略過結構監聽動作', element
                    return
                observer = new MutationObserver (mutations) ->
                    module.debug 'DOM 樹狀結構已變更，更新快取資料'
                    module.refresh()
                observer.observe element,
                    childList : true
                    subtree   : true
                module.debug '已設置 DOM 樹狀結構異動觀察者', observer

            # Refresh
            #
            # 更新資料

            refresh: ->
                $dimmer = if $this.hasClass ClassName.DIMMER then $this else $this.find Selector.DIMMER

            # Destroy
            #
            # 摧毀

            destroy: ->
                module.debug '摧毀淡化幕', element
                $this.removeData MODULE_NAMESPACE
                     .off        EVENT_NAMESPACE

            # Invoke
            #
            # 模組呼叫點

            invoke: (query, passedArguments, context) ->
                object          = instance
                maxDepth        = undefined
                found           = undefined
                response        = undefined
                passedArguments = passedArguments or queryArguments
                context         = element or context

                # 如果語法是字串，本地區域也有被定義的話。
                if typeof query is 'string' and object isnt undefined
                    # 將語法以空白分隔。
                    query    = query.split /[\. ]/
                    # 取得此語法的深度。
                    maxDepth = query.length - 1
                    # 解析語法的每個片段。
                    for value, depth in query
                        # 將語法轉換成駝峰式大小寫，用以對應本地模組的函式名稱。
                        camelCaseValue = if depth isnt maxDepth then value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) else query
                        # 如果此駝峰是大小寫有對應到模組中的物件，而且語法還未到底，那麼就依照此物件遞迴搜尋。
                        if ts.isPlainObject(object[camelCaseValue]) and depth isnt maxDepth
                            object = object[camelCaseValue]
                        # 如果語法駝峰式大小寫有對應到模組的一個函式，則使用該函式。
                        else if object[camelCaseValue] isnt undefined
                            found = object[camelCaseValue]
                            break
                        # 如果語法有對應到模組中的物件，而且語法還未到底，那麼就依照此物件遞迴搜尋。
                        else if ts.isPlainObject(object[value]) and depth isnt maxDepth
                            object = object[value]
                        # 如果語法有對應一個函式，則使用該函式。
                        else if object[value] isnt undefined
                            found = object[value]
                            break
                        # 如果語法沒有對應到任何東西則表示錯誤。
                        else
                            module.error Error.METHOD, query
                            break
                # 決定回應的結果。
                switch
                    # 當找到的對應物件是個函式，就呼叫該函式並取得其結果。
                    when typeof found is 'function'
                        response = found.apply context, passedArguments
                    # 當找到的物件不是函式，就當其為結果。
                    when found isnt undefined
                        response = found
                # 決定如何處置欲回傳的值。
                switch
                    # 當回傳的值是一個陣列，就將回應結果推入回傳值陣列中。
                    when Array.isArray returnedValue
                        returnedValue.push response
                    # 如果回傳的值不是陣列，則建立一個陣列並包含自己和回應結果。
                    when returnedValue isnt undefined
                        returnedValue = [
                            returnedValue
                            response
                        ]
                    # 當有回應時，就將回傳值設為其回應結果。
                    when response isnt undefined
                        returnedValue = response
                # 回傳找到的物件。
                found

            # Debug
            #
            # 除錯訊息

            debug: ->
                return if not settings.debug or settings.silent
                module.debug = Function.prototype.bind.call console.info, console, "#{NAME}:"
                module.debug.apply console, arguments

            # Error
            #
            # 錯誤訊息

            error: ->
                return if settings.silent
                module.error = Function.prototype.bind.call console.error, console, "#{NAME}:"
                module.error.apply console, arguments

        # ------------------------------------------------------------------------
        # Tocas 核心安插
        # ------------------------------------------------------------------------

        if methodInvoked
            if instance is undefined
                module.initialize()
            module.invoke query

        else
            if instance isnt undefined
                instance.invoke 'destroy'
            module.initialize()

    return if returnedValue isnt undefined then returnedValue else ts
