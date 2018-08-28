# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'comparison'
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
    # 當尺寸正在變更時所呼叫的回呼函式。
    onResize : ->
    # 當圖片載入完畢後並顯示時所會呼叫的回呼函式。
    onDisplay: ->
    # 標籤上的文字。
    labels:
        # 之前圖片的標籤文字。
        before: 'Before'
        # 之後圖片的標籤文字。
        after : 'After'
    # 更改大小拉桿的設置。
    resizer:
        # 拉桿的樣式，可用為：divider、circular、dots、rounded。
        style: 'rounded'

# 中繼資料名稱。
Metadata =
    CONTENT: 'content'

# 事件名稱。
Event =
    LOAD      : "load#{EVENT_NAMESPACE}"
    RESIZE    : "resize#{EVENT_NAMESPACE}"
    DISPLAY   : "display#{EVENT_NAMESPACE}"
    MOUSEDOWN : "mousedown#{EVENT_NAMESPACE}"
    MOUSEMOVE : "mousemove#{EVENT_NAMESPACE}"
    MOUSEUP   : "mouseup#{EVENT_NAMESPACE}"
    MOUSEOUT  : "mouseout#{EVENT_NAMESPACE}"
    TOUCHSTART: "touchstart#{EVENT_NAMESPACE}"
    TOUCHMOVE : "touchmove#{EVENT_NAMESPACE}"
    TOUCHEND  : "touchend#{EVENT_NAMESPACE}"

# 樣式名稱。
ClassName =
    ACTIVE   : 'active'
    ANIMATING: 'animating'

# 選擇器名稱。
Selector =
    AFTER  : '.after'
    BEFORE : '.before'
    RESIZER: '.resizer'
    IMG    : 'img'
    BODY   : 'body'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $comparison    = $this
    $before        = undefined
    $after         = undefined
    $resizer       = undefined
    $body          = ts Selector.BODY
    comparisonRect = undefined
    resizerWidth   = 14

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show:
            after: =>
                module.set.resizer 100
            before: =>
                module.set.resizer 0

        create:
            template: =>
                beforeImg = $this
                    .find Selector.BEFORE
                    .attr 'src'
                afterImg  = $this
                    .find Selector.AFTER
                    .attr 'src'
                """
                <div class="before">
                    <img src="#{beforeImg}" style="filter: blur(5px);">
                    <label>#{settings.labels.before}</label>
                </div>
                <div class="after">
                    <img src="#{afterImg}">
                    <label>#{settings.labels.after}</label>
                </div>
                <div class="#{settings.resizer.style} resizer"></div>
                """

        set:
            resizer: (percent) =>
                percent = if percent > 50 then "calc(#{percent}% - #{resizerWidth}px)" else "#{percent}%"
                $after.css   'width', percent
                $resizer.css 'left' , percent
                module.trigger.resize()
            after:
                url: (url) =>
                    module.get.after.$img().prop 'src', url
            before:
                url: (url) =>
                    module.get.before.$img().prop 'src', url
            html: (html) =>
                $this.html html
            content: (content) =>
                $this.data Metadata.CONTENT, content

        get:
            rect: =>
                $this.get().getBoundingClientRect()
            resizer:
                rect: =>
                    $resizer.get().getBoundingClientRect()
            after:
                rect: =>
                    $after.get().getBoundingClientRect()
                $img: =>
                    $after.find Selector.IMG
            before:
                $img: =>
                    $before.find Selector.IMG
            html: =>
                $this.html()
            content: =>
                $this.data Metadata.CONTENT
            clientX: (event) =>
                if event.type is 'touchstart' or event.type is 'touchmove' then event.touches[0].clientX else event.clientX

        trigger:
            resize: =>
                $this.trigger Event.RESIZE, element
            display: =>
                $this.trigger Event.DISPLAY, element

        move:
            resizer: (event) =>
                rect   = comparisonRect
                offset = module.get.clientX(event) - module.get.resizer.rect().left

                $this
                    .on "#{Event.MOUSEMOVE} #{Event.TOUCHMOVE}", (event) =>
                        clientX = module.get.clientX event
                        left    = clientX - rect.left - offset
                        reached =
                            left : left < 0
                            right: left > rect.right - rect.left - resizerWidth
                        if reached.left or reached.right
                            return
                        $resizer.css 'left' , "#{left}px"
                        $after.css   'width', "#{((module.get.resizer.rect().left - rect.left) / rect.width) * 100}%"
                        module.trigger.resize()

        bind:
            events: =>
                $this.on Event.RESIZE, (event, context) =>
                    debug '發生 RESIZE 事件', context
                    settings.onResize.call context, event
                $this.on Event.DISPLAY, (event, context) =>
                    debug '發生 DISPLAY 事件', context
                    settings.onDisplay.call context, event
                $body.on "#{Event.MOUSEUP} #{Event.TOUCHEND}", (event) =>
                    $this.off "#{Event.MOUSEDOWN} #{Event.MOUSEMOVE} #{Event.MOUSEUP} #{Event.TOUCHSTART} #{Event.TOUCHMOVE}"
                    module.bind.resizer.events()
                module.get.after.$img().on Event.LOAD, (event, context) =>
                    debug '發生 LOAD 事件', context
                    module.trigger.display()
                module.get.before.$img().on Event.LOAD, (event, context) =>
                    debug '發生 LOAD 事件', context
                    module.trigger.display()
            resizer:
                events: =>
                    $this.on "#{Event.MOUSEDOWN} #{Event.TOUCHSTART}", Selector.RESIZER, (event) =>
                        module.move.resizer event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化圖片比較', element

            module.set.content module.get.html()
            module.set.html    module.create.template()
            module.refresh()
            module.bind.events()
            module.bind.resizer.events()

        instantiate: =>
            debug '實例化圖片比較', element

        refresh: =>
            $after         = $this.find Selector.AFTER
            $before        = $this.find Selector.BEFORE
            $resizer       = $this.find Selector.RESIZER
            comparisonRect = module.get.rect()
            return $allModules

        destroy: =>
            debug '摧毀圖片比較', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            module.set.html module.get.content()
            return $allModules