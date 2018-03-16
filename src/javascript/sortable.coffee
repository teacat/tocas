# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'sortable'
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
    # 是否要在抓起時顯示浮起陰影。
    shadow        : true
    # 指定的拖曳把手選擇器，設置為 `false` 則為整個元素皆可拖曳。
    handle        : false
    # 到拖曳開始之前必須按住的指定毫秒數，避免點擊成為不必要的拖曳。
    delay         : 0
    # 是否能在相同拖放排序內重新排序。
    #sort          : true
    # 群組名稱，相同的名稱拖放排序清單可以交替其項目。
    group         : false
    # 此拖放排序的支援模式。（`all` 表示可拖放、`put` 表示僅可放入、`pull` 表示僅可移出、`clone` 表示僅可移出複製）
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

# 樣式名稱。
ClassName =
    {}

# 元素屬性標籤。
Attribute =
    CONTAINER  : 'data-draggable-container'
    DRAGGABLE  : 'data-draggable'
    DRAGGING   : 'data-draggable-dragging'
    VALUE      : 'data-value'
    GHOST      : 'data-draggable-ghost'
    PLACEHOLDER: 'data-draggable-placeholder'
    X_OFFSET   : 'data-draggable-x-offset'
    Y_OFFSET   : 'data-draggable-y-offset'
    HIDDEN     : 'hidden'

# 選擇器名稱。
Selector =
    BODY            : 'body'
    CONTAINER       : "[#{Attribute.CONTAINER}]"
    GHOST           : "[#{Attribute.GHOST}]"
    PLACEHOLDER     : "[#{Attribute.PLACEHOLDER}]"
    DRAGGABLE       : "[#{Attribute.DRAGGABLE}]"
    HIDDEN_DRAGGABLE: "[#{Attribute.DRAGGABLE}][#{Attribute.HIDDEN}]"
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

    $pointing = null
    lastX     = 0
    lastY     = 0
    cacheValue     = []

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        disable: =>
        enable: =>

        get:
            group: =>
                settings.group
            mode: =>
                settings.mode
            pointing:
                group: =>
                    $pointing
                        .closest Selector.CONTAINER
                        .attr    Attribute.CONTAINER
                $container: =>
                    $pointing
                        .closest Selector.CONTAINER
            value: =>
                values = []
                $this
                    .find '[data-draggable]:not([recoverable])'
                    .each ->
                        value = ts(@).attr Attribute.VALUE
                        values.push value if value
                return values
            $ghost: =>
                ts Selector.GHOST
            $draggable: =>
                $pointing.closest Selector.DRAGGABLE
            $dragging: =>
                $this.find Selector.HIDDEN_DRAGGABLE
            draggable:
                amount: =>
                    $this.find(Selector.DRAGGABLE).not('[recoverable]').length
            dragging:
                element: =>
                    module.get.$dragging().get()
                value: =>
                    module.get.$dragging().attr Attribute.VALUE


        is:
            pointing:
                placeholder: =>
                    $pointing.closest(Selector.PLACEHOLDER).length isnt 0
                draggable: =>
                    module.get.$draggable().length isnt 0
                container: =>
                    $pointing.closest(Selector.CONTAINER).length isnt 0

            moving: (x, y) =>
                x isnt lastX or y isnt lastY
            same:
                group: (name) =>
                    name is module.get.group()

        set:
            $pointing: (x, y) =>
                $pointing = ts document.elementFromPoint x, y
                lastX     = x
                lastY     = y

        sort: (values) =>
            for value in values
                $this
                    .find     Selector.DRAGGABLE_VALUE value
                    .appendTo element

        has:
            handle: =>
                settings.handle isnt false
            group: =>
                settings.group isnt false

        move:
            ghost: (x, y) =>
                $ghost = module.get.$ghost()
                $ghost.css
                    top : y - parseInt($ghost.attr(Attribute.Y_OFFSET), 10)
                    left: x - parseInt($ghost.attr(Attribute.X_OFFSET), 10)
            placeholder: (x, y) =>
                if module.is.pointing.placeholder()
                    return
                if not module.is.pointing.draggable()
                    return

                $under = module.get.$draggable()
                rect   = $under.rect()

                xoffset = x - rect.left
                yoffset = y - rect.top

                if $under.prev().length isnt 0 and $under.prev().attr(Attribute.HIDDEN) is undefined and ($under.next().length is 0 or $under.next().attr(Attribute.HIDDEN) isnt undefined)
                    ts(Selector.PLACEHOLDER).insertAfter $under
                else if yoffset < rect.height / 3
                    ts(Selector.PLACEHOLDER).insertBefore $under
                else
                    ts(Selector.PLACEHOLDER).insertAfter $under

        remove:
            placeholder: =>
                ts(Selector.PLACEHOLDER).remove()
            ghost: =>
                ts(Selector.GHOST).remove()

        create:
            ghost: ($original, x, y) =>
                rect = $original.rect()
                $original
                    .clone()
                    .attr Attribute.GHOST   , 'true'
                    .attr Attribute.X_OFFSET, x - rect.left
                    .attr Attribute.Y_OFFSET, y - rect.top
                    .css
                        position: 'fixed'
                        top   : y - (y - rect.top)
                        left  : x - (x - rect.left)
                        width : rect.width
                        height: rect.height
                        margin: 0
                    .appendTo Selector.BODY
            placeholder: ($original) =>
                $original
                    .clone()
                    .removeAttr Attribute.DRAGGABLE
                    .removeAttr Attribute.VALUE
                    .attr Attribute.PLACEHOLDER, 'true'
                    .css
                        opacity: '0.2'
                    .insertAfter $original

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
                #$this.trigger Event.ADD, element, valueElement, value
            remove: (valueElement, value) =>
                $this.trigger Event.REMOVE, element, valueElement, value

        bind:
            events: =>
                $this.on Event.DRAGSTART, (event, context) =>
                    debug '發生 DRAGSTART 事件', context
                    settings.onDragStart.call context, event
                $this.on Event.DRAG, (event, context) =>
                    #debug '發生 DRAG 事件', context
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
                #$this.on Event.ADD, (event, context, valueElement, value) =>
                #    debug '發生 ADD 事件', context, valueElement, value
                #    settings.onAdd.call context, event, valueElement, value
                $this.on Event.REMOVE, (event, context, valueElement, value) =>
                    debug '發生 REMOVE 事件', context, valueElement, value
                    settings.onRemove.call context, event, valueElement, value


                id = null

                mousemove = (event) =>


                    if not module.is.moving event.clientX, event.clientY
                        return


                    module.set.$pointing    event.clientX, event.clientY
                    module.move.ghost       event.clientX, event.clientY

                    group = module.get.pointing.group()
                    if group
                        if group isnt module.get.group()
                            return
                    if module.has.group() and not group
                        return

                    if settings.mode is 'clone'
                        if module.get.pointing.$container().get() isnt element
                            module.move.placeholder event.clientX, event.clientY
                    else
                        module.move.placeholder event.clientX, event.clientY






                ts(Selector.BODY).on 'mousedown', (event) =>
                    module.set.$pointing event.clientX, event.clientY


                    if settings.handle isnt false
                        if not ts(event.target).is(settings.handle)
                            return

                    if settings.mode is 'put'
                        return


                    $draggable = module.get.$draggable()

                    if not $this.contains $draggable
                        return



                    if $draggable.length is 0
                        return

                     $this.attr Attribute.DRAGGING, 'true'

                    module.set.$pointing      event.clientX, event.clientY
                    module.create.ghost       $draggable, event.clientX, event.clientY
                    module.create.placeholder $draggable


                    #if settings.mode is 'clone'
                    #    if module.get.pointing.$container().get() isnt element
                    #        module.create.placeholder $draggable
                    #else
                    #    module.create.placeholder $draggable




                    #if settings.mode isnt 'clone'

                    $draggable.attr 'hidden', 'hidden'


                    module.trigger.dragStart()

                    cacheValue = module.get.value()

                    id = setInterval =>
                        module.trigger.drag()
                    , 350


                    ts('body').on 'mousemove', mousemove


                ts(Selector.BODY).on 'mouseup', (event) =>

                    if not $this.attr(Attribute.DRAGGING)
                        return

                    $this.removeAttr Attribute.DRAGGING

                    ts('body').off 'mousemove', mousemove

                    clearInterval id



                    module.set.$pointing event.clientX, event.clientY

                    point = module.is.pointing.container()


                    if point
                        con = module.get.pointing.$container()
                        v = con.sortable 'get value'
                        x = con.sortable 'get draggable amount'

                    originalValue = module.get.value()
                    originalDraggable = module.get.draggable.amount()


                    module.remove.ghost()
                    ts(Selector.HIDDEN_DRAGGABLE).clone().insertAfter(ts(Selector.HIDDEN_DRAGGABLE)).attr('recoverable', 'true')
                    ts(Selector.HIDDEN_DRAGGABLE).not('[recoverable]').insertAfter(ts(Selector.PLACEHOLDER)).attr('confirmed', 'true').removeAttr('hidden')
                    module.remove.placeholder()

                    module.trigger.drop()


                    if not point
                        return

                    currentValue = module.get.value()

                    currentDraggable = module.get.draggable.amount()

                    module.set.$pointing      event.clientX, event.clientY




                    ok = con.sortable('calculate', v, x, module.trigger.deny)

                    if ok
                        if originalDraggable isnt currentDraggable
                            if originalDraggable > currentDraggable
                                module.trigger.remove()

                            module.trigger.change()






        calculate: (originalValue, amount, deny) =>
            currentValue = module.get.value()
            currentAmount = module.get.draggable.amount() # - 1





            if currentAmount is amount and originalValue.toString() is currentValue.toString()
                if originalValue.toString() is '' and currentValue.toString() is ''
                    return
                module.trigger.cancel()






            if currentAmount isnt amount and (currentValue.length > originalValue.length or currentAmount > amount)
                if module.trigger.add() is false

                    deny()
                    ts('[recoverable]').removeAttr('hidden').removeAttr('recoverable')
                    ts('[confirmed]').remove()
                    ok = false
                else
                    ts('[recoverable]').remove()
                    ts('[confirmed]').removeAttr('confirmed')
                    ok = true
            else
                ts('[recoverable]').remove()
                ts('[confirmed]').removeAttr('confirmed')
                ok = true

            if ok
                if currentAmount isnt amount or originalValue.toString() isnt currentValue.toString()
                    module.trigger.change()

            return ok







        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化拖放排序', element
            module.bind.events()

            if module.has.group()
                $this.attr Attribute.CONTAINER, module.get.group()


        instantiate: =>
            debug '實例化拖放排序', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀拖放排序', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules