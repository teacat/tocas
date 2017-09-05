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
        #$firstDuplicated = $first.clone().addClass 'duplicated'
        #$lastDuplicated  = $last.clone().addClass  'duplicated'
        #$firstDuplicated.appendTo $items
        #$lastDuplicated.prependTo $items

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


        $this.data 'index', 0


    _slide: ({$this, $delay}, direction) ->

        if $this.data('sliding') is true
            return

        $this.data 'sliding', true

        movingDirection = if direction is 'next' then 'left' else 'right'

        $current = $this.find('.items > .item.active')

        if direction is 'next'
            $next = $current.next()
            $next = if $next.length is 0 then $this.find('.items > .item:first-child') else $next
        else
            $next = $current.prev()
            $next = if $next.length is 0 then $this.find('.items > .item:last-child') else $next


        $next.addClass(direction)
        await $delay(30)
        $current.addClass("moving #{movingDirection}")
        $next.addClass("moving #{movingDirection}")

        $current.one 'transitionend', ->

            $next.removeClass("moving #{movingDirection} #{direction}")
            $next.addClass('active')

            $current.removeClass("active moving #{movingDirection} #{direction}")
            $this.data 'sliding', false




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