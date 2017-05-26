class TocasCheckbox
    $name:
        'checkbox'

    $init: ({$element}) ->
        $element.addEventListener 'click', () ->
            isRadio = @classList.contains 'radio'
            input   = @querySelector 'input'      # Get the real checkbox or the radio.
            name    = input.getAttribute 'name'   # Get the name of the radio.

            # Return if the checkbox element doesn't exist.
            return if input is null

            # Uncheck the other radioboxes if it's the same group.
            if isRadio
                document.querySelectorAll("input[type='radio'][name='#{name}']").forEach (element) ->
                    element.removeAttribute 'checked'
                input.setAttribute 'checked', 'checked'

            # Or just toggle the current checkbox.
            else
                if input.getAttribute('checked') is 'checked'
                    input.removeAttribute 'checked'
                else
                    input.setAttribute 'checked', 'checked'

ts new TocasCheckbox()