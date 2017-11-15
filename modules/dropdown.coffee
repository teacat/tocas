# Dropdown
#
# 下拉式選單。

class Dropdown
    # 模組名稱。
    @module:
        'dropdown'

    # 模組屬性。
    props:

        onChange: =>
        onAdd: =>
        onRemove: =>
        onLabelCreate: =>
        onLabelRemove: =>
        onLabelSelect: =>
        onInput: =>
        onNoResults: =>
        onShow: =>
        onHide: =>
        onSelect: (value, element) =>
        values: null
        on: 'click'
        allowReselection: false
        allowAdditions: false
        hideAdditions: true
        action: 'auto'
        minCharacters: 1
        match: 'both'
        selectOnKeydown: true
        forceSelection: true
        allowCategorySelection: false
        placeholder: 'auto'

    # 類別樣式名稱。
    className:
        VISIBLE  : 'visible'
        HIDDEN   : 'hidden'
        ANIMATING: 'animating'
        DROPDOWN : 'dropdown'
        TEXT     : 'text'
        ICON     : 'icon'
        IMAGE    : 'image'
        ITEM     : 'item'
        MENU     : 'menu'
        UPWARD   : 'upward'
        DOWNWARD : 'downward'
        LEFTWARD : 'leftward'
        RIGHTWARD: 'rightward'

    # 選擇器名稱。
    selector:
        DROPDOWN          : '.ts.dropdown'
        VISIBLE_DROPDOWN  : '.ts.visible.dropdown'
        MENU              : '.ts.menu'
        NOT_BASIC_DROPDOWN: '.ts.dropdown:not(.basic)'
        #.ts.dropdown:not(.basic).visible
    zIndex:
        MENU   : 9
        ACTIVE : 10
        HOVERED: 11

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
            .one 'animationend', =>
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

    event: (event, arg, arg2, arg3) =>
        @$this.data(event)?.call arg, arg2, arg3

    # 元素初始化函式。
    init: =>

        $selector(document)
            .off 'click.dropdown'
            .on  'click.dropdown', (event) =>

                #
                $target          = $selector event.target
                #
                noDropdownParent = $target.closest(@selector.NOT_BASIC_DROPDOWN).length is 0
                #
                notDropdown      = not $target.hasClass @className.DROPDOWN

                #
                if noDropdownParent and notDropdown
                    ts(@selector.VISIBLE_DROPDOWN).dropdown 'hide'


        @$this.on 'click', (event) =>

            #
            if not @$this.hasClass(@className.DOWNWARD) and not @$this.hasClass(@className.UPWARD) and not @$this.hasClass(@className.RIGHTWARD) and not @$this.hasClass(@className.LEFTWARD)
                #
                switch @quadrant()
                    when 'top left'
                        @$this.addClass "#{@className.DOWNWARD} #{@className.RIGHTWARD}"
                    when 'top right'
                        @$this.addClass "#{@className.DOWNWARD} #{@className.LEFTWARD}"
                    when 'bottom left'
                        @$this.addClass "#{@className.UPWARD} #{@className.RIGHTWARD}"
                    when 'bottom right'
                        @$this.addClass "#{@className.UPWARD} #{@className.LEFTWARD}"

            #
            $target = $selector event.target

            #
            isDropdown     = @$this.hasClass @className.DROPDOWN
            isVisible      = @$this.hasClass @className.VISIBLE
            isItem         = $target.hasClass @className.ITEM
            dropdownParent = $target.parent().hasClass @className.DROPDOWN
            menuParent     = $target.parent().hasClass @className.MENU
            itemParent     = $target.parent().hasClass @className.ITEM

            #
            switch
                # 如果點擊的是下拉式選單本體，或是下拉式選單中的圖示與文字。
                when isDropdown or dropdownParent
                    # 如果下拉式選單正在顯示的話。
                    if isVisible
                        # 就隱藏下拉式選單。
                        ts(@selector.DROPDOWN).dropdown 'hide'
                    else
                        #
                        ts(@selector.DROPDOWN).dropdown 'hide'
                        # 不然就展開下拉式選單。
                        @expand()

                # 如果點擊的是選單內的項目。
                when isItem
                    @event 'onSelect', @$this.get(), $target.attr('data-value'), $target.get()

        ts.fn

    # 元素摧毀函式。
    destroy: =>


    # 模組可用的方法。
    methods: =>

        'change valuess': =>

        toggle: =>

        show: =>
            @expand()
            ts.fn

        hide: =>
            @contract()
            ts.fn

        clear: =>

        'hide others': =>

        'restore defaults': =>

        'restore placeholder text': =>

        'restore default value': =>

        'save defaults': =>

        'set selected': =>

        'remove selected': =>

        'set exactly': =>

        'set text': =>

        'set value': =>

        'get text': =>

        'get value': =>

        'get item': =>

        'set active': =>

        'set visible': =>

        'remove active': =>

        'remove visible': =>

        'is selection': =>

        'is animated': =>

        'is visible': =>

        'is hidden': =>

        'get default text': =>

        'get placeholder text': =>


ts Dropdown