# Transition
#
# 過場效果。

class Transition
    # 模組名稱。
    @module:
        'transition'

    # 模組屬性。
    props:
        animation : null
        reverse   : false
        interval  : 0
        duration  : 500
        onComplete: ->
        onStart   : ->

    # 類別樣式名稱。
    #className:

    # 選擇器名稱。
    #selector:

    # 元素初始化函式。
    init: ({animation, duration, onComplete, interval}) =>
        ts.fn

    # 元素摧毀函式。
    destroy: =>

    # Until Visible
    #
    # 此函式會以 `await` 的方式持續阻擋，直到頁面在客戶端上可見為止。
    # 這是避免瀏覽器在不可見的時候會進行重繪，導致動畫亂序。
    untilVisible: =>
        new Promise (resolve) =>
            timer = setInterval =>
                # 如果頁面還是不可見的，就返回，不要呼叫 Promise 的解決函式。
                return if document.hidden

                # 頁面可見了，呼叫解決函式！
                resolve()

                # 清除偵測計時器。
                clearInterval timer
            , 1

    # Set Data
    #
    # 設置並更改元素內的動畫資料。
    setData: (newData) =>
        # 從元素中取得動畫資料。
        data = @$this.data 'animationData'

        # 如果動畫資料沒有被定義，就初始化一個。
        if data is undefined
            data = @initData()

        # 合併資料。
        data = {
            data...
            newData...
        }

        # 保存新的變更到元素中。
        @$this.data 'animationData', data

    # Get Data
    #
    # 取得元素內的動畫資料，如果沒有則自動初始化一個。
    getData: =>
        # 從元素中取得動畫資料。
        data = @$this.data 'animationData'

        # 如果動畫資料沒有被定義，就初始化一個。
        if data is undefined
            data = @initData()

        return data

    # Init Data
    #
    # 初始化元素內的動畫資料。
    initData: =>
        data =
            skip   : false
            index  : -1
            looping: false
            queue  : []

        @$this.data 'animationData', data

        return data

    # Push
    #
    # 將一個新的動畫推入至元素的動畫佇列中。
    push: (animation, duration, onComplete, interval) =>
        # 動畫的速度毫秒數。
        duration   = duration   or 800
        # 當此動畫完成時所會呼叫的函式。
        onComplete = onComplete or ->
        # 播放下個動畫的相隔毫秒數。
        switch animation
            # 如果動畫效果是即刻性的（隱藏、顯示），就將 `interval` 預設為 0。
            when 'hide', 'show', 'toggle', 'hide visibility', 'show visibility', 'toggle visibility'
                interval = interval or 0
            else
                interval = interval or 80

        # 從元素中取得動畫資料。
        data = @getData()

        # 將新的動畫推入至動畫佇列中。
        data.queue.push {
            animation
            duration
            onComplete
            interval
        }

        # 保存新的動畫資料變更到元素內。
        @setData data

        # 如果動畫佇列只有一個動畫，而且這又是選擇器元素中的最後一個元素，
        # 那麼我們就準備好開始播放整個群組動畫了。
        if data.queue.length is 1 and @index is @$elements.length - 1
            await @delay()
            @start()

    # Start
    #
    # 開始執行元素選擇器裡所有元素的動畫。
    start: =>
        # 將元素選擇器轉換為陣列，這樣才能以迴圈遞迴。
        # 因為 `await` 只能在 `for` 中使用，而不能用在 `.each` 或 `.forEach`。
        elements = @$elements.toArray()

        # 遞迴元素選擇器陣列，這樣才能透過 `await` 一個一個逐一執行其動畫。
        for element, index in elements
            # 持續以 `await` 阻擋，直到此頁面在螢幕上可見。
            # 這可以避免瀏覽器因為重新繪製而打亂動畫的順序，如果移除此方法會雜亂無章。
            # await @untilVisible()

            # 以選擇器選擇此元素。
            $element = $selector element

            # 替換 $this 為此選擇器。
            @$this = $element

            # 取得此元素本輪該播放的動畫資料。
            animation = @getAnimation()

            # 如果動畫佇列是空的，那麼就離開。
            if animation is undefined
                continue

            # 如果這是選擇器的第一個元素。
            if index is 0
                # 確認是否為全域動畫。
                isGlobal = false

                switch animation.animation
                    # 延遲。
                    when 'delay'
                        await @delay animation.duration
                        isGlobal = yes

                    # 顯示。
                    when 'show'
                        @$elements.removeAttr 'data-animating-hidden'
                        isGlobal = yes

                    # 隱藏。
                    when 'hide'
                        @$elements.attr 'data-animating-hidden', 'true'
                        isGlobal = yes

                    # 切換顯示、隱藏。
                    when 'toggle'
                        if @$this.attr('data-animating-hidden') is 'true'
                            @$this.removeAttr 'data-animating-hidden'
                        else
                            @$this.attr 'data-animating-hidden', 'true'
                        isGlobal = yes

                    # 可見。
                    when 'show visibility'
                        @$this.removeAttr 'data-animating-hidden'
                        isGlobal = yes

                    # 不可見但保有佔用區塊。
                    when 'hide visibility'
                        @$this.attr 'data-animating-hidden', 'true'
                        isGlobal = yes

                    # 切換可見度。
                    when 'toggle visibility'
                        if @$this.attr('data-animating-hidden') is 'true'
                            @$this.removeAttr 'data-animating-hidden'
                        else
                            @$this.attr 'data-animating-hidden', 'true'
                        isGlobal = yes

                # 如果是全域動畫的話，因為只會執行一次，所以會忽略其他元素的動畫索引。
                # 為了解決這個問題，我們需要推進其他元素的動畫索引並加ㄧ。
                if isGlobal
                    # 遞迴元素選擇器中，除了目前元素以外的所有元素。
                    # 因為這個元素的動畫索引已經被遞加過了。
                    $selector(@$elements.toArray().splice(1)).each (element) =>
                        @$this = $selector element
                        # 執行取得動畫資料的函式可以自動替動畫索引遞加。
                        @getAnimation()
                    @start()
                    return

            # 取得該元素這一輪該播放的動畫，並且開始演繹。
            await @animate animation

            # 如果這個元素是選擇器裡的最後一個元素，那麼就重新執行一輪。
            # 讓下一輪來決定是否到佇列的最後了好做一些收拾動作，或執行下一輪的動畫。
            if index is elements.length - 1
                @start()

    #
    #
    #
    delayCheck: (interval) =>
        new Promise (resolve) =>
            timer = setInterval =>
                # 如果頁面還是不可見的，就返回，不要呼叫 Promise 的解決函式。
                return if not @getData().skip

                console.log 'SKIP!'
                @$this
                    .removeAttr 'data-animating-hidden'
                    .removeAttr 'data-animation'
                    .removeAttr 'data-animating'
                    .css        'animation-duration', ''

                @setData
                    skip: false

                # 頁面可見了，呼叫解決函式！
                resolve()

                # 清除偵測計時器。
                clearInterval timer
            , 1

            await @delay interval
            resolve()

    # Animate
    #
    # 執行指定動畫。
    animate: ({animation, duration, onComplete, interval}) =>
        # 回傳 Promise，這樣其他函式才能透過 `await` 等待這個動畫執行完
        # 才執行下一個程式。
        new Promise (resolve) =>
            # 如果動畫名稱中有 `in` 就表示這個動畫會顯示元素，所以就移除元素的隱藏標籤。
            if animation.indexOf('in') isnt -1
                @$this.removeAttr 'data-animating-hidden'

            # 套用動畫名稱、動畫速度。
            @$this
                .attr 'data-animation'    , animation
                .css  'animation-duration', "#{duration}ms"

            # 稍微等待一下才套用執行動畫的標籤，這樣才會有動作。
            await @delay()

            # 套用執行動畫的標籤。
            @$this.attr 'data-animating', true

            # 當這個元素的動畫執行結束時。
            @$this.one 'animationend.animation', =>
                # 呼叫完成函式，並且傳遞自己作為 `this`。
                onComplete.call @$this.get()

                # 如果動畫名稱中有 `out` 就表示這個動畫會隱藏元素，所以就在動畫結束後加上元素隱藏標籤。
                if animation.indexOf('out') isnt -1
                    @$this.attr 'data-animating-hidden', 'true'

            # 等待使用者指定的間隔毫秒。
            await @delayCheck interval

            # 呼叫 Promise 的解決方案，解除 `await` 的阻擋。
            resolve()

    # Get Animation
    #
    # 取得動畫，並且自動遞加元素內的動畫索引，
    # 如果索引到底則移除整個佇列，或是重設索引（如果允許重複的話）。
    getAnimation: =>
        # 取得此元素的動畫資料。
        data = @getData()

        # 將索引遞加供下次使用。
        data.index++

        # 基於索引，從動畫佇列取得這次應該播放的動畫。
        animation = data.queue[data.index]

        #
        if animation is undefined
            #
            if data.looping
                #
                data.index = 0

                #
                @setData data

                #
                return data.queue[data.index]

            #
            data.index = -1

            #
            data.queue = []

        # 套用新的動畫資料變更。
        @setData data

        # 回傳這次該播放的動畫資料，如果佇列是空的導致無動畫資料則回傳 `null`。
        return animation

    # 模組可用的方法。
    methods: =>

        # Delay
        #
        # 延遲指定時間才執行下一個動畫。
        delay: (duration, onComplete) =>
            @push 'delay', duration, onComplete
            ts.fn

        # Stop
        #
        # 停止目前的這個動畫，執行下一個。
        stop: =>
            @$elements
                .removeAttr 'data-animating-hidden'
                .removeAttr 'data-animation'
                .removeAttr 'data-animating'
                .css        'animation-duration', ''
            @setData
                skip: true

            # @$this.trigger('animationend')

            ts.fn

        # Stop All
        #
        # 停止目前的動畫並且移除整個動畫佇列。
        'stop all': =>
            @$elements
                .removeAttr 'data-animating-hidden'
                .removeAttr 'data-animation'
                .removeAttr 'data-animating'
                .css        'animation-duration', ''
            @setData
                skip: true
                index: 0
                queue: []
            await @delay()
            @setData
                index: 0
                skip: false
            ts.fn

        # Clear Queue
        #
        # 執行完目前的動畫後就停止並且移除整個動畫佇列。
        'clear queue': =>
            @setData
                queue: []
            ts.fn

        # Show
        #
        # 不透過動畫顯示一個元素。
        show: (duration, onComplete) =>
            @push 'show', duration, onComplete
            ts.fn

        # Hide
        #
        # 不透過動畫隱藏一個元素。
        hide: (duration, onComplete) =>
            @push 'hide', duration, onComplete
            ts.fn

        # Toggle
        #
        # 不透過動畫切換一個元素的顯示或隱藏狀態。
        toggle: (duration, onComplete) =>
            @push 'toggle', duration, onComplete
            ts.fn

        # Show Visibility
        #
        # 不透過動畫顯示一個元素的可見狀態。
        'show visibility': (duration, onComplete) =>
            @push 'show visibility', duration, onComplete
            ts.fn

        # Hide Visibility
        #
        # 不透過動畫隱藏一個元素的可見狀態，這不會移除元素所佔用的空間。
        'hide visibility': (duration, onComplete) =>
            @push 'hide visibility', duration, onComplete
            ts.fn

        # Toggle Visibility
        #
        # 不透過動畫切換一個元素的顯示或隱藏可見狀態，這會令元素持續佔用其原本的空間。
        'toggle visibility': (duration, onComplete) =>
            @push 'toggle visibility', duration, onComplete
            ts.fn

        # Set Looping
        #
        # 允許動畫佇列執行到底之後重頭開始，不斷地循環。
        'set looping': =>
            @setData
                looping: true
            ts.fn

        # Remove Looping
        #
        # 移除動畫佇列的循環效果。
        'remove looping': =>
            @setData
                looping: false
            ts.fn

        # Is Visible
        #
        # 取得一個元素是否可見的布林值。
        'is visible': =>

        # Is Animating
        #
        # 取得一個元素是否正在進行動畫的布林值。
        'is animating': =>

        # Is Looping
        #
        # 取得一個元素的動畫佇列是否允許循環的布林值。
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

        # Fade Out Down
        #
        #
        bounce: (duration, onComplete) =>
            @push 'bounce', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        flash: (duration, onComplete) =>
            @push 'flash', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        pulse: (duration, onComplete) =>
            @push 'pulse', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rubber band': (duration, onComplete) =>
            @push 'rubber band', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        shake: (duration, onComplete) =>
            @push 'shake', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'head shake': (duration, onComplete) =>
            @push 'head shake', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        swing: (duration, onComplete) =>
            @push 'swing', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        tada: (duration, onComplete) =>
            @push 'tada', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        wobble: (duration, onComplete) =>
            @push 'wobble', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        jello: (duration, onComplete) =>
            @push 'jello', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce in': (duration, onComplete) =>
            @push 'bounce in', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce in down': (duration, onComplete) =>
            @push 'bounce in down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce in left': (duration, onComplete) =>
            @push 'bounce in left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce in right': (duration, onComplete) =>
            @push 'bounce in right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce in up': (duration, onComplete) =>
            @push 'bounce in up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce out': (duration, onComplete) =>
            @push 'bounce out', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce down': (duration, onComplete) =>
            @push 'bounce down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce out left': (duration, onComplete) =>
            @push 'bounce out left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce out right': (duration, onComplete) =>
            @push 'bounce out right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'bounce out up': (duration, onComplete) =>
            @push 'bounce out up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in': (duration, onComplete) =>
            @push 'fade in', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in down': (duration, onComplete) =>
            @push 'fade in down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in down heavily': (duration, onComplete) =>
            @push 'fade in down heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in left': (duration, onComplete) =>
            @push 'fade in left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in left heavily': (duration, onComplete) =>
            @push 'fade in left heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in right': (duration, onComplete) =>
            @push 'fade in right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in right heavily': (duration, onComplete) =>
            @push 'fade in right heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in up': (duration, onComplete) =>
            @push 'fade in up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade in up heavily': (duration, onComplete) =>
            @push 'fade in up heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out down': (duration, onComplete) =>
            @push 'fade out down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out down heavily': (duration, onComplete) =>
            @push 'fade out down heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out left': (duration, onComplete) =>
            @push 'fade out left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out left heavily': (duration, onComplete) =>
            @push 'fade out left heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out right': (duration, onComplete) =>
            @push 'fade out right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out right heavily': (duration, onComplete) =>
            @push 'fade out right heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out up': (duration, onComplete) =>
            @push 'fade out up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'fade out up heavily': (duration, onComplete) =>
            @push 'fade out up heavily', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'flip': (duration, onComplete) =>
            @push 'flip', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'flip in x': (duration, onComplete) =>
            @push 'flip in x', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'flip in y': (duration, onComplete) =>
            @push 'flip in y', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'flip out x': (duration, onComplete) =>
            @push 'flip out x', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'flip out y': (duration, onComplete) =>
            @push 'flip out y', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'light speed in': (duration, onComplete) =>
            @push 'light speed in', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'light speed out': (duration, onComplete) =>
            @push 'light speed out', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate in': (duration, onComplete) =>
            @push 'rotate in', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate in down left': (duration, onComplete) =>
            @push 'rotate in down left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate in down right': (duration, onComplete) =>
            @push 'rotate in down right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate in up left': (duration, onComplete) =>
            @push 'rotate in up left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate in up right': (duration, onComplete) =>
            @push 'rotate in up right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate out': (duration, onComplete) =>
            @push 'rotate out', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate out down left': (duration, onComplete) =>
            @push 'rotate out down left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate out down right': (duration, onComplete) =>
            @push 'rotate out down right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate out up left': (duration, onComplete) =>
            @push 'rotate out up left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'rotate out up right': (duration, onComplete) =>
            @push 'rotate out up right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'hinge': (duration, onComplete) =>
            @push 'hinge', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'roll in': (duration, onComplete) =>
            @push 'roll in', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'roll out': (duration, onComplete) =>
            @push 'roll out', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom in': (duration, onComplete) =>
            @push 'zoom in', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom in down': (duration, onComplete) =>
            @push 'zoom in down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom in left': (duration, onComplete) =>
            @push 'zoom in left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom in up': (duration, onComplete) =>
            @push 'zoom in up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom in right': (duration, onComplete) =>
            @push 'zoom in right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom out': (duration, onComplete) =>
            @push 'zoom out', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom out down': (duration, onComplete) =>
            @push 'zoom out down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom out left': (duration, onComplete) =>
            @push 'zoom out left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom out right': (duration, onComplete) =>
            @push 'zoom out right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'zoom out up': (duration, onComplete) =>
            @push 'zoom out up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide in down': (duration, onComplete) =>
            @push 'slide in down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide in left': (duration, onComplete) =>
            @push 'slide in left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide in right': (duration, onComplete) =>
            @push 'slide in right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide in up': (duration, onComplete) =>
            @push 'slide in up', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide out down': (duration, onComplete) =>
            @push 'slide out down', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide out left': (duration, onComplete) =>
            @push 'slide out left', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide out right': (duration, onComplete) =>
            @push 'slide out right', duration, onComplete
            ts.fn

        # Fade Out Down
        #
        #
        'slide out up': (duration, onComplete) =>
            @push 'slide out up', duration, onComplete
            ts.fn

ts Transition