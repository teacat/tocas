# Embed
#
# 嵌入物件。

class Embed
    # 模組名稱。
    @module:
        'embed'

    # 模組屬性。
    props:
        # 影片的編號，適用於有指定來源網站（如：`youtube`、`vimeo`）。
        id         : null
        # 影片尚未播放前的圖示名稱。
        icon       : 'video play'
        # 影片的來源網站。
        source     : 'youtube'
        # 影片的網址，可以是影片檔或 YouTube 那種。
        url        : null
        # 手動指定網址參數，當請求遠端影片時，這段參數會被追加在請求網址之後（如：`autoplay=true`）。
        parameters : ''
        # 這會變動嵌入物件的標籤（Attributes）。選項可以是鍵值，並以逗點分隔（如：`controls, data-user-id=12345`）。
        options    : ''
        # 預置封面的圖片路徑，這個圖片會在嵌入物件尚未載入時出現。
        placeholder: 'auto'
        # 影片內嵌內容開始顯示時所呼叫的回呼函式。
        onDisplay  : ->
        # 影片預置圖片成功讀取並顯示時所呼叫的回呼函式。
        onPlaceholderDisplay: ->
        # 影片的內嵌內容被產生的時候所呼叫的回呼函式。
        onCreate   : ->

    # 內建的影片來源。
    sources:
        youtube:
            url      : 'https://www.youtube.com/embed/{id}{parameters}'
            icon     : 'youtube'
            thumbnail: (id) ->
                "https://i.ytimg.com/vi/#{id}/hqdefault.jpg"

        vimeo:
            url      : 'https://player.vimeo.com/video/{id}{parameters}'
            icon     : 'vimeo'
            thumbnail: (id) ->
                "https://i.vimeocdn.com/video/#{id}_720.jpg"
        dailymotion:
            url      : 'https://www.dailymotion.com/embed/video/{id}{parameters}'
            icon     : 'video play'
            thumbnail: (id) ->
                "https://www.dailymotion.com/thumbnail/video/#{id}"

    # 類別樣式名稱。
    className:
        ACTIVE     : 'active'
        PLACEHOLDER: 'placeholder'
        ICON       : (icon) -> "#{icon} icon"

    # 選擇器名稱。
    selector:
        ALL         : 'iframe, video, img, i'
        IFRAME_VIDEO: 'iframe, video'
        VIDEO       : 'video'
        IFRAME      : 'iframe'

    # 元素初始化函式。
    init: =>
        source      = @$this.data 'source'
        url         = @$this.data 'url'
        id          = @$this.data 'id'
        placeholder = @$this.data 'placeholder'
        options     = @$this.data 'options'
        parameters  = @$this.data 'parameters'
        icon        = @$this.data 'icon'

        # 如果有指定預置圖片，而且內容不是 `auto` 的話，就從指定的預置圖片中載入圖片。
        if placeholder and placeholder isnt 'auto'
            $placeholder = $selector '<img>'
                .prop     'onload', => @event 'onPlaceholderDisplay'
                .prop     'src'   , placeholder
                .addClass @className.PLACEHOLDER

            # 將預置圖片元素推入到嵌入物件容器裡。
            $placeholder.appendTo @$this

        # 如果預置圖片內容是 `auto` 的話就試著自動抓取。
        else if placeholder is 'auto' and not url
            # 試著從來源庫中執行相對應的來源函式，並取得相對應的縮圖。
            thumbnailURL = @sources[source]?.thumbnail id

            # 如果沒有縮圖的話則離開。
            if not thumbnailURL
                return

            # 更新嵌入元件裡的預置圖片設定。
            @$this.data 'placeholder', thumbnailURL

            # 建立預置圖片元素，並設定圖片網址。
            $placeholder = $selector '<img>'
                .prop     'onload', => @event 'onPlaceholderDisplay'
                .prop     'src'   , thumbnailURL
                .addClass @className.PLACEHOLDER

            # 將預置圖片元素推入到嵌入物件容器裡。
            $placeholder.appendTo @$this

        # 如果沒有圖示或者沒有網址、或者沒有編號和來源的話就離開。
        if not icon
            return

        # 建立圖示按鈕元素。
        $icon = $selector('<i>').addClass @className.ICON icon

        # 取得這個嵌入物件的種類。
        type = if @isFile(url) then 'file' else 'url'

        # 將嵌入物件的種類保存至嵌入物件元素的設定裡。
        @$this.data 'type', type

        # 如果影片種類不是影片檔案（有副檔名），而是像 YouTube 的網址的話⋯。
        if type is 'url'
            # 若有指定來源，就套用編號和網址參數來解析該來源網址。
            if source and not url
                url = @parseURL @sources[source]?.url, id, parameters
            # 不然如果是使用者自訂的網址，則用該網址。
            else
                url = "#{url}?#{parameters}"
            # 將解析過的網址保存到嵌入物件設定中。
            @$this.data 'url', url

        # 圖示按下時的載入影片事件。
        $icon.on 'click', =>
            @show()

        # 將按鈕圖示推入到嵌入物件容器內。
        $icon.appendTo @$this
        ts.fn

    # 元素摧毀函式。
    destroy: =>
        @$this
            .removeClass @className.ACTIVE
            .find        @selector.ALL
            .remove()

    # Show
    #
    # 顯示並產生嵌入物件的內容元素。
    show: =>
        type    = @$this.data 'type'
        options = @$this.data 'options'
        url     = @$this.data 'url'

        # 如果這個嵌入物件的影片網址是一個遠端影片檔案而且尚未有相關元素的話⋯。
        if type is 'file' and @$this.find(@selector.VIDEO).length is 0
            # 就建立一個 `<video>` 元素讀取它。
            $video = $selector '<video>'
                .prop
                    oncanplay: => @event 'onDisplay'
                    src      : url

            # 如果嵌入物件有自訂選項的話⋯。
            if options isnt ''
                # 將選項的 `k=v,k=v` 取出，並套用到 `<video>` 的屬性中。
                @parseOptions options, (key, value) => $video.attr key, value

            # 將這個 `<video>` 擺放到嵌入物件容器內。
            @$this.append   $video.get()
            @event 'onCreate'

        # 不然就是標準的網址，如果沒有相關元素的話，
        else if @$this.find(@selector.IFRAME).length is 0

            # 我們就建立一個 `<iframe>` 元素來讀取遠端內容。
            $iframe = $selector '<iframe>'
                .prop
                    width      : '100%'
                    height     : '100%'
                    frameborder: '0'
                    scrolling  : 'no'
                    onload     : => @event 'onDisplay'
                    src        : url
                .attr
                    webkitAllowFullScreen: ''
                    mozallowfullscreen   : ''
                    allowFullScreen      : ''

            # 將這個 `<iframe>` 推入至容器中。
            @$this.append $iframe.get()
            @event 'onCreate'

        # 啟用這個嵌入物件。
        @$this.addClass @className.ACTIVE

    # Reset
    #
    # 重設嵌入物件的狀態與內容。
    reset: =>
        @$this
            .removeClass @className.ACTIVE
            .find        @selector.IFRAME_VIDEO
            .remove()

    # Is File
    #
    # 回傳一個表示網址是否為直接連接到影片檔案的網址布林值，例如帶有 `.mp4`、`.mov` 副檔名。
    isFile: (url) =>
        extension = if url then url.split('.').pop() else ''
        extension = extension.toUpperCase()

        extension.indexOf('MOV')  isnt -1 or
        extension.indexOf('MP4')  isnt -1 or
        extension.indexOf('WEBM') isnt -1 or
        extension.indexOf('OGG')  isnt -1

    # Parse Options
    #
    # 解析鍵值組，將 `k=v, k=v` 轉換成物件。
    parseOptions: (options, each) =>
        # 如果傳入的鍵值組已經是物件的話，就不更動，直接回傳。
        return options if typeof options is 'object'

        # 不然就初始化一個鍵值物件，稍後用來保存解析的鍵值。
        object = {}
        options.split(',').forEach (pair) =>
            pair        = pair.split '='
            key         = pair[0].trim()
            value       = pair[1] or ''
            object[key] = value.trim()

            # 呼叫迴圈回呼函式，如果有的話。
            each key, value if each?

        return object

    # Parse URL
    #
    # 解析網址，將網址套用上真正的影片編號和參數。
    parseURL: (sourceURL, id, parameters) =>
        sourceURL.replace('{id}', id).replace '{parameters}', "?#{parameters}"

    # Event
    #
    # 呼叫指定函式。
    event: (event) =>
        @$this.data(event)?.call @$this.get()

    # 模組可用的方法。
    methods: =>

        # Change
        #
        # 更換嵌入物件的設定與來源。
        change: (source, id, url) =>
            @destroy()
            @$this.data
                'source': source
                'id'    : id
                'url'   : url
            @init()
            @show()
            ts.fn

        # Reset
        #
        # 重設嵌入物件的所有狀態，復原起初的預置圖片。
        reset: =>
            @destroy()
            @init()
            ts.fn

        # Show
        #
        # 顯示並載入嵌入物件的內容。
        show: =>
            @show()
            ts.fn

        # Hide
        #
        # 隱藏嵌入物件的內容，用預置圖片覆蓋。但不重置狀態與內容。
        hide: =>
            @$this.removeClass @className.ACTIVE
            ts.fn

        # Get ID
        #
        # 取得目前嵌入物件的編號。
        'get id': =>
            @$this.data 'id'

        # Get Placeholder
        #
        # 取得目前嵌入物件的預置圖片路徑。
        'get placeholder': =>
            @$this.data 'placeholder'

        # Get Source
        #
        # 取得目前嵌入物件的來源名稱。
        'get source': =>
            @$this.data 'source'

        # Get URL
        #
        # 取得目前嵌入物件的影片網址。
        'get url': =>
            @$this.data 'url'

        # Has Placeholder
        #
        # 回傳一個表示這個嵌入物件是否設有預置圖片的布林值。
        'has placeholder': =>
            @$this.data('placeholder') isnt null

ts Embed