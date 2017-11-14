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

    # 選擇器名稱。
    selector:
        DROPDOWN        : '.ts.dropdown'
        VISIBLE_DROPDOWN: '.ts.visible.dropdown'
        MENU            : '.ts.menu'

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
        @$this
            .css         'z-index', @zIndex.MENU
            .removeClass @className.VISIBLE
            .addClass    "#{@className.HIDDEN} #{@className.ANIMATING}"
            .one         'animationend', =>
                @$this.removeClass @className.ANIMATING
            .emulate 'animtionend', @duration


    # 元素初始化函式。
    init: =>

        $selector(document)
            .off 'click.dropdown'
            .on  'click.dropdown', (event) =>
                console.log
                if $selector(event.target).closest('.dropdown:not(.basic)') is null and !@$selector(event.target).hasClass('dropdown')
                    ts('.ts.dropdown:not(.basic).visible').dropdown('hide')
                    #contractDropdown '.ts.dropdown:not(.basic).visible'


        @$this.on 'click', (event) =>
            @$this.removeClass 'upward downward leftward rightward'

            switch @quadrant()
                when 'top left'
                    @$this.addClass 'downward rightward'
                when 'top right'
                    @$this.addClass 'downward leftward'
                when 'bottom left'
                    @$this.addClass 'upward rightward'
                when 'bottom right'
                    @$this.addClass 'upward leftward'



            #
            $target = $selector event.target

            #
            #isDropdown        = @$this.hasClass  @className.DROPDOWN
            #isDropdownText    = $target.hasClass @className.TEXT
            #isDropdownIcon    = $target.hasClass @className.ICON
            #isDropdownImage   = $target.hasClass @className.IMAGE
            #hasDropdownParent = $target.parent().hasClass @className.DROPDOWN
            #parentIsItem      = $target.parent().hasClass @className.ITEM
            #targetIsDropdown  = $target.hasClass @className.DROPDOWN
            #isItem            = $target.hasClass @className.ITEM
            #isTsMenuItem      = $target.closest  @selector.MENU
            #isVisible         = $target.hasClass @className.VISIBLE

            #
            #switch
            #    #
            #    when isTsMenuItem and isDropdown and parentIsItem      and targetIsDropdown and !isVisible
            #    ,    isTsMenuItem and isDropdown and !parentIsItem     and targetIsDropdown and !isVisible
            #    ,    isTsMenuItem and isDropdown and hasDropdownParent and parentIsItem and !isVisible
            #    ,    isDropdown   and isTsMenuItem and !isVisible
            #    ,    isDropdown   and targetIsDropdown and !isVisible
            #    ,    isDropdown   and isDropdownIcon  and hasDropdownParent and !isVisible
            #    ,    isDropdown   and isDropdownImage and hasDropdownParent and !isVisible
            #    ,    isDropdown   and isDropdownText  and hasDropdownParent and !isVisible
            #        # 關閉其他可見的下拉式選單。
            #        ts(@selector.DROPDOWN).dropdown 'hide'
#
            #        #
            #        @expand()
#
            #    #
            #    # when isDropdown and isItem
            #    # ,    isDropdown and parentIsItem
            #    when isVisible
            #        console.log 'y'
            #        # 關閉其他可見的下拉式選單。
            #        ts(@selector.DROPDOWN).dropdown 'hide'

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