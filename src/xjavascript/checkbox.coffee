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
    onChange       : =>
    # 當核取方塊被勾選時所呼叫的函式。
    onChecked      : =>
    # 當核取方塊被取消勾選時所呼叫的函式。
    onUnchecked    : =>
    # 當核取方塊被勾選時所呼叫的函式，如果這個函式回傳 `false` 將會阻止勾選動作。
    beforeChecked  : => true
    # 當核取方塊被取消勾選時所呼叫的函式，如果這個函式回傳 `false` 將會阻止取消勾選動作。
    beforeUnchecked: => true
    # 當核取方塊被啟用時所呼叫的函式。
    onEnable       : =>
    # 當核取方塊被停用時所呼叫的函式。
    onDisable      : =>

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
    INPUT_RADIO_NAME: (name) => "input[type='radio'][name='#{name}']"

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $input       = $this.find Selector.INPUT
    inputElement = $input.get()

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =

        toggle: =>
            debug '切換核取方塊', element
            if module.is.checked() and module.is.checkbox()
                module.uncheck()
            else
                module.check()

        check: =>
            debug '勾選核取方塊', element
            if not module.trigger.beforeChecked()
                return
            if module.is.radio()
                module.uncheckAll()
            module.trigger.check()
            module.set.checked true

        uncheck: =>
            debug '取消勾選核取方塊', element
            if not module.trigger.beforeUnchecked()
                return
            module.trigger.uncheck()
            module.set.checked false

        uncheckAll: (name) =>
            ts(Selector.INPUT_RADIO_NAME(module.get.name())).each ->
                ts @
                    .parent()
                    .checkbox 'uncheck'

        disable: =>
            debug '停用核取方塊', element
            module.trigger.disable()
            module.set.disable true

        enable: =>
            debug '啟用核取方塊', element
            module.trigger.enable()
            module.set.disable false

        set:
            checked: (bool) =>
                $input.prop 'checked', bool
            disable: (bool) =>
                if bool
                    $this.addClass ClassName.DISABLED
                else
                    $this.removeClass ClassName.DISABLED
                $input.prop 'disabled', bool

        is:
            disable: =>
                $input.prop 'disabled'
            enable: =>
                not $input.prop 'disabled'
            checked: =>
                $input.prop 'checked'
            unchecked: =>
                not $input.prop 'checked'
            radio: =>
                $this.hasClass ClassName.RADIO
            checkbox: =>
                not $this.hasClass ClassName.RADIO

        get:
            name: =>
                $input.attr 'name'

        trigger:
            check: =>
                $this
                    .trigger Event.CHECKED, inputElement
                    .trigger Event.CHANGE,  inputElement
            uncheck: =>
                $this
                    .trigger Event.UNCHECKED, inputElement
                    .trigger Event.CHANGE,    inputElement
            disable: =>
                $this
                    .trigger Event.DISABLE, inputElement
            enable: =>
                $this
                    .trigger Event.ENABLE, inputElement
            beforeChecked: =>
                debug '發生 BEFORE_CHECKED 事件', element, inputElement
                settings.beforeChecked.call inputElement
            beforeUnchecked: =>
                debug '發生 BEFORE_UNCHECKED 事件', element, inputElement
                settings.beforeUnchecked.call inputElement

        bind:
            events: =>
                $this.on Event.CLICK, =>
                    debug '發生 CLICK 事件', element
                    module.toggle() if module.is.enable()
                $this.on Event.CHECKED, (event, context) =>
                    debug '發生 CHECKED 事件', element
                    settings.onChecked.call context, event
                $this.on Event.UNCHECKED, (event, context) =>
                    debug '發生 UNCHECKED 事件', element
                    settings.onUnchecked.call context, event
                $this.on Event.ENABLE, (event, context) =>
                    debug '發生 ENABLE 事件', element
                    settings.onEnable.call context, event
                $this.on Event.DISABLE, (event, context) =>
                    debug '發生 DISABLE 事件', element
                    settings.onDisable.call context, event
                $this.on Event.CHANGE, (event, context) =>
                    debug '發生 CHANGE 事件', element
                    settings.onChange.call context, event


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化核取方塊', element
            module.bind.events()

        instantiate: =>
            debug '實例化核取方塊', element

        refresh: =>
            $input       = $this.find Selector.INPUT
            inputElement = $input.get()
            return $allModules

        destroy: =>
            debug '摧毀核取方塊', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules