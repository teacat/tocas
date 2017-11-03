# Accordion
#
# 手風琴。

class Accordion
    # 模組名稱。
    @module:
        'accordion'

    # 模組屬性。
    props:
        # 是否僅允許單個手風琴只有一個分頁能被打開，設為 false 則無限制。
        exclusive: true
        # 當分頁被打開時所呼叫的函式。
        onOpen   : ->
        # 當分頁被關閉時所呼叫的函式。
        onClose  : ->
        # 當分頁被打開或者關閉時所呼叫的函式。
        onChange : ->

    # 所選的手風琴標題元素。
    $title: null

    # 開展閉合動畫效果毫秒。
    duration: 400

    # 類別樣式名稱。
    className:
        ACTIVE   : 'active'
        ANIMATING: 'animating'

    # 選擇器名稱。
    selector:
        TITLE         : '.title'
        CONTENT       : '.content'
        ACCORDION     : '.ts.accordion'
        ACTIVE_CONTENT: '.content.active'
        ACTIVE        : '.active'

    # 元素初始化函式。
    init: =>
        module = @
        # 尋找手風琴容器裡的每個標題，當標題被按下時。
        @$this.find(@selector.TITLE).on 'click.accordion', ->
            # 因為是標題被按下，所以我們呼叫切換手風琴分頁的函式，
            # 當手風琴是開的，則關，反之亦然。
            module.$title = $selector @
            module.toggle()
        ts.fn

    # 元素摧毀函式。
    destroy: =>
        # 移除 `click` 的綁定事件。
        @$this.find(@selector.TITLE).off 'click.accordion'
        # 關閉所有手風琴。
        @$this.find(@selector.ACTIVE).removeClass @className.ACTIVE

    # Open
    #
    # 開啟手風琴分頁。
    open: =>
        # 如果這個手風琴正在執行動畫效果則離開。
        if @$this.hasClass @className.ANIMATING
            return

        # 呼叫指定事件函式。
        @event 'onOpen'
        @event 'onChange'

        # 取得內容元素。
        $content = @$title.next()

        # 如果要開啟的分頁，正是已經被開啟的那個，
        # 那麼就忽略這次的請求。
        if $content.get() is @$this.find(@selector.ACTIVE_CONTENT).get()
            return

        # 如果手風琴只允許同ㄧ時間展開一個分頁。
        if @$title.closest(@selector.ACCORDION).data 'exclusive'
            # 那麼就上拉並關閉其他的分頁內容。
            $activeContent = @$this.find @selector.ACTIVE_CONTENT

            # 如果有其他分頁內容則對這些分頁內容進行處理。
            if $activeContent.length isnt 0
                # 呼叫事件函式。
                @event 'onClose' , $activeContent.prev()
                @event 'onChange', $activeContent.prev()

                # 重新計算內容目前的高度。
                height = $activeContent.css 'height'

                # 替內容設置固定高度。
                $activeContent.css 'height', height

                # 稍微延遲一下，避免太快執行會沒有效果。
                await @delay()

                # 呼叫上拉動畫
                $activeContent
                    .css 'height', '0px'
                    .one 'transitionend', =>
                        $activeContent
                            .css         'height', ''
                            .removeClass @className.ACTIVE
                            .prev()
                            .removeClass @className.ACTIVE
                    .emulate 'transitionend', @duration


        # 啟用指定分頁的標題。
        @$title.addClass @className.ACTIVE

        # 啟用指定分頁的內容，並馬上顯示內容。
        $content
            .addClass @className.ACTIVE
            .css      'height', 'auto'

        # 取得該內容展開時的高度。
        height = $content.css 'height'

        # 現在趕快把內容趁使用者沒看見之前藏起來。
        $content.css 'height', '0px'

        # 稍微延遲一下，避免太快執行會沒有效果。
        await @delay()

        # 現在展開，讓使用者看到下拉的動畫。
        $content.css 'height', height

        # 表明這個手風琴正在執行動畫。
        @$this.addClass @className.ANIMATING

        # 下拉完畢之後移除固定高度，這樣才能有彈性高度。
        $content
            .one 'transitionend', =>
                $content.css      'height', ''
                @$this.removeClass @className.ANIMATING
            .emulate 'transitionend', @duration

    # Close
    #
    # 關閉手風琴分頁。
    close: =>
        # 如果這個手風琴正在執行動畫效果則離開。
        if @$this.hasClass @className.ANIMATING
            return

        # 呼叫事件函式。
        @event 'onClose'
        @event 'onChange'

        # 取得內容元素。
        $content = @$title.next()

        # 如果該手風琴分頁本來就沒被啟用，就取消這個請求。
        if !@$title.hasClass @className.ACTIVE
            return

        # 移除標題的啟用樣式。
        @$title.removeClass @className.ACTIVE

        # 重新計算內容目前的高度。
        height = $content.css 'height'

        # 替內容設置固定高度。
        $content.css 'height', height

        # 表明這個手風琴正在執行動畫。
        @$this.addClass @className.ANIMATING

        # 稍微延遲一下，避免太快執行會沒有效果。
        await @delay()

        # 將內容高度設為 0px ，這樣才能觸發上拉動畫。
        $content.css 'height', '0px'

        # 當上拉動畫結束的時候，才移除內容的啟用樣式，
        # 直接移除的話會沒辦法觸發動畫效果。
        $content
            .one 'transitionend', =>
                $content
                    .css         'height', ''
                    .removeClass @className.ACTIVE
                @$this
                    .removeClass 'animating'
            .emulate 'transitionend', @duration

    # Toggle
    #
    # 切換手風琴分頁。
    toggle: =>
        if @$title.hasClass @className.ACTIVE
            @close()
        else
            @open()

    # Event
    #
    # 呼叫指定事件函式。
    event: (event, $title = @$title) =>
        @$this.data(event).call @$this.get(), Math.floor(@$title.index() / 2)


    # 模組可用的方法。
    methods: =>

        # Open
        #
        # 開啟指定索引的手風琴內容。
        open: (index) =>
            @$title = @$this.find(@selector.TITLE).eq(index)
            @open()
            ts.fn

        # Close
        #
        # 關閉指定索引的手風琴內容。
        close: (index) =>
            @$title = @$this.find(@selector.TITLE).eq(index)
            @close()
            ts.fn

        # Toggle
        #
        # 切換指定索引的手風琴內容，如果是開啟的則關閉，相反之。
        toggle: (index) =>
            @$title = @$this.find(@selector.TITLE).eq(index)
            @toggle()
            ts.fn

ts Accordion