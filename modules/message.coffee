# Message
#
# 訊息。

class Message
    # 模組名稱。
    @module:
        'message'

    # 模組屬性。
    props:
        # 當訊息被關閉時所呼叫的回呼函式。
        onClose: ->

    # 類別樣式名稱。
    className:
        HIDDEN: 'hidden'

    # 選擇器名稱。
    selector:
        CLOSE_BUTTON: '.close.button'

    # 元素初始化函式。
    init: =>
        # 監聽關閉按鈕的點擊事件。
        @$this.find(@selector.CLOSE_BUTTON).on 'click.message', =>
            @$this.data('onClose')?.call @$this.get()
            @$this.addClass @className.HIDDEN
        ts.fn

    # 元素摧毀函式。
    destroy: =>
        @$this.find(@selector.CLOSE_BUTTON).off 'click.message'

    # 模組可用的方法。
    methods: =>

        # Show
        #
        # 顯示訊息。
        show: =>
            @$this.removeClass @className.HIDDEN
            ts.fn

        # Hide
        #
        # 隱藏訊息。
        hide: =>
            @$this.addClass @className.HIDDEN
            ts.fn

        # Toggle
        #
        # 切換訊息。
        toggle: =>
            @$this.toggleClass @className.HIDDEN
            ts.fn

        # Is Hidden
        #
        # 回傳一個表示訊息是否正在隱藏狀態的布林值。
        'is hidden': =>
            @$this.hasClass @className.HIDDEN

        # Is Visible
        #
        # 回傳一個表示訊息是否正在顯示中的布林值。
        'is visible': =>
            not @$this.hasClass @className.HIDDEN

ts Message