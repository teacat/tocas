class TocasSearch
    $name:
        'search'
    $options:
        onResultsOpen : -> # 當搜尋結果展開時所呼叫的函式。
        onResultsClose: -> # 當搜尋結果關閉時所呼叫的函式。
    $init: ->
    $methods:
        'display message':  ({$elements}) ->
        'show results': ({$elements}) ->
        'hide results': ({$elements}) ->

