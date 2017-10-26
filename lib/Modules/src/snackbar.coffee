class TocasSnackbar
    $name:
        'snackbar'

    $options:
        content       :	''    # 點心條的訊息內容。
        action        : ''    # 點心條的動作按鈕文字。
        actionEmphasis:	''    # 動作按鈕的語意，如：primary、info、warning⋯等。
        hoverStay     :	false # 當滑鼠移至點心條上時是否要延長點心條的存在時間。
        interval      : 3500  # 點心條停留的毫秒時間，如果是 0 則為永不自動消失直到使用者按下關閉為止。
        onClose       :	->    # 當點心條關閉時所呼叫的函式。
        onAction      : ->    # 當點心條上的動作按鈕被按下時所會呼叫的函式。

    $init: ->

    $opts: ->

    $methods:

        show: ->

        hide: ->

ts new TocasSnackbar