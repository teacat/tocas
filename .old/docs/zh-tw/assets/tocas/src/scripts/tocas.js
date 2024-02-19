window.tocas = {
    config: {
        strict_responsive: false,
        attributes: {
            tab: "data-tab",
            tab_name: "data-name",
            toggle: "data-toggle",
            toggle_name: "data-name",
            input: "data-input",
            dropdown: "data-dropdown",
            dropdown_name: "data-name",
            dropdown_position: "data-position",
            tooltip: "data-tooltip",
            tooltip_position: "data-position",
            tooltip_delay: "data-delay",
            fileplace: "data-fileplace",
            fileplace_name: "data-name",
        },
        scopes: {
            tab: "@scope",
            toggle: "@scope",
            tab: "@scope",
            fileplace: "@scope",
            dropdown: "@scope",
            container: "@container",
        },
        classes: {
            hidden: "has-hidden",
            tab_active: "is-active",
            tooltip_visible: "is-visible",
            tab: "ts-tab",
        },
    },
};

window.tocas_modules = [];

//
(function () {
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
       Toggle
       ========================================================================== */

    // @import "tocas.toggle.js";

    /* ==========================================================================
       Dropdown
       ========================================================================== */

    // @import "tocas.dropdown.js";

    /* ==========================================================================
       Tooltip
       ========================================================================== */

    // @import "tocas.tooltip.js";

    /* ==========================================================================
       Select
       ========================================================================== */

    // @/import "tocas.select.js";

    /* ==========================================================================
       Input
       ========================================================================== */

    // @/import "tocas.input.js";

    /* ==========================================================================
       Fileplace
       ========================================================================== */

    // @/import "tocas.fileplace.js";

    /* ==========================================================================
       Base
       ========================================================================== */

    // searchScopeTargets
    searchScopeTargets = (element, name, scope_attribute, name_attribute) => {
        // 找尋這個元素最鄰近的命名空間容器。
        var container = element.closest(`[class*="${scope_attribute}"]`) || document;

        // 在命名空間裡找尋目標元素，但是這個目標元素
        //
        // NOTE: 這裡的 item.closest(`[class*="${scope_attribute}"]`) 可能要對應 === container，
        // 主要取決之後對命名空間的寬鬆度設計如何。
        //
        // 例如：A 命名空間裡有 B 跟 C 子空間，B 可以呼叫同為 A 空間裡的 C 空間裡的元素嗎？
        var targets = Array.from(container.querySelectorAll(`[${name_attribute}="${name}"]`)).filter(item => {
            return item.closest(`[class*="${scope_attribute}"]`) || document === container;
        });

        // 如果有找到元素則回傳。
        if (targets.length > 0) {
            return targets;
        }

        // 如果已經找到最上層了還是什麼結果都沒有，就回傳空陣列，讓其他程式報錯。
        if (container === document) {
            return [];
        }

        // 如果這一層找不到東西，就遞迴網更上面的命名空間來搜尋。
        return this.searchScopeTargets(container.parentNode, name, scope_attribute, name_attribute);
    };

    // createElement
    createElement = html => {
        var template = document.createElement("template");
        template.innerHTML = html.trim();
        return template.content.firstChild;
    };

    //
    addedNodeMutation = node => {
        window.tocas_modules.forEach(v => {
            if (typeof v.addedNodeMutation === "function") {
                v.addedNodeMutation(node);
            }
        })
    };

    //
    attributeMutation = mutation => {
        window.tocas_modules.forEach(v => {
            if (typeof v.attributeMutation === "function") {
                v.attributeMutation(mutation);
            }
        })
    };

    // mutation_observered 用來儲存正在監聽的元素以避免重複加入到 MutationObserver 裡。
    var mutation_observered = new Set([]);

    // MutationObserver 是真正會監聽每個元素異動的函式。
    var mutation_observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // 如果是屬性的異動就交給屬性函式處理。
            if (mutation.type === "attributes") {
                attributeMutation(mutation);
            }

            // 如果是節點的新增就交給節點函式處理。
            else if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(added_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (added_node.nodeType !== Node.ELEMENT_NODE || !(added_node instanceof HTMLElement)) {
                        return;
                    }

                    // 建立一個 TreeWalker 來加強 MutationObserver 的 childList 跟 subtree，
                    // 因為 MutationObserver 可能會忽略 Vue.js 那樣透過 innerHTML 修改節點的時候。
                    var tree_walker = document.createTreeWalker(added_node, NodeFilter.SHOW_ELEMENT);

                    // 收集需要監聽的 HTML 節點元素。
                    var nodes = [];

                    // 會使用遞迴，所以先將自己視為其中一個節點。
                    var current_node = tree_walker.currentNode;

                    // 不斷地爬到沒有下個節點為止。
                    while (current_node) {
                        nodes = [...nodes, current_node];
                        current_node = tree_walker.nextNode();
                    }

                    // 將使用 TreeWalker 爬到的每個節點收錄進 MutationObserver 裡面，監聽更詳細的節點。
                    nodes.forEach(node => {
                        // 如果這個節點已經被監聽過了則忽略。
                        if (mutation_observered.has(node)) {
                            return;
                        } else {
                            mutation_observered.add(node);
                        }

                        mutation_observer.observe(node, {
                            childList: true,
                            subtree: true,
                            attributes: true,
                            attributeOldValue: true,
                            attributeFilter: ["class"],
                        });

                        // 替這些節點呼叫對應的函式。
                        addedNodeMutation(node);
                    });
                });
            }

            // 如果是節點的移除就做一些清除的函式。
            else if (mutation.removedNodes && mutation.removedNodes.length) {
                mutation.removedNodes.forEach(removed_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (removed_node.nodeType !== Node.ELEMENT_NODE || !(removed_node instanceof HTMLElement)) {
                        return;
                    }

                    // 從已監聽的清單中移除來節省部份資源。
                    mutation_observered.delete(removed_node);
                });
            }
        });
    });

    // 監聽網頁元素異動的 MutationObserver。
    mutation_observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
    });

    /**
     * Window Resize
     */

    window.addEventListener("resize", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowResize === "function") {
                v.windowResize(event);
            }
        })
    });

    /**
     * Window Click
     */

    window.addEventListener("click", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowClick === "function") {
                v.windowClick(event);
            }
        })
    });
})();
