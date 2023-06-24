class Toggle {
    // attributeMutation
    attributeMutation = mutation => {};

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Toggle 模組，就監聽其點擊事件。
        if (this.isToggle(added_node)) {
            this.bindEventListener(added_node);
        }
    };

    // isToggle
    isToggle = element => {
        return element.matches(`[${tocas.config.attributes.toggle}]`);
    };

    // toggle
    toggle = event => {
        // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的切換模組。
        var element = event.target.closest(`[${tocas.config.attributes.toggle}]`);

        // 透過 `:` 從規則裡切分出目標名稱還有欲切換的樣式名稱。
        var [name, class_name] = element.getAttribute(tocas.config.attributes.toggle).split(":");

        // 尋找同個命名空間裡的所有目標，然後切換所有目標元素的指定樣式。
        searchScopeTargets(element, name, tocas.config.scopes.toggle, tocas.config.attributes.toggle_name).forEach(target => {
            target.classList.toggle(class_name);
        });
    };

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.toggle);
        element.addEventListener("click", this.toggle);
    };
}

window.tocas_modules = [...window.tocas_modules, new Toggle()]