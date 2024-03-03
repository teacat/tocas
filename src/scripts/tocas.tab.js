class Tab {
    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Tab 模組，就監聽其點擊事件。
        if (this.isTab(added_node)) {
            // 監聽其點擊事件。
            this.bindEventListener(added_node)

            // 如果這個項目沒有被啟用，就預設隱藏對應的內容，這樣使用者就不用額外手動隱藏該內容。
            this.initialTab(added_node)
        }
    }

    // isTab
    isTab = element => {
        return element.matches("[data-tab]")
    }

    // isActiveTab
    isActiveTab = element => {
        return element.classList.contains("is-active")
    }

    // initialTab
    initialTab = element => {
        if (!this.isActiveTab(element)) {
            document.getElementById(element.dataset.tab).classList.add("has-hidden")
        }
    }

    // toggle
    toggle = event => {
        // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的分頁模組。
        var element = event.target.closest("[data-tab]")

        // 取得這個分頁模組要切換的目標內容名稱。
        var tab_name = element.dataset.tab

        // 取得這個 `.ts-tab` 的分頁群組元素。
        var tab_group_element = element.closest(".ts-tab")

        // 建立一個陣列用來收集等一下所有不相關的分頁，這樣就可以一次關閉。
        var should_close = []

        // 在同個分頁群組裡，透過掃描每個分頁項目來找出有哪些關聯的分頁內容名稱。
        tab_group_element.querySelectorAll("[data-tab]").forEach(v => {
            // 如果這個項目就是我們要啟用的分頁，那就啟用這個項目。
            if (v.dataset.tab === tab_name) {
                v.classList.add("is-active")
            }

            // 但如果這個項目不是我們要啟用的分頁。
            else {
                // 收集這個項目的目標分頁名稱，等一下就能一次隱藏這些非目標內容。
                should_close = [...should_close, v.dataset.tab]

                // 移除這個項目的啟用狀態，因為這個項目本來就不是我們要啟用的。
                v.classList.remove("is-active")
            }
        })

        // 隱藏那些該關閉的分頁。
        should_close.forEach(id => {
            document.getElementById(id).classList.add("has-hidden")
        })

        // 顯示目標分頁。
        document.getElementById(tab_name).classList.remove("has-hidden")
    }

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.toggle)
        element.addEventListener("click", this.toggle)
    }
}

window.tocas_modules = [...window.tocas_modules, new Tab()]
