# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'popup'
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
    # 欲使用的彈出式訊息元素選擇器（如果已經有先建立好的話），`false` 的話則是即時產生。
    popup         : false
    # 同時是否僅能有一個彈出式訊息出現在螢幕上。
    exclusive     : false
    # 彈出式訊息的邊界元素，彈出式訊息會試圖不要超過這個元素。
    boundary      : 'body'
    # 即時產生的彈出式訊息應該要被擺置在哪個元素內。
    context       : 'body'
    # 此彈出式訊息偵測畫面是否有捲動的元素選擇器，如果指定元素有捲動事件則會自動隱藏此彈出式訊息。
    scrollContext : 'body'
    # 彈出式訊息出現的位置，分別是 `垂直 水平`（如：`top left`、`bottom right`）。
    position      : 'auto'
    # 是否要將彈出式訊息產生在目標元素的節點後，這讓使用者能在 CSS 選擇器中以 `.elem + .popup` 方便樣式更改。
    inline        : false
    # 欲觸發彈出式訊息的事件，如：`click`、`hover`、`focus`。
    on            : 'hover'
    # 觸發的延遲毫秒數。
    delay         :
        # 欲顯示彈出式訊息前所需的毫秒數。
        show: 50
        # 隱藏彈出式訊息前所等待的毫秒數。
        hide: 0
    # 過場動畫。
    transition    : 'fade'
    # 過場動畫的演繹毫秒時間。
    duration      : 200
    # 游標是否能在彈出式訊息遊走，如：導覽式彈出選單。
    hoverable     : false
    # 是否能在點擊彈出式訊息以外的地方自動關閉。
    closable      : true
    # 是否要在指定捲動時自動隱藏此彈出式訊息。
    hideOnScroll  : 'auto'
    # 目標元素選擇器，彈出式訊息會以這個元素為主。
    target        : false
    # 欲套用的樣式名稱，以空白分隔。
    variation     : false
    # 內容純文字。
    content       : false
    # 標題純文字。
    title         : false
    # 彈出式訊息的 HTML 內容，如果採用此屬性則會忽略 `content` 與 `title`。
    html          : false
    # 當彈出式訊息被建立時所會呼叫的回呼函式。
    onCreate      : =>
    # 當彈出式訊息不再被需要且從頁面上移除時所會呼叫的回呼函式。
    onRemove      : =>
    # 當彈出式訊息開始顯示時所會呼叫的回呼函式，回傳 `false` 將會停止顯示。
    onShow        : => true
    # 當彈出式訊息動畫結束並顯示在畫面上時所會呼叫的回呼函式。
    onVisible     : =>
    # 當彈出式訊息開始消失時所會呼叫的回呼函式，回傳 `false` 將會避免消失。
    onHide        : => true
    # 當彈出式訊息已經完全消失時所會呼叫的回呼函式。
    onHidden      : =>
    # 當彈出式訊息無法在畫面上產生或放置（不合適尺寸）時所會呼叫的回呼函式。
    onUnplaceable : =>

# 事件名稱。
Event =
    CREATE      : "create#{EVENT_NAMESPACE}"
    REMOVE      : "remove#{EVENT_NAMESPACE}"
    SHOW        : "show#{EVENT_NAMESPACE}"
    VISIBLE     : "visible#{EVENT_NAMESPACE}"
    HIDE        : "hide#{EVENT_NAMESPACE}"
    HIDDEN      : "hidden#{EVENT_NAMESPACE}"
    UNPLACEABLE : "unplaceable#{EVENT_NAMESPACE}"
    CLICK       : "click#{EVENT_NAMESPACE}"
    FOCUS       : "focus#{EVENT_NAMESPACE}"
    MOUSEMOVE   : "mousemove#{EVENT_NAMESPACE}"
    MOUSEENTER  : "mouseenter#{EVENT_NAMESPACE}"
    MOUSELEAVE  : "mouseleave#{EVENT_NAMESPACE}"
    MOUSEOUT    : "mouseout#{EVENT_NAMESPACE}"
    ANIMATIONEND: 'animationend'

# 樣式名稱。
ClassName =
    TOP    : 'top'
    LEFT   : 'left'
    RIGHT  : 'right'
    BOTTOM : 'bottom'
    CENTER : 'center'
    VISIBLE: 'visible'
    ANIMATING: 'animating'
    HIDDEN : 'hidden'
    CUSTOM : 'custom'

#
Position =
    AUTO         : 'auto'
    TOP: 'top'
    BOTTOM: 'bottom'
    LEFT: 'left'
    RIGHT: 'right'
    TOP_LEFT     : 'top left'
    TOP_CENTER   : 'top center'
    TOP_RIGHT    : 'top right'
    LEFT  : 'left'
    CENTER: 'center'
    RIGHT : 'right'
    BOTTOM_LEFT  : 'bottom left'
    BOTTOM_CENTER: 'bottom center'
    BOTTOM_RIGHT : 'bottom right'

#
Status =
    VISIBLE: 'visible'
    HIDDEN : 'hidden'

#
Metadata =
    STATUS: 'status'

# 選擇器名稱。
Selector =
    BODY: 'body'

# 錯誤訊息。
Error = {}

# 過場動畫毫秒。
duration = 200

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $body     = ts(Selector.BODY)
    $popup    = ts()
    $boundary = ts()
    boundary  = null
    offset    = 20

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: (callback) =>
            if module.is.animating()
                return
            if module.is.visible()
                return
            module.animate.show =>
                module.set.animating false
                callback.call() if callback?
            return $allModules

        hide: (callback) =>
            if module.is.animating()
                return
            if module.is.hidden()
                return
            module.animate.hide =>
                module.set.animating false
                callback.call() if callback?
            return $allModules

        hideAll: =>

        get:
            popup: =>
                $popup.get()
            status: =>
                $this.data Metadata.STATUS
            position: =>
                if settings.position isnt Position.AUTO
                    return settings.position

                rect = $this.rect()

                boundaryRect = $boundary.rect()
                t = rect.top - boundaryRect.top
                l = rect.left - boundaryRect.left

                switch
                    when top < boundaryRect.height / 2 and left < boundaryRect.width / 2
                        return Position.TOP_LEFT
                    when top < boundaryRect.height / 2 and left > boundaryRect.width / 2
                        return Position.TOP_RIGHT
                    when top > boundaryRect.height / 2 and left < boundaryRect.width / 2
                        return Position.BOTTOM_LEFT
                    when top > boundaryRect.height / 2 and left > boundaryRect.width / 2
                        return Position.BOTTOM_RIGHT

        calculate:
            popup:
                position: =>
                    rect           = $this.rect()
                    boundaryRect   = $boundary.rect()
                    boundaryTop    = boundaryRect.top
                    boundaryLeft   = boundaryRect.left
                    boundaryBottom = boundaryRect.bottom
                    boundaryHeight   = boundaryRect.height
                    boundaryWidth = boundaryRect.width
                    boundaryRight  = boundaryRect.right

                    popupRect    = $popup.rect()
                    height       = popupRect.height
                    width        = popupRect.width



                    if $boundary.is('body')
                        boundaryTop = 0
                        boundaryLeft = 0
                        boundaryBottom = 0
                        boundaryWidth = boundary.clientWidth
                        boundaryHeight = boundary.clientHeight
                        boundaryRight = 0

                    top    = rect.top - boundaryTop
                    left   = rect.left - boundaryLeft
                    right  = (boundaryLeft + boundaryWidth) - (rect.left + rect.width)
                    bottom = (boundaryTop + boundaryHeight) - (rect.top + rect.height)

                    if $boundary.is('body')
                        right  = boundaryWidth - (rect.left + rect.width)
                        bottom = boundaryHeight - (rect.top + rect.height)



                    console.log top, left, right, bottom

                    topOK    = top > height
                    bottomOK = bottom > height
                    leftOK   = left > width
                    centerOK = left > width / 2 and right > width / 2
                    rightOK  = right > width

                    console.log topOK, leftOK, rightOK, bottomOK

                    if settings.position isnt Position.AUTO
                        switch settings.position
                            when Position.TOP_LEFT
                                if topOK and leftOK
                                    module.set.position settings.position

                            when Position.TOP_CENTER
                                if topOK
                                    module.set.position settings.position
                                    return
                            when Position.TOP_RIGHT
                                if topOK and rightOK
                                    module.set.position settings.position
                                    return
                            when Position.BOTTOM_LEFT
                                if bottomOK and leftOK
                                    module.set.position settings.position
                                    return
                            when Position.BOTTOM_CENTER
                                if bottomOK
                                    module.set.position settings.position
                                    return
                            when Position.BOTTOM_RIGHT
                                if bottomOK and rightOK
                                    module.set.position settings.position
                                    return
                            when Position.LEFT
                                if leftOK
                                    module.set.position settings.position
                                    return
                            when Position.RIGHT
                                if rightOK
                                    module.set.position settings.position
                                    return


                    if topOK
                        module.set.vertical.position Position.TOP
                    else if bottomOK
                        module.set.vertical.position Position.BOTTOM

                    if centerOK
                        module.set.horizontal.position Position.CENTER
                    else if leftOK
                        module.set.horizontal.position Position.RIGHT
                    else if rightOK
                        module.set.horizontal.position Position.LEFT


        toggle: =>

        change:
            title: (title) =>
            content: (content) =>
            html: (html) =>
                $popup.html html

        animate:
            show: (callback) =>
                $popup
                    .addClass "#{ClassName.VISIBLE} #{ClassName.ANIMATING}"
                    .off      Event.ANIMATIONEND
                    .one      Event.ANIMATIONEND, =>
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration
            hide: (callback) =>
                $popup
                    .removeClass ClassName.VISIBLE
                    .addClass    ClassName.ANIMATING
                    .one         Event.ANIMATIONEND, =>
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration

        is:
            visible: =>
                $popup.hasClass ClassName.VISIBLE
            hidden: =>
                not module.is.visible()
            animating: =>
                $popup.hasClass ClassName.ANIMATING
            hoverable: =>
                settings.hoverable is true

        exists: =>

        repaint: =>
            $popup.repaint()

        reposition: =>

        set:
            position: (position) =>
                settings.position = position
                $popup
                    .removeClass "#{ClassName.TOP} #{ClassName.RIGHT} #{ClassName.BOTTOM} #{ClassName.LEFT}"
                    .addClass position
            vertical:
                position: (position) =>
                    $popup
                        .removeClass "#{ClassName.TOP} #{ClassName.BOTTOM}"
                        .addClass position
            horizontal:
                position: (position) =>
                    $popup
                        .removeClass "#{ClassName.LEFT} #{ClassName.RIGHT}"
                        .addClass position
            coordinate: (x, y) =>
                $popup.css
                    top : x
                    left: y
            width: (width) =>
                $popup.css
                    width: width
            status: (value) =>
                $this.data Metadata.STATUS, value
            animating: (value) =>
                if value
                    $popup.addClass ClassName.ANIMATING
                else
                    $popup.removeClass ClassName.ANIMATING


        remove:
            popup: =>

        trigger: =>

        bind:
            events: =>

                $body.on Event.MOUSEMOVE, (event) =>
                    if not $popup.exists()
                        return

                    rect          = $this.rect()
                    $pointElement = ts.fromPoint(event.clientX, event.clientY)
                    pointElement  = $pointElement.get()
                    popupElement  = $popup.get()
                    popupRect     = $popup.rect()

                    if $this.is(pointElement)
                        if module.is.animating()
                            return
                        if module.is.visible()
                            return

                        module.show()
                        module.calculate.popup.position()

                        switch module.get.position()
                            when 'top center'
                                module.set.coordinate element.offsetTop - $popup.rect().height, rect.left
                            when 'top left'
                                module.set.coordinate element.offsetTop - $popup.rect().height, rect.left
                            when 'top right'
                                module.set.coordinate element.offsetTop - $popup.rect().height, rect.right - $popup.rect().width
                            when 'bottom center'
                                module.set.coordinate element.offsetTop + rect.height, rect.left
                            when 'bottom left'
                                module.set.coordinate element.offsetTop + rect.height, rect.left
                            when 'bottom right'
                                module.set.coordinate element.offsetTop + rect.height, rect.right
                        return

                    if $this.is(popupElement)
                        return

                    if $popup.contains(pointElement)
                        return



                    if event.clientY > rect.top - 14 and event.clientY < popupRect.bottom + 14 and event.clientX < popupRect.right and event.clientX > popupRect.left
                        return


                    module.hide()


                ###
                $body.on Event.MOUSEENTER, =>
                    module.show()

                    rect = $this.rect()

                    $popup.removeClass 'hidden'
                    $popup.addClass 'animating'

                    $popup.one Event.ANIMATIONEND, =>
                        $popup.removeClass 'animating'


                    switch module.get.position()
                        when 'top center'
                            module.set.coordinate rect.top - $popup.rect().height, rect.left
                        when 'top left'
                            module.set.coordinate rect.top - $popup.rect().height, rect.left
                        when 'top right'
                            module.set.coordinate rect.top - $popup.rect().height, rect.right - $popup.rect().width
                        when 'bottom center'
                            module.set.coordinate rect.top + rect.height, rect.left
                        when 'bottom left'
                            module.set.coordinate rect.top + rect.height, rect.left
                        when 'bottom right'
                            module.set.coordinate rect.top + rect.height, rect.right


                $this.on Event.MOUSELEAVE, (event) =>
                    #if $this.contains event.relatedTarget
                    #    return
                    #if $popup.is(event.relatedTarget)
                    #    return
                    console.log $popup.rect().bottom, event.clientY


                    #console.log event



                    $popup.addClass 'hidden'
                    $popup.addClass 'animating'
                    $popup.one Event.ANIMATIONEND, =>
                        $popup.removeClass 'animating'
                        module.hide()
                ###


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化彈出式訊息', element




            $next = $this.next()
            if $next.is('.ts.popup')
                $popup = $next


            $boundary = $this.closest(settings.boundary)
            boundary = $boundary.get()
            module.set.status Status.HIDDEN
            module.bind.events()

            #module.set.position settings.position

        instantiate: =>
            debug '實例化彈出式訊息', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀彈出式訊息', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules