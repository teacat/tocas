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

            # 取得分頁名稱。
            tabName = $this.attr 'data-tab'
            # 如果沒有分頁名稱，這就不是分頁用的項目按鈕，忽略這次的按下事件。
            return if tabName is null
            # 取得分頁的群組名稱。
            tabGroup = $this.attr 'data-tab-group'

            # 呼叫切換回呼函式。
            $this.data('onSwitch').call @, tabName, tabGroup

            # 如果 `data-tab-group` 是空的話，則表示這個頁面僅有一個共享分頁籤。
            if tabGroup is null
                # 那麼我們就先解除啟用所有的頁籤按鈕。
                $selector '[data-tab]:not(.tab):not([data-tab-group])'
                    .removeClass 'active'
                # 然後停用所有的頁籤。
                $selector '[data-tab]:not([data-tab-group])'
                    .removeClass 'active'
                # 現在啟用目標分頁籤。
                $selector ".tab[data-tab='#{tabName}']:not([data-tab-group])"
                    .addClass 'active'
            else
                $selector "[data-tab-group='#{tabGroup}']:not(.tab)"
                    .removeClass 'active'
                $selector ".tab[data-tab-group='#{tabGroup}']"
                    .removeClass 'active'
                $selector ".tab[data-tab='#{tabName}'][data-tab-group='#{tabGroup}']"
                    .addClass 'active'

            # 啟用目標分頁籤的按鈕。
            $this.addClass 'active'

    $methods:
        # 切換到指定的分頁。
        'change tab': ({$this}) ->

        # 回傳一個指定分頁是否被啟用的布林值。
        'is active': ({$this}, name) ->