ts = (selector) ->
    # Return the prototype chain if the selector is not a class.
    if typeof selector isnt 'object'
        ts.selector = selector
        ts.nodes    = document.querySelectorAll selector
        return ts.fn

    # The alias.
    module = selector

    # Register the new module if the module class was passed in.
    ts.fn[module.$name] = ($arg=null, $arg2=null, $arg3=null) ->
        # The string of the selector.
        $selector = ts.selector
        # The nodes of the selected elements.
        $nodes    = ts.nodes
        $init     = module.$init
        $module   = module
        $methods  = module.$methods or {}
        $options  = module.$options or {}
        $pack     = {$selector, $nodes, $methods, $options, $module}
        value     = ts.fn

        # Each of the element.
        $nodes.forEach ($element) ->
            $pack.$element = $element

            # Call the default function with the default options.
            if $arg is null
                value = $init($pack).bind(module)

            # Or call the default function with the passed options object.
            # (And fill with the default options if it's missing in the passed options.)
            else if typeof $arg is 'object' and $arg isnt null
                $pack.$options = Object.assign($options, $arg)
                value = $init($pack).bind(module)

            # Otherwise we call the custom methods.
            else if typeof $arg is 'string'
                $pack.$arg2 = $arg2
                $pack.$arg3 = $arg3
                value = $methods[$arg]($pack).bind(module)

        # Return the value from the last called method
        # if the module doesn't return the tocas prototype chain.
        return if value is ts.fn then ts.fn else value

ts.nodes    = ''
ts.selector = ''
ts.fn       = {}