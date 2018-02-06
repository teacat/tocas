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
        # 當幻燈片變更時所呼叫的函式。
        onChange      : ->
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
        #
        metadata:
            sliding: 'sliding'
            index  : 'index'
            content: 'content'



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
        ITEM           : '.item'
        CHILD_ITEM     : ':scope > .item'
        CONTROLS_LEFT  : '.controls > .left'
        CONTROLS_RIGHT : '.controls > .right'
        ITEMS_ITEM     : '.items > .item'
        ACTIVE_ITEM    : '.items > .item.active'
        FIRST_ITEM     : '.items > .item:first-child'
        LAST_ITEM      : '.items > .item:last-child'
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
        duration = 700
        metadata = Settings.metadata

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            # Play
            #
            # 播放

            play: ->
                module.debug '播放幻燈片', element
                # 如果已經有設置計時器就表示正在播放（或計時器正暫停中）。
                if module.has.timer()
                    # 重新啟動計時。
                    module.start.timer()
                else
                    module.set.timer()



            # Set
            #
            # 設置

            set:
                timer: ->
                    $this.setTimer
                        name    : 'autoplay'
                        callback: module.next
                        interval: 5000
                        looping : true
                        visible : true

                sliding: (bool) ->
                    $this.data metadata.sliding, bool
                index: (index) ->
                    $this.data metadata.index, index
                content: (content) ->
                    $this.data metadata.content, content

            # Get
            #
            # 取得

            get:
                index: ->
                    $this.data metadata.index
                content: ->
                    $this.data metadata.content

            start:
                timer: ->
                    $this.playTimer 'autoplay'

            stop:
                timer: ->
                    $this.pauseTimer 'autoplay'

            has:
                timer: ->
                    $this.hasTimer 'autoplay'

            remove:
                timer: ->
                    $this.removeTimer 'autoplay'

            should:
                autoplay: ->
                    settings.autoplay

            is:
                sliding: ->
                    $this.data metadata.sliding

            # Pause
            #
            # 暫停

            pause: ->
                module.debug '暫停幻燈片', element
                # 移除這個計時器。
                module.stop.timer()

            # Slide
            #
            # 往指定方向滑行

            slide: (direction, $nextElement) ->
                module.debug '幻燈片往指定方向切換', direction, $nextElement, element
                # 如果正在滑動中，則取消本次的指令。
                if module.is.sliding()
                    return
                # 標記幻燈片正在滑動中，避免重複執行發生問題。
                module.set.sliding true
                # 取得幻燈片移動的方向該往左邊還是右邊。
                switch direction
                    when 'next'
                        movingDirection = 'left'
                    when 'previous'
                        movingDirection = 'right'
                # 取得目前正在顯示的幻燈片。
                $current = $this.find Selector.ACTIVE_ITEM
                # 依照方向來決定下一個幻燈片是哪個元素，如果沒有下個元素則為最後（或第一個），那麼就取得最邊緣的那個元素。
                switch
                    when $nextElement isnt undefined
                        $next = $nextElement
                    when direction is 'next'
                        $next = $current.next()
                        $next = if $next.length is 0 then $this.find(Selector.FIRST_ITEM) else $next
                    else
                        $next = $current.prev()
                        $next = if $next.length is 0 then $this.find(Selector.LAST_ITEM) else $next
                # 移除所有指示器的啟用樣式，然後替指定指示器加上已啟用樣式。
                $this.find(Selector.INDICATORS_ITEM).removeClass(ClassName.ACTIVE).eq($next.index()).addClass ClassName.ACTIVE
                # 替下一個幻燈片加上順序並重新繪製。
                $next.addClass(direction).reflow()
                # 替目前的幻燈片加上移動效果。
                $current.addClass "#{ClassName.MOVING} #{movingDirection}"
                # 我們同時也移動下一個幻燈片進來。
                $next.addClass "#{ClassName.MOVING} #{movingDirection}"
                # 設置新的索引。
                module.set.index $next.index()
                # 呼叫指定事件。
                $this.trigger Event.CHANGE, element, module.get.index()
                # 當目前舊的幻燈片移動完畢時。
                $current
                    .one 'transitionend', =>
                        # 順便移除下個幻燈片的移動效果，並且加上已啟用樣式。
                        $next.removeClass("#{ClassName.MOVING} #{movingDirection} #{direction}").addClass ClassName.ACTIVE
                        # 同時移除這個舊的幻燈片樣式。
                        $current.removeClass "#{ClassName.ACTIVE} #{ClassName.MOVING} #{movingDirection} #{direction}"
                        # 滑動結束。
                        module.set.sliding false
                    .emulate 'transitionend', duration

            # Slide To
            #
            # 滑到指定幻燈片

            slideTo: (index) ->
                module.debug '滑到指定幻燈片索引', index, element
                $eqItem = $this.find(Selector.ITEMS_ITEM).eq index
                current = module.get.index()
                # 如果沒有指定的幻燈片索引或與現在的索引相同則離開。
                if $eqItem.length is 0 or current is index
                    return
                else
                    # 比對目前的索引還有準備跳往的索引來決定應該往又還是往左滑。
                    direction = if index > current then 'next' else 'previous'
                    module.slide direction, $eqItem

            # Next
            #
            # 下一張

            next: ->
                module.debug '下一張幻燈片', element
                module.slide 'next'

            # Previous
            #
            # 上一張

            previous: ->
                module.debug '上一張幻燈片', element
                module.slide 'previous'

            # Get Index
            #
            # 取得目前幻燈片索引

            getIndex: ->
                module.debug '取得幻燈片索引', module.get.index(), element
                module.get.index()

            # Templates
            #
            # 模板

            templates:

                # Controls
                #
                # 控制按鈕

                controls: (left, right) -> """
                    <a href="#!" class="left"><i class="#{left} icon"></i></a>
                    <a href="#!" class="right"><i class="#{right} icon"></i></a>
                """

            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>
                    module.debug '綁定事件', element
                    $this.on Event.CHANGE, (event, context, index) ->
                        settings.onChange.call context, event, index

                # Control Events
                #
                # 控制按鈕事件

                controlEvents: =>
                    module.debug '綁定控制按鈕事件', element
                    $this.on Event.CLICK, Selector.CONTROLS_LEFT, =>
                        module.previous()
                    $this.on Event.CLICK, Selector.CONTROLS_RIGHT, =>
                        module.next()

                # Indicator Events
                #
                # 指示器事件

                indicatorEvents: ($indicators) =>
                    module.debug '綁定指示器事件', element
                    $indicators.find(Selector.ITEM).each (element, index) =>
                        ts(element).on Event.CLICK, => module.slideTo index

            # ------------------------------------------------------------------------
            # 模組核心
            # ------------------------------------------------------------------------

            # Initialize
            #
            # 初始化

            initialize: ->
                module.debug '初始化幻燈片', element
                module.bind.events()
                # 保存這個幻燈片的內容，供日後若需摧毀可重生。
                module.set.content $this.html()
                # 建立項目容器，用來包裹所有的幻燈片。
                $items = ts('<div>').addClass ClassName.ITEMS
                # 取得使用者已經擺置的幻燈片。
                $children = $this.find Selector.CHILD_ITEM
                # 給第一個幻燈片啟用樣式。
                $children.eq(0).addClass ClassName.ACTIVE
                # 將這些幻燈片移動到項目容器中。
                $items.append $children
                # 清除原先幻燈片的所有內容。
                $this.html ''
                # 如果有控制元素設置。
                if settings.control
                    overlapped = if settings.control.overlapped                 then ClassName.OVERLAPPED else ''
                    compact    = if settings.control.style is ClassName.COMPACT then ClassName.COMPACT    else ''
                    # 建立控制元素，並且加上指定的圖示。
                    left           = settings.control.icon.left
                    right          = settings.control.icon.right
                    controlClasses = "#{overlapped} #{compact} #{ClassName.CONTROLS}"
                    $control       = ts('<div>').addClass(controlClasses).html module.templates.controls left, right
                    # 移動到幻燈片容器中。
                    $this.append $control
                    module.bind.controlEvents()
                # 將幻燈片容器在控制元素之後插入，
                # 這樣才能透過控制元素的樣式來取決幻燈片容器的樣式。
                # CSS Selector 的 `x + x`。
                $this.append $items
                # 如果有指示器設置。
                if settings.indicator
                    overlapped = if settings.indicator.overlapped                   then ClassName.OVERLAPPED else ''
                    navigable  = if settings.indicator.navigable                    then ClassName.NAVIGABLE  else ''
                    style      = if settings.indicator.style isnt ClassName.ROUNDED then ClassName.CIRCULAR   else ''
                    # 建立指示器元素，並且決定是否可供導覽點按。
                    $indicators = ts('<div>').addClass "#{navigable} #{overlapped} #{style} #{ClassName.INDICATORS}"
                    # 替幻燈片產生指示器的元素。
                    for index in [1..$children.length]
                        active = if index is 1 then " #{ClassName.ACTIVE}" else ''
                        $indicators.append ts('<div>').addClass "#{active} #{ClassName.ITEM}"
                    # 如果可供導覽點按，則綁定點擊事件。
                    if settings.indicator.navigable
                        module.bind.indicatorEvents $indicators
                # 移動到幻燈片容器中。
                $this.append $indicators
                # 初始化索引為零。
                module.set.index 0
                # 如果要自動播放的話則建立計時器。
                if module.should.autoplay()
                    module.play()
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
                # 移除所有計時器。
                module.remove.timer()
                # 重生幻燈片原本的 HTML 內容。
                $this.html module.get.content()
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
