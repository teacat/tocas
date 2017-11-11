# Snackbar
#
# 點心條。

class Snackbar
    # 模組名稱。
    @module:
        'snackbar'

    # 模組屬性。
    props:
        # 主要內容文字。
        content: ''
        # 動作設置。
        action :
            # 動作按鈕的文字。
            text    : ''
            # 動作按鈕的語意。
            emphasis: ''
        # 當點心條關閉時所會呼叫的回呼函式。
        onClose  : =>
        # 當點心條因為放置而自動關閉時所會呼叫的回呼函式。
        onIgnore : =>
        # 當動作按鈕被按下時所呼叫的回呼函式。
        onAction : =>
        # 點心條到自動消失所耗費的毫秒時間，如果設為 `0` 則表示永不自動消失。
        delay    : 3500
        # 點心條可否手動忽略，例如：滑開。
        closable : true
        # 點心條是否應該在滑鼠指向時，持續顯示避免自動消失。
        hoverStay: true

    # 類別樣式名稱。
    className:
        ACTIVE   : 'active'
        ANIMATING: 'animating'
        PRIMARY  : 'primary'
        INFO     : 'info'
        WARNING  : 'warning'
        POSITIVE : 'positive'
        NEGATIVE : 'negative'

    # 選擇器名稱。
    selector:
        CONTENT: '.content'
        ACTION : '.action'

    # 元素初始化函式。
    init: =>
        #
        $action = @$this.find @selector.ACTION
        $action.on 'click.snackbar', =>
            @hide 'action'

        #
        if @$this.data('hoverStay') is true
            @$this.on 'mouseenter.snackbar', =>
                @$this.attr 'data-mouseon', 'true'
            @$this.on 'mouseleave.snackbar', =>
                @$this.attr 'data-mouseon', 'false'

        @show()

        ts.fn

    # 元素摧毀函式。
    destroy: =>
        #
        $action = @$this.find @selector.ACTION
        $action.off 'click.snackbar'
        @$this.off 'mouseenter.snackbar'
        @$this.off 'mouseleave.snackbar'

    #
    #
    #
    show: =>
        # 移除啟用和動畫效果，並且重新套用一次。
        # 在動畫結束後移除動畫樣式。
        @$this
            .removeClass "#{@className.ACTIVE} #{@className.ANIMATING}"
            .addClass    "#{@className.ACTIVE} #{@className.ANIMATING}"
            .one         'animationend', =>
                @$this.removeClass @className.ANIMATING
            .emulate 'animationend', 300
            .attr    'data-mouseon', 'false'

        # 替換點心條的 HTML 內容。
        content = @$this.data 'content'
        if content isnt ''
            $content = @$this.find @selector.CONTENT
            $content.html @$this.data 'content'

        # 取得動作設置資料。
        action  = @$this.data 'action'
        $action = @$this.find @selector.ACTION

        # 替換動作按鈕的文字。
        if action?.text? and action.text isnt ''
            $action.html action.text

        # 替換動作按鈕的語意。
        if action?.emphasis and action.emphasis isnt ''
            $action
                .removeClass "#{@className.PRIMARY} #{@className.INFO} #{@className.WARNING} #{@className.NEGATIVE} #{@className.POSITIVE}"
                .addClass     action.emphasis

        #
        if @$this.data('delay') isnt 0
            # 保存一個計時器物件，這樣才能不斷地重複利用它。
            timer =
                name    : 'snackbar'
                callback: =>
                    # 如果時間到了，但是使用者的滑鼠還在點心條上，而且使用者又希望避免自動消失。
                    if @$this.attr('data-mouseon') is 'true' and @$this.data('hoverStay') is true
                        # 稍後一下讓計時器被消除。
                        await @delay()
                        # 不斷地重設這個計時器，直到使用者滑鼠移開為止才繼續。
                        @$this.setTimer timer
                        return
                    # 隱藏此點心條，並以「忽略」模式進行。
                    @hide 'ignore'
                interval: @$this.data 'delay'
                visible : true

            # 初始化一個延遲計時器，時間到了就會隱藏此點心條。
            @$this.setTimer timer


    hide: (type) =>
        #
        if not @$this.hasClass @className.ACTIVE
            return

        #
        @$this.removeTimer 'snackbar'

        #
        switch type
            #
            when 'action'
                if @$this.data('onAction').call(@$this.get()) is false
                    return

            #
            when 'ignore'
                @$this.data('onIgnore').call(@$this.get())

        #
        if @$this.data('onClose').call(@$this.get()) is false
            return

        #
        @$this
            .removeClass @className.ACTIVE
            .addClass    @className.ANIMATING
            .one         'animationend', =>
                @$this.removeClass @className.ANIMATING





    # 模組可用的方法。
    methods: =>

        # Toggle
        #
        # 切換點心條的顯示、隱藏。
        toggle: =>
            if @$this.hasClass @className.ACTIVE
                @hide()
            else
                @show()
            ts.fn

        # Show
        #
        # 顯示一個已存在的點心條。
        show: =>
            @show()
            ts.fn

        # Hide
        #
        # 隱藏一個已存在的點心條。
        hide: =>
            @hide()
            ts.fn

        # Is Visible
        #
        # 回傳一個點心條是否可見的布林值。
        'is visible': =>
            @$this.hasClass @className.ACTIVE

        # Is Hidden
        #
        # 回傳一個點心條是否正在隱藏中的布林值。
        'is hidden': =>
            not @$this.hasClass @className.ACTIVE

ts Snackbar


ts.snackbar = (options) =>