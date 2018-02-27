# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'tab'
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
    # 當分頁第一次開啟時所會呼叫的回呼函式。
    onFirstLoad   : (tabName) =>
    # 當分頁被開啟時所會呼叫的回呼函式。
    onLoad        : (tabName) =>
    # 是否要紀錄分頁籤的開關歷程至瀏覽器的上下頁歷程中。
    history       : true

# 中繼資料名稱。
Metadata =
    LOADED : 'loaded'

# 事件名稱。
Event =
    FIRSTLOAD : "firstload#{EVENT_NAMESPACE}"
    LOAD      : "load#{EVENT_NAMESPACE}"
    CLICK     : "click#{EVENT_NAMESPACE}"
    HASHCHANGE: "hashchange#{EVENT_NAMESPACE}"
    POPSTATE  : "popstate#{EVENT_NAMESPACE}"

# 標籤名稱。
Attribute =
    GROUP: 'data-tab-group'
    TAB  : 'data-tab'

# 樣式名稱。
ClassName =
    ACTIVE: 'active'
    TAB   : 'tab'

# 選擇器名稱。
Selector =
    TAB             : (name) => ".tab[#{Attribute.TAB}='#{name}']"
    ANY_TAB         : '.tab[data-tab]'
    ACTIVE_TAB      : '.active.tab[data-tab]'
    HIDDEN_TAB      : '.tab[data-tab]:not(.active)'
    MENU            : '.menu'
    MENU_ITEM       : (name) => ".menu .item[#{Attribute.TAB}='#{name}']"
    ITEM            : '.item'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings, index}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    separator = ','

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        change:
            tab: (name, recursive=true, update=true) =>
                name  = module.decode name
                paths = if recursive then ts(Selector.TAB(name)).tab('get paths') else [name]

                for path in paths
                    $item = ts Selector.MENU_ITEM path
                    $tab  = ts Selector.TAB       path
                    $tab.tab  'set active'
                    $item
                        .tab 'set active'
                        .tab 'hide others'
                    if $item.tab 'not loaded'
                        $item
                            .trigger Event.FIRSTLOAD, $tab.get(), path
                            .tab     'set loaded', true
                    $item.trigger Event.LOAD, $tab.get(), path

                if update
                    module.update.hash()

                return $allModules

        hide:
            others: =>
                $items = module.get.relative.$items()
                $items.tab 'set hidden'
                $items.each ->
                    ts @
                        .tab 'get $tab'
                        .tab 'set hidden'

        get:
            name: =>
                $this.attr Attribute.TAB
            paths: =>
                paths   = []
                $parent = $this
                until $parent.length is 0
                    paths.push $parent.tab 'get name'
                    $parent  = $parent.tab 'get parent $tab'
                paths
            active:
                $tab: =>
                    ts(Selector.ACTIVE_TAB)
            relative:
                $items: =>
                    $this
                        .closest  Selector.MENU
                        .find     Selector.ITEM
                        .not      $this
            parent:
                $tab:
                    $this.parent().closest Selector.ANY_TAB
            tab: =>
                module.get.$tab().get()
            $tab: =>
                ts Selector.TAB module.get.name()
            path: =>
                module.get.paths().join separator
            hash: =>
                hash = window.location.hash
                return if hash then module.decode(hash[1..]) else ''

        decode: (uri) =>
            decodeURIComponent uri

        has:
            hash: =>
                not not window.location.hash
            parent:
                tab: =>
                    $this.parent().closest(Selector.ANY_TAB).length isnt 0
            hidden:
                parent: =>
                    $this.closest(Selector.HIDDEN_TAB).length isnt 0
            active:
                children: =>
                    $this.find(Selector.ACTIVE_TAB).length isnt 0

        set:
            loaded: (bool) =>
                $this.data Metadata.LOADED, bool
            hidden: =>
                $this.removeClass ClassName.ACTIVE
            active: =>
                $this.addClass ClassName.ACTIVE

        is:
            active: =>
                $this.hasClass ClassName.ACTIVE
            tab: =>
                $this.hasClass ClassName.TAB
            loaded: =>
                $this.data(Metadata.LOADED) is true

        not:
            loaded: =>
                not module.is.loaded()

        apply:
            hash: =>
                setTimeout ->
                    if not module.has.hash()
                        return
                    hash = module.get.hash()
                    if module.same.hash hash
                        return
                    hash.split   separator
                        .forEach (value) =>
                            module.change.tab value, true, false
                , 0

        update:
            hash: =>
                hash = []
                module.get.active.$tab().each ->
                    $tab = ts @
                    if $tab.tab 'has hidden parent'
                        return
                    if $tab.tab 'has active children'
                        return
                    hash.push $tab.tab 'get name'

                hash = "##{hash.join(separator)}"
                if settings.history
                    history.pushState null, null, hash
                else
                    history.replaceState null, null, hash

        same:
            hash: (hash) =>
                same = true
                hash.split   separator
                    .forEach (value) =>
                        if not same
                            return
                        if ts(Selector.TAB(value)).tab 'has hidden parent'
                            same = false
                return same

        bind:
            events: =>
                $this.on Event.CLICK, =>
                    return if module.is.active()
                    module.change.tab module.get.name(), false
                $this.on Event.FIRSTLOAD, (event, context, name) =>
                    debug '發生 FIRSTLOAD 事件', context, name
                    settings.onFirstLoad.call context, event, name
                $this.on Event.LOAD, (event, context, name) =>
                    debug '發生 LOAD 事件', context, name
                    settings.onLoad.call context, event, name
                $this.attr 'href', 'javascript:void(0)'

                if not settings.history
                    return
                ts(window)
                    .off Event.POPSTATE
                    .on  Event.POPSTATE, =>
                        debug '發生 POPSTATE 事件', window
                        module.apply.hash()

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化分頁籤', element
            if module.is.tab()
                return
            module.bind.events()
            module.apply.hash()

        instantiate: =>
            debug '實例化分頁籤', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀分頁籤', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules