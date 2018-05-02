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
    boundary      : 'window'
    # 即時產生的彈出式訊息應該要被擺置在哪個元素內。
    context       : 'body'
    # 此彈出式訊息偵測畫面是否有捲動的元素選擇器，如果指定元素有捲動事件則會自動隱藏此彈出式訊息。
    scrollContext : 'window'
    # 彈出式訊息出現的位置，分別是 `垂直 水平`（如：`top left`、`bottom right`）。
    position      : 'top left'
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
    MOUSEENTER  : "mouseenter#{EVENT_NAMESPACE}"
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
    HIDDEN : 'hidden'
    CUSTOM : 'custom'

# 選擇器名稱。
Selector =
    {}

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $popup = ts()
    offset = 20

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: =>
            $popup.addClass ClassName.VISIBLE

        hide: =>
            $popup.removeClass ClassName.VISIBLE

        hideAll: =>

        get:
            popup: =>
                $popup.get()
            position: =>
                return settings.position
                #top    = $popup.hasClass ClassName.TOP
                #left   = $popup.hasClass ClassName.LEFT
                #right  = $popup.hasClass ClassName.RIGHT
                #bottom = $popup.hasClass ClassName.BOTTOM
                #center = $popup.hasClass ClassName.CENTER
                #switch
                #    when top and center
                #        return 'top center'
                #    when top and left
                #        return 'top left'
                #    when top and right
                #        return 'top right'
                #    when bottom and center
                #        return 'bottom center'
                #    when bottom and left
                #        return 'bottom left'
                #    when bottom and right
                #        return 'bottom right'

        toggle: =>

        change:
            title: (title) =>
            content: (content) =>
            html: (html) =>
                $popup.html html

        is:
            visible: =>
                $popup.hasClass ClassName.VISIBLE
            hidden: =>
                not module.is.visible()
            hoverable: =>
                settings.hoverable is true

        exists: =>

        reposition: =>

        set:
            position: (position) =>
                settings.position = position
                $popup
                    .removeClass "#{ClassName.TOP} #{ClassName.RIGHT} #{ClassName.BOTTOM} #{ClassName.LEFT}"
                    .addClass position
            coordinate: (x, y) =>
                $popup.css
                    top : x
                    left: y
            width: (width) =>
                $popup.css
                    width: width


        remove:
            popup: =>

        trigger: =>

        bind:
            events: =>

                $this.on Event.MOUSEENTER, =>
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


                $this.on Event.MOUSEOUT, (event) =>
                    if $this.contains event.relatedTarget
                        return
                    if $popup.is(event.relatedTarget)
                        return
                    console.log event



                    $popup.addClass 'hidden'
                    $popup.addClass 'animating'
                    $popup.one Event.ANIMATIONEND, =>
                        $popup.removeClass 'animating'
                        module.hide()


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化彈出式訊息', element
            module.bind.events()



            $next = $this.next()
            if $next.is('.ts.popup')
                $popup = $next

            module.set.position settings.position

        instantiate: =>
            debug '實例化彈出式訊息', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀彈出式訊息', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules