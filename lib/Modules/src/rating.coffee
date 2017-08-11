class TocasRating
    $name:
        'rating'
    $options:
        initialRating: 0 # 初期的評分數值。
        maxRating    : 5 # 評分數值的最大上限。
    $init: ->
    $opts: ->
    $methods:
        # 停用指定評分，令使用者不得變更其數值。
        disable: ({$elements}) ->

        # 啟用指定評分，讓使用者可以更改其數值。
        enable: ({$elements}) ->

        # 清除、歸零指定評分。
        'clear rating': ({$elements}) ->

        # 取得指定評分數值。
        'get rating': ({$elements}) ->

        # 設置指定評分數值。
        'set rating': ({$elements}, rating) ->