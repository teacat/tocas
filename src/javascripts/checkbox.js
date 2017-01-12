function checkbox() {
    return this.each(function() {
        ts(this).on('click', function(e) {
            var isRadio, tsThis
            isRadio = ts(this).hasClass("radio")

            if (isRadio) {
                tsThis = ts(this).find('input[type="radio"]')
            } else {
                tsThis = ts(this).find('input[type="checkbox"]')
            }

            if (tsThis === null)
                return

            if (isRadio) {
                var name = tsThis.attr("name")

                ts('input[type="radio"][name="' + name + '"]').removeAttr("checked")
                tsThis.attr("checked", "checked")
            } else {
                if (tsThis.attr("checked") === "checked")
                    tsThis.removeAttr("checked")
                else
                    tsThis.attr("checked", "checked")
            }
        });
    })
}