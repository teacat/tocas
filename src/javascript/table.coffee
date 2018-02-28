# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'table'
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
    # 當行被展開時所會呼叫的回呼函式。
    onRowExpand   : (event, index) =>
    # 當行被閉合時所會呼叫的回呼函式。
    onRowCollapse : (event, index) =>
    # 當垂直排被重新排序時所會呼叫的回呼函式。
    onSort        : (event, order, index) =>

# 排序
Order =
    ASCENDING : 'ascending'
    DESCENDING: 'descending'

# 元素標籤。
Attribute =
    COLSPAN: 'colspan'

# 事件名稱。
Event =
    ROW_EXPAND  : "rowexpand#{EVENT_NAMESPACE}"
    ROW_COLLAPSE: "rowcollapse#{EVENT_NAMESPACE}"
    SORT        : "sort#{EVENT_NAMESPACE}"
    CLICK       : "click#{EVENT_NAMESPACE}"

# 樣式名稱。
ClassName =
    DESCENDING: 'descending'
    ASCENDING : 'ascending'
    EXPANDED  : 'expanded'
    SORTABLE  : 'sortable'
    SORTED    : 'sorted'

# 選擇器名稱。
Selector =
    EXPANDABLE       : 'tr.expandable'
    EXPANDABLE_COLUMN: 'tr.expandable + tr td'
    EXPAND_CONTROL   : 'tr.expandable > td.expand.control'
    ROW              : 'tbody tr'
    HEADER           : 'thead th'
    DESCENDING_HEADER: 'thead th.sorted.descending'
    ASCENDING_HEADER : 'thead th.sorted.ascending'

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
        expand:
            row: (index) =>
                module.get.$row(index).addClass ClassName.EXPANDED
                module.trigger.row.expand index

        collapse:
            row: (index) =>
                module.get.$row(index).removeClass ClassName.EXPANDED
                module.trigger.row.collapse index

        toggle:
            row: (index) =>
                if module.is.expanded index
                    module.collapse.row index
                else
                    module.expand.row index

        sort:
            table: (order, index) =>
                module.get.$header()
                    .removeClass ClassName.SORTED, ClassName.ASCENDING, ClassName.DESCENDING
                tbody   = element.tBodies[0]
                tr      = Array::slice.call tbody.rows, 0
                reverse = -((+(order is Order.ASCENDING)) || -1)
                tr      = tr.sort (a, b) =>
                    a = a.cells[index].textContent.replace(',', '').trim()
                    b = b.cells[index].textContent.replace(',', '').trim()
                    switch
                        when not isNaN a
                            reverse * (+a - +b)
                        when new Date(a).getTime()
                            reverse * (new Date(a) - new Date(b))
                        else
                            reverse * (a.localeCompare b)
                for t in tr
                    tbody.appendChild t
                module.set.sorted  index
                module.set.order   order, index
                module.trigger.sort order, index
            ascending: (index) =>
                module.sort.table Order.ASCENDING, index
                return $allModules
            descending: (index) =>
                module.sort.table Order.DESCENDING, index
                return $allModules

        trigger:
            sort: (order, index) =>
                $this.trigger Event.SORT, module.get.$header(index).get(), order, index
            row:
                expand: (index) =>
                    $this.trigger Event.ROW_EXPAND, module.get.$row(index).get(), index
                collapse: (index) =>
                    $this.trigger Event.ROW_COLLAPSE, module.get.$row(index).get(), index

        is:
            sortable: =>
                $this.hasClass ClassName.SORTABLE
            table: =>
                $this.is 'table'
            expanded: (index) =>
                module.get.$row(index).hasClass ClassName.EXPANDED
            ascending: =>
                $this.find(Selector.ASCENDING_HEADER).length isnt 0
            descending: =>
                $this.find(Selector.DESCENDING_HEADER).length isnt 0

        set:
            sorted: (index) =>
                module.get.$header(index).addClass ClassName.SORTED
            order: (order, index) =>
                $header = module.get.$header index
                switch order
                    when Order.ASCENDING  then $header.addClass ClassName.ASCENDING
                    when Order.DESCENDING then $header.addClass ClassName.DESCENDING
            colspan: (colspan) =>
                $this.find(Selector.EXPANDABLE_COLUMN).attr Attribute.COLSPAN, colspan

        get:
            $header: (index) =>
                if index is undefined
                    $this.find Selector.HEADER
                else
                    $this.find(Selector.HEADER).eq index
            $row: (index) =>
                if index is undefined
                    $this.find Selector.ROW
                else
                    $this.find(Selector.ROW).eq index

        bind:
            events: =>
                $this.on Event.CLICK, Selector.EXPAND_CONTROL, ->
                    debug '發生 EXPAND CLICK 事件', @
                    module.toggle.row ts(@).closest(Selector.EXPANDABLE).index()
                $this.on Event.SORT, (event, context, order, index) =>
                    debug '發生 SORT 事件', context
                    settings.onSort.call context, event, order, index
                $this.on Event.ROW_COLLAPSE, (event, context, index) =>
                    debug '發生 ROW_COLLAPSE 事件', context
                    settings.onRowCollapse.call context, event, index
                $this.on Event.ROW_EXPAND, (event, context, index) =>
                    debug '發生 ROW_EXPAND 事件', context
                    settings.onRowExpand.call context, event, index
            sortable:
                events: =>
                    $this.on Event.CLICK, Selector.HEADER, ->
                        debug '發生 SORTABLE CLICK 事件', @
                        index = ts(@).index()
                        if module.is.ascending()
                            module.sort.descending index
                        else
                            module.sort.ascending index

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化表格', element
            if not module.is.table()
                return
            module.bind.events()
            module.set.colspan 99
            if module.is.sortable()
                module.bind.sortable.events()

        instantiate: =>
            debug '實例化表格', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀表格', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules