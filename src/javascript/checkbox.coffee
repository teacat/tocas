# Checkbox
#
# 核取方塊

ts.fn.checkbox = value: (parameters) ->

    # ------------------------------------------------------------------------
    # 變數與常數設置
    # ------------------------------------------------------------------------

    # 模組名稱。
    NAME             = 'checkbox'
    # 模組事件鍵名。
    EVENT_NAMESPACE  = ".#{NAME}"
    # 模組命名空間。
    MODULE_NAMESPACE = "module-#{NAME}"

    # 模組設定。
    Settings =
        # 消音所有提示，甚至是錯誤訊息。
        silent        : false
        # 顯示除錯訊息。
        debug         : true
        # 監聽 DOM 結構異動並自動重整快取。
        observeChanges: true
        # 當核取方塊被更改勾選狀態時所呼叫的函式。
        onChange       : ->
        # 當核取方塊被勾選時所呼叫的函式。
        onChecked      : ->
        # 當核取方塊被取消勾選時所呼叫的函式。
        onUnchecked    : ->
        # 當核取方塊被勾選時所呼叫的函式，如果這個函式回傳 `false` 將會阻止勾選動作。
        beforeChecked  : -> true
        # 當核取方塊被取消勾選時所呼叫的函式，如果這個函式回傳 `false` 將會阻止取消勾選動作。
        beforeUnchecked: -> true
        # 當核取方塊被啟用時所呼叫的函式。
        onEnable       : ->
        # 當核取方塊被停用時所呼叫的函式。
        onDisable      : ->

    # 事件名稱。
    Event =
        CHECKED         : "checked#{EVENT_NAMESPACE}"
        UNCHECKED       : "unchecked#{EVENT_NAMESPACE}"
        BEFORE_CHECKED  : "beforeChecked#{EVENT_NAMESPACE}"
        BEFORE_UNCHECKED: "beforeUnchecked#{EVENT_NAMESPACE}"
        ENABLE          : "enable#{EVENT_NAMESPACE}"
        DISABLE         : "disable#{EVENT_NAMESPACE}"
        CHANGE          : "change#{EVENT_NAMESPACE}"
        CLICK           : "click#{EVENT_NAMESPACE}"

    # 樣式名稱。
    ClassName =
        DISABLED: 'disabled'
        RADIO   : 'radio'

    # 選擇器名稱。
    Selector =
        INPUT           : 'input'
        INPUT_RADIO     : 'input[type="radio"]'
        INPUT_CHECKBOX  : 'input[type="checkbox"]'
        INPUT_RADIO_NAME: (name) -> "input[type='radio'][name='#{name}']"

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

        $this        = ts @
        element      = @
        $input       = $this.find Selector.INPUT
        inputElement = $input.get()
        instance     = $this.data MODULE_NAMESPACE
        settings     = if ts.isPlainObject(parameters) then ts.extend(Settings, parameters) else ts.extend(Settings)

        # ------------------------------------------------------------------------
        # 模組定義
        # ------------------------------------------------------------------------

        module =

            # Toggle
            #
            # 切換

            toggle: ->
                module.debug '切換核取方塊', element
                if module.is.checked() and module.is.checkbox()
                    module.uncheck()
                else
                    module.check()

            # Check
            #
            # 勾選

            check: ->
                module.debug '勾選核取方塊', element
                if not settings.beforeChecked.call inputElement
                    return
                if module.is.radio()
                    ts(Selector.INPUT_RADIO_NAME(module.get.name())).each ->
                        ts @
                            .parent()
                            .checkbox 'uncheck'
                $this
                    .trigger Event.CHECKED, inputElement
                    .trigger Event.CHANGE,  inputElement
                $input.prop 'checked', true

            # Uncheck
            #
            # 取消勾選

            uncheck: ->
                module.debug '取消勾選核取方塊', element
                if not settings.beforeUnchecked.call inputElement
                    return
                $this
                    .trigger Event.UNCHECKED, inputElement
                    .trigger Event.CHANGE,    inputElement
                $input.prop 'checked', false

            # Disable
            #
            # 停用

            disable: ->
                module.debug '停用核取方塊', element
                $this
                    .trigger  Event.DISABLE, $input.get()
                    .addClass ClassName.DISABLED
                $input.prop 'disabled', true

            # Enable
            #
            # 啟用

            enable: ->
                module.debug '啟用核取方塊', element
                $this
                    .trigger     Event.ENABLE, $input.get()
                    .removeClass ClassName.DISABLED
                $input.prop 'disabled', false

            # Is
            #
            # 是否

            is:
                disable: ->
                    $input.prop 'disabled'
                enable: ->
                    not $input.prop 'disabled'
                checked: ->
                    $input.prop 'checked'
                unchecked: ->
                    not $input.prop 'checked'
                radio: ->
                    $this.hasClass ClassName.RADIO
                checkbox: ->
                    not $this.hasClass ClassName.RADIO

            # Get
            #
            # 取得

            get:
                name: ->
                    $input.attr 'name'

            # Bind
            #
            # 綁定

            bind:

                # Events
                #
                # 事件

                events: =>
                    $this.on Event.CLICK, ->
                        module.debug '發生 CLICK 事件', element
                        module.toggle() if module.is.enable()
                    $this.on Event.CHECKED, (event, context) ->
                        module.debug '發生 CHECKED 事件', element
                        settings.onChecked.call context, event
                    $this.on Event.UNCHECKED, (event, context) ->
                        module.debug '發生 UNCHECKED 事件', element
                        settings.onUnchecked.call context, event
                    #$this.on Event.BEFORE_CHECKED, (event, context) ->
                    #    settings.onBeforeChecked.call context, event
                    #$this.on Event.BEFORE_UNCHECKED, (event, context) ->
                    #    settings.onBeforeUnchecked.call context, event
                    $this.on Event.ENABLE, (event, context) ->
                        module.debug '發生 ENABLE 事件', element
                        settings.onEnable.call context, event
                    $this.on Event.DISABLE, (event, context) ->
                        module.debug '發生 DISABLE 事件', element
                        settings.onDisable.call context, event
                    $this.on Event.CHANGE, (event, context) ->
                        module.debug '發生 CHANGE 事件', element
                        settings.onChange.call context, event

            # ------------------------------------------------------------------------
            # 模組核心
            # ------------------------------------------------------------------------

            # Initialize
            #
            # 初始化

            initialize: ->
                module.debug '初始化核取方塊', element
                module.bind.events()
                if settings.observeChanges
                    module.observeChanges()
                module.instantiate()

            # Instantiate
            #
            # 實例化

            instantiate: ->
                module.debug '實例化核取方塊', element
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
                $input       = $this.find Selector.INPUT
                inputElement = $input.get()

            # Destroy
            #
            # 摧毀

            destroy: ->
                module.debug '摧毀核取方塊', element
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
