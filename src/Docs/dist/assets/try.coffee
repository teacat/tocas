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
            html        : """
            <!-- 標題 -->
            <div class="ts large header">
                <i class="top aligned smile icon"></i>
                <div class="content">
                    歡迎來到遊樂場！
                    <div class="sub header">你可以編輯這裡的所有文字。</div>
                </div>
            </div>
            <!-- / 標題 -->
            <!-- 說明 -->
            <p>透過上方的 <a href="https://ace.c9.io/">Ace Editor</a> 你能夠編輯 HTML 標籤，並開始嚐鮮試用 Tocas UI！而且有趣的是你所編輯的 HTML 標籤都會立即呈現在頁面的即時預覽上！</p>
            <!-- / 說明 -->
            <!-- 圖片 -->
            <img class="ts centered big image" src="#{placeholderKaren}">
            <!-- / 圖片 -->
            <p>我們已經幫你讀取好最新的 Tocas UI 樣式庫了，接下來你要做的就是去文件中，抓幾個範例丟來這裡試試看。</p>
            <!-- 引言 -->
            <div class="ts quote">
                <p>天阿！這真是太夭壽讚了！這裡還能夠擺放引言元件！</p>
                <cite>Tocas UI 作者如此說道</cite>
            </div>
            <!-- / 引言 -->
            """
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