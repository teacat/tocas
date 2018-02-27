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

# 事件名稱。
Event =
    OPENING: "opening#{EVENT_NAMESPACE}"
    OPEN   : "open#{EVENT_NAMESPACE}"
    CLOSING: "closing#{EVENT_NAMESPACE}"
    CLOSE  : "close#{EVENT_NAMESPACE}"
    CHANGE : "change#{EVENT_NAMESPACE}"
    CLICK  : "click#{EVENT_NAMESPACE}"

# 樣式名稱。
ClassName =
    ACTIVE   : 'active'
    ANIMATING: 'animating'

# 選擇器名稱。
Selector =
    TITLE         : '.title'
    CONTENT       : '.content'
    ACCORDION     : '.ts.accordion'
    ACTIVE_CONTENT: '.active.content'
    ACTIVE        : '.active'

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

        bind:
            events: =>
                $this.find('.expandable > .expand.control').on 'click', ->
                    $(@).closest('.expandable').toggleClass 'expanded'


        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化表格', element
            module.bind.events()

            if not $this.hasClass "sortable"
                return

            table = element

            $this.find("thead th").each (_, i) ->
                ts(@).on "click", ->
                    isAsc = ts(@).hasClass 'ascending'

                    ts @
                        .closest 'thead'
                        .find 'th'
                        .removeClass 'sorted ascending descending'

                    sortTable = (table, col, reverse) ->
                        tb      = table.tBodies[0]
                        tr      = Array::slice.call(tb.rows, 0)
                        reverse = -((+reverse) || -1)
                        tr      = tr.sort (a, b) ->
                            aContent = a.cells[col].textContent.replace(',', '').trim()
                            bContent = b.cells[col].textContent.replace(',', '').trim()
                            switch
                                when not isNaN aContent
                                    reverse * (+aContent - +bContent)
                                when new Date(aContent).getTime()
                                    reverse * (new Date(aContent) - new Date(bContent))
                                else
                                    reverse * (aContent.localeCompare(bContent))

                        for element in tr
                            tb.appendChild element

                    sortTable table, i, isAsc

                    ts @
                        .addClass(if isAsc then 'sorted descending' else 'sorted ascending')

        instantiate: =>
            debug '實例化表格', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀表格', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules