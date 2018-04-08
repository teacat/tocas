# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'snackbar'
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
    # 主要內容文字。
    content: ''
    # 動作設置。
    action :
        # 動作按鈕的文字。
        text    : ''
        # 動作按鈕的語意。
        emphasis: ''
    # 當點心條關閉時所會呼叫的回呼函式。
    onClose  : =>
    # 當點心條因為放置而自動關閉時所會呼叫的回呼函式。
    onIgnore : =>
    # 當動作按鈕被按下時所呼叫的回呼函式。
    onAction : =>
    # 點心條到自動消失所耗費的毫秒時間，如果設為 `0` 則表示永不自動消失。
    delay    : 3500
    # 點心條可否手動忽略，例如：滑開、點擊點心條關閉。
    # closable : true
    # 點心條出現的螢幕位置，如：`top left`、`top right`、`bottom left`、`bottom right`
    position : 'bottom left'
    # 點心條是否應該在滑鼠指向時，持續顯示避免自動消失。
    hoverStay: true

# 中繼資料。
Metadata =
    STAY: 'stay'

# 計時器。
Timer =
    AUTO_CLOSE: 'autoClose'

# 事件名稱。
Event =
    CLOSE       : "close#{EVENT_NAMESPACE}"
    IGNORE      : "open#{EVENT_NAMESPACE}"
    ACTION      : "closing#{EVENT_NAMESPACE}"
    CLICK       : "click#{EVENT_NAMESPACE}"
    MOUSEENTER  : "mouseenter#{EVENT_NAMESPACE}"
    MOUSELEAVE  : "mouseleave#{EVENT_NAMESPACE}"
    ANIMATIONEND: 'animationend'

# 標籤名稱。
Attribute =
    TEMPORARY: 'data-snackbar-temporary'

# 模板。
Template =
    SNACKBAR: """
        <div class="content"></div>
        <a class="action href="#!"></a>
    """

# 樣式名稱。
ClassName =
    SNACKBAR : 'ts snackbar'
    ACTIVE   : 'active'
    ANIMATING: 'animating'
    PRIMARY  : 'primary'
    INFO     : 'info'
    WARNING  : 'warning'
    POSITIVE : 'positive'
    NEGATIVE : 'negative'
    TOP      : 'top'
    LEFT     : 'left'
    BOTTOM   : 'bottom'
    RIGHT    : 'right'

# 選擇器名稱。
Selector =
    SNACKBAR       : ".ts.snackbar[#{Attribute.TEMPORARY}]"
    ACTIVE_SNACKBAR: '.ts.active.snackbar'
    CONTENT        : '.content'
    ACTION         : '.action'
    BODY           : 'body'

# 錯誤訊息。
Error = {}

# 過場動畫毫秒。
duration = 300

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $action  = ts()
    $content = ts()

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: =>
            module.reset.timer()
            module.reset.action()
            module.set.stay false
            module.repaint()
            module.animate.show =>
                module.set.animating false
            if settings.content isnt ''
                module.set.content settings.content
            if settings.action?.text? and settings.action.text isnt ''
                module.set.action settings.action.text, settings.action?.emphasis
            if settings.delay isnt 0
                module.set.timer()
            return $allModules

        hide: (type, callback) =>
            if module.is.hidden()
                return
            module.reset.timer()

            switch type
                when Event.ACTION
                    if not module.trigger.action()
                        return
                when Event.IGNORE
                    module.trigger.ignore()
            module.animate.hide =>
                module.remove()
                module.trigger.close()
                callback.call() if callback?
            return $allModules

        remove: =>
            $this.remove()

        repaint: =>
            $this.repaint()

        get:
            $content: =>
                $this.find Selector.CONTENT
            $action: =>
                $this.find Selector.ACTION

        trigger:
            action: =>
                $this.trigger Event.ACTION, element
            ignore: =>
                $this.trigger Event.IGNORE, element
            close: =>
                $this.trigger Event.CLOSE, element

        reset:
            timer: =>
                $this.removeTimer Timer.AUTO_CLOSE
            action: =>
                $action
                    .html ''
                    .removeClass "#{ClassName.PRIMARY} #{ClassName.INFO} #{ClassName.WARNING} #{ClassName.NEGATIVE} #{ClassName.POSITIVE}"
            position: =>
                $this.removeClass "#{ClassName.TOP} #{ClassName.LEFT} #{ClassName.BOTTOM} #{ClassName.RIGHT}"

        animate:
            show: (callback) =>
                $this
                    .addClass "#{ClassName.ACTIVE} #{ClassName.ANIMATING} #{settings.position}"
                    .off      Event.ANIMATIONEND
                    .one      Event.ANIMATIONEND, =>
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration
            hide: (callback) =>
                $this
                    .removeClass ClassName.ACTIVE
                    .addClass    ClassName.ANIMATING
                    .one         Event.ANIMATIONEND, =>
                        callback.call() if callback?
                    .emulate Event.ANIMATIONEND, duration

        is:
            visible: =>
                $this.hasClass ClassName.ACTIVE
            hidden: =>
                not module.is.visible()

        should:
            stay: =>
                $this.data(Metadata.STAY) is true and settings.hoverStay is true

        set:
            stay: (value) =>
                $this.data Metadata.STAY, value
            content: (content) =>
                $content.html content
            animating: (value) =>
                if value
                    $this.addClass ClassName.ANIMATING
                else
                    $this.removeClass ClassName.ANIMATING
            action: (text, emphasis) =>
                $action.html     settings.action.text
                $action.addClass settings.action.emphasis if emphasis
            timer: =>
                timer =
                    name    : Timer.AUTO_CLOSE
                    callback: =>
                        if module.should.stay()
                            debug '延長點心條的存在時間', element
                            $this.setTimer timer
                        else
                            module.hide Event.IGNORE
                    interval: settings.delay
                    visible : true
                $this.setTimer timer

        bind:
            stay: =>
                $this.on Event.MOUSEENTER, =>
                    debug '發生 MOUSEENTER 事件', element
                    module.set.stay true
                $this.on Event.MOUSELEAVE, =>
                    debug '發生 MOUSELEAVE 事件', element
                    module.set.stay false

            events: =>
                $this.on Event.CLICK, Selector.ACTION, (event, context) =>
                    debug '發生 CLICK 事件', element
                    module.hide Event.ACTION
                    settings.onAction.call context, event
                $this.on Event.ACTION, (event, context) =>
                    debug '發生 ACTION 事件', context
                    settings.onAction.call context, event
                $this.on Event.IGNORE, (event, context) =>
                    debug '發生 IGNORE 事件', context
                    settings.onIgnore.call context, event
                $this.on Event.CLOSE, (event, context) =>
                    debug '發生 CLOSE 事件', context
                    settings.onClose.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化點心條', element
            module.bind.events()
            if settings.hoverStay is true
                module.bind.stay()
            $action  = $this.find Selector.ACTION
            $content = $this.find Selector.CONTENT

        instantiate: =>
            debug '實例化點心條', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀點心條', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules

# ------------------------------------------------------------------------
# 模組直接註冊
# ------------------------------------------------------------------------

ts.snackbar = (options) =>
    $snackbar = ts Selector.SNACKBAR

    switch options
        when 'hide'
            return $snackbar.snackbar 'hide'
        when 'is hidden'
            return true if not $snackbar.exists()
            return $snackbar.snackbar 'is hidden'
        when 'is visible'
            return false if not $snackbar.exists()
            return $snackbar.snackbar 'is visible'
        when 'destroy'
            return $snackbar.snackbar 'destroy'

    create = =>
        $snackbar = ts '<div>'
            .attr     Attribute.TEMPORARY, 'true'
            .addClass ClassName.SNACKBAR
            .html     Template.SNACKBAR
            .appendTo Selector.BODY
            .snackbar {
                options...
                onClose: =>
                    options.onClose?.call $snackbar.get()
                    $snackbar.repaint()
                    $snackbar.remove()
            }
            .snackbar 'show'

    if not $snackbar.exists()
        create()
        return

    $snackbar.snackbar 'hide', Event.IGNORE, =>
        $snackbar.remove()
        create()




