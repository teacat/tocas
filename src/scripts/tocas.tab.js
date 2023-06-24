class Tab {
    constructor() {}

    // attributeMutation
    attributeMutation = mutation => {};

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Tab 模組，就監聽其點擊事件。
        if (this.isTab(added_node)) {
            // 監聽其點擊事件。
            this.bindEventListener(added_node);

            // 如果這個項目沒有被啟用，就預設隱藏對應的內容，這樣使用者就不用額外手動隱藏該內容。
            this.initialTab(added_node);
        }
    };

    // isTab
    isTab = element => {
        return element.matches(`[${tocas.config.attributes.tab}]`);
    };

    // isActiveTab
    isActiveTab = element => {
        return element.classList.contains(tocas.config.classes.tab_active);
    };

    // initialTab
    initialTab = element => {
        if (!this.isActiveTab(element)) {
            searchScopeTargets(element, element.getAttribute(tocas.config.attributes.tab), tocas.config.scopes.tab, tocas.config.attributes.tab_name).forEach(target => {
                target.classList.add(tocas.config.classes.hidden);
            });
        }
    };

    // toggle
    toggle = event => {
        // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的分頁模組。
        var element = event.target.closest(`[${tocas.config.attributes.tab}]`);

        // 取得這個分頁模組要切換的目標內容名稱。
        var tab_name = element.getAttribute(tocas.config.attributes.tab);

        // 取得這個分頁模組最鄰近的命名空間容器。
        var container = element.closest(`[class*="${tocas.config.scopes.tab}"]`) || document;

        // 取得這個 `.ts-tab` 的分頁群組元素。
        var tab_group_element = element.closest(".ts-tab");

        // 建立一個陣列用來收集等一下所有不相關的分頁，這樣就可以一次關閉。
        var should_close = [];

        // 在同個分頁群組裡，透過掃描每個分頁項目來找出有哪些關聯的分頁內容名稱。
        tab_group_element.querySelectorAll(`[${tocas.config.attributes.tab}]`).forEach(v => {
            // 如果這個項目就是我們要啟用的分頁，那就啟用這個項目。
            if (v.getAttribute(tocas.config.attributes.tab) === tab_name) {
                v.classList.add(tocas.config.classes.tab_active);
            }

            // 但如果這個項目不是我們要啟用的分頁。
            else {
                // 收集這個項目的目標分頁名稱，等一下就能一次隱藏這些非目標內容。
                should_close = [...should_close, v.getAttribute(tocas.config.attributes.tab)];

                // 移除這個項目的啟用狀態，因為這個項目本來就不是我們要啟用的。
                v.classList.remove(tocas.config.classes.tab_active);
            }
        });

        // 在這個命名空間裡面處理對應的項目內容。
        container.querySelectorAll(`[${tocas.config.attributes.tab_name}]`).forEach(target => {
            // 取得這個目標內容最鄰近的命名空間，若沒有則以 document 為主。
            var closest_container = target.closest(`[class*="${tocas.config.scopes.tab}"]`) || document;

            // 確定這個目標內容最鄰近的命名空間和目前操作的分頁群組是同個命名空間，
            // 這樣就不會處理到其他子空間的分頁和目標。
            if (container !== closest_container) {
                return;
            }

            // 如果這個目標內容就是我們想要啟用的分頁目標，那就移除這個內容原先的隱藏樣式。
            if (target.getAttribute(tocas.config.attributes.tab_name) === tab_name) {
                target.classList.remove(tocas.config.classes.hidden);
            }

            // 但若這個內容目標包含在先前想要隱藏的清單內，那就隱藏這個內容目標。
            else if (should_close.includes(target.getAttribute(tocas.config.attributes.tab_name))) {
                target.classList.add(tocas.config.classes.hidden);
            }
        });
    };

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.toggle);
        element.addEventListener("click", this.toggle);
    };
}

window.tocas_modules = [...window.tocas_modules, new Tab()]