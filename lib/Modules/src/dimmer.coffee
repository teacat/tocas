class TocasDimmer
    $name:
        'dimmer'

    $methods:
        # 顯示淡化幕。
        show: ({$this}) ->
            $this.addClass 'active'
            ts.fn

        # 隱藏淡化幕。
        hide: ({$this}) ->
            $this.removeClass 'active'
            ts.fn

        # 切換淡化幕。
        toggle: ({$this}) ->
            $this.toggleClass 'active'
            ts.fn

        # 回傳一個表示淡化幕是否正在顯示中的布林值。
        'is active': ({$this}) ->
            $this.hasClass 'active'

new ts TocasDimmer