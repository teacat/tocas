class TocasAccordion
    $name:
        'accordion'

    $data:
        title        : '.title'          # 標題的類別名稱。
        content      : '.content'        # 分頁內容的類別名稱。
        accordion    : '.ts.accordion'   # 手風琴容器的類別名稱。
        activeContent: '.content.active' # 已啟用的分頁內容類別名稱。

    $options:
        exclusive: true # 是否僅允許單個手風琴只有一個分頁能被打開，設為 false 則無限制。
        onOpen   : ->   # 當分頁被打開時所呼叫的函式。
        onClose  : ->   # 當分頁被關閉時所呼叫的函式。
        onChange : ->   # 當分頁被打開或者關閉時所呼叫的函式。

    $init: ({$this, $module, $data, $delay, $options}) ->
        # 尋找手風琴容器裡的每個標題，當標題被按下時。
        $this.find($data.title).on 'click', ->
            # 因為是標題被按下，所以我們呼叫切換手風琴分頁的函式，
            # 當手風琴是開的，則關，反之亦然。
            $module::_toggle {$this, $delay}, $selector(@)
        ts.fn

    # 呼叫指定事件函式。
    _event: ($this, event, title) ->
        $this.data(event).call $this.get(), Math.floor(title.index() / 2)

    # 開啟手風琴分頁。
    _open: ({$this, $delay}, title) ->
        if $this.hasClass 'animating'
            return

        # 呼叫指定事件函式。
        @_event $this, 'onOpen'  , title
        @_event $this, 'onChange', title

        # 取得內容元素。
        content = title.next()

        # 如果要開啟的分頁，正是已經被開啟的那個，
        # 那麼就忽略這次的請求。
        if content.get() is $this.find(@$data.activeContent).get()
            return

        # 如果手風琴只允許同ㄧ時間展開一個分頁。
        if title.closest(@$data.accordion).data('exclusive')
            # 那麼就上拉並關閉其他的分頁內容。
            activeContent = $this.find(@$data.activeContent)
            if activeContent.length isnt 0
                # 呼叫事件函式。
                @_event $this, 'onClose' , activeContent.prev()
                @_event $this, 'onChange', activeContent.prev()
                # 重新計算內容目前的高度。
                height = activeContent.css 'height'
                # 替內容設置固定高度。
                activeContent.css 'height', height
                await $delay()
                # 呼叫上拉動畫
                activeContent.css 'height', '0px'
                activeContent.one 'transitionend', ->
                    activeContent.css 'height', ''
                    $selector(@).removeClass        'active'
                    $selector(@).prev().removeClass 'active'

        # 啟用指定分頁的標題。
        title.addClass 'active'

        # 啟用指定分頁的內容，並馬上顯示內容。
        content.addClass 'active'
        content.css 'height', 'auto'

        # 取得該內容展開時的高度。
        height = content.css 'height'

        # 現在趕快把內容趁使用者沒看見之前藏起來。
        content.css 'height', '0px'

        # 現在展開，讓使用者看到下拉的動畫。
        await $delay()
        content.css 'height', height
        $this.addClass 'animating'

        # 下拉完畢之後移除固定高度，這樣才能有彈性高度。
        content.one 'transitionend', ->
            content.css 'height', ''
            $this.removeClass 'animating'

    # 關閉手風琴分頁。
    _close: ({$this, $delay}, title) ->
        if $this.hasClass 'animating'
            return

        # 呼叫事件函式。
        @_event $this, 'onClose' , title
        @_event $this, 'onChange', title

        # 取得內容元素。
        content = title.next()
        # 如果該手風琴分頁本來就沒被啟用，就取消這個請求。
        if !title.hasClass 'active'
            return
        # 移除標題的啟用樣式。
        title.removeClass 'active'

        # 重新計算內容目前的高度。
        height = content.css 'height'
        # 替內容設置固定高度。
        content.css 'height', height
        $this.addClass 'animating'
        await $delay()
        # 將內容高度設為 0px ，這樣才能觸發上拉動畫。
        content.css 'height', '0px'
        # 當上拉動畫結束的時候，才移除內容的啟用樣式，
        # 直接移除的話會沒辦法觸發動畫效果。
        content.one 'transitionend', ->
            content.css 'height', ''
            content.removeClass 'active'
            $this.removeClass 'animating'

    # 切換手風琴分頁。
    _toggle: ({$this, $delay}, title) ->
        if title.hasClass 'active'
            @_close {$this, $delay}, title
        else
            @_open {$this, $delay}, title

    $methods:
        # 開啟指定索引的手風琴內容。
        open: ({$this, $module, $delay, $data}, index) ->
            $module::_open {$this, $delay}, $this.find($data.title).eq(index)
            ts.fn

        # 關閉指定索引的手風琴內容。
        close: ({$this, $module, $delay, $data}, index) ->
            $module::_close {$this, $delay}, $this.find($data.title).eq(index)
            ts.fn

        # 切換指定索引的手風琴內容，如果是開啟的則關閉，相反之。
        toggle: ({$this, $module, $delay, $data}, index) ->
            $module::_toggle {$this, $delay}, $this.find($data.title).eq(index)
            ts.fn

new ts TocasAccordion