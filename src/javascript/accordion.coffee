# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'accordion'
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
    # 展開的手風琴是否可以被關閉。
    collapsible   : true
    # 當手風琴被關閉時，是否一同閉合子手風琴。
    closeNested   : true
    # 當手風琴正在展開時所會呼叫的函式。
    onOpening     : =>
    # 當手風琴展開時所會呼叫的函式。
    onOpen        : =>
    # 當手風琴正在關閉時所會呼叫的函式。
    onClosing     : =>
    # 當手風琴關閉時所會呼叫的函式。
    onClose       : =>
    # 當手風琴被切換開關時所會呼叫的函式。
    onChange      : =>

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

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $title   = $this.find Selector.TITLE
    $content = $this.find Selector.CONTENT

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =

        # Open
        #
        # 展開

        open: (index) =>
            if module.is.active index
                return
            if settings.exclusive
                debug '由於手風琴分頁同時間僅能有一個打開，因此關閉其他分頁', index, element
                module.closeAll()
            debug '開啟手風琴分頁', index, element
            module.trigger.open index
            module.set.active   index

            $allModules

        # Close
        #
        # 閉合

        close: (index) =>
            debug '關閉手風琴分頁', index, element
            if module.is.hidden index
                return
            module.trigger.close index
            module.set.hidden    index
            if settings.closeNested
                debug '關閉子手風琴因應設定', index, element
                module.closeChildren()

            $allModules

        # Close Children
        #
        # 關閉子手風琴

        closeChildren: =>
            $this.find(Selector.ACCORDION).accordion 'close all'

        # Close Others
        #
        # 閉合指定以外

        closeOthers: (index) =>
            debug '關閉指定手風琴分頁以外的其他分頁', index, element
            module.closeAll()

            $allModules

        # Close All
        #
        # 閉合所有

        closeAll: =>
            debug '關閉所有手風琴分頁', element
            module.close i for i in [0..$title.length-1]

            $allModules

        # Toggle
        #
        # 切換開合

        toggle: (index) =>
            debug '切換手風琴分頁', index, element
            if module.is.active index
                if settings.collapsible
                    module.close index
                else
                    debug '手風琴不允許閉合開啟的分頁，略過切換步驟', index, element
            else
                module.open index

            $allModules

        # Trigger
        #
        # 觸發

        trigger:

            open: (index) =>
                $this.trigger Event.OPENING, $content.eq(index).get()
                $this.trigger Event.OPEN   , $content.eq(index).get()
                $this.trigger Event.CHANGE , $content.eq(index).get()

            close: (index) =>
                $this.trigger Event.CLOSING, $content.eq(index).get()
                $this.trigger Event.CLOSE  , $content.eq(index).get()
                $this.trigger Event.CHANGE , $content.eq(index).get()

        # Is
        #
        # 是否

        is:

            active: (index) =>
                $title
                    .eq       index
                    .hasClass ClassName.ACTIVE

            hidden: (index) =>
                not module.is.active index

        # Set
        #
        # 設置

        set:

            active: (index) =>
                $title
                    .eq       index
                    .addClass ClassName.ACTIVE
                $content
                    .eq       index
                    .addClass ClassName.ACTIVE

            hidden: (index) =>
                $title
                    .eq          index
                    .removeClass ClassName.ACTIVE
                $content
                    .eq          index
                    .removeClass ClassName.ACTIVE

        # Bind
        #
        # 綁定

        bind:

            events: =>
                $this.on Event.CLICK, Selector.TITLE, ->
                    debug '發生 CLICK 事件', element, @
                    module.toggle $title.indexOf @
                $this.on Event.OPENING, (event, context) =>
                    debug '發生 OPENING 事件', context
                    settings.onOpening.call context, event
                $this.on Event.OPEN, (event, context) =>
                    debug '發生 OPEN 事件', context
                    settings.onOpen.call context, event
                $this.on Event.CLOSING, (event, context) =>
                    debug "發生 CLOSING 事件", context
                    settings.onClosing.call context, event
                $this.on Event.CLOSE, (event, context) =>
                    debug "發生 CLOSE 事件", context
                    settings.onClose.call context, event
                $this.on Event.CHANGE, (event, context) =>
                    debug "發生 CHANGE 事件", context
                    settings.onChange.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        # Initialize
        #
        # 初始化

        initialize: =>
            debug '初始化手風琴', element
            module.bind.events()

        # Instantiate
        #
        # 實例化

        instantiate: =>
            debug '實例化手風琴', element

        # Refresh
        #
        # 更新資料

        refresh: =>
            $title   = $this.find Selector.TITLE
            $content = $this.find Selector.CONTENT

            $allModules

        # Destroy
        #
        # 摧毀

        destroy: =>
            debug '摧毀手風琴', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE

            $allModules