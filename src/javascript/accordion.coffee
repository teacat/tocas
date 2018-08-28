Template = """
<div class="ts accordion">
    <template v-for="(item, index) in items">
        <div :key="'title-${index}'" class="title">
            <i class="dropdown icon"></i>
            {{ item.title }}
        </div>
        <div :key="'content-${index}'" class="content">
            {{ item.content }}
        </div>
    </template>
</div>
"""

# 模組設定。
Settings =
    # 消音所有提示，甚至是錯誤訊息。
    silent        : false
    # 顯示除錯訊息。
    debug         : true
    # 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true
    # 是否僅允許單個手風琴只有一個分頁能被打開。
    exclusive     : true
    # 展開的手風琴是否可以被關閉。
    collapsible   : true
    # 當手風琴被關閉時，是否一同閉合子手風琴。
    closeNested   : true
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

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register 'accordion', =>
    items = []
    ts @
        .find '.title'
        .each (element, index) =>
            items[] =
                title  : ts(element).html()
                content: ts(element).next('.content').html()

    new Vue ACCORDION
