class TocasCheckbox
    $name:
        'checkbox'

    $options:
        onChange       : ->      # 當核取方塊被更改勾選狀態時所呼叫的函式。
        onChecked      : ->      # 當核取方塊被勾選時所呼叫的函式。
        onUnchecked    : ->      # 當核取方塊被取消勾選時所呼叫的函式。
        beforeChecked  : -> true # 當核取方塊被勾選時所呼叫的函式，如果這個函式回傳 `false` 將會阻止勾選動作。
        beforeUnchecked: -> true # 當核取方塊被取消勾選時所呼叫的函式，如果這個函式回傳 `false` 將會阻止取消勾選動作。
        onEnable       : ->      # 當核取方塊被啟用時所呼叫的函式。
        onDisable      : ->      # 當核取方塊被停用時所呼叫的函式。

    $init: ({$this, $module}) ->
        # 當核取方塊被按下時。
        $this.on 'click', (e) ->
            # 如果不是被停用的話。
            if not $this.find('input').prop 'disabled'
                # 就切換該核取方塊的勾選狀態。
                $module::_toggle $this, $module
        ts.fn

    # 呼叫指定函式。
    _event: ($this, event) ->
        $this.data(event).call $this.get()

    # 切換指定核取方塊的勾選狀態。
    _toggle: ($this) ->
        if $this.find('input').prop('checked') and not $this.hasClass 'radio'
            @_uncheck $this
        else
            @_check $this

    # 取得核取方塊是單選項目還是方塊、並回傳相對應的元素。
    _status: ($this) ->
        # 確認是核取方塊還是單選項目。
        isRadio = $this.hasClass 'radio'
        # 依照種類取得該元素。
        checkbox = $selector $this, if isRadio then 'input[type="radio"]' else 'input[type="checkbox"]'

        return
            isRadio : isRadio
            checkbox: checkbox

    # 勾選指定方塊。
    _check: ($this) ->
        # 呼叫事件函式。
        return if not @_event $this, 'beforeChecked'
        @_event $this, 'onChecked'
        @_event $this, 'onChange'

        {isRadio, checkbox} = @_status $this

        # 如果是單選項目的話。
        if isRadio
            # 取得單選項目的群組名稱。
            name = checkbox.attr 'name'
            # 移除所有該群組的單選項目勾選狀態。
            $selector("input[type='radio'][name='#{name}']").each (element) =>
                @_uncheck $selector(element).parent()
            # 然後啟用目前的單選項目。
            checkbox.prop 'checked', true

        # 如果是複選方塊的話。
        else
            # 啟用勾選狀態。
            checkbox.prop 'checked', true

    # 取消勾選指定方塊。
    _uncheck: ($this) ->
        # 呼叫事件函式。
        return if not @_event $this, 'beforeUnchecked'
        @_event $this, 'onUnchecked'
        @_event $this, 'onChange'

        {checkbox} = @_status $this
        # 取消勾選狀態。
        checkbox.prop 'checked', false

    $methods:
        # 切換核取方塊的勾選狀態。
        toggle: ({$this, $module}) ->
            $module::_toggle $this
            ts.fn

        # 勾選指定核取方塊。
        check: ({$this, $module}) ->
            $module::_check $this
            ts.fn

        # 取消勾選指定核取方塊。
        uncheck: ({$this, $module}) ->
            $module::_uncheck $this
            ts.fn

        # 停用指定核取方塊，使用者將無法手動勾選或取消勾選該方塊。
        disable: ({$this}) ->
            @_event $this, 'onDisable'
            $this.find('input').prop 'disabled', true
            ts.fn

        # 啟用指定核取方塊，使用者可以對其進行勾選或取消勾選。
        enable: ({$this}) ->
            @_event $this, 'onEnable'
            $this.find('input').prop 'disabled', false
            ts.fn

        # 回傳一個布林值表示該核取方塊是否已被停用。
        'is disable': ({$this}) ->
            $this.find('input').prop 'disabled'

        # 回傳一個布林值表示該核取方塊是否可供使用。
        'is enable': ({$this}) ->
            not $this.find('input').prop 'disabled'

        # 取得一個表示核取方塊是否被勾選的布林值。
        'is checked': ({$this}) ->
            $this.find('input').prop 'checked'

        # 取得一個表示核取方塊是否沒有被勾選的布林值。
        'is unchecked': ({$this}) ->
            not $this.find('input').prop 'checked'

        # 綁定按鈕來觸發這個核取方塊的指定功能。
        'attach events': ({$this}, selector, event) ->
            $selector(selector).on 'click', ->
                ts($this).checkbox(event)
            ts.fn

new ts TocasCheckbox