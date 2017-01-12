import dropdown from "./dropdown"
import checkbox from "./checkbox"
import modal from "./modal"
import tablesort from "./tablesort"

/**
 * Document click event listener.
 */

ts(document).on('click', function(event) {
    if (ts(event.target).closest('.dropdown:not(.basic)') === null && !ts(event.target).hasClass('dropdown')) {
        contractDropdown('.ts.dropdown:not(.basic).visible')
    }
});

ts.fn.dropdown = dropdown
ts.fn.checkbox = checkbox
ts.fn.tablesort = tablesort
ts.fn.modal = modal