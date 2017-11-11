# Checkbox
#
# 核取方塊。

class ContextMenu
    # 模組名稱。
    @module:
        'contextmenu'

    # 模組屬性。
    props:
        # 複合式選單應該出現在游標的哪個位置，如：`top left`、`top right`、`bottom left`、`bottom right`。
        position: 'auto'

        # 複合式選單離游標的距離（單位：像素）。
        distance: 0

        # 是否停用。
        disable: false

        # 目標選擇器。
        target: null

        # 複合式選單是否可因為使用者點擊選單外面而自動關閉。
        closable: true

        # 複合式選單是否可以因為在觸控裝置上長按而顯示。
        touch   : true

        # 當複合式選單出現時所會呼叫的回呼函式。
        onShow  : (target) => true

        # 當複合式選單隱藏時所會呼叫的回呼函式。
        onHide  : => true

        # 當複合式選單被點擊項目時所會呼叫的回呼函式。
        onSelect: (value, element) => true

    # 選單閉合的毫秒時間。
    duration: 300

    # 類別樣式名稱。
    className:
       VISIBLE  : 'visible'
       ANIMATING: 'animating'
       DOWNWARD : 'downward'
       UPWARD   : 'upward'
       RIGHTWARD: 'rightward'
       LEFTWARD : 'leftward'
       HIDDEN   : 'hidden'

    # 選擇器名稱。
    selector:
        BODY: 'body'
        ITEM: ':scope > .item'

    # 元素初始化函式。
    init: =>
        # 當網頁背景被按下時。
        $selector(@selector.BODY).on "click.contextmenu-#{@$elements.selector}", =>
            # 這個複合式選單允許關閉，那就就閉合這個選單。
            @contract() if @$this.data('closable')

        # 監聽父容器的多功能事件，並且開啟指定複合式選單。
        @$parent().on 'contextmenu.contextmenu', (event) =>
            # 阻止系統原生的多功能事件（如：右鍵選單、長按選單）。
            event.preventDefault()

            # 如果選單正處於停用中，就返回。
            return if @$this.data 'disable'

            # 在指定的位置展開複合式選單。
            @show event.clientX, event.clientY

        # 監聽複合式選單內所有項目的點擊事件，並在點擊後呼叫複合式選單的相關函式供使用者處理。
        @$this.find(@selector.ITEM).on 'click.contextmenu', (event) =>
            @$this.data('onSelect').call @$this.get(), $selector(event.target).attr('data-value'), event.target
        ts.fn

    # 元素摧毀函式。
    destroy: =>
        # 移除網頁背景的點擊事件。
        $selector(@selector.BODY).off "click.contextmenu-#{@$elements.selector}"

        # 移除父容器的多功能監聽事件。
        @$parent().off 'contextmenu.contextmenu'

        # 移除複合式選單內項目的點擊事件。
        @$this.find(@selector.ITEM).off 'click.contextmenu'

    # $Parent
    #
    # 取得父容器、複合式選單應該在哪個容器開啟的元素選擇器。
    $parent: =>
        if @$this.data('target') is null
            return $selector(@$this.parent())
        else
            return $selector(@$this.data('target'))

    # Contract
    #
    # 收起複合式選單。
    contract: =>
        # 如果這個複合式選單不是可見的，就不需要收起。
        if not @$this.hasClass @className.VISIBLE
            return

        # 呼叫 `onHide` 回呼函式，如果回傳的是 `false` 就不要收起。
        if @$this.data('onHide').call(@$this.get()) is false
            return

        # 執行收起動畫，並在動畫結束後清理多餘的樣式。
        @$this
            .off         'animationend'
            .removeClass @className.VISIBLE
            .addClass    "#{@className.HIDDEN} #{@className.ANIMATING}"
            .one         'animationend', =>
                @$this.removeClass "#{@className.VISIBLE} #{@className.ANIMATING} #{@className.DOWNWARD} #{@className.UPWARD} #{@className.RIGHTWARD} #{@className.LEFTWARD}"
            .emulate 'animationend', @duration

    # Expand
    #
    # 展開複合式選單，並且從接收到的 X、Y 座標找出滑鼠正指向的元素。
    expand: (x, y) =>
        # 呼叫 `onShow` 回呼函式，並且傳入滑鼠正指向的元素。
        # 當此函式回傳 `false` 則不要展開。
        if @$this.data('onShow').call(@$this.get(), document.elementFromPoint(x, y)) is false
            return

        # 執行展開動畫，並在動畫結束後清理多餘的樣式。
        @$this
            .off         'animationend'
            .removeClass @className.HIDDEN
            .addClass    "#{@className.VISIBLE} #{@className.ANIMATING}"
            .one 'animationend', =>
                @$this.removeClass @className.ANIMATING
            .emulate 'animationend', @duration

    # Get Menu Rect
    #
    # 取得選單的渲染屬性。
    getMenuRect: =>
        @$this.addClass @className.VISIBLE
        rect = @$this.get().getBoundingClientRect()
        @$this.removeClass @className.VISIBLE

        return rect

    # Show
    #
    # 在指定的 X、Y 座標以指定的方向顯示複合式選單。
    show: (x, y, position) =>
        r        = @getMenuRect()
        w        = window.innerWidth  / 2
        h        = window.innerHeight / 2
        d        = @$this.data 'distance'
        position = position or @$this.data 'position'

        # 如果方向是「自動」，那麼就以滑鼠在螢幕上的象限決定。
        if position is 'auto'
            switch
                when x < w and y < h
                    position = 'top left'
                when x < w && y > h
                    position = 'bottom left'
                when x > w && y > h
                    position = 'bottom right'
                when x > w && y < h
                    position = 'top right'

        # 移除先前的方向樣式。
        @$this.removeClass "#{@className.DOWNWARD} #{@className.UPWARD} #{@className.RIGHTWARD} #{@className.LEFTWARD}"

        # 依照指定的方向決定複合式選單的座標。
        switch position
            when 'top left'
                @$this
                    .addClass "#{@className.DOWNWARD} #{@className.RIGHTWARD}"
                    .css      'left', "#{x + d}px"
                    .css      'top' , "#{y + d}px"
            when 'bottom left'
                @$this
                    .addClass "#{@className.UPWARD} #{@className.RIGHTWARD}"
                    .css      'left', "#{x + d}px"
                    .css      'top' , "#{y + d - r.height}px"
            when 'bottom right'
                @$this
                    .addClass "#{@className.UPWARD} #{@className.LEFTWARD}"
                    .css      'left', "#{x + d - r.width}px"
                    .css      'top' , "#{y + d - r.height}px"
            when 'top right'
                @$this
                    .addClass "#{@className.DOWNWARD} #{@className.LEFTWARD}"
                    .css      'left', "#{x + d - r.width}px"
                    .css      'top' , "#{y + d}px"

        # 展開複合式選單，並且傳入滑鼠的 X、Y 座標好作處理。
        @expand(x, y)

    # 模組可用的方法。
    methods: =>

        # Show
        #
        # 在目前游標或指定的位置顯示複合選單。
        show: (x, y) =>
            do =>
                await @delay()
                @show x, y
            ts.fn

        # Hide
        #
        # 隱藏複合選單。
        hide: =>
            do =>
                await @delay()
                @contract()
            ts.fn

        # Disable
        #
        # 停用複合選單的監聽事件，避免顯示。
        disable: =>
            @$this.data 'disable', true
            ts.fn

        # Enable
        #
        # 啟用複合選單的監聽事件。
        enable: =>
            @$this.data 'disable', false
            ts.fn

        # Destroy
        #
        # 銷毀一個複合式選單。
        destroy: =>
            @destroy()
            ts.fn

        # Is Disable
        #
        # 回傳複合選單是否被停用的布林值。
        'is disable': =>
            @$this.data('disable') is true

        # Is Enable
        #
        # 回傳複合選單是否啟用中的布林值。
        'is enable': =>
            @$this.data('disable') is false

        # Is Visible
        #
        # 回傳複合選單現在是否正在顯示中的布林值。
        'is visible': =>
            @$this.hasClass @className.VISIBLE

        # Is Hidden
        #
        # 回傳複合選單現在是否正在隱藏中的布林值。
        'is hidden': =>
            not @$this.hasClass @className.VISIBLE

ts ContextMenu