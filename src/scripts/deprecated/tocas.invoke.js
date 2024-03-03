class Invoke {
    constructor() {}

    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Invoke 模組，就監聽其點擊事件。
        if (this.isInvoke(added_node)) {
            // 監聽其點擊事件。
            this.bindEventListener(added_node)
        }
    }

    // isInvoke
    isInvoke = element => {
        return element.matches(`[data-invoke]`)
    }

    // IsTargetFile
    isTargetFile = element => {
        return element.matches(`input[type="file"]`)
    }

    // IsTargetDialog
    isTargetDialog = element => {
        return element.matches(`dialog`)
    }

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("dragover", this.dragEventHandler)
        element.removeEventListener("dragenter", this.dragEventHandler)
        element.removeEventListener("drop", this.dropEventHandler)
        element.removeEventListener("click", this.clickEventHandler)

        element.addEventListener("dragover", this.dragEventHandler)
        element.addEventListener("dragenter", this.dragEventHandler)
        element.addEventListener("drop", this.dropEventHandler)
        element.addEventListener("click", this.clickEventHandler)
    }

    getInvokeTarget = element => {
        var element = element.closest(`[data-invoke]`)
        return document.getElementById(element.dataset.invoke)
    }

    // dragEventHandler
    dragEventHandler = event => {
        var target = this.getInvokeTarget(event.target)

        if (this.isTargetFile(target)) {
            this.dragFileHandler.call(this, event)
        }
    }

    // dropEventHandler
    dropEventHandler = event => {
        var target = this.getInvokeTarget(event.target)

        if (this.isTargetFile(target)) {
            this.dropFileHandler.call(this, event)
        }
    }

    // clickEventHandler
    clickEventHandler = event => {
        var target = this.getInvokeTarget(event.target)

        if (this.isTargetFile(target)) {
            this.clickFileHandler.call(this, event)
        }
        if (this.isTargetDialog(target)) {
            this.clickDialogHandler.call(this, event)
        }
    }

    // getFileInput
    getFileInput = element => {
        return document.getElementById(element.dataset.invoke)
    }

    // dragFileHandler
    dragFileHandler = event => {
        // 避免瀏覽器有其他動作。
        event.preventDefault()
    }

    // dropFileHandler
    dropFileHandler = event => {
        // 避免瀏覽器有其他動作。
        event.preventDefault()

        // 取得對應的 Invoke 元素。
        var file_element = this.getInvokeTarget(event.target)

        // 如果沒有指定可以多選，就永遠只取得拖曳的第一個檔案。
        // 如果有多選的話，就直接將拖曳的檔案列表轉發給檔案上傳欄位。
        if (file_element.getAttribute("multiple") === null) {
            var data = new DataTransfer()
            data.items.add(event.dataTransfer.files[0])
            file_element.files = data.files
        } else {
            file_element.files = event.dataTransfer.files
        }

        // 觸發變更事件，讓其他程式能夠監聽此異動。
        target.dispatchEvent(new Event("change", { bubbles: true }))
    }

    // clickFileHandler
    clickFileHandler = event => {
        // 取得對應的 Invoke 元素。
        var file_element = this.getInvokeTarget(event.target)

        // 點擊檔案上傳欄位來開啟檔案視窗。
        file_element.click()
    }

    // clickDialogHandler
    clickDialogHandler = event => {
        // 取得對應的 Invoke 元素。
        var dialog_element = this.getInvokeTarget(event.target)

        // 如果這個對話框是開啟的，就關閉它。
        if (!dialog_element.open) {
            dialog_element.showModal()
        } else {
            dialog_element.close()
        }
    }
}
window.tocas_modules = [...window.tocas_modules, new Invoke()]
