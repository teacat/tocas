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
        # {
        #     image: ''
        #     icon: ''
        #    emphasis: ''
        #    class: ''
        # }
        #
        #
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
        # 開啟選單的事件名稱，可以是 `click`、`hover`。
        #on           : 'click'
        #
        labelClass   : (text, value) => null
        # 是否允許重新選取，當設為 `true` 時，就算使用者選取了正在選取的值，仍會呼叫 `onChange`。
        allowReselection: false
        # 是否允許使用者擅自新增選單值。
        allowAdditions  : false
        # 當使用者新增了值並移除後，是否要在選單中隱藏這個值。
        hideAdditions   : true
        #
        #action          : 'auto'
        # 搜尋的底限字數，超過此字數才會開始搜尋。
        minCharacters   : 1
        # 搜尋時的依據，可用：`both` 符合文字或值、`value` 符合值、`text` 符合文字。
        match           : 'both'
        # 是否要進行全文搜尋，若為 `true` 只要搜尋的值符合選項文字其中即可；`false` 則會強迫搜尋的值必須和選項文字開頭相符。
        fullTextSearch  : false
        #
        sortSelect : false
        #
        selectOnKeydown : true
        #
        #forceSelection  : true
        # 是否要使用標籤而非純計數文字。
        useLabels: true
        #
        #allowCategorySelection: false
        #
        #placeholder           : 'auto'
        # 多選選單是否使用標籤？若設置為 `false` 會以「已選擇 x 個」純文字替代標籤。
        useLabels: true
        # 多選選單最多可以選擇幾個項目？設置為 `0` 表示無限。
        maxSelections: 0
        #
        storedData:
            default    : ''
            placeholder: ''
            values     : []
        #
        storedDefaultData:
            default    : ''
            placeholder: ''
            values     : []


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

    # 選擇器名稱。
    selector:
        DROPDOWN          : '.ts.dropdown'
        VISIBLE_DROPDOWN  : '.ts.visible.dropdown'
        MENU              : '.ts.menu'
        NOT_BASIC_DROPDOWN: '.ts.dropdown:not(.basic)'
        DEFAULT_BUTTON    : '.ts.tiny.close.button'
        LABEL             : ':scope > .labels > .ts.label'
        LABELS            : ':scope > .labels'
        SEARCH            : 'input.search'
        #.ts.dropdown:not(.basic).visible

    # 下拉式選單所會用到的 z 軸索引。
    zIndex:
        MENU   : 9
        ACTIVE : 10
        HOVERED: 11

    # 下拉式選單的動畫時間。
    duration: 300

    # Quadrant
    #
    # 取得下拉式選單的元素象限並給予應該朝哪個方向展開。
    quadrant: =>
        position   = @$this.get().getBoundingClientRect()
        width      = window.innerWidth
        widthHalf  = width / 2
        height     = window.innerHeight
        heightHalf = height / 2

        if position.left < widthHalf and position.top < heightHalf
            'top left'
        else if position.left < widthHalf and position.top > heightHalf
            'bottom left'
        else if position.left > widthHalf and position.top > heightHalf
            'bottom right'
        else if position.left > widthHalf and position.top < heightHalf
            'top right'

    #
    #
    #
    selection: =>

    #
    #
    #
    searchSelection: =>

    #
    #
    #
    multipleSelection: =>

    #
    #
    #
    multipleSearchSelection: =>

    # Set Quadrant
    #
    # 取得選單的象限，並以此為據向某方向展開。
    setQuadrant: =>
        # 如果使用者沒有手動設置選單應該向何處展開的話。
        if not @$this.hasClass(@className.DOWNWARD)  and
           not @$this.hasClass(@className.UPWARD)    and
           not @$this.hasClass(@className.RIGHTWARD) and
           not @$this.hasClass(@className.LEFTWARD)
            # 就取得選單的象限，然後依此決定要往哪個方向展開。
            switch @quadrant()
                when 'top left'
                    @$this.addClass "#{@className.DOWNWARD} #{@className.RIGHTWARD}"
                when 'top right'
                    @$this.addClass "#{@className.DOWNWARD} #{@className.LEFTWARD}"
                when 'bottom left'
                    @$this.addClass "#{@className.UPWARD} #{@className.RIGHTWARD}"
                when 'bottom right'
                    @$this.addClass "#{@className.UPWARD} #{@className.LEFTWARD}"

    # Expand
    #
    # 展開目前的下拉式選單。
    expand: =>
        # 設置選單的展開方向。
        @setQuadrant()

        @$this
            .css         'z-index', @zIndex.ACTIVE
            .removeClass @className.HIDDEN
            .addClass    "#{@className.VISIBLE} #{@className.ANIMATING}"
            .one         'animationend', =>
                @$this.removeClass @className.ANIMATING
            .emulate 'animtionend', @duration

    # Contract
    #
    # 閉合目前的下拉式選單。
    contract: =>
        if not @$this.hasClass @className.VISIBLE
            return

        @$this
            .css         'z-index', @zIndex.MENU
            .removeClass @className.VISIBLE
            .addClass    "#{@className.HIDDEN} #{@className.ANIMATING}"
            .one         'animationend', =>
                @$this
                    .removeClass "#{@className.ANIMATING} #{@className.UPWARD} #{@className.DOWNWARD} #{@className.LEFTWARD} #{@className.RIGHTWARD}"
            .emulate 'animtionend', @duration

    # Convertor
    #
    # 從現有的 `<select>` 元素中取得相關資料並且轉換成可供 Tocas Dropdown 模組解析的物件。
    convertor: ($select) =>
        # 如果這個選單不是一個 `select` 元素就離開。
        if not $select.is 'select'
            return false

        # 是否可供多選。
        multiple    = $select.attr('multiple')?
        # 是否可供輸入搜尋。
        searchable  = $select.hasClass 'search'
        # 現有且可供使用的值。
        values      = {}
        # 已選取的值。
        selected    = null
        # 預置文字內容。
        placeholder = null

        # 取得每一個選項，推入選項陣列中。
        $select.find('option').each (element) =>
            # 已選擇器選取此選項。
            $element = $selector(element)
            # 取得此選項的值。
            value = $element.val()
            # 取得此選項的 HTML 內容或者純文字。
            text = $element.attr('data-text') or $element.text()
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
                selected = value

            # 如果這個的值是空的話，則作為預置文字。
            if value is ''
                placeholder = text

        # 集合本次的所有資料。
        selectData = {
            multiple
            searchable
            $select
            values
            selected
            placeholder
        }

        # 儲存到 Tocas 下拉式選單中，這樣就能確保選單與 `select` 元素的內容相符。
        @data().save selectData

        # 回傳這個新的同步資料。
        return selectData

    # Generator
    #
    # 依照下拉式選單的樣式，產生相對應的模板 HTML 原始碼。
    generator: (data) =>
        #
        items = ''
        #
        hiddenField = ''
        #
        labelContainer = ''
        #
        searchInput = ''
        #
        placeholder = ''
        #
        selectedText = ''
        #
        classes = 'selection'

        # 如果這個選單有選項的話。
        if data.values?
            # 遍歷並根據每個選項來產生一個項目的 HTML。
            for value, option of data.values
                # 單個下拉式選單項目。
                items += """
                <div class="item" data-value="#{value}">
                    #{option.text}
                </div>
                """

        # 如果這個下拉式選單可供搜尋的話。
        if data.searchable
            # 加上搜尋樣式。
            classes += ' search'

            # 建立供使用者輸入的搜尋輸入欄位。
            searchInput = """
            <input type="text" class="search">
            """

        # 初始化一個空的文字容器。
        text = """
        <div class="text"></div>
        """

        # 如果有選擇的值。
        if data.selected?
            # 就將文字容器改為已選擇值的文字。
            text = """
            <div class="text">#{data.values[data.selected].text}</div>
            """

        # 不然如果有預置文字但沒有已選值的話。
        else if data.placeholder?
            # 在沒有值的情況下所使用的預置文字。
            text = """
            <div class="placeholder text">#{data.placeholder}</div>
            """

        # 如果這個下拉式選單是可供多選的話。
        if data.multiple
            # 就加入多選樣式。
            classes += ' multiple'

            # 建立用以擺置標籤的主容器。
            labelContainer = """
            <div class="labels"></div>
            """

        # 初始化一個無資料的訊息提示元素。
        message = """
        <div class="message">No results found.</div>
        """

        # 總結並組合以上所有元素成為單一個 Tocas 下拉式選單。
        selection = """
        <div class="ts #{classes} dropdown">
            #{hiddenField}
            #{labelContainer}
            #{searchInput}
            #{text}
            <div class="menu">
                #{items}
                #{message}
            </div>
        </div>
        """

        # 將這個結合的 HTML 建立成一個元素。
        selection = @createElement selection

        # 複製原先的 `select` 元素，並且移除其樣式，然後移至新的元素內。
        data.$select?.clone().removeAttr('class').prependTo(selection)

        # 用選擇器選取這個新的元素。
        $selection = $selector selection

        # 如果這個新選單允許搜尋的話，就監聽搜尋欄位的輸入事件。
        if data.searchable
            $selection.find('input.search').on 'keydown input', @searchListener

        # 回傳選擇器。
        return $selection

    # Document Listener
    #
    # 頁面監聽器。
    documentListener: (event) =>
        # 取得此次點擊的目標。
        $target          = $selector event.target
        # 點擊目標是不是沒有下拉式選單父容器的布林值。
        noDropdownParent = $target.closest('.ts.dropdown').length is 0

        # 如果點擊的目標不是下拉式選單內的元素，也不是下拉式選單本體。
        if noDropdownParent
            # 那麼就隱藏所有可見的下拉式選單。
            ts(@selector.VISIBLE_DROPDOWN).dropdown 'hide'

    # Add Value
    #
    # 建立新值。
    addValue: (text, value) =>
        # 如果這個值早已存在，那麼就略過。
        if @getOption(value) isnt undefined
            return

        # 取得 HTML 文字。
        htmlText = text
        # 取得一般文字。
        text     = $selector('<div>').html(text).text()

        # 將新的元素推入至 `select` 元素中。
        @$this.find('select').append """
        <option value="#{value}" data-text="#{htmlText}">#{text}</option>
        """

        # 將新項目推入至選單中。
        @$this.find('.menu').append """
        <div class="item" data-value="#{value}">#{htmlText}</div>
        """

        @resync()
        @repaint()

    # Placeholder Listener
    #
    #
    watchText: () =>
        #
        data = @data().get()
        # 取得搜尋輸入欄位的值。
        value = @$this.find('input.search').val()?.trim()

        #
        if value is undefined
            value = ''

        # 如果搜尋輸入欄位的值是空的，就顯示原本選取的值。
        if value is ''
            if data.multiple and @$this.find('.labels .label').length is 0
                @$this.find('.text').removeClass('filtered')

            else if not data.multiple
                @$this.find('.text').removeClass('filtered')

            else
                @$this.find('.text').addClass('filtered')

        # 如果不是空的則隱藏選取值的文字。
        else
            @$this.find('.text').addClass('filtered')

    # Search Listener
    #
    # 搜尋輸入欄位的輸入監聽事件。
    searchListener: (event) =>
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
            #
            @filter(value)

            #
            if @data().get().multiple
                # 以欄位內的文字作為基礎來更改搜尋欄位的長度，也就是響應式長度。
                $input.css 'width', calculateWidth()

            #
            @watchText()

            return

        # 如果沒有接收到按鍵代號的話就離開。
        if not event.keyCode
            return

        # 依照按鍵代號執行不同的事情。
        switch event.keyCode
            # Enter 按鍵。
            when 13
                # 建立使用者輸入的值。
                @addValue value, value

                # 建立一個新的標籤。
                @addLabel value

                # 更改選取的值為這個新建立的值。
                @changeValue value

                # 重設輸入欄位的值、寬度，並且重新聚焦在該欄位上。
                $input.val('').css('width', '1em').get().focus()

            # Backspace 按鍵。
            when 8
                # 如果輸入欄位的游標在第一個，而且使用者又按下 Backspace 的話。
                if $input.get().selectionStart is 0
                    # 就移除最後一個新增的標籤。
                    @removeLabel()

            # 上按鍵。
            when 38
                break

            # 下按鍵。
            when 40
                break

            # 左按鍵。
            when 37
                break

            # 右按鍵。
            when 39
                break

    # Message
    #
    # 控制「找不到資料」訊息元素的可見度。
    message: (action) =>
        switch action
            when 'show'
                @$this.find('.message').addClass('active')
            when 'hide'
                @$this.find('.message').removeClass('active')

    # Filter
    #
    # 依照輸入的值來過濾沒必要的選項元素並將其隱藏。
    filter: (value) =>
        # 取得所有項目。
        $items         = @$this.find '.menu .item'
        # 是否允許全文搜尋。
        fullTextSearch = @$this.data 'fullTextSearch'

        # 移除所有已過濾的值，並且重新過濾一次。
        items = $items.removeClass('filtered').toArray().filter (item) =>
            # 如果允許全文搜尋。
            if fullTextSearch
                # 檢查選項裡的文字是不是有包含搜尋的值。
                not item.innerText.trim().toLowerCase().includes value.toLowerCase()
            else
                # 檢查選項裡的文字開頭是不是跟搜尋的值類似。
                not item.innerText.trim().toLowerCase().startsWith value.toLowerCase()

        # 用選擇器選擇所有該過濾的選項元素。
        $filtered = $selector(items)

        # 如果要過濾的選項數量跟原先的項目數量ㄧ樣。
        if $filtered.length is $items.length
            # 那麼就顯示無資料訊息。
            @message 'show'
        else
            @message 'hide'

        # 過濾該過濾的項目元素。
        $filtered.addClass 'filtered'

    # Scroll To Selected
    #
    # 將選單的捲軸位置捲到選擇的元素。
    scrollToSelected: =>
        offsetTop = @$this.find('.menu .item.selected').get()?.offsetTop
        @$this.find('.menu').get().scrollTop = offsetTop

    # Dropdown Listener
    #
    # 下拉式選單點擊事件監聽函式。
    dropdownListener: (event) =>
        # 以選擇器選擇點擊目標，這不一定是下拉式選單本身。
        $target       = $selector event.target
        # 是否點擊一個標籤移除按鈕。
        isCloseButton = $target.closest('.ts.close.button').length isnt 0
        # 點擊的目標是不是在下拉式選單內且並不是一個項目也不是一個標籤。
        isDropdown    = $target.closest('.dropdown').length isnt 0 and
                        $target.closest('.item').length     is   0 and
                        $target.closest('.labels').length   is   0
        #
        isMultiple    = @$this.hasClass 'multiple'
        # 點擊的目標是不是輸入欄位。
        isInput       = $target.closest('input').length isnt 0
        # 點擊的目標是不是一個項目。
        isItem        = $target.closest('.item').length isnt 0
        #
        isVisible = @$this.hasClass('visible')

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
                if not @$this.hasClass 'multiple'
                    # 將選單捲動到選擇的那一個選項。
                    @scrollToSelected()

                    #
                    @$this.find('.menu .item').removeClass('filtered')

                # 如果這個下拉式選單可供搜尋的話。
                if @$this.hasClass 'search'
                    # 當點擊下拉式選單本體就自動聚焦在輸入欄位上。
                    @$this.find(@selector.SEARCH).get()?.focus()

                    # 如果是第一次在行動裝置上點擊，就展開列表。
                    # 當展開列表時又被點擊一次才聚焦在輸入欄位上，避免一展開選單，就會呼叫輸入鍵盤阻擋螢幕位置。

            # 如果點擊的是項目。
            when isItem
                # 取得點擊的項目本身。
                $item = $target.closest '.item'

                # 更改下拉式選單所選擇的值到點擊的新值。
                @changeValue $item.attr 'data-value'

                # 取得下拉式選單的資料。
                data = @data().get()

                # 如果選單不是多選的話。
                if not data.multiple
                    # 清除搜尋輸入欄位的值。
                    @$this.find('input.search').val('')

                    #
                    @watchText()

                    # 點擊項目後就關閉下拉式選單。
                    @contract()

                # 如果選單是多選，但是已經沒有項目可供選擇的話。
                if data.multiple and @$this.find('select option:not([selected])').length is 1
                    # 關閉下拉式選單。
                    @contract()

    # Event
    #
    # 呼叫指定的事件。
    event: =>

    # Add Label
    #
    # 建立一個新的標籤。
    addLabel: (value) =>
        option = @getOption(value)

        if option is undefined
            return

        # 移除文字和值開頭與結尾的多餘空白。
        text  = option.text.trim()
        value = value.trim()

        # 如果文字是空白的，那麼就沒必要加入。
        if text is ''
            return

        # 呼叫 labelClass 函式來檢查這個標籤有沒有必要新增額外的自訂類別或語義。
        classes = @$this.data('labelClass').call(@$this.get(), text, value) or ''

        # 以模板初始化一個標籤元素。
        label = @createElement """
            <a class="#{@className.DEFAULT_LABEL} #{classes}" data-value="#{value}">
                #{text}
                <button class="#{@className.DEFAULT_BUTTON}"></button>
            </a>
        """

        # 監聽這個標籤裡的關閉按鈕事件。
        $selector(label).find(@selector.DEFAULT_BUTTON).on 'click', =>
            await @delay()
            @removeLabel value

        # 如果回傳的標籤沒有問題，而且是正常的 HTML 元素。
        if label isnt false and label instanceof HTMLElement
            # 那麼就可以插入到標籤容器中了。
            @$this.find(@selector.LABELS).append label

            #
            @watchText()

            # 插入之後隱藏這個值在選單內的項目。
            @$this.find(".menu .item[data-value='#{value}']").addClass('selected active filtered')

    # Remove Label
    #
    # 移除多選下拉式選單中的一個標籤，如果沒有指定則移除最後的一個標籤。
    removeLabel: (value=null) =>
        # 取得這個值相對應的標籤。
        $label = @$this.find(".labels .label[data-value='#{value}']")

        # 如果無法取得標籤。
        if $label.length is 0
            # 就以最後新增的標籤為主。
            $label = @$this.find('.labels .label').last()
            # 值則從最後新增的標籤取得。
            value = $label.attr('data-value')

        # 移除這個標籤。
        $label.remove()

        #
        @unselect value

        #
        @watchText()

        # 重新渲染。
        @resync()
        @repaint()

    # Unselect
    #
    # 取消選取某個選項。
    unselect: (value) =>
        # 在 `select` 中尋找相對應的選項元素，然後取消選取。
        @$this.find("select option[value='#{value}']").removeAttr('selected')

        # 顯示選單裡相對應的選項，因為原本被藏起來了。
        @$this.find(".menu .item[data-value='#{value}']").removeClass('filtered')

    #
    #
    #
    removeOption: (value) =>

    # Change Value
    #
    # 更改一個下拉式選單的選擇值，並與 `<select>` 同步。
    changeValue: (value) =>
        # 取得選單資料。
        data = @data().get()

        # 如果選單不是多選的話。
        if not data.multiple
            # 將所有選項都取消選取。
            @$this.find('select option').removeAttr('selected')

        # 找到相對應的選項，然後選取。
        @$this.find("select option[value='#{value}']").attr('selected', 'selected')

        # 重新渲染。
        @resync()
        @repaint()

    # Resync
    #
    # 將下拉式選單的內容資料與真實的 `<select>` 同步，此為單向同步，從 `<select>` 同步到選單資料。
    resync: =>
        #
        @convertor @$this.find('select')

    # Set Text
    #
    # 設置下拉式選單的文字。
    setText: (type, text) =>
        # 尋找下拉式選單內的文字項目。
        $text = @$this.find '.text'

        # 依照文字種類執行相對應的動作。
        switch type
            # 如果是值文字的話就移除預置樣式。
            when 'text'
                $text.removeClass 'placeholder'

            # 如果是預置文字的話就增加預置樣式。
            when 'placeholder'
                $text.addClass 'placeholder'

        # 設置文字。
        $text.html text

    # Repaint
    #
    # 依據下拉式選單的內容（須先與 `<select>` 同步）資料來重新繪製下拉式選單的真實樣貌。
    repaint: =>
        # 取得現有的選單資料。
        data = @data().get()

        # 基於現有的選取值進行決定。
        switch
            # 如果有選取的值。
            when data.selected?
                # 取得這個值的文字並且套用到選單上。
                @setText 'text', data.values[data.selected].text

                # 在選單裡將這個選取的選項套用選取樣式。
                @$this.find(".menu .item[data-value='#{data.selected}']").addClass 'selected active'

            # 如果有預置文字的話。
            when data.placeholder?
                @setText 'placeholder', data.placeholder

            # 如果沒有選取的值也沒有預置文字。
            else
                @setText 'text', ''

        # 如果沒有值選項的話則離開。
        if not data.values
            return

        # 先假設所有的值都被選取了，等一下逐一過濾。
        allSelected = true

        # 清空所有標籤。
        @$this.find('.labels').html('')

        # 遍歷值選項陣列。
        for value, option of data.values
            # 如果這是預置元素則跳到下一個。
            if value is ''
                continue

            # 如果這個選項沒有被選取。
            if not option.selected
                # 表明並不是所有的值都被選取了
                allSelected = false

                # 移除這個選項在選單中的選取樣式。
                @$this.find(".menu .item[data-value='#{value}']").removeClass 'selected active'

                # 直接繼續下一輪。
                continue

            # 如果這個下拉式選單是可供多選且這個值被選取的話。
            if data.multiple
                # 替這個選項建立標籤到下拉式選單中。
                @addLabel value

        # 如果全部的標籤都被選取，而且這個下拉式選單支援多選的話。
        if allSelected and data.multiple
            # 就顯示找不到資料的訊息。
            @message 'show'
        else
            # 不然就移除訊息。
            @message 'hide'

    # 元素初始化函式。
    init: =>
        # 將 `<select>` 選單轉換成 Tocas 的下拉式選單。
        $dropdown = @generator @convertor @$this

        # 先保存舊的資料。
        data = @$this.get().$data

        # 將 Tocas 的下拉式選單替換掉原本的 `<select>` 選單。
        @$this.replaceWith $dropdown

        # 重新取代下拉式選單元素。
        @$this = $dropdown

        # 還原資料。
        @$this.get().$data = data

        # 重新繪製下拉式選單。
        @repaint()

        # 監聽頁面的點擊事件，當點擊非下拉式選單的元素時就收合所有選單。
        $selector document
            .off 'click.dropdown'
            .on  'click.dropdown', @documentListener

        # 監聽選單的點擊事件。
        @$this.on 'click', @dropdownListener

        ts.fn

    # Data
    #
    # 取得下拉式選單的資料，這個資料是從 `<select>` 所取得並整理的。
    data: =>
        # 回傳一連串可用函式。
        return
            # 保存新的資料。
            save: (newData) =>
                @selectData = newData

            # 取得目前保存的資料。
            get: =>
                if @selectData is undefined then {} else @selectData

    # Get Option
    #
    # 依照傳入的索引取得相對應的選項資料。
    getOption: (value) =>
        return @data().get().values[value]

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

ts Dropdown