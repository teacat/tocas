# Dropdown
#
# 下拉式選單

ts.fn.dropdown = value: (parameters) ->

    # ------------------------------------------------------------------------
    # 變數與常數設置
    # ------------------------------------------------------------------------

    # 模組名稱。
    NAME             = 'dropdown'
    # 模組事件鍵名。
    EVENT_NAMESPACE  = ".#{NAME}"
    # 模組命名空間。
    MODULE_NAMESPACE = "module-#{NAME}"

    # 模組設定。
    Settings =
        # 是否僅允許單個手風琴只有一個分頁能被打開。
        exclusive     : true
        # 消音所有提示，甚至是錯誤訊息。
        silent        : false
        # 顯示除錯訊息。
        debug         : true
        # 監聽 DOM 結構異動並自動重整快取。
        observeChanges: true
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

    # 事件名稱。
    Event =
        CHANGE      : "change#{EVENT_NAMESPACE}"
        ADD         : "add#{EVENT_NAMESPACE}"
        REMOVE      : "remove#{EVENT_NAMESPACE}"
        LABEL_CREATE: "labelcreate#{EVENT_NAMESPACE}"
        LABEL_REMOVE: "labelremove#{EVENT_NAMESPACE}"
        LABEL_SELECT: "labelselect#{EVENT_NAMESPACE}"
        INPUT       : "input#{EVENT_NAMESPACE}"
        NO_RESULTS  : "noresults#{EVENT_NAMESPACE}"
        SHOW        : "show#{EVENT_NAMESPACE}"
        HIDE        : "hide#{EVENT_NAMESPACE}"
        SELECT      : "select#{EVENT_NAMESPACE}"
        CLICK       : "click#{EVENT_NAMESPACE}"

    # 樣式名稱。
    ClassName =
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
    Selector =
        BODY                  : 'body'
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

    # 錯誤訊息。
    Error =
        METHOD: '欲呼叫的方法並不存在'

    # ------------------------------------------------------------------------
    # 私有變數
    # ------------------------------------------------------------------------

    $allModules    = ts @
    query          = arguments[0]
    queryArguments = [].slice.call arguments, 1
    methodInvoked  = typeof query is 'string'
    returnedValue  = undefined

    # ------------------------------------------------------------------------
    # 元素遍歷
    # ------------------------------------------------------------------------

    $allModules.each ->

        # ------------------------------------------------------------------------
        # 區域變數
        # ------------------------------------------------------------------------

        $this    = ts @
        element  = @
        $body    = ts Selector.BODY
        instance = $this.data MODULE_NAMESPACE
        settings = if ts.isPlainObject(parameters) then ts.extend(Settings, parameters) else ts.extend(Settings)

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            #
            #
            #

            show: ->
                $this.addClass ClassName.VISIBLE
                ts(Selector.DROPDOWN).not(element).dropdown 'hide'

            #
            #
            #

            hide: ->
                $this    = ts element
                $this.removeClass ClassName.VISIBLE

            #
            #
            #

            hideOthers: ->

            #
            #
            #

            toggle: ->
                if module.is.visible()
                    module.hide()
                else
                    module.show()

            #
            #
            #

            clear: ->

            #
            #
            #

            refresh: ->

            #
            #
            #

            change:
                values: ->

            #
            #
            #

            set:
                selected: ->
                excatly: ->
                text: ->
                value: ->
                active: ->
                visible: ->

            #
            #
            #

            remove:
                selected: ->
                active: ->
                visible: ->

            #
            #
            #

            get:
                text: ->
                value: ->
                item: ->
                defaultText: ->
                placeholderText: ->


            #
            #
            #

            is:
                selection: ->
                    $this.hasClass ClassName.SELECTION
                visible: ->
                    $this.hasClass ClassName.VISIBLE
                hidden: ->
                    not $this.hasClass ClassName.VISIBLE
                closable: (event) ->
                    $target   = ts event.target
                    $dropdown = $target.closest Selector.DROPDOWN

                    module.is.visible()


            #
            #
            #

            restore:
                defaults: ->
                placeholderText: ->
                defaultValue: ->

            #
            #
            #

            save:
                defaults: ->



            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>
                    #$this.on Event.CLICK, ->
                    #    module.toggle()

                    $body.off Event.CLICK
                    $body.on Event.CLICK, (event) ->
                       # module.debug '發生 CLICK 事件', element

                        $target   = ts event.target
                        $dropdown = $target.closest Selector.DROPDOWN

                        if $dropdown.length isnt 0
                            $dropdown.dropdown 'toggle'
                        else
                            ts('.ts.dropdown').dropdown 'hide'


                        #$dropdown.dropdown 'show'

                        #if module.is.visible()
                        #    module.hide()




                    #$this.on Event.CLICK, Selector.TITLE, ->
                    #    module.debug '發生 CLICK 事件', element, @
                    #    module.toggle $title.indexOf @
                    #$this.on Event.OPENING, (event, context) ->
                    #    module.debug '發生 OPENING 事件', context
                    #    settings.onOpening.call context, event
                    #$this.on Event.OPEN, (event, context) ->
                    #    module.debug '發生 OPEN 事件', context
                    #    settings.onOpen.call context, event
                    #$this.on Event.CLOSING, (event, context) ->
                    #    module.debug "發生 CLOSING 事件", context
                    #    settings.onClosing.call context, event
                    #$this.on Event.CLOSE, (event, context) ->
                    #    module.debug "發生 CLOSE 事件", context
                    #    settings.onClose.call context, event
                    #$this.on Event.CHANGE, (event, context) ->
                    #    module.debug "發生 CHANGE 事件", context
                    #    settings.onChange.call context, event

            # ------------------------------------------------------------------------
            # 模組核心
            # ------------------------------------------------------------------------

            # Initialize
            #
            # 初始化

            initialize: ->
                module.debug '初始化下拉式選單', element
                module.bind.events()
                if settings.observeChanges
                    module.observeChanges()
                module.instantiate()





            # Instantiate
            #
            # 實例化

            instantiate: ->
                module.debug '實例化下拉式選單', element
                instance = module
                $this.data MODULE_NAMESPACE, instance

            # Observe Changes
            #
            # 結構異動觀察者

            observeChanges: ->
                if not 'MutationObserver' of window
                    module.debug '找不到樹狀結構變更觀測者，略過結構監聽動作', element
                    return
                observer = new MutationObserver (mutations) ->
                    module.debug 'DOM 樹狀結構已變更，更新快取資料'
                    module.refresh()
                observer.observe element,
                    childList : true
                    subtree   : true
                module.debug '已設置 DOM 樹狀結構異動觀察者', observer

            # Refresh
            #
            # 更新資料

            refresh: ->
                $title   = $this.find Selector.TITLE
                $content = $this.find Selector.CONTENT

            # Destroy
            #
            # 摧毀

            destroy: ->
                module.debug '摧毀下拉式選單', element
                $this.removeData MODULE_NAMESPACE
                     .off        EVENT_NAMESPACE

            # Invoke
            #
            # 模組呼叫點

            invoke: (query, passedArguments, context) ->
                object          = instance
                maxDepth        = undefined
                found           = undefined
                response        = undefined
                passedArguments = passedArguments or queryArguments
                context         = element or context

                # 如果語法是字串，本地區域也有被定義的話。
                if typeof query is 'string' and object isnt undefined
                    # 將語法以空白分隔。
                    query    = query.split /[\. ]/
                    # 取得此語法的深度。
                    maxDepth = query.length - 1
                    # 解析語法的每個片段。
                    for value, depth in query
                        # 將語法轉換成駝峰式大小寫，用以對應本地模組的函式名稱。
                        camelCaseValue = if depth isnt maxDepth then value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) else query
                        # 如果此駝峰是大小寫有對應到模組中的物件，而且語法還未到底，那麼就依照此物件遞迴搜尋。
                        if ts.isPlainObject(object[camelCaseValue]) and depth isnt maxDepth
                            object = object[camelCaseValue]
                        # 如果語法駝峰式大小寫有對應到模組的一個函式，則使用該函式。
                        else if object[camelCaseValue] isnt undefined
                            found = object[camelCaseValue]
                            break
                        # 如果語法有對應到模組中的物件，而且語法還未到底，那麼就依照此物件遞迴搜尋。
                        else if ts.isPlainObject(object[value]) and depth isnt maxDepth
                            object = object[value]
                        # 如果語法有對應一個函式，則使用該函式。
                        else if object[value] isnt undefined
                            found = object[value]
                            break
                        # 如果語法沒有對應到任何東西則表示錯誤。
                        else
                            module.error Error.METHOD, query
                            break
                # 決定回應的結果。
                switch
                    # 當找到的對應物件是個函式，就呼叫該函式並取得其結果。
                    when typeof found is 'function'
                        response = found.apply context, passedArguments
                    # 當找到的物件不是函式，就當其為結果。
                    when found isnt undefined
                        response = found
                # 決定如何處置欲回傳的值。
                switch
                    # 當回傳的值是一個陣列，就將回應結果推入回傳值陣列中。
                    when Array.isArray returnedValue
                        returnedValue.push response
                    # 如果回傳的值不是陣列，則建立一個陣列並包含自己和回應結果。
                    when returnedValue isnt undefined
                        returnedValue = [
                            returnedValue
                            response
                        ]
                    # 當有回應時，就將回傳值設為其回應結果。
                    when response isnt undefined
                        returnedValue = response
                # 回傳找到的物件。
                found

            # Debug
            #
            # 除錯訊息

            debug: ->
                return if not settings.debug or settings.silent
                module.debug = Function.prototype.bind.call console.info, console, "#{NAME}:"
                module.debug.apply console, arguments

            # Error
            #
            # 錯誤訊息

            error: ->
                return if settings.silent
                module.error = Function.prototype.bind.call console.error, console, "#{NAME}:"
                module.error.apply console, arguments

        # ------------------------------------------------------------------------
        # Tocas 核心安插
        # ------------------------------------------------------------------------

        if methodInvoked
            if instance is undefined
                module.initialize()
            module.invoke query

        else
            if instance isnt undefined
                instance.invoke 'destroy'
            module.initialize()

    return if returnedValue isnt undefined then returnedValue else ts
