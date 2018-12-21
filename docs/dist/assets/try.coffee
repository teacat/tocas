class Try
    constructor: () =>
        @selectors =
            $container  : $ '#container'
            $editor     : $ '#editor'
            $codePane   : $ '#codePane'
            $previewPane: $ '#previewPane'
            $preview    : $ '#preview'
            $shareButton: $ '#share'
        @classNames =
            twoColumns: 'two columns'
            hidden    : 'hidden'
            disabled  : 'disabled'
        @data =
            html        : ''
            isPreviewing : true
            isCoding     : true
            isTwoColumns : true
            shareInterval: 2000
            editor       : {}
        @initialize()
        @apply()

    toggle: (value) =>
        switch value
            when 'preview'
                @data.isPreviewing = !@data.isPreviewing
            when 'code'
                @data.isCoding = !@data.isCoding
            when 'columns'
                @data.isTwoColumns = !@data.isTwoColumns
        @update()

    initialize: =>
        @data.html = $editor.html()
        @data.editor = ace.edit 'editor'
        @data.editor.getSession().setMode 'ace/mode/html'
        @data.editor.getSession().setUseWrapMode true
        @data.editor.getSession().on 'change', @listener
        @data.editor.setShowPrintMargin false
        new Clipboard '#share', text: @share

    listener: =>
        @data.html = @data.editor.getValue()
        @selectors.$preview.html @data.html

    urlParam: (name) =>
        results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)
        return results[1] || 0

    share: =>
        content = encodeURI @data.editor.getValue()
        content = content.replace(/(?:\r\n|\r|\n)/g, '\\n')
        content = content.replace(/#/g, '%23')
        content = "#{location.protocol}//#{location.host}#{location.pathname}?html=#{content}"

        @$selectors.shareButton.addClass @classNames.disabled
        setTimeout =>
            @$selectors.shareButton.removeClass @classNames.disabled
        , @data.shareInterval

        return content

    apply: =>
        if $.urlParam 'html'
            @data.editor.setValue @urlParam 'html'
        else
            @data.editor.setValue @data.html

    update: =>
        #
        if @data.isTwoColumns
            @selectors.$container.addClass @classNames.twoColumns
        else
            @selectors.$container.removeClass @classNames.twoColumns
        #
        if @data.isPreviewing
            @selectors.$previewPane.addClass @classNames.hidden
        else
            @selectors.$previewPane.removeClass @classNames.hidden
        #
        if @data.isCoding
            @selectors.$codePane.addClass @classNames.hidden
        else
            @selectors.$codePane.removeClass @classNames.hidden
        #
        setTimeout =>
            @data.editor.getSession().resize()
        , 1

tryScript = new Try()