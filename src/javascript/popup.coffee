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
    scrollContext : window
    # 如果有指定邊緣選擇器，彈出訊息則會試著依靠這個父元素的邊緣，適合用於表格的標頭等。
    edgeContext   : false
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
    transition    : 'auto'
    # 過場動畫的演繹毫秒時間。
    duration      : 'auto'
    # 游標是否能在彈出式訊息遊走，如：導覽式彈出選單。
    hoverable     : false
    # 是否能在點擊彈出式訊息以外的地方自動關閉。
    closable      : true
    # 是否要在指定捲動時自動隱藏此彈出式訊息。
    hideOnScroll  : 'auto'
    # 是否帶有指標外觀。
    pointing      : true
    # 是否為反色外觀。
    inverted      : false
    # 大小尺寸。
    size          : 'medium'
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
    SCROLL      : "scroll#{EVENT_NAMESPACE}"
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

# 位置。
Position =
    AUTO         : 'auto'
    TOP          : 'top'
    BOTTOM       : 'bottom'
    LEFT         : 'left'
    RIGHT        : 'right'
    CENTER       : 'center'
    TOP_LEFT     : 'top left'
    TOP_CENTER   : 'top center'
    TOP_RIGHT    : 'top right'
    BOTTOM_LEFT  : 'bottom left'
    BOTTOM_CENTER: 'bottom center'
    BOTTOM_RIGHT : 'bottom right'
    RIGHT_TOP    : 'right top'
    RIGHT_CENTER : 'right center'
    RIGHT_BOTTOM : 'right bottom'
    LEFT_TOP     : 'left top'
    LEFT_CENTER  : 'left center'
    LEFT_BOTTOM  : 'left bottom'

# 中繼資料。
Metadata =
    SHOW_TIMER: 'showTimer'
    HIDE_TIMER: 'hideTimer'

# 選擇器名稱。
Selector =
    BODY: 'body'

# 元素標籤。
Attribute =
    CONTENT  : 'data-content'
    HTML     : 'data-html'
    TITLE    : 'data-title'
    VARIATION: 'data-variation'
    TRANSITION: 'data-popup-transition'
    POSITION : 'data-position'

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

    $body          = ts Selector.BODY
    $popup         = ts()
    $boundary      = ts()
    boundary       = null
    $scrollContext = ts()
    scrollContext  = null
    offset         = 20

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: (callback) =>
            $this.removeTimer Metadata.SHOW_TIMER
            $this.removeTimer Metadata.HIDE_TIMER
            if module.is.animating()
                return
            if module.is.visible()
                return
            module.calculate.popup.position()
            module.animate.show =>
                module.set.animating false
                callback.call() if callback?
            return $allModules

        hide: (callback) =>
            $this.removeTimer Metadata.SHOW_TIMER
            $this.removeTimer Metadata.HIDE_TIMER
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
            distance: =>
                rect           = $this.rect()
                boundaryRect   = $boundary.rect()
                boundaryTop    = boundaryRect.top
                boundaryLeft   = boundaryRect.left
                boundaryBottom = boundaryRect.bottom
                boundaryHeight = boundaryRect.height
                boundaryWidth  = boundaryRect.width
                boundaryRight  = boundaryRect.right

                if $boundary.is 'body'
                    boundaryTop    = 0
                    boundaryLeft   = 0
                    boundaryBottom = 0
                    boundaryWidth  = boundary.clientWidth
                    boundaryHeight = boundary.clientHeight
                    boundaryRight   = 0

                top    = rect.top - boundaryTop
                left   = rect.left - boundaryLeft
                right  = (boundaryLeft + boundaryWidth) - (rect.left + rect.width)
                bottom = (boundaryTop + boundaryHeight) - (rect.top + rect.height)

                if $boundary.is 'body'
                    right  = boundaryWidth - (rect.left + rect.width)
                    bottom = boundaryHeight - (rect.top + rect.height)

                return
                    top   : top
                    left  : left
                    right : right
                    bottom: bottom

            position: =>
                return $popup.attr Attribute.POSITION

        calculate:
            popup:
                position: =>
                    {top, left, right, bottom} = module.get.distance()
                    rect        = $this.rect()
                    popupRect   = $popup.rect()
                    popupWidth  = popupRect.width
                    popupHeight = popupRect.height
                    position    = ''

                    topCenterOK    = top > popupHeight and right > popupWidth / 2 and left > popupWidth / 2
                    topLeftOK      = top > popupHeight and right > popupWidth
                    topRightOK     = top > popupHeight and left > popupWidth
                    bottomCenterOK = bottom > popupHeight and right > popupWidth / 2 and left > popupWidth / 2
                    bottomLeftOK   = bottom > popupHeight and right > popupWidth
                    bottomRightOK  = bottom > popupHeight and left > popupWidth
                    topOK      = top > popupHeight
                    bottomOK  = bottom > popupHeight
                    leftCenterOK   = (top > popupHeight or bottom > popupHeight) and left > popupWidth
                    rightCenterOK  = (top > popupHeight or bottom > popupHeight) and right > popupWidth
                    leftOK   = left > popupWidth
                    rightOK  = right > popupWidth

                    # OVERWRITE IF SETTING

                    if settings.position isnt 'auto'
                        switch settings.position
                            when Position.TOP_CENTER
                                position = Position.TOP_CENTER if topCenterOK
                            when Position.TOP_LEFT
                                position = Position.TOP_LEFT if topLeftOK
                            when Position.TOP_RIGHT
                                position = Position.TOP_RIGHT if topRightOK
                            when Position.BOTTOM_CENTER
                                position = Position.BOTTOM_CENTER if bottomCenterOK
                            when Position.BOTTOM_LEFT
                                position = Position.BOTTOM_LEFT if bottomLeftOK
                            when Position.BOTTOM_RIGHT
                                position = Position.BOTTOM_RIGHT if bottomRightOK
                            when Position.LEFT_CENTER
                                position = Position.LEFT_CENTER if leftCenterOK
                            when Position.RIGHT_CENTER
                                position = Position.RIGHT_CENTER if rightCenterOK

                    console.log {
                        top,
                        left,
                        right,
                        bottom,
                        popupWidth,
                        popupHeight,
                        topOK,
                        leftOK
                        rightOK,
                        bottomOK,
                        topCenterOK,
                        topLeftOK     ,
                        topRightOK    ,
                        bottomCenterOK,
                        bottomLeftOK  ,
                        bottomRightOK ,
                        leftCenterOK  ,
                        rightCenterOK ,
                    }




                    if position is ''
                        switch
                            when topCenterOK
                                position = Position.TOP_CENTER
                            when topLeftOK
                                position = Position.TOP_LEFT
                            when topRightOK
                                position = Position.TOP_RIGHT
                            when bottomCenterOK
                                position = Position.BOTTOM_CENTER
                            when bottomLeftOK
                                position = Position.BOTTOM_LEFT
                            when bottomRightOK
                                position = Position.BOTTOM_RIGHT
                            when leftCenterOK
                                position = Position.LEFT_CENTER
                            when rightCenterOK
                                position = Position.RIGHT_CENTER
                            when bottomOK
                                $popup.css
                                    top: rect.height
                                $popup.find('.arrow').css
                                    left: (rect.left + rect.width / 2) - popupRect.left - 8
                                    top: -20
                                position = Position.BOTTOM


                    $popup.attr Attribute.POSITION, position

                    top  = element.offsetTop
                    left = element.offsetLeft



                    switch position
                        when Position.TOP_CENTER
                            $popup.css
                                left: (left + rect.width / 2) - popupRect.width / 2
                                top : top - popupRect.height# - offset
                        when Position.TOP_LEFT
                            $popup.css
                                left: left
                                top : top - popupRect.height# - offset
                        when Position.TOP_RIGHT
                            $popup.css
                                left: left - popupRect.width + rect.width
                                top : top - popupRect.height# - offset
                        when Position.BOTTOM_CENTER
                            $popup.css
                                left: (left + rect.width / 2) - popupRect.width / 2
                                top : top  + rect.height# + offset
                        when Position.BOTTOM_LEFT
                            $popup.css
                                left: left
                                top : top  + rect.height# + offset
                        when Position.BOTTOM_RIGHT
                            $popup.css
                                left: left - popupRect.width + rect.width
                                top : top  + rect.height# + offset
                        when Position.LEFT_CENTER
                            $popup.css
                                left: left - popupRect.width
                                top : (top  + rect.height / 2) - popupRect.height / 2
                        when Position.RIGHT_CENTER
                            $popup.css
                                left: left + rect.width# + offset
                                top : (top  + rect.height / 2) - popupRect.height / 2

                    if settings.position is 'auto'
                        module.set.position position



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

        create:
            popup: =>
                variation = settings.variation or ''
                content   = settings.content   or ''
                html      = settings.html      or ''
                title     = settings.title     or ''

                attributeVariation = $this.attr(Attribute.VARIATION)
                attributeContent   = $this.attr(Attribute.CONTENT)
                attributeTitle     = $this.attr(Attribute.TITLE)
                attributeHTML      = $this.attr(Attribute.HTML)

                if attributeVariation isnt null
                    variation = attributeVariation
                if attributeContent isnt null
                    content = attributeContent
                if attributeTitle isnt null
                    title = attributeTitle
                if attributeHTML isnt null
                    html = attributeHTML

                $popup = ts '<div>'
                    .addClass 'ts popup'
                    .addClass variation



                if html isnt ''
                    $popup.html html

                if content isnt ''
                    $content = ts '<div>'
                        .addClass 'content'
                        .html     content
                    $title = ts '<div>'
                        .addClass 'title'
                        .html     title

                    if title isnt ''
                        $popup
                            .append $title
                            .append $content
                    else
                        $popup
                            .append $content

                $popup.insertAfter $this

        exists: =>

        repaint: =>
            $popup.repaint()

        reposition: =>

        set:
            position: (position) =>
                $popup.attr Attribute.POSITION, position
            coordinate: (x, y) =>
                $popup.css
                    top : x
                    left: y
            width: (width) =>
                $popup.css
                    width: width
            animating: (value) =>
                if value
                    $popup.addClass ClassName.ANIMATING
                else
                    $popup.removeClass ClassName.ANIMATING


        remove:
            popup: =>

        trigger: =>

        bind:
            hover: =>
                $body.on Event.MOUSEMOVE, (event) =>
                    if not $popup.exists()
                        return
                    rect          = $this.rect()
                    $pointElement = ts.fromPoint(event.clientX, event.clientY)
                    pointElement  = $pointElement.get()
                    popupElement  = $popup.get()
                    popupRect     = $popup.rect()

                    if $this.is(pointElement) or $this.contains(pointElement)
                        $this.removeTimer Metadata.HIDE_TIMER
                        if not $this.hasTimer Metadata.SHOW_TIMER
                            $this.setTimer
                                name    : Metadata.SHOW_TIMER
                                callback: module.show
                                interval: settings.delay.show
                                looping : false
                                visible : true

                        return

                    if not settings.hoverable
                        $this.removeTimer Metadata.SHOW_TIMER
                        if not $this.hasTimer Metadata.HIDE_TIMER
                            $this.setTimer
                                name    : Metadata.HIDE_TIMER
                                callback: module.hide
                                interval: settings.delay.hide
                                looping : false
                                visible : true
                        return

                    if $this.is(popupElement)
                        $this.removeTimer Metadata.HIDE_TIMER
                        return
                    if $this.contains(popupElement)
                        $this.removeTimer Metadata.HIDE_TIMER
                        return
                    if $popup.contains(pointElement)
                        $this.removeTimer Metadata.HIDE_TIMER
                        return

                    switch module.get.position()
                        when Position.TOP_LEFT, Position.TOP_CENTER, Position.TOP_RIGHT
                            if event.clientY > popupRect.bottom and event.clientY < rect.top and event.clientX < popupRect.right and event.clientX > popupRect.left
                                return
                        when Position.LEFT_TOP, Position.LEFT_CENTER, Position.LEFT_BOTTOM
                            if event.clientY < popupRect.bottom and event.clientY > popupRect.top and event.clientX < rect.left and event.clientX > popupRect.right
                                return
                        when Position.RIGHT_TOP, Position.RIGHT_CENTER, Position.RIGHT_BOTTOM
                            if event.clientY < popupRect.bottom and event.clientY > popupRect.top and event.clientX < popupRect.left and event.clientX > rect.right
                                return
                        when Position.BOTTOM_LEFT, Position.BOTTOM_CENTER, Position.BOTTOM_RIGHT
                            if event.clientY > rect.bottom and event.clientY < popupRect.top and event.clientX < popupRect.right and event.clientX > popupRect.left
                                return

                    $this.removeTimer Metadata.SHOW_TIMER

                    if not $this.hasTimer Metadata.HIDE_TIMER
                        $this.setTimer
                            name    : Metadata.HIDE_TIMER
                            callback: module.hide
                            interval: settings.delay.hide
                            looping : false
                            visible : true
            click: =>
                $body.on Event.CLICK, (event) =>
                    $pointElement = ts.fromPoint(event.clientX, event.clientY)
                    pointElement  = $pointElement.get()

                    if not $this.is(pointElement) and not $popup.contains(pointElement) and settings.closable
                        module.hide()
                        return

                    if not $this.is pointElement
                        return

                    if module.is.hidden()
                        module.show()
                    else
                        module.hide()

            focus: =>
            scroll: =>
                $scrollContext.on Event.SCROLL, =>
                    module.hide()
            events: =>


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化彈出式訊息', element

            $next = $this.next()
            if $next.is '.ts.popup'
                $popup = $next

            if not $popup.exists()
                module.create.popup()

            $arrow = ts '<div>'
                .addClass 'arrow'
                .appendTo $popup

            if settings.size isnt 'medium'
                $popup.removeClass 'mini tiny small medium large big huge massive'
                $popup.addClass settings.size

            if settings.size isnt 'medium'
                $popup.removeClass 'mini tiny small medium large big huge massive'
                $popup.addClass settings.size

            if settings.hoverable
                $popup.addClass 'hoverable'

            if $this.attr(Attribute.POSITION) isnt null
                settings.position = $this.attr Attribute.POSITION
                $popup.attr Attribute.POSITION, settings.position

            if settings.transition isnt 'auto'
                $popup.attr Attribute.TRANSITION, settings.transition
                if settings.duration is 'auto'
                    switch settings.transition
                        when 'fade'
                            duration = 300


            if settings.inverted is true
                $popup.addClass 'inverted'

            if settings.pointing is true
                $popup.addClass 'pointing'


            $boundary = $this.closest(settings.boundary)
            boundary = $boundary.get()
            $scrollContext = ts settings.scrollContext
            scrollContext = $scrollContext.get()
            module.bind.events()

            switch settings.on
                when 'hover'
                    module.bind.hover()
                when 'click'
                    module.bind.click()
                when 'focus'
                    module.bind.focus()

            if settings.hideOnScroll is 'auto'
                if settings.on is 'hover'
                    module.bind.scroll()
            if settings.hideOnScroll is true
                module.bind.scroll()

        instantiate: =>
            debug '實例化彈出式訊息', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀彈出式訊息', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules