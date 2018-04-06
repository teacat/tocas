# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'sortable'
# 模組事件鍵名。
EVENT_NAMESPACE  = ".#{NAME}"
# 模組命名空間。
MODULE_NAMESPACE = "module-#{NAME}"



# 滑鼠拖曳出外，回來可以點擊依然可以放到 pull 容器
#
#
#


# 模組設定。
Settings =
    # 消音所有提示，甚至是錯誤訊息。
    silent        : false
    # 顯示除錯訊息。
    debug         : true
    # 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true
    # 指定的拖曳把手選擇器，設置為 `false` 則為整個元素皆可拖曳。
    handle        : false
    # 到拖曳開始之前必須按住的指定毫秒數，避免點擊成為不必要的拖曳。
    delay         : 350
    # 是否能在相同拖放排序內重新排序。
    sort          : true
    # 群組名稱，相同的名稱拖放排序清單可以交替其項目。
    group         : false
    # 此拖放排序的支援模式。（`all` 表示可拖放、`put` 表示僅可放入、`pull` 表示僅可移出、`all` 表示都可）
    mode          : 'all'
    # 這個拖放排序是否已垂直清單為主，改為 `false` 會有利於水平清單。
    vertical      : true
    # 當拖拉開始時所會呼叫的回呼函式。
    onDragStart   : =>
    # 當拖拉途中所會呼叫的回呼函式，間隔是 350 毫秒。
    onDrag        : =>
    # 當拖拉結束並丟下元素時所會呼叫的回呼函式。
    onDrop        : =>
    # 當放下被禁止（如：範圍外、被回呼函式拒絕）時所會呼叫的函式。
    onDeny        : =>
    # 當放下時跟一開始沒有差異時所會呼叫的回呼函式。
    onCancel      : =>
    # 當有變動（新增、移除、重新排序）時所會呼叫的回呼函式。
    onChange      : (valueElement, value) =>
    # 當項目新增時所會呼叫的回呼函式，回傳 `false` 表示不接受此新增。
    onAdd         : (valueElement, value) => console.log(@, valueElement, value)
    # 當項目被移出時所會呼叫的回呼函式。
    onRemove      : (valueElement, value) =>

# 事件名稱。
Event =
    DRAGSTART: "dragstart#{EVENT_NAMESPACE}"
    DRAG     : "drag#{EVENT_NAMESPACE}"
    DROP     : "drop#{EVENT_NAMESPACE}"
    DENY     : "deny#{EVENT_NAMESPACE}"
    CANCEL   : "cancel#{EVENT_NAMESPACE}"
    CHANGE   : "change#{EVENT_NAMESPACE}"
    ADD      : "add#{EVENT_NAMESPACE}"
    REMOVE   : "remove#{EVENT_NAMESPACE}"
    MOUSEMOVE: "mousemove#{EVENT_NAMESPACE}"
    MOUSEUP  : "mouseup#{EVENT_NAMESPACE}"
    MOUSEDOWN: "mousedown#{EVENT_NAMESPACE}"

# 中繼資料名稱。
Metadata =
    X_OFFSET: 'xOffset'
    Y_OFFSET: 'yOffset'
    ENABLE  : 'enable'

# 模式 =
Mode =
    PULL: 'pull'
    PUT : 'put'
    ALL : 'all'

# 順序。
Order =
    AFTER : 'after'
    BEFORE: 'before'

# 元素標籤。
Attribute =
    GROUP           : 'data-draggable-group'
    CONTAINER       : 'data-draggable-container'
    DRAGGABLE       : 'data-draggable'
    DRAGGING        : 'data-draggable-dragging'
    VALUE           : 'data-value'
    GHOST           : 'data-draggable-ghost'
    PLACEHOLDER     : 'data-draggable-placeholder'
    NATIVE_DRAGGABLE: 'draggable'
    HIDDEN          : 'hidden'

# 樣式名稱。
ClassName =
    {}

# 選擇器名稱。
Selector =
    BODY            : 'body'
    NATIVE_DRAGGABLE: "[#{Attribute.NATIVE_DRAGGABLE}]"
    DRAGGING        : "[#{Attribute.DRAGGING}]"
    DRAGGABLE       : "[#{Attribute.DRAGGABLE}]"
    GHOST           : "[#{Attribute.GHOST}]"
    PLACEHOLDER     : "[#{Attribute.PLACEHOLDER}]"
    CONTAINER       : "[#{Attribute.CONTAINER}]"
    PLACEHOLDER     : "[#{Attribute.PLACEHOLDER}]"
    GROUP           : "[#{Attribute.GROUP}]"
    HIDDEN_DRAGGABLE: "[#{Attribute.DRAGGABLE}][#{Attribute.HIDDEN}]"
    TRUE_DRAGGABLE  : "[#{Attribute.DRAGGABLE}]:not([#{Attribute.HIDDEN}])"
    DRAGGABLE_VALUE : (value) => "[#{Attribute.VALUE}='#{value}']"

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $original        = ts()
    $placeholder     = ts()
    draggingTimer    = null
    draggingInterval = 350

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        sort: (values) =>
            for value in values
                $this
                    .find     Selector.DRAGGABLE_VALUE value
                    .appendTo element
            return $allModules

        enable: =>
            $this.data Metadata.ENABLE, true
            return $allModules

        disable: =>
            $this.data Metadata.ENABLE, false
            return $allModules

        start:
            dragging: =>
                draggingTimer = setInterval =>
                    module.trigger.drag()
                , draggingInterval
                $original.attr Attribute.DRAGGING, 'true'

        stop:
            dragging: =>
                clearInterval draggingTimer

        reset:
            dragging: =>
                ts(Selector.DRAGGING).removeAttr Attribute.DRAGGING

        hide:
            original: =>
                $original.attr Attribute.HIDDEN, 'hidden'

        unhide:
            original: =>
                $(Selector.HIDDEN_DRAGGABLE).removeAttr Attribute.HIDDEN

        set:
            group: (name) =>
                $this.attr Attribute.GROUP, settings.group

        get:
            $dragging: =>
                ts Selector.DRAGGING
            $draggable: (element) =>
                ts(element).closest Selector.DRAGGABLE
            last:
                $item: =>
                    $this.find(Selector.DRAGGABLE).last()
            dragging:
                element: =>
                    ts(Selector.HIDDEN_DRAGGABLE).get()
                value: =>
                    ts(Selector.HIDDEN_DRAGGABLE).attr Attribute.VALUE
            container: (element) =>
                ts(element).closest Selector.CONTAINER
            group:
                name: =>
                    $this.attr Attribute.GROUP
            mode: =>
                settings.mode
            sort: =>
                settings.sort
            value: =>
                values = []
                $this
                    .find Selector.DRAGGABLE
                    .each ->
                        value = ts(@).attr Attribute.VALUE
                        values.push value if value
                return values

        is:
            draggable: (element) =>
                ts(element).attr(Attribute.DRAGGABLE) is 'true'
            child: (element) =>
                $this.contains element
            sortable: =>
                settings.sort is true
            vertical: =>
                settings.vertical is true
            enable: =>
                $this.data(Metadata.ENABLE)
            disable: =>
                not $this.data(Metadata.ENABLE)
            same:
                group: ($target) =>
                    $container = module.get.container $target
                    if $container.is element
                        return true
                    name = $container.sortable 'get group name'
                    return name isnt null and name is module.get.group.name()
                container: ($container) =>
                    $container.is element
            handle: (element) =>
                ts(element).is settings.handle

        has:
            dragging: =>
                $this.find(Selector.DRAGGING).exists()
            placeholder: =>
                $this.find(Selector.PLACEHOLDER).exists()
            item: =>
                $this.find(Selector.DRAGGABLE).exists()
            handle: =>
                settings.handle isnt false

        create:
            ghost: (x, y) =>
                $original
                    .clone()
                    .attr Attribute.GHOST, 'true'
                    .data
                        "#{Metadata.X_OFFSET}": x - $original.rect().x
                        "#{Metadata.Y_OFFSET}": y - $original.rect().y
                    .css
                        width : $original.rect().width
                        height: $original.rect().height
                    .appendTo Selector.BODY
            placeholder: =>
                $placeholder = $original
                    .clone()
                    .attr     Attribute.PLACEHOLDER, 'true'
                    .appendTo Selector.BODY

        remove:
            ghost: =>
                ts(Selector.GHOST).remove()
            placeholder: =>
                ts(Selector.PLACEHOLDER).remove()

        move:
            ghost: (x, y) =>
                $ghost = ts Selector.GHOST
                $ghost.css
                    top : y - $ghost.data Metadata.Y_OFFSET
                    left: x - $ghost.data Metadata.X_OFFSET
            placeholder: (x, y) =>
                $pointing  = ts.fromPoint x, y
                $draggable = $pointing.closest Selector.DRAGGABLE
                $container = module.get.container $draggable

                if $draggable.exists()
                    isAllOrSin = y - $draggable.rect().y < $draggable.rect().height / 2
                    isTanOrCos = x - $draggable.rect().x < $draggable.rect().width  / 2
                    isVertical = $container.sortable 'is vertical'
                    if (isAllOrSin and isVertical) or (isTanOrCos and not isVertical)
                        $placeholder.insertBefore $draggable
                    else
                        $placeholder.insertAfter $draggable
                    return

                $container = module.get.container $pointing
                $draggable = $container.find Selector.TRUE_DRAGGABLE

                if not $container.exists()
                    return
                if not $draggable.exists()
                    module.insert.placeholder $container
                    return
                $last = $draggable.last()
                if $last.exists()
                    module.append.placeholder Order.AFTER, $last
            original: =>
                module.get.$dragging().insertAfter ts Selector.PLACEHOLDER

        append:
            placeholder: (order, to) =>
                switch order
                    when Order.BEFORE
                        $placeholder.insertBefore to
                    when Order.AFTER
                        $placeholder.insertAfter to

        insert:
            placeholder: (to) =>
                $placeholder.appendTo to

        trigger:
            dragStart: =>
                $this.trigger Event.DRAGSTART, module.get.dragging.element(), module.get.dragging.value()
            drag: =>
                $this.trigger Event.DRAG, module.get.dragging.element(), module.get.dragging.value()
            drop: =>
                $this.trigger Event.DROP, module.get.dragging.element(), module.get.dragging.value()
            deny: =>
                $this.trigger Event.DENY, module.get.dragging.element(), module.get.dragging.value()
            cancel: =>
                $this.trigger Event.CANCEL, module.get.dragging.element(), module.get.dragging.value()
            change: (valueElement, value) =>
                $this.trigger Event.CHANGE, element, valueElement, value
            add: (valueElement, value) =>
                debug '發生 ADD 事件', element, valueElement, value
                settings.onAdd.call element, valueElement, value
            remove: (valueElement, value) =>
                $this.trigger Event.REMOVE, element, valueElement, value

        unbind:
            mousemove: =>
                ts(Selector.BODY).off Event.MOUSEMOVE

        bind:
            mousemove: =>
                ts(Selector.BODY).on Event.MOUSEMOVE, (event) =>
                    debug '發生 MOUSEMOVE 事件', element, @

                    if module.is.disable()
                        return
                    module.move.ghost event.clientX, event.clientY

                    if not module.has.dragging()
                        return

                    $element   = ts.fromPoint event.clientX, event.clientY
                    $container = module.get.container $element

                    if not module.is.same.group $element
                        return
                    if $container.sortable 'is disable'
                        return

                    hasPlaceholder  = module.has.placeholder()
                    isSortable      = module.is.sortable()
                    isPullContainer = $container.sortable('get mode') is Mode.PULL
                    isSameContainer = module.is.same.container $container

                    switch
                        when isPullContainer
                            return
                        when not isSortable and isSameContainer and hasPlaceholder
                            return

                    $placeholderContainer = module.get.container $placeholder
                    hasContainerItem      = $container.sortable 'has item'
                    isContainerSortable   = $container.sortable 'is sortable'
                    isPutContainer        = $placeholderContainer.sortable('get mode') is Mode.PUT
                    isSortable            = $placeholderContainer.sortable 'is sortable'

                    switch
                        when not isSameContainer and isPutContainer and isSortable
                            return
                        when not isSameContainer and not isContainerSortable
                            if not hasContainerItem
                                module.insert.placeholder $container
                            else
                                module.append.placeholder Order.AFTER, $container.sortable 'get last $item'
                            return
                        when not isSortable and isSameContainer and not hasPlaceholder
                            module.append.placeholder Order.AFTER, $original
                            return

                    module.move.placeholder event.clientX, event.clientY

            events: =>
                $this.on Event.DRAGSTART, (event, context) =>
                    debug '發生 DRAGSTART 事件', context
                    settings.onDragStart.call context, event
                $this.on Event.DRAG, (event, context) =>
                    debug '發生 DRAG 事件', context
                    settings.onDrag.call context, event
                $this.on Event.DROP, (event, context) =>
                    debug '發生 DROP 事件', context
                    settings.onDrop.call context, event
                $this.on Event.DENY, (event, context) =>
                    debug '發生 DENY 事件', context
                    settings.onDeny.call context, event
                $this.on Event.CANCEL, (event, context) =>
                    debug '發生 CANCEL 事件', context
                    settings.onCancel.call context, event
                $this.on Event.CHANGE, (event, context, valueElement, value) =>
                    debug '發生 CHANGE 事件', context, valueElement, value
                    settings.onChange.call context, event, valueElement, value
                $this.on Event.REMOVE, (event, context, valueElement, value) =>
                    debug '發生 REMOVE 事件', context, valueElement, value
                    settings.onRemove.call context, event, valueElement, value

                ts(Selector.BODY).on Event.MOUSEDOWN, (event) =>
                    debug '發生 MOUSEDOWN 事件', element, @
                    if module.is.disable()
                        return

                    $target = ts event.target

                    if module.has.handle() and not module.is.handle $target
                        return
                    if not module.is.draggable $target
                        $target = module.get.$draggable $target
                    switch
                        when not $target.exists()
                            return
                        when not module.is.child $target
                            return
                        when module.get.mode() is Mode.PUT and not module.is.sortable()
                            return
                    $original = $target

                    module.trigger.dragStart()
                    module.start.dragging()
                    module.create.ghost event.clientX, event.clientY
                    module.move.ghost   event.clientX, event.clientY
                    module.create.placeholder()
                    module.move.placeholder event.clientX, event.clientY
                    module.hide.original()
                    module.bind.mousemove()

                ts(Selector.BODY).on Event.MOUSEUP, (event) =>
                    debug '發生 MOUSEUP 事件', element, @
                    if module.is.disable()
                        return

                    module.stop.dragging()
                    module.remove.ghost()
                    module.unbind.mousemove()

                    if not module.has.dragging()
                        return
                    module.trigger.drop()

                    $container = module.get.container event.target

                    if $container.exists() and module.is.same.container $container
                        oldValue = module.get.value().toString()
                        module.move.original()
                        newValue = module.get.value().toString()

                        if oldValue isnt '' or newValue isnt ''
                            if oldValue is newValue
                                module.trigger.cancel()
                            else
                                module.trigger.change()
                    else
                        if $container.sortable 'trigger add'

                            module.move.original()
                            $container.sortable 'trigger change'
                            module.trigger.remove()
                            module.trigger.change()
                        else
                            module.trigger.cancel()
                            module.trigger.deny()

                    module.remove.placeholder()
                    module.unhide.original()
                    module.reset.dragging()

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化拖放排序', element
            module.bind.events()
            module.enable()
            $this
                .attr       Attribute.CONTAINER, true
                .find       Selector.NATIVE_DRAGGABLE
                .removeAttr Attribute.NATIVE_DRAGGABLE
                .attr       Attribute.DRAGGABLE, 'true'
            if settings.group isnt false
                module.set.group settings.group

        instantiate: =>
            debug '實例化拖放排序', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀拖放排序', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules