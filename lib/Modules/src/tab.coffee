class TocasTab
    $name:
        'tab'
    $options:
        onSwitch: -> # 當分頁籤切換時所會呼叫的函式。

    $init: ({$this}) ->
        # 綁定分頁按鈕的點擊事件。
        $this.on 'click', ->
            # 如果點擊的是正在啟用的分頁則略過。
            return if $this.hasClass 'active'

            tabName = $this.attr 'data-tab'
            # 忽略不是分頁用的項目按鈕。
            return if tabName is null
            # 取得分頁群組名稱。
            tabGroup = $this.attr 'data-tab-group'

            # 呼叫切換回呼函式。
            

    $methods:
        # 切換到指定的分頁。
        'change tab': ({$elements}) ->

        # 回傳一個指定分頁是否被啟用的布林值。
        'is active': ({$elements}, name) ->