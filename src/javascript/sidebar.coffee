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
    # 是否要使用響應式側邊欄，能在指定裝置上常駐、隱藏。
    responsive    : #false
        # 非常駐的裝置。
        hidden: ['mobile', 'tablet']
        #
        dimPage   : true
        # 是否要在非常駐裝置上顯示時，以覆蓋的方式呈現。
        overlapped: true
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

Media =
    MOBILE      : '(max-width: 767px)'
    TABLET      : '(min-width: 768px) and (max-width: 991px)'
    COMPUTER    : '(min-width: 992px) and (max-width: 1199px)'
    LARGE_SCREEN: '(min-width: 1200px)'

Device =
    MOBILE      : 'mobile'
    TABLET      : 'tablet'
    COMPUTER    : 'computer'
    LARGE_SCREEN: 'large screen'

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
    defaultVisible = false
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
            if settings.scrollLock
                module.set.lock true
            if settings.dimPage
                module.dim.page true
            if module.is.responsiveDevice()
                if settings.responsive.dimPage
                    module.dim.page true
                if settings.responsive.overlapped
                    module.set.overlapped true
            module.animate.show()


        hide: =>
            if module.is.hidden()
                return
            if settings.dimPage
                module.dim.page false
            if module.is.responsiveDevice()
                if settings.responsive.dimPage
                    module.dim.page false
                if settings.responsive.overlapped
                    module.set.overlapped false
            module.animate.hide()

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
                    matched = false
                    device  = ts.device().device
                    if not settings.responsive
                        return false
                    for value in settings.responsive.hidden
                        matched = true if value is device
                    return matched
            responsive: =>
                settings.responsive isnt false
            animating: =>
                $this.hasClass ClassName.ANIMATING

        check:
            responsive: =>
                if module.is.responsiveDevice()
                    module.hide()
                else
                    module.show()

                #if module.is.responsiveDevice()
                #    module.hide()
                #else
                #    module.show()

        bind:
            responsive: =>
                ts(window).on Event.RESIZE, =>
                    module.check.responsive()
                #ts(window).on Media.MOBILE, (mq) =>
                #    return if not mq.matches
                #    module.check.responsive()
                #ts(window).on Media.TABLET, (mq) =>
                #    return if not mq.matches
                #    module.check.responsive()
                #ts(window).on Media.COMPUTER, (mq) =>
                #    return if not mq.matches
                #    module.check.responsive()
                #ts(window).on Media.LARGE_SCREEN, (mq) =>
                #    return if not mq.matches
                #    module.check.responsive()

            events: =>
                $pusher.on "#{Event.CLICK} #{Event.TOUCHSTART}", (event, context) =>
                    debug '發生 CLICK 或 TOUCHSTART 事件', context
                    if module.is.responsive() and not module.is.responsiveDevice()
                        return
                    if not module.is.animating()
                        module.hide()

                #$this.on Event.OPENING, (event, context) =>
                #    debug '發生 OPENING 事件', context
                #    settings.onOpening.call context, event
                #$this.on Event.OPEN, (event, context) =>
                #    debug '發生 OPEN 事件', context
                #    settings.onOpen.call context, event
                #$this.on Event.CLOSING, (event, context) =>
                #    debug "發生 CLOSING 事件", context
                #    settings.onClosing.call context, event
                #$this.on Event.CLOSE, (event, context) =>
                #    debug "發生 CLOSE 事件", context
                #    settings.onClose.call context, event
                #$this.on Event.CHANGE, (event, context) =>
                #    debug "發生 CHANGE 事件", context
                #    settings.onChange.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化側邊欄', element
            $pusher = ts Selector.PUSHER
            module.bind.events()
            if module.is.responsive()
                module.bind.responsive()
                module.check.responsive()
            if module.is.visible()
                defaultVisible = true
        instantiate: =>
            debug '實例化側邊欄', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀側邊欄', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules