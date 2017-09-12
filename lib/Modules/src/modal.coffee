class TocasModal
    $name:
        'modal'
    $options:
        approve          : '.approve, .positive, .ok'  # 會呼叫同意回呼函式的元素選擇器。
        deny             : '.deny, .negative, .cancel' # 會呼叫拒絕回呼函式的元素選擇器。
        onApprove        : -> true                     # 同意時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
        onDeny           : -> true                     # 拒絕時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
        onClose          : ->                          # 當視窗被關閉時所呼叫的函式。
        onDismiss        : ->                          # 當因為點擊視窗以外區域而關閉所呼叫的函式。
        keyboardShortcuts: true                        # 是否綁定鍵盤快捷鍵，如 Esc 鍵以關閉視窗。
    $init: ({$this, $module, $delay}) ->
        # 取得全域對話視窗淡化幕。
        $dimmer = $selector('.ts.modal.dimmer')
        # 如果沒有淡化幕就建立一個。
        if $dimmer.length is 0
            $dimmer = $selector('<div>').addClass('ts modals dimmer')
        # 將不是在淡化幕內的對話視窗移動到淡化幕內。
        $selector('body *:not([class*="ts modals dimmer"]) > .ts.modal, body > .ts.modal').appendTo($dimmer)
        $selector('body').append($dimmer)



        $dimmer.on 'click', (event) ->
            if event.target is @
                $module::_close {$this: $dimmer.find('.ts.modal.closable'), $delay}
                $this.data('onDismiss').call $this.get()



        if $this.data('keyboardShortcuts') is true and $this.hasClass('closable')
            $selector(document).on 'keyup', (e) ->
                if e.keyCode is 27
                    $module::_close {$this}



        $this.find($this.data('approve')).on 'click', ->
            if $this.data('onApprove').call(@) is true
                $module::_close {$this, $delay}

        $this.find($this.data('deny')).on 'click', ->
            if $this.data('onDeny').call(@) is true
                $module::_close {$this, $delay}

        $this.find(':scope > .ts.close.button').on 'click', ->
            $module::_close {$this, $delay}

    # 初始化一個淡化幕如果有必要的話，最終回傳一個全域對話視窗淡化幕。
    _getDimmer: ({$module}) ->
        # 取得全域對話視窗淡化幕。
        $dimmer = $selector('.ts.modal.dimmer')
        # 如果有的話就直接回傳淡化幕元素。
        if $dimmer.length isnt 0
            return $dimmer
        # 沒有的話就建立一個新的對話視窗淡化幕。
        $dimmer = $selector('<div>').addClass('ts modals dimmer')
        # 將淡化幕推入到網頁中。
        $selector('body').append($dimmer)
        # 綁定淡化幕被按下時，自動關閉對話視窗的點擊事件。
        $dimmer.on 'click', (event) ->
            # 如果點擊淡化幕但目標其實是子元素就離開。
            if event.target isnt @
                return
            $module::_close {$this: $dimmer.find('.ts.modal.active.closable'), $delay}
        # 回傳這個新的淡化幕。
        return $dimmer

    _init: ({$this, $module}, {}) ->
        # 取得全域對話視窗淡化幕。
        $dimmer = $module::_getDimmer {$module}
        # 如果這個對話視窗不在淡化幕內，我們就將這個對話視窗移入淡化幕裡。
        if not $this.parent().hasClass('ts modals dimmer')
            $this.appendTo($dimmer)



    # 開啟一個對話視窗。
    _open: ({$this, $delay}) ->
        if $this.hasClass('active')
            return

        $selector('body').attr 'data-modal-lock', 'true'

        $this.off 'animationend'

        $this.parent().addClass 'active opening'
        $this.addClass 'active opening'
        $this.one 'animationend', ->
            $this.removeClass 'opening'
            $this.parent().removeClass 'opening'

    # 關閉一個對話視窗。
    _close: ({$this, $delay}) ->
        if not $this.hasClass('active')
            return

        $selector('body').removeAttr 'data-modal-lock'
        $this.off 'animationend'

        $this.parent().addClass 'closing'
        $this.addClass 'active closing'
        $this.one 'animationend', ->
            $this.data('onClose').call(@)
            $this.removeClass 'active closing'
            $this.parent().removeClass 'active closing'

    $methods:
        # 顯示對話視窗。
        show: ({$this, $delay, $module}) ->
            $module::_open {$this, $delay}
            ts.fn

        # 隱藏對話視窗。
        hide: ({$this, $delay, $module}) ->
            $module::_close {$this, $delay}
            ts.fn

        # 切換對話視窗。
        toggle: ({$this, $delay, $module}) ->
            if $this.hasClass('active')
                $module::_close {$this, $delay}
            else
                $module::_open {$this, $delay}
            ts.fn


        # 回傳一個表示對話視窗是否正在顯示的布林值。
        'is active': ({$this}) ->

new ts TocasModal