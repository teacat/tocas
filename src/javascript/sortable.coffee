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
    # 當項目在相同清單進行重新排序時所會呼叫的回呼函式。
    # onSort        : =>
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



    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        sort: (values) =>
            for value in values
                $this
                    .find     Selector.DRAGGABLE_VALUE value
                    .appendTo element

        enable: =>

        disable: =>

        hide:
            original: (original) =>
                $(original).attr Attribute.HIDDEN, 'hidden'

        unhide:
            original: =>
                $(Selector.HIDDEN_DRAGGABLE).removeAttr Attribute.HIDDEN

        set:
            dragging: (element) =>
                ts(element).attr Attribute.DRAGGING, 'true'
            group: (name) =>
                $this.attr Attribute.GROUP, settings.group

        get:
            $dragging: =>
                ts Selector.DRAGGING
            $placeholder: =>
                ts Selector.PLACEHOLDER
            $original: =>
                ts Selector.HIDDEN_DRAGGABLE
            dragging:
                element: =>
                    ts(Selector.HIDDEN_DRAGGABLE).get()
                value: =>
                    ts(Selector.HIDDEN_DRAGGABLE).attr Attribute.VALUE
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

        reset:
            dragging: =>
                ts(Selector.DRAGGING).removeAttr Attribute.DRAGGING

        is:
            draggable: (element) =>
                ts(element).attr(Attribute.DRAGGABLE) is 'true'
            child: (element) =>
                $this.contains element

        same:
            group: (x, y) =>
                $container = ts
                    .fromPoint x, y
                    .closest   Selector.CONTAINER
                if $container.is element
                    return true
                groupName = $container.sortable 'get group name'
                if groupName is null
                    return false
                return groupName is module.get.group.name()

        has:
            dragging: =>
                $this.find(Selector.DRAGGING).length isnt 0
            placeholder: =>
                $this.find(Selector.PLACEHOLDER).length isnt 0

        create:
            ghost: (original, x, y) =>
                $original = ts original
                rect      = $original.rect()
                $original
                    .clone()
                    .attr Attribute.GHOST, 'true'
                    .data
                        "#{Metadata.X_OFFSET}": x - rect.x
                        "#{Metadata.Y_OFFSET}": y - rect.y
                    .css
                        width : rect.width
                        height: rect.height
                    .appendTo Selector.BODY
            placeholder: (original) =>
                ts original
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

                if $draggable.length is 0
                    $container = $pointing.closest Selector.CONTAINER
                    if $container.length isnt 0
                        if $container.find(Selector.TRUE_DRAGGABLE).length is 0
                            module.insert.placeholder($container)
                            return
                        else
                            rect    = $container.rect()
                            isUpper = y - rect.y < rect.height / 2

                            if not isUpper
                                $last = $container.find(Selector.TRUE_DRAGGABLE).last()
                                if $last.length isnt 0
                                    module.append.placeholder 'after', $last
                                    return

                    return

                rect         = $draggable.rect()
                isUpper      = y - rect.y < rect.height / 2
                isLefter     = x - rect.x < rect.width  / 2
                isFirstChild = $draggable.prev().length is 0
                isDraggingFirstChild = ts(Selector.DRAGGING).prev().length is 0

                if isUpper
                    if isFirstChild or isDraggingFirstChild
                        ts(Selector.PLACEHOLDER).insertBefore $element
                    else
                        ts(Selector.PLACEHOLDER).insertBefore $element
                else
                    ts(Selector.PLACEHOLDER).insertAfter $element



            original: (x, y) =>
                $dragging    = module.get.$dragging()
                $placeholder = module.get.$placeholder()
                $dragging.insertAfter $placeholder

        append:
            placeholder: (order, to) =>
                $placeholder = module.get.$placeholder()
                switch order
                    when 'before'
                        $placeholder.insertBefore to
                    when 'after'
                        $placeholder.insertAfter to
        insert:
            placeholder: (to) =>
                $placeholder = module.get.$placeholder()
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
                #$this.trigger Event.ADD, element, valueElement, value
            remove: (valueElement, value) =>
                $this.trigger Event.REMOVE, element, valueElement, value



        bind:
            mousemove: =>
                ts(Selector.BODY).on Event.MOUSEMOVE, (event) =>
                    #debug '發生 MOUSEMOVE 事件', element, @

                    module.move.ghost event.clientX, event.clientY


                    if not module.has.dragging()
                        return





                    if not module.same.group event.clientX, event.clientY
                        return


                    $element = ts.fromPoint event.clientX, event.clientY



                    $container = $element.closest(Selector.CONTAINER)



                    isSameNode = $container.is(element)
                    hasPlaceholder = module.has.placeholder()

                    if $container.sortable('get mode') is 'pull'
                        return

                    if not settings.sort and isSameNode and hasPlaceholder
                        return


                    $placeholderContainer = ts(Selector.PLACEHOLDER).closest(Selector.CONTAINER)


                    if not isSameNode and $placeholderContainer.sortable('get mode') is 'put' and  $placeholderContainer.sortable('get sort') is 'true'
                        return


                    if not isSameNode and $container.sortable('get sort') is 'false'
                        if $container.find(Selector.DRAGGABLE).length is 0
                            module.insert.placeholder $container
                        else
                            $lastDraggable = $container.find(Selector.DRAGGABLE).last()
                            module.append.placeholder 'after', $lastDraggable
                        return

                    if not settings.sort and isSameNode and not hasPlaceholder
                        module.append.placeholder 'after', module.get.$original()
                        return


                    module.move.placeholder event.clientX, event.clientY



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
                $this.on Event.REMOVE, (event, context, valueElement, value) =>
                    debug '發生 REMOVE 事件', context, valueElement, value
                    settings.onRemove.call context, event, valueElement, value

                id = null



                ts(Selector.BODY).on Event.MOUSEDOWN, (event) =>
                    #debug '發生 MOUSEDOWN 事件', element, @

                    target = event.target


                    if settings.handle isnt false
                        if not ts(target).is(settings.handle)
                            return


                    draggable = ts(target).closest(Selector.DRAGGABLE)



                    if not module.is.draggable(target)
                        if draggable.length is 0
                            return
                        else
                            target = draggable


                    if not module.is.child target
                       return



                    if settings.mode is 'put' and not settings.sort
                        return


                    module.trigger.dragStart()

                    id = setInterval =>
                        module.trigger.drag()
                    , 350




                    module.create.ghost  target , event.clientX, event.clientY
                    module.create.placeholder target
                    module.move.ghost event.clientX, event.clientY
                    module.move.placeholder event.clientX, event.clientY
                    module.set.dragging  target
                    module.hide.original target
                    module.bind.mousemove()






                ts(Selector.BODY).on Event.MOUSEUP, (event) =>
                    debug '發生 MOUSEUP 事件', element, @

                    clearInterval id

                    module.remove.ghost()





                    ts(Selector.BODY).off Event.MOUSEMOVE

                    if not module.has.dragging()
                        return

                    module.trigger.drop()




                    $container = ts(event.target).closest(Selector.CONTAINER)

                    if $container.length isnt 0
                        isSameNode = $container.is(element)
                    else
                        isSameNode = false

                    if isSameNode
                        oldValue = module.get.value()

                        module.move.original()


                        newValue = module.get.value()

                        if oldValue.toString() isnt '' or newValue.toString() isnt ''
                            if oldValue.toString() is newValue.toString()
                                module.trigger.cancel()
                            else
                                module.trigger.change()

                    else
                        allowed = $container.sortable('trigger add')


                        if allowed
                            module.move.original()

                            $container.sortable('trigger change')

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
            $this
                .find       Selector.NATIVE_DRAGGABLE
                .removeAttr Attribute.NATIVE_DRAGGABLE
                .attr       Attribute.DRAGGABLE, 'true'
                .attr       Attribute.CONTAINER, true
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