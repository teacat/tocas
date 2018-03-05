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
    #
    onAdd: =>
    #
    onRemove: =>
    #
    onChange: =>
    #
    onSearch: =>

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

    source      = []
    destination = []

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =

        get:
            destination:
                value: =>
            source:
                value: =>

        exchange:
            selected:
                item: =>
                    $this.find('.source .items .selected.item').appendTo $this.find('.destination .items')
                    dest = $this.find('.destination .items').get()
                    dest.scrollTop = dest.scrollHeight

                    module.unselect.all()


        reset:
            destination:
                value: =>
            source:
                value: =>

        add:
            destination:
                value: =>
            source:
                value: =>

        set:
            destination:
                value: =>
            source:
                value: =>

        move:
            destination:
                item: (index) =>
            source:
                item: (index) =>

        select:
            value: (value) =>
                $this.find(".items .item[data-value='#{value}']").addClass 'selected'

        unselect:
            value: (value) =>
                $this.find(".items .item[data-value='#{value}']").removeClass 'selected'
            all: =>
                $this.find(".items .selected.item").removeClass 'selected'

        is:
            select: (value) =>
                $this.find(".items .selected.item[data-value='#{value}']").length isnt 0

        bind:
            events: =>
                $this.on Event.CLICK, '.items .item', ->
                    value = ts(@).attr 'data-value'
                    if module.is.select value
                        module.unselect.value value
                    else
                        module.select.value value

                $this.on Event.CLICK, '.ts.button', =>
                    module.exchange.selected.item()


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