class AutoSize {
    constructor() {}

    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果追加的 DOM 節點是一個 AutoSize 模組就監聽其互動事件。
        if (this.isAutoSize(added_node)) {
            this.bindEventListener(added_node)

            // TODO: resize automatically
        }
    }

    // isAutoSize
    isAutoSize = element => {
        return element.matches(`[data-autosize]`)
    }

    // bindEventListener
    bindEventListener = element => {
        element.addEventListener("input", event => {
            this.recalculateSize(event)
        })
        element.addEventListener("change", event => {
            // this.recalculateSize(event);
        })
    }

    // recalculateSize
    recalculateSize = event => {
        var element = event.target.closest(`input, textarea`)
        var direction = element.dataset.autosize || "vertical"

        //
        if (direction === "horizontal") {
            var computed = window.getComputedStyle(element, null)
            var border_offset =
                Math.round(parseFloat(computed.getPropertyValue("border-left-width"))) +
                Math.round(parseFloat(computed.getPropertyValue("border-right-width")))
            var padding_offset =
                Math.round(parseFloat(computed.getPropertyValue("padding-left"))) +
                Math.round(parseFloat(computed.getPropertyValue("padding-right")))

            element.style.width = `${this.calculateWidth(element) + border_offset + padding_offset}px`
        }

        //
        if (direction === "vertical") {
            element.style.height = ""
            element.style.overflowY = "hidden"

            var max_rows = parseInt(element.getAttribute("data-max-rows")) || 0
            var computed = window.getComputedStyle(element, null)
            var line_height = Math.round(parseFloat(computed.getPropertyValue("line-height")))
            var height = Math.round(this.calculateHeight(element))
            var rows = Math.floor(height / line_height)

            var border_offset =
                Math.round(parseFloat(computed.getPropertyValue("border-top-width"))) +
                Math.round(parseFloat(computed.getPropertyValue("border-bottom-width")))
            var padding_offset =
                Math.round(parseFloat(computed.getPropertyValue("padding-top"))) +
                Math.round(parseFloat(computed.getPropertyValue("padding-bottom")))

            if (max_rows > 0 && rows >= max_rows) {
                var max_height = Math.round(line_height * max_rows + border_offset + padding_offset)

                element.style.overflowY = "auto"

                element.style.height = `${max_height}px`

                return
            }

            element.style.height = `${height + border_offset}px`

            element.style.overflowY = "auto"
        }
    }

    // calculateHeight
    calculateHeight = element => {
        return element.scrollHeight
    }

    // calculateWidth
    calculateWidth = element => {
        var canvas = this.calculateWidth.canvas || (this.calculateWidth.canvas = document.createElement("canvas"))
        var context = canvas.getContext("2d")
        var font = window.getComputedStyle(element, null).getPropertyValue("font")
        var text = element.value
        context.font = font
        var textMeasurement = context.measureText(text)
        return Math.floor(textMeasurement.width)
    }
}

window.tocas_modules = [...window.tocas_modules, new AutoSize()]
