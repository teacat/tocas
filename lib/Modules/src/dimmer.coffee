class TocasDimmer
    $name:
        'dimmer'

    $methods:
        # 顯示淡化幕。
        show: ({$elements}) ->
            $elements.addClass 'active'
            ts.fn

        # 隱藏淡化幕。
        hide: ({$elements}) ->
            $elements.removeClass 'active'
            ts.fn

        # 切換淡化幕。
        toggle: ({$elements}) ->
            $elements.toggleClass 'active'
            ts.fn

        # 回傳一個表示淡化幕是否正在顯示中的布林值。
        'is active': ({$elements}) ->
            $elements.hasClass 'active'

        # 設置淡化幕的透明度。
        'set opacity': ({$elements}, opacity) ->
            $elements.css 'opacity', opacity
            ts.fn
