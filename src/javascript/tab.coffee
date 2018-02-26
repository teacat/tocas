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
    onFirstLoad   : (tabName, groupName) =>
    # 當分頁被開啟時所會呼叫的回呼函式。
    onLoad        : (tabName, groupName) =>
    # 當分頁被切換時所會呼叫的回呼函式
    onSwitch      : (tabName, groupName) =>
    # HTML5 的 state 基礎路徑。
    path          : false
    # 是否紀錄 HTML5 的 state 分頁籤異動至瀏覽器瀏覽紀錄供上下頁返回與切換。
    history       : false
    # 欲採用何種分頁籤手法？可用：`hash` 或 `state`。
    historyType   : 'hash'

# 事件名稱。
Event =
    FIRSTLOAD : "firstload#{EVENT_NAMESPACE}"
    LOAD      : "load#{EVENT_NAMESPACE}"
    SWITCH    : "switch#{EVENT_NAMESPACE}"
    CLICK     : "click#{EVENT_NAMESPACE}"
    HASHCHANGE: "hashchange#{EVENT_NAMESPACE}"

# 標籤名稱。
Attribute =
    GROUP: 'data-tab-group'
    TAB  : 'data-tab'

# 樣式名稱。
ClassName =
    ACTIVE: 'active'

# 選擇器名稱。
Selector =
    GROUP_TABS      : (group)       => ".tab[#{Attribute.GROUP}='#{group}']"
    GROUP_TAB       : (name, group) => ".tab[#{Attribute.TAB}='#{name}'][#{Attribute.GROUP}='#{group}']"
    TAB             : (name)        => ".tab[#{Attribute.TAB}='#{name}']"
    ANY_TAB         : '.tab'
    MENU_GROUP_ITEMS: (group)       => ".menu .item[#{Attribute.GROUP}='#{group}']"
    MENU_GROUP_ITEM : (name, group) => ".menu .item[#{Attribute.TAB}='#{name}'][#{Attribute.GROUP}='#{group}']"
    MENU_ITEM       : (name)        => ".menu .item[#{Attribute.TAB}='#{name}']"
    ITEM            : '.item'

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
        hideOthers: (name, group) =>
            if group is undefined
                module.get.menuItems.except(name).each ->
                    ts @
                        .removeClass ClassName.ACTIVE
                    ts Selector.TAB module.get.name @
                        .removeClass ClassName.ACTIVE
            else
                ts Selector.MENU_GROUP_ITEMS group
                    .not         Selector.MENU_GROUP_ITEM name, group
                    .removeClass ClassName.ACTIVE
                ts Selector.GROUP_TABS group
                    .not         Selector.GROUP_TAB name, group
                    .removeClass ClassName.ACTIVE

        show: (name, group) =>
            if group is undefined
                ts Selector.MENU_ITEM name
                    .addClass ClassName.ACTIVE
                ts Selector.TAB name
                    .addClass ClassName.ACTIVE
            else
                ts Selector.MENU_GROUP_ITEM name, group
                    .addClass ClassName.ACTIVE
                ts Selector.GROUP_TAB name, group
                    .addClass ClassName.ACTIVE

        change:
            tab: (name, group) =>
                module.show       name, group
                module.hideOthers name, group

        is:
            tab: =>

        store:
            path: (name, group) =>
                module.parse.hash (hashName, hashGroup) =>
                    if hashGroup is group
                        return false
                    else
                        return true
                module.add.hash name, group

        has:
            group: (element) =>
                module.get.group(element) isnt null

        get:
            name: (element) =>
                ts(element).attr Attribute.TAB
            group: (element) =>
                ts(element).attr Attribute.GROUP
            path: =>
                path = []
                getParent = (element) =>

                    name  = module.get.name  element
                    group = module.get.group element
                    path.push "#{group}/#{name}"

                    $parentTab = ts(element).parent().closest('[data-tab]')

                    if $parentTab.length isnt 0
                        getParent($parentTab.get())


                getParent(element)
                return path.reverse().join(',')
            hash: =>
                decodeURIComponent window.location.hash[1..]
            menuItems:
                except: (name) =>
                    ts Selector.MENU_ITEM name
                        .parent()
                        .find Selector.ITEM
                        .not  Selector.MENU_ITEM name

        set:
            state: =>
            hash: (hash) =>
                setTimeout ->
                    history.pushState null, null, "##{decodeURIComponent(hash)}"
                , 0

        add:
            hash: (name, group) =>
                module.set.hash("#{module.get.hash()},#{group}/#{name}")

        parse:
            hash: (callback) =>
                if not window.location.hash
                    return
                hash = decodeURIComponent window.location.hash[1..]
                    .split ','
                    .filter (value) =>
                        parsed = value.split '/'
                        name   = parsed[1]
                        group  = parsed[0]
                        return callback name, group
                #module.set.hash hash

        apply:
            hash: =>
                module.parse.hash (name, group) =>
                    module.change.tab name, group
                    true

        bind:
            events: =>
                $this.on Event.CLICK, ->
                    name = module.get.name @
                    if module.has.group @
                        group = module.get.group @
                        module.change.tab name, group
                        module.store.path name, group
                    else
                        module.change.tab name
                ts(window).on 'popstate', =>
                    module.parse.hash (name, group) =>
                        module.change.tab name, group
                        true

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化分頁籤', element
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