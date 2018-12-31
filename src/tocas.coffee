export class Tocas

    constructor = (selector = '', context = '') ->
        @nodes          = []
        @selector       = selector
        @context        = context
        @previousObject = null

        #
        if selector is ''
            return
        # 如果選擇器是文字，但是是標籤（如：`<div>`）就建立新的元素
        else if typeof selector is 'string' and selector[0] is '<'
            tag   = selector.match(/<(.*)\/>|<(.*)>/)
            @nodes = [document.createElement(tag[1] ? tag[2])]
        # 如果選擇器是一般的文字，就選取元素。
        else if typeof selector is 'string' and context is ''
            document.querySelectorAll(selector).forEach (element) => @nodes.push(element)
        # 如果選擇器有上下文選擇器，就透過選擇器找出上下文元素。
        else if typeof context is 'string'
            @nodes = ts(selector).find(context).toArray()
        # 如果選擇器是 NodeList 就轉換成元素陣列然後取出來接著繼續。
        else if selector instanceof NodeList
            selector.forEach (element) => @nodes.push(element)
        # 如果選擇器是陣列，就當作是元素陣列，取出來然後繼續。
        # 或傳入的是一個選擇器，就取出裡面的元素然後繼續。
        else if Array.isArray(selector) or selector?.isSelector is true
            @nodes    = @nodes.concat(selector)
            @selector = selector.selector
            @context  = selector.context
        # 如果是單個 DOM 元素，就放入選擇器然後繼續。
        else if selector instanceof HTMLElement     or
                selector instanceof HTMLDocument    or
                selector instanceof HTMLBodyElement or
                selector is window
            @nodes = [selector]

    # _alias
    _alias = (event) ->
        pair  = event.split '.'
        alias = if pair[1] isnt undefined then ".#{pair[1]}" else ''

        switch
            when pair.indexOf('animationend') isnt -1
                "webkitAnimationEnd#{alias} mozAnimationEnd#{alias} MSAnimationEnd#{alias} oanimationend#{alias} animationend#{alias}"
            when pair.indexOf('transitionend') isnt -1
                "webkitTransitionEnd#{alias} mozTransitionEnd#{alias} oTransitionEnd#{alias} msTransitionEnd#{alias} transitionend#{alias}"
            else
                event

    # isPlainObject
    isPlainObject = (object) =>
        Object.prototype.toString.call(object) is '[object Object]'

    # isTouchDevice
    isTouchDevice = =>
        'ontouchstart' of window or navigator.maxTouchPoints

    # device
    device = =>
        switch
            when window.innerWidth < 767
                device = 'mobile'
            when window.innerWidth > 767 and window.innerWidth < 991
                device = 'tablet'
            when window.innerWidth > 991 and window.innerWidth < 1199
                device = 'computer'
            when window.innerWidth > 1199 and window.innerWidth < 1919
                device = 'large'
        return {
            device: device
        }

    # fromPoint
    fromPoint = (x, y) =>
        ts document.elementFromPoint x, y

    # extend
    extend =->
        extended = {}
        deep     = true
        i        = 0
        length   = arguments.length
        if Object::toString.call(arguments[0]) == '[object Boolean]'
            deep = arguments[0]
            i++
        merge = (obj) ->
            for prop of obj
                if Object::hasOwnProperty.call(obj, prop)
                    if deep and Object::toString.call(obj[prop]) == '[object Object]'
                        extended[prop] = ts.extend(true, extended[prop], obj[prop])
                    else
                        extended[prop] = obj[prop]
            return
        while i < length
            obj = arguments[i]
            merge obj
            i++
        extended

    # 建立元素
    createElement = (html) =>
        div = document.createElement('div')
        div.innerHTML = html.trim()
        div.firstChild

    # get 會取得選擇器內的指定元素，並且回傳一個 DOM 元素而非選擇器。
    get = (index = 0) ->
        @nodes[index]

    # toArray 將選擇器轉換成帶有節點的一般陣列。
    toArray = ->
        array = []
        @nodes.forEach (element) ->
            array.push(element)
        return array

    # each 遍歷整個選擇器陣列。
    each = (callback) ->
        @nodes.forEach (element, index) ->
            callback.call(element, element, index)
        @

    # collectSwap 將收集到的元素替換掉目前選擇器內的所有元素。
    collectSwap = (callback) ->
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
        newSelector = ts([...collection])
        # 保存選擇器之前的所有節點。
        Object.defineProperty newSelector, 'prevObject',
            value: @
        # 回傳這個新的選擇器。
        return newSelector

    # eq 取得選擇器的指定元素，然後繼續回傳僅帶有該元素的選擇器。
    eq = (index) ->
        ts(@get(index))

    # parent 回傳元素的父元素選擇器。
    parent = ->
        @collectSwap ->
            @parentNode

    # parents 回傳元素的所有父元素直至指定父元素。
    parents = (selector) ->
        @collectSwap (self) ->
            parents         = []
            matchedSelector = false
            while self
                self = self.parentNode
                break if self.nodeType is 9
                parents.push(self)
                if ts(self).equal(selector)
                    matchedSelector = true
                    break
            return [] if selector and not matchedSelector
            return parents

    # closest 回傳最接近指定的父元素選擇器。
    closest = (selector) ->
        @collectSwap ->
            @closest(selector)

    # find 在目前元素中搜尋指定元素並回傳其選擇器。
    find = (selector) ->
        @collectSwap ->
            @querySelectorAll(selector)

    # insertBefore 將選擇器元素安插在指定元素前。
    insertBefore = (target) ->
        @each ->
            ts(target).each (element) =>
                element.parentNode.insertBefore(@, element)

    # insertAfter 將選擇器元素安插在指定元素後。
    insertAfter = (target) ->
        @each ->
            ts(target).each (element) =>
                element.parentNode.insertBefore(@, element.nextSibling)

    # wrap 將元素用指定元素包覆起來。
    wrap = (element) ->
        @each ->
            if @nextSibling
                @parentNode.insertBefore(element, @nextSibling)
            else
                @parentNode.appendChild(element)
            element.appendChild(@)

    # clone 複製元素。
    clone = ->
        @collectSwap ->
            @cloneNode(true)

    # append 將元素插入在目前選擇器元素的內部最後面。
    append = (element) ->
        shouldClone = @length isnt 1
        if element.isSelector isnt undefined
            @each ->
                element.each (e) => @appendChild(if shouldClone then e.cloneNode(true) else e)
        else if typeof element is 'string'
            @each ->
                @insertAdjacentHTML('beforeend', element)
        else
            @each ->
                @appendChild(if shouldClone then element.cloneNode(true) else element)

    # appendTo 將目前選擇器元素插入到指定元素的內部最後面。
    appendTo = (selector) ->
        @each ->
            ts(selector).append(@)

    # prepend 將元素插入在目前選擇器元素的內部最前面。
    prepend = (element) ->
        shouldClone = @length isnt 1
        if element.isSelector isnt undefined
            @each ->
                element.each (e) => @prepend(if shouldClone then e.cloneNode(true) else e)
        else if typeof element is 'string'
            @each ->
                @insertAdjacentHTML('afterbegin', element)
        else
            @each ->
                @prepend(if shouldClone then element.cloneNode(true) else element)

    # prependTo 將目前選擇器元素插入到指定元素的內部最前面。
    prependTo = (selector) ->
        @each ->
            ts(selector).prepend(@)

    # remove 將選擇器元素從頁面上中移除。
    remove = ->
        @each ->
            @parentNode?.removeChild(@)

    # equal 選擇一些元素，然後用來比對目前的選擇器元素是否在這群當中。
    equal = (selector) ->
        isInElements = false
        if selector instanceof HTMLElement
            return @get(0)?.isSameNode(selector)
        @each ->
            ts(selector).each (compareElement) =>
                isInElements = true if @ is compareElement
        return isInElements

    # contains 是否擁有指定子元素。
    contains = (selector) ->
        @get(0)?.contains(ts(selector).get())

    # exists 是否存在。
    exists = ->
        @length isnt 0

    # notEqual 將指定元素從選擇器中剔除。
    notEqual = (selector) ->
        ts @toArray().filter (element) =>
            ts(selector).indexOf(element) is -1

    # filter 將指定元素從選擇器中保留，簡單說就是 `Not` 的相反。
    filter = (selector) ->
        ts @toArray().filter (element) =>
            ts(selector).indexOf(element) isnt -1

    # slice 替元素陣列進行切分。
    slice = (from, to) ->
        ts @toArray().slice from, to

    # children 取得容器裡的第一層子節點。
    children = (selector) ->
        @collectSwap ->
            @querySelectorAll if selector? then ":scope > #{selector}" else ':scope > *'

    # replaceWith 將元素替換為指定選擇器元素。
    replaceWith = (selector) ->
        element = ts(selector).get()
        @each ->
            @replaceWith(element)

    # last 選擇器中的最後一個元素。
    last = () -> @eq(@length-1)

    # next 下一個元素。
    next = ->
        @collectSwap ->
            @nextElementSibling

    # previous 上一個元素。
    previous = ->
        @collectSwap ->
            @previousElementSibling

    # nextAll 這個元素之後的所有同階層元素。
    nextAll = (selector) ->
        @collectSwap ->
            $self     = ts(@)
            $parent   = $self.parent()
            $children = if selector? then $parent.find(":scope > #{selector}") else $parent.find(':scope > *')
            index     = $self.index()

            $children.slice index + 1

    # previousAll 這個元素之前的所有同階層元素。
    previousAll = (selector) ->
        @collectSwap ->
            $self     = ts(@)
            $parent   = $self.parent()
            $children = if selector? then $parent.find(":scope > #{selector}") else $parent.find(':scope > *')
            index     = $self.index()

            $children.slice 0, index

    # addBack 在目前的選擇器節點陣列中加上先前選擇的所有節點。
    addBack = ->
        if @prevObject
            @prevObject.toArray().forEach (element) => @push(element)
        @

    # index 該元素在容器內的索引。
    index = ->
        node  = @get(0)
        index = 0

        return -1 if not node?
        index++ while (node = node.previousElementSibling)
        return index

    # getAttribute 取得或是建立新的標籤到目前的選擇器元素。
    getAttribute = (name, value) ->
        @get()?.getAttribute name

    # setAttribute 設置選擇器元素標籤。
    setAttribute = (name, value) ->
        if typeof name is 'object'
            @each ->
                for key of name
                    @setAttribute key, name[key]
        else
            @each -> @setAttribute name, value

    # removeAttribute 移除目前選擇器元素的指定標籤。
    removeAttribute = (name) ->
        @each -> @removeAttribute name

    # addClass 在目前選擇器元素插入新的樣式類別名稱。
    addClass = (names) ->
        if typeof names is 'object'
            newNames = ''
            for name of names
                if names[name] is true
                    newNames += " #{name}"
            names = newNames
        else
            names = Array.prototype.slice.call(arguments).join(' ')
        @each ->
            DOMTokenList.prototype.add.apply(@classList, names.split(' ').filter(Boolean))

    # removeClass 移除目前選擇器元素的指定樣式類別。
    removeClass = (names) ->
        if typeof names is 'object'
            newNames = ''
            for name of names
                if names[name] is true
                    newNames += " #{name}"
            names = newNames
        else
            names = Array.prototype.slice.call(arguments).join(' ')
        @each ->
            DOMTokenList.prototype.remove.apply(@classList, names.split(' ').filter(Boolean))

    # toggleClass 切換目前選擇器元素的樣式。
    toggleClass = (names) ->
        @each ->
            names.split(' ').forEach (name) ->
                @classList.toggle(name)
            , @

    # hasClass 回傳選擇器元素是否帶有指定樣式類別，是布林值。
    hasClass = (name) ->
        @get(0)?.classList.contains(name)

    # getCSS 取得選擇器元素指定的 CSS 樣式。
    getCSS = (name) ->
        if @get()? then document.defaultView.getComputedStyle(@get(), null).getPropertyValue(name) else null

    # setCSS 將選擇器元素套用指定的 CSS 樣式。
    setCSS = (name, value) ->
        if typeof name is 'object'
            for key of name
                @each -> @style[key] = name[key]
            @
        else
            @each -> @style[name] = value

    # rect 回傳選擇器元素的渲染形狀。
    rect = ->
        r = @get(0)?.getBoundingClientRect()
        return {
            top: r.top,
            right: r.right,
            bottom: r.bottom,
            left: r.left,
            width: r.width,
            height: r.height,
            x: r.x,
            y: r.y
        }

    # bind 綁定並註冊一個事件監聽器。
    bind = (events, handler, options = {once: false}) ->
        @each ->
            ts(@).bindWithOptions({
                events: events
                handler: handler
                options: options
            })

    # bindWithData 綁定並註冊一個帶有自訂資料的事件監聽器。
    bindWithData = (events, data, handler, options = {once: false}) ->
        @each ->
            ts(@).bindWithOptions({
                events: events
                handler: handler
                data: data
                options: options
            })

    # bindWithChild 綁定並註冊一個事件監聽器在父元素，但監聽的是子元素事件。
    bindWithChild = (events, selector, handler, options = {once: false}) ->
        @each ->
            ts(@).bindWithOptions({
                events: events
                handler: handler
                selector: selector
                data: data
                options: options
            })

    # bindWithChildData 綁定並註冊一個帶有自訂資料的事件監聽器在父元素，但監聽的是子元素事件。
    bindWithChildData = (events, selector, data, handler, options = {once: false}) ->
        @each ->
            ts(@).bindWithOptions({
                events: events
                handler: handler
                selector: selector
                data: data
                options: options
            })

    # bindWithOptions 以進階選項綁定並註冊一個事件監聽器。
    bindWithOptions = (options) ->
        {events, handler, selector, data, options} = options
        events = ts.helper.eventAlias(events)

        # $events.click =
        # {
        #     anonymous: [
        #         {
        #             once    : true,
        #             selector: ".button",
        #             data    : {},
        #             func    : func()
        #         }
        #     ]
        #     alias1: [
        #         {
        #             once    : true,
        #             selector: ".button",
        #             data    : {},
        #             func    : func()
        #         }
        #    ]
        # }

        @each ->
            if events[0] is '(' and events[events.length-1] is ')'
                return if @ isnt window
                if window.$media is undefined
                    window.$media = {}
                if window.$media[events] is undefined
                    window.$media[events] = []
                    window.matchMedia(events).addListener (mq) ->
                        for single in window.$media[events]
                            single.func.call @, mq
                window.$media[events].push
                    data: {}
                    func: handler
                return

            return        if @addEventListener is undefined
            @$events = {} if @$events          is undefined

            events.split(' ').forEach (eventName) ->
                event      = eventName.split('.')
                # 透過事件的「event.alias」取得「點」後面的別名。
                hasAlias   = event.length > 1
                eventName  = event[0]
                eventAlias = if hasAlias then event[1] else null

                # 如果事件還沒在這個物件內產生過，就初始化一個事件結構。
                if @$events[eventName] is undefined
                    @$events[eventName] =
                        anonymous: []

                    # 然後建立一個管理多個事件的事件管理處理程式。
                    @addEventListener eventName, (event) ->
                        # 是否有自訂參數。
                        hasArgs     = event.detail?.args?.length > 0
                        # 是否有呼叫事件別名。
                        calledAlias = event.detail?.alias

                        # 如果該事件已經被移除則停止後續的反應。
                        if @$events[eventName] is undefined
                            return

                        # 將被觸發的事件裡面的所有處理程式全部呼叫一次。
                        for alias of @$events[eventName]

                            if calledAlias and calledAlias isnt alias
                                continue

                            index = @$events[eventName][alias].length
                            while index--
                                if @$events[eventName] is undefined
                                    continue
                                if @$events[eventName][alias] is undefined
                                    continue

                                single = @$events[eventName][alias][index]

                                # 設置事件的上下文。
                                context = @
                                # 如果這個事件有選擇器的話，則使用該選擇器為主。
                                if single.selector isnt undefined
                                    selector = single.selector
                                    closest  = ts(event.target).closest(selector)
                                    # 如果找不到指定選擇棄的元素，就不要觸發此事件。
                                    if closest.length is 0
                                        continue
                                    else
                                        # 替換上下文為選擇器元素。
                                        context = closest.get()
                                # 將事件預資料放入事件中供處理函式取得。
                                event.data = single.data

                                if hasArgs
                                    single.func.call(context, event, event.detail.args...)
                                else
                                    single.func.call(context, event)
                                # 如果這個程式只能被呼叫一次就在處理程式呼叫後移除。
                                if single.once is true
                                    @$events[eventName][alias].splice(index, 1)

                # 將新的事件處理程式註冊到事件清單中。
                # 如果有別名，就不要推送到匿名陣列中，我們替這個別名另開物件。
                if hasAlias
                    if @$events[eventName][eventAlias] is undefined
                        @$events[eventName][eventAlias] = []
                    @$events[eventName][eventAlias].push
                        func    : handler
                        selector: selector
                        data    : data
                        once    : options?.once
                # 如果沒有，就照常推進匿名陣列中。
                else
                    @$events[eventName].anonymous.push
                        func    : handler
                        selector: selector
                        data    : data
                        once    : options?.once
            , @

    # bindOnce 綁定一次性的事件監聽器，當被觸發之後就會被移除。
    bindOnce = (events, handler) ->
        events = ts.helper.eventAlias(events)

        @each ->
            ts(@).bindWithOptions(events, handler, {once: true})

    # unbind 註銷事件監聽器。
    unbind = (events, handler) ->
        if events isnt undefined
            events = ts.helper.eventAlias(events)
        @each ->
            if events?[0] is '(' and events[events.length-1] is ')'
                return if @ isnt window
                if window.$media is undefined
                    return
                if window.$media[events] is undefined
                    return
                switch
                    when handler isnt undefined
                        window.$media[events].forEach (item, index) =>
                            if handler is item.func
                                window.$media[events].splice(index, 1)
                    when handler is undefined
                        window.$media[events] = []
                return

            return if @$events is undefined

            if events is undefined
                @$events = {}
                return

            events.split(' ').forEach (eventName) =>
                # 將事件名稱由中間的「.」切成兩半。
                event    = eventName.split('.')
                # 如果事件開頭是「.」符號，表示這是個別名，不是事件名稱。
                isAlias  = eventName[0] is '.'
                # 如果事件分切後有兩個項目，表示這個事件有別名。
                hasAlias = event.length == 2 and event[0] isnt ''
                # 如果有別名的話，取得別名。
                aliasName = event[1] if hasAlias or isAlias
                # 如果此事件不是只有別名的話，取得事件名稱。
                eventName = if not isAlias then event[0] else undefined

                switch
                    # 當有指定監聽函式時。
                    when handler isnt undefined and @$events[eventName] isnt undefined
                        @$events[eventName].anonymous.forEach (item, index) =>
                            if handler is item.func
                                @$events[eventName].anonymous.splice(index, 1)
                    # 當本事件名稱不僅是別名時。
                    when not isAlias and hasAlias and @$events[eventName] isnt undefined
                        # 移除指定事件的別名監聽函式。
                        delete @$events[eventName][aliasName]
                    # 當僅有指定別名時。
                    when isAlias and not hasAlias
                        # 移除所有與此別名有關的事件監聽器。
                        for event of @$events
                            for alias of @$events[event]
                                if aliasName is alias
                                    delete @$events[event][aliasName]
                    # 當僅有指定事件名稱時。
                    when @$events[eventName] isnt undefined
                        # 清空該事件的所有事件監聽器。
                        delete @$events[eventName]
            , @

    # trigger 觸發指定事件。
    trigger = (events) ->
        events          = ts.helper.eventAlias(events)
        customArguments = [].slice.call arguments, 1

        @each ->
            events.split(' ').forEach (eventName) =>
                event = eventName.split('.')
                name  = event[0]
                alias = if event.length > 1 then event[1] else null

                event = new CustomEvent name,
                    detail:
                        args : customArguments
                        alias: alias

                @dispatchEvent event

    # emulate 在指定的秒數過後觸發指定事件，若已被觸發則不再次觸發。
    # 這能用以強迫讓某個事件發生。
    emulate = (event, duration) ->
        @each ->
            called = false
            ts(@).one event, ->
                called = true
            setTimeout =>
                ts(@).trigger(event) if not called
            , duration

    # getText 取得選擇器元素的內容文字。
    getText = () ->
        @get()?.innerText

    # setText 變更選擇器元素的內容文字。
    setText = (text) ->
        @each ->
            @innerText = text

    # getValue 取得選擇器元素的值。
    getValue = (value) ->
        @get()?.value

    # setValue 變更選擇器元素的值。
    setValue = (value) ->
        @each ->
            @value = value

    # getHTML 取得選擇器元素的 HTML。
    getHTML = () ->
        @get()?.innerHTML

    # setHTML 變更選擇器元素的 HTML。
    setHTML = (html) ->
        @each ->
            @innerHTML = html

    # empty 將選擇器元素的內容清除，例如值或文字。
    empty = ->
        @each ->
            @value     = null if @value     isnt undefined
            @innerHTML = null if @innerHTML isnt undefined
            @innerText = null if @innerText isnt undefined

    # getProperty 取得選擇器元素的屬性，例如 `.src`、`.width`。
    getProperty = (name) ->
        @get()?[name]

    # setProperty 變更選擇器元素的屬性，例如 `.src`、`.width`。
    setProperty = (name, value) ->
        if typeof name is 'object'
            for key of name
                @each -> @[key] = name[key]
            @
        else
            @each -> @[name] = value

    # getData 取得選擇器元素的存放資料。
    getData = (name) ->
        @get()?.$data?[name]

    # setData 在選擇器元素中存放資料，類似 Attr 但頁面不可見。
    setData = (name, value) ->
        if typeof name is 'object'
            for key of name
                @each ->
                    @$data      = {} if @$data is undefined
                    @$data[key] = name[key]
            @
        else
            @each ->
                @$data       = {} if @$data is undefined
                @$data[name] = value

    # removeData 移除選擇器元素中的存放資料。
    removeData = (name) ->
        @each ->
            delete @$data[name] if @$data[name]?

    # hasTimer 確認是否有指定的計時器。
    hasTimer = (name) ->
        @get(0)?.$timers?[name]?

    # getTimer 取得計時器內容。
    getTimer = (name) ->
        @get(0)?.$timers?[name]

    # setTimer 設置一個新的計時器。
    setTimer = (options) ->
        setTimeout =>
            options = {
                {
                    name    : ''
                    callback: ->
                    interval: 0
                    looping: false
                    visible: false
                }...
                options...
            }

            @each ->
                if @$timers is undefined
                    @$timers = {}
                if @$timers[options.name] isnt undefined
                    clearInterval @$timers[options.name].timer

                timer = =>
                    # 當設置有說明，頁面不可見的時候就不要繼續計時。
                    if options.visible and document.hidden
                        return
                    # 替計時器加上 10 毫秒。
                    @$timers[options.name].passed += 10
                    # 如果計時器的經過時間還不到使用者設定的時間
                    # 就返回而不要繼續執行。
                    if @$timers[options.name].passed < options.interval
                        return
                    # 呼叫回呼函式。
                    options.callback()
                    # 如果要循環的話，就在計時器執行後重設時間即可。
                    if options.looping
                        @$timers[options.name].passed = 0
                    else
                        # 不然就移除計時器資訊。
                        clearInterval @$timers[options.name]?.timer
                        # 移除在 DOM 元素內的這個計時器物件。
                        #delete @$timers[options.name]

                # 在此元素內初始化計時器物件。
                @$timers[options.name] =
                    timer      : setInterval timer, 10
                    passed     : 0
                    callback   : options.callback
                    interval   : options.interval
                    looping    : options.looping
                    visible    : options.visible
                    initializer: timer
                    paused     : false
        , 0

    # pauseTimer 暫停一個計時器。
    pauseTimer = (name) ->
        @each ->
            if not @$timers?[name]?
                return
            # 清除計數計時器達到暫停效果。
            clearInterval @$timers[name].timer
            # 表示暫停。
            @$timers[name].paused = true

    # playTimer 重啟一個計時器。
    playTimer = (name) ->
        @each ->
            if not @$timers?[name]?
                return
            if not @$timers[name].paused
                return

            # 重新初始化計數計時器來達到繼續的效果。
            @$timers[name].timer = setInterval @$timers[name].initializer, 10
            # 表示重新啟動。
            @$timers[name].paused = false

    # removeTimer 移除一個計時器。
    removeTimer = (name) ->
        @each ->
            if not @$timers?[name]?
                return

            # 清除計數計時器。
            clearInterval @$timers[name].timer
            # 移除在 DOM 元素內的計時器物件。
            delete @$timers[name]

    # repaint 讓瀏覽器重繪元素。
    repaint = ->
        @each ->
            `void(this.offsetHeight)`

    # uniqueID 取得為此元素而產生的獨立編號，若無則建立。
    uniqueID = ->
        id = @get(0).$uniqueID
        if id
            return id
        @get(0).$uniqueID = (Math.random().toString(16) + '000000000').substr(2, 8)
        return @get(0).$uniqueID