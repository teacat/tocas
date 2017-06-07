# 主要的選擇器函式。
$_ = (selector, context) ->
    nodes           = document.querySelectorAll(selector)
    nodes.__proto__ = Object.assign nodes.__proto__, $_.fn

    return nodes

# 函式鏈。
$_.fn =
    # Get 會取得選擇器內的指定元素，並且回傳一個 DOM 元素而非選擇器。
    get: (index) ->
        return if index in @ then @[index] else null

    # Each 會遍歷整個選擇器陣列。
    each: (callback) ->
        @forEach (element, index) ->
            callback(element, index).call(element)
        @

    # Eq 會取得選擇器的指定元素，然後繼續回傳僅帶有該元素的選擇器。
    eq: (index) ->
        $_(@get(index))

    # Parent 會回傳元素的父元素選擇器。
    parent: (selector) ->
        $_(@get(0)?.parentNode)

    # Closest 會回傳最接近指定的父元素選擇器。
    closest: (selector) ->
        $_(@get(0)?.closest(selector))

    # Find 會在目前元素中搜尋指定元素並回傳其選擇器。
    find: (selector) ->
        $_(@get(0)?.querySelectorAll(selector))

    # Append 會將元素插入在目前選擇器元素的內部最後面。
    append: (element) ->
        @each ->
            @appendChild(element)

    # AppendTo 會將目前選擇器元素插入到指定元素的內部最後面。
    appendTo: (selector) ->
        @each ->
            $_(selector).append(@)

    # Prepend 會將元素插入在目前選擇器元素的內部最前面。
    prepend: (element) ->
        @each ->
            @parentNode.insertBefore(element, @parentNode.firstChild)

    # PrependTo 會將目前選擇器元素插入到指定元素的內部最前面。
    prependTo: (selector) ->
        @each ->
            $_(selector).prepend(@)

    # Remove 會將選擇器元素從頁面上中移除。
    remove: ->
        @each ->
            @parentNode.removeChild(element) if @parentNode isnt null

    # Is 會選擇一些元素，然後用來比對目前的選擇器元素是否在這群當中。
    is: (selector) ->
        compareElements = document.querySelectorAll(selector)
        isInElements    = false

        @each (element) ->
            compareElements.forEach (compareElement) ->
                isInElements is true if element is compareElement

        return isInElements

    # Attr 會取得或是建立新的標籤到目前的選擇器元素。
    attr: (name, value) ->
        if typeof value is 'undefined'
            @each -> @setAttribute name, value
        else
            return if @get(0)? then @get(0).getAttribute(name) else null

    # RemoveAttr 會移除目前選擇器元素的指定標籤。
    removeAttr: (name) ->
        @each ->
            @removeAttribute name

    # AddClass 會在目前選擇器元素插入新的樣式類別名稱。
    addClass: (name) ->
        @each ->
            DOMTokenList.prototype.add.apply(@classList, name.split(' '))

    # RemoveClass 會移除目前選擇器元素的指定樣式類別。
    removeClass: (name) ->
        @each ->
            DOMTokenList.prototype.remove.apply(@classList, name.split(' '))

    # HasClass 會回傳選擇器元素是否帶有指定樣式類別，是布林值。
    hasClass: (name) ->
        $_(@get(0)?.classList.contains(name))

    # CSS 會將選擇器元素套用指定的 CSS 樣式。
    css: (name, value) ->
        # 有 name 也有 value 就設置樣式。
        if typeof name is 'string' and value isnt undefined
            @each -> @style[name] = value
        # 有 name 但沒有 value 就取得樣式。
        else if name is 'string' and value is undefined
            return if @get(0)? then document.defaultView.getComputedStyle(@get(0), null).getPropertyValue(name) else null
        # 有 name 但他是 object，就設置多重樣式。
        else if typeof name is 'object'
            for key of name
                @each -> @style[key] = name[key]
            @

    # On 會綁定並註冊一個事件監聽器。
    on: (event, handler, options) ->

    # One 會綁定一次性的事件監聽器，當被觸發之後就會被移除。
    one: (event, handler) ->

    # Off 會註銷一個事件監聽器。
    off: (event, handler) ->

    # Text 會變更或取得選擇器元素的內容文字。
    text: (text) ->
        @each ->
            @innerText = text if text isnt undefined

    # Val 會變更或取得選擇器元素的值。
    val: (value) ->
        @each ->
            @value = value if value isnt undefined

    # HTML 會變更或取得選擇器元素的 HTML。
    html: (html) ->
        @each ->
            @innerHTML = html if html isnt undefined

    # Empty 會將選擇器元素的內容清除，例如值或文字。
    empty: ->
        @each ->
            if @value isnt undefined
                @value = null
            if @innerHTML isnt undefined
                @innerHTML = null
            if @innerText isnt undefined
                @innerText = null

    # Prop 會變更或取得選擇器元素的屬性，例如 `.src`、`.width`。
    prop: (name, value) ->

    # Data 會在選擇器元素中存放資料，類似 Attr 但頁面不可見。
    data: (name, value) ->
        # 有 name 也有 value 就設置資料。
        if typeof name is 'string' and value isnt undefined
            @each ->
                @$data = {} if @$data is undefined
                @$data[name] = value
        # 有 name 但沒有 value 就取得資料。
        else if name is 'string' and value is undefined
            return if @get(0)?.$data?[name]
        # 有 name 但他是 object，就設置多重樣式。
        else if typeof name is 'object'
            for key of name
                @each ->
                    @$data = {} if @$data is undefined
                    @$data[key] = name[key]
            @