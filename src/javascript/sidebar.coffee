# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'sidebar'
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
    # 是否要在側邊欄出現的時候淡化頁面。
    dimPage       : false
    # 是否允許使用者點擊頁面關閉側邊欄。
    closable      : true
    # 是否要在側邊欄出現的時候所動頁面捲軸滾動。
    scrollLock    : false
    # 預設的顯示模式。（`auto` 為電腦常駐、行動裝置隱藏、`true` 為常駐、`false` 為預設隱藏）
    visible       : false
    # 當側邊欄剛出現時所會呼叫的回呼函式。
    onVisible     : =>
    # 當側邊欄出現動畫結束時所會呼叫的回呼函式。
    onShow        : =>
    # 當側邊欄可見狀態有所變更且動畫執行完畢時所會呼叫的回呼函式。
    onChange      : =>
    # 當側邊欄關閉時所會呼叫的回呼函式。
    onHide        : =>
    # 當側邊欄關閉動畫結束時所會呼叫的回呼函式。
    onHidden      : =>

# 標籤。
Attribute =
    SCROLL_LOCK: 'data-scroll-lock'

# 事件名稱。
Event =
    VISIBLE     : "visible#{EVENT_NAMESPACE}"
    SHOW        : "show#{EVENT_NAMESPACE}"
    CHANGE      : "change#{EVENT_NAMESPACE}"
    HIDE        : "hide#{EVENT_NAMESPACE}"
    HIDDEN      : "hidden#{EVENT_NAMESPACE}"
    CLICK       : "click#{EVENT_NAMESPACE}"
    RESIZE      : "resize#{EVENT_NAMESPACE}"
    TOUCHSTART  : "touchstart#{EVENT_NAMESPACE}"
    ANIMATIONEND: 'animationend'

# 樣式名稱。
ClassName =
    VISIBLE     : 'visible'
    ACTIVE      : 'active'
    DIMMED      : 'dimmed'
    ANIMATING   : 'animating'
    RESPONSIVELY: 'responsively'
    OVERLAPPED  : 'overlapped'

# 選擇器名稱。
Selector =
    PUSHER: '.ts.pusher'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $pusher        = ts()
    duration       = 450

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        set:
            lock: (value) =>
                if value
                    $pusher.attr Attribute.SCROLL_LOCK, 'true'
                else
                    $pusher.removeAttr Attribute.SCROLL_LOCK
            animating: (value) =>
                if value
                    $this.addClass ClassName.ANIMATING
                else
                    $this.removeClass ClassName.ANIMATING
            visible: (value) =>
                if value
                    $this.addClass ClassName.VISIBLE
                else
                    $this.removeClass ClassName.VISIBLE
            overlapped: (value) =>
                if value
                    $this.addClass ClassName.OVERLAPPED
                else
                    $this.removeClass ClassName.OVERLAPPED

        dim:
            page: (value) =>
                if value
                    $pusher.addClass ClassName.DIMMED
                else
                    $pusher.removeClass ClassName.DIMMED

        show: =>
            if module.is.visible()
                return
            module.trigger.visible()
            if settings.scrollLock
                module.set.lock true
            if settings.dimPage
                module.dim.page true
            if module.is.responsiveDevice()
                if settings.responsive.dimPage
                    module.dim.page true
                if settings.responsive.overlapped
                    module.set.overlapped true
            module.animate.show =>
                module.trigger.show()
                module.trigger.change()

        hide: =>
            if module.is.hidden()
                return
            defaultVisible = false
            module.trigger.hide()
            if settings.dimPage
                module.dim.page false
            if module.is.responsiveDevice()
                if settings.responsive.dimPage
                    module.dim.page false
                if settings.responsive.overlapped
                    module.set.overlapped false
            module.animate.hide =>
                module.trigger.hidden()
                module.trigger.change()

        toggle: =>
            if module.is.hidden()
                module.show()
            else
                module.hide()
            return $allModules

        animate:
            show: (callback) =>
                module.set.animating true
                module.set.visible   true
                $this
                    .off Event.ANIMATIONEND
                    .one Event.ANIMATIONEND, =>
                        module.set.animating false
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration
            hide: (callback) =>
                module.set.animating true
                module.set.visible false
                $this
                    .off Event.ANIMATIONEND
                    .one Event.ANIMATIONEND, =>
                        module.set.animating false
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration

        attach:
            events: (selector) =>
                ts(selector).on Event.CLICK, =>
                    module.toggle()

        is:
            visible: =>
                $this.hasClass ClassName.VISIBLE
            hidden: =>
                not module.is.visible()
            responsiveDevice: =>
                device = ts.device().device
                if not settings.responsive
                    return false
                for value in settings.responsive.hidden
                    return true if value is device
                return false
            responsive: =>
                settings.responsive isnt false
            animating: =>
                $this.hasClass ClassName.ANIMATING
            closable: =>
                settings.closable is true

        repaint: =>
            if module.is.responsiveDevice()
                module.hide()
            else
                module.show()

        trigger:
            visible: =>
                $this.trigger Event.VISIBLE, element
            show: =>
                $this.trigger Event.SHOW, element
            change: =>
                $this.trigger Event.CHANGE, element
            hide: =>
                $this.trigger Event.HIDE, element
            hidden: =>
                $this.trigger Event.HIDDEN, element

        bind:
            responsive: =>
                ts(window).on Event.RESIZE, =>
                    module.repaint()

            events: =>
                $pusher.on "#{Event.CLICK} #{Event.TOUCHSTART}", (event, context) =>
                    debug '發生 CLICK 或 TOUCHSTART 事件', context
                    if module.is.responsive() and not module.is.responsiveDevice()
                        return
                    if not module.is.animating() and module.is.closable()
                        module.hide()

                $this.on Event.VISIBLE, (event, context) =>
                    debug '發生 VISIBLE 事件', context
                    settings.onVisible.call context, event
                $this.on Event.SHOW, (event, context) =>
                    debug '發生 SHOW 事件', context
                    settings.onShow.call context, event
                $this.on Event.CHANGE, (event, context) =>
                    debug '發生 CHANGE 事件', context
                    settings.onChange.call context, event
                $this.on Event.HIDE, (event, context) =>
                    debug '發生 HIDE 事件', context
                    settings.onHide.call context, event
                $this.on Event.HIDDEN, (event, context) =>
                    debug '發生 HIDDEN 事件', context
                    settings.onHidden.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化側邊欄', element
            $pusher = ts Selector.PUSHER
            module.bind.events()
            if module.is.responsive()
                module.bind.responsive()
                module.repaint()
            if module.is.visible()
                settings.closable = false
        instantiate: =>
            debug '實例化側邊欄', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀側邊欄', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules