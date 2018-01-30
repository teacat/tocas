# Range
#
# 範圍。

class Range
    # 模組名稱。
    @module:
        'range'

    # 模組屬性。
    props:
        #
        onChange: ->
        #
        onAdd: ->
        #
        onSubtract: ->

    # 類別樣式名稱。
    className:
        HIDDEN: 'hidden'

    # 選擇器名稱。
    selector:
        CLOSE_BUTTON: '.ts.close.button'

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

        add: (value) =>

        subtract: (value) =>

        'set value': (value) =>

ts Message