class Collapse {
    // #collapses 用以隨時更新頁面上有哪些存在的顯示切換 ID，
    // 這個清單資料來自於有被指定在 [data-collapse] 裡的名稱。
    #collapses = new Set()

    // attributeMutation
    attributeMutation = mutation => {
        if (this.isCollapse(mutation.target)) {
            this.refreshRelatedTriggers(mutation.target)
        }
    }

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Collapse 觸發按鈕，就監聽其點擊事件。
        if (this.isCollapseTrigger(added_node)) {
            this.bindEventListener(added_node)
            this.recordCollapses(added_node)
            this.refreshTrigger(added_node)
        }

        // 如果這個新追加的 DOM 節點是一個 Collapse 目標，
        // 就基於目標目前的隱藏狀態，更新所有觸發按鈕的樣式。
        if (this.isCollapse(added_node)) {
            this.refreshRelatedTriggers(added_node)
        }
    }

    // removedNodeMutation
    removedNodeMutation = removed_node => {
        if (this.isCollapseTrigger(removed_node)) {
            this.unrecordCollapses(removed_node)
        }
    }

    // isCollapseTrigger
    isCollapseTrigger = element => {
        return element.matches("[data-collapse]")
    }

    // isCollapse
    isCollapse = element => {
        return this.#collapses.has(element.id)
    }

    // recordCollapses
    recordCollapses = trigger => {
        console.log(this.#collapses)
        this.#collapses.add(trigger.dataset.collapse)
    }

    // unrecordCollapses
    unrecordCollapses = trigger => {
        this.#collapses.delete(trigger.dataset.collapse)
    }

    // refreshRelatedTriggers
    refreshRelatedTriggers = target => {
        // 這裡使用 try 是因為有些瀏覽器的擴充套件可能會插入額外非正規 id 的元素而導致 querySelector 出錯。
        try {
            document.querySelectorAll(`[data-collapse="${target.id}"]`).forEach(trigger => {
                this.refreshTrigger(trigger)
            })
        } catch {}
    }

    // refreshTrigger
    refreshTrigger = element => {
        var target = document.getElementById(element.dataset.collapse)
        if (target === null) {
            return
        }

        var inactive_classes = element.dataset.inactive ? element.dataset.inactive.split(" ") : []
        var active_classes = element.dataset.active ? element.dataset.active.split(" ") : []

        if (target.classList.contains("has-hidden")) {
            element.classList.add(...inactive_classes)
            element.classList.remove(...active_classes)
        } else {
            element.classList.add(...active_classes)
            element.classList.remove(...inactive_classes)
        }
    }

    // toggle
    toggle = event => {
        // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的切換模組。
        var element = event.target.closest("[data-collapse]")

        // 切換目標的能見度。
        document.getElementById(element.dataset.collapse).classList.toggle("has-hidden")

        // 更新觸發元素自己的樣式。
        this.updateTriggerClass(element)
    }

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.toggle)
        element.addEventListener("click", this.toggle)
    }
}

window.tocas_modules = [...window.tocas_modules, new Collapse()]
