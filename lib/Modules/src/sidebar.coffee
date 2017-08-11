class TocasSidebar
    $name:
        'sidebar'
    $data:
        {}
    $options:
        dimPage   : false # 是否要在側邊欄出現時將主畫面淡化。
        exclusive : false # 是否僅允許頁面上同時只會出現一個側邊欄，若為是，則會在開啟該側邊欄的同時關閉其他側邊欄。
        scrollLock: false # 是否要在側邊欄出現時鎖定螢幕捲軸的滾動。
        closable  : false # 是否允許使用者點擊主畫面將側邊欄關閉。

    $init: ->

    $opts: ({$elements}, options) ->

    $methods:
        # 顯示指定側邊欄。
        show: ({$elements}) ->

        # 隱藏指定側邊欄。
        hide: ({$elements}) ->

        # 切換側邊欄。當側邊欄是隱藏時會顯示、顯示時則隱藏。
        toggle: ({$elements}) ->
