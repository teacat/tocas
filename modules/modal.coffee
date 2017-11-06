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

    # 對話視窗的動畫效果。
    duration: 250

    # 臨時對話視窗的標籤名稱。
    temporaryName: 'data-modal-temporary'

    # 類別樣式名稱。
    className:
        MODAL        : 'ts modal'
        MINI_MODAL   : 'ts mini modal'
        MODALS_DIMMER: 'ts modals dimmer'
        SIZES        : 'mini tiny small large'
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
        TEMP_MODAL           : "[#{@::temporaryName}]"
        TEMP_MODAL_INPUT     : "[#{@::temporaryName}] .ts.input > *"

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

            # 找尋可供點擊關閉的對話視窗。
            $activeModal = $dimmer.find @selector.CLOSABLE_ACTIVE_MODAL

            # 如果沒有的話就離開。
            if $activeModal.length is 0
                return

            # 關閉可供點擊關閉的對話視窗。
            @$this = $activeModal
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
            await @delay @duration

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
            if @$this.hasClass @className.ACTIVE
                @close()
            else
                @open()
            ts.fn

        # Is Active
        #
        # 回傳一個表示對話視窗是否正在顯示的布林值。
        'is active': =>
            return @$this.hasClass @className.ACTIVE

ts Modal

#
#
#
#
#

# Prompt
#
# 讓使用者能夠產生臨時輸入對話視窗的函式，
# 基本上就是更短的 `ts.modal()`。
ts.prompt = (title, value='', onApprove=->true) =>
    ts.modal
        title : title
        prompt:
            type : 'input'
            value: value
        closable : false
        onApprove: onApprove

# Modal
#
# 讓使用者能夠產生臨時對話視窗的函式。
ts.modal = (title, content, onClose=->) =>
    # 取得現有的臨時對話視窗。
    $modal   = $selector Modal::selector.TEMP_MODAL
    # 是否有臨時對話視窗的布林值。
    hasModal = $modal.length isnt 0
    # 延遲函式。
    delay    = (time=0) -> new Promise (resolve) -> setTimeout(resolve, time)

    # 如果有臨時對話視窗。
    if hasModal
        # 而且該對話視窗是啟用狀態的話。
        if $modal.hasClass Modal::className.ACTIVE
            # 隱藏原先的對話視窗。
            ts(Modal::selector.TEMP_MODAL).modal 'hide'

            # 延遲一小段時間讓對話視窗隱藏後才繼續接下來的動作。
            # 避免視窗還沒隱藏，就改變其外觀看起來會很詭異。
            await delay Modal::duration

            # 重設對話視窗的尺寸樣式。
            $modal.removeClass Modal::className.SIZES
    else
        # 如果沒有臨時對話視窗，就自己建立一個，然後推入 Body 中。
        $modal = $selector '<div>'
            .attr     Modal::temporaryName, 'true'
            .appendTo $selector 'body'

    # 如果 `title` 不是物件，就表示這是簡易對話視窗。
    if typeof title isnt 'object'
        # 將簡易對話視窗設置為迷你型的，並加上 Tocas 前輟。
        # 然後套用 HTML 原始碼。
        $modal
            .addClass Modal::className.MINI_MODAL
            .html     """
                <div class="header">#{title}</div>
                <div class="content">#{content}</div>
                <div class="actions">
                    <button class="ts ok button">
                        確定
                    </button>
                </div>
            """

        # 選擇臨時簡易對話視窗，然後初始化它，並在關閉時呼叫關閉函式。
        # 初始化完之後就顯示臨時對話視窗。
        ts Modal::selector.TEMP_MODAL
            .modal
                onClose: =>
                    # 呼叫關閉函式，並回傳臨時對話視窗元素。
                    onClose.call $modal.get()

                    # 等待對話視窗關閉動畫。
                    await delay Modal::duration

                    # 如果此時的臨時對話視窗沒有任何啟用樣式，
                    # 也就代表沒有另一個行為在開啟對話視窗，我們就可以安心移除這個臨時對話視窗了。
                    $modal.remove() if not $selector(Modal::selector.TEMP_MODAL).hasClass 'active'
            .modal 'show'

        return

    # 定義進階臨時對話視窗的可用選項。
    options =
        # 對話視窗的標題，可支援 HTML 原始碼。
        title   : null
        # 對話視窗的內容，可支援 HTML 原始碼。
        content : null
        # 是否可供 Esc 或點擊淡化幕來關閉對話視窗。
        closable: true
        # 如果這是一個物件而且 `type` 不是 `nbull` 的話，
        # 對話視窗就會轉換為可供輸入的 Prompt 型態的視窗。
        prompt  :
            # 輸入欄位的種類，可以是 `input` 或 `textarea`。
            type       : null
            # 輸入欄位的預置文字。
            placeholder: null
            # 輸入欄位的預設值。
            value      : null
        # 對話視窗的大小。
        size    : 'mini'
        # 對話視窗的動作按鈕文字，當按鈕是 `null` 值時不會顯示。
        actions :
            # 正面的按鈕文字。
            positive: null
            # 負面的按鈕文字。
            negative: null
            # 無語氣的確定按鈕文字。
            ok      : '確定'
            # 無語氣的取消按鈕文字。
            cancel  : null
        # 當正面或確定按鈕被按下時所會呼叫的回呼函式，回傳 `false` 會令對話視窗無法關閉。
        onApprove: -> true
        # 當負面或取消按鈕被按下時所會呼叫的回呼函式，回傳 `false` 會令對話視窗無法關閉。
        onDeny   : -> true
        # 當對話視窗關閉時所會呼叫的回呼函式。
        onClose  : ->
        # 當對話視窗因為點擊淡化幕或者按下 Esc 關閉時所會呼叫的函式。
        onIgnore : ->

    # 將預設選項與使用者傳入的選項混雜在一起並覆蓋。
    options = {
        options...
        title...
    }

    # 如果有標題的話就以模板初始化。
    title    = if options.title?            then "<div class='header'>#{options.title}</div>"                              else ''
    content  = if options.content?          then options.content                                                           else ''
    cancel   = if options.actions.cancel?   then "<button class='ts cancel button'>#{options.actions.cancel}</button>"     else ''
    ok       = if options.actions.ok?       then "<button class='ts ok button'>#{options.actions.ok}</button>"             else ''
    negative = if options.actions.negative? then "<button class='ts negative button'>#{options.actions.negative}</button>" else ''
    positive = if options.actions.positive? then "<button class='ts positive button'>#{options.actions.positive}</button>" else ''
    prompt   = ''

    # 如果這個對話視窗有指定輸入的型態，就建立一個輸入欄位供稍後插入。
    if options.prompt?.type?
        # 是否有指定輸入欄位要是 `textarea` 型態的布林值。
        isTextarea  = options.prompt.type is 'textarea'
        # 取得預置文字。
        placeholder = if options.prompt.placeholder? then options.prompt.placeholder else ''
        # 取得預設值。
        value       = if options.prompt.value?       then options.prompt.value       else ''

        # 依照要求的輸入欄位型態產生。
        prompt = if isTextarea then """
            <div class="ts fluid input">
                <textarea style="resize: vertical" rows="3" placeholder="#{placeholder}">#{value}</textarea>
            </div>
        """ else """
            <div class="ts fluid input">
                <input type="text" placeholder="#{placeholder}" value="#{value}">
            </div>
        """

        # 如果有內容，又有輸入欄位的話，就在輸入欄位前面多一些換行。
        if content isnt '' and prompt isnt ''
            prompt = "<br><br>#{prompt}"

    # 加上尺寸選項，並且套用相關 HTML 原始碼，還有 Tocas 前輟來初始化這個臨時對話視窗。
    $modal
        .addClass "#{Modal::className.MODAL} #{options.size}"
        .html     """
            #{title}
            <div class="content">
                #{content}
                #{prompt}
            </div>
            <div class="actions">
                #{cancel}
                #{ok}
                #{negative}
                #{positive}
            </div>
        """

    # 如果輸入欄位是一般的 `input`，而且這又是個輸入視窗的話。
    if not isTextarea and prompt isnt ''
        # 監聽輸入欄位的按鍵事件。
        $selector(Modal::selector.TEMP_MODAL_INPUT).on 'keydown', (event) =>
            # 如果按下的按鍵不是 Enter 就離開。
            return if event.keyCode isnt 13

            # 否則就呼叫對話視窗的隱藏函式。
            ts(Modal::selector.TEMP_MODAL).modal 'hide'

            # 並且呼叫確定的回呼函式且帶入輸入欄位的數值。
            # 模擬使用者按下 Enter 送出資料的手法。
            options.onApprove.call $modal.get(), $selector(Modal::selector.TEMP_MODAL_INPUT).val()

    # 然後初始化這個進階的臨時對話視窗，接著顯示它。
    ts Modal::selector.TEMP_MODAL
        .modal
            closable : options.closable
            onApprove: ->
                    options.onApprove.call $modal.get(), $selector(Modal::selector.TEMP_MODAL_INPUT).val()
            onDeny: ->
                    options.onDeny.call $modal.get(), $selector(Modal::selector.TEMP_MODAL_INPUT).val()
            onClose: ->
                    options.onClose.call $modal.get(), $selector(Modal::selector.TEMP_MODAL_INPUT).val()
                    # 等待對話視窗關閉動畫。
                    await delay Modal::duration
                    # 如果此時的臨時對話視窗沒有任何啟用樣式，
                    # 也就代表沒有另一個行為在開啟對話視窗，我們就可以安心移除這個臨時對話視窗了。
                    $modal.remove() if not $selector(Modal::selector.TEMP_MODAL).hasClass 'active'
            onIgnore: ->
                    options.onIgnore.call $modal.get(), $selector(Modal::selector.TEMP_MODAL_INPUT).val()
        .modal 'show'
