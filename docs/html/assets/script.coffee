$ =>
    Selector =
    SOURCE_BTN    : 'section > h2 > button.ts.button:first-of-type'
    RESPONSIVE_BTN: 'section > h2 > button.ts.button:nth-of-type(2)'

    $(Selector.SOURCE_BTN).on 'click', ->
        $exampleSection = $(@).parent().nextAll('.ts.segments').first()
        $exampleBlock   = $exampleSection.find('.ts.segment').first()
        $codeBlock      = $exampleSection.find('.ts.segment').last()

        $(@).toggleClass 'active'

        if $exampleSection.data 'showing'
            $exampleSection.data   'showing', false
            $exampleBlock.addClass 'fitted basic'
            $codeBlock.attr        'hidden', 'hidden'
            return

        $exampleSection.data      'showing', true
        $exampleBlock.removeClass 'fitted basic'
        $codeBlock.removeAttr     'hidden'

    $(Selector.RESPONSIVE_BTN).on 'click', ->
        $exampleSection   = $(@).parent().nextAll('.ts.segments').first()
        $exampleBlock     = $exampleSection.find('.ts.segment').first()
        $responsiveBlock  = $exampleSection.find('.ts.segment').eq(1)
        $iframe           = $responsiveBlock.find('iframe')
        html              = $exampleBlock.html()
        body              = """
            <meta charset="UTF-8">
            <meta name="viewport" content="max-width=767, initial-scale=1">
            <link rel="stylesheet" href="../../assets/styles/tocas.css">
            <link rel="stylesheet" href="../../assets/highlight.css">
            <link rel="stylesheet" href="../../assets/images/style.css">
            <style type="text/css">
                body{
                    margin: 0;
                }
            </style>
            #{html}
        """
        $(@).toggleClass 'active'

        if $exampleSection.data('responsiving') is undefined
            $iframe.get(0).style.height = '0px'
            $iframe.contents().find('body').html(body)

        if $exampleSection.data 'responsiving'
            $exampleSection.data     'responsiving', false
            $exampleBlock.removeAttr 'hidden'
            $responsiveBlock.attr    'hidden', 'hidden'
            return

        setTimeout =>
            $exampleSection.data        'responsiving', true
            $exampleBlock.attr          'hidden', 'hidden'
            $responsiveBlock.removeAttr 'hidden'
            setTimeout =>
                $iframe.get(0).style.height = $iframe.get(0).contentWindow.document.body.scrollHeight + 'px'
            , 1
        , 10



