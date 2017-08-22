class TocasMessage
    $name:
        'message'

    $init: ({$this}) ->
        $this.find('.close.button').on 'click', ->
            $this.addClass 'hidden'

    $methods:
        # 顯示訊息。
        show: ({$this}) ->
            $this.removeClass 'hidden'

        # 隱藏訊息。
        hide: ({$this}) ->
            $this.addClass 'hidden'

        # 切換訊息。
        toggle: ({$this}) ->
            $this.toggleClass 'hidden'

        # 回傳一個表示訊息是否正在隱藏狀態的布林值。
        'is hidden': ({$this}) ->
            $this.hasClass 'hidden'

        # 回傳一個表示訊息是否正在顯示中的布林值。
        'is visible': ({$this}) ->
            not $this.hasClass 'hidden'

new ts TocasMessage