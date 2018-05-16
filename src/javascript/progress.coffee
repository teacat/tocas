# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'progress'
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
    # 是否要在百分比達到 `100` 時，自動將進度條改為「成功」狀態。
    autoSuccess   : true
    # 緩衝條。
    buffer:
        # 緩衝值。
        value: 0
    # 初始化的進度條值。
    value                 : 0
    # 多個進度條的值。
    # values
    # 進度條的最大值，會以此作為百分比的推算。
    total                 : 100
    # 是否要在進度條上顯示百分比。
    text                  : false
    # 當數值變動時所會呼叫的回呼函式。
    onChange              : (percent, value, total) =>
    # 當達到成功狀態時所會呼叫的回呼函式。
    onSuccess             : (value, total) =>
    # 當啟用時所會呼叫的回呼函式。
    onActive              : (value, total) =>
    # 當狀態改為錯誤時所會呼叫的回呼函式。
    onError               : (value, total) =>
    # 當呈現為警告狀態時所會呼叫的回呼函式。
    onWarning             : (value, total) =>
    # 當處於緩衝時所會呼叫的回呼函式。
    onBuffering           : (bufferValue, value, total) =>
    # 處於未知狀態時所會呼叫的回呼函式。
    onIndeterminate       : =>
    # 處於準備中所會呼叫的回呼函式。
    onPreparing           : =>
    # 處於已請求但仍未知時所會呼叫的回呼函式。
    onQueriedIndeterminate: =>
    # 當異動開始時所會呼叫的回呼函式。
    onStart               : (value, total) =>
    # 當異動結束、動畫演繹完畢時所會呼叫的回呼函式。
    onEnd                 : (value, total) =>
    # 當進度達到全滿時所會呼叫的回呼函式。
    onComplete            : (total) =>

# 事件名稱。
Event =
    CHANGE               : "change#{EVENT_NAMESPACE}"
    SUCCESS              : "success#{EVENT_NAMESPACE}"
    ACTIVE               : "active#{EVENT_NAMESPACE}"
    ERROR                : "error#{EVENT_NAMESPACE}"
    WARNING              : "warning#{EVENT_NAMESPACE}"
    BUFFERING            : "buffering#{EVENT_NAMESPACE}"
    INDETERMINATE        : "indeterminate#{EVENT_NAMESPACE}"
    PREPARING            : "preparing#{EVENT_NAMESPACE}"
    QUERIED_INDETERMINATE: "queriedindeterminate#{EVENT_NAMESPACE}"
    START                : "start#{EVENT_NAMESPACE}"
    END                  : "end#{EVENT_NAMESPACE}"
    COMPLETE             : "complete#{EVENT_NAMESPACE}"

# 樣式名稱。
ClassName =
    BUFFERING            : 'buffering'
    PREPARING            : 'preparing'
    ACTIVE               : 'active'
    QUERIED_INDETERMINATE: 'queried indeterminate'
    INDETERMINATE        : 'indeterminate'
    SUCCESS              : 'success'
    ERROR                : 'error'
    WARNING              : 'warning'
    BAR                  : 'bar'
    TEXT                 : 'text'
    BUFFER               : 'buffer'

# 選擇器名稱。
Selector =
    BAR   : ':scope > .bar'
    BUFFER: ':scope > .buffer.bar'
    TEXT  : ':scope > .bar > .text'
    DIV   : '<div>'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $bar    = $this.find Selector.BAR
    $buffer = $this.find Selector.BUFFER
    $text   = $this.find Selector.TEXT

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =

        is:
            success: =>
                $this.hasClass ClassName.SUCCESS
            error: =>
                $this.hasClass ClassName.ERROR
            warning: =>
                $this.hasClass ClassName.WARNING
            active: =>
                $this.hasClass ClassName.ACTIVE
            preparing: =>
                $this.hasClass ClassName.PREPARING
            buffering: =>
                $this.hasClass ClassName.BUFFERING
            buffer:
                complete: =>
                    return module.get.buffer.percent() >= 100
            queried:
                indeterminate: =>
                    $this.hasClass ClassName.QUERIED_INDETERMINATE
            indeterminate: =>
                $this.hasClass ClassName.INDETERMINATE
            complete: =>
                return module.get.percent() >= 100

        get:
            text: =>
                return $text.html()
            percent: =>
                return parseInt settings.value / settings.total * 100
            value: =>
                return settings.value
            total: =>
                return settings.total
            buffer:
                percent: =>
                    return settings.buffer.value / settings.total * 100
                value: =>
                    return settings.buffer.value
                bar: =>
                    return $buffer.get()
            bar: =>
                return $bar.get()

        create:
            buffer:
                bar: =>
                    if $buffer.exists()
                        return
                    $buffer = ts Selector.DIV
                        .addClass "#{ClassName.BUFFER} #{ClassName.BAR}"
                        .appendTo element
            bar: =>
                $bar = ts Selector.DIV
                    .addClass ClassName.BAR
                    .appendTo element
            text: =>
                $text = ts Selector.DIV
                    .addClass ClassName.TEXT
                    .appendTo $bar

        repaint:
            bar: =>
                percent = Math.round settings.value / settings.total * 100
                if percent >= 100
                    $bar.css 'width', "100%"
                    if settings.autoSuccess
                        module.set.success()
                        module.remove.warning()
                        module.remove.error()
                    module.trigger.complete()
                else
                    $bar.css 'width', "#{percent}%"
                    if settings.autoSuccess
                        module.remove.success()
                        module.remove.warning()
                        module.remove.error()
                if settings.text is true
                    module.set.text "#{percent}%"
            buffer: =>
                bufferPercent = Math.round settings.buffer.value / settings.total * 100
                if bufferPercent >= 100
                    $buffer.css 'width', "100%"
                else
                    $buffer.css 'width', "#{bufferPercent}%"

        set:
            percent: (percent) =>
                if percent is module.get.percent()
                    return $allModules
                settings.value = Math.round percent / settings.total * 100
                module.repaint.bar()
                module.trigger.change()
                return $allModules
            value: (value) =>
                if value is module.get.value()
                    return $allModules
                settings.value = value
                module.repaint.bar()
                module.trigger.change()
                return $allModules
            increment: (value) =>
                if settings.value is settings.total
                    return $allModules
                settings.value = settings.value + value
                if settings.value > settings.total
                    settings.value = settings.total
                module.repaint.bar()
                module.trigger.change()
                return $allModules
            decrement: (value) =>
                if settings.value is 0
                    return $allModules
                settings.value = settings.value - value
                if settings.value < 0
                    settings.value = 0
                module.repaint.bar()
                module.trigger.change()
                return $allModules
            total: (total) =>
                settings.total = total
                module.repaint.bar()
                return $allModules
            active: =>
                $this.addClass ClassName.ACTIVE
                module.trigger.active()
                return $allModules
            warning: =>
                module.remove.success()
                module.remove.error()
                $this.addClass ClassName.WARNING
                module.trigger.warning()
                return $allModules
            success: =>
                module.remove.warning()
                module.remove.error()
                $this.addClass ClassName.SUCCESS
                module.trigger.success()
                return $allModules
            error: =>
                module.remove.success()
                module.remove.warning()
                $this.addClass ClassName.ERROR
                module.trigger.error()
                return $allModules
            preparing: =>
                module.reset()
                $this.addClass ClassName.PREPARING
                module.trigger.preparing()
                return $allModules
            buffering: =>
                $this.addClass ClassName.BUFFERING
                return $allModules
            buffer:
                percent: (percent) =>
                    if percent is module.get.buffer.percent()
                        return $allModules
                    module.set.buffering()
                    module.create.buffer.bar()
                    settings.buffer.value = Math.round percent / settings.total * 100
                    module.repaint.buffer()
                    module.trigger.buffering()
                    return $allModules
                value: (value) =>
                    if value is module.get.buffer.value()
                        return $allModules
                    module.set.buffering()
                    module.create.buffer.bar()
                    settings.buffer.value = value
                    module.repaint.buffer()
                    module.trigger.buffering()
                    return $allModules
                increment: (value) =>
                    if settings.buffer.value is settings.total
                        return $allModules
                    module.set.buffering()
                    module.create.buffer.bar()
                    settings.buffer.value = settings.buffer.value + value
                    if settings.buffer.value > settings.total
                        settings.buffer.value = settings.total
                    module.repaint.buffer()
                    module.trigger.buffering()
                    return $allModules
                decrement: (value) =>
                    if settings.value is 0
                        return $allModules
                    module.set.buffering()
                    module.create.buffer.bar()
                    settings.buffer.value = settings.buffer.value - value
                    if settings.buffer.value < 0
                        settings.buffer.value = 0
                    module.repaint.buffer()
                    module.trigger.buffering()
                    return $allModules
            indeterminate: =>
                module.reset()
                $this.addClass ClassName.INDETERMINATE
                module.trigger.indeterminate()
                return $allModules
            queried:
                indeterminate: =>
                    module.reset()
                    $this.addClass ClassName.QUERIED_INDETERMINATE
                    module.trigger.queried.indeterminate()
                    return $allModules
            text: (text) =>
                $text.html text
                return $allModules

        remove:
            active: =>
                $this.removeClass ClassName.ACTIVE
                return $allModules
            warning: =>
                $this.removeClass ClassName.WARNING
                return $allModules
            success: =>
                $this.removeClass ClassName.SUCCESS
                return $allModules
            error: =>
                $this.removeClass ClassName.ERROR
                return $allModules
            preparing: =>
                $this.removeClass ClassName.PREPARING
                return $allModules
            buffer: =>
                $this.removeClass ClassName.BUFFERING
                settings.buffer.value = 0
                $buffer.remove()
                return $allModules
            queried:
                indeterminate: =>
                    $this.removeClass ClassName.QUERIED_INDETERMINATE
                    return $allModules
            indeterminate: =>
                $this.removeClass ClassName.INDETERMINATE
                return $allModules

        complete: =>
            module.set.value module.get.total()
            return $allModules

        reset: =>
            module.remove.warning()
            module.remove.success()
            module.remove.error()
            module.remove.active()
            module.remove.buffer()
            module.remove.preparing()
            module.remove.queried.indeterminate()
            module.remove.indeterminate()
            module.set.value 0
            return $allModules

        trigger:
            change: =>
                $this.trigger Event.CHANGE
            success: =>
                $this.trigger Event.SUCCESS
            active: =>
                $this.trigger Event.ACTIVE
            error: =>
                $this.trigger Event.ERROR
            warning: =>
                $this.trigger Event.WARNING
            buffering: =>
                $this.trigger Event.BUFFERING
            indeterminate: =>
                $this.trigger Event.INDETERMINATE
            preparing: =>
                $this.trigger Event.PREPARING
            queried:
                indeterminate: =>
                    $this.trigger Event.QUERIED_INDETERMINATE
            start: =>
                $this.trigger Event.START
            end: =>
                $this.trigger Event.END
            complete: =>
                $this.trigger Event.COMPLETE

        bind:
            events: =>
                $this.on Event.CHANGE, =>
                    debug '發生 CHANGE 事件', element
                    settings.onChange.call context, event
                $this.on Event.SUCCESS, =>
                    debug '發生 SUCCESS 事件', element
                    settings.onSucess.call context, event
                $this.on Event.ACTIVE, =>
                    debug '發生 ACTIVE 事件', element
                    settings.onActive.call context, event
                $this.on Event.ERROR, =>
                    debug '發生 ERROR 事件', element
                    settings.onError.call context, event
                $this.on Event.WARNING, =>
                    debug '發生 WARNING 事件', element
                    settings.onWarning.call context, event
                $this.on Event.BUFFERING, =>
                    debug '發生 BUFFERING 事件', element
                    settings.onBuffering.call context, event
                $this.on Event.INDETERMINATE, =>
                    debug "發生 INDETERMINATE 事件", element
                    settings.onIndeterminate.call context, event
                $this.on Event.PREPARING, =>
                    debug "發生 PREPARING 事件", element
                    settings.onPreparing.call context, event
                $this.on Event.QUERIED_INDETERMINATE, =>
                    debug "發生 QUERIED_INDETERMINATE 事件", element
                    settings.onQueriedIndeterminate.call context, event
                $this.on Event.START, =>
                    debug "發生 START 事件", element
                    settings.onStart.call context, event
                $this.on Event.END, =>
                    debug "發生 END 事件", element
                    settings.onEnd.call context, event
                $this.on Event.COMPLETE, =>
                    debug "發生 COMPLETE 事件", element
                    settings.onComplete.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化進度條', element
            if not $bar.exists()
                module.create.bar()
            if not $text.exists()
                module.create.text()
            module.repaint.bar()
            module.bind.events()

        instantiate: =>
            debug '實例化進度條', element

        refresh: =>
            $bar    = $this.find Selector.BAR
            $text   = $this.find Selector.TEXT
            $buffer = $this.find Selector.BUFFER
            return $allModules

        destroy: =>
            debug '摧毀進度條', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules