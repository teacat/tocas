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
    # 偏好的彈出式訊息出現位置。
    position      : 'top'
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
    TOP      : 'top'
    LEFT     : 'left'
    RIGHT    : 'right'
    BOTTOM   : 'bottom'
    CENTER   : 'center'
    VISIBLE  : 'visible'
    ANIMATING: 'animating'
    HIDDEN   : 'hidden'
    CUSTOM   : 'custom'

# 位置。
Position =
    TOP   : 'top'
    BOTTOM: 'bottom'
    LEFT  : 'left'
    RIGHT : 'right'

# 中繼資料。
Metadata =
    SHOW_TIMER: 'showTimer'
    HIDE_TIMER: 'hideTimer'

# 選擇器名稱。
Selector =
    BODY: 'body'

# 元素標籤。
Attribute =
    CONTENT   : 'data-content'
    HTML      : 'data-html'
    TITLE     : 'data-title'
    VARIATION : 'data-variation'
    TRANSITION: 'data-popup-transition'
    POSITION  : 'data-position'

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
    popupRect      = {}
    rect           = {}
    boundaryRect   = {}
    boundary       = null
    $scrollContext = ts()
    scrollContext  = null
    offset         = 20
    padding = 10

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
                bRect = {...boundaryRect.toJSON()}

                if $boundary.is 'body'
                    bRect.top    = 0
                    bRect.left   = 0
                    bRect.bottom = 0
                    bRect.width  = boundary.clientWidth
                    bRect.height = boundary.clientHeight
                    bRect.right  = 0

                top    = rect.top - bRect.top
                left   = rect.left - bRect.left
                right  = (bRect.left + bRect.width)  - (rect.left + rect.width)
                bottom = (bRect.top  + bRect.height) - (rect.top  + rect.height)

                if $boundary.is 'body'
                    right  = bRect.width  - (rect.left + rect.width)
                    bottom = bRect.height - (rect.top  + rect.height)

                return {
                    top
                    left
                    right
                    bottom
                    boundary: bRect
                }

            directions: =>
                {top, left, right, bottom} = module.get.distance()
                return
                    top   : top    > popupRect.height
                    right : right  > popupRect.width
                    bottom: bottom > popupRect.height
                    left  : left   > popupRect.width

            position: =>
                return $popup.attr Attribute.POSITION

        calculate:
            popup:
                position: =>
                    module.refresh()
                    {top, left, right, bottom} = module.get.distance()
                    directions = module.get.directions()
                    position   = ''

                    switch settings.position
                        when Position.TOP
                            position = Position.TOP if directions.top
                        when Position.RIGHT
                            position = Position.RIGHT if directions.right
                        when Position.BOTTOM
                            position = Position.BOTTOM if directions.bottom
                        when Position.LEFT
                            position = Position.LEFT if directions.left

                    if position isnt settings.position
                        switch
                            when directions.top
                                position = Position.TOP
                            when directions.bottom
                                position = Position.BOTTOM
                            when directions.right
                                position = Position.RIGHT
                            when directions.left
                                position = Position.LEFT

                    position = Position.BOTTOM

                    module.set.position position

                    top  = element.offsetTop
                    left = element.offsetLeft

                    $popup.find('.arrow').removeAttr 'style'



                    switch position
                        when Position.TOP
                            $popup.css
                                left: (left + rect.width / 2) - popupRect.width / 2
                                top : top - popupRect.height



                            setTimeout =>
                                module.refresh()
                                $popup.find('.arrow').css
                                    left: (rect.left + rect.width / 2) - popupRect.left - 8 - 2
                                    bottom: -20
                            , 0

                            if popupRect.width / 2 > left
                                $popup.css
                                    left: 0


                            if rect.left < popupRect.width / 2
                                if rect.left > padding + 20
                                    $popup.css
                                        left: left - (left - Math.abs(boundaryRect.left)) #+ padding
                                else
                                    $popup.css
                                        left: left

                            else if right < popupRect.width / 2
                                if right > padding + 20
                                    $popup.css
                                        left: left - popupRect.width + right# + padding
                                else
                                    $popup.css
                                        left: left + rect.width - popupRect.width


                        when Position.RIGHT
                            $popup.css
                                left: left + rect.width# + offset
                                top : (top  + rect.height / 2) - popupRect.height / 2

                            setTimeout =>
                                module.refresh()
                                $popup.find('.arrow').css
                                    top: (rect.top + rect.height / 2) - popupRect.top - 8 - 2
                                    left: -20
                            , 0


                            if rect.top < popupRect.height / 2
                                if rect.top > padding + 20
                                    $popup.css
                                        top: top - (top - Math.abs(boundaryRect.top)) + padding
                                else
                                    $popup.css
                                        top: top

                            else if bottom < popupRect.height / 2
                                if bottom > padding + 20
                                    $popup.css
                                        top: top - popupRect.height + bottom + padding
                                else
                                    $popup.css
                                        top: top + rect.height - popupRect.height

                        when Position.BOTTOM
                            $popup.css
                                left: (left + rect.width / 2) - popupRect.width / 2
                                top : top  + rect.height# + offset




                            setTimeout =>
                                module.refresh()
                                $popup.find('.arrow').css
                                    left: (rect.left + rect.width / 2) - popupRect.left - 8 - 2
                                    top: -20
                            , 0

                            if popupRect.width / 2 > left
                                $popup.css
                                    left: 0

                            if rect.left < popupRect.width / 2
                                if rect.left > padding + 20
                                    $popup.css
                                        left: left - (left - Math.abs(boundaryRect.left)) #+ padding
                                else
                                    $popup.css
                                        left: left

                            else if right < popupRect.width / 2
                                if right > padding + 20
                                    $popup.css
                                        left: left - popupRect.width + right# + padding
                                else
                                    $popup.css
                                        left: left + rect.width - popupRect.width

                        when Position.LEFT
                            $popup.css
                                left: left - popupRect.width
                                top : (top  + rect.height / 2) - popupRect.height / 2


                            setTimeout =>
                                module.refresh()
                                $popup.find('.arrow').css
                                    top : (rect.top + rect.height / 2) - popupRect.top - 8 - 2
                                    left: popupRect.width - 2
                            , 0

                            if rect.top < popupRect.height / 2
                                if rect.top > padding + 20
                                    $popup.css
                                        top: top - (top - Math.abs(boundaryRect.top)) + padding
                                else
                                    $popup.css
                                        top: top

                            else if bottom < popupRect.height / 2
                                if bottom > padding + 20
                                    $popup.css
                                        top: top - popupRect.height + bottom + padding
                                else
                                    $popup.css
                                        top: top + rect.height - popupRect.height







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
            rect         = $this.rect()
            popupRect    = $popup.rect()
            boundaryRect = $boundary.rect()
            return $allModules

        destroy: =>
            debug '摧毀彈出式訊息', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules