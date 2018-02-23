# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'carousel'
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
    # 幻燈片換到下一張的毫秒相隔時間。
    interval      : 4000
    # 是否要自動播放。
    autoplay      : true
    # 當幻燈片變更時所呼叫的函式。
    onChange      : =>
    # 指示器選項。
    indicator  :
        # 指示器的外觀，`rounded` 為圓角矩形，`circular` 為圓形。
        style     : 'rounded'
        # 是否可供轉跳。
        navigable : true
        # 是否疊加在幻燈片上。
        overlapped: true
    # 控制器選項。
    control:
        # 控制選項的樣式，`compact` 為較小的按鈕，`full` 為整個側邊區塊
        size     : 'compact'
        # 是否疊加在幻燈片上。
        overlapped: true
        # 圖示選項。
        icon:
            # 左圖示的圖示名稱。
            left : 'chevron left'
            # 右圖示的圖示名稱
            right: 'chevron right'

# 中繼資料名稱。
Metadata =
    SLIDING : 'sliding'
    INDEX   : 'index'
    CONTENT : 'content'
    AUTOPLAY: 'autoplay'

# 事件名稱。
Event =
    CHANGE : "change#{EVENT_NAMESPACE}"
    CLICK  : "click#{EVENT_NAMESPACE}"

# 方向名稱
Direction =
    NEXT    : 'next'
    PREVIOUS: 'previous'
    LEFT    : 'left'
    RIGHT   : 'right'

# 樣式名稱。
ClassName =
    COMPACT   : 'compact'
    ACTIVE    : 'active'
    ITEMS     : 'items'
    ITEM      : 'item'
    OVERLAPPED: 'overlapped'
    CONTROLS  : 'controls'
    NAVIGABLE : 'navigable'
    ROUNDED   : 'rounded'
    CIRCULAR  : 'circular'
    INDICATORS: 'indicators'
    MOVING    : 'moving'
    LEFT      : 'left'
    RIGHT     : 'right'
    NEXT      : 'next'
    PREVIOUS  : 'previous'

# 選擇器名稱。
Selector =
    ITEM           : '.item'
    CHILD_ITEM     : ':scope > .item'
    CONTROLS_LEFT  : '.controls > .left'
    CONTROLS_RIGHT : '.controls > .right'
    ITEMS_ITEM     : '.items > .item'
    ACTIVE_ITEM    : '.items > .item.active'
    FIRST_ITEM     : '.items > .item:first-child'
    LAST_ITEM      : '.items > .item:last-child'
    INDICATORS_ITEM: '.indicators > .item'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    duration = 700

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        play: =>
            debug '播放幻燈片', element
            if module.has.timer()
                module.restart.timer()
            else
                module.set.timer()
            return $allModules

        pause: =>
            debug '暫停幻燈片', element
            module.stop.timer()
            return $allModules

        next: =>
            debug '下一張幻燈片', element
            module.goto Direction.NEXT
            return $allModules

        previous: =>
            debug '下一張幻燈片', element
            module.goto Direction.PREVIOUS
            return $allModules

        animate:
            move: (callback, $to) =>
                module.get.$current()
                    .off 'transitionend'
                    .one 'transitionend', =>
                        module.get.$items()
                            .removeClass ClassName.MOVING
                            .removeClass ClassName.ACTIVE
                        callback.call() if callback?
                    .emulate 'transitionend', duration

        goto: (direction, index) =>
            debug '幻燈片往指定方向切換', direction, index, element
            if module.is.sliding()
                return
            if module.has.timer()
                module.remove.timer()
                module.set.timer()
            switch
                when index?
                    $to = module.get.$item index
                when direction is Direction.NEXT
                    $to = module.get.next.$item()
                when direction is Direction.PREVIOUS
                    $to = module.get.previous.$item()
            if not index
                index = module.get.index $to
            module.set.sliding true
            module.set.direction direction, $to
            module.set.indicator index
            module.set.index     index
            module.trigger.change()
            module.animate.move =>
                module.remove.direction()
                module.set.sliding false
                module.set.active  index

        slide:
            to: (index) =>
                debug '滑到指定幻燈片索引', index, element
                module.goto module.get.direction(index), index
                return $allModules

        get:
            index: ($item) =>
                if $item? then $item.index() else $this.data Metadata.INDEX
            direction: (to) =>
                if to > module.get.index() then Direction.NEXT else Direction.PREVIOUS
            movingDirection: (direction) =>
                if direction is Direction.NEXT then ClassName.LEFT else ClassName.RIGHT
            html: =>
                $this.html()
            content: =>
                $this.data Metadata.CONTENT
            first:
                $item: =>
                    $this.find Selector.FIRST_ITEM
            last:
                $item: =>
                    $this.find Selector.LAST_ITEM
            next:
                $item: =>
                    index = module.get.index() + 1
                    if module.has.$item index
                        module.get.$item index
                    else
                        module.get.first.$item()
            previous:
                $item: =>
                    index = module.get.index() - 1
                    if module.has.$item index
                        module.get.$item index
                    else
                        module.get.last.$item()
            $items: =>
                $this
                    .find Selector.ITEMS_ITEM
            $item: (index) =>
                $this
                    .find Selector.ITEMS_ITEM
                    .eq   index
            $current: =>
                $this.find Selector.ACTIVE_ITEM
            $indicators: =>
                $this.find Selector.INDICATORS_ITEM

        has:
            timer: =>
                $this.hasTimer Metadata.AUTOPLAY
            $item: (index) =>
                module.get.$item(index).length > 0

        restart:
            timer: =>
                $this.playTimer Metadata.AUTOPLAY

        set:
            index: (index) =>
                $this.data Metadata.INDEX, index
            sliding: (bool) =>
                $this.data Metadata.SLIDING, bool
            content: (content) =>
                $this.data Metadata.CONTENT, content
            html: (html) =>
                $this.html html
            timer: =>
                $this.setTimer
                    name    : Metadata.AUTOPLAY
                    callback: module.next
                    interval: settings.interval
                    looping : true
                    visible : true
            active: (index) =>
                module.get.$item(index).addClass ClassName.ACTIVE
            indicator: (index) =>
                $this
                    .find        Selector.INDICATORS_ITEM
                    .removeClass ClassName.ACTIVE
                    .eq          index
                    .addClass    ClassName.ACTIVE
            direction: (direction, $to) =>
                movingDirection = module.get.movingDirection direction
                $to
                    .addClass direction
                    .repaint()
                    .addClass ClassName.MOVING, movingDirection
                module.get.$current()
                    .addClass ClassName.MOVING, movingDirection

        stop:
            timer: =>
                $this.pauseTimer Metadata.AUTOPLAY

        remove:
            timer: =>
                $this.removeTimer Metadata.AUTOPLAY
            direction: =>
                module.get.$items()
                    .removeClass ClassName.LEFT, ClassName.RIGHT, ClassName.NEXT, ClassName.PREVIOUS
            html: =>
                module.set.html ''

        should:
            autoplay: =>
                settings.autoplay

        is:
            sliding: =>
                $this.data Metadata.SLIDING

        trigger:
            change: =>
                $this.trigger Event.CHANGE, element, module.get.index()

        create:
            $control: =>
                ts '<div>'
                    .html     """
                        <a href="#!" class="left"><i class="#{settings.control.icon.left} icon"></i></a>
                        <a href="#!" class="right"><i class="#{settings.control.icon.right} icon"></i></a>
                    """
                    .addClass ClassName.CONTROLS
                    .addClass
                        "#{ClassName.OVERLAPPED}": settings.control.overlapped
                        "#{ClassName.COMPACT}"   : settings.control.style is ClassName.COMPACT
            $indicators: (amount) =>
                $indicators = ts '<div>'
                    .addClass ClassName.INDICATORS
                    .addClass
                        "#{ClassName.OVERLAPPED}": settings.indicator.overlapped
                        "#{ClassName.NAVIGABLE}" : settings.indicator.navigable
                        "#{ClassName.CIRCULAR}"  : settings.indicator.style isnt ClassName.ROUNDED
                for index in [1..amount]
                    $indicator = ts '<div>'
                        .addClass ClassName.ITEM
                        .addClass
                            "#{ClassName.ACTIVE}": index is 1
                    $indicators.append $indicator
                return $indicators

        bind:
            events: =>
                debug '綁定事件', element
                if settings.control
                    module.bind.control.events()
                if settings.indicator?.navigable
                    module.bind.indicator.events()
                $this.on Event.CHANGE, (event, context, index) =>
                    debug "發生 CHANGE 事件", context
                    settings.onChange.call context, event, index
            control:
                events: =>
                    debug '綁定控制按鈕事件', element
                    $this.on Event.CLICK, Selector.CONTROLS_LEFT, =>
                        debug "左控制按鈕發生 CLICK 事件", element
                        module.previous()
                    $this.on Event.CLICK, Selector.CONTROLS_RIGHT, =>
                        debug "右控制按鈕發生 CLICK 事件", element
                        module.next()
            indicator:
                events: =>
                    debug '綁定指示器事件', element
                    module.get.$indicators()
                        .each (element, index) =>
                            ts(element).on Event.CLICK, =>
                                debug "指示器發生 CLICK 事件", element
                                module.slide.to index

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化幻燈片', element
            $children = $this.find Selector.CHILD_ITEM
            $items    = ts '<div>'
                .addClass ClassName.ITEMS
                .append   $children

            module.set.content module.get.html()
            module.remove.html()

            if settings.control
                $this.append module.create.$control()

            $this.append $items

            if settings.indicator
                $this.append module.create.$indicators $children.length

            module.set.active 0
            module.set.index  0
            module.bind.events()

            if module.should.autoplay()
                module.play()

        instantiate: =>
            debug '實例化幻燈片', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀幻燈片', element
            module.remove.timer()
            module.set.html  module.get.content()
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules