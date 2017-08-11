class TocasCarousel
    $name:
        'carousel'
    $data:
        {} 
    $options:
        interval: 2000 # 幻燈片換到下一張的毫秒相隔時間。
        onChange: ->   # 當幻燈片變更時所呼叫的函式。
        onCycle : ->   # 當幻燈片完成一個循環時所呼叫的函式。

    $init: ->

    $opts: ->


    $methods:
        # 開始播放幻燈片。
        play: ({$elements}) ->

        # 暫停幻燈片。
        pause: ({$elements}) ->

        # 切換下一個幻燈片。
        next: ({$elements}) ->

        # 切換上一個幻燈片。
        previous: ({$elements}) ->

        # 跳到指定的幻燈片。
        jump: ({$elements}, to) ->