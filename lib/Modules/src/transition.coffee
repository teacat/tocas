class TocasTransition
    $name:
        'transition'

    _init: ({$this}) ->
        # 初始化動畫佇列。
        $this.data 'animationQueue', []
        # 初始化動畫索引。
        $this.data 'animationIndex', 0

    # 播放動畫。
    _animate: ({$this, $delay, $module}, {animation, duration, onComplete, group, interval}) ->
        # 設置動畫時間。
        $this.css 'animation-duration', "#{duration}ms"
        # 設置動畫名稱。
        $this.attr 'data-animation', animation
        await $delay()
        # 執行動畫。
        $this.attr 'data-animating', true



        # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
        await $delay(duration)
        # 移除動畫效果樣式。
        $this.removeAttr 'data-animating'
        # 呼叫完成函式。
        onComplete.call $this.get()


        #if group isnt undefined
        #    return

        # 取得動畫佇列。
        queue = $this.data 'animationQueue'
        # 取得目前播放的索引。
        index = $this.data 'animationIndex'
        # 確認是否為無限重複的動畫。
        looping = $this.data 'animationLooping'
        index++

        # 如果沒有下一個動畫了，就表示這是最後一個。
        # 我們就把動畫佇列清空。
        if queue[index] is undefined
            index = 0
            $this
                .removeAttr 'data-animation'
                .removeAttr 'data-animating'
                .css        'animation-duration', ''
                .data       'animationIndex', index
            # 如果不需要重複的話，就將佇列清空。
            if not looping
                queue = []
                $this.data 'animationQueue', queue
                return

        # 設置新的索引。
        $this.data 'animationIndex', index

        # 執行下一個動畫。
        $module::_animate {$this, $delay, $module}, queue[index]







    # 將新的動畫推入佇列中，如果佇列裡只有這個動畫就立即執行。
    _push: ({$this, $delay, $module}, animation, duration, onComplete) ->
        # 如果元素還沒初始化的話，就先初始化。
        if $this.data('animationQueue') is undefined
            $module::_init {$this}
        # 準備好本次的動畫資料。
        if typeof duration is 'function'
            onComplete = duration
            duration   = 800
        if duration is null
            duration = 800
        if onComplete is null or onComplete is undefined
            onComplete = ->
        data = {
            animation
            duration
            onComplete
        }
        # 將本次動畫資料擺入至佇列中。
        queue = $this.data 'animationQueue'
        queue.push data

        # 如果佇列裡只有一個動畫，那麼就是剛才所新增的，直接開始執行。
        if queue.length is 1
            $module::_animate {$this, $delay, $module}, data



    $opts: ({$elements, $index, $this, $delay, $module}, options) ->
        if $index isnt 0 and options.reverse? and options.reverse is true
            return ts.fn

        options = {
            animation    : ''
            duration     : null
            interval     : 100
            reverse      : false
            group        : false
            onComplete   : ->
            onAllComplete: ->
            ...options
        }


        if options.reverse is true
            elements = $elements.toArray().reverse()
            for element, index in elements
                $self = $selector element
                do ($self) ->
                    await $delay(options.interval * index)
                    $module::_push {$this: $self, $delay, $module}, options.animation, options.duration, options.onComplete
        else
            do ->
                await $delay(options.interval * $index)
                $module::_push {$this, $delay, $module}, options.animation, options.duration, options.onComplete

        ts.fn

    $methods:
        'bounce': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce', duration, onComplete
            ts.fn
        'flash': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'flash', duration, onComplete
            ts.fn
        'pulse': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'pulse', duration, onComplete
            ts.fn
        'rubber band': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rubber band', duration, onComplete
            ts.fn
        'shake': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'shake', duration, onComplete
            ts.fn
        'head shake': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'head shake', duration, onComplete
            ts.fn
        'swing': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'swing', duration, onComplete
            ts.fn
        'tada': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'tada', duration, onComplete
            ts.fn
        'wobble': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'wobble', duration, onComplete
            ts.fn
        'jello': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'jello', duration, onComplete
            ts.fn
        'bounce in': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce in', duration, onComplete
            ts.fn
        'bounce in down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce in down', duration, onComplete
            ts.fn
        'bounce in left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce in left', duration, onComplete
            ts.fn
        'bounce in right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce in right', duration, onComplete
            ts.fn
        'bounce in up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce in up', duration, onComplete
            ts.fn
        'bounce out': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce out', duration, onComplete
            ts.fn
        'bounce down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce down', duration, onComplete
            ts.fn
        'bounce out left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce out left', duration, onComplete
            ts.fn
        'bounce out right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce out right', duration, onComplete
            ts.fn
        'bounce out up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'bounce out up', duration, onComplete
            ts.fn
        'fade in': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in', duration, onComplete
            ts.fn
        'fade in down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in down', duration, onComplete
            ts.fn
        'fade in down heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in down heavily', duration, onComplete
            ts.fn
        'fade in left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in left', duration, onComplete
            ts.fn
        'fade in left heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in left heavily', duration, onComplete
            ts.fn
        'fade in right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in right', duration, onComplete
            ts.fn
        'fade in right heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in right heavily', duration, onComplete
            ts.fn
        'fade in up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in up', duration, onComplete
            ts.fn
        'fade in up heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade in up heavily', duration, onComplete
            ts.fn
        'fade out down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out down', duration, onComplete
            ts.fn
        'fade out down heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out down heavily', duration, onComplete
            ts.fn
        'fade out left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out left', duration, onComplete
            ts.fn
        'fade out left heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out left heavily', duration, onComplete
            ts.fn
        'fade out right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out right', duration, onComplete
            ts.fn
        'fade out right heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out right heavily', duration, onComplete
            ts.fn
        'fade out up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out up', duration, onComplete
            ts.fn
        'fade out up heavily': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'fade out up heavily', duration, onComplete
            ts.fn
        'flip': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'flip', duration, onComplete
            ts.fn
        'flip in x': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'flip in x', duration, onComplete
            ts.fn
        'flip in y': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'flip in y', duration, onComplete
            ts.fn
        'flip out x': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'flip out x', duration, onComplete
            ts.fn
        'flip out y': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'flip out y', duration, onComplete
            ts.fn
        'light speed in': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'light speed in', duration, onComplete
            ts.fn
        'light speed out': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'light speed out', duration, onComplete
            ts.fn
        'rotate in': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate in', duration, onComplete
            ts.fn
        'rotate in down left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate in down left', duration, onComplete
            ts.fn
        'rotate in down right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate in down right', duration, onComplete
            ts.fn
        'rotate in up left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate in up left', duration, onComplete
            ts.fn
        'rotate in up right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate in up right', duration, onComplete
            ts.fn
        'rotate out': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate out', duration, onComplete
            ts.fn
        'rotate out down left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate out down left', duration, onComplete
            ts.fn
        'rotate out down right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate out down right', duration, onComplete
            ts.fn
        'rotate out up left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate out up left', duration, onComplete
            ts.fn
        'rotate out up right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'rotate out up right', duration, onComplete
            ts.fn
        'hinge': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'hinge', duration, onComplete
            ts.fn
        'roll in': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'roll in', duration, onComplete
            ts.fn
        'roll out': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'roll out', duration, onComplete
            ts.fn
        'zoom in': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom in', duration, onComplete
            ts.fn
        'zoom in down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom in down', duration, onComplete
            ts.fn
        'zoom in left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom in left', duration, onComplete
            ts.fn
        'zoom in up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom in up', duration, onComplete
            ts.fn
        'zoom in right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom in right', duration, onComplete
            ts.fn
        'zoom out': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom out', duration, onComplete
            ts.fn
        'zoom out down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom out down', duration, onComplete
            ts.fn
        'zoom out left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom out left', duration, onComplete
            ts.fn
        'zoom out right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom out right', duration, onComplete
            ts.fn
        'zoom out up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'zoom out up', duration, onComplete
            ts.fn
        'slide in down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide in down', duration, onComplete
            ts.fn
        'slide in left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide in left', duration, onComplete
            ts.fn
        'slide in right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide in right', duration, onComplete
            ts.fn
        'slide in up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide in up', duration, onComplete
            ts.fn
        'slide out down': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide out down', duration, onComplete
            ts.fn
        'slide out left': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide out left', duration, onComplete
            ts.fn
        'slide out right': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide out right', duration, onComplete
            ts.fn
        'slide out up': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'slide out up', duration, onComplete
            ts.fn

        'toggle': ->


        'show': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'show', duration, onComplete
            ts.fn

        'hide': ({$this, $delay, $module}, duration, onComplete) ->
            $module::_push {$this, $delay, $module}, 'hide', duration, onComplete
            ts.fn

        'delay': ->

        'set looping': ({$this, $delay, $module}, options) ->
            $this.data 'animationLooping', true
            ts.fn

        'remove looping': ({$this, $delay, $module}, options) ->
            $this.data
                'animationLooping': false
                'animationIndex'  : 0
            ts.fn

        'stop': ->
        'stop all': ->


new ts TocasTransition