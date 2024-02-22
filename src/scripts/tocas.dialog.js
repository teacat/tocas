class Dialog {
    // attributeMutation
    attributeMutation = mutation => {
        // use this!
    }

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Dialog 模組，就監聽其點擊事件。
        if (this.isDialog(added_node)) {
            this.bindDialogEventListener(added_node)
        }

        // 如果這個新追加的 DOM 節點是一個 Dialog 模組，就監聽其點擊事件。
        if (this.isTrigger(added_node)) {
            // 監聽其點擊事件。
            this.bindTriggerEventListener(added_node)
        }
    }

    // isTrigger
    isTrigger = element => {
        return element.matches("[data-dialog]")
    }

    // isDialog
    isDialog = element => {
        return element.matches("dialog.ts-modal, dialog.ts-app-drawer")
    }

    // isModal
    isModal = element => {
        return element.matches(":modal")
    }

    // isDismissible
    isDismissible = element => {
        var dismissible = element.dataset.dismissible || "true"
        return dismissible === "true"
    }

    // bindDialogEventListener
    bindDialogEventListener = element => {
        // 不使用 click 是避免使用者在內部選取文字，但是在外部放開，這會被當作 click 而關閉。
        element.removeEventListener("mousedown", this.onClickBackdrop)
        element.addEventListener("mousedown", this.onClickBackdrop)

        element.removeEventListener("cancel", this.onCancel)
        element.addEventListener("cancel", this.onCancel)
    }

    // bindTriggerEventListener
    bindTriggerEventListener = element => {
        element.removeEventListener("click", this.onClickTrigger)
        element.addEventListener("click", this.onClickTrigger)
    }

    // onClickBackdrop
    onClickBackdrop = event => {
        var dialog = event.target.closest("dialog")

        if (!this.isDismissible(dialog)) {
            return
        }
        if (dialog === event.target && this.isModal(dialog)) {
            event.target.dispatchEvent(new Event("cancel", { bubbles: true }))
            event.target.close()
        }
    }

    // onCancel
    onCancel = event => {
        var dialog = event.target.closest("dialog")

        if (!this.isDismissible(dialog)) {
            event.preventDefault()
        }
    }

    // onClickTrigger
    onClickTrigger = event => {
        // 取得對應的 Invoke 元素。
        var dialog_id = event.target.closest(`[data-dialog]`).dataset.dialog
        var dialog_element = document.getElementById(dialog_id)

        // 如果這個對話框是開啟的，就關閉它。
        if (!dialog_element.open) {
            dialog_element.showModal()
        } else {
            dialog_element.close()
        }
    }
}

window.tocas_modules = [...window.tocas_modules, new Dialog()]
