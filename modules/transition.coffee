# Transition
#
# 過場效果。

class Transition
    # 模組名稱。
    @module:
        'transition'

    # 模組屬性。
    #props:

    # 類別樣式名稱。
    #className:


    # 選擇器名稱。
    #selector:

    # dd
    hiddenName: 'data-animating-hidden'
    # dd
    animationName: 'data-animation'
    # dd
    animatingName: 'data-animating'

    # 元素初始化函式。
    init: =>
        # 初始化動畫佇列。
        @$this.data 'animationQueue', []
        # 初始化動畫索引。
        @$this.data 'animationIndex', 0
        ts.fn

    # 元素摧毀函式。
    destroy: =>

    untilVisible: () ->
        new Promise (resolve) ->
            setInterval ->
                if not document.hidden
                    resolve()
            , 1

    # Animate
    #
    # 播放動畫。
    animate: ({animation, duration, onComplete, group, interval}) =>
        switch animation
            when 'show'
                @$this.removeAttr @hiddenName
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await @delay duration
            when 'hide'
                @$this.attr @hiddenName, 'true'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await @delay duration
            when 'toggle'
                if @$this.attr(@hiddenName) is 'true'
                    @$this.removeAttr @hiddenName
                else
                    @$this.attr @hiddenName, 'true'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await @delay duration
            when 'delay'
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await @delay duration
            else
                # 設置動畫時間。
                @$this.css 'animation-duration', "#{duration}ms"
                # 設置動畫名稱。
                @$this.attr @animationName, animation
                await @delay()
                # 執行動畫。
                @$this.attr @animatingName, true
                # 過了動畫的執行時間（相當於動畫執行完畢），我們才繼續。
                await @delay duration
                #
                if animation.indexOf('in') isnt -1
                    if @$this.attr(@hiddenName) is 'true'
                        @$this.removeAttr(@hiddenName)
                if animation.indexOf('out') isnt -1
                    @$this.attr @hiddenName, 'true'
                # 移除動畫效果樣式。
                @$this.removeAttr @animatingName

        # 呼叫完成函式。
        onComplete.call @$this.get()

        # 取得動畫佇列。
        queue = @$this.data 'animationQueue'
        # 取得目前播放的索引。
        index = @$this.data 'animationIndex'
        # 確認是否為無限重複的動畫。
        looping = @$this.data 'animationLooping'
        index++

        # 如果沒有下一個動畫了，就表示這是最後一個。
        # 我們就把動畫佇列清空。
        if queue[index] is undefined
            index = 0
            @$this
                .removeAttr @animationName
                .removeAttr @animatingName
                .css        'animation-duration', ''
                .data       'animationIndex'    , index
            # 如果不需要重複的話，就將佇列清空。
            if not looping
                queue = []
                @$this.data 'animationQueue', queue
                return

        # 設置新的索引。
        @$this.data 'animationIndex', index

        # 執行下一個動畫。
        @animate queue[index]

    #
    #
    # 將新的動畫推入佇列中，如果佇列裡只有這個動畫就立即執行。
    push: (animation, duration, onComplete) =>
        # 如果元素還沒初始化的話，就先初始化。
        if @$this.data('animationQueue') is undefined
            @init()

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
        queue = @$this.data 'animationQueue'
        queue.push data

        # 如果佇列裡只有一個動畫，那麼就是剛才所新增的，直接開始執行。
        if queue.length is 1
            @animate data

    #
    #
    #
    execute: (options) =>
        if @index isnt 0 and options.reverse? and options.reverse is true
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
                do ($self) =>
                    await @delay options.interval * index
                    await @untilVisible()
                    @$this = $self
                    @push options.animation, options.duration, options.onComplete
                    #@$this = @$origin
        else
            do =>
                await @delay options.interval * @index
                await @untilVisible()
                @push options.animation, options.duration, options.onComplete

    # 模組可用的方法。
    methods: =>
        'bounce': (duration, onComplete) =>
            @execute {animation: 'bounce', duration, onComplete}
            ts.fn
        'flash': (duration, onComplete) =>
            @execute {animation: 'flash', duration, onComplete}
            ts.fn
        'pulse': (duration, onComplete) =>
            @execute {animation: 'pulse', duration, onComplete}
            ts.fn
        'rubber band': (duration, onComplete) =>
            @execute {animation: 'rubber band', duration, onComplete}
            ts.fn
        'shake': (duration, onComplete) =>
            @execute {animation: 'shake', duration, onComplete}
            ts.fn
        'head shake': (duration, onComplete) =>
            @execute {animation: 'head shake', duration, onComplete}
            ts.fn
        'swing': (duration, onComplete) =>
            @execute {animation: 'swing', duration, onComplete}
            ts.fn
        'tada': (duration, onComplete) =>
            @execute {animation: 'tada', duration, onComplete}
            ts.fn
        'wobble': (duration, onComplete) =>
            @execute {animation: 'wobble', duration, onComplete}
            ts.fn
        'jello': (duration, onComplete) =>
            @execute {animation: 'jello', duration, onComplete}
            ts.fn
        'bounce in': (duration, onComplete) =>
            @execute {animation: 'bounce in', duration, onComplete}
            ts.fn
        'bounce in down': (duration, onComplete) =>
            @execute {animation: 'bounce in down', duration, onComplete}
            ts.fn
        'bounce in left': (duration, onComplete) =>
            @execute {animation: 'bounce in left', duration, onComplete}
            ts.fn
        'bounce in right': (duration, onComplete) =>
            @execute {animation: 'bounce in right', duration, onComplete}
            ts.fn
        'bounce in up': (duration, onComplete) =>
            @execute {animation: 'bounce in up', duration, onComplete}
            ts.fn
        'bounce out': (duration, onComplete) =>
            @execute {animation: 'bounce out', duration, onComplete}
            ts.fn
        'bounce down': (duration, onComplete) =>
            @execute {animation: 'bounce down', duration, onComplete}
            ts.fn
        'bounce out left': (duration, onComplete) =>
            @execute {animation: 'bounce out left', duration, onComplete}
            ts.fn
        'bounce out right': (duration, onComplete) =>
            @execute {animation: 'bounce out right', duration, onComplete}
            ts.fn
        'bounce out up': (duration, onComplete) =>
            @execute {animation: 'bounce out up', duration, onComplete}
            ts.fn
        'fade in': (duration, onComplete) =>
            @execute {animation: 'fade in', duration, onComplete}
            ts.fn
        'fade in down': (duration, onComplete) =>
            @execute {animation: 'fade in down', duration, onComplete}
            ts.fn
        'fade in down heavily': (duration, onComplete) =>
            @execute {animation: 'fade in down heavily', duration, onComplete}
            ts.fn
        'fade in left': (duration, onComplete) =>
            @execute {animation: 'fade in left', duration, onComplete}
            ts.fn
        'fade in left heavily': (duration, onComplete) =>
            @execute {animation: 'fade in left heavily', duration, onComplete}
            ts.fn
        'fade in right': (duration, onComplete) =>
            @execute {animation: 'fade in right', duration, onComplete}
            ts.fn
        'fade in right heavily': (duration, onComplete) =>
            @execute {animation: 'fade in right heavily', duration, onComplete}
            ts.fn
        'fade in up': (duration, onComplete) =>
            @execute {animation: 'fade in up', duration, onComplete}
            ts.fn
        'fade in up heavily': (duration, onComplete) =>
            @execute {animation: 'fade in up heavily', duration, onComplete}
            ts.fn
        'fade out down': (duration, onComplete) =>
            @execute {animation: 'fade out down', duration, onComplete}
            ts.fn
        'fade out down heavily': (duration, onComplete) =>
            @execute {animation: 'fade out down heavily', duration, onComplete}
            ts.fn
        'fade out left': (duration, onComplete) =>
            @execute {animation: 'fade out left', duration, onComplete}
            ts.fn
        'fade out left heavily': (duration, onComplete) =>
            @execute {animation: 'fade out left heavily', duration, onComplete}
            ts.fn
        'fade out right': (duration, onComplete) =>
            @execute {animation: 'fade out right', duration, onComplete}
            ts.fn
        'fade out right heavily': (duration, onComplete) =>
            @execute {animation: 'fade out right heavily', duration, onComplete}
            ts.fn
        'fade out up': (duration, onComplete) =>
            @execute {animation: 'fade out up', duration, onComplete}
            ts.fn
        'fade out up heavily': (duration, onComplete) =>
            @execute {animation: 'fade out up heavily', duration, onComplete}
            ts.fn
        'flip': (duration, onComplete) =>
            @execute {animation: 'flip', duration, onComplete}
            ts.fn
        'flip in x': (duration, onComplete) =>
            @execute {animation: 'flip in x', duration, onComplete}
            ts.fn
        'flip in y': (duration, onComplete) =>
            @execute {animation: 'flip in y', duration, onComplete}
            ts.fn
        'flip out x': (duration, onComplete) =>
            @execute {animation: 'flip out x', duration, onComplete}
            ts.fn
        'flip out y': (duration, onComplete) =>
            @execute {animation: 'flip out y', duration, onComplete}
            ts.fn
        'light speed in': (duration, onComplete) =>
            @execute {animation: 'light speed in', duration, onComplete}
            ts.fn
        'light speed out': (duration, onComplete) =>
            @execute {animation: 'light speed out', duration, onComplete}
            ts.fn
        'rotate in': (duration, onComplete) =>
            @execute {animation: 'rotate in', duration, onComplete}
            ts.fn
        'rotate in down left': (duration, onComplete) =>
            @execute {animation: 'rotate in down left', duration, onComplete}
            ts.fn
        'rotate in down right': (duration, onComplete) =>
            @execute {animation: 'rotate in down right', duration, onComplete}
            ts.fn
        'rotate in up left': (duration, onComplete) =>
            @execute {animation: 'rotate in up left', duration, onComplete}
            ts.fn
        'rotate in up right': (duration, onComplete) =>
            @execute {animation: 'rotate in up right', duration, onComplete}
            ts.fn
        'rotate out': (duration, onComplete) =>
            @execute {animation: 'rotate out', duration, onComplete}
            ts.fn
        'rotate out down left': (duration, onComplete) =>
            @execute {animation: 'rotate out down left', duration, onComplete}
            ts.fn
        'rotate out down right': (duration, onComplete) =>
            @execute {animation: 'rotate out down right', duration, onComplete}
            ts.fn
        'rotate out up left': (duration, onComplete) =>
            @execute {animation: 'rotate out up left', duration, onComplete}
            ts.fn
        'rotate out up right': (duration, onComplete) =>
            @execute {animation: 'rotate out up right', duration, onComplete}
            ts.fn
        'hinge': (duration, onComplete) =>
            @execute {animation: 'hinge', duration, onComplete}
            ts.fn
        'roll in': (duration, onComplete) =>
            @execute {animation: 'roll in', duration, onComplete}
            ts.fn
        'roll out': (duration, onComplete) =>
            @execute {animation: 'roll out', duration, onComplete}
            ts.fn
        'zoom in': (duration, onComplete) =>
            @execute {animation: 'zoom in', duration, onComplete}
            ts.fn
        'zoom in down': (duration, onComplete) =>
            @execute {animation: 'zoom in down', duration, onComplete}
            ts.fn
        'zoom in left': (duration, onComplete) =>
            @execute {animation: 'zoom in left', duration, onComplete}
            ts.fn
        'zoom in up': (duration, onComplete) =>
            @execute {animation: 'zoom in up', duration, onComplete}
            ts.fn
        'zoom in right': (duration, onComplete) =>
            @execute {animation: 'zoom in right', duration, onComplete}
            ts.fn
        'zoom out': (duration, onComplete) =>
            @execute {animation: 'zoom out', duration, onComplete}
            ts.fn
        'zoom out down': (duration, onComplete) =>
            @execute {animation: 'zoom out down', duration, onComplete}
            ts.fn
        'zoom out left': (duration, onComplete) =>
            @execute {animation: 'zoom out left', duration, onComplete}
            ts.fn
        'zoom out right': (duration, onComplete) =>
            @execute {animation: 'zoom out right', duration, onComplete}
            ts.fn
        'zoom out up': (duration, onComplete) =>
            @execute {animation: 'zoom out up', duration, onComplete}
            ts.fn
        'slide in down': (duration, onComplete) =>
            @execute {animation: 'slide in down', duration, onComplete}
            ts.fn
        'slide in left': (duration, onComplete) =>
            @execute {animation: 'slide in left', duration, onComplete}
            ts.fn
        'slide in right': (duration, onComplete) =>
            @execute {animation: 'slide in right', duration, onComplete}
            ts.fn
        'slide in up': (duration, onComplete) =>
            @execute {animation: 'slide in up', duration, onComplete}
            ts.fn
        'slide out down': (duration, onComplete) =>
            @execute {animation: 'slide out down', duration, onComplete}
            ts.fn
        'slide out left': (duration, onComplete) =>
            @execute {animation: 'slide out left', duration, onComplete}
            ts.fn
        'slide out right': (duration, onComplete) =>
            @execute {animation: 'slide out right', duration, onComplete}
            ts.fn
        'slide out up': (duration, onComplete) =>
            @execute {animation: 'slide out up', duration, onComplete}
            ts.fn

        'toggle': (duration, onComplete) =>
            @execute {animation: 'toggle', duration, onComplete}
            ts.fn

        'show': (duration, onComplete) =>
            @execute {animation: 'show', duration, onComplete}
            ts.fn

        'hide': (duration, onComplete) =>
            @execute {animation: 'hide', duration, onComplete}
            ts.fn

        'delay': (duration, onComplete) =>
            @execute {animation: 'delay', duration, onComplete}
            ts.fn

        'set looping': (options) =>
            @$this.data 'animationLooping', true
            ts.fn

        'remove looping': (options) =>
            @$this.removeData 'animationLooping'
            ts.fn

        'stop': ->

        'stop all': ->


ts Transition