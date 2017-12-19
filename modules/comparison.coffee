# Comparison
#
# 比較。

class Comparison
    # 模組名稱。
    @module:
        'comparison'

    # 模組屬性。
    props:
        #
        onResize : ->
        #
        onDisplay: ->
        #
        resizable: true
        #
        labels:
            before: 'Before'
            after : 'After'
        #
        resizer:
            #divider, circular, dots, rounded
            style: 'divider'
        #

    # 類別樣式名稱。
    className:
        HIDDEN: 'hidden'

    # 選擇器名稱。
    selector:
        CLOSE_BUTTON: '.ts.close.button'

    resize: (percent) =>
        resizerWidth = parseInt(@$this.find('.resizer').css('width'))
        @$this.find('.after').css('width', "#{percent + resizerWidth}px")
        @$this.find('.resizer').css('left', "#{percent}px")

    resizeListener: (event, offset) =>
        parentRect  = @$this.get().getBoundingClientRect()
        resizerRect = @$this.find('.resizer').get().getBoundingClientRect()
        x = (event.clientX - parentRect.left) - offset

        if x < 0
            x = 0
        if x > parentRect.width - resizerRect.width
            x = parentRect.width - resizerRect.width

        @resize x

    # 元素初始化函式。
    init: =>
        beforeImg = @$this.find('.before').attr('src')
        afterImg  = @$this.find('.after').attr('src')

        template = @createElement """
        <div class="ts comparison">
            <div class="before">
                <img src="#{beforeImg}" style="filter: blur(5px);">
                <label>Before</label>
            </div>
            <div class="after">
                <img src="#{afterImg}">
                <label>After</label>
            </div>
            <div class="circular resizer"></div>
        </div>
        """

        @$this.replaceWith template
        @$this = $selector template

        @$this
            .on 'mousedown', (event) =>

                if not $selector(event.target).hasClass 'resizer'
                    return

                resizerRect = @$this.find('.resizer').get().getBoundingClientRect()
                startOffset = event.clientX - resizerRect.left

                @$this
                    .on 'mousemove', (moveEvent) =>
                        @resizeListener moveEvent, startOffset
                    .on 'mouseup', =>
                        @$this.off 'mousemove'
                    .on 'mouseout', (event) =>
                        if $selector(event.target).closest('.comparison').length is 0
                            @$this.off 'mousemove'


        ts.fn

    # 元素摧毀函式。
    destroy: =>


    # 模組可用的方法。
    methods: =>

        # Show After
        #
        # 完全展示「之後」的圖片。

        'show after': =>

        # Show Before
        #
        # 完全展示「之前」的圖片。

        'show before': =>

        # Set Resizer
        #
        # 設置延展分隔線的位置為指定百分比位置，以「之後」為 `0`。

        'set resizer': =>

        # Set After URL
        #
        # 設置「之後」圖片的網址。

        'set after url': (url) =>

        # Set Before URL
        #
        # 設置「之前」圖片的網址。

        'set before url': (url) =>

ts Comparison