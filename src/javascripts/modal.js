function modal(option) {
    return this.each(function() {

        var modal = this,
            tsModal = ts(this),
            tsDimmer = tsModal.closest(".ts.modals.dimmer")

        if (tsDimmer == null)
            return

        /** Show the modal */
        if (option == "show") {

            /** Lock the scoller of the body */
            ts("body")
                .attr("data-modal-lock", "true")

            /** Open the modals dimmer */
            tsDimmer
                .addClass("active")
                .addClass('opening')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    ts(this).removeClass('opening')
                })
                /** Close the modal if user clicked the dimmer */
                .on("click", function(e) {
                    if (ts(modal).hasClass("closable")) {
                        if (e.target == this) {
                            close(modal)
                        }
                    }
                })

            /** Bind the close icon event */
            tsModal
                .find(".close.icon")
                .on("click", function() {
                    close(modal)
                })

            /** Open the specified modal */
            tsModal
                .attr("open", "open")
                .addClass('opening')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    tsModal.removeClass('opening')
                })

            /** Hide the modal */
        } else if (option == "hide") {
            close(this)

            /** Set the configurations of the modal */
        } else if (typeof option === "object") {

            /** Options */
            approve = option.approve || '.positive, .approve, .ok'
            deny = option.deny || '.negative, .deny, .cancel'
            onDeny = option.onDeny || function() { return true }
            onApprove = option.onApprove || function() { return true }

            var modal = this

            /** Approve callback */
            ts(this).find(approve).on("click", function() {
                if (onApprove() !== false) {
                    close(modal)
                }
            })

            /** Deny callback */
            ts(this).find(deny).on("click", function() {
                if (onDeny() !== false) {
                    close(modal)
                }
            })
        }
    })
}

function close(modal) {
    if (ts(modal).hasClass("opening") || ts(modal).hasClass("closing"))
        return

    ts(modal)
        .closest(".ts.modals.dimmer")
        .addClass('closing')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            var dimmer = this
            setTimeout(function() {
                ts(dimmer)
                    .removeClass('closing')
                    .removeClass("active")
                ts("body")
                    .removeAttr("data-modal-lock")
            }, 30)
        })
    ts(modal)
        .addClass('closing')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            ts(this)
                .removeClass('closing')
                .removeAttr("open")
        })
}