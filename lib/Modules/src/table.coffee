class TocasTable
    $name:
        'table'
    $init: ({$this}) ->
        expandables   = $this.find('.expandable')
        hasExpandable = expandables.length isnt 0

        if hasExpandable
            $expandIcon = $selector('<i>').addClass('chevron down icon')
            $this.find('thead > tr').prepend($selector('<th>'))

            $this.find('tbody > tr').prepend($selector('<td>'))
            $this.find('tbody > tr.expandable td:first-child').addClass('expand control').prepend($expandIcon)

        $this.find('tbody > tr.expandable + tr td:first-child').remove()
        $this.find('tbody > tr.expandable + tr td').attr('colspan', 99)

        $this.find('tbody > tr td.expand.control').on 'click', ->
            $selector(@).parent().toggleClass('expanded')

    $methods:
        expand: ->
        collapse: ->

new ts TocasTable
