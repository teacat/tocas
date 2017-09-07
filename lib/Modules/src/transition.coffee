class TocasTransition
    $name:
        'transition'

    _init: ({$this, $delay, $module}) ->
        # 初始化動畫佇列。
        $this.data 'animationQueue', []
        # 初始化動畫索引。
        $this.data 'animationIndex', 0
        # 建立消費者事件，會在每次動畫結束後，從動畫佇列中找出下一個該執行的動畫，執行後將其從佇列中移除。
        customer = ->
            # 如果沒有 `animated` 則不是 Tocas 動畫，略過本次動畫監聽事件。
            if $this.attr('data-animating') isnt 'true'
                return

            # 移除上個動畫的樣式。
            $this.removeAttr 'data-animating'
            # 移除上個動畫名稱。
            $this.removeAttr 'data-animation'

            # 取得現有動畫佇列。
            queue = $this.data 'animationQueue'
            # 取得上個動畫的資料。
            previousData = queue[0]
            # 呼叫上個動畫的完成回呼函式。
            previousData.onComplete.call $this.get()

            looping = $this.data('animationLooping') is true
            # 將這個動畫從佇列中移除。
            if not looping
                queue.shift()
                # 更新動畫佇列。
                $this.data 'animationQueue', queue

            # 如果佇列是空的則離開。
            if queue.length is 0
                return
            await $delay()

            if not looping
                next = queue[0]
            else
                index = $this.data 'animationIndex'
                index = if queue[index + 1] isnt undefined then index + 1 else 0
                next  = queue[index]
                $this.data 'animationIndex', index

            # 執行佇列中的下一個動畫。
            $module::_animate {$this, $delay, $module}, next

        # 設置動畫消費者事件。
        $this.on 'animationend', customer
        # 表示初始化終了。
        $this.data 'animationInitialized', true


    # 播放動畫。
    _animate: ({$this, $delay, $module}, data) ->
        if data.animation is 'hide'
            $this.attr 'data-animating-hidden', 'true'
            $this.attr 'data-animating', 'true'
            await $delay(data.duration)
            $this.trigger 'animationend'
            return
        else if data.animation is 'show'
            $this.removeAttr 'data-animating-hidden'
            $this.attr 'data-animating', 'true'
            await $delay(data.duration)
            $this.trigger 'animationend'
            return
        # 設置本次動畫的速度。
        $this.css 'animation-duration', "#{data.duration}ms"
        # 決定本次動畫名稱。
        $this.attr 'data-animation', data.animation
        # 然後等一下，播放動畫。
        await $delay()
        $this.attr 'data-animating', 'true'

    # 將新的動畫推入佇列中，如果佇列裡只有這個動畫就立即執行。
    _push: ({$this, $delay, $module}, animation, duration, onComplete) ->
        # 如果元素還沒初始化動畫設置，則先初始化。
        if $this.data('animationInitialized') is undefined
            $module::_init {$this, $delay, $module}

        # 如果動畫時間是函式，就表示使用者設置的是回呼函式而不是時間。
        if typeof duration is 'function'
            onComplete = duration
            duration = 1000

        if duration is null
            duration = 1000

        # 初始化一個空的完成函式，如果沒有的話。
        if onComplete is null or onComplete is undefined
            onComplete = ->

        # 準備好這個動畫的資料。
        data =
            animation : animation
            duration  : duration
            onComplete: onComplete

        # 取得現有動畫佇列，並且將這個新的動畫推入佇列中。
        queue = $this.data 'animationQueue'
        queue.push data
        $this.data 'animationQueue', queue

        # 如果動畫佇列裡只有這個動畫，那麼就立即執行。
        if queue.length is 1
            $module::_animate {$this, $delay, $module}, data

    $opts: ({$this, $delay, $module}, options) ->
        options = {
            duration  : 1000
            interval  : 200
            reverse   : false
            onComplete: ->
            ...options
        }

        if options.group is undefined
            $module::_push {$this, $delay, $module}, options.animation, options.duration, options.onComplete
            return ts.fn

        if options.reverse is true
            $this.find(options.group).toArray().reverse().forEach (element, index) ->
                $self = $selector(element)
                do ($self) ->
                    await $delay(options.interval * index)
                    $module::_push {$this: $self, $delay, $module}, options.animation, options.duration, options.onComplete
        else
            $this.find(options.group).toArray().forEach (element, index) ->
                $self = $selector(element)
                do ($self) ->
                    await $delay(options.interval * index)
                    $module::_push {$this: $self, $delay, $module}, options.animation, options.duration, options.onComplete

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
            if options.group?
                $this.find(options.group).data 'animationLooping', true
            else
                $this.data 'animationLooping', true
            ts.fn

        'remove looping': ({$this, $delay, $module}, options) ->
            if options.group?
                $this.find(options.group).data('animationLooping', false).removeData 'animationIndex'
            else
                $this.data('animationLooping', false).removeData 'animationIndex'
            ts.fn

        'stop': ->
        'stop all': ->


new ts TocasTransition