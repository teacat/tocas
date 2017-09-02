class TocasRating
    $name:
        'rating'

    $options:
        rating      : 0          # 初期的評分數值。
        maxRating   : 5          # 評分數值的最大上限。
        clearable   : 'auto'     # 評分數值是否可由重新點擊一次而清除，照理來說如果評分只有一個星，這是被允許的。
        interactive : true       # 評分數值是否可被改變。
        onRate      : (value) -> # 當評分數值更改時所呼叫的函式。

    # 初始化事件。
    _init: ({$this, $options, $module}, {rating, maxRating}) ->
        # 如果已經有星星的話則移除所有星星。
        $this.find('i').remove()
        # 初始化評分元件的時候，依照設置來決定要在元件內產生幾顆星星元素。
        for _ in [1..maxRating]
            $selector('<i>').addClass('icon').appendTo($this)

        # 當使用者在圖示上觸控按著移動的時候。
        $this.on 'touchmove', (e) ->
            $icon = $selector document.elementFromPoint e.touches[0].clientX, e.touches[0].clientY
            if $selector(e.target).parent().get() isnt $icon.parent().get()
                return
            $icon.prevAll().addBack().addClass 'selected'
            $icon.nextAll().removeClass 'selected'
            $this.data '$lastIcon', $icon

        # 當使用者在圖示上放開觸控的時候。
        $this.find('.icon').on 'touchend', (e) ->
            $lastIcon = $this.data '$lastIcon'

            # 如果沒有 touchmove 時所記錄的最後一個圖示元素則離開。
            if $lastIcon is undefined
                $lastIcon = $selector(e.target)

            # 取得目前的評分數值還有點擊的評分數值。
            rating        = $lastIcon.index() + 1
            currentRating = $this.data 'rating'

            # 如果目前的評分數值和點下去的ㄧ樣。
            if rating is currentRating
                # 如果這個評分元件允許重設評分，就來重設吧。
                if $this.data('clearable') is true
                    # 重設評分為零。
                    $module::_set {$this}, 0
            # 不然如果點的是其他的評分。
            else
                # 設置評分的分數。
                $module::_set {$this}, rating



        # 當滑鼠在圖示上移動的時候。
        $this.find('.icon').on 'mousemove', ->
            isLast = $this.data 'isLast'
            # 如果這個星星不是剛點擊的，我們就把這個星星和前面的星星
            # 加上「選取中」的樣式，讓使用者能分辨目前滑鼠所選取的星星數量和實際數量的差異。
            $selector(@).prevAll().addBack().addClass('selected') if !isLast

        # 當滑鼠移出圖示的時候。
        $this.on 'mouseout', ->
            # 移除所有圖示的「選取中」樣式。
            $this.children().removeClass 'selected'
            # 因為移出了圖示，所以沒有被點擊，把被點擊設置為 `false`。
            $this.data 'isLast', false

        set = (e) ->
            $selector(@).off 'mouseup click', set

            if $this.data('$lastIcon') isnt undefined and $this.data('$lastIcon').get() is e.target
                return

            # 取得目前的評分數值還有點擊的評分數值。
            rating        = $selector(@).index() + 1
            currentRating = $this.data 'rating'

            # 如果目前的評分數值和點下去的ㄧ樣。
            if rating is currentRating
                # 如果這個評分元件允許重設評分，就來重設吧。
                if $this.data('clearable') is true
                    # 重設評分為零。
                    $module::_set {$this}, 0
            # 不然如果點的是其他的評分。
            else
                # 設置評分的分數。
                $module::_set {$this}, rating
            # 因為被按下了，所以將被點擊設置為 `true`。
            $this.data 'isLast', true


        # 當滑鼠放開或是按下時。
        $this.find '.icon'
            .off 'mouseup click', set
            .on  'mouseup click', set
            .on  'mouseup', ->
                $selector(@).on 'mouseup click', set

        # 設置預設的評分數值。
        $module::_set {$this}, rating, false

    $init: ({$this, $options, $module}) ->
        config =
            rating   : $this.attr('data-rating')     or $options.rating
            maxRating: $this.attr('data-max-rating') or $options.maxRating

        $module::_init {$this, $module}, config

    $opts: ({$this, $options, $module}, options) ->
        config = {
            rating   : $this.data 'rating'
            maxRating: $this.data 'maxRating'
            ...options
        }

        $module::_init {$this, $module}, config

    # 設置指定評分數值，並且變動星星的圖示。
    _set: ({$this}, rating, callable=true) ->
        # 設置實際數值。
        $this.data 'rating', rating
        # 呼叫回呼函式。
        $this.data('onRate').call($this, rating) if callable
        # 如果評分是 0 的話。
        if rating is 0
            # 就移除所有的選定星星圖示。
            setTimeout ->
                $this.find('.icon').removeClass 'selected active'
            , 0
        else
            # 不然就找到指定的星星，如 3 分就找第 3 個星星。
            $ratingIcon = $this.find(".icon:nth-child(#{rating})")
            # 移除這個星星和前面星星的所有「選取中」樣式，並且增加「已啟用」樣式。
            $ratingIcon.prevAll().addBack().removeClass('selected').addClass 'active'
            # 然後移除之後星星的選取與啟用樣式。
            $ratingIcon.nextAll().removeClass 'active selected'

    $methods:
        # 停用指定評分，令使用者不得變更其數值。
        disable: ({$this}) ->
            $this.addClass 'disabled'

        # 啟用指定評分，讓使用者可以更改其數值。
        enable: ({$this}) ->
            $this.removeClass 'disabled'

        # 清除、歸零指定評分。
        'clear rating': ({$this, $module}) ->
            $module::_set {$this}, 0

        # 取得指定評分數值。
        'get rating': ({$this}) ->
            $this.data 'rating'

        # 設置指定評分數值。
        'set rating': ({$this, $module}, rating) ->
            $module::_set {$this}, rating

new ts TocasRating