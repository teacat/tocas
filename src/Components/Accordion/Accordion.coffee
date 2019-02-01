class Accordion
    # --------------------------------------------------------------
    # 建構子
    # --------------------------------------------------------------

    constructor: (selector, options) ->

        # --------------------------------------------------------------
        # 變數與常數設置
        # --------------------------------------------------------------

        # 別名。
        @_ALIAS = '.accordion'

        # 事件名稱。
        @_EVENTS =
            OPENING: "opening#{@_ALIAS}"
            OPEN   : "open#{@_ALIAS}"
            CLOSING: "closing#{@_ALIAS}"
            CLOSE  : "close#{@_ALIAS}"
            CHANGE : "change#{@_ALIAS}"
            CLICK  : "click#{@_ALIAS}"

        # 樣式名稱。
        @_CLASSNAMES =
            ACTIVE: 'active'
            MENU  : 'menu'

        # 選擇器名稱。
        @_SELECTORS =
            TITLE         : ':scope > .title'
            CONTENT       : ':scope > .content'
            MENU_TITLE    : ':scope > .item > .title'
            MENU_CONTENT  : ':scope > .item > .content'

        # 模組設定。
        @_OPTIONS =
            # 是否僅允許單個手風琴只有一個分頁能被打開。
            exclusive  : true
            # 展開的手風琴是否可以被關閉。
            # collapsible: true
            # 當手風琴被關閉時，是否一同閉合子手風琴。
            # closeNested: true
            # 當手風琴正在展開時所會呼叫的函式。
            onOpening: =>
            # 當手風琴展開時所會呼叫的函式。
            onOpen   : =>
            # 當手風琴正在關閉時所會呼叫的函式。
            onClosing: =>
            # 當手風琴關閉時所會呼叫的函式。
            onClose  : =>
            # 當手風琴被切換開關時所會呼叫的函式。
            onChange : =>

        # --------------------------------------------------------------
        # 區域變數
        # --------------------------------------------------------------

        @_tocas           = new Tocas selector
        @_options         = new Tocas().extend @_OPTIONS, options
        @_isMenuAccordion = @_isMenu()

        # --------------------------------------------------------------
        # 初始化
        # --------------------------------------------------------------

        @_bindEvents()

    # --------------------------------------------------------------
    # 公開方法
    # --------------------------------------------------------------

    open: (index) =>
        return      if @isActive index
        @closeAll() if @_options.exclusive
        @_open index
        return @

    close: (index) =>
        return if not @isActive index
        @_close index
        return @

    toggle: (index) =>
        if @isActive index
            @close index
        else
            @open index
        return @

    closeAll: =>
        @close index for index in [0..@_getCount()-1]
        return @

    isActive: (index) =>
        return @_isActive index

    destroy: =>
        @_tocas.unbind @_ALIAS

    # --------------------------------------------------------------
    # 內部方法
    # --------------------------------------------------------------

    _open: (index) =>
        console.log @_getSelector('content')
        @_tocas
            .find     @_getSelector('title')
            .eq       index
            .addClass @_CLASSNAMES.ACTIVE
        @_tocas
            .find     @_getSelector('content')
            .eq       index
            .addClass @_CLASSNAMES.ACTIVE
        @_triggerOpen()

    _close: (index) =>
        @_tocas
            .find     @_getSelector('title')
            .eq       index
            .removeClass @_CLASSNAMES.ACTIVE
        @_tocas
            .find     @_getSelector('content')
            .eq       index
            .removeClass @_CLASSNAMES.ACTIVE
        @_triggerClose()

    _isActive: (index) =>
        return @_tocas
            .find     @_getSelector('title')
            .eq       index
            .hasClass @_CLASSNAMES.ACTIVE

    _isMenu: =>
        return @_tocas
            .hasClass @_CLASSNAMES.MENU

    _getSelector: (name) =>
        switch name
            when 'title'
                return @_SELECTORS.MENU_TITLE if @_isMenuAccordion
                return @_SELECTORS.TITLE
            when 'content'
                return @_SELECTORS.MENU_CONTENT if @_isMenuAccordion
                return @_SELECTORS.CONTENT

    _getCount: =>
        return @_tocas
            .find @_getSelector('title')
            .length()

    _getContent: (index) =>
        return @_tocas
            .find @_getSelector('content')
            .get  index

    # --------------------------------------------------------------
    # 事件方法
    # --------------------------------------------------------------

    _bindEvents: =>
        @_tocas.bindWithChild @_EVENTS.CLICK, @_getSelector('title'), @_eventClick

    _eventClick: (event) =>
        index = @_tocas
            .find      @_getSelector('title')
            .toArray()
            .indexOf   event.target
        @toggle index

    _triggerOpen: (index) =>
        contentElement = @_getContent index
        @_options.onOpening.call contentElement, contentElement, index
        @_options.onOpen.call    contentElement, contentElement, index
        @_options.onChange.call  contentElement, contentElement, index

    _triggerClose: (index) =>
        contentElement = @_getContent index
        @_options.onClosing.call contentElement, contentElement, index
        @_options.onClose.call   contentElement, contentElement, index
        @_options.onChange.call  contentElement, contentElement, index