class TocasTab
    $name:
        'tab'
    $options:
        onSwitch: -> # 當分頁籤切換時所會呼叫的函式。
    $init: ->
    $methods:
        # 切換到指定的分頁。
        'change tab': ({$elements}) ->

        # 回傳一個指定分頁是否被啟用的布林值。
        'is active': ({$elements}, name) ->