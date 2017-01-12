function tablesort() {
    return this.each(function() {
        if (!ts(this).hasClass("sortable"))
            return

        var table = this

        ts(this).find("thead th").each(function(i) {

            ts(this).on("click", function() {

                var isAsc = ts(this).hasClass("ascending")

                ts(this).closest("thead").find("th").removeClass("sorted ascending descending")

                // http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
                function sortTable(table, col, reverse) {
                    var tb = table.tBodies[0],
                        tr = Array.prototype.slice.call(tb.rows, 0),
                        i

                    reverse = -((+reverse) || -1)
                    tr = tr.sort(function(a, b) {
                        return reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()))
                    })

                    for (i = 0; i < tr.length; ++i)
                        tb.appendChild(tr[i])
                }

                sortTable(table, i, isAsc)

                ts(this).addClass(isAsc ? "sorted descending" : "sorted ascending")
            })
        })
    })
}