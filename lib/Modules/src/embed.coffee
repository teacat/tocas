class TocasEmbed
    $name:
        'embed'
    $data:
        sources:
            youtube:
                url      : 'https://www.youtube.com/embed/{id}{parameters}'
                icon     : 'youtube'
                thumbnail: (id) ->
                    "https://i.ytimg.com/vi/#{id}/maxresdefault.jpg"
            viemo:
                url      : 'https://player.vimeo.com/video/{id}{parameters}'
                icon     : 'viemo'
                thumbnail: (id) ->
                    "https://i.vimeocdn.com/video/#{id}_720.jpg"
            dailymotion:
                url      : 'https://www.dailymotion.com/embed/video/{id}{parameters}'
                icon     : 'video play'
                thumbnail: (id) ->
                    "https://www.dailymotion.com/thumbnail/video/#{id}"
    $options:
        id        : ''
        icon      : ''
        source    : ''
        url       : ''
        parameters: ''
        onDisplay : ->
        onCreate  : ->

    $init: ({$this, $data, $module}) ->
        source      = $this.attr 'data-source'
        url         = $this.attr 'data-url'
        id          = $this.attr 'data-id'
        placeholder = $this.attr 'data-placeholder'
        options     = $this.attr('data-options')    or ''
        parameters  = $this.attr('data-parameters') or ''
        icon        = $this.attr('data-icon')       or 'video play'

        # 如果這個嵌入物件已經被初始化了則離開。
        if $this.data 'source'
            return

        # 如果網址參數不是空的，在網址參數前加上一個問號。
        if parameters isnt ''
            parameters = "?#{parameters}"

        # 從指定的預置圖片中載入圖片。
        if placeholder and placeholder isnt 'auto'
            $placeholder = $selector '<img>'
                .prop     'src', placeholder
                .addClass 'placeholder'
            # 將預置圖片元素推入到嵌入物件容器裡。
            $placeholder.appendTo $this

        # 或者是 `auto` 的話就試著自動抓取。
        else if placeholder isnt null
            thumbnailURL = $data.sources[source]?.thumbnail id
            $placeholder = $selector '<img>'
                .prop     'src', thumbnailURL
                .addClass 'placeholder'
            if thumbnailURL?
                # 將預置圖片元素推入到嵌入物件容器裡。
                $placeholder.appendTo $this

        # 準備預置按鈕圖示。
        if icon and (source or url or id)
            $icon = $selector '<i>'
            $icon.addClass "#{icon} icon"

            # 圖示按下時的載入影片事件。
            $icon.on 'click', ->
                # 如果影片網址是一個遠端影片檔案的話，就建立一個 `<video>` 元素讀取它。
                if $module::_isVideo url
                    $video = $selector('<video>').prop 'src', url

                    # 將選項的 `k=v,k=v` 取出，並套用到 `<video>` 的屬性中。
                    if options isnt ''
                        $module::_parseKeyValues options, (key, value) ->
                            $video.attr key, value

                    # 然後將這個 `<video>` 擺放到嵌入物件容器內。
                    $this.addClass 'active'
                         .append   $video.get()

                # 不然就是標準的網址，我們用 `<iframe>` 包覆頁面。
                else
                    $iframe = $selector '<iframe>'
                        .prop
                            width      : '100%'
                            height     : '100%'
                            frameborder: '0'
                            scrolling  : 'no'
                        .attr
                            webkitAllowFullScreen: ''
                            mozallowfullscreen   : ''
                            allowFullScreen      : ''

                    # 基於來源建立 `<iframe>` 的網址。
                    if source
                        $iframe.prop 'src', $module::_parseURL($data.sources[source]?.url, id, parameters)

                    # 不然就用使用者指定的網址。
                    else if url
                        $iframe.prop 'src', "#{url}#{parameters}"

                    # 啟用這個嵌入物件，然後將這個 `<iframe>` 推入至容器中。
                    $this.addClass 'active'
                         .append   $iframe.get()

        # 將按鈕圖示推入到嵌入物件容器內。
        $icon.appendTo $this

        # 將這個嵌入物件設為啟用，並保存設定值。
        $this.data 'source', source

    # 解析網址，將網址套用上真正的影片編號和參數。
    _parseURL: (sourceURL, id, parameters) ->
        sourceURL.replace('{id}', id).replace '{parameters}', parameters

    # 解析鍵值組，將 `k=v, k=v` 轉換成物件。
    _parseKeyValues: (keyValues, each) ->
        if typeof keyValues is 'object'
            return keyValues

        object = {}
        keyValues.split(',').forEach (pair) ->
            pair        = pair.split '='
            key         = pair[0].trim()
            value       = pair[1] or ''
            object[key] = value.trim()
            # 呼叫迴圈回呼函式，如果有的話。
            if each?
                each key, value

        return object

    # 回傳一個表示網址是否為直接連接到影片檔案的網址布林值，例如帶有 `.mp4`、`.mov` 副檔名。
    _isVideo: (url) ->
        extension = if url then url.split('.').pop() else ''
        extension = extension.toUpperCase()

        extension.indexOf('MOV')  isnt -1 or
        extension.indexOf('MP4')  isnt -1 or
        extension.indexOf('WEBM') isnt -1 or
        extension.indexOf('OGG')  isnt -1

    $opts: ->

    $method:
        change: ->
        reset: ->
        show: ->
        hide: ->
        'get id': ->
        'get placeholder': ->
        'add source': ->

        'get source': ->
        'get type': ->
        'get url': ->
        'has placeholder': ->

new ts TocasEmbed