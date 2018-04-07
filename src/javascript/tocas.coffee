# 主要的選擇器函式。
ts = (selector, context) ->
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
        nodes = ts(selector).find(context).toArray()
    # 如果選擇器是 NodeList 就轉換成元素陣列然後取出來接著繼續。
    else if selector instanceof NodeList
        selector.forEach (element) -> nodes.push(element)
    # 如果選擇器是陣列，就當作是元素陣列，取出來然後繼續。
    # 或傳入的是一個選擇器，就取出裡面的元素然後繼續。
    else if Array.isArray(selector) or selector?.isSelector is true
        nodes    = nodes.concat(selector)
        selector = selector.selector
        context  = selector?.context
    # 如果是單個 DOM 元素，就放入選擇器然後繼續。
    else if selector instanceof HTMLElement     or
            selector instanceof HTMLDocument    or
            selector instanceof HTMLBodyElement or
            selector is window
        nodes = [selector]

    # 保存目前的選擇器文字與上下文選擇器文字。
    nodes.selector = if typeof selector is 'string' then selector else null
    nodes.context  = if typeof context  is 'string' then context  else null
    # 將自訂的選擇器方法插入到節點陣列中，這樣才能夠串連使用。
    Object.defineProperties nodes, ts.fn
    # 將節點陣列標註為是選擇器，這樣才能判斷傳入的是不是我們自己的選擇器。
    Object.defineProperty nodes, 'isSelector',
        value: true
    return nodes

# 註冊到視窗上。
window.ts = ts

# 函式鏈。
ts.fn = {}

# 輔助函式。
ts.helper = {}

# 事件輔助函式。
ts.helper.eventAlias = (event) ->
    pair  = event.split('.')
    alias = if pair[1] isnt undefined then ".#{pair[1]}" else ''

    switch
        when pair.indexOf('animationend') isnt -1
            "webkitAnimationEnd#{alias} mozAnimationEnd#{alias} MSAnimationEnd#{alias} oanimationend#{alias} animationend#{alias}"
        when pair.indexOf('transitionend') isnt -1
            "webkitTransitionEnd#{alias} mozTransitionEnd#{alias} oTransitionEnd#{alias} msTransitionEnd#{alias} transitionend#{alias}"
        else
            event
# 是否為物件。
ts.isPlainObject = (object) ->
    Object.prototype.toString.call(object) is '[object Object]'

# 是否為可觸控裝置。
ts.isTouchDevice = ->
    'ontouchstart' of window or navigator.maxTouchPoints

# 從指定坐標取得元素。
ts.fromPoint = (x, y) =>
    ts(document.elementFromPoint(x, y))

# 延展物件的函式，與 ES 的 `...` 不同之處在於 extend 並不會替換掉整個子物件，而會以補插的方式執行。
# https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
ts.extend =->
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
ts.createElement = (html) =>
    div = document.createElement('div')
    div.innerHTML = html.trim()
    div.firstChild

# 註冊 Tocas 模塊
ts.register = ({NAME, MODULE_NAMESPACE, Settings}, starter) =>
    ts.fn[NAME] = value: (parameters) ->
        $allModules    = ts @
        query          = arguments[0]
        queryArguments = [].slice.call arguments, 1
        methodInvoked  = typeof query is 'string'
        returnedValue  = undefined




        consoleText = (args) =>
            #currentdate = new Date();
            #datetime = "#{currentdate.getFullYear()}/#{(currentdate.getMonth()+1)}/#{currentdate.getDate()}/@#{currentdate.getHours()}:#{currentdate.getMinutes()}:#{currentdate.getSeconds()}"

            "%c#{NAME}%c #{args[0]}"
        headerCSS = """
            background   : #EEE;
            color        : #5A5A5A;
            font-size    : 1em;
            padding      : 8px 8px;
            line-height  : 5px;
            margin       : 5px 0 5px 0;
            border-radius: 1000em;
        """
        errorHeaderCSS = """
            #{headerCSS}
            background: #CE5F58;
            color: #FFF;
        """
        messageCSS = """
            font-weight: bold;
        """


        $allModules.each (_, index) ->
            $this    = ts @
            element  = @
            instance = $this.data MODULE_NAMESPACE
            settings = if ts.isPlainObject(parameters) then ts.extend(Settings, parameters) else ts.extend(Settings)

            debug = ->
                return if not settings.debug or settings.silent
                console.info.call console, consoleText(arguments), headerCSS, messageCSS, "\n", Array.prototype.slice.call(arguments).slice(1)...

            error = ->
                return if settings.silent
                error = Function.prototype.bind.call console.error, console, consoleText(arguments), errorHeaderCSS, messageCSS
                error.apply console, Array.prototype.slice.call(arguments, 1)

            instantiate = =>
                module.instantiate()
                instance = module
                $this.data MODULE_NAMESPACE, instance

            initialize = =>
                module.initialize()
                if settings.observeChanges
                    observeChanges()
                instantiate()

            observeChanges = =>
                if not 'MutationObserver' of window
                    debug '找不到樹狀結構變更觀測者，略過結構監聽動作', element
                    return
                observer = new MutationObserver (mutations) =>
                    #debug 'DOM 樹狀結構已變更，更新快取資料'
                    module.refresh()
                observer.observe element,
                    childList : true
                    subtree   : true
                #debug '已設置 DOM 樹狀結構異動觀察者', observer

            invoke = (query, passedArguments, context) =>
                object          = instance
                maxDepth        = undefined
                found           = undefined
                response        = undefined
                passedArguments = passedArguments or queryArguments
                context         = element or context

                if typeof query is 'string' and object isnt undefined
                    query    = query.split /[\. ]/
                    maxDepth = query.length - 1

                    for value, depth in query
                        camelCaseValue = query
                        if depth isnt maxDepth
                            camelCaseValue = value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)

                        switch
                            when ts.isPlainObject(object[camelCaseValue]) and depth isnt maxDepth
                                object = object[camelCaseValue]
                            when object[camelCaseValue] isnt undefined
                                found = object[camelCaseValue]
                                break
                            when ts.isPlainObject(object[value]) and depth isnt maxDepth
                                object = object[value]
                            when object[value] isnt undefined
                                found = object[value]
                                break
                            else
                                error '欲呼叫的方法並不存在', query
                                break
                switch
                    when typeof found is 'function'
                        response = found.apply context, passedArguments
                    when found isnt undefined
                        response = found
                switch
                    when response is $allModules
                        returnedValue = $allModules
                    else
                        returnedValue = response
                found

            module = starter({$allModules, $this, element, debug, settings, instance, index})

            if methodInvoked
                if instance is undefined
                    initialize()
                invoke query

            else
                if instance isnt undefined
                    invoke 'destroy'
                initialize()

        return if returnedValue isnt undefined then returnedValue else $allModules

# Get
#
# 取得選擇器內的指定元素，並且回傳一個 DOM 元素而非選擇器。
ts.fn.get =
    value: (index = 0) ->
        @[index]

# ToArray
#
# 將選擇器轉換成帶有節點的一般陣列。
ts.fn.toArray =
    value: ->
        array = []
        @forEach (element) ->
            array.push(element)
        return array

# Each
#
# 遍歷整個選擇器陣列。
ts.fn.each =
    value: (callback) ->
        @forEach (element, index) ->
            callback.call(element, element, index)
        @

# CollectSwap
#
# 將收集到的元素替換掉目前選擇器內的所有元素。
ts.fn.collectSwap =
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
        newSelector = ts([...collection])
        # 保存選擇器之前的所有節點。
        Object.defineProperty newSelector, 'prevObject',
            value: @
        # 回傳這個新的選擇器。
        return newSelector

# Eq
#
# 取得選擇器的指定元素，然後繼續回傳僅帶有該元素的選擇器。
ts.fn.eq =
    value: (index) ->
        ts(@get(index))

# Parent
#
# 回傳元素的父元素選擇器。
ts.fn.parent =
    value: ->
        @collectSwap ->
            @parentNode

# Closest
#
# 回傳最接近指定的父元素選擇器。
ts.fn.closest =
    value: (selector) ->
        @collectSwap ->
            @closest(selector)

# Find
#
# 在目前元素中搜尋指定元素並回傳其選擇器。
ts.fn.find =
    value: (selector) ->
        @collectSwap ->
            @querySelectorAll(selector)

# Insert Before
#
# 將選擇器元素安插在指定元素前。
ts.fn.insertBefore =
    value: (target) ->
        @each ->
            ts(target).each (element) =>
                element.parentNode.insertBefore(@, element)

# Insert After
#
# 將選擇器元素安插在指定元素後。
ts.fn.insertAfter =
    value: (target) ->
        @each ->
            ts(target).each (element) =>
                element.parentNode.insertBefore(@, element.nextSibling)

# Wrap
#
# 將元素用指定元素包覆起來。
ts.fn.wrap =
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
ts.fn.clone =
    value: ->
        @collectSwap ->
            @cloneNode(true)

# Append
#
# 將元素插入在目前選擇器元素的內部最後面。
ts.fn.append =
    value: (element) ->
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

# AppendTo
#
# 將目前選擇器元素插入到指定元素的內部最後面。
ts.fn.appendTo =
    value: (selector) ->
        @each ->
            ts(selector).append(@)

# Prepend
#
# 將元素插入在目前選擇器元素的內部最前面。
ts.fn.prepend =
    value: (element) ->
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

# PrependTo
#
# 將目前選擇器元素插入到指定元素的內部最前面。
ts.fn.prependTo =
    value: (selector) ->
        @each ->
            ts(selector).prepend(@)

# Remove
#
# 將選擇器元素從頁面上中移除。
ts.fn.remove =
    value: ->
        @each ->
            @parentNode?.removeChild(@)

# Is
#
# 選擇一些元素，然後用來比對目前的選擇器元素是否在這群當中。
ts.fn.is =
    value: (selector) ->
        isInElements = false
        if selector instanceof HTMLElement
            return @get(0)?.isSameNode(selector)
        @each ->
            ts(selector).each (compareElement) =>
                isInElements = true if @ is compareElement
        return isInElements

# Contains
#
# 是否擁有指定子元素。
ts.fn.contains =
    value: (selector) ->
        @get(0)?.contains(ts(selector).get())

# Exists
#
# 是否存在。
ts.fn.exists =
    value: ->
        @length isnt 0

# Not
#
# 將指定元素從選擇器中剔除。
ts.fn.not =
    value: (selector) ->
        ts @toArray().filter (element) =>
            ts(selector).indexOf(element) is -1


# Slice
#
# 替元素陣列進行切分。
ts.fn.slice =
    value: (from, to) ->
        ts @toArray().slice from, to

# Children
#
# 取得容器裡的第一層子節點。
ts.fn.children =
    value: (selector) ->
        @collectSwap ->
            @querySelectorAll if selector? then ":scope > #{selector}" else ':scope > *'

# Replace With
#
# 將元素替換為指定選擇器元素。
ts.fn.replaceWith =
    value: (selector) ->
        element = ts(selector).get()
        @each ->
            @replaceWith(element)

# Last
#
# 選擇器中的最後一個元素。
ts.fn.last =
    value: () -> @eq(@length-1)

# Next
#
# 下一個元素。
ts.fn.next =
    value: ->
        @collectSwap ->
            @nextElementSibling

# Prev
#
# 上一個元素。
ts.fn.prev =
    value: ->
        @collectSwap ->
            @previousElementSibling

# NextAll
#
# 這個元素之後的所有同階層元素。
ts.fn.nextAll =
    value: (selector) ->
        @collectSwap ->
            $self     = ts(@)
            $parent   = $self.parent()
            $children = if selector? then $parent.find(":scope > #{selector}") else $parent.find(':scope > *')
            index     = $self.index()

            $children.slice index + 1

# PrevAll
#
# 這個元素之前的所有同階層元素。
ts.fn.prevAll =
    value: (selector) ->
        @collectSwap ->
            $self     = ts(@)
            $parent   = $self.parent()
            $children = if selector? then $parent.find(":scope > #{selector}") else $parent.find(':scope > *')
            index     = $self.index()

            $children.slice 0, index

# AddBack
#
# 在目前的選擇器節點陣列中加上先前選擇的所有節點。
ts.fn.addBack =
    value: ->
        if @prevObject
            @prevObject.toArray().forEach (element) => @push(element)
        @

# Index
#
# 該元素在容器內的索引。
ts.fn.index =
    value: ->
        node  = @get(0)
        index = 0

        return -1 if not node?
        index++ while (node = node.previousElementSibling)
        return index

# Attr
#
# 取得或是建立新的標籤到目前的選擇器元素。
ts.fn.attr =
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
ts.fn.removeAttr =
    value: (name) ->
        @each ->
            @removeAttribute name

# AddClass
#
# 在目前選擇器元素插入新的樣式類別名稱。
ts.fn.addClass =
    value: (names) ->
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

# RemoveClass
#
# 移除目前選擇器元素的指定樣式類別。
ts.fn.removeClass =
    value: (names) ->
        if typeof names is 'object'
            newNames = ''
            for name of names
                if names[name] is true
                    newNames += " #{name}"
            names = newNames
        else
            names = Array.prototype.slice.call(arguments).join(' ')
        #console.log @
        @each ->
            DOMTokenList.prototype.remove.apply(@classList, names.split(' ').filter(Boolean))

# ToggleClass
#
# 切換目前選擇器元素的樣式。
ts.fn.toggleClass =
    value: (names) ->
        @each ->
            names.split(' ').forEach (name) ->
                @classList.toggle(name)
            , @

# HasClass
#
# 回傳選擇器元素是否帶有指定樣式類別，是布林值。
ts.fn.hasClass =
    value: (name) ->
        @get(0)?.classList.contains(name)

# CSS
#
# 將選擇器元素套用指定的 CSS 樣式。
ts.fn.css =
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

# Rect
#
# 回傳選擇器元素的渲染形狀。
ts.fn.rect =
    value: ->
        @get(0)?.getBoundingClientRect()

# On
#
# 綁定並註冊一個事件監聽器。
ts.fn.on =
    value: () ->
        switch arguments.length
            # Event 與 Handler。
            when 2
                events  = arguments[0]
                handler = arguments[1]
            # Event 與 Selector 與 Handler。
            # Event 與 Data 與 Handler。
            # Event 與 Handler 與 Options。
            when 3
                events  = arguments[0]
                handler = arguments[2]
                switch typeof arguments[1]
                    when "string"
                        selector = arguments[1]
                    when "function"
                        handler  = arguments[1]
                        options  = arguments[2]
                    else
                        data     = arguments[1]
            # Event 與 Selector 與 Data 與 Handler。
            # Event 與 Selector 與 Handler 與 Options。
            when 4
                events   = arguments[0]
                selector = arguments[1]
                handler  = arguments[3]
                switch typeof arguments[2]
                    when "function"
                        handler  = arguments[2]
                        options  = arguments[3]
                    else
                        data     = arguments[2]
            # Event 與 Selector 與 Data 與 Handler 與 Options。
            when 5
                events   = arguments[0]
                selector = arguments[1]
                data     = arguments[2]
                handler  = arguments[3]
                options  = arguments[4]

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

# One
#
# 綁定一次性的事件監聽器，當被觸發之後就會被移除。
ts.fn.one =
    value: (events, handler) ->
        events = ts.helper.eventAlias(events)

        @each ->
            ts(@).on(events, handler, {once: true})

# Off
#
# 註銷事件監聽器。
ts.fn.off =
    value: (events, handler) ->
        events = ts.helper.eventAlias(events)
        @each ->
            return if @$events is undefined

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

# Trigger
#
# 觸發指定事件。
ts.fn.trigger =
    value: (events) ->
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

# Emulate
#
# 在指定的秒數過後觸發指定事件，若已被觸發則不再次觸發。
# 這能用以強迫讓某個事件發生。
ts.fn.emulate =
    value: (event, duration) ->
        @each ->
            called = false
            ts(@).one event, ->
                called = true
            setTimeout =>
                ts(@).trigger(event) if not called
            , duration

# Text
#
# 變更或取得選擇器元素的內容文字。
ts.fn.text =
    value: (text) ->
        if text isnt undefined then @each -> @innerText = text else @get()?.innerText

# Val
#
# 變更或取得選擇器元素的值。
ts.fn.val =
    value: (value) ->
        if value isnt undefined then @each -> @value = value else @get()?.value

# HTML
#
# 變更或取得選擇器元素的 HTML。
ts.fn.html =
    value: (html) ->
        if html isnt undefined then @each -> @innerHTML = html else @get()?.innerHTML

# Empty
#
# 將選擇器元素的內容清除，例如值或文字。
ts.fn.empty =
    value: ->
        @each ->
            @value     = null if @value     isnt undefined
            @innerHTML = null if @innerHTML isnt undefined
            @innerText = null if @innerText isnt undefined

# Prop
#
# 變更或取得選擇器元素的屬性，例如 `.src`、`.width`。
ts.fn.prop =
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
ts.fn.data =
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
ts.fn.removeData =
    value: (name) ->
        @each ->
            delete @$data[name] if @$data[name]?

# Has Timer
#
# 確認是否有指定的計時器。
ts.fn.hasTimer =
    value: (name) ->
        @get(0)?.$timers?[name]?

# Get Timer
#
# 取得計時器內容。
ts.fn.getTimer =
    value: (name) ->
        @get(0)?.$timers?[name]

# Set Timer
#
# 設置一個新的計時器。
ts.fn.setTimer =
    value: (options) ->
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

# Pause Timer
#
# 暫停一個計時器。
ts.fn.pauseTimer =
    value: (name) ->
        @each ->
            if not @$timers?[name]?
                return
            # 清除計數計時器達到暫停效果。
            clearInterval @$timers[name].timer
            # 表示暫停。
            @$timers[name].paused = true

# Play Timer
#
# 重啟一個計時器。
ts.fn.playTimer =
    value: (name) ->
        @each ->
            if not @$timers?[name]?
                return
            if not @$timers[name].paused
                return

            # 重新初始化計數計時器來達到繼續的效果。
            @$timers[name].timer = setInterval @$timers[name].initializer, 10
            # 表示重新啟動。
            @$timers[name].paused = false

# Remove Timer
#
# 移除一個計時器。
ts.fn.removeTimer =
    value: (name) ->
        @each ->
            if not @$timers?[name]?
                return

            # 清除計數計時器。
            clearInterval @$timers[name].timer
            # 移除在 DOM 元素內的計時器物件。
            delete @$timers[name]

# Repaint
#
# 讓瀏覽器重繪元素。

ts.fn.repaint =
    value: ->
        @each ->
            `void(this.offsetHeight)`