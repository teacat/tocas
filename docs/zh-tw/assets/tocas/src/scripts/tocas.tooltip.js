class Tooltip {
    // attributeMutation
    attributeMutation = mutation => {
        // 如果追加的屬性包含 Tooltip 模組相關字樣，就監聽其互動事件。
        if (this.isTooltip(mutation.target)) {
            this.bindEventListener(mutation.target);
        }
    };

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果追加的 DOM 節點是一個 Tooltip 模組就監聽其互動事件。
        if (this.isTooltip(added_node)) {
            this.bindEventListener(added_node);
        }
    };

    // isTooltip
    isTooltip = element => {
        return element.matches(`[${tocas.config.attributes.tooltip}]`);
    };

    // bindEventListener
    bindEventListener = element => {
        // 重設這個元素的彈出提示計時器。
        element.tocas_tooltip_timer = null;

        // 監聽滑鼠移入跟移出的事件。
        element.removeEventListener("mouseover", this.enterEventListener);
        element.addEventListener("mouseover", this.enterEventListener);

        element.removeEventListener("mouseleave", this.leaveEventListener);
        element.addEventListener("mouseleave", this.leaveEventListener);
    };

    // delay
    delay = element => {
        // 從元素的屬性裡取得延遲的定義，如果是 0 就回傳 0。
        // 不直接丟給 parseInt 是因為可能會被當 false 值而回傳預設的 200ms。
        var delay = element.getAttribute(tocas.config.attributes.tooltip_delay);
        if (delay === "0") {
            return 0;
        }
        return parseInt(delay, 10) || 200;
    };

    // position
    position = element => {
        return element.getAttribute(tocas.config.attributes.tooltip_position) || "bottom";
    };

    // enterEventListener
    enterEventListener = event => {
        var element = event.target.closest(`[${tocas.config.attributes.tooltip}]`);

        // 如果目前的裝置是觸控裝置就忽略工具提示的觸發行為。
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        // 如果上一個工具提示的觸發計時器還存在或浮動元素還在的話，就忽略本次觸發行為，
        // 避免二次觸發而造成不可預期的錯誤。
        if (element.tocas_tooltip_timer !== null || element.tocas_tooltip !== undefined) {
            return;
        }

        // 初始化一個會顯示工具提示的計時器，這樣滑鼠移入的數秒後就會顯示。
        element.tocas_tooltip_timer = setTimeout(() => {
            this.showTooltip(element);
        }, this.delay(element) + 1);
    };

    // leaveEventListener
    leaveEventListener = event => {
        var element = event.target.closest(`[${tocas.config.attributes.tooltip}]`);

        // 如果離開的元素不是主元素就忽略，
        // 如：使用者可能是離開了裡面的圖示元素，但滑鼠其實還在主元素裡。
        if (event.target !== element) {
            return;
        }

        // 如果浮動元素存在的話，就呼叫浮動元素的解除函式，然後歸零這個變數。
        if (element.tocas_tooltip !== undefined) {
            element.tocas_tooltip();
            element.tocas_tooltip = undefined;
        }

        // 如果原先的計時器存在的話，就先重設，避免重複觸發。
        if (element.tocas_tooltip_timer !== null) {
            clearTimeout(element.tocas_tooltip_timer);
            element.tocas_tooltip_timer = null;
        }

        // 移除頁面上的所有工具提示。
        document.querySelectorAll(".ts-tooltip").forEach(tooltip => {
            tooltip.remove();
        });
    };

    // createTooltip
    createTooltip = (element, arrow) => {
        var tooltip = document.createElement("div");
        tooltip.innerText = element.getAttribute(tocas.config.attributes.tooltip);
        tooltip.classList.add("ts-tooltip", tocas.config.classes.tooltip_visible);

        tooltip.append(arrow);
        return tooltip;
    };

    // createArrow
    createArrow = () => {
        var arrow = document.createElement("div");
        arrow.classList.add("arrow");
        return arrow;
    };

    // showTooltip
    showTooltip = element => {
        // 取得這個工具提示的位置設定。
        var position = this.position(element);

        // 初始化工具提示的箭頭 DOM 元素。
        var arrow = this.createArrow();

        // 使用剛才建立的箭頭元素來初始化工具提示本身的 DOM 元素。
        var tooltip = this.createTooltip(element, arrow);

        // 將工具提示插入到網頁中。
        document.body.append(tooltip);

        // 使用 FloatingUI 來初始化工具提示的浮動元素。
        element.tocas_tooltip = TocasFloatingUIDOM.autoUpdate(element, tooltip, () => {
            TocasFloatingUIDOM.computePosition(element, tooltip, {
                strategy: "fixed",
                placement: position,
                middleware: [
                    // 下面過窄時會擠兌到上面。
                    TocasFloatingUIDOM.flip({
                        crossAxis: false,
                    }),

                    // 因為有箭頭所以上下軸要偏移 10px，
                    // 而容器有外距（詳見 CSS）所以左右要偏移 15px。
                    TocasFloatingUIDOM.offset({
                        //crossAxis: -15,
                        mainAxis: 10,
                    }),

                    // 會被螢幕左右推移。
                    TocasFloatingUIDOM.shift({
                        padding: 20, // 0 by default
                    }),

                    // 有箭頭。
                    TocasFloatingUIDOM.arrow({
                        element: arrow,
                    }),
                ],
            }).then(({ middlewareData, x, y, placement }) => {
                // 賦予工具提示絕對座標。
                Object.assign(tooltip.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });

                // 設置箭頭的水平座標，因為箭頭只會出現在上面或下面，所以不需要 y 座標。
                if (middlewareData.arrow) {
                    const { x } = middlewareData.arrow;
                    arrow.style.setProperty("--ts-tooltip-x", x != null ? `${x}px` : "0");
                }

                // 先移除先前的所有位置設定，再套用新的位置設定。
                if (placement) {
                    tooltip.classList.remove("is-top", "is-top-start", "is-top-end", "is-bottom", "is-bottom-start", "is-bottom-end");
                    tooltip.classList.add(`is-${placement}`);
                }
            });
        });
    };
}

window.tocas_modules = [...window.tocas_modules, new Tooltip()]