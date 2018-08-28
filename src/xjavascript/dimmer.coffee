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
    # 消音所有提示，甚至是錯誤訊息。
    silent        : false
    # 顯示除錯訊息。
    debug         : true
    # 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true
    # 可否在點擊的時候關閉。
    closable : false
    # 當出現時會呼叫的回呼函式。
    onShow   : =>
    # 當隱藏時會呼叫的回呼函式。
    onHide   : =>
    # 當出現或隱藏時會呼叫的回呼函式。
    onChange : =>
    # 當淡化幕自動產生時所要追加的樣式類別，例如 `inverted`。
    variation: ''

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
    TS_DIMMER: 'ts dimmer'

# 選擇器名稱。
Selector =
    DIMMER: ':scope > .ts.dimmer'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $dimmer = undefined

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: =>
            debug '顯示淡化幕', element
            if module.is.active()
                return
            $this.trigger Event.SHOW, element
            $this.trigger Event.CHANGE, element
            module.set.active true

        hide: =>
            debug '隱藏淡化幕', element
            if module.is.hidden()
                return
            $this.trigger Event.HIDE, element
            $this.trigger Event.CHANGE, element
            module.set.active false

        toggle: =>
            debug '切換淡化幕', element
            if module.is.active()
                module.hide()
            else
                module.show()

        create: =>
            if module.has.dimmer()
                return
            ts '<div>'
                .addClass "#{ClassName.TS_DIMMER} #{settings.variation}"
                .prependTo $this
            module.refresh()
            $dimmer.repaint()

        is:
            dimmer: =>
                $this.hasClass ClassName.DIMMER
            active: =>
                $dimmer.hasClass ClassName.ACTIVE
            hidden: =>
                not $dimmer.hasClass ClassName.ACTIVE
            animating: =>
                $dimmer.hasClass ClassName.ANIMATING

        set:
            active: (bool) =>
                if bool
                    $dimmer.addClass ClassName.ACTIVE
                else
                    $dimmer.removeClass ClassName.ACTIVE

        get:
            dimmer: =>
                $dimmer.get()

        has:
            dimmer: =>
                $this.find(Selector.DIMMER).length isnt 0

        bind:
            events: =>
                $this.on Event.SHOW, (event, context) =>
                    debug "發生 SHOW 事件", context
                    settings.onShow.call context, event
                $this.on Event.HIDE, (event, context) =>
                    debug "發生 HIDE 事件", context
                    settings.onHide.call context, event
                $this.on Event.CHANGE, (event, context) =>
                    debug "發生 CHANGE 事件", context
                    settings.onChange.call context, event


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化淡化幕', element
            module.bind.events()
            if not module.is.dimmer() and not module.has.dimmer()
                module.create()
            module.refresh()

        instantiate: =>
            debug '實例化淡化幕', element

        refresh: =>
            $dimmer = if $this.hasClass ClassName.DIMMER then $this else $this.find Selector.DIMMER
            return $allModules

        destroy: =>
            debug '摧毀淡化幕', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules