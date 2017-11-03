# Dimmer
#
# 淡化幕。

class Dimmer
    # 模組名稱。
    @module:
        'dimmer'

    # 模組屬性。
    props:
        # 可否在點擊的時候關閉。
        closable : false
        # 當出現時會呼叫的回呼函式。
        onShow   : ->
        # 當隱藏時會呼叫的回呼函式。
        onHide   : ->
        # 當出現或隱藏時會呼叫的回呼函式。
        onChange : ->
        # 當淡化幕自動產生時所要追加的樣式類別，例如 `inverted`。
        variation: ''

    # 類別樣式名稱。
    className:
        ACTIVE: 'active'

    # 選擇器名稱。
    selector:
        DIMMER: 'ts dimmer'

    # 元素初始化函式。
    init: =>
        # 取得淡化幕
        $dimmer = @getDimmer()

        # 如果容器內沒有淡化幕，而且自己也不是淡化幕的話。
        if $dimmer.length is 0
            # 在容器內產生淡化幕。
            $selector('<div>').addClass(@selector.DIMMER).appendTo @$this

        # 重新取得淡化幕。
        $dimmer = @getDimmer()

        # 添加自訂外觀樣式。
        $dimmer.addClass @$this.data 'variation'

        # 如果淡化幕是可關閉的話。
        if @$this.data 'closable'
            # 就賦予淡化幕一個點擊事件，當淡化幕被點擊時就隱藏自己。
            $dimmer.on 'click.dimmer', (e) =>
                # 如果點擊的不是淡化幕本身，而是子元素就不要關閉。
                if e.target isnt $dimmer.get()
                    return
                @$this = $dimmer
                @hide()
                @$this = @$origin
        ts.fn

    # 元素摧毀函式。
    destroy: =>
        # 取得淡化幕。
        $dimmer = @getDimmer()
        # 註銷掉點擊事件。
        $dimmer.off 'click.dimmer'

    # Get Dimmer
    #
    # 回傳容器中的淡化幕或自己。
    getDimmer: =>
        # 如果自己是淡化幕的話就回傳自己。
        if @$this.hasClass 'dimmer'
            return @$this
        else
            # 不然就回傳容器內的淡化幕。
            return @$this.find ':scope > .ts.dimmer'

    # Event
    #
    # 呼叫指定事件的回呼函式。
    event: (event) =>
        @$this.data(event).call @$this.get()

    # Show
    #
    # 顯示淡化幕。
    show: =>
        @event 'onChange'
        @event 'onShow'
        @getDimmer().addClass @className.ACTIVE

    # Hide
    #
    # 隱藏淡化幕。
    hide: =>
        @event 'onChange'
        @event 'onHide'
        @getDimmer().removeClass @className.ACTIVE

    # 模組可用的方法。
    methods: =>

        # Show
        #
        # 顯示淡化幕。
        show: =>
            await @delay()
            @show()
            ts.fn

        # Hide
        #
        # 隱藏淡化幕。
        hide: =>
            @hide()
            ts.fn

        # Toggle
        #
        # 切換淡化幕。
        toggle: =>
            if @getDimmer().hasClass @className.ACTIVE
                @hide()
            else
                @show()
            ts.fn

        # Is Active
        #
        # 回傳一個表示淡化幕是否正在顯示中的布林值。
        'is active': =>
            @getDimmer().hasClass @className.ACTIVE

ts Dimmer