class TocasCheckbox
    $name:
        'checkbox'
    $data:
        {}
    $options:
        {}
    $init: ->
    $methods:
        # 開啟指定索引的手風琴內容。
        open: ({$elements}, index) ->

        # 關閉指定索引的手風琴內容。
        close: ({$elements}, index) ->

        # 切換指定索引的手風琴內容，如果是開啟的則關閉，相反之。
        toggle: ({$elements}, index) ->
