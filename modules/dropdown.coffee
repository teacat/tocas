#
#
#
#
#
# Dropdown 收縮時的 Menu 會變成跑到一個 Button 的底下。
# Selection Dropdown 點擊 Item 時好像會又展開一次然後收縮。
#

#
#
# <select class="selectpicker">
#   <optgroup label="Picnic">
#     <option>Mustard</option>
#     <option>Ketchup</option>
#     <option>Relish</option>
#   </optgroup>
#   <optgroup label="Camping">
#     <option>Tent</option>
#     <option>Flashlight</option>
#     <option>Toilet Paper</option>
#   </optgroup>
# </select>
#
#


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
        on           : 'click'
        #
        labelClass   : (text, value) => null
        #
        allowReselection: false
        #
        allowAdditions  : false
        #
        hideAdditions   : true
        #
        action          : 'auto'
        # 搜尋的底限字數，超過此字數才會開始搜尋。
        minCharacters   : 1
        # 搜尋時的依據，可用：`both` 符合文字或值、`value` 符合值、`text` 符合文字。
        match           : 'both'
        #
        selectOnKeydown : true
        #
        forceSelection  : true
        #
        allowCategorySelection: false
        #
        placeholder           : 'auto'
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
        #
        selectedData:
            text   : null
            value  : null
            element: null
        #

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
        #.ts.dropdown:not(.basic).visible

    # 下拉式選單所會用到的 z 軸索引。
    zIndex:
        MENU   : 9
        ACTIVE : 10
        HOVERED: 11

    #
    $input = null

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

    # Expand
    #
    # 展開目前的下拉式選單。
    expand: =>
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

    # Event
    #
    # 呼叫指定的事件。
    event: (event, arg, arg2, arg3) =>
        @$this.data(event)?.call arg, arg2, arg3

    # Calculate Width
    #
    # 透過 Canvas 計算字的真實像素長度，並且回傳，這樣能我們更方便處理響應式輸入欄位寬度。
    # 詳細用法請參考：
    # https://stackoverflow.com/a/43922708/5203951
    calculateWidth: (text, fontSize, fontName) =>
        canvas       = document.createElement 'canvas'
        context      = canvas.getContext '2d'
        context.font = fontSize + fontName
        context.measureText(text).width




    #
    #
    #
    addLabel: (text, value) =>
        #
        text  = text.trim()
        value = value.trim()

        if text is ''
            return

        #
        #closeButton = $selector '<button>'
        #    .addClass @className.DEFAULT_BUTTON

        #
        #label = $selector '<a>'
        #    .addClass "#{@className.DEFAULT_LABEL}"
        #    .attr     'data-value', value
        #    .html     text
        #    .append   closeButton

        # 呼叫 labelClass 函式來檢查這個標籤有沒有必要新增額外的自訂類別或語義。
        classes = @$this.data('labelClass').call(@$this.get(), text, value) or ''

        #
        label = @createElement """
            <a class="#{@className.DEFAULT_LABEL} #{classes}" data-value="#{value}">
                #{text}
                <button class="#{@className.DEFAULT_BUTTON}"></button>
            </a>
        """

        #
        label = @event 'onLabelCreate', label, text, value

        #
        $selector(label).find(@selector.DEFAULT_BUTTON).on 'click', =>
            $selector(label).remove()

        #
        if label isnt false and label instanceof HTMLElement
            @$this.find(':scope > .labels').append label

    #
    #
    #
    removeLabel: () =>
        labels = @$this.find(':scope > .labels > .ts.label')
        if labels.length > 0
            labels.eq(labels.length - 1).remove()

    # Input Event
    #
    # 處理搜尋輸入欄位的事件函式。
    inputEvent: (event) =>
        #
        if event.type is 'input'
            # 以欄位內的文字作為基礎來更改搜尋欄位的長度，也就是響應式長度。
            @$input.css 'width', @calculateWidth @$input.get().value, @$input.css('font-size'), @$input.css('font-family')
            return

        # 如果沒有接收到按鍵代號的話就離開。
        if not event.keyCode
            return

        console.log event.keyCode

        # 依照按鍵代號執行不同的事情。
        switch event.keyCode
            # Enter 按鍵。
            when 13
                #
                @addLabel @$input.val(), @$input.val()

                #
                @$input.val('').css('width', '1em').get().focus()

            # Backspace 按鍵。
            when 8
                if @$input.val().trim() is ''
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


    # 元素初始化函式。
    init: =>
        # 監聽頁面的點擊事件，當點擊非下拉式選單的元素時就收合所有選單。
        $selector(document)
            .off 'click.dropdown'
            .on  'click.dropdown', (event) =>
                # 取得此次點擊的目標。
                $target          = $selector event.target
                # 一個表明點擊目標是不是沒有下拉式選單父容器的布林值。
                noDropdownParent = $target.closest(@selector.NOT_BASIC_DROPDOWN).length is 0
                # 表明點擊目標並不是下拉式選單的布林值。
                notDropdown      = not $target.hasClass @className.DROPDOWN

                # 如果點擊的目標不是下拉式選單內的元素，也不是下拉式選單本體。
                if noDropdownParent and notDropdown
                    # 那麼就隱藏所有可見的下拉式選單。
                    ts(@selector.VISIBLE_DROPDOWN).dropdown 'hide'

        # 找出下拉式選單內的搜尋輸入欄位。
        @$input = @$this.find 'input.search'

        # 監聽下拉式選單內搜尋欄位的輸入事件。
        @$input.on 'keydown input', @inputEvent

        # 當下拉式選單被點擊時的監聽事件。
        @$this.on 'click', (event) =>

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

            # 取得事件點擊的目標對象。
            $target = $selector event.target

            # 自己是不是下拉式選單。
            isDropdown      = @$this.hasClass @className.DROPDOWN
            # 自己是不是選擇用下拉式選單。
            isSelection     = @$this.hasClass @className.SELECTION
            # 自己是不是可多選的下拉式選單。
            isMultiple      = @$this.hasClass @className.MULTIPLE
            # 自己目前可不可見。
            isVisible       = @$this.hasClass @className.VISIBLE
            # 點擊目標是否為選擇用下拉式選單。
            targetSelection = $target.hasClass "#{@className.SELECTION}"
            # 點擊目標的父容器是否為多選下拉式選單。
            multipleParent  = $target.parent().hasClass @className.MULTIPLE
            # 點擊目標是不是一個項目。
            isItem          = $target.hasClass @className.ITEM
            # 點擊目標的父容器是否為一個下拉式選單。
            dropdownParent  = $target.parent().hasClass @className.DROPDOWN
            # 點擊目標的父容器是否為選單。
            menuParent      = $target.parent().hasClass @className.MENU
            # 點擊目標的父容器是否為一個項目。
            itemParent      = $target.parent().hasClass @className.ITEM
            # 點擊目標的父容器是否為標籤容器。
            labelsParent    = $target.parent().hasClass @className.LABELS
            # 點擊目標是否為標籤裡的一個關閉按鈕。
            isCloseButton   = $target.hasClass @className.CLOSE

            # 基於相關條件執行處理相對應的點擊動作。
            switch
                # 如果點擊的是一個標籤裡的關閉按鈕。
                when isCloseButton
                    # 就不要做任何動作。
                    break

                # 如果點擊的是選單內的項目。
                when isItem
                    # 如果下拉式選單是可供多選的話。
                    if isMultiple
                        #
                        @addLabel $target.html(), $target.attr('data-value')

                    # 如果下拉式選單是可供選擇的話。
                    if isSelection
                        @selectValue $target.html(), $target.attr('data-value')

                    # 觸發選擇事件，並呼叫相關回呼函式。
                    @event 'onSelect', @$this.get(), $target.attr('data-value'), $target.get()

                    # 接著隱藏所有下拉式選單。
                    ts(@selector.DROPDOWN).dropdown 'hide'

                #
                when targetSelection or multipleParent or labelsParent or not isCloseButton
                    if not isVisible
                        @expand()

                    @$this.find('input.search').get()?.focus()

                # 如果點擊的是下拉式選單本體，或是下拉式選單中的圖示與文字。
                when isDropdown or dropdownParent
                    # 就隱藏所有下拉式選單。
                    ts(@selector.DROPDOWN).dropdown 'hide'

                    # 如果下拉式選單本身原本是不可見的話，現在就是時候展開了。
                    if not isVisible
                        @expand()

        ts.fn

    #
    #
    #
    selectValue: (text, value) =>
        @$this
            .find '.item'
            .removeClass 'selected active'

        @$this
            .find ".item[data-value='#{value}']"
            .addClass 'selected active'

        @$this
            .find ':scope > .text'
            .removeClass 'default'
            .html text

    # 元素摧毀函式。
    destroy: =>


    # 模組可用的方法。
    methods: =>

        # Change Values
        #
        # 更改可選下拉式選單中的所有值為新值。
        'change valuess': (values) =>
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