class TocasCheckbox
    $name:
        'checkbox'
    $init: ->
    $methods:
        # 勾選指定核取方塊。
        check: ({$elements}) ->

        # 取消勾選指定核取方塊。
        uncheck: ({$elements}) ->

        # 停用指定核取方塊，使用者將無法手動勾選或取消勾選該方塊。
        disable: ({$elements}) ->

        # 啟用指定核取方塊，使用者可以對其進行勾選或取消勾選。
        enable: ({$elements}) ->

        # 取得一個表示核取方塊是否被勾選的布林值。
        'is checked': ({$elements}) ->

        # 取得一個表示核取方塊是否沒有被勾選的布林值。
        'is unchecked': ({$elements}) ->