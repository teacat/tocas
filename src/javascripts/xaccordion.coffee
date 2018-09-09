# 模組名稱。
Name = 'Accordion'

# 模組設定。
Settings =
    # 是否僅允許單個手風琴只有一個分頁能被打開。
    exclusive  : true
    # 展開的手風琴是否可以被關閉。
    collapsible: true
    # 當手風琴被關閉時，是否一同閉合子手風琴。
    closeNested: true

# 模組回呼函式。
Callbacks =
    # 當手風琴正在展開時所會呼叫的函式。
    onOpening: =>
    # 當手風琴展開時所會呼叫的函式。
    onOpen   : =>
    # 當手風琴正在關閉時所會呼叫的函式。
    onClosing: =>
    # 當手風琴關閉時所會呼叫的函式。
    onClose  : =>
    # 當手風琴被切換開關時所會呼叫的函式。
    onChange : =>

# 內部資料。
Data =
    active: new Set()

# 匯出函式。
Exports =
    toggle: (index) =>
        @toggle index
    open : (index) =>
        @open index
    close: (index) =>
        @close index
    closeChildren: (index) =>
        @close index
    closeAll: (index) =>
        @close index
    closeOthers: (index) =>
        @close index

# 內部方法。
Methods =
    open: (index) =>
        if @Settings.exclusive
            @Data.active.clear()
        @Data.active.add index

    close: (index) =>
        @Data.active.delete index

Updates:
    active: (oldSet, newSet) =>
        if oldSet.has myIndex
            if newSet.has myIndex
                return
            @removeClass 'active'
            @Callbacks.onClose myIndex
        else
            if newSet.has myIndex
                @addClass 'active'
                @Callbacks.onOpen myIndex

Events: =>
    $this.on 'click', '.title', ->
        module.toggle $title.indexOf @


# 生命掛勾。
Lifehooks:
    beforeCreate : =>
    created      : =>
    beforeMount  : =>
    mounted      : =>
    beforeUpdate : =>
    updated      : =>
    beforeDestroy: =>
    destroyed    : =>

ts new Accordion