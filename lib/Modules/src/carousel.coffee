class TocasCarousel
    $name:
        'carousel'
    $data:
        left : '.controls .left'
        right: '.controls .right'
    $options:
        interval   : 2000 # 幻燈片換到下一張的毫秒相隔時間。
        autoplay   : true # 是否要自動播放。
        covered    : false
        indicator  :
            style    : 'round'
            navigable: true
        control:
            icon:
                left : 'angle left'
                right: 'angle right'
        onChange: ->   # 當幻燈片變更時所呼叫的函式。
        onCycle : ->   # 當幻燈片完成一個循環時所呼叫的函式。
        items   : []
        # items: [
        #     {
        #         image      : 'www.example.com/test.png'
        #         header     : 'Header'
        #         description: 'Description.'
        #     }
        # ]


    $init: ({$this, $delay, $module}) ->
        $control    = $selector('<div>').addClass 'controls'
        $indicators = $selector('<div>').addClass 'indicators'
        $items      = $selector('<div>').addClass 'items'

        $control.html """
            <a href="#!" class="left"><i class="angle left icon"></i></a>
            <a href="#!" class="right"><i class="angle right icon"></i></a>
        """

        $item = $this.find(':scope > .item')
        $item.each (_, i) ->
            $indicators.append $selector('<div>').addClass('item' + if i is 0 then ' active' else '').get()
        $items.append($item)

        $first = $items.find '.item:first-child'
        $last  = $items.find '.item:last-child'

        #
        $firstDuplicated = $first.clone().addClass 'duplicated'
        $lastDuplicated  = $last.clone().addClass  'duplicated'
        $firstDuplicated.appendTo $items
        $lastDuplicated.prependTo $items

        $first.addClass 'active'


        $this
            .html ''
            .append $items
            .append $control
            .append $indicators


        $this.find('.controls > .left').on 'click', ->
            $module::_previous {$this, $delay, $module}

        $this.find('.controls > .right').on 'click', ->
            $module::_next {$this, $delay, $module}

        $items
            .addClass 'resetting'
            .css      'margin-left', -Math.abs parseInt $items.find('.item:first-child').css('width')
        await $delay()
        $items.removeClass 'resetting'
        $items.find('.item').css('width', $items.parent().css('width'))
        $this.data 'index', 0


    _slide: ({$this, $delay}, direction) ->
        toNext = direction is 'next'

        # 取得目前的幻燈片索引。
        index = $this.data 'index'
        # 取得幻燈片的指示器。
        $indicators = $this.find '.indicators'
        # 取得目前的幻燈片元素。
        $current = $this.find '.items > .item.active'
        # 取得幻燈片的下一個元素。
        $next = if toNext then $current.next() else $current.prev()
        # 取得幻燈片項目容器。
        $items = $this.find '.items'
        # 如果下一個元素是重複的，那麼就表示這個幻燈片已經到底了。
        isLast = $next.hasClass 'duplicated'

        # 移除這個幻燈片的啟用樣式。
        $current.removeClass 'active'

        # 取得下個幻燈片的寬度。
        nextWidth = parseInt $next.css 'width'
        # 取得目前的偏移。
        currentMargin = parseInt $items.css 'margin-left'
        # 移動到下一個幻燈片。
        $items.css 'margin-left', if toNext then currentMargin - nextWidth else currentMargin + nextWidth

        # 如果這個幻燈片是最後一個。
        if isLast
            # 移動完之後。
            $items.one 'transitionend', ->
                # 加上重設樣式避免觸動動畫效果，然後重設偏移，
                # 這樣能在使用者沒發現的情況下重新回到第一個元素。
                $items.addClass 'resetting'
                if toNext
                    $items.css 'margin-left', -Math.abs nextWidth
                else
                    width = 0
                    # 取得所有幻燈片的寬度並進行加總。
                    $items.find('.item:not(.duplicated)').each -> width += parseInt $selector(@).css 'width'
                    # 轉跳到最後一個換燈片的位置。
                    $items.css 'margin-left', -Math.abs width
                await $delay()
                # 移除重設樣式，這樣才能重新啟用動畫效果。
                $items.removeClass 'resetting'

        # 設置新的索引。
        if toNext
            index = if isLast then 0 else index + 1
        else
            index = if isLast then $items.find('.item').length - 3 else index - 1

        # 更新幻燈片內的索引值。
        $this.data 'index', index
        # 移除所有指示器的啟用樣式，基於新的幻燈片的索引加上啟用樣式。
        $indicators.children().removeClass('active').eq(index).addClass('active')
        # 啟用指定的新幻燈片。
        $items.find('.items > .item:not(.duplicated)').eq(index).addClass 'active'


    _next: ({$this, $delay, $module}) ->
        $module::_slide {$this, $delay}, 'next'

    _previous: ({$this, $delay, $module}) ->
        $module::_slide {$this, $delay}, 'previous'



    _pause: ->

    _jump: ->

    $methods:
        # 開始播放幻燈片。
        play: ({$this}) ->

        # 暫停幻燈片。
        pause: ({$this}) ->

        # 切換下一個幻燈片。
        next: ({$this}) ->

        # 切換上一個幻燈片。
        previous: ({$this}) ->

        # 跳到指定的幻燈片。
        jump: ({$this}, to) ->

new ts TocasCarousel