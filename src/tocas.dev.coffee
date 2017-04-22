Tocas = (->
  ts = undefined
  emptyArray = []
  slice = emptyArray.slice
  filter = emptyArray.filter
  queue = []
  tocas = {}
  isArray = Array.isArray or (obj) ->
    obj instanceof Array

  isObject = (obj) ->
    obj instanceof Object

  isEmptyOrWhiteSpace = (str) ->
    str == null or str.match(/^\s*$/) != null

  dropzoneNumber = 0

  ###* Filter those thing which is we don't need it ###

  compact = (array) ->
    filter.call array, (item) ->
      item != null

  tocas.init = (selector, context) ->
    dom = undefined

    ###* If Selector is a normal string ###

    if typeof selector == 'string'
      if selector[0] == '<'
        return tocas.fragment(selector)

      ###* Remove the space ###

      selector = selector.trim()
      if typeof context != 'undefined'
        return ts(selector).find(context)
      dom = tocas.select(document, selector)
    else if tocas.isTocas(selector)
      return selector
    else

      ###* Filter for eq function ###

      if isArray(selector)
        dom = compact(selector)
      else if isObject(selector)
        dom = [ selector ]
        selector = null
    tocas.Tocas dom, selector

  tocas.fragment = (selector) ->
    noContent = /^<([^\/].*?)>$/
    regEx = /(?:<)(.*?)( .*?)?(?:>)/
    match = regEx.exec(selector)
    mainAll = match[0]
    mainElement = match[1]
    mainAttrs = match[2]
    hasAttr = typeof mainAttrs != 'undefined'
    hasContent = !mainAll.match(noContent)

    ###* Is this tag IS a container tag? (ex: div, section) ###

    if hasContent

      ###* Catch the content of it ###

      contentRegEx = new RegExp(mainAll + '(.*?)(?:</' + mainElement + '>)$')
      contentMatch = contentRegEx.exec(selector)
      content = contentMatch[1]

    ###* Split Attrs into an array like this [KEY, VALUE, KEY, VALUE] ###

    if hasAttr
      attrs = mainAttrs.split(/(?:\s)?(.*?)=(?:"|')(.*?)(?:"|')/).filter(Boolean)
      attrObj = {}

      ###* Get odd and even values, convert [KEY, VALUE, KEY, VALUE] to {KEY: VALUE, KEY: VALUE} ###

      i = 0
      while i < attrs.length
        if (i + 2) % 2 == 0
          attrObj[attrs[i]] = attrs[i + 1]
        i++
    $element = ts(document.createElement(mainElement))
    if hasAttr
      $element.attr attrObj
    if hasContent
      $element.html content
    $element

  tocas.isTocas = (obj) ->
    obj instanceof tocas.Tocas

  tocas.select = (element, selector) ->
    try
      return slice.call(element.querySelectorAll(selector))
    catch e
      console.log 'TOCAS ERROR: Something wrong while selecting ' + selector + ' element.'
    return

  tocas.Tocas = (dom, selector) ->
    dom = dom or []
    dom.__proto__ = ts.fn
    dom.selector = selector or ''
    dom

  ###*
  # $
  #
  # Call to Init to get everything ready.
  ###

  ts = (selector, context) ->
    if typeof selector == 'function'
      document.addEventListener 'DOMContentLoaded', selector
    else
      return tocas.init(selector, context)
    return

  ###*
  # Library
  ###

  ts.fn =
    each: (callback) ->
      emptyArray.every.call this, (index, element) ->
        callback.call(index, element, index) != false
      this
    slice: ->

      ###* Regenerate a new object ###

      ts slice.apply(this, arguments)
    eq: (index) ->
      @slice index, index + 1
  if !window.ts
    window.ts = ts
  return
)(Tocas)

ts.fn.on = (eventName, selector, handler, once) ->
  once = once or false
  hasSelector = true
  if typeof selector != 'string'
    hasSelector = false
    handler = selector
  if typeof handler != 'function'
    once = handler

  ###*
  # [ts_eventHandler]
  #
  #        registered   :bool
  #      /
  # Click      func :func
  #      \   /
  #       [0] 
  #          \
  #            once :bool         
  ###

  @each ->
    if typeof @addEventListener == 'undefined'
      console.log 'TOCAS ERROR: Event listener is not worked with this element.'
      return false

    ###* If the main event list of the element is not existed, we create one ###

    if typeof @ts_eventHandler == 'undefined'
      @ts_eventHandler = {}

    ###* Split the event by space ###

    events = eventName.split(' ')
    for i of events
      event = events[i]

      ###* If the event handler list is not existed, we create an object, we will store function in here ###

      ###* so if someone triggered the event, we can just call this list. ###

      if typeof @ts_eventHandler[event] == 'undefined'
        @ts_eventHandler[event] =
          registered: false
          list: []

      ###* Bind if haven't bind yet ###

      if @ts_eventHandler[event].registered == false
        @addEventListener event, (evt) ->

          ###* Just make sure this event still existed ###

          if typeof @ts_eventHandler[event] != 'undefined'

            ###* Execute all of the functions ###

            for e of @ts_eventHandler[event].list

              ###* If there's a selector ###

              if typeof @ts_eventHandler[event].list[e].selector != 'undefined'
                inSelector = false

                ###* If this element is in the selector, then we set InSelector as true ###

                ts(@ts_eventHandler[event].list[e].selector).each (i, el) ->
                  if evt.target == el
                    inSelector = true
                  return

                ###* We won't call this function if this elements which is triggered is not in the selector ###

                if !inSelector
                  return

              ###* Execute ###

              @ts_eventHandler[event].list[e].func.call this, evt

              ###* If "once" is true, we remove it after call it ###

              if @ts_eventHandler[event].list[e].once
                delete @ts_eventHandler[event].list[e]
          return
        @ts_eventHandler[event].registered = true

      ###* Push handler or anonymous function into that event list ###

      eventHandler = @ts_eventHandler[event].list
      data = 
        func: handler
        once: once

      ###* Store the selector if there's selector ###

      if hasSelector
        data.selector = selector

      ###* Store the function info###

      eventHandler.push data
      @ts_eventHandler[event].list = eventHandler
    return

ts.fn.one = (eventName, selector, handler) ->
  @each ->

    ###* Set "once" true, it will auto remove once we call it ###

    ts(this).on eventName, selector, handler, true
    return

ts.fn.off = (eventName, handler) ->
  @each ->

    ###* No list no talk ###

    if typeof @ts_eventHandler == 'undefined'
      return
    if typeof @ts_eventHandler[eventName] == 'undefined'
      return

    ###* If there's no handler name, we remove all handler ###
    console.log handler
    if typeof handler is 'undefined'
      @ts_eventHandler[eventName].list = []
      return

    ###* Otherwise we search for the index of function, then remove it ###

    for e of @ts_eventHandler[eventName].list
      if handler == @ts_eventHandler[eventName].list[e].func
        delete @ts_eventHandler[eventName].list[e]
    return

###*
# CSS
#
# Set CSS to elements or get CSS from elements.
#
# @param mixed      property   Can be a object and the key as the css property, and the value as the property value.
# @param int|string value      The value of the css property.
#
# @return mixed
###

ts.fn.css = (property, value) ->
  css = ''

  ###* Set single CSS : If CSS and content is not empty, then set the CSS ###

  if property != null and value != null
    css = property + ':' + value + ';'
  else if typeof property == 'object' and !Array.isArray(property) and value == null
    for i of property
      if property.hasOwnProperty(i)
        css += i + ':' + property[i] + ';'
  else if Array.isArray(property) and value == null
    cssObject = {}
    @each ->
      `var i`
      for i of property
        cssObject[property[i]] = ts(this).getCss(property[i])
      return
    return cssObject
  else if property != null and value == null
    return ts(this).getCss(property)
  @each ->
    if typeof @style == 'undefined'
      return
    @style.cssText = @style.cssText + css
    return

###*
# Has Class
#
# Returns true when the class(es) does exist.
#
# @param string classes   The class name, can be a list split by the space.
#
# @return bool
###

ts.fn.hasClass = (classes) ->
  if 0 of this
    if @[0].classList
      return @[0].classList.contains(classes)
    else
      return new RegExp('(^| )' + classes + '( |$)', 'gi').test(@[0].className)
  return

###*
# Class List
#
# Returns a class list of the element.
#
# @return array
###

ts.fn.classList = ->
  `var i`
  classes = []
  if 0 of this
    if @[0].classList
      i = 0
      while i < @[0].classList.length
        classes.push @[0].classList[i]
        i++
    else
      for i of @[0].className.split(' ')
        classes.push @[0].className.split(' ')[i]
  classes

###*
# Add Class
#
# Add a single or multiple classes to an element.
#
# @param string classes   The name of the class, can be a list split by space.
#
# @return object
###

ts.fn.addClass = (classes) ->
  if classes == null
    return
  @each ->
    list = classes.split(' ')
    for i of list
      if list[i] == ''
        i++
        continue
      if @classList
        @classList.add list[i]
      else
        @className += ' ' + list[i]
    return

###*
# Remove Class
#
# Remove a single or multiple classes of the element.
#
# @param string classes   The name of the class can be a list split by the space.
#
# @return object
###

ts.fn.removeClass = (classes) ->
  @each ->
    if !classes
      @className = ''
    else
      list = classes.split(' ')
      for i of list
        if list[i] == ''
          i++
          continue

        ###* If there's classList, the just remove it from classList, otherwise we replace the string which is in the (class="")###

        if @classList
          @classList.remove list[i]
        else if typeof @className != 'undefined'
          @className = @className.replace(new RegExp('(^|\\b)' + classes.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    return

###*
# Toggle Class
#
# Toggle a single or multiple classes, add the class when the class is not existed, and remove the class when it does exist.
#
# @param string classes   The name of the class, can be a list split by the space.
#
# @return object
###

ts.fn.toggleClass = (classes) ->
  @each ->
    list = undefined
    index = undefined
    objClassList = undefined
    list = classes.split(' ')
    for i of list
      if @classList
        @classList.toggle list[i]
      else

        ###* Split the class ###

        objClassList = @className.split(' ')

        ###* Is the class in class list already? ###

        index = list.indexOf(list[i])

        ###* If already existed, we remove it, otherwise we add it ###

        if index >= 0
          objClassList.splice index, 1
        else
          objClassList.push list[i]
        @className = list[i].join(' ')
    return

###*
# Get CSS
###

ts.fn.getCss = (property) ->

  ###* Get computed style ###

  try
    return if 0 of this then document.defaultView.getComputedStyle(@[0], null).getPropertyValue(property) else null
  catch err
    return null
  return

ts.fn.remove = ->
  @each ->
    @parentNode.removeChild this
    return

ts.fn.children = ->
  list = []
  @each (i, el) ->

    ###* Push the child nodes to the list###

    list.push.apply list, el.children
    return

  ###* Return the list with $ ###

  ts list

ts.fn.find = (selector) ->

  ###* The selector must be string ###

  if typeof selector != 'string'
    return null
  list = []
  @each (i, el) ->

    ###* Push the child nodes to the list###

    list.push.apply list, el.querySelectorAll(selector)
    return

  ###* Return the list with $ ###

  if list.length then ts(list) else null

###*
# Parent
###

ts.fn.parent = ->
  if 0 of this then ts(@[0].parentNode) else null

ts.fn.parents = (selector) ->
  `var selector`
  `var selector`
  that = this
  selector = selector or null
  parents = []
  if selector != null
    selector = ts(selector)

  ###* Non stop loop, until there's no parent of the element ###

  while that

    ###* Not this one, we go upper ###

    that = ts(that).parent()[0]

    ###* No parent? ###

    if !that
      break

    ###* Push to the parents list if it's in the selector or just push it if we don't set a selector ###

    if selector == null or selector != null and Array::indexOf.call(selector, that) != -1
      parents.push that
  ts parents

ts.fn.closest = (selector) ->
  `var selector`
  that = this
  selector = ts(selector)

  ###* Non stop loop, until there's no parent of the element ###

  loop

    ###* Not this one, we go upper ###

    that = ts(that).parent()[0]

    ###* No parent? ###

    if !that
      return null

    ###* Is the parent in the closest selector? If it do, then the parent is the closest element which we want ###

    if Array::indexOf.call(selector, that) != -1
      return ts(that)
  return

ts.fn.contains = (wants) ->
  selector = ts(wants)
  isTrue = false
  @each (i, el) ->
    children = el.childNodes
    si = 0
    while si < selector.length
      if Array::indexOf.call(children, selector[si]) != -1
        isTrue = true
      si++
    return
  isTrue

###*
# Attr
#
# Add a attribute to an element.
#
# @param string attr    The name of the attribute.
# @param mixed  value   The value of the attribute.
#
# @return mixed
###

ts.fn.attr = (attr, value) ->
  value = if value == null then null else value

  ###* Set multiple Attr if Attr is object ###

  if typeof attr == 'object' and !value
    return @each(->
      for i of attr
        @setAttribute i, attr[i]
      return
    )
  else if attr != null and typeof value != 'undefined'
    return @each(->
      @setAttribute attr, value
      return
    )
  else if attr != null and !value
    return if 0 of this then @[0].getAttribute(attr) else null
  return

###*
# Remove Attr
# 
# Remove an attribute from an element.
# 
# @param string attr   The name of the attribute.
# 
# @return object
###

ts.fn.removeAttr = (attr) ->
  @each ->
    @removeAttribute attr
    return

# ---
# generated by js2coffee 2.2.0

animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

###
Get the quadrant of the given element.
###

quadrant = (el) ->
    position   = el.getBoundingClientRect()
    width      = window.innerWidth
    widthHalf  = width / 2
    height     = window.innerHeight
    heightHalf = height / 2

    if position.left < widthHalf and position.top < heightHalf
        return 2
    else if position.left < widthHalf && position.top > heightHalf
        return 3
    else if position.left > widthHalf && position.top > heightHalf
        return 4
    else if position.left > widthHalf && position.top < heightHalf
        return 1

# Z indexes.
z_dropdownMenu    = 9
z_dropdownActive  = 10
z_dropdownHovered = 11
#
slider_trackColor    = "#DDD"
slider_progressColor = "rgb(150, 150, 150)"

###
Expand the dropdown menu.
###

expandDropdown = (target) ->
    ts target
        .css 'z-index', z_dropdownActive
        .removeClass 'hidden'
        .addClass 'visible'
        .addClass 'animating'
        .one animationEnd, ->
            ts target
                .removeClass 'animating'

###
Contract the dropdown menu.
###

contractDropdown = (target) ->
    ts target
        .css 'z-index', z_dropdownMenu
        .removeClass 'visible'
        .addClass 'hidden'
        .addClass 'animating'
        .one animationEnd, ->
            ts target
                .removeClass 'animating'

###
Expand or contract the dropdown.
###

detectDropdown = (target, event) ->
    isDropdown        = ts(target).hasClass('dropdown')
    isDropdownText    = ts(event.target).hasClass('text')
    isDropdownIcon    = ts(event.target).hasClass('icon')
    isDropdownImage   = ts(event.target).hasClass('image')
    hasDropdownParent = ts(event.target).parent().hasClass('dropdown')
    parentIsItem      = ts(event.target).parent().hasClass('item')
    targetIsDropdown  = ts(event.target).hasClass('dropdown')
    isItem            = ts(event.target).hasClass('item')
    isTsMenuItem      = ts(event.target).closest('.ts.menu')

    if (isTsMenuItem and isDropdown and parentIsItem      and targetIsDropdown) or
       (isTsMenuItem and isDropdown and !parentIsItem     and targetIsDropdown) or
       (isTsMenuItem and isDropdown and hasDropdownParent and parentIsItem)
        expandDropdown target

    else if (isDropdown and isItem) or (isDropdown and parentIsItem)
        contractDropdown '.ts.dropdown.visible'

    else if isDropdown and isTsMenuItem
        expandDropdown target

    else if isDropdown and targetIsDropdown
        expandDropdown target

    else if isDropdown and isDropdownIcon and hasDropdownParent
        expandDropdown target

    else if isDropdown and isDropdownImage and hasDropdownParent
        expandDropdown target

    else if isDropdown and isDropdownText and hasDropdownParent
        expandDropdown target

###
Document click event listener.
###

ts(document).on 'click', (event) ->
    if ts(event.target).closest('.dropdown:not(.basic)') is null and !ts(event.target).hasClass('dropdown')
        contractDropdown '.ts.dropdown:not(.basic).visible'

###
The dropdown function.
###

ts.fn.dropdown = (command) ->
    @each ->
        ts(@).on 'click', (e) ->
            pa = ts(@)[0]

            if quadrant pa is 2
                ts(@).removeClass('upward downward leftward rightward').addClass('downward rightward')
            else if quadrant pa is 3
                ts(@).removeClass('upward downward leftward rightward').addClass('upward rightward')
            else if quadrant pa is 1
                ts(@).removeClass('upward downward leftward rightward').addClass('downward leftward')
            else if quadrant pa is 4
                ts(@).removeClass('upward downward leftward rightward').addClass('upward leftward')

            # Close the visible dropdowns first.
            contractDropdown '.ts.dropdown.visible'

            detectDropdown @, e

###
The checkbox function.
###

ts.fn.checkbox = ->
    @each ->
        ts(@).on 'click', (e) ->
            isRadio = ts @
                .hasClass 'radio'

            if isRadio
                tsThis = ts @
                    .find 'input[type="radio"]'
            else
                tsThis = ts @
                    .find 'input[type="checkbox"]'

            if tsThis is null
                return
            else if isRadio
                name = tsThis.attr 'name'
                ts "input[type='radio'][name='#{name}']"
                    .removeAttr 'checked'

                tsThis.attr 'checked', 'checked'
            else
                if tsThis.attr 'checked' is 'checked'
                    tsThis.removeAttr 'checked'
                else
                    tsThis.attr 'checked', 'checked'

###
The tablesort function.
###

ts.fn.tablesort = ->
    @each ->
        if !ts(@).hasClass("sortable")
            return

        table = @

        ts(@).find("thead th").each (i) ->
            ts(@).on "click", ->
                isAsc = ts @
                    .hasClass 'ascending'

                ts @
                    .closest 'thead'
                    .find 'th'
                    .removeClass 'sorted ascending descending'

                # http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
                sortTable = (table, col, reverse) ->
                    tb      = table.tBodies[0]
                    tr      = Array::slice.call(tb.rows, 0)
                    reverse = -((+reverse) || -1)
                    tr      = tr.sort (a, b) ->
                        reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()))

                    for i in tr.length
                        tb.appendChild tr[i]

                sortTable table, i, isAsc

                ts @
                    .addClass isAsc ? 'sorted descending' : 'sorted ascending'

###
Close the modal.
###

closeModal = (modal) ->
    if ts(modal).hasClass('opening') or ts(modal).hasClass('closing')
        return

    ts modal
        .closest '.ts.modals.dimmer'
        .addClass 'closing'
        .one animationEnd, ->
            dimmer = @
            setTimeout(->
                ts dimmer
                    .removeClass 'closing'
                    .removeClass 'active'
                ts 'body'
                    .removeAttr 'data-modal-lock'
            , 30)

    ts modal
        .addClass 'closing'
        .one animationEnd, ->
            ts @
                .removeClass 'closing'
                .removeAttr  'open'

###
Bind the custom modal buttons.
###

bindModalButtons = (modal, approve, deny, approveCallback, denyCalback, overwrite) ->
    tsApprove = ts(modal).find(approve)
    tsDeny    = ts(modal).find(deny)
    isset     = ts(modal).attr("data-modal-initialized") isnt null

    # The approve callback.
    if tsApprove isnt null
        if overwrite
            tsApprove.off 'click'

        if overwrite or not isset and not overwrite
            tsApprove.on 'click', ->
                if approveCallback.call(modal) isnt false
                    closeModal modal

    # The deny callback.
    if tsDeny isnt null
        if overwrite
            tsDeny.off 'click'

        if overwrite or not isset and not overwrite
            tsDeny.on 'click', ->
                if denyCalback.call modal isnt false
                    closeModal modal

    # Set the modal is initialized.
    ts modal
        .attr 'data-modal-initialized', 'true'

###
The modal function.
###

ts.fn.modal = (option) ->
    @each (i) ->

        # Only set the first modal.
        if i > 0 or typeof @ is 'undefined'
            return

        modal    = @
        tsModal  = ts @
        tsDimmer = tsModal.closest '.ts.modals.dimmer'
        closeBtn = tsModal.find '.close.icon'

        if tsDimmer is null
            return

        # Show the modal.
        if option is 'show'
            # Lock the scoller of the body.
            ts 'body'
                .attr 'data-modal-lock', 'true'

            # Open the modals dimmer.
            tsDimmer
                .addClass 'active'
                .addClass 'opening'
                .one animationEnd, ->
                    ts @
                        .removeClass 'opening'
                # Close the modal if user clicked the dimmer.
                .on 'click', (e) ->
                    if ts(modal).hasClass('closable')
                        if e.target is @
                            closeModal modal

            # Bind the close icon event.
            if closeBtn isnt null
                closeBtn.on 'click', ->
                    closeModal modal

            # Bind the events.
            bindModalButtons(
                modal,
                '.positive, .approve, .ok', '.negative, .deny, .cancel',
                -> true,
                -> true,
                false
            )

            # Open the specified modal.
            tsModal
                .attr 'open', 'open'
                .addClass 'opening'
                .one animationEnd, ->
                    tsModal.removeClass 'opening'

        # Hide the modal.
        else if option is 'hide'
            closeModal @

        # Set the configurations of the modal.
        else if typeof option is 'object'
            # Options.
            approve   = option.approve   or '.positive, .approve, .ok'
            deny      = option.deny      or '.negative, .deny, .cancel'
            onDeny    = option.onDeny    or () -> true
            onApprove = option.onApprove or () -> true
            modal     = @

            bindModalButtons modal, approve, deny, onApprove, onDeny, true

###
The sidebar function.
###

ts.fn.sidebar = (option) ->
    @each ->
        #
        if option is 'toggle'
            ts @
                .addClass 'animating'

            if ts(@).hasClass('visible')
                ts @
                    .removeClass 'visible'
                    .one animationEnd, ->
                        ts @
                            .removeClass 'animating'
            else
                ts @
                    .addClass 'visible'
                    .removeClass 'animating'

        #
        else if typeof option is 'object'
            # Options.
            dimPage    = option.dimPage    or false
            scrollLock = option.scrollLock or false
            squeezable = option.squeezable or false
            closable   = option.closable   or true

###
The tab function.
###

ts.fn.tab = (option) ->
    @each ->
        # Options.
        onSwitch = option?.onSwitch or ->

        ts(@).on 'click', ->
            # Ignore if user is clicking on the actived tab button.
            return if ts(@).hasClass('active')

            tabName = ts(@).attr 'data-tab'
            # Ignore the non-tab item buttons.
            return if tabName is null
            # Get the tag group name.
            tabGroup = ts(@).attr 'data-tab-group'

            # Call the callback (ofcuz).
            onSwitch(tabName, tabGroup)

            # There's only one tab module if the `data-tab-group` is empty.
            if tabGroup is null
                # So we deactive all the tab buttons first.
                ts('[data-tab]:not(.tab)')
                    .removeClass 'active'
                # And deactive all the tab pages.
                ts('[data-tab]')
                    .removeClass 'active'
                # Now active the target tab page.
                ts(".tab[data-tab='#{tabName}']")
                    .addClass 'active'
            else
                ts("[data-tab-group='#{tabGroup}']:not(.tab)")
                    .removeClass 'active'
                ts(".tab[data-tab-group='#{tabGroup}']")
                    .removeClass 'active'
                ts(".tab[data-tab='#{tabName}'][data-tab-group='#{tabGroup}']")
                    .addClass 'active'
            # Active the target tab button.
            ts(@)
                .addClass 'active'

###
The tooltip function.
###

ts.fn.popup = ->
    @each ->
        userAgent = navigator.userAgent or navigator.vendor or window.opera
        winPhone  = new RegExp "windows phone"   , "i"
        android   = new RegExp "android"         , "i"
        iOS       = new RegExp "iPad|iPhone|iPod", "i"

        if winPhone.test(userAgent) or android.test(userAgent) or (iOS.test(userAgent) and !window.MSStream)
            ts(@)
                .addClass 'untooltipped'

###
The slider function.
###

ts.fn.slider = (option) ->
    outerCounter = option?.outerCounter
    counter      = option?.counter

    modify = (sliderEl, inputEl, counter, outerCounter) ->
        # Get the 0.01(1) to 1(100) by calculating the steps.
        value = (inputEl.value - inputEl.getAttribute 'min') / (inputEl.getAttribute 'max' - inputEl.getAttribute 'min')
        # Or get the value from the range input directly if the range input has no steps.
        value = inputEl.value / 100 if value is Number.POSITIVE_INFINITY

        # Set the counter if any.
        if counter?
            counterEl = ts(sliderEl).find(counter)
            counterEl[0].innerText = inputEl.value if counterEl?
        if outerCounter?
            ts(outerCounter).innerText = inputEl.value

        # Update the progress.
        ts(inputEl)
            .css('background-image', "-webkit-gradient(linear, left top, right top, color-stop(#{value}, #{slider_progressColor}), color-stop(#{value}, #{slider_trackColor}))")

    @each ->
        sliderEl = @
        inputEl  = ts(@).find('input[type="range"]')
        # Modify the progress color when the initialize.
        modify(@, inputEl[0], counter, outerCounter)

        inputEl.on 'input', ->
            modify(sliderEl, @, counter, outerCounter)

###
The editable function.
###

ts.fn.editable = (option) ->
    autoReplace  = option?.autoReplace || true
    onEdit       = option?.onEdit      || ->
    onEdited     = option?.onEdited    || ->
    autoClose    = option?.autoClose   || true
    inputWrapper = @

    # Auto save and end the editing when the input was unfocused.
    if autoClose
        ts(document).on 'click', (event) ->
            # Wen the user clicked the element that is not in the `.ts.input`.
            if ts(event.target).closest('.ts.input') is null
                inputWrapper.each ->
                    input           = ts(@).find('input')
                    contenteditable = ts(@).find('[contenteditable]')
                    text            = ts(@).find('.text')[0]

                    # Auto replace the text by the value of the input if `autoReplace` is true.
                    if autoReplace
                        if input?
                            text.innerText = input[0].value
                        else if contenteditable?
                            text.innerText = contenteditable[0].value

                    # Call the edited callback.
                    onEdited(@)

                    ts(@).removeClass 'editing'

    # Enable the editing mode when the user
    # clicked the input or the contenteditable element.
    @each ->
        input           = ts(@).find('input')
        contenteditable = ts(@).find('[contenteditable]')

        ts(@).on 'click', ->
            ts(@).addClass 'editing'

            onEdit(@)

            if input?
                input[0].focus()
            else if contenteditable?
                contenteditable[0].focus()

###
The message function.
###

ts.fn.message = ->
    @each ->
        ts(@).find('i.close').on 'click', ->
            ts(@).parent().addClass 'hidden'

###
The snackbar function
###

ts.fn.snackbar = (option) ->
    content        = option?.content  or null
    action         = option?.action   or null
    actionEmphasis = option?.actionEmphasis or null
    onClose        = option?.onClose  or ->
    onAction       = option?.onAction or ->
    interval       = 3500

    # Ignore the empty snackbar.
    return if content is null

    @each ->
        snackbar  = @
        contentEl = ts(snackbar).find('.content')
        ActionEl  = ts(snackbar).find('a')

        ts(snackbar)
            .removeClass 'active'
            .addClass 'active'
            .attr 'data-mouseon', 'false'

        # Replace the content and the action texts.
        contentEl[0].innerText = content
        ActionEl[0].innerText  = action if ActionEl?
        # Set the emphasis of the action button.
        if actionEmphasis? and ActionEl?
            ActionEl
                .removeClass 'primary info warning negative positive'
                .addClass actionEmphasis

        # close is the function that closes the snackbar (ofcuz).
        close = ->
            ts(snackbar).removeClass 'active'
            # Call the close callback.
            onClose snackbar, content, action
            # Clear the unfinished timer.
            clearTimeout snackbar.snackbarTimer

        # Bind the action button event.
        ActionEl.off 'click'
        ActionEl.on 'click', ->
            onAction snackbar, content, action
            close()

        # The mouse events to check if the cursor is stay on the snackbar or not.
        ts(snackbar).on 'mouseenter', ->
            ts(@).attr 'data-mouseon', 'true'
        ts(snackbar).on 'mouseleave', ->
            ts(@).attr 'data-mouseon', 'false'

        # Clear the previous timer if does exist.
        clearTimeout snackbar.snackbarTimer
        # Set the timer in the element so we can reset it if we called the same snackbar later on.
        snackbar.snackbarTimer = setTimeout(->
            # When the time's up,
            # call the checker to make sure the cursor is not stay on the snackbar.
            hoverChecker = setInterval(->
                if ts(snackbar).attr('data-mouseon') is 'false'
                    close()
                    clearInterval hoverChecker
                # We check it again after 500ms,
                # larger number to improve the performance.
            , 500)
        , interval)