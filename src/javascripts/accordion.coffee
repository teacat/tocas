# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
Name = 'Accordion'

# 模組設定。
Settings =
    # 是否僅允許單個手風琴只有一個分頁能被打開。
    exclusive     : true
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
    OPENING: "opening"
    OPEN   : "open"
    CLOSING: "closing"
    CLOSE  : "close"
    CHANGE : "change"
    CLICK  : "click"

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

ts.register {Name, Error, Settings}, ({$allModules, $module, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    Data =
        $title  : $module.find Selector.TITLE
        $content: $module.find Selector.CONTENT

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =

        #
        #
        #
        open: (index) =>
            if module.is.active index
                return
            if settings.exclusive
                module.closeAll()
            module.trigger.open index
            module.set.active   index
            return $allModules

        #
        #
        #
        close: (index) =>
            if module.is.hidden index
                return
            module.trigger.close index
            module.set.hidden    index
            if settings.closeNested
                module.closeChildren()
            return $allModules

        #
        #
        #
        closeChildren: =>
            $module.find(Selector.ACCORDION).accordion 'close all'

        #
        #
        #
        closeOthers: (index) =>
            for i in [0..$title.length-1]
                if i isnt index
                    module.close i
            return $allModules

        #
        #
        #
        closeAll: =>
            module.close i for i in [0..$title.length-1]
            return $allModules

        #
        #
        #
        toggle: (index) =>
            if module.is.active index
                if settings.collapsible
                    module.close index
            else
                module.open index
            return $allModules

        trigger:
            open: (index) =>
                $module.trigger Event.OPENING, $content.eq(index).get()
                $module.trigger Event.OPEN   , $content.eq(index).get()
                $module.trigger Event.CHANGE , $content.eq(index).get()
            close: (index) =>
                $module.trigger Event.CLOSING, $content.eq(index).get()
                $module.trigger Event.CLOSE  , $content.eq(index).get()
                $module.trigger Event.CHANGE , $content.eq(index).get()

        is:
            active: (index) =>
                $title
                    .eq       index
                    .hasClass ClassName.ACTIVE
            hidden: (index) =>
                not module.is.active index

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

        bind:
            events: =>
                $module.on Event.CLICK, Selector.TITLE, ->
                    debug '發生 CLICK 事件', element, @
                    module.toggle $title.indexOf @
                $module.on Event.OPENING, (event, context) =>
                    debug '發生 OPENING 事件', context
                    settings.onOpening.call context, event
                $module.on Event.OPEN, (event, context) =>
                    debug '發生 OPEN 事件', context
                    settings.onOpen.call context, event
                $module.on Event.CLOSING, (event, context) =>
                    debug "發生 CLOSING 事件", context
                    settings.onClosing.call context, event
                $module.on Event.CLOSE, (event, context) =>
                    debug "發生 CLOSE 事件", context
                    settings.onClose.call context, event
                $module.on Event.CHANGE, (event, context) =>
                    debug "發生 CHANGE 事件", context
                    settings.onChange.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            module.bind.events()

        instantiate: =>

        refresh: =>
            $title   = $module.find Selector.TITLE
            $content = $module.find Selector.CONTENT
            return $allModules

        destroy: =>
            $module.removeData module_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules