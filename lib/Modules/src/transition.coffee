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
        switch animation
            when 'show'
                $this.removeAttr 'data-animating-hidden'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await $delay(duration)
            when 'hide'
                $this.attr 'data-animating-hidden', 'true'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await $delay(duration)
            when 'toggle'
                if $this.attr('data-animating-hidden') is 'true'
                    $this.removeAttr 'data-animating-hidden'
                else
                    $this.attr 'data-animating-hidden', 'true'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await $delay(duration)
            when 'delay'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await $delay(duration)
            else
                # 設置動畫時間。
                $this.css 'animation-duration', "#{duration}ms"
                # 設置動畫名稱。
                $this.attr 'data-animation', animation
                await $delay()
                # 執行動畫。
                $this.attr 'data-animating', true
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await $delay(duration)
                #
                if animation.indexOf('in') isnt -1
                    if $this.attr('data-animating-hidden') is 'true'
                        $this.removeAttr('data-animating-hidden')
                if animation.indexOf('out') isnt -1
                    $this.attr 'data-animating-hidden', 'true'
                # 移除動畫效果樣式。
                $this.removeAttr 'data-animating'

        # 呼叫完成函式。
        onComplete.call $this.get()

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
        $module::_execute {$elements, $index, $this, $delay, $module}, options
        ts.fn

    _execute: ({$elements, $index, $this, $delay, $module}, options) ->
        if $index isnt 0 and options.reverse? and options.reverse is true
            return ts.fn

        switch options.animation
            when 'hide', 'toggle', 'show'
                if options.interval is undefined
                    options.interval = 0
                if options.duration is null
                    options.duration = 0

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


    $methods:
        'bounce': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce', duration, onComplete}
            ts.fn
        'flash': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'flash', duration, onComplete}
            ts.fn
        'pulse': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'pulse', duration, onComplete}
            ts.fn
        'rubber band': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rubber band', duration, onComplete}
            ts.fn
        'shake': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'shake', duration, onComplete}
            ts.fn
        'head shake': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'head shake', duration, onComplete}
            ts.fn
        'swing': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'swing', duration, onComplete}
            ts.fn
        'tada': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'tada', duration, onComplete}
            ts.fn
        'wobble': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'wobble', duration, onComplete}
            ts.fn
        'jello': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'jello', duration, onComplete}
            ts.fn
        'bounce in': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce in', duration, onComplete}
            ts.fn
        'bounce in down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce in down', duration, onComplete}
            ts.fn
        'bounce in left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce in left', duration, onComplete}
            ts.fn
        'bounce in right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce in right', duration, onComplete}
            ts.fn
        'bounce in up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce in up', duration, onComplete}
            ts.fn
        'bounce out': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce out', duration, onComplete}
            ts.fn
        'bounce down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce down', duration, onComplete}
            ts.fn
        'bounce out left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce out left', duration, onComplete}
            ts.fn
        'bounce out right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce out right', duration, onComplete}
            ts.fn
        'bounce out up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'bounce out up', duration, onComplete}
            ts.fn
        'fade in': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in', duration, onComplete}
            ts.fn
        'fade in down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in down', duration, onComplete}
            ts.fn
        'fade in down heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in down heavily', duration, onComplete}
            ts.fn
        'fade in left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in left', duration, onComplete}
            ts.fn
        'fade in left heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in left heavily', duration, onComplete}
            ts.fn
        'fade in right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in right', duration, onComplete}
            ts.fn
        'fade in right heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in right heavily', duration, onComplete}
            ts.fn
        'fade in up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in up', duration, onComplete}
            ts.fn
        'fade in up heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade in up heavily', duration, onComplete}
            ts.fn
        'fade out down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out down', duration, onComplete}
            ts.fn
        'fade out down heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out down heavily', duration, onComplete}
            ts.fn
        'fade out left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out left', duration, onComplete}
            ts.fn
        'fade out left heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out left heavily', duration, onComplete}
            ts.fn
        'fade out right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out right', duration, onComplete}
            ts.fn
        'fade out right heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out right heavily', duration, onComplete}
            ts.fn
        'fade out up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out up', duration, onComplete}
            ts.fn
        'fade out up heavily': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'fade out up heavily', duration, onComplete}
            ts.fn
        'flip': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'flip', duration, onComplete}
            ts.fn
        'flip in x': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'flip in x', duration, onComplete}
            ts.fn
        'flip in y': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'flip in y', duration, onComplete}
            ts.fn
        'flip out x': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'flip out x', duration, onComplete}
            ts.fn
        'flip out y': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'flip out y', duration, onComplete}
            ts.fn
        'light speed in': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'light speed in', duration, onComplete}
            ts.fn
        'light speed out': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'light speed out', duration, onComplete}
            ts.fn
        'rotate in': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate in', duration, onComplete}
            ts.fn
        'rotate in down left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate in down left', duration, onComplete}
            ts.fn
        'rotate in down right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate in down right', duration, onComplete}
            ts.fn
        'rotate in up left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate in up left', duration, onComplete}
            ts.fn
        'rotate in up right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate in up right', duration, onComplete}
            ts.fn
        'rotate out': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate out', duration, onComplete}
            ts.fn
        'rotate out down left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate out down left', duration, onComplete}
            ts.fn
        'rotate out down right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate out down right', duration, onComplete}
            ts.fn
        'rotate out up left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate out up left', duration, onComplete}
            ts.fn
        'rotate out up right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'rotate out up right', duration, onComplete}
            ts.fn
        'hinge': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'hinge', duration, onComplete}
            ts.fn
        'roll in': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'roll in', duration, onComplete}
            ts.fn
        'roll out': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'roll out', duration, onComplete}
            ts.fn
        'zoom in': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom in', duration, onComplete}
            ts.fn
        'zoom in down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom in down', duration, onComplete}
            ts.fn
        'zoom in left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom in left', duration, onComplete}
            ts.fn
        'zoom in up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom in up', duration, onComplete}
            ts.fn
        'zoom in right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom in right', duration, onComplete}
            ts.fn
        'zoom out': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom out', duration, onComplete}
            ts.fn
        'zoom out down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom out down', duration, onComplete}
            ts.fn
        'zoom out left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom out left', duration, onComplete}
            ts.fn
        'zoom out right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom out right', duration, onComplete}
            ts.fn
        'zoom out up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'zoom out up', duration, onComplete}
            ts.fn
        'slide in down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide in down', duration, onComplete}
            ts.fn
        'slide in left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide in left', duration, onComplete}
            ts.fn
        'slide in right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide in right', duration, onComplete}
            ts.fn
        'slide in up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide in up', duration, onComplete}
            ts.fn
        'slide out down': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide out down', duration, onComplete}
            ts.fn
        'slide out left': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide out left', duration, onComplete}
            ts.fn
        'slide out right': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide out right', duration, onComplete}
            ts.fn
        'slide out up': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'slide out up', duration, onComplete}
            ts.fn

        'toggle': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'toggle', duration, onComplete}
            ts.fn


        'show': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'show', duration, onComplete}
            ts.fn

        'hide': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'hide', duration, onComplete}
            ts.fn

        'delay': ({$elements, $index, $this, $delay, $module}, duration, onComplete) ->
            $module::_execute {$elements, $index, $this, $delay, $module}, {animation: 'delay', duration, onComplete}
            ts.fn

        'set looping': ({$this, $delay, $module}, options) ->
            $this.data 'animationLooping', true
            ts.fn

        'remove looping': ({$this, $delay, $module}, options) ->
            $this.removeData 'animationLooping'
            ts.fn

        'stop': ->

        'stop all': ->


new ts TocasTransition