手風琴
======

手風琴能夠開關閉合其面板。

    Name = 'Accordion'

設定
---------------

    Settings =
        # 消音所有提示，甚至是錯誤訊息。
        silent        : false
        # 顯示除錯訊息。
        debug         : true
        # 是否僅允許單個手風琴只有一個分頁能被打開。
        exclusive     : true
        # 展開的手風琴是否可以被關閉。
        collapsible   : true
        # 當手風琴被關閉時，是否一同閉合子手風琴。
        closeNested   : true

回呼
---------------

    Callbacks =
        # 當手風琴正在展開時所會呼叫的函式。
        onOpening     : =>
        # 當手風琴展開時所會呼叫的函式。
        onOpen        : =>
        # 當手風琴正在關閉時所會呼叫的函式。
        onClosing     : =>
        # 當手風琴關閉時所會呼叫的函式。
        onClose       : =>
        # 當手風琴被切換開關時所會呼叫的函式。
        onChange      : =>

內部資料
---------------

    Data = {}

模板
---------------

    Template = """
    <div class="ts accordion">
        <template v-for="(item, index) in items">
            <div :key="'title-${index}'" class="title" :class="{'active': item.visible}" @click="toggle(index)">
                <i class="dropdown icon"></i>
                {{ item.title }}
            </div>
            <div :key="'content-${index}'" class="content" :class="{'active': item.visible}">
                {{ item.content }}
            </div>
        </template>
    </div>
    """

對外方法
---------------

    ExportedMethods =
        # open 會打開指定的手風琴。
        open: (index) =>

        # close 會關閉指定的手風琴。
        close: (index) =>

        # closeOthers 會關閉指定手風琴以外的其他手風琴。
        closeOthers: (index) =>


內建方法
---------------

    Methods =
        # toggle 能夠切換一個手風琴，如果手風琴是開的則閉合，反之亦然。
        toggle: (index) ->
            @$data[index].visible = !@$data[index].visible

        # open 能夠打開一個手風琴。
        open : (index) ->
            @$data[index].visible = yes

        # close 能夠關閉一個手風琴。
        close: (index) ->
            @$data[index].visible = no

初始器
---------------

    Initializer = ->
        data = []
        ts(@).find(':scope > .title').each (element) =>
            data.push
                title  : ts(element).html()
                content: ts(element).next().html()
                visible: false

註冊
---------------

    ts.register {
        Name,
        Settings,
        Data,
        Template,
        ExportedMethods,
        Methods,
        Initializer
    }