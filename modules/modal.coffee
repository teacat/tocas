# Modal
#
# 彈出式視窗。

class Modal
    # 模組名稱。
    @module:
        'modal'

    # 模組屬性。
    props:
        # 會呼叫同意回呼函式的元素選擇器。
        approve  : '.approve, .positive, .ok'
        # 會呼叫拒絕回呼函式的元素選擇器。
        deny     : '.deny, .negative, .cancel'
        # 是否可由點擊背景來關閉對話視窗。
        closable : true
        # 同意時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
        onApprove: -> true
        # 拒絕時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
        onDeny   : -> true
        # 當視窗被關閉時所呼叫的函式。
        onClose  : ->
        # 當視窗是以點擊背景關閉時所呼叫的函式。
        onIgnore : ->
        # 是否綁定鍵盤快捷鍵，如 Esc 鍵以關閉視窗。
        keyboardShortcuts: true

    # 類別樣式名稱。
    className:
        MODALS_DIMMER: 'ts modals dimmer'
        CLOSABLE     : 'closable'
        ACTIVE       : 'active'
        OPENING      : 'opening'
        CLOSING      : 'closing'

    # 選擇器名稱。
    selector:
        CLOSE_BUTTON         : ':scope > .ts.close.button'
        MODALS_DIMMER        : '.ts.modals.dimmer'
        CLOSING_MODALS_DIMMER: '.ts.modals.closing.dimmer'
        CLOSABLE_ACTIVE_MODAL: '.ts.modal.active.closable'

    # 元素初始化函式。
    init: =>
        # 取得全域對話視窗淡化幕。
        $dimmer = @getDimmer()

        # 如果這個對話視窗不在淡化幕內，我們就將這個對話視窗移入淡化幕裡。
        if not @$this.parent().hasClass @className.MODALS_DIMMER
            @$this.appendTo $dimmer

        # 依據這個對話視窗是否可供關閉，來決定是否要追加指定樣式類別。
        if @$this.data('closable')
            @$this.addClass @className.CLOSABLE
        else
            @$this.removeClass @className.CLOSABLE

        # 如果這個對話視窗是可供關閉而且又允許透過鍵盤快捷鍵關閉，
        # 那麼就綁定「Esc」按鍵事件到頁面上並指定關閉這個對話視窗。
        if @$this.data('keyboardShortcuts') and @$this.data('closable')
            $selector(document).on 'keyup.modal', (event) =>
                # 如果不是 Esc 按鍵則返回。
                return if event.keyCode isnt 27
                # 如果沒有正在顯示且可供忽略的對話視窗，那麼就返回。
                return if $selector(@selector.CLOSABLE_ACTIVE_MODAL).length is   0
                # 如果淡化幕已經正在關閉了，就返回。避免雙重觸發關閉事件。
                return if $selector(@selector.CLOSING_MODALS_DIMMER).length isnt 0
                # 關閉視窗。
                @close()
                # 呼叫忽略時的事件函式。
                @$this.data('onIgnore')?.call @$this.get()

        # 綁定「允許」按鈕的事件。
        @$this.find(@$this.data('approve')).on 'click', =>
            if @$this.data('onApprove')?.call(@$this.get()) isnt false
                @close()

        # 綁定「拒絕」按鈕的事件。
        @$this.find(@$this.data('deny')).on 'click', =>
            if @$this.data('onDeny')?.call(@$this.get()) isnt false
                @close()

        # 綁定「關閉」按鈕的事件。
        @$this.find(@selector.CLOSE_BUTTON).on 'click', =>
            @close()
        ts.fn

    # 元素摧毀函式。
    destroy: =>

    # Get Dimmer
    #
    # 初始化一個淡化幕如果有必要的話，最終回傳一個全域對話視窗淡化幕。
    getDimmer: =>
        # 取得全域對話視窗淡化幕。
        $dimmer = $selector @selector.MODALS_DIMMER

        # 如果有的話就直接回傳淡化幕元素。
        if $dimmer.length isnt 0
            return $dimmer

        # 沒有的話就建立一個新的對話視窗淡化幕。
        $dimmer = $selector('<div>').addClass @className.MODALS_DIMMER

        # 將淡化幕推入到網頁中。
        $selector('body').append $dimmer

        # 綁定淡化幕被按下時，自動關閉對話視窗的點擊事件。
        $dimmer.on 'click', (event) =>
            # 如果點擊淡化幕但目標其實是子元素就離開。
            if event.target isnt $dimmer.get()
                return

            # 關閉可供點擊關閉的對話視窗。
            @$this = $dimmer.find @selector.CLOSABLE_ACTIVE_MODAL
            @close()

            # 呼叫忽略時的事件函式。
            @$this.data('onIgnore')?.call @$this.get()

        # 回傳這個新的淡化幕。
        return $dimmer

    # Open
    #
    # 開啟一個對話視窗。
    open: =>
        # 如果要開啟的對話視窗早已開啟，就離開此程式。
        if @$this.hasClass(@className.ACTIVE)
            return

        #
        if $selector(".#{@className.ACTIVE}.modal").length isnt 0
            ts('.modal').modal('hide')
            await @delay 250

        # 鎖定頁面的捲動。
        $selector('body').attr 'data-modal-lock', 'true'

        # 將對話視窗的淡化幕設置為啟用、開啟中。
        @$this.parent().addClass "#{@className.ACTIVE} #{@className.OPENING}"

        # 將對話視窗設置為啟用、開啟中。
        # 當對話視窗的動畫執行結束後，就移除自己還有淡化幕的開啟中樣式。
        @$this
            .addClass "#{@className.ACTIVE} #{@className.OPENING}"
            .one      'animationend', =>
                @$this.removeClass          @className.OPENING
                @$this.parent().removeClass @className.OPENING

    # Close
    #
    # 關閉一個對話視窗。
    close: =>
        # 如果這個對話視窗本來就沒有啟用，就不需要執行接下來的關閉程式。
        if not @$this.hasClass(@className.ACTIVE)
            return

        # 解除頁面的捲動鎖定。
        $selector('body').removeAttr 'data-modal-lock'

        # 將對話視窗的淡化幕設置為關閉中。
        @$this.parent().addClass @className.CLOSING

        # 將對話視窗設置為啟用、關閉中。
        # 當對話視窗的動畫執行結束後，就移除自己還有淡化幕的關閉中樣式。
        @$this
            .addClass "#{@className.ACTIVE} #{@className.CLOSING}"
            .one      'animationend', =>
                @$this.removeClass          "#{@className.ACTIVE} #{@className.CLOSING}"
                @$this.parent().removeClass "#{@className.ACTIVE} #{@className.CLOSING}"
                # 呼叫關閉時的事件函式。
                @$this.data('onClose').call @$this.get()

    # 模組可用的方法。
    methods: =>

        # Show
        #
        # 顯示對話視窗。
        show: =>
            @open()
            ts.fn

        # Hide
        #
        # 隱藏對話視窗。
        hide: =>
            @close()
            ts.fn

        # Toggle
        #
        # 切換對話視窗。
        toggle: =>
            if @$this.hasClass 'active'
                @close()
            else
                @open()
            ts.fn

        # Is Active
        #
        # 回傳一個表示對話視窗是否正在顯示的布林值。
        'is active': =>
            return @$this.hasClass 'active'

ts Modal

ts.prompt = (title, value='', onApprove=->true) ->
    ts.modal
        title : title
        prompt:
            value: value
        closable : false
        onApprove: onApprove

ts.modal = (title, content, onClose=->) ->
    # 取得現有的臨時對話窗。
    $modal   = $selector('[data-modal-temporary]')
    hasModal = $modal.length isnt 0
    delay    = (time=0) -> new Promise (resolve) -> setTimeout(resolve, time)

    if hasModal
        if $modal.hasClass 'active'
            # 隱藏原先的對話視窗。
            ts('[data-modal-temporary]').modal 'hide'
            # 延遲一小段時間讓對話視窗隱藏後才繼續接下來的動作。
            # 避免視窗還沒隱藏，就改變其外觀看起來會很詭異。
            await delay 250
            # 重設對話視窗的樣式。
            $modal.removeClass 'mini tiny small large'
    else
        # 如果沒有臨時對話視窗，就自己建立一個，然後推入 Body 中。
        $modal = $selector('<div>')
            .attr     'data-modal-temporary', 'true'
            .appendTo $selector 'body'

    # 如果 `title` 不是物件，就表示這是簡易對話視窗。
    if typeof title isnt 'object'
        # 初始化簡易對話視窗的內容。
        modal = """
            <div class="header">#{title}</div>
            <div class="content">#{content}</div>
            <div class="actions">
                <button class="ts ok button">
                    確定
                </button>
            </div>
        """
        #
        $modal
            .addClass 'ts mini modal'
            .html     modal
        #
        ts('[data-modal-temporary]').modal({
            onClose: ->
                onClose.call @
                $selector('[data-modal-temporary]').remove()
        }).modal('show')

    else
        customOptions = title
        options =
            title   : null
            content : null
            closable: true
            prompt  : null
                # type       : 'input'
                # placeholder: null
                # value      : null
            size    : 'mini'
            actions :
                positive: null
                negative: null
                ok      : '確定'
                cancel  : null
            onApprove: -> true
            onDeny   : -> true
            onClose  : ->
            onIgnore : ->
        options = {
            options...
            customOptions...
        }

        title    = if options.title?            then "<div class='header'>#{options.title}</div>"                              else ''
        positive = if options.actions.positive? then "<button class='ts positive button'>#{options.actions.positive}</button>" else ''
        negative = if options.actions.negative? then "<button class='ts negative button'>#{options.actions.negative}</button>" else ''
        ok       = if options.actions.ok?       then "<button class='ts ok button'>#{options.actions.ok}</button>"             else ''
        cancel   = if options.actions.cancel?   then "<button class='ts cancel button'>#{options.actions.cancel}</button>"     else ''
        content  = if options.content?          then options.content                                                           else ''

        if options.prompt?
            isTextarea  = options.prompt.type is 'textarea'
            placeholder = if options.prompt.placeholder? then options.prompt.placeholder else ''
            value       = if options.prompt.value?       then options.prompt.value       else ''

            if isTextarea
                input = """<textarea style="min-width: 100%" rows="3" placeholder="#{placeholder}">#{value}</textarea>"""
            else
                input = """<input type="text" placeholder="#{placeholder}" value="#{value}">"""

            resizable = if isTextarea then 'resizable' else ''

            prompt = """
                <div class="ts fluid #{resizable} input">
                    #{input}
                </div>
            """
        else
            prompt = ''

        if content isnt '' and prompt isnt ''
            prompt = "<br><br>#{prompt}"



        modal = """
            #{title}
            <div class="content">#{content}#{prompt}</div>
            <div class="actions">
                #{cancel}
                #{ok}
                #{negative}
                #{positive}
            </div>
        """
        $modal
            .addClass "ts #{options.size} modal"
            .html     modal

        if not isTextarea and prompt isnt ''
            $selector('[data-modal-temporary] .ts.input > *').on 'keydown', (event) =>
                return if event.keyCode isnt 13
                ts('[data-modal-temporary]').modal('hide')
                options.onApprove.call @, $selector('[data-modal-temporary] .ts.input > *').val()

        ts('[data-modal-temporary]')
            .modal
                closable : options.closable
                onApprove: ->
                        options.onApprove.call @, $selector('[data-modal-temporary] .ts.input > *').val()
                onDeny: ->
                        options.onDeny.call @, $selector('[data-modal-temporary] .ts.input > *').val()
                onClose: ->
                        options.onClose.call @, $selector('[data-modal-temporary] .ts.input > *').val()
                onIgnore: ->
                        options.onIgnore.call @, $selector('[data-modal-temporary] .ts.input > *').val()
            .modal 'show'
