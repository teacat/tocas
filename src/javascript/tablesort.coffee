class TocasTablesort
    $name:
        'tablesort'

    $init: ({$element}) ->
        # Return if the table is not sortable.
        return if not $element.classList.contains 'sortable'

        # Select all the headers in the table.
        $element.querySelectorAll('thead th').forEach (element, index) ->

            # Bind the click event for them.
            element.addEventListener 'click', ->
                isAscending = @classList.contains 'ascending'

                # Reset the headers status.
                @closest('thead').querySelectorAll('th').forEach (element) ->
                    element.classList.remove 'sorted', 'ascending', 'descending'

                # http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
                sortTable = (table, column, reverse) ->
                    tb      = table.tBodies[0]
                    tr      = Array::slice.call(tb.rows, 0)
                    reverse = -((+reverse) || -1)
                    tr      = tr.sort (a, b) ->
                        reverse * (a.cells[column].textContent.trim().localeCompare(b.cells[column].textContent.trim()))

                    # Resort the children.
                    for element in tr
                        tb.appendChild element

                sortTable $element, index, isAscending

                # Add the sorted classes.
                @classList.add 'sorted'
                @classList.add if isAscending then 'descending' else 'ascending'

ts new TocasTablesort()