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
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            # Initialize
            #
            # 初始化

            initialize: =>

            # Instantiate
            #
            # 實例化

            instantiate: =>

            # Observe Changes
            #
            # 結構異動觀察者

            observeChanges: =>

            # Refresh
            #
            # 更新資料

            refresh: =>

            # Destroy
            #
            # 摧毀

            destroy: ->

            # ------------------------------------------------------------------------
            # 自訂函式
            # ------------------------------------------------------------------------

            # Open
            #
            # 展開

            open: (index) ->

            # Close
            #
            # 閉合

            close: (index) ->

            # Close Others
            #
            # 閉合指定以外

            closeOthers: (index) ->

            # Close All
            #
            # 閉合所有

            closeAll: ->

            # Toggle
            #
            # 切換開合

            toggle: (index) ->

            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>

        # ------------------------------------------------------------------------
        # Tocas 核心安插
        # ------------------------------------------------------------------------