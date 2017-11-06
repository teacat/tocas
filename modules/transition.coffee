# Transition
#
# 過場效果。

class Transition
    # 模組名稱。
    @module:
        'transition'

    # 模組屬性。
    props:
        animation    : null
        reverse      : false
        interval     : 0
        duration     : 500
        onComplete   : ->
        onAllComplete: ->
        onStart      : ->

    # 類別樣式名稱。
    #className:

    # 選擇器名稱。
    #selector:

    # 元素初始化函式。
    init: ({animation, duration, onComplete, interval}) =>
        #
        #if animation is null
        #    ts.fn

        #
        @push animation, duration, onComplete, interval
        ts.fn

    # 元素摧毀函式。
    destroy: =>

    #
    #
    #
    untilVisible: =>
        new Promise (resolve) =>
            timer = setInterval =>
                #
                return if document.hidden

                #
                resolve()

                #
                clearInterval timer
            , 10

    #
    #
    #
    push: (animation, duration, onComplete, interval) =>
        duration   = duration   or 800
        onComplete = onComplete or ->
        interval   = interval   or 50

        #
        if animation is null
            return

        #
        data = @$this.data 'animationData'

        #
        if data is undefined
            data =
                animating: false
                index    : 0
                looping  : true
                queue    : []

        #
        data.queue.push {
            animation
            duration
            onComplete
            interval
        }

        #
        @$this.data 'animationData', data

        #
        if data.queue.length is 1 and @index is @$elements.length - 1
            @start()

    #
    #
    #
    start: =>
        #
        elements = @$elements.toArray()

        #
        for element, index in elements
            # 持續以 `await` 阻擋，直到此頁面在螢幕上可見。
            # 這可以避免瀏覽器因為重新繪製而打亂動畫的順序，如果移除此方法會雜亂無章。
            await @untilVisible()

            #
            $element = $selector element

            #
            @$this = $element

            #
            await @animate @getAnimation()

            if index is elements.length - 1
                @start()

    #
    #
    #
    animate: ({animation, duration, onComplete, interval}) =>
        #
        new Promise (resolve) =>
            #
            @$this
                .attr 'data-animation'    , animation
                .css  'animation-duration', "#{duration}ms"

            #
            await @delay()

            #
            @$this.attr 'data-animating', true

            #
            @$this.one 'animationend.animation', =>
                #
                onComplete.call @$this.get()

            #
            await @delay interval

            #
            resolve()

    #
    #
    #
    getAnimation: =>
        data = @$this.data 'animationData'

        #
        animation = data.queue[data.index]

        #
        data.index++

        #
        if data.index > data.queue.length - 1 and data.looping

            data.index = 0

        #
        @$this.data 'animationData', data

        return animation

    # 模組可用的方法。
    methods: =>

        # Stop
        #
        #
        stop: =>
            ts.fn

        # Stop All
        #
        #
        'stop all': =>
            ts.fn

        # Clear Queue
        #
        #
        'clear queue': =>
            ts.fn

        # Show
        #
        #
        show: =>
            ts.fn

        # Hide
        #
        #
        hide: =>
            ts.fn

        # Toggle
        #
        #
        toggle: =>
            ts.fn

        # Set Looping
        #
        #
        'set looping': =>
            ts.fn

        # Remove Looping
        #
        #
        'remove looping': =>
            ts.fn

        # Is Visible
        #
        #
        'is visible': =>

        # Is Animating
        #
        #
        'is animating': =>

        # Is Looping
        #
        #
        'is looping': =>

        # Fade In Down
        #
        #
        'fade in down': (duration, onComplete) =>
            @push 'fade in down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out down': (duration, onComplete) =>
            @push 'fade out down', duration, onComplete
            ts.fn

ts Transition