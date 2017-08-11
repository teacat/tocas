class TocasModal
    $name:
        'modal'
    $options:
        approve  : '.approve, .positive, .ok'  # 會呼叫同意回呼函式的元素選擇器。
        deny     : '.deny, .negative, .cancel' # 會呼叫拒絕回呼函式的元素選擇器。
        onApprove: -> true                     # 同意時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
        onDeny   : -> true                     # 拒絕時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
        onClose  : ->                          # 當視窗被關閉時所呼叫的函式。
        onDismiss: ->                          # 當因為點擊視窗以外區域而關閉所呼叫的函式。
        keyboardShortcuts: true                # 是否綁定鍵盤快捷鍵，如 Esc 鍵以關閉視窗。
    $init: ->
    $methods:
        # 顯示對話視窗。
        show: ({$elements}) ->

        # 隱藏對話視窗。
        hide: ({$elements}) ->

        # 回傳一個表示對話視窗是否正在顯示的布林值。
        'is active': ({$elements}) ->