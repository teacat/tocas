# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'transfer'
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
    # 當值移動時所會呼叫的回呼函式。
    onMove: (values, to) =>
    # 當值有所移動、新增或移除時所會呼叫的函式。
    onChange: (value) =>
    # 當值被選取時所會呼叫的函式。
    onSelect: (value) =>
    # 當值被取消選取時所會呼叫的函式。
    onUnselect: (value) =>
    # 搜尋時所會呼叫的函式。
    onSearch: =>

# 事件名稱。
Event =
    CHANGE  : "change#{EVENT_NAMESPACE}"
    SELECT  : "select#{EVENT_NAMESPACE}"
    UNSELECT: "unselect#{EVENT_NAMESPACE}"
    MOVE    : "move#{EVENT_NAMESPACE}"
    SEARCH  : "search#{EVENT_NAMESPACE}"
    CLICK   : "click#{EVENT_NAMESPACE}"

# 元素屬性標籤。
Attribute =
    VALUE: 'data-value'

# 目標
TARGET =
    DESTINATION: 'destination'
    SOURCE     : 'source'

# 樣式名稱。
ClassName =
    ITEM    : 'item'
    ADD     : 'add'
    SELECTED: 'selected'

# 選擇器名稱。
Selector =
    DESTINATION_ITEMS        : '.destination.list .items'
    DESTINATION_ITEM         : '.destination.list .items .item'
    DESTINATION_SELECTED_ITEM: '.destination.list .items .selected.item'
    SOURCE_ITEMS             : '.source.list .items'
    SOURCE_ITEM              : '.source.list .items .item'
    SOURCE_SELECTED_ITEM     : '.source.list .items .selected.item'
    ANY_ITEM                 : '.items .item'
    ACTION_BUTTON            : '.ts.add.button, .ts.remove.button'
    ITEM                     : (value) => ".items .item[data-value='#{value}']"
    SELECTED_ITEM            : (value) => ".items .selected.item[data-value='#{value}']"

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

        get:
            values: (from) =>
                values = []
                switch from
                    when TARGET.DESTINATION
                        $item = $this.find Selector.DESTINATION_ITEM
                    when TARGET.SOURCE
                        $item = $this.find Selector.SOURCE_ITEM
                $item.each ->
                    values.push ts(@).attr Attribute.VALUE
                return values
            selected: (from) =>
                selected = []
                switch from
                    when TARGET.DESTINATION
                        $item = $this.find Selector.DESTINATION_SELECTED_ITEM
                    when TARGET.SOURCE
                        $item = $this.find Selector.SOURCE_SELECTED_ITEM
                $item.each ->
                    selected.push ts(@).attr Attribute.VALUE
                return selected
            destination:
                values: =>
                    module.get.values TARGET.DESTINATION
                selected: =>
                    module.get.selected TARGET.DESTINATION
            source:
                values: =>
                    module.get.values TARGET.SOURCE
                selected: =>
                    module.get.selected TARGET.SOURCE
            $item: (value) =>
                $this.find Selector.ITEM value

        create:
            $value: (value, text) =>
                ts '<div>'
                    .html     text
                    .addClass ClassName.ITEM
                    .attr     Attribute.VALUE, value

        add:
            destination:
                value: (value, text) =>
                    module.add.value TARGET.DESTINATION, value, text
                    return $allModules
            source:
                value: (value, text) =>
                    module.add.value TARGET.SOURCE, value, text
                    return $allModules
            value: (to, value, text) =>
                switch to
                    when TARGET.DESTINATION
                        $targetItems = $this.find Selector.DESTINATION_ITEMS
                    when TARGET.SOURCE
                        $targetItems = $this.find Selector.SOURCE_ITEMS
                if Array.isArray value
                    for item in value
                        if module.has.value item.value
                            continue
                        $targetItems.append module.create.$value item.value, item.text
                else
                    if module.has.value value
                        return
                    $targetItems.append module.create.$value value, text
                module.scroll.toBottom $targetItems
                module.trigger.change value

        has:
            value: (value) =>
                module.get.$item(value).length isnt 0

        remove:
            value: (value) =>
                if Array.isArray value
                    for item in value
                        module.get.$item(item).remove()
                else
                    module.get.$item(value).remove()
                module.trigger.change value
                return $allModules

        set:
            destination:
                value: (values) =>
                    $this
                        .find Selector.DESTINATION_ITEM
                        .remove()
                    module.add.destination.value value
                    return $allModules
            source:
                value: (values) =>
                    $this
                        .find Selector.SOURCE_ITEM
                        .remove()
                    module.add.source.value value
                    return $allModules

        scroll:
            toBottom: ($items) =>
                items           = $items.get()
                items.scrollTop = items.scrollHeight
            destination:
                toBottom: =>
                    module.scroll.toBottom $this.find Selector.DESTINATION_ITEMS
            source:
                toBottom: =>
                    module.scroll.toBottom $this.find Selector.SOURCE_ITEMS

        move:
            values: (to, values) =>
                if not Array.isArray values
                    values = [values]
                if values.length is 0
                    return
                switch to
                    when TARGET.DESTINATION
                        $targetItems = $this.find Selector.DESTINATION_ITEMS
                    when TARGET.SOURCE
                        $targetItems = $this.find Selector.SOURCE_ITEMS
                for value in values
                    ts(Selector.ITEM(value)).appendTo $targetItems
                    module.unselect.value value
                module.scroll.toBottom $targetItems
                module.trigger.move   values, to
                module.trigger.change values
            to:
                destination: (value) =>
                    module.move.values TARGET.DESTINATION, value
                    return $allModules
                source: (value) =>
                    module.move.values TARGET.SOURCE, value
                    return $allModules

        select:
            value: (value) =>
                module.get.$item(value).addClass ClassName.SELECTED
                module.trigger.select value
                return $allModules
            destination:
                all: =>
                    $this
                        .find Selector.DESTINATION_ITEM
                        .each ->
                            module.select.value ts(@).attr Attribute.VALUE
                    return $allModules
            source:
                all: =>
                    $this
                        .find Selector.SOURCE_ITEM
                        .each ->
                            module.select.value ts(@).attr Attribute.VALUE
                    return $allModules

        unselect:
            value: (value) =>
                module.get.$item(value).removeClass ClassName.SELECTED
                module.trigger.unselect value
                return $allModules
            all: =>
                module.unselect.destination.all()
                module.unselect.source.all()
                return $allModules
            destination:
                all: =>
                    $this
                        .find Selector.DESTINATION_ITEM
                        .each ->
                            module.unselect.value ts(@).attr Attribute.VALUE
                    return $allModules
            source:
                all: =>
                    $this
                        .find Selector.SOURCE_ITEM
                        .each ->
                            module.unselect.value ts(@).attr Attribute.VALUE
                    return $allModules

        is:
            selected: (value) =>
                $this.find(Selector.SELECTED_ITEM(value)).length isnt 0

        trigger:
            change: (value) =>
                $this.trigger Event.CHANGE, element, value
            select: (value) =>
                $this.trigger Event.SELECT, element, value
            unselect: (value) =>
                $this.trigger Event.UNSELECT, element, value
            move: (values, to) =>
                $this.trigger Event.MOVE, element, values, to

        bind:
            events: =>
                $this.on Event.CHANGE, (event, context, value) =>
                    debug "發生 CHANGE 事件", context, value
                    settings.onChange.call context, event, value
                $this.on Event.SELECT, (event, context, value) =>
                    debug "發生 SELECT 事件", context, value
                    settings.onSelect.call context, event, value
                $this.on Event.UNSELECT, (event, context, value) =>
                    debug "發生 UNSELECT 事件", context, value
                    settings.onUnselect.call context, event, value
                $this.on Event.MOVE, (event, context, values, to) =>
                    debug "發生 MOVE 事件", context, values, to
                    settings.onMove.call context, event, values, to
                $this.on Event.CLICK, Selector.ANY_ITEM, ->
                    debug "發生 CLICK 事件", @
                    value = ts(@).attr Attribute.VALUE
                    if module.is.selected value
                        module.unselect.value value
                    else
                        module.select.value value
                $this.on Event.CLICK, Selector.ACTION_BUTTON, ->
                    debug "發生 BUTTON CLICK 事件", @
                    if ts(@).hasClass ClassName.ADD
                        module.move.to.destination module.get.source.selected()
                    else
                        module.move.to.source module.get.destination.selected()

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化穿梭框', element
            module.bind.events()

        instantiate: =>
            debug '實例化穿梭框', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀穿梭框', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules