# Carousel
#
# 幻燈片

ts.fn.carousel = value: (parameters) ->

    # ------------------------------------------------------------------------
    # 變數與常數設置
    # ------------------------------------------------------------------------

    # 模組名稱。
    NAME             = 'carousel'
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
        # 幻燈片換到下一張的毫秒相隔時間。
        interval      : 4000
        # 是否要自動播放。
        autoplay      : true
        # 指示器選項。
        indicator  :
            # 指示器的外觀，`rounded` 為圓角矩形，`circular` 為圓形。
            style     : 'rounded'
            # 是否可供轉跳。
            navigable : true
            # 是否疊加在幻燈片上。
            overlapped: true
        # 控制器選項。
        control:
            # 控制選項的樣式，`compact` 為較小的按鈕，`full` 為整個側邊區塊
            size     : 'compact'
            # 是否疊加在幻燈片上。
            overlapped: true
            # 圖示選項。
            icon:
                # 左圖示的圖示名稱。
                left : 'chevron left'
                # 右圖示的圖示名稱
                right: 'chevron right'
        # 當幻燈片變更時所呼叫的函式。
        onChange      : ->

    # 事件名稱。
    Event =
        CHANGE : "change#{EVENT_NAMESPACE}"
        CLICK  : "click#{EVENT_NAMESPACE}"

    # 樣式名稱。
    ClassName =
        COMPACT   : 'compact'
        ACTIVE    : 'active'
        ITEMS     : 'items'
        ITEM      : 'item'
        OVERLAPPED: 'overlapped'
        CONTROLS  : 'controls'
        NAVIGABLE : 'navigable'
        ROUNDED   : 'rounded'
        CIRCULAR  : 'circular'
        INDICATORS: 'indicators'
        MOVING    : 'moving'

    # 選擇器名稱。
    Selector =
        ITEM          : '.item'
        CHILD_ITEM    : ':scope > .item'
        CONTROLS_LEFT : '.controls > .left'
        CONTROLS_RIGHT: '.controls > .right'
        ITEMS_ITEM    : '.items > .item'
        ACTIVE_ITEM   : '.items > .item.active'
        FIRST_ITEM    : '.items > .item:first-child'
        LAST_ITEM     : '.items > .item:last-child'
        INDICATORS_ITEM: '.indicators > .item'

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
        settings = if ts.isPlainObject(parameters) then {Settings..., parameters...} else {Settings...}

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            # Play
            #
            # 播放

            play: ->
                module.debug '播放幻燈片', element

            # Pause
            #
            # 暫停

            pause: ->
                module.debug '暫停幻燈片', element

            # Slide To
            #
            # 滑到指定幻燈片

            slideTo: (index) ->
                module.debug '滑到指定幻燈片索引', index, element

            # Next
            #
            # 下一張

            next: ->
                module.debug '下一張幻燈片', element

            # Previous
            #
            # 上一張

            previous: ->
                module.debug '上一張幻燈片', element

            # Get Index
            #
            # 取得目前幻燈片索引

            getIndex: ->
                module.debug '取得幻燈片索引', element



            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>
                    $this.on Event.CLICK, Selector.TITLE, ->
                        module.toggle $title.indexOf @
                    $this.on Event.OPENING, (event, context) ->
                        settings.onOpening.call context, event
                    $this.on Event.OPEN, (event, context) ->
                        settings.onOpen.call context, event
                    $this.on Event.CLOSING, (event, context) ->
                        settings.onClosing.call context, event
                    $this.on Event.CLOSE, (event, context) ->
                        settings.onClose.call context, event
                    $this.on Event.CHANGE, (event, context) ->
                        settings.onChange.call context, event

            # ------------------------------------------------------------------------
            # 模組核心
            # ------------------------------------------------------------------------

            # Initialize
            #
            # 初始化

            initialize: ->
                module.debug '初始化幻燈片', element
                module.bind.events()
                if settings.observeChanges
                    module.observeChanges()
                module.instantiate()

            # Instantiate
            #
            # 實例化

            instantiate: ->
                module.debug '實例化幻燈片', element
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
                $title   = $this.find Selector.TITLE
                $content = $this.find Selector.CONTENT

            # Destroy
            #
            # 摧毀

            destroy: ->
                module.debug '摧毀幻燈片', element
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
