# Checkbox
#
# 核取方塊

ts.fn.contextmenu = value: (parameters) ->

    # ------------------------------------------------------------------------
    # 變數與常數設置
    # ------------------------------------------------------------------------

    # 模組名稱。
    NAME             = 'contextmenu'
    # 模組事件鍵名。
    EVENT_NAMESPACE  = ".#{NAME}"
    # 模組命名空間。
    MODULE_NAMESPACE = "module-#{NAME}"

    # 模組設定。
    Settings =
        # 消音所有提示，甚至是錯誤訊息。
        silent        : false
        # 顯示除錯訊息。
        debug         : true
        # 監聽 DOM 結構異動並自動重整快取。
        observeChanges: true
        # 複合式選單應該出現在游標的哪個位置，如：`top left`、`top right`、`bottom left`、`bottom right`。
        position      : 'auto'
        # 複合式選單離游標的距離（單位：像素）。
        distance      :
            x: 0
            y: 0
        # 目標選擇器。
        target   : null
        # 複合式選單是否可因為使用者點擊選單外面而自動關閉。
        closable : true
        # 複合式選單是否可以因為在觸控裝置上長按而顯示。
        touch    : true
        # 當複合式選單出現時所會呼叫的回呼函式。
        onShow   : (target) ->
        # 當複合式選單隱藏時所會呼叫的回呼函式。
        onHide   : ->
        # 當複合式選單被停用時所會呼叫的回呼函式。
        onDisable: ->
        # 當複合式選單被啟用時所會呼叫的回呼函式。
        onEnable : ->
        # 當複合式選單被點擊項目時所會呼叫的回呼函式。
        onSelect : (value, element) ->

    # 事件名稱。
    Event =
        SHOW       : "show#{EVENT_NAMESPACE}"
        HIDE       : "hide#{EVENT_NAMESPACE}"
        DISABLE    : "disable#{EVENT_NAMESPACE}"
        ENABLE     : "enable#{EVENT_NAMESPACE}"
        SELECT     : "select#{EVENT_NAMESPACE}"
        CONTEXTMENU: "contextmenu#{EVENT_NAMESPACE}"
        CLICK      : "click#{EVENT_NAMESPACE}"

    # 樣式名稱。
    ClassName =
        VISIBLE  : 'visible'
        ANIMATING: 'animating'
        DOWNWARD : 'downward'
        UPWARD   : 'upward'
        RIGHTWARD: 'rightward'
        LEFTWARD : 'leftward'
        HIDDEN   : 'hidden'

    # 選擇器名稱。
    Selector =
        BODY: 'body'
        ITEM: ':scope > .item'

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

        $this           = ts @
        $item           = $this.find Selector.ITEM
        $body           = ts Selector.BODY
        element         = @
        instance        = $this.data MODULE_NAMESPACE
        settings        = if ts.isPlainObject(parameters) then ts.extend(Settings, parameters) else ts.extend(Settings)
        $parent         = settings.target or $this.parent()
        hiddenDuration  = 80
        visibleDuration = 10
        edgePadding     = 10

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            getMenuRect: =>
                module.set.visible()
                rect = element.getBoundingClientRect()
                module.set.hidden()
                return rect

            set:
                visible: ->
                    $this.addClass ClassName.VISIBLE
                hidden: ->
                    $this.removeClass ClassName.VISIBLE

            # Show
            #
            # 在目前游標或指定的位置顯示複合選單。
            show: (x, y) =>
                r = module.getMenuRect()
                w = window.innerWidth
                h = window.innerHeight

                if x < edgePadding
                    left = edgePadding
                else if x + r.width + edgePadding > w
                    left = w - r.width - edgePadding
                else
                    left = x

                if y < edgePadding
                    top = edgePadding
                else if y + r.height + edgePadding > h
                    top = h - r.height - edgePadding
                else
                    top = y

                $this
                    .css         'left', "#{left}px"
                    .css         'top' , "#{top}px"
                    .off         'animationend'
                    .removeClass ClassName.HIDDEN
                    .addClass    ClassName.VISIBLE, ClassName.ANIMATING
                    .one 'animationend', =>
                        $this.removeClass ClassName.ANIMATING
                    .emulate 'animationend', visibleDuration

            # Hide
            #
            # 隱藏複合選單。
            hide: =>
                module.debug '隱藏複合式選單', element
                if module.is.hidden()
                    return

                $this.trigger Event.HIDE, element

                $this
                    .off         'animationend'
                    .removeClass ClassName.VISIBLE
                    .addClass    ClassName.HIDDEN, ClassName.ANIMATING
                    .one         'animationend', =>
                        $this.removeClass ClassName.ANIMATING
                    .emulate 'animationend', hiddenDuration

            # Disable
            #
            # 停用複合選單的監聽事件，避免顯示。
            disable: =>

            # Enable
            #
            # 啟用複合選單的監聽事件。
            enable: =>





            # Is
            #
            # 是否

            is:
                disable: ->

                enable: ->

                visible: ->
                    $this.hasClass ClassName.VISIBLE
                hidden: ->
                    not $this.hasClass ClassName.VISIBLE

                closable: ->
                    settings.closable


            # Get
            #
            # 取得

            get:
                name: ->


            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>
                    $body.on Event.CLICK, ->
                        module.hide() if module.is.closable()
                    $parent.on Event.CONTEXTMENU, (event) ->
                        event.preventDefault()
                        return if module.is.disable()
                        module.show event.clientX, event.clientY
                    $item.on Event.CLICK, ->
                        $this.trigger Event.SELECT, element, ts(@).attr('data-value'), @
                    $this.on Event.SHOW, (event, context) ->
                        settings.onShow.call context, event
                    $this.on Event.HIDE, (event, context) ->
                        settings.onHide.call context, event
                    $this.on Event.SELECT, (event, context, value, element) ->
                        settings.onSelect.call context, event, value, element
                    $this.on Event.DISABLE, (event, context) ->
                        settings.onDisable.call context, event
                    $this.on Event.ENABLE, (event, context) ->
                        settings.onEnable.call context, event

            # ------------------------------------------------------------------------
            # 模組核心
            # ------------------------------------------------------------------------

            # Initialize
            #
            # 初始化

            initialize: ->
                module.debug '初始化複合式選單', element
                module.bind.events()
                if settings.observeChanges
                    module.observeChanges()
                module.instantiate()

            # Instantiate
            #
            # 實例化

            instantiate: ->
                module.debug '實例化複合式選單', element
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


            # Destroy
            #
            # 摧毀

            destroy: ->
                module.debug '摧毀複合式選單', element
                $this.removeData MODULE_NAMESPACE
                     .off        EVENT_NAMESPACE
                $body.off   EVENT_NAMESPACE
                $parent.off EVENT_NAMESPACE

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
