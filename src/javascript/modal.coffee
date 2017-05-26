class TocasModal
    $name:
        'modal'
    $data:
        animationEnd: ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend']
    $options:
        approve  : '.positive, .approve, .ok'
        deny     : '.negative, .deny, .cancel'
        onDeny   : () -> true
        onApprove: () -> true

    $init: ({$element, $options, $module}) ->
        dimmer      = $element.closest '.ts.modals.dimmer'
        closeButton = $element.querySelector '.close.icon'

        return if dimmer is null
        console.log @
        $module.bindModalButtons $element, $options.approve, $options.deny, $options.onApprove, $options.onDeny, true

    # Close the modal.
    closeModal: (modal) ->
        #
        if modal.classList.contains('opening') or modal.classList.contains('closing')
            return

        dimmer = modal.closest '.ts.modals.dimmer'
        #
        dimmer.classList.add 'closing'
        @$data.animationEnd.forEach (event) ->
            dimmer.addEventListener event, ->
                setTimeout ->
                    dimmer.classList.remove 'closing', 'active'
                    document.body.removeAttribute 'data-modal-lock'
                , 30
            , once: true

        #
        modal.classList.add 'closing'
        @$data.animationEnd.forEach (event) ->
            modal.addEventListener event, ->
                @classList.remove 'closing'
                @removeAttribute 'open'
            , once: true


    # Bind the custom modal buttons.
    bindModalButtons: (modal, approve, deny, approveCallback, denyCalback, overwrite) ->
        approveElements = modal.querySelectorAll(approve)
        denyElements    = modal.querySelectorAll(deny)
        isset           = modal.getAttribute('data-modal-initialized') isnt null
        $module         = @

        # The approve callback.
        if approveElements isnt null
            approveElements.forEach (element) ->
                if overwrite
                    element.removeEventListener 'click'

                if overwrite or not isset and not overwrite
                    element.addEventListener 'click', ->
                        if approveCallback.call(modal) isnt false
                            $module.closeModal modal

        # The deny callback.
        if denyElements isnt null
            denyElements.forEach (element) ->
                if overwrite
                    element.removeEventListener 'click'

                if overwrite or not isset and not overwrite
                    element.addEventListener 'click', ->
                        if denyCallback.call(modal) isnt false
                            $module.closeModal modal

        # Set the modal as initialized.
        modal.setAttribute 'data-modal-initialized', 'true'

    $methods:
        # Show the modal.
        show: ({$element, $module}) ->
            dimmer      = $element.closest '.ts.modals.dimmer'
            closeButton = $element.querySelector '.close.icon'

            # Lock the scoller of the body.
            document.body.setAttribute 'data-modal-lock', 'true'
            # Open the modals dimmer.
            dimmer.classList.add 'active', 'opening'
            # Close the modal if user clicked the dimmer.
            dimmer.addEventListener 'click', (event) ->
                if $element.classList.contains 'closable' and event.target is @
                    $module.closeModal modal
            #
            $module.$data.animationEnd.forEach (event) ->
                dimmer.addEventListener event, ->
                    @classList.remove 'opening'
                , once: true

            # Bind the close icon event.
            if closeButton isnt null
                closeButton.addEventListener 'click', ->
                    $module.closeModal $element

            # Initialize the modal, bind the events.
            $options = $module.$options
            $module.bindModalButtons $element, $options.approve, $options.deny, $options.onApprove, $options.onDeny, false

        # Hide the modal.
        hide: ({$element, $module}) ->
            $module.closeModal $element

        # Bind the event which toggles the modal to the specified elements.
        'attach events': ({$element, $arg2, $arg3}) ->

ts new TocasModal()