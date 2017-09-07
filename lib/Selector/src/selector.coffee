# 主要的選擇器函式。
$selector = (selector, context) ->
    nodes = []

    # 如果選擇器是文字，但是是標籤（如：`<div>`）就建立新的元素
    if typeof selector is 'string' and selector[0] is '<'
        tag   = selector.match(/<(.*)\/>|<(.*)>/)
        nodes = [document.createElement(tag[1] ? tag[2])]
    # 如果選擇器是一般的文字，就選取元素。
    else if typeof selector is 'string' and context is undefined
        document.querySelectorAll(selector).forEach (element) -> nodes.push(element)
    # 如果選擇器有上下文選擇器，就透過選擇器找出上下文元素。
    else if typeof context is 'string'
        nodes = $selector(selector).find(context).toArray()
    # 如果選擇器是 NodeList 就轉換成元素陣列然後取出來接著繼續。
    else if selector instanceof NodeList
        selector.forEach (element) -> nodes.push(element)
    # 如果選擇器是陣列，就當作是元素陣列，取出來然後繼續。
    # 或傳入的是一個選擇器，就取出裡面的元素然後繼續。
    else if Array.isArray(selector) or selector?.isSelector is true
        nodes = nodes.concat(selector)
    # 如果是單個 DOM 元素，就放入選擇器然後繼續。
    else if selector instanceof HTMLElement
        nodes = [selector]

    # 保存目前的選擇器文字與上下文選擇器文字。
    nodes.selector = if typeof selector is 'string' then selector else null
    nodes.context  = if typeof context  is 'string' then context  else null
    # 將自訂的選擇器方法插入到節點陣列中，這樣才能夠串連使用。
    Object.defineProperties nodes, $selector.fn
    # 將節點陣列標註為是選擇器，這樣才能判斷傳入的是不是我們自己的選擇器。
    Object.defineProperty nodes, 'isSelector',
        value: true

    return nodes

# 函式鏈。
$selector.fn = {}

# Get
#
# 取得選擇器內的指定元素，並且回傳一個 DOM 元素而非選擇器。
$selector.fn.get =
    value: (index = 0) ->
        @[index]

# ToArray
#
# 將選擇器轉換成帶有節點的一般陣列。
$selector.fn.toArray =
    value: ->
        array = []
        @forEach (element) ->
            array.push(element)
        return array

# Each
#
# 遍歷整個選擇器陣列。
$selector.fn.each =
    value: (callback) ->
        @forEach (element, index) ->
            callback.call(element, element, index)
        @

# CollectSwap
#
# 將收集到的元素替換掉目前選擇器內的所有元素。
$selector.fn.collectSwap =
    value: (callback) ->
        collection = []

        @each (element, index) ->
            result = callback.call(element, element, index)
            if result is undefined or result is null
                return

            if result instanceof NodeList
                result.forEach (el) -> collection.push(el)
            else if Array.isArray result
                collection = collection.concat(result)
            else
                collection.push(result) if collection.indexOf(result) is -1

        # 透過 Set 型態移除重複的節點。
        collection  = new Set collection
        # 然後將 Set 轉換成陣列，建立新的選擇器。
        newSelector = $selector([...collection])
        # 保存選擇器之前的所有節點。
        Object.defineProperty newSelector, 'prevObject',
            value: @
        # 回傳這個新的選擇器。
        return newSelector

# Eq
#
# 取得選擇器的指定元素，然後繼續回傳僅帶有該元素的選擇器。
$selector.fn.eq =
    value: (index) ->
        $selector(@get(index))

# Parent
#
# 回傳元素的父元素選擇器。
$selector.fn.parent =
    value: ->
        @collectSwap ->
            @parentNode

# Closest
#
# 回傳最接近指定的父元素選擇器。
$selector.fn.closest =
    value: (selector) ->
        @collectSwap ->
            @closest(selector)

# Find
#
# 在目前元素中搜尋指定元素並回傳其選擇器。
$selector.fn.find =
    value: (selector) ->
        @collectSwap ->
            @querySelectorAll(selector)

# Wrap
#
# 將元素用指定元素包覆起來。
$selector.fn.wrap =
    value: (element) ->
        @each ->
            if @nextSibling
                @parentNode.insertBefore(element, @nextSibling)
            else
                @parentNode.appendChild(element)
            element.appendChild(@)

# Clone
#
# 複製元素。
$selector.fn.clone =
    value: ->
        @collectSwap ->
            @cloneNode(true)

# Append
#
# 將元素插入在目前選擇器元素的內部最後面。
$selector.fn.append =
    value: (element) ->
        if element.isSelector isnt undefined
            @each ->
                element.each (e) => @appendChild(e)
        else
            @each ->
                @appendChild(element)

# AppendTo
#
# 將目前選擇器元素插入到指定元素的內部最後面。
$selector.fn.appendTo =
    value: (selector) ->
        @each ->
            $selector(selector).append(@)

# Prepend
#
# 將元素插入在目前選擇器元素的內部最前面。
$selector.fn.prepend =
    value: (element) ->
        if element.isSelector isnt undefined
            @each ->
                element.each (e) => @prened(e)
        else
            @each ->
                @prepend(element)

# PrependTo
#
# 將目前選擇器元素插入到指定元素的內部最前面。
$selector.fn.prependTo =
    value: (selector) ->
        @each ->
            $selector(selector).prepend(@)

# Remove
#
# 將選擇器元素從頁面上中移除。
$selector.fn.remove =
    value: ->
        @each ->
            @parentNode?.removeChild(@)

# Is
#
# 選擇一些元素，然後用來比對目前的選擇器元素是否在這群當中。
$selector.fn.is =
    value: (selector) ->
        compareElements = document.querySelectorAll(selector)
        isInElements    = false

        @each ->
            compareElements.forEach (compareElement) ->
                isInElements = true if @ is compareElement
            , @

        return isInElements

# Slice
#
# 替元素陣列進行切分。
$selector.fn.slice =
    value: (from, to) ->
        $selector @toArray().slice from, to

# Children
#
# 取得容器裡的第一層子節點。
$selector.fn.children =
    value: (selector) ->
        @collectSwap ->
            @querySelectorAll if selector? then ":scope > #{selector}" else ':scope > *'

# Next
#
# 下一個元素。
$selector.fn.next =
    value: ->
        @collectSwap ->
            @nextElementSibling

# Prev
#
# 上一個元素。
$selector.fn.prev =
    value: ->
        @collectSwap ->
            @previousElementSibling

# NextAll
#
# 這個元素之後的所有同階層元素。
$selector.fn.nextAll =
    value: (selector) ->
        @collectSwap ->
            $self     = $selector(@)
            $parent   = $self.parent()
            $children = if selector? then $parent.find(":scope > #{selector}") else $parent.find(':scope > *')
            index     = $self.index()

            $children.slice index + 1

# PrevAll
#
# 這個元素之前的所有同階層元素。
$selector.fn.prevAll =
    value: (selector) ->
        @collectSwap ->
            $self     = $selector(@)
            $parent   = $self.parent()
            $children = if selector? then $parent.find(":scope > #{selector}") else $parent.find(':scope > *')
            index     = $self.index()

            $children.slice 0, index

# AddBack
#
# 在目前的選擇器節點陣列中加上先前選擇的所有節點。
$selector.fn.addBack =
    value: ->
        if @prevObject
            @prevObject.toArray().forEach (element) => @push(element)
        @

# Index
#
# 該元素在容器內的索引。
$selector.fn.index =
    value: ->
        node  = @get(0)
        index = 0

        return -1 if not node?
        index++ while (node = node.previousElementSibling)
        return index

# Attr
#
# 取得或是建立新的標籤到目前的選擇器元素。
$selector.fn.attr =
    value: (name, value) ->
        # 如果有 value 就設置簡單鍵值資料。
        if value isnt undefined
            @each -> @setAttribute name, value
        # 如果傳入的是物件就設置多重資料。
        else if typeof name is 'object'
            @each ->
                for key of name
                    @setAttribute key, name[key]
        # 不然就取得資料。
        else
            @get()?.getAttribute name

# RemoveAttr
#
# 移除目前選擇器元素的指定標籤。
$selector.fn.removeAttr =
    value: (name) ->
        @each ->
            @removeAttribute name

# AddClass
#
# 在目前選擇器元素插入新的樣式類別名稱。
$selector.fn.addClass =
    value: (names) ->
        @each ->
            DOMTokenList.prototype.add.apply(@classList, names.split(' ').filter(Boolean))

# RemoveClass
#
# 移除目前選擇器元素的指定樣式類別。
$selector.fn.removeClass =
    value: (names) ->
        @each ->
            DOMTokenList.prototype.remove.apply(@classList, names.split(' ').filter(Boolean))

# ToggleClass
#
# 切換目前選擇器元素的樣式。
$selector.fn.toggleClass =
    value: (names) ->
        @each ->
            names.split(' ').forEach (name) ->
                @classList.toggle(name)
            , @

# HasClass
#
# 回傳選擇器元素是否帶有指定樣式類別，是布林值。
$selector.fn.hasClass =
    value: (name) ->
        @get(0)?.classList.contains(name)

# CSS
#
# 將選擇器元素套用指定的 CSS 樣式。
$selector.fn.css =
    value: (name, value) ->
        # 有 name 也有 value 就設置樣式。
        if typeof name is 'string' and value isnt undefined
            @each -> @style[name] = value
        # 有 name 但沒有 value 就取得樣式。
        else if typeof name is 'string' and value is undefined
            if @get()? then document.defaultView.getComputedStyle(@get(), null).getPropertyValue(name) else null
        # 有 name 但他是 object，就設置多重樣式。
        else if typeof name is 'object'
            for key of name
                @each -> @style[key] = name[key]
            @

# On
#
# 綁定並註冊一個事件監聽器。
$selector.fn.on =
    value: (events, handler, options) ->
        events = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'    if events is 'animationend'
        events = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend' if events is 'transitionend'

        @each ->
            return        if @addEventListener is undefined
            @$events = {} if @$events          is undefined

            events.split(' ').forEach (eventName) ->
                # 如果事件還沒在這個物件內產生過，就初始化一個事件結構。
                if @$events[eventName] is undefined
                    @$events[eventName] = {binded: false, list: []}

                # 如果這個事件還沒被註冊過。
                if @$events[eventName].binded is false
                    # 建立一個管理多個事件的事件管理處理程式。
                    @addEventListener eventName, (event) ->
                        # 如果該事件已經被移除則停止後續的反應。
                        if @$events[eventName] is undefined
                            return
                        # 將被觸發的事件裡面的所有處理程式全部呼叫一次。
                        @$events[eventName].list.forEach (item, index) ->
                            item.func.call(@, event)
                            # 如果這個程式只能被呼叫一次就在處理程式呼叫後移除。
                            if item.once is true
                                @$events[eventName].list.splice(index, 1)
                        , @
                    # 將對應的事件監聽器設置為已綁定。
                    @$events[eventName].binded = true

                # 將新的事件處理程式註冊到事件清單中。
                @$events[eventName].list.push
                    func: handler
                    once: options?.once
            , @

# One
#
# 綁定一次性的事件監聽器，當被觸發之後就會被移除。
$selector.fn.one =
    value: (events, handler) ->
        @each ->
            $selector(@).on(events, handler, {once: true})

# Off
#
# 註銷事件監聽器。
$selector.fn.off =
    value: (events, handler) ->
        @each ->
            events.split(' ').forEach (eventName) =>
                return if @$events            is undefined
                return if @$events[eventName] is undefined

                if handler is undefined
                    @$events[eventName].list = []

                @$events[eventName].list.forEach (item, index) =>
                    if handler is item.func
                        @$events[eventName].list.splice(index, 1)
            , @

# Text
#
# 變更或取得選擇器元素的內容文字。
$selector.fn.text =
    value: (text) ->
        if text isnt undefined then @each -> @innerText = text else @get()?.innerText

# Val
#
# 變更或取得選擇器元素的值。
$selector.fn.val =
    value: (value) ->
        if value isnt undefined then @each -> @value = value else @get()?.value

# HTML
#
# 變更或取得選擇器元素的 HTML。
$selector.fn.html =
    value: (html) ->
        if html isnt undefined then @each -> @innerHTML = html else @get()?.innerHTML

# Empty
#
# 將選擇器元素的內容清除，例如值或文字。
$selector.fn.empty =
    value: ->
        @each ->
            @value     = null if @value     isnt undefined
            @innerHTML = null if @innerHTML isnt undefined
            @innerText = null if @innerText isnt undefined

# Prop
#
# 變更或取得選擇器元素的屬性，例如 `.src`、`.width`。
$selector.fn.prop =
    value: (name, value) ->
        # 有 name 也有 value 就設置屬性。
        if typeof name is 'string' and value isnt undefined
            @each -> @[name] = value
        # 有 name 但沒有 value 就取得屬性。
        else if typeof name is 'string' and value is undefined
            @get()?[name]
        # 有 name 但他是 object，就設置多重屬性。
        else if typeof name is 'object'
            for key of name
                @each -> @[key] = name[key]
            @

# Data
#
# 在選擇器元素中存放資料，類似 Attr 但頁面不可見。
$selector.fn.data =
    value: (name, value) ->
        # 有 name 也有 value 就設置資料。
        if typeof name is 'string' and value isnt undefined
            @each ->
                @$data       = {} if @$data is undefined
                @$data[name] = value
        # 有 name 但沒有 value 就取得資料。
        else if typeof name is 'string' and value is undefined
            @get()?.$data?[name]
        # 有 name 但他是 object，就設置多重樣式。
        else if typeof name is 'object'
            for key of name
                @each ->
                    @$data      = {} if @$data is undefined
                    @$data[key] = name[key]
            @

# Remove Data
#
# 移除指定的資料。
$selector.fn.removeData =
    value: (name) ->
        @each ->
            delete @$data[name] if @$data[name]?