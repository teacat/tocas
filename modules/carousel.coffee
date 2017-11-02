# Carousel
#
# 幻燈片。

class Carousel
    # 模組名稱。
    @module:
        'carousel'

    # 模組屬性。
    props:
        # 幻燈片換到下一張的毫秒相隔時間。
        interval   : 4000
        # 是否要自動播放。
        autoplay   : true
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
        # 當幻燈片變更時所呼叫的函式。
        onChange: ->

    # 模組自己選擇器。
    $this: null

    # 延遲函式。
    delay: ->

    # 幻燈片切換動畫效果毫秒。
    duration: 700

    # 類別樣式名稱。
    className:
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

    # 選擇器名稱。
    selector:
        ITEM          : '.item'
        CHILD_ITEM    : ':scope > .item'
        CONTROLS_LEFT : '.controls > .left'
        CONTROLS_RIGHT: '.controls > .right'
        ITEMS_ITEM    : '.items > .item'
        ACTIVE_ITEM   : '.items > .item.active'
        FIRST_ITEM    : '.items > .item:first-child'
        LAST_ITEM     : '.items > .item:last-child'
        INDICATORS_ITEM: '.indicators > .item'

    # 控制元素的 HTML 原始碼。
    controlHTML: (left, right) -> """
        <a href="#!" class="left"><i class="#{left} icon"></i></a>
        <a href="#!" class="right"><i class="#{right} icon"></i></a>
    """

    # 元素初始化函式。
    init: =>
        # 保存這個幻燈片的內容，供日後若需摧毀可重生。
        @$this.data 'content', @$this.html()

        # 建立項目容器，用來包裹所有的幻燈片。
        $items = $selector('<div>').addClass @className.ITEMS

        # 取得使用者已經擺置的幻燈片。
        $item = @$this.find @selector.CHILD_ITEM

        # 給第一個幻燈片啟用樣式。
        $item.eq(0).addClass @className.ACTIVE

        # 將這些幻燈片移動到項目容器中。
        $items.append $item

        # 清除原先幻燈片的所有內容。
        @$this.html ''

        # 從元素中抓出設定。
        control   = @$this.data 'control'
        autoplay  = @$this.data 'autoplay'
        indicator = @$this.data 'indicator'
        onChange  = @$this.data 'onChange'

        # 如果有控制元素設置。
        if control isnt false
            overlapped = if control.overlapped                  then @className.OVERLAPPED else ''
            compact    = if control.style is @className.COMPACT then @className.COMPACT    else ''

            # 建立控制元素，並且加上指定的圖示。
            left     = control.icon.left
            right    = control.icon.right
            $control = $selector('<div>').addClass("#{overlapped} #{compact} #{@className.CONTROLS}").html @controlHTML left, right

            # 移動到幻燈片容器中。
            @$this.append $control

            # 給控制按鈕加上控制事件。
            @$this.find(@selector.CONTROLS_LEFT).on  'click', => @previous()
            @$this.find(@selector.CONTROLS_RIGHT).on 'click', => @next()

        # 將幻燈片容器在控制元素之後插入，
        # 這樣才能透過控制元素的樣式來取決幻燈片容器的樣式。
        # CSS Selector 的 `x + x`。
        @$this.append $items

        # 如果有指示器設置。
        if indicator isnt false
            overlapped = if indicator.overlapped         then @className.OVERLAPPED else ''
            navigable  = if indicator.navigable          then @className.NAVIGABLE  else ''
            style      = if indicator.style is @className.ROUNDED then ''           else @className.CIRCULAR

            # 建立指示器元素，並且決定是否可供導覽點按。
            $indicators = $selector('<div>').addClass "#{navigable} #{overlapped} #{style} #{@className.INDICATORS}"

            # 替幻燈片產生指示器的元素。
            for index in [1..$item.length]
                active = if index is 1 then " #{@className.ACTIVE}" else ''
                $indicators.append $selector('<div>').addClass "#{active} #{@className.ITEM}"

            # 如果可供導覽點按，則綁定點擊事件。
            if indicator.navigable
                $indicators.find(@selector.ITEM).each (element, index) =>
                    $selector(element).on 'click', => @slideTo index

            # 移動到幻燈片容器中。
            @$this.append $indicators

        # 初始化索引為零。
        @$this.data 'index', 0

        # 如果要自動播放的話則建立計時器。
        @play() if autoplay

    # 元素摧毀函式。
    destroy: =>
        # 移除所有計時器。
        @$this.removeTimer 'autoplay'
        # 重生幻燈片原本的 HTML 內容。
        @$this.html @$this.data 'content'

    # Play
    #
    # 繼續幻燈片的自動輪播。
    play: =>
        # 如果已經有設置計時器就表示正在播放（或計時器正暫停中）。
        if @$this.hasTimer 'autoplay'
            # 重新啟動計時。
            @$this.playTimer 'autoplay'
        else
            # 如果沒有計時器就建立輪播用的計時器。
            @$this.setTimer
                name    : 'autoplay'
                # 時間到了就呼叫切換下一張的函式。
                callback: @next
                interval: @$this.data 'interval'
                looping : true
                visisble: true

    # Pause
    #
    # 暫停幻燈片的自動輪播。
    pause: =>
        # 移除這個計時器。
        @$this.pauseTimer 'autoplay'

    # Slide
    #
    # 向特定方向移動幻燈片。
    slide: (direction, $nextElement) =>
        # 如果正在滑動中，則取消本次的指令。
        if @$this.data('sliding') is true
            return

        # 標記幻燈片正在滑動中，避免重複執行發生問題。
        @$this.data 'sliding', true

        # 取得幻燈片移動的方向該往左邊還是右邊。
        movingDirection = if direction is 'next' then 'left' else 'right'

        # 取得目前正在顯示的幻燈片。
        $current = @$this.find @selector.ACTIVE_ITEM

        # 依照方向來決定下一個幻燈片是哪個元素，如果沒有下個元素則為最後（或第一個），那麼就取得最邊緣的那個元素。
        if $nextElement isnt undefined
            $next = $nextElement
        else if direction is 'next'
            $next = $current.next()
            $next = if $next.length is 0 then @$this.find(@selector.FIRST_ITEM) else $next
        else
            $next = $current.prev()
            $next = if $next.length is 0 then @$this.find(@selector.LAST_ITEM) else $next

        # 移除所有指示器的啟用樣式，然後替指定指示器加上已啟用樣式。
        @$this.find(@selector.INDICATORS_ITEM).removeClass(@className.ACTIVE).eq($next.index()).addClass @className.ACTIVE

        # 替下一個幻燈片加上順序。
        $next.addClass direction

        # 稍微等待一下。
        await @delay 30

        # 替目前的幻燈片加上移動效果。
        $current.addClass "#{@className.MOVING} #{movingDirection}"

        # 我們同時也移動下一個幻燈片進來。
        $next.addClass "#{@className.MOVING} #{movingDirection}"

        # 設置新的索引。
        index = $next.index()
        @$this.data 'index', $next.index()

        # 呼叫指定事件。
        @$this.data('onChange').call @$this.get(), index

        # 當目前舊的幻燈片移動完畢時。
        $current
            .one 'transitionend', =>
                # 順便移除下個幻燈片的移動效果，並且加上已啟用樣式。
                $next.removeClass("#{@className.MOVING} #{movingDirection} #{direction}").addClass @className.ACTIVE

                # 同時移除這個舊的幻燈片樣式。
                $current.removeClass "#{@className.ACTIVE} #{@className.MOVING} #{movingDirection} #{direction}"

                # 滑動已結束。
                @$this.data 'sliding', false
            .emulate 'transitionend', @duration

    # Next
    #
    # 移動到下一個幻燈片。
    next: =>
        @slide 'next'

    # Previous
    #
    # 移動到上個幻燈片。
    previous: =>
        @slide 'previous'

    # Slide To
    #
    # 跳到指定的幻燈片。
    slideTo: (index) =>
        $eqItem = @$this.find(@selector.ITEMS_ITEM).eq index
        current = @$this.data 'index'

        # 如果沒有指定的幻燈片索引或與現在的索引相同則離開。
        if $eqItem.length is 0 or current is index
            return
        else
            # 比對目前的索引還有準備跳往的索引來決定應該往又還是往左滑。
            direction = if index > current then 'next' else 'previous'
            @slide direction, $eqItem

    # 模組可用的方法。
    methods: =>

        # Play
        #
        # 開始播放幻燈片。
        play: =>
            @play()
            ts.fn

        # Pause
        #
        # 暫停幻燈片。
        pause: =>
            @pause()
            ts.fn

        # Next
        #
        # 切換下一個幻燈片。
        next: =>
            @next()
            ts.fn

        # Previous
        #
        # 切換上一個幻燈片。
        previous: =>
            @previous()
            ts.fn

        # Slide To
        #
        # 跳到指定的幻燈片。
        'slide to': (index) =>
            @slideTo index
            ts.fn

        # Get Index
        #
        # 取得目前幻燈片的索引。
        'get index': =>
            @$this.data 'index'

ts Carousel