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
        #@push animation, duration, onComplete, interval
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
            animating: false
            index    : 0
            looping  : false
            queue    : []

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
            when 'hide', 'show', 'toggle', 'hide visibility', 'show visibility', 'toggle visibility'
                interval = interval or 0
            else
                interval = interval or 80

        # 如果沒有動畫名稱則離開。
        if animation is null
            return

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

            #
            animation = @getAnimation()

            #
            #if animation is null
            #    @start()
            #    return

            if animation?.queue.length is undefined
                return

            #
            if index is 0
                console.log animation?.queue
                if animation?.animation is 'hide'
                    @$elements.attr 'data-animating-hidden', 'true'

                if animation?.animation is 'delay'
                    await @delay animation.duration

                @start()
                return



            # 取得該元素這一輪該播放的動畫，並且開始演繹。
            await @animate animation

            # 如果這個元素是選擇器裡的最後一個元素，那麼就重新執行一輪。
            # 讓下一輪來決定是否到佇列的最後了好做一些收拾動作，或執行下一輪的動畫。
            if index is elements.length - 1
                @start()

    # Animate
    #
    # 執行指定動畫。
    animate: (options) =>
        #
        if options is null
            return

        await @delay()

        #
        {animation, duration, onComplete, interval} = options

        # 回傳 Promise，這樣其他函式才能透過 `await` 等待這個動畫執行完
        # 才執行下一個程式。
        new Promise (resolve) =>
            #
            switch animation
                #
                when 'delay'
                    if @index is 0
                        await @delay duration

                #
                when 'show'
                    @$this.removeAttr 'data-animating-hidden'

                #
                when 'hide'

                    @$this.attr 'data-animating-hidden', 'true'
                    resolve()
                    return

                #
                when 'toggle'
                    if @$this.attr('data-animating-hidden') is 'true'
                        @$this.removeAttr 'data-animating-hidden'
                    else
                        @$this.attr 'data-animating-hidden', 'true'

                #
                when 'show visibility'
                    @$this.removeAttr 'data-animating-hidden'

                #
                when 'hide visibility'
                    @$this.attr 'data-animating-hidden', 'true'


                #
                when 'toggle visibility'
                    if @$this.attr('data-animating-hidden') is 'true'
                        @$this.removeAttr 'data-animating-hidden'
                    else
                        @$this.attr 'data-animating-hidden', 'true'

                else

                    if animation.indexOf('in') isnt -1
                        @$this.removeAttr 'data-animating-hidden'
                    if animation.indexOf('out') isnt -1
                        @$this.attr 'data-animating-hidden', 'true'

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

            # 等待使用者指定的間隔毫秒。
            await @delay interval

            # 呼叫 Promise 的解決方案，解除 `await` 的阻擋。
            resolve()

    # Get Animation
    #
    # 取得動畫，並且自動遞加元素內的動畫索引，
    # 如果索引到底則移除整個佇列，或是重設索引（如果允許重複的話）。
    getAnimation: =>
        # 取得此元素的動畫資料。
        data = @getData()

        # 基於索引，從動畫佇列取得這次應該播放的動畫。
        animation = data.queue[data.index]

        # 將索引遞加供下次使用。
        data.index++

        # 如果索引大於佇列的長度，而且又允許重複動畫的話。
        if data.index > data.queue.length - 1
            # 就重設索引，下次從 0 開始。
            data.index = 0

            # 如果不允許重複動畫的話。
            if not data.looping
                # 就移除整個動畫佇列。
                data.queue = []

        # 套用新的動畫資料變更。
        @setData data

        #
        return if data.queue.length is 0 then null else animation

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
            ts.fn

        # Stop All
        #
        # 停止目前的動畫並且移除整個動畫佇列。
        'stop all': =>
            ts.fn

        # Clear Queue
        #
        # 執行完目前的動畫後就停止並且移除整個動畫佇列。
        'clear queue': =>
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

ts Transition