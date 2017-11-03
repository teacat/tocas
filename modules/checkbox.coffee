# Checkbox
#
# 核取方塊。

class Checkbox
    # 模組名稱。
    @module:
        'checkbox'

    # 模組屬性。
    props:
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

    # 類別樣式名稱。
    className:
        DISABLED: 'disabled'
        RADIO   : 'radio'

    # 選擇器名稱。
    selector:
        INPUT           : 'input'
        INPUT_RADIO     : 'input[type="radio"]'
        INPUT_CHECKBOX  : 'input[type="checkbox"]'
        INPUT_RADIO_NAME: (name) -> "input[type='radio'][name='#{name}']"

    # 元素初始化函式。
    init: =>
        # 當核取方塊被按下時。
        @$this.on 'click.checkbox', =>
            # 如果不是被停用的話。
            if not @$this.find(@selector.INPUT).prop 'disabled'
                # 就切換該核取方塊的勾選狀態。
                @toggle()
        ts.fn

    # 元素摧毀函式。
    destroy: =>
        @$this.off 'click.checkbox'

    # Event
    #
    # 呼叫指定函式。
    event: (event) =>
        @$this.data(event)?.call @$this.get()

    # Toggle
    #
    # 切換指定核取方塊的勾選狀態。
    toggle: =>
        if @$this.find(@selector.INPUT).prop('checked') and not @$this.hasClass @className.RADIO
            @uncheck()
        else
            @check()

    # Status
    #
    # 取得核取方塊是單選項目還是方塊、並回傳相對應的元素。
    status: =>
        # 確認是核取方塊還是單選項目。
        isRadio = @$this.hasClass @className.RADIO
        # 依照種類取得該元素。
        $checkbox = $selector @$this, if isRadio then @selector.INPUT_RADIO else @selector.INPUT_CHECKBOX

        return
            isRadio  : isRadio
            $checkbox: $checkbox

    # Check
    #
    # 勾選指定方塊。
    check: =>
        # 呼叫事件函式。
        return if not @event 'beforeChecked'
        @event 'onChecked'
        @event 'onChange'

        {isRadio, $checkbox} = @status()

        # 如果是單選項目的話。
        if isRadio
            # 取得單選項目的群組名稱。
            name = $checkbox.attr 'name'
            # 移除所有該群組的單選項目勾選狀態。
            $selector(@selector.INPUT_RADIO_NAME(name)).each (element) =>
                @$this = $selector(element).parent()
                @uncheck()
                @$this = @$origin
            # 然後啟用目前的單選項目。
            $checkbox.prop 'checked', true

        # 如果是複選方塊的話。
        else
            # 啟用勾選狀態。
            $checkbox.prop 'checked', true

    # Uncheck
    #
    # 取消勾選指定方塊。
    uncheck: =>
        # 呼叫事件函式。
        return if not @event 'beforeUnchecked'
        @event 'onUnchecked'
        @event 'onChange'

        {$checkbox} = @status()
        # 取消勾選狀態。
        $checkbox.prop 'checked', false

    # 模組可用的方法。
    methods: =>

        # Toggle
        #
        # 切換核取方塊的勾選狀態。
        toggle: =>
            @toggle()
            ts.fn

        # Check
        #
        # 勾選指定核取方塊。
        check: =>
            @check()
            ts.fn

        # Uncheck
        #
        # 取消勾選指定核取方塊。
        uncheck: =>
            @uncheck()
            ts.fn

        # Disable
        #
        # 停用指定核取方塊，使用者將無法手動勾選或取消勾選該方塊。
        disable: =>
            @event 'onDisable'
            @$this.addClass @className.DISABLED
            @$this.find(@selector.INPUT).prop 'disabled', true
            ts.fn

        # Enable
        #
        # 啟用指定核取方塊，使用者可以對其進行勾選或取消勾選。
        enable: =>
            @event 'onEnable'
            @$this.removeClass @className.DISABLED
            @$this.find(@selector.INPUT).prop 'disabled', false
            ts.fn

        # Is Disable
        #
        # 回傳一個布林值表示該核取方塊是否已被停用。
        'is disable': =>
            @$this.find(@selector.INPUT).prop 'disabled'

        # Is Enable
        #
        # 回傳一個布林值表示該核取方塊是否可供使用。
        'is enable': =>
            not @$this.find(@selector.INPUT).prop 'disabled'

        # Is Checked
        #
        # 取得一個表示核取方塊是否被勾選的布林值。
        'is checked': =>
            @$this.find(@selector.INPUT).prop 'checked'

        # Is Unchecked
        #
        # 取得一個表示核取方塊是否沒有被勾選的布林值。
        'is unchecked': =>
            not @$this.find(@selector.INPUT).prop 'checked'

        # Attach Events
        #
        # 綁定按鈕來觸發這個核取方塊的指定功能。
        'attach events': (selector, event) =>
            $selector(selector).on 'click', =>
                ts(@$this).checkbox event
            ts.fn

ts Checkbox