class FilePlace {
    constructor() {}

    // attributeMutation
    attributeMutation = mutation => {};

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 FilePlace 模組，就監聽其點擊事件。
        if (this.isFilePlace(added_node)) {
            // 監聽其點擊事件。
            this.bindEventListener(added_node);
        }
    };

    // isFilePlace
    isFilePlace = element => {
        return element.matches(`[${tocas.config.attributes.fileplace}]`);
    };

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("dragover", this.dragEventHandler);
        element.removeEventListener("dragenter", this.dragEventHandler);
        element.removeEventListener("drop", this.dropEventHandler);
        element.removeEventListener("click", this.clickEventHandler);

        element.addEventListener("dragover", this.dragEventHandler);
        element.addEventListener("dragenter", this.dragEventHandler);
        element.addEventListener("drop", this.dropEventHandler);
        element.addEventListener("click", this.clickEventHandler);
    };

    // getFileInput
    getFileInput = element => {
        return searchScopeTargets(element, element.getAttribute(tocas.config.attributes.fileplace), tocas.config.scopes.fileplace, tocas.config.attributes.fileplace_name)[0];
    };

    // dragEventHandler
    dragEventHandler = event => {
        // 避免瀏覽器有其他動作。
        event.preventDefault();
    };

    // dropEventHandler
    dropEventHandler = event => {
        // 取得對應的 Fileplace 元素。
        var element = event.target.closest(`[${tocas.config.attributes.fileplace}]`);

        // 避免瀏覽器有其他動作。
        event.preventDefault();

        // 取得關聯的檔案上傳欄位。
        var file_input = this.getFileInput(element);

        // 如果沒有指定可以多選，就永遠只取得拖曳的第一個檔案。
        // 如果有多選的話，就直接將拖曳的檔案列表轉發給檔案上傳欄位。
        if (file_input.getAttribute("multiple") === null) {
            var data = new DataTransfer();
            data.items.add(event.dataTransfer.files[0]);
            file_input.files = data.files;
        } else {
            file_input.files = event.dataTransfer.files;
        }

        // 觸發變更事件，讓其他程式能夠監聽此異動。
        file_input.dispatchEvent(new Event("change", { bubbles: true }));
    };

    // clickEventHandler
    clickEventHandler = event => {
        // 取得對應的 Fileplace 元素。
        var element = event.target.closest(`[${tocas.config.attributes.fileplace}]`);

        // 取得關聯的檔案上傳欄位。
        var file_input = this.getFileInput(element);

        // 點擊檔案上傳欄位來開啟檔案視窗。
        file_input.click();
    };
}

window.tocas_modules = [...window.tocas_modules, new FilePlace()]