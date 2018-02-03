# Accordion
#
# 手風琴

ts.fn.accordion = value: ->

    # ------------------------------------------------------------------------
    # 變數與常數設置
    # ------------------------------------------------------------------------

    # 模組名稱。
    NAME             = 'accordion'
    # 模組事件鍵名。
    EVENT_NAMESPACE  = ".#{Name}"
    # 模組命名空間。
    MODULE_NAMESPACE = "module-#{Name}"

    # 模組設定。
    Settings =
        # 是否僅允許單個手風琴只有一個分頁能被打開。
        exclusive  : true
        # 消音所有提示，甚至是錯誤訊息。
        silent     : false
        # 顯示除錯訊息。
        debug      : true
        # 展開的手風琴是否可以被關閉。
        collapsible: false
        # 當手風琴被關閉時，是否一同閉合子手風琴。
        closeNested: true
        # 當手風琴正在展開時所會呼叫的函式。
        onOpening: ->
        # 當手風琴展開時所會呼叫的函式。
        onOpen   : ->
        # 當手風琴正在關閉時所會呼叫的函式。
        onClosing: ->
        # 當手風琴關閉時所會呼叫的函式。
        onClose  : ->
        # 當手風琴被切換開關時所會呼叫的函式。
        onChange : ->

    # 事件名稱。
    Event =
        OPENING: "opening#{EVENT_NAMESPACE}"
        OPEN   : "open#{EVENT_NAMESPACE}"
        CLOSING: "closing#{EVENT_NAMESPACE}"
        CLOSE  : "close#{EVENT_NAMESPACE}"
        CHANGE : "change#{EVENT_NAMESPACE}"
        CLICK  : "click#{EVENT_NAMESPACE}"

    # 樣式名稱。
    ClassName =
        ACTIVE   : 'active'
        ANIMATING: 'animating'

    # 選擇器名稱。
    Selector =
        TITLE         : '.title'
        CONTENT       : '.content'
        ACCORDION     : '.ts.accordion'
        ACTIVE_CONTENT: '.active.content'
        ACTIVE        : '.active'

    ts(@).each ->

        # ------------------------------------------------------------------------
        # 區域變數
        # ------------------------------------------------------------------------

        $this    = ts @
        settings = Settings

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            # Initialize
            #
            # 初始化

            initialize: ->

            # Instantiate
            #
            # 實例化

            instantiate: ->

            # Observe Changes
            #
            # 結構異動觀察者

            observeChanges: ->
                if not 'MutationObserver' in window
                    module.debug "找不到樹狀結構變更觀測者，略過結構監聽動作"
                    return
                observer = new MutationObserver (mutations) ->
                    module.debug "DOM 樹狀結構已變更，更新快取資料"
                    module.refresh()
                observer.observe element,
                    childList : true
                    subtree   : true
                module.debug "已設置 DOM 樹狀結構異動觀察者", observer

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
                module.debug '摧毀手風琴', $this
                $this.removeData MODULE_NAMESPACE
                     .off        EVENT_NAMESPACE

            # Invoke
            #
            # 模組呼叫點

            invoke: (query, passedArguments, context) ->

            # ------------------------------------------------------------------------
            # 自訂函式
            # ------------------------------------------------------------------------

            # Open
            #
            # 展開

            open: (index) ->
                module.debug '開啟手風琴分頁', index, $this
                $t = $title.eq   index
                $c = $content.eq index

                if $t.hasClass ClassName.ACTIVE
                    return

                if settings.exclusive
                    module.debug '由於手風琴分頁同時間僅能有一個打開，因此關閉其他分頁', index, $this
                    module.closeAll()

                $this.trigger Event.OPENING, $c.get()
                $this.trigger Event.OPEN   , $c.get()
                $this.trigger Event.CHANGE , $c.get()

                $t.addClass ClassName.ACTIVE
                $c.addClass ClassName.ACTIVE

            # Close
            #
            # 閉合

            close: (index) ->
                module.debug '關閉手風琴分頁', index, $this
                $t = $title.eq   index
                $c = $content.eq index

                if not $t.hasClass ClassName.ACTIVE
                    return

                $this.trigger Event.CLOSING, $c.get()
                $this.trigger Event.CLOSE  , $c.get()
                $this.trigger Event.CHANGE , $c.get()

                $t.removeClass ClassName.ACTIVE
                $c.removeClass ClassName.ACTIVE

                # 如果需要的話，一同關閉子手風琴。
                if settings.closeNested
                    module.debug '關閉子手風琴因應設定', index, $this
                    ts($this.find(Selector.ACCORDION)).accordion 'close all'

            # Close Others
            #
            # 閉合指定以外

            closeOthers: (index) ->
                module.debug '關閉指定手風琴分頁以外的其他分頁', index, $this
                module.closeAll()
                module.open index

            # Close All
            #
            # 閉合所有

            closeAll: ->
                module.debug '關閉所有手風琴分頁', $this
                module.close i for i in [0..$this.find(Selector.TITLE).length-1]

            # Toggle
            #
            # 切換開合

            toggle: (index) ->
                module.debug '切換手風琴分頁', index, $this
                $t = $title.eq index

                if $t.hasClass ClassName.ACTIVE
                    if not settings.collapsible
                        module.debug '手風琴不允許閉合唯一分頁，略過切換步驟', index, $this
                        return
                    module.close index
                else
                    module.open index

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
        # Tocas 核心安插
        # ------------------------------------------------------------------------