window.tocas = {
    config: {
        strict_responsive: false,
    },
}

window.tocas_modules = []

//
;(function () {
    /* ==========================================================================
       Floating UI
       ========================================================================== */

    // @import "tocas.floating-ui.js";

    /* ==========================================================================
       Responsive
       ========================================================================== */

    // @import "tocas.responsive.js";

    /* ==========================================================================
       Tab
       ========================================================================== */

    // @import "tocas.tab.js";

    /* ==========================================================================
       Dropdown
       ========================================================================== */

    // @import "tocas.dropdown.js";

    /* ==========================================================================
       Popover
       ========================================================================== */

    // @import "tocas.popover.js";

    /* ==========================================================================
       Tooltip
       ========================================================================== */

    // @import "tocas.tooltip.js";

    /* ==========================================================================
       Select
       ========================================================================== */

    // @/import "tocas.select.js";

    /* ==========================================================================
       Dialog
       ========================================================================== */

    // @import "tocas.dialog.js";

    /* ==========================================================================
       Base
       ========================================================================== */

    // getID
    getID = () => {
        return (Math.random().toString(36) + "00000000000000000").slice(2, 10 + 2)
    }

    // createElement
    createElement = html => {
        var template = document.createElement("template")
        template.innerHTML = html.trim()
        return template.content.firstChild
    }

    //
    addedNodeMutation = node => {
        window.tocas_modules.forEach(v => {
            if (typeof v.addedNodeMutation === "function") {
                v.addedNodeMutation(node)
            }
        })
    }

    //
    removedNodeMutation = node => {
        window.tocas_modules.forEach(v => {
            if (typeof v.removedNodeMutation === "function") {
                v.removedNodeMutation(node)
            }
        })
    }

    //
    attributeMutation = mutation => {
        window.tocas_modules.forEach(v => {
            if (typeof v.attributeMutation === "function") {
                v.attributeMutation(mutation)
            }
        })
    }

    // mutation_observered 用來儲存正在監聽的元素以避免重複加入到 MutationObserver 裡。
    var mutation_observered = new Set([])

    // MutationObserver 是真正會監聽每個元素異動的函式。
    var mutation_observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // 如果是屬性的異動就交給屬性函式處理。
            if (mutation.type === "attributes") {
                attributeMutation(mutation)
            }

            // 如果是節點的新增就交給節點函式處理。
            else if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(added_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (added_node.nodeType !== Node.ELEMENT_NODE || !(added_node instanceof HTMLElement)) {
                        return
                    }

                    // 建立一個 TreeWalker 來加強 MutationObserver 的 childList 跟 subtree，
                    // 因為 MutationObserver 可能會忽略 Vue.js 那樣透過 innerHTML 修改節點的時候。
                    var tree_walker = document.createTreeWalker(added_node, NodeFilter.SHOW_ELEMENT)

                    // 收集需要監聽的 HTML 節點元素。
                    var nodes = []

                    // 會使用遞迴，所以先將自己視為其中一個節點。
                    var current_node = tree_walker.currentNode

                    // 不斷地爬到沒有下個節點為止。
                    while (current_node) {
                        nodes = [...nodes, current_node]
                        current_node = tree_walker.nextNode()
                    }

                    // 將使用 TreeWalker 爬到的每個節點收錄進 MutationObserver 裡面，監聽更詳細的節點。
                    nodes.forEach(node => {
                        // 如果這個節點已經被監聽過了則忽略。
                        if (mutation_observered.has(node)) {
                            return
                        } else {
                            mutation_observered.add(node)
                        }

                        mutation_observer.observe(node, {
                            childList: true,
                            subtree: true,
                            attributes: true,
                            attributeOldValue: true,
                            attributeFilter: ["class"],
                        })

                        // 替這些節點呼叫對應的函式。
                        addedNodeMutation(node)
                    })
                })
            }

            // 如果是節點的移除就做一些清除的函式。
            else if (mutation.removedNodes && mutation.removedNodes.length) {
                mutation.removedNodes.forEach(removed_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (removed_node.nodeType !== Node.ELEMENT_NODE || !(removed_node instanceof HTMLElement)) {
                        return
                    }

                    // 替這些節點呼叫對應的函式。
                    removedNodeMutation(removed_node)

                    // 從已監聽的清單中移除來節省部份資源。
                    mutation_observered.delete(removed_node)
                })
            }
        })
    })

    // 監聽網頁元素異動的 MutationObserver。
    mutation_observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
    })

    /**
     * Window Resize
     */

    window.addEventListener("resize", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowResize === "function") {
                v.windowResize(event)
            }
        })
    })

    /**
     * Window Click
     */

    window.addEventListener("click", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowClick === "function") {
                v.windowClick(event)
            }
        })
    })

    window.addEventListener("mousedown", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowMousedown === "function") {
                v.windowMousedown(event)
            }
        })
    })
})()
