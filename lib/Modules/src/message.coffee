class TocasMessage
    $name:
        'message'
    $init: ->
    $methods:
        # 顯示訊息。
        show: ({$elements}) ->
            $elements.removeClass 'hidden'

        # 隱藏訊息。
        hide: ({$elements}) ->
            $elements.addClass 'hidden'

        # 切換訊息。
        toggle: ({$elements}) ->
            $elements.toggleClass 'hidden'

new ts TocasMessage