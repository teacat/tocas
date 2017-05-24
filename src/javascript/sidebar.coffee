class TocasSidebar
    $name: ->
        'sidebar'
    $data: ->
        {}
    $options: ->
        dimPage   : false
        exclusive : false
        scrollLock: false
        closable  : true

    $init: ($element, $options) ->

    $methods:
        # Show the sidebar.
        "show": ($element, $arg2, $arg3) ->
            return ts.fn

        # Hide the sidebar.
        "hide": ($element, $arg2, $arg3) ->
            return ts.fn

        # Toggle the sidebar.
        "toggle": ($element, $arg2, $arg3) ->
            return ts.fn

        # Attach the event to the element to toggle the sidebar.
        "attach events": ($element, $arg2, $arg3) ->
            return ts.fn

ts(new TocasSidebar())