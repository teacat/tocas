# Dropdown
#
# 下拉式選單。

class Dropdown
    # 模組名稱。
    @module:
        'dropdown'

    # 模組屬性。
    props:
        # 當選單的值被變動時所會呼叫的回呼函式。
        onChange     : (value, text, element) =>
        # 當多選選單多選了一個值所會呼叫的回呼函式。
        onAdd        : (addedValue, addedText, addedElement) =>
        # 當多選選單有一個值被移除時所會呼叫的回呼函式。
        onRemove     : (removedValue, removedText, removedElement) =>
        # 當使用者在多選選單自創了一個新的值所會呼叫的回呼函式。
        onLabelCreate: (value, text) -> @
        #
        # 當上述函式回傳下列物件時就修改元素。
        # {
        #     image   : ''
        #     icon    : ''
        #     emphasis: ''
        #     class   : ''
        #     element : @
        # }
        #
        # 當使用者再多選選單移除了一個值所會呼叫的回呼函式。
        onLabelRemove: (value, text) =>
        # 當使用者選取或按壓多選選單其中一個標籤時所會呼叫的回呼函式。
        onLabelSelect: (value, text, element) =>
        # 當使用者在選單中輸入文字時所呼叫的回呼函式。
        onInput      : =>
        # 當沒有相符搜尋內容所會呼叫的回呼函式。
        onNoResults  : =>
        # 當選單展開時所呼叫的回呼函式。
        onShow       : =>
        # 當選單隱藏時所呼叫的回呼函式。
        onHide       : =>
        # 當使用者按下選單中其中一個選項時所呼叫的回呼函式。
        onSelect     : (value, element) =>
        # 用以初始化選單內容的選項，當這個選項是 `false` 而不是陣列的時候會從 HTML 架構初始化。
        values       : false
        # 是否允許重新選取，當設為 `true` 時，就算使用者選取了正在選取的值，仍會呼叫 `onChange`。
        allowReselection: false
        # 是否允許使用者擅自新增選單值。
        allowAdditions  : false
        # 當使用者新增了值並移除後，是否要在選單中隱藏這個值。
        hideAdditions   : true
        # 搜尋的底限字數，超過此字數才會開始搜尋。
        minCharacters   : 1
        # 搜尋時的依據，可用：`both` 符合文字或值、`value` 符合值、`text` 符合文字。
        match           : 'both'
        # 是否要進行全文搜尋，若為 `true` 只要搜尋的值符合選項文字其中即可；`false` 則會強迫搜尋的值必須和選項文字開頭相符。
        fullTextSearch  : false
        # 是否要使用標籤而非純計數文字。
        useLabels       : true
        # 多選選單是否使用標籤？若設置為 `false` 會以「已選擇 x 個」純文字替代標籤。
        useLabels       : true
        # 多選選單最多可以選擇幾個項目？設置為 `0` 表示無限。
        maxSelections   : 0

    # 類別樣式名稱。
    className:
        VISIBLE       : 'visible'
        HIDDEN        : 'hidden'
        ANIMATING     : 'animating'
        DROPDOWN      : 'dropdown'
        TEXT          : 'text'
        ICON          : 'icon'
        IMAGE         : 'image'
        ITEM          : 'item'
        MENU          : 'menu'
        UPWARD        : 'upward'
        DOWNWARD      : 'downward'
        LEFTWARD      : 'leftward'
        RIGHTWARD     : 'rightward'
        SELECTION     : 'selection'
        MULTIPLE      : 'multiple'
        LABELS        : 'labels'
        CLOSE         : 'close'
        DEFAULT_LABEL : 'ts compact label'
        DEFAULT_BUTTON: 'ts tiny close button'
        FILTERED      : 'filtered'
        PLACEHOLDER   : 'placeholder'
        SELECTED      : 'selected'
        ACTIVE        : 'active'
        ADDITION_ITEM : 'addition item'

    # 選擇器名稱。
    selector:
        OPTION                : 'option'
        DROPDOWN              : '.ts.dropdown'
        VISIBLE_DROPDOWN      : '.ts.visible.dropdown'
        DEFAULT_BUTTON        : '.ts.tiny.close.button'
        LABELS                : '.labels'
        SELF_LABELS           : ':scope > .labels'
        SEARCH                : 'input.search'
        ITEM                  : '.item:not(.addition)'
        ACTIVE_ITEM           : '.active.item'
        UNSELECTED_ITEM       : '.item:not(.selected):not(.addition)'
        ACTIVE_ITEM_UNFILTERED: '.active.item:not(.filtered):not(.addition)'
        ITEM_NOT_FILTERED     : '.item:not(.filtered):not(.addition)'
        FILTERED              : '.filtered'
        TEXT                  : '.text'
        LABEL                 : '.labels .label'
        MESSAGE               : '.message'
        MENU                  : '.menu'
        ADDITION_ITEM         : '.addition.item'
        SELECT                : 'select'
        SELECTED_ITEM         : '.item.selected'
        SELECTABLE_OPTION     : 'select option:not([selected]):not([value=""])'
        SPECIFIED_OPTION      : (v) => "select option[value='#{v}']"
        SPECIFIED_ITEM        : (v) => ".menu .item[data-value='#{v}']"
        SPECIFIED_LABEL       : (v) => ".labels .label[data-value='#{v}']"

    # 鍵盤按鍵代號。
    key:
        ENTER    : 13
        BACKSPACE: 8
        UP       : 38
        DOWN     : 40
        LEFT     : 37
        RIGHT    : 39

    # 下拉式選單所會用到的 z 軸索引。
    zIndex:
        MENU   : 9
        ACTIVE : 10
        HOVERED: 11

    # 下拉式選單的動畫時間。
    duration: 300




    ###
    Action
    ###

    # Bind
    #
    # 監聽下拉式選單所需的事件。

    bind: =>
        $selector document
            # 頁面點擊關閉下拉式選單的監聽事件。
            .off 'click.dropdown'
            .on  'click.dropdown', (event) =>
                @documentListener $selector event.target
            # 頁面的鍵盤點擊事件，用以選擇項目。
            .on 'keydown', @documentKeyboardListener

        # 下拉式選單點擊的切換事件。
        @$this
            .on 'click', @dropdownListener

        # 搜尋欄位的輸入事件。
        @$this
            .find @selector.SEARCH
            .on   'keydown input', @inputListener


    # Document Keyboard Listener
    #
    # 頁面鍵盤事件監聽函式。

    documentKeyboardListener: (event) =>
        #
        if $selector('body').find('.visible.dropdown').length isnt 0
            event.preventDefault()

        # 如果頁面鍵盤按下時，這個下拉式選單不是開啟的，
        # 那麼就不關這個選單的事，返回。
        if not @$this.hasClass @className.VISIBLE
            return

        #
        $item = @$this.find(@selector.ACTIVE_ITEM_UNFILTERED)
        $prev = $item.prev()
        $next = $item.next()

        # 取得搜尋輸入欄位目前的值。
        value = @$this.find(@selector.SEARCH).val()

        # 如果沒有已選的選項，就選擇第一個選項。
        if $item.length is 0
            # 選擇選單中的第一個可用項目。
            @selectOption @$this.find(@selector.ITEM_NOT_FILTERED).eq(0).attr 'data-value'

            # 重新渲染文字。
            @renderText()
            return


        # 依照按鍵代號執行不同的事情。
        switch event.keyCode
            # Enter 按鍵。
            when @key.ENTER
                event.preventDefault()

                # 選擇正在啟用的項目。
                @selectOption @$this.find(@selector.ACTIVE_ITEM).attr 'data-value'

                # 清空搜尋欄位的文字。
                @$this.find(@selector.SEARCH).val ''

                # 重新渲染文字。
                @renderText()

                # 如果這不是多選選單，或已經沒有可選的選項。
                if not @data().get().multiple or not @getSelectable()
                    # 就關閉下拉式選單。
                    @contract()

                # 如果這個選單可供搜尋，而且又不是多選選單。
                if @data().get().searchable and not @data().get().multiple
                    # 就失焦搜尋輸入欄位。
                    @$this.find(@selector.SEARCH).get()?.blur()

            # 上按鍵。
            when @key.UP
                event.preventDefault()

                #
                if $prev.length is 0 or $prev.is '.message, .filtered'
                    return

                # 選擇上個項目。
                @selectOption $prev.attr 'data-value'

                # 重新渲染文字。
                @renderText()

            # 下按鍵。
            when @key.DOWN
                event.preventDefault()

                #
                if $next.length is 0 or $next.is @selector.FILTERED
                    return

                # 選擇下個項目。
                @selectOption $next.attr 'data-value'

                # 重新渲染文字。
                @renderText()


    # Document Listener
    #
    # 頁面點擊事件處理函式。

    documentListener: ($target) =>
        #
        if $target.hasClass('close')
            return

        # 點擊目標是不是沒有下拉式選單父容器的布林值。
        noDropdownParent = $target.closest(@selector.DROPDOWN).length is 0

        # 如果點擊的目標不是下拉式選單內的元素，也不是下拉式選單本體。
        if noDropdownParent
            # 那麼就隱藏所有可見的下拉式選單。
            ts(@selector.VISIBLE_DROPDOWN).dropdown 'hide'


    # Input Listener
    #
    # 搜尋欄位的輸入事件處理函式。

    inputListener: (event) =>
        # 用選擇器選取輸入欄位。
        $input = $selector event.target
        # 取得輸入欄位的值。
        value  = $input.val()

        # Calculate Width
        #
        # 透過 Canvas 計算字的真實像素長度，並且回傳，這樣能我們更方便處理響應式輸入欄位寬度。
        # 詳細用法請參考：
        # https://stackoverflow.com/a/43922708/5203951
        calculateWidth = =>
            canvas       = document.createElement 'canvas'
            context      = canvas.getContext '2d'
            context.font = $input.css('font-size') + $input.css('font-family')
            context.measureText($input.val()).width

        # 如果事件種類是 `input` 就執行輸入欄位的長度計算，然後離開。
        # 因為我們同時監聽 `keydown` 和 `input` 事件，避免重複觸發。
        if event.type is 'input'
            # 透過搜尋的值過濾內容。
            @filter value

            # 如果這個值不存在，那麼就依照設定顯示提示看要不要讓使用者自己手動新增。
            @addition value

            # 如果選單允許多選，就計算輸入欄位的響應式長度。
            if @data().get().multiple
                # 以欄位內的文字作為基礎來更改搜尋欄位的長度，也就是響應式長度。
                $input.css 'width', calculateWidth()

            # 重新渲染文字。
            @renderText()
            return

        # 如果監聽種類是 `keydown` 的話（這才能捕捉 `backspace` 按鍵）。
        if event.type is 'keydown'
            # 展開下拉式選單，避免被奇異現象給隱藏了。
            @expand()

        # 依照按鍵代號執行不同的事情。
        switch event.keyCode
            # Enter 按鍵。
            when @key.ENTER
                # 如果文字只有空白就禁止 Enter 動作。
                if value.trim() is ''
                    return

                # 如果這個值早已被選擇就離開。
                if @data().get().selected.includes value
                    return

                # 建立使用者輸入的值。
                @addOption value, value

                # 建立一個新的標籤並選取。
                @addLabel value

                # 重設輸入欄位的值、寬度，並且重新聚焦在該欄位上。
                $input.val('').get().focus()

                # 如果是多選選單就重設響應式輸入欄位的寬度。
                if @data().get().multiple
                    $input.css 'width', '1em'

                # 重設過濾器。
                @filter ''

                # 如果沒有其他可選的選項，就關閉下拉式選單。
                if not @getSelectable()
                    @contract()

            # Backspace 按鍵。
            when @key.BACKSPACE
                # 如果輸入欄位的游標在第一個，而且使用者又按下 Backspace 的話。
                if $input.get().selectionStart is 0

                    # removeOption()

                    # 就移除最後一個新增的標籤。
                    @removeLabel()


    # Dropdown Listener
    #
    # 下拉式選單的點擊事件處理函式。

    dropdownListener: (event) =>
        # 以選擇器選擇點擊目標，這不一定是下拉式選單本身。
        $target       = $selector event.target
        # 取得項目本身。
        $item         = $target.closest @selector.ITEM
        # 是否點擊一個標籤移除按鈕。
        isCloseButton = $target.closest(@selector.DEFAULT_BUTTON).length isnt 0
        # 是否點擊一個額外追加選項的項目。
        isAddition    = $target.closest(@selector.ADDITION_ITEM).length isnt 0
        # 點擊的目標是不是在下拉式選單內且並不是一個項目也不是一個標籤。
        isDropdown    = $target.closest(@selector.DROPDOWN).length isnt 0 and
                        $item.length                               is   0 and
                        $target.closest(@selector.LABELS).length   is   0 and
                        not isAddition
        # 是否為多選選單。
        isMultiple    = @data().get().multiple
        # 點擊的目標是不是輸入欄位。
        isInput       = $target.closest(@selector.SEARCH).length isnt 0
        # 點擊的目標是不是一個項目。
        isItem        = $item.length isnt 0
        # 是否正在展開。
        isVisible     = @$this.hasClass @className.VISIBLE
        # 是否可供搜尋。
        isSearchable  = @data().get().searchable

        # 依照不同的點擊目標處理不同的事。
        switch
            # 如果是標籤的移除按鈕。
            when isCloseButton
                return

            # 如果是下拉式選單本身。
            when isDropdown
                # 關閉所有正在開啟的下拉式選單。
                if not isInput
                    ts(@selector.VISIBLE_DROPDOWN).dropdown 'hide'

                # 如果點擊的下拉式選單不是展開的話。
                if not isVisible
                    # 展開下拉式選單。
                    @expand()

                # 如果下拉式選單不是多選的話。
                if not isMultiple
                    # 將選單捲動到選擇的那一個選項。
                    @scrollToSelected()

                    # 移除先前過濾的所有值。
                    @filter()

                # 如果這個下拉式選單可供搜尋的話。
                if isSearchable
                    # 當點擊下拉式選單本體就自動聚焦在輸入欄位上。
                    @$this.find(@selector.SEARCH).get()?.focus()

                    #
                    if @$this.find(@selector.ACTIVE_ITEM_UNFILTERED).length is 0

                        value = @$this.find(@selector.ITEM_NOT_FILTERED).eq(0).attr 'data-value'

                        #
                        #if isMultiple
                        #    @addLabel value

                        # 選擇選單中的第一個可用項目。
                        @selectOption value

                        # 重新渲染文字。
                        @renderText()


                    # 如果是第一次在行動裝置上點擊，就展開列表。
                    # 當展開列表時又被點擊一次才聚焦在輸入欄位上，避免一展開選單，就會呼叫輸入鍵盤阻擋螢幕位置。

            # 如果點擊的是項目。
            when isItem
                # 如果點擊的是追加項目的選項，那就離開。
                if isAddition
                    return

                # 如果是多選選單就新增標籤。
                @addLabel $item.attr 'data-value'

                # 更改下拉式選單所選擇的值到點擊的新值。
                @selectOption $item.attr 'data-value'

                # 移除先前過濾的所有值。
                @filter()

                # 如果選單不是多選的話。
                if not isMultiple
                    # 點擊項目後就關閉下拉式選單。
                    @contract()

                # 如果是多選選單。
                if isMultiple
                    # 如果可供搜尋的話。
                    if isSearchable
                        # 自動聚焦輸入欄位。
                        @$this.find(@selector.SEARCH).get().focus()
                        #
                        # 行動裝置需要避免此動作，防止鍵盤不斷跳出來。

                    # 取得搜尋欄位的值。
                    value = @$this.find(@selector.SEARCH).val()

                    # 如果沒有可供選取的選項或者搜尋欄位有字使用者卻點擊選項時。
                    if not @getSelectable() or (value isnt '' and value?)
                        # 關閉下拉式選單。
                        @contract()

                # 清除搜尋輸入欄位的值。
                @$this.find(@selector.SEARCH).val ''

                # 重新渲染文字。
                @renderText()




    ###
    View
    ###

    # Initialize
    #
    # 初始化一個選單應有的容器與元素，但不包括資料元素。

    initialize: =>
        {multiple, searchable, selected, placeholder, values} = @data().get()

        # 初始化一個樣式字串。
        classes = ''

        # 取得原始的選項。
        select = """
        <select class="#{'search' if searchable}" #{'multiple' if multiple}>
            #{@$this.html()}
        </select>
        """

        # 如果這個選單是多選的，那麼就初始化標籤容器。
        if multiple
            classes += ' multiple'

            labels = """
            <div class="labels"></div>
            """

        # 如果這個選單可供搜尋，那麼就初始化搜尋欄位。
        if searchable
            classes += ' search'

            input = """
            <input type="text" class="search">
            """

        # 如果這個選單有已選的值，那麼就呈現它。
        if selected[0]? and not multiple
            text = """
            <div class="text">#{values[selected[0]].text}</div>
            """

        # 或者有預置文字，就使用預置文字。
        else if placeholder?
            text = """
            <div class="placeholder text">#{placeholder}</div>
            """

        # 建立元素。
        $dropdown = $selector @createElement """
        <div class="ts #{classes} selection dropdown">
            #{select}
            #{labels or ''}
            #{input  or ''}
            #{text   or '<div class="text"></div>'}
            <div class="menu">
                <div class="message">沒有相關資料。</div>
            </div>
        </div>
        """

        # 備份這個元素的資料。
        data = @$this.get().$data

        # 將自己替換成 Tocas 下拉式選單。
        @$this.replaceWith $dropdown

        # 更換自己的資料。
        @$this = $dropdown
        @$this.get().$data = data


    # Render Text
    #
    # 基於現況，處理下拉式選單的文字。

    renderText: =>
        {selected, values, placeholder, multiple} = @data().get()

        # 尋找目前值文字，並且重設。
        $text = @$this.find(@selector.TEXT).removeClass("#{@className.PLACEHOLDER} #{@className.FILTERED}").html ''

        # 取得搜尋輸入欄位的值。
        value = @$this.find(@selector.SEARCH).val()?.trim() or ''

        # 如果搜尋輸入欄位的值是空的，就顯示原本選取的值。
        if value is ''

            # 如果是多選選單，而且標籤也不是空的話就隱藏文字。
            if multiple and @$this.find(@selector.LABEL).length isnt 0
                $text.addClass @className.FILTERED

            # 如果有選取的值。
            else if selected[0]?
                # 取得這個值的文字並且套用到選單上。
                $text.html values[selected[0]].text

            # 如果有預置文字的話。
            else if placeholder?
                $text.addClass(@className.PLACEHOLDER).html placeholder

        # 如果不是空的則隱藏選取值的文字。
        else
            $text.addClass @className.FILTERED


    # Render
    #
    # 依照同步的資料重新渲染選單的元素。

    render: =>
        {selected, values, placeholder, multiple} = @data().get()

        # 先假設所有的值都被選取了，等一下逐一過濾。
        allSelected = true

        # 清空所有標籤。
        @$this.find('.labels').html ''

        # 遍歷值選項陣列。
        for value, option of values
            # 如果這是預置元素則跳到下一個。
            if value is ''
                continue

            # 建立新選項並推入選單中。
            @addOption value, option.text

            # 取得這個選項在選單內的元素。
            $item = @$this.find ".menu .item[data-value='#{value}']"

            # 如果選項是沒有被選取。
            if not option.selected
                # 表明並不是所有的值都被選取了
                allSelected = false

                # 直接繼續下一輪。
                continue

            # 如果這個下拉式選單是可供多選且這個值被選取的話。
            if multiple
                # 替這個選項建立標籤到下拉式選單中。
                @addLabel value

            # 選擇該項目。
            @selectOption value

        # 渲染值文字。
        @renderText()

        # 如果全部的標籤都被選取，而且這個下拉式選單支援多選的話。
        # 就顯示找不到資料的訊息。
        @noResults allSelected and multiple


    # Sync
    #
    # 解析 `select` 元素目前的資料並單向同步到此選單元素。

    sync: =>
        # 找尋 `select` 元素當同步來源。
        $select = @$this.find @selector.SELECT

        # 如果下拉式選單內沒有 `select` 元素，這可能是第一次同步，這個時候自己就是 `select`。
        if $select.length is 0
            $select = @$this

        # 是否可供多選。
        multiple    = $select.attr('multiple')?
        # 是否可供輸入搜尋。
        searchable  = $select.hasClass 'search'
        # 現有且可供使用的值。
        values      = {}
        # 已選取的值。
        selected    = []
        # 預置文字內容。
        placeholder = null

        # 取得每一個選項，推入選項陣列中。
        $select.find(@selector.OPTION).each (element) =>
            # 已選擇器選取此選項。
            $element = $selector element
            # 取得此選項的值。
            value    = $element.val()
            # 取得此選項的 HTML 內容或者純文字。
            text     = $element.attr('data-text') or $element.text()
            # 這個選項是否已選擇。
            isSelected = $element.attr('selected')?
            # 這個選項是否已停用。
            isDisabled = $element.attr('disabled')?

            # 將這個選項存入總值物件中。
            values[value] =
                text    : text
                selected: isSelected
                disabled: isDisabled

            # 如果這個選項有被選擇的話，則保存這個值為預設選擇值。
            if isSelected
                selected.push value

            # 如果這個的值是空的話，則作為預置文字。
            if value is ''
                placeholder = text

        # 儲存到 Tocas 下拉式選單中，這樣就能確保選單與 `select` 元素的內容相符。
        @data().save {
            multiple
            searchable
            values
            selected
            placeholder
        }


    # Scroll To Selected
    #
    # 將選單捲動到選擇的選項。

    scrollToSelected: =>
        @$this.find(@selector.MENU).get().scrollTop = @$this.find(@selector.SELECTED_ITEM).get()?.offsetTop


    # No Results
    #
    # 切換「找不到資料」訊息的可見度。

    noResults: (show) =>
        if show
            #
            @event 'onNoResults', @$this.get()

            @$this.find(@selector.MESSAGE).addClass @className.ACTIVE
        else
            @$this.find(@selector.MESSAGE).removeClass @className.ACTIVE


    # Addition
    #
    # 依照輸入的值與目前設定判斷是否有必要提示使用者是否要新增自定值。

    addition: (value=null) =>
        # 尋找是否有現成的自訂值訊息。
        $addition = @$this.find @selector.ADDITION_ITEM

        # 如果沒有值，或者這個值早就存在就移除自訂值訊息。
        if value is null or value.trim() is '' or @getOption(value) isnt undefined
            $addition.remove()
            return

        # 移除找不到資料提示。
        @noResults false

        # 如果沒有現成的自訂值訊息。
        if $addition.length is 0
            # 就建立一個，並且推入選單中作為選項。
            @$this.find(@selector.MENU).prepend """
            <div class="#{@className.ADDITION_ITEM}">
                建立 <strong>#{value}</strong> 選項
            </div>
            """
        else
            # 否則就替換訊息內容。
            $addition.html """
            建立 <strong>#{value}</strong> 選項
            """

        # 尋找新的自訂值訊息。
        $addition = @$this.find @selector.ADDITION_ITEM

        # 監聽自訂值訊息的點擊事件。
        $addition
            .off 'click'
            .on  'click', =>
                # 建立使用者輸入的值。
                @addOption value, value

                # 如果選單是多選選單。
                if @data().get().multiple
                    # 點擊自訂值訊息的時候就追加一個新的標籤。
                    @addLabel value

                    # 如果這個選單可供搜尋。
                    if @data().get().searchable
                        # 新增自訂值後就自動重新聚焦搜尋輸入欄位。
                        @$this.find(@selector.SEARCH).get().focus()

                # 選擇這個新的值。
                @selectOption value

                # 移除先前過濾的所有值。
                @filter()

                # 清除搜尋輸入欄位的值。
                @$this.find(@selector.SEARCH).val ''

                # 重新渲染文字。
                @renderText()

                # 移除自訂值訊息元素。
                $addition.remove()

                # 稍後一下。
                await @delay @duration / 2

                # 收起選單。
                @contract()


    # Filter
    #
    # 以指定的值過濾並隱藏不相符的選項。

    filter: (value=null) =>
        # 取得所有項目。
        $items      = @$this.find @selector.ITEM
        $unselected = @$this.find @selector.UNSELECTED_ITEM

        # 先取消過濾所有項目。
        $items.removeClass @className.FILTERED

        # 檢查是否有可選項目，沒有則顯示無資料訊息。
        @noResults not @getSelectable()

        # 如果值是空的就到此為止。
        if value is null or value is ''
            return

        # 是否允許全文搜尋。
        fullTextSearch = @$this.data 'fullTextSearch'

        # 取得不相關的選項。
        items = $items.toArray().filter (item) =>
            # 如果這個選項已經被選取了，那麼也納入不相關。
            if @data().get().selected.includes item.getAttribute 'data-value'
                return true

            # 如果允許全文搜尋。
            if fullTextSearch
                # 檢查選項裡的文字是不是有包含搜尋的值。
                not item.innerText.trim().toLowerCase().includes value.toLowerCase()
            else
                # 檢查選項裡的文字開頭是不是跟搜尋的值類似。
                not item.innerText.trim().toLowerCase().startsWith value.toLowerCase()

        # 用選擇器選擇所有該過濾的選項元素。
        $filtered = $selector items

        # 如果要過濾的選項數量跟原先的項目數量ㄧ樣，那麼就顯示無資料訊息。
        @noResults $filtered.length is $items.length

        # 過濾該過濾的項目元素。
        $filtered.addClass @className.FILTERED


    # Expand
    #
    # 展開下拉式選單。

    expand: =>
        if @$this.hasClass @className.VISIBLE
            return

        #
        @event 'onShow', @$this.get()

        # 設置選單的展開方向。
        @setDirection()

        @$this
            .css         'z-index', @zIndex.ACTIVE
            .removeClass @className.HIDDEN
            .addClass    "#{@className.VISIBLE} #{@className.ANIMATING}"
            .one         'animationend', =>
                if @$this.hasClass @className.VISIBLE
                    @$this.removeClass @className.ANIMATING


    # Contract
    #
    # 收合下拉式選單。

    contract: =>
        # 如果這個選單不可見的話就沒必要關閉。
        if not @$this.hasClass @className.VISIBLE
            return

        #
        @event 'onHide', @$this.get()

        @$this
            .css         'z-index', @zIndex.MENU
            .removeClass @className.VISIBLE
            .addClass    "#{@className.HIDDEN} #{@className.ANIMATING}"
            .one         'animationend', =>
                if @$this.hasClass @className.HIDDEN
                    @$this
                        .removeClass "#{@className.ANIMATING} #{@className.UPWARD} #{@className.DOWNWARD} #{@className.LEFTWARD} #{@className.RIGHTWARD}"


    # Set Direction
    #
    # 取得下拉式選單的元素象限並加上方向位置。

    setDirection: =>
        position   = @$this.get().getBoundingClientRect()
        width      = window.innerWidth
        widthHalf  = width / 2
        height     = window.innerHeight
        heightHalf = height / 2

        if position.left < widthHalf and position.top < heightHalf
            @$this.addClass "#{@className.DOWNWARD} #{@className.RIGHTWARD}"
        else if position.left < widthHalf and position.top > heightHalf
            @$this.addClass "#{@className.UPWARD} #{@className.RIGHTWARD}"
        else if position.left > widthHalf and position.top > heightHalf
            @$this.addClass "#{@className.UPWARD} #{@className.LEFTWARD}"
        else if position.left > widthHalf and position.top < heightHalf
            @$this.addClass "#{@className.DOWNWARD} #{@className.LEFTWARD}"




    ###
    Update
    ###

    # Data
    #
    # 取得下拉式選單的資料，這個資料是從 `<select>` 所取得並整理的。

    data: =>
        return
            # 保存新的資料。
            save: (newData) =>
                @selectData = newData

            # 取得目前保存的資料。
            get: =>
                if @selectData is undefined then {} else @selectData


    # Add Options
    #
    # 新增選項。

    addOption: (value, text) =>
        # 取得 HTML 文字。
        htmlText = text
        # 取得一般文字。
        text     = $selector('<div>').html(text).text()

        # 將元素推入至 `select` 元素中如果沒有相同值的元素。
        if @$this.find(@selector.SPECIFIED_OPTION(value)).length is 0
            @$this.find(@selector.SELECT).append """
            <option value="#{value}" data-text="#{htmlText}">#{text}</option>
            """

        # 建立新選項並推入選單中如果沒有相同值的元素。
        if @$this.find(@selector.SPECIFIED_ITEM(value)).length is 0
            @$this.find(@selector.MENU).append """
            <div class="item" data-value="#{value}">
                #{htmlText}
            </div>
            """

        # 將目前資料從 `select` 中同步。
        @sync()


    # Remove Option
    #
    # 移除指定選項。

    removeOption: (value) =>
        @$this.find(@selector.SPECIFIED_OPTION(value)).remove()
        @$this.find(@selector.SPECIFIED_ITEM(value)).remove()

        # 將目前資料從 `select` 中同步。
        @sync()


    # Unselect Option
    #
    # 取消選取某個指定選項。

    unselectOption: (value=null) =>
        # 如果值是空的。
        if value is null
            # 清空所有已選擇的選項。
            @$this.find(@selector.OPTION).removeAttr 'selected'
            @$this.find(@selector.ITEM).removeClass  "#{@className.SELECTED} #{@className.ACTIVE}"

            # 如果是多選選單就移除所有已過濾的選項。
            if @data().multiple
                @$this.find(@selector.ITEM).removeClass @className.FILTERED

            # 從目前的選擇陣列中移除。
            data          = @data().get()
            data.selected = []
            @data().save data

        # 若不是空的。
        else
            # 在 `select` 中尋找相對應的選項元素，然後取消選取。
            @$this.find(@selector.SPECIFIED_OPTION(value)).removeAttr 'selected'

            # 顯示選單裡相對應的選項，因為原本被藏起來了。
            @$this.find(@selector.SPECIFIED_ITEM(value)).removeClass "#{@className.SELECTED} #{@className.ACTIVE} #{@className.FILTERED}"

            # 從目前的選擇陣列中移除。
            data          = @data().get()
            data.selected = data.selected.filter (element) => element isnt value
            @data().save data

        # 依照情況看是否要顯示無資料訊息。
        @noResults not @getSelectable()


    #
    #
    #

    preselectOption: (value) =>
        # 選取選單中的選項。
        $item.addClass "#{@className.SELECTED} #{@className.ACTIVE}"


    # Select Option
    #
    # 選擇某個指定的選項。

    selectOption: (value) =>
        # 如果沒有該元素則離開。
        if @getOption(value) is undefined
            return

        # 取得資料。
        data = @data().get()

        # 如果是多選選單，但沒有該元素的標籤也離開。
        if data.multiple and @$this.find(@selector.SPECIFIED_LABEL(value)).length is 0
            return

        # 移除自訂值訊息。
        @addition()

        # 在 `select` 中尋找相對應的選項元素。
        $option = @$this.find @selector.SPECIFIED_OPTION value
        # 在選單中尋找相對應的元素。
        $item   = @$this.find @selector.SPECIFIED_ITEM value

        # 如果該元素已被選取則停止繼續。
        if $option.attr 'selected'
            return

        # 如果是單選選單就移除其他已選取的選項。
        if not data.multiple
            @unselectOption()

        # 選取 `select` 中的選項。
        $option.attr 'selected', 'selected'

        # 選取選單中的選項。
        $item.addClass "#{@className.SELECTED} #{@className.ACTIVE}"

        # 如果是多選選單。
        if data.multiple
            # 隱藏選單裡相對應的選項。
            $item.addClass @className.FILTERED

        # 如果已經有選取這個選項了就離開。
        if data.selected.indexOf(value) isnt -1
            return

        # 將這個新的選取值推入選單資料中。
        data.selected.push value
        @data().save data

        @noResults not @getSelectable()


    # Get Selectable
    #
    # 取得現在是否有項目可供選擇的布林值。

    getSelectable: =>
        @$this.find(@selector.SELECTABLE_OPTION).length isnt 0


    # Add Label
    #
    # 在標籤容器中產生一個新的標籤元素。

    addLabel: (value) =>
        # 從傳入的值取得相對應的選項。
        option = @getOption value

        # 如果該選項不存在，就不要建立該選項的標籤。
        if option is undefined
            return

        # 移除文字和值開頭與結尾的多餘空白。
        text  = option.text.trim()
        value = value.trim()

        # 如果文字是空白的，那麼就沒必要加入。
        if text is ''
            return

        # 以模板初始化一個標籤元素。
        label = @createElement """
        <a class="#{@className.DEFAULT_LABEL}" data-value="#{value}">
            #{text}
            <button class="#{@className.DEFAULT_BUTTON}"></button>
        </a>
        """

        # 監聽這個標籤裡的關閉按鈕事件。
        $selector(label).find(@selector.DEFAULT_BUTTON).on 'click', =>
            # 移除自己的值並取消選取。
            @removeLabel value

            # 重新渲染文字。
            @renderText()

            # 如果這個選單可供搜尋。
            if @data().get().searchable
                # 那麼就在移除標籤後重新聚焦搜尋輸入欄位。
                @$this.find(@selector.SEARCH).get().focus()

                # 避免行動裝置自動 focus
                #
                #

                # 重新依照搜尋輸入欄位的值過濾，避免移除的值突然出現在選單中。
                @filter @$this.find(@selector.SEARCH).val()

                # 重新檢查自訂值訊息是否該出現。
                @addition @$this.find(@selector.SEARCH).val()

        # 將這個新標籤推入至標籤容器中。
        @$this.find(@selector.SELF_LABELS).append label

        # 選取這個值。
        @selectOption value


    # Remove Label
    #
    # 在標籤容器中移除一個指定的標籤元素。

    removeLabel: (value) =>
        # 取得這個值相對應的標籤。
        $label = @$this.find @selector.SPECIFIED_LABEL value

        # 如果無法取得標籤。
        if $label.length is 0
            # 就以最後新增的標籤為主。
            $label = @$this.find(@selector.LABEL).last()

            # 值則從最後新增的標籤取得。
            value = $label.attr 'data-value'

        if value is undefined
            return

        # 移除這個標籤。
        $label.remove()

        # 取消選取這個值。
        @unselectOption value


    # Get Option
    #
    # 從傳入的值取得指定的選項。

    getOption: (value) =>
        return @data().get().values[value]

    #
    #
    #

    basicDropdownListener: (event) =>
        # 以選擇器選擇點擊目標，這不一定是下拉式選單本身。
        $target       = $selector event.target
        # 取得項目本身。
        $item         = $target.closest '.item:not(.dropdown)'
        # 點擊的目標是不是在下拉式選單內且並不是一個項目也不是一個標籤。
        isDropdown    = $target.closest(@selector.DROPDOWN).length isnt 0 and
                        $item.length                               is   0
        # 點擊的目標是不是一個項目。
        isItem        = $item.length isnt 0
        # 是否正在展開。
        isVisible     = @$this.hasClass @className.VISIBLE

        #
        switch
            # 如果是下拉式選單本身。
            when isDropdown
                # 如果點擊的下拉式選單不是展開的話。
                if not isVisible
                    # 展開下拉式選單。
                    @expand()
                else
                    @contract()

            # 如果點擊的是項目。
            when isItem

                # 點擊項目後就關閉下拉式選單。
                @contract()

    #
    #
    #

    bindBasic: =>
        $selector document
            # 頁面點擊關閉下拉式選單的監聽事件。
            .off 'click.dropdown'
            .on  'click.dropdown', (event) =>
                @documentListener $selector event.target

        # 下拉式選單點擊的切換事件。
        @$this
            .on 'click', @basicDropdownListener


    #
    #
    #

    event: (name, self, arg, arg2) =>
        @$this.data(name).call self, arg, arg2


    # 元素初始化函式。
    init: =>
        if @$this.is 'select'
            @sync()
            @initialize()
            @render()
            @bind()
        else
            @bindBasic()

        ts.fn

    # 元素摧毀函式。
    destroy: =>

    # 模組可用的方法。
    methods: =>

        # Change Values
        #
        # 更改可選下拉式選單中的所有值為新值。
        'change values': (values) =>
            ts.fn

        # Toggle
        #
        # 切換下拉式選單的可見度，若原本顯示則閉合，相反之。
        toggle: =>
            ts.fn

        # Show
        #
        # 展開一個下拉式選單。
        show: =>
            @expand()
            ts.fn

        # Hide
        #
        # 收合一個下拉式選單。
        hide: =>
            @contract()
            ts.fn

        # Clear
        #
        #
        clear: =>
            ts.fn

        # Hide Others
        #
        #
        'hide others': =>
            ts.fn

        # Restore Defaults
        #
        #
        'restore defaults': =>
            ts.fn

        # Restore Placeholder Text
        #
        #
        'restore placeholder text': =>
            ts.fn

        # Restore Default Value
        #
        #
        'restore default value': =>
            ts.fn

        # Save Defaults
        #
        #
        'save defaults': =>
            ts.fn

        # Set Selected
        #
        #
        'set selected': =>
            ts.fn

        # Removed Selected
        #
        #
        'remove selected': =>
            ts.fn

        # Set Exactly
        #
        #
        'set exactly': =>
            ts.fn

        # Set Text
        #
        # 設置可選下拉式選單的文字。
        'set text': =>
            ts.fn

        # Set Value
        #
        # 設置可選下拉式選單的值。
        'set value': =>
            ts.fn

        # Get Text
        #
        # 取得目前可選下拉式選單所顯示的文字。
        'get text': =>

        # Get Value
        #
        # 取得目前可選下拉式選單所選擇的值。
        'get value': =>

        # Get Item
        #
        # 取得目前可選下拉式選單所選擇的項目元素。
        'get item': =>

        # Set Active
        #
        #
        'set active': =>
            ts.fn

        # Set Visible
        #
        #
        'set visible': =>
            ts.fn

        # Remove Active
        #
        #
        'remove active': =>
            ts.fn

        # Remove Visible
        #
        #
        'remove visible': =>
            ts.fn

        # Is Selection
        #
        #
        'is selection': =>

        # Is Animated
        #
        #
        'is animated': =>

        # Is Visible
        #
        # 回傳一個此下拉式選單是否正處於展開狀態的布林值。
        'is visible': =>

        # Is Hidden
        #
        # 回傳一個此下拉式選單是否正處於收合隱藏狀態的布林值。
        'is hidden': =>

        # Get Default Text
        #
        # 取得預設的文字。
        'get default text': =>

        # Get Placeholder Text
        #
        #
        'get placeholder text': =>

        # Refresh
        #
        # 更新下拉式選單的視圖。
        refresh: =>

ts Dropdown