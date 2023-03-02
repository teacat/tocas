window.tocas = {
    config: {
        strict_responsive: false,
        attributes: {
            tab: "data-tab",
            tab_name: "data-name",
            toggle: "data-toggle",
            toggle_name: "data-name",
            dropdown: "data-dropdown",
            dropdown_name: "data-name",
            dropdown_position: "data-position",
            tooltip: "data-tooltip",
            tooltip_position: "data-position",
            tooltip_delay: "data-delay",
        },
        scopes: {
            tab: "@scope",
            toggle: "@scope",
            tab: "@scope",
            dropdown: "@scope",
            container: "@container",
        },
        classes: {
            hidden: "u-hidden",
            tab_active: "is-active",
            tooltip_visible: "is-visible",
            tab: "ts-tab",
        },
    },
};

//
(function () {
    // @import "floating-ui.min.js";

    /* ==========================================================================
       Responsive
       ========================================================================== */

    class Responsive {
        constructor() {
            // 這個 ResizeObserver 會監聽所有 Container 的尺寸異動，
            // 如果有異動就檢查裡面的所有響應式元素是否需要變動樣式。
            this.resize_observer = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.getAllContaineredElements(entry.target).forEach(element => {
                        this.check(element);
                    });
                });
            });
        }

        // attributeMutation
        attributeMutation(mutation) {
            // 如果有任何樣式異動，就馬上檢查這個元素的響應式渲染。
            // NOTE: 他目前會造成無限迴圈 :(
            // this.check(mutation.target);

            // 如果這個元素被追加 Container 樣式，就把他視為容器來監聽尺寸異動，
            // 但如果不再是 Container 的話，就從監聽裡移除。
            if (this.isContainer(mutation.target)) {
                this.resize_observer.observe(mutation.target);
            } else {
                this.resize_observer.unobserve(mutation.target);
            }
        }

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            // 如果這個追加的新元素帶有響應式樣式，就立即檢查響應式渲染。
            if (this.isResponsiveElement(addedNode)) {
                this.check(addedNode);
            }

            // 如果這個追加的新元素是一個 Container，就納入容器的尺寸監聽裡。
            if (this.isContainer(addedNode)) {
                this.resize_observer.observe(addedNode);
            }
        }

        // getAllContaineredElements
        getAllContaineredElements(container) {
            return container.querySelectorAll(tocas.config.strict_responsive ? `[class^="@"]:is([class*=":is-"],[class*=":u-"])` : `[class^="@"][class*=":"]`);
        }

        // getAllResponsiveElements
        getAllResponsiveElements(container) {
            return container.querySelectorAll(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"]` : `[class*=":"]`);
        }

        // isContainer
        isContainer(element) {
            return element.matches(`[class~="${tocas.config.scopes.container}"]`);
        }

        // isResponsiveElement
        isResponsiveElement(element) {
            return element.matches(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"]` : `[class*=":"]`);
        }

        // hasResponsiveClass
        hasResponsiveClass(class_name) {
            return tocas.config.strict_responsive ? class_name.includes(":is-") || class_name.includes(":u-") : class_name.includes(":");
        }

        // windowResize
        windowResize() {
            this.getAllResponsiveElements(document).forEach(element => {
                this.check(element);
            });
        }

        // unit
        unit(value) {
            return parseInt(value, 10) || 0;
        }

        // breakpointSize
        breakpointSize(breakpoint, element) {
            var style = window.getComputedStyle(element);

            return {
                min: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-min`)),
                max: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-max`)),
            };
        }

        // rule
        rule(rule, element) {
            // 判斷規則有沒有 @ 開頭來看是不是一個 Container Query。
            // @breakpoint
            var is_container_query = rule.startsWith("@");

            // 判斷規則的結尾有沒有 + 來看是不是要求大於或等於這個中斷點。
            // breakpoint+, [size]+
            var is_equal_or_greater = rule.endsWith("+");

            // 判斷規則的結尾有沒有 - 來看是不是要求小於或等於這個中斷點。
            // breakpoint-, [size]-
            var is_equal_or_lesser = rule.endsWith("-");

            // 判斷這個規則有沒有包含 [ 來看是不是一個自訂尺寸，不判斷開頭是因為開頭可能是 @ 一個 Container Query。
            // [size]
            var is_custom_size = rule.includes("[");

            // 移除首要的 @ 符號。
            if (is_container_query) {
                rule = rule.substring(1);
            }

            // 移除結尾的 +, - 符號。
            if (is_equal_or_greater || is_equal_or_lesser) {
                rule = rule.substring(0, rule.length - 1);
            }

            // 移除首要跟結尾的 [ 跟 ] 符號。
            if (is_custom_size) {
                rule = rule.substring(1).substring(0, rule.length - 1);
            }

            // 從 breakpoint-breakpoint 結構中拆出 min, max 值，如果有的話。
            var [min_breakpoint, max_breakpoint] = rule.split("-");

            // 如果是自訂尺寸的話，就直接把規則當作 Unit 去解析，不去讀元素的中斷點定義。
            if (is_custom_size) {
                // 如果是大於或等於的定義，就從 Unit 裡面解析最小起始點，然後最大值設為 99999。
                // [size] +
                if (is_equal_or_greater) {
                    return [this.unit(min_breakpoint), 99999];
                }

                // 如果是小於或等於的定義，最小值設為 0，然後 Unit 裡面的最小起始點就是目標最大值。
                // [size] -
                if (is_equal_or_lesser) {
                    return [0, this.unit(min_breakpoint)];
                }

                // [minSize-maxSize]
                return [this.unit(min_breakpoint), this.unit(max_breakpoint)];
            }

            // 從目前這個元素繼承的中斷點來搜尋最小的定義。
            var from = this.breakpointSize(min_breakpoint, element);

            // 如果這個規則有找到最大中斷點，那麼他就是 breakpoint-breakpoint 規則
            // 所以我們取得最大中斷點的像素定義，然後同時回傳最小跟最大的定義。
            if (max_breakpoint !== undefined) {
                return [from.min, this.breakpointSize(max_breakpoint, element).max];
            }

            // 如果是大於或等於的定義，就從繼承的定義裡取得最小起始點，然後最大值設為 99999。
            // breakpoint+
            if (is_equal_or_greater) {
                return [from.min, 99999];
            }

            // 如果是小於或等於的定義，最小值設為 0，然後繼承的定義裡，最小起始點就是目標最大值。
            // breakpoint-
            if (is_equal_or_lesser) {
                return [0, from.max];
            }

            // 如果這個定義不是大於也不是小於，就取得這個中斷點的最小與最大值定義，
            // 這個規則只會在這個中斷點生效。
            // breakpoint
            return [from.min, from.max];
        }

        // compile
        compile(element) {
            return Array.from(element.classList)
                .filter(class_name => this.hasResponsiveClass(class_name))
                .map(class_name => {
                    // 透過 `:` 來切分規則跟想要切換的樣式名稱。
                    var [rule, target_class] = class_name.split(":");

                    // 從規則解析這個樣式的中斷點起始與結束定義。
                    var [min, max] = this.rule(rule, element);

                    // 如果這個規則開頭有個 @ 符號，就尋找最近的 Container 容器來作為寬度判斷，
                    // 但如果沒有，就以視窗的 innerWidth 為主。
                    // @breakpoint
                    var width = rule.startsWith("@") ? element.closest(`[class~="${tocas.config.scopes.container}"]`).getBoundingClientRect().width : window.innerWidth;

                    return {
                        min,
                        max,
                        width,
                        target_class,
                    };
                });
        }

        // check
        check(element) {
            // 這個陣列會用來記得我們在目前中斷點有哪些樣式是生效的，
            // 這樣遇到不相符的中斷點，就不會因為起衝突然後又把他們移除掉。
            var applieds = [];

            // 篩選這個元素所有不含響應規則的樣式並且先把需要的樣式計算出相關中繼點來做整理。
            var compiled_list = this.compile(element);

            // 先跑一輪符合目前中斷點的樣式。
            compiled_list.forEach(({ width, min, max, target_class }) => {
                // 如果寬度符合這個中斷點，就套用對應的樣式。
                if (width >= min && width <= max) {
                    element.classList.add(target_class);

                    // 把這個樣式儲存到記憶陣列裡，這樣等一下就不會又移除他。
                    applieds = [...applieds, target_class];
                }
            });

            // 另外跑一輪不相符的中斷點，檢查有哪些不對的樣式應該移除掉。
            compiled_list.forEach(({ width, min, max, target_class }) => {
                // 如果寬度不符合這個中斷點，而且這個樣式也不是剛才追加的，就移除這個不符合條件的樣式。
                if ((width < min || width > max) && !applieds.includes(target_class)) {
                    element.classList.remove(target_class);
                }
            });
        }
    }

    /* ==========================================================================
       Stash
       ========================================================================== */

    /*class Stash {
        constructor() {}

        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            if (addedNode.matches(`[data-stash]`)) {
                this.initial(addedNode);
            }
        }

        // initial
        initial(element) {
            if (element.classList.contains("is-init")) {
                return;
            }
            element.classList.add("is-init");

            var clone = element.cloneNode(true);
            clone.classList.add("ts-stash");

            var toggle_name = element.getAttribute("data-stash");

            var toggle = document.querySelector(`[data-name="${toggle_name}"]`);

            if (toggle.closest("[data-stash]") === element) {
                var width = document.querySelector(`[data-name="${toggle_name}"]`).getBoundingClientRect().width;

                clone.style.setProperty("--ts-stash-offset", `${width + 5}px`);
            }

            element.after(clone);

            const observer = new IntersectionObserver(
                (entries, owner) => {
                    entries.forEach(entry => {
                        var stash = entry.target.getAttribute("data-target");

                        if (entry.isIntersecting) {
                            element.querySelector(`[data-target="${stash}"]`).classList.remove(tocas.config.classes.hidden);
                            document.querySelector(`[data-name="${stash}"]`).classList.add(tocas.config.classes.hidden);
                        } else {
                            element.querySelector(`[data-target="${stash}"]`).classList.add(tocas.config.classes.hidden);
                            document.querySelector(`[data-name="${stash}"]`).classList.remove(tocas.config.classes.hidden);
                        }

                        if (element.querySelectorAll(`.${tocas.config.classes.hidden}[data-target]`).length > 0) {
                            document.querySelector(`[data-name="${toggle_name}"]`).classList.remove(tocas.config.classes.hidden);
                        } else {
                            document.querySelector(`[data-name="${toggle_name}"]`).classList.add(tocas.config.classes.hidden);
                        }
                    });
                },
                {
                    root: clone,
                    rootMargin: "0px 0px 0px 0px",
                    threshold: [0.99],
                }
            );

            clone.querySelectorAll("[data-target]").forEach(v => {
                observer.observe(v);
            });
        }
    }*/

    /* ==========================================================================
       Tab
       ========================================================================== */

    class Tab {
        constructor() {}

        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            // 如果這個新追加的 DOM 節點是一個 Tab 模組，就監聽其點擊事件。
            if (this.isTab(addedNode)) {
                // 監聽其點擊事件。
                this.bindEventListener(addedNode);

                // 如果這個項目沒有被啟用，就預設隱藏對應的內容，這樣使用者就不用額外手動隱藏該內容。
                this.initialTab(addedNode);
            }
        }

        // isTab
        isTab(element) {
            return element.matches(`[${tocas.config.attributes.tab}]`);
        }

        // isActiveTab
        isActiveTab(element) {
            return element.classList.contains(tocas.config.classes.tab_active);
        }

        // initialTab
        initialTab(element) {
            if (!this.isActiveTab(element)) {
                searchScopeTargets(element, element.getAttribute(tocas.config.attributes.tab), tocas.config.scopes.tab, tocas.config.attributes.tab_name).forEach(target => {
                    target.classList.add(tocas.config.classes.hidden);
                });
            }
        }

        // toggle
        toggle(event) {
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
        }

        // bindEventListener
        bindEventListener(element) {
            element.removeEventListener("click", this.toggle);
            element.addEventListener("click", this.toggle);
        }
    }

    /* ==========================================================================
       Toggle
       ========================================================================== */

    class Toggle {
        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            // 如果這個新追加的 DOM 節點是一個 Toggle 模組，就監聽其點擊事件。
            if (this.isToggle(addedNode)) {
                this.bindEventListener(addedNode);
            }
        }

        // isToggle
        isToggle(element) {
            return element.matches(`[${tocas.config.attributes.toggle}]`);
        }

        // toggle
        toggle(event) {
            // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的切換模組。
            var element = event.target.closest(`[${tocas.config.attributes.toggle}]`);

            // 透過 `:` 從規則裡切分出目標名稱還有欲切換的樣式名稱。
            var [name, class_name] = element.getAttribute(tocas.config.attributes.toggle).split(":");

            // 尋找同個命名空間裡的所有目標，然後切換所有目標元素的指定樣式。
            searchScopeTargets(element, name, tocas.config.scopes.toggle, tocas.config.attributes.toggle_name).forEach(target => {
                target.classList.toggle(class_name);
            });
        }

        // bindEventListener
        bindEventListener(element) {
            element.removeEventListener("click", this.toggle.bind(this));
            element.addEventListener("click", this.toggle.bind(this));
        }
    }

    /* ==========================================================================
       Dropdown
       ========================================================================== */

    class Dropdown {
        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            // 如果這個追加的 DOM 元素是一個會觸發彈出式選單的元素，就監聽其點擊事件。
            if (this.isDropdownTrigger(addedNode)) {
                this.bindEventListener(addedNode);
            }

            // 如果這個追加的 DOM 元素是一個彈出式選單容器，就監聽其選項點擊事件。
            if (this.isDropdown(addedNode)) {
                this.bindItemEventListener(addedNode);
            }
        }

        // isDropdownTrigger
        isDropdownTrigger(element) {
            return element.matches(`[${tocas.config.attributes.dropdown}]`);
        }

        // isDropdown
        isDropdown(element) {
            return element.matches(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);
        }

        // position
        position(element) {
            return element.getAttribute(tocas.config.attributes.dropdown_position) || "bottom";
        }

        // windowClick
        windowClick(event) {
            // 取得這個視窗點擊最鄰近的 Dropdown 模組觸發元素。
            var closest_trigger = event.target.closest(`[${tocas.config.attributes.dropdown}]`);

            // 取得這個視窗點擊最鄰近的 Dropdown 容器本身。
            var closest_dropdown = event.target.closest(`[${tocas.config.attributes.dropdown_name}]`);

            // 如果這個點擊事件既沒有關聯任何觸發元素，也沒有在點擊任何 Dropdown 容器，
            // 那使用者應該就是在點擊其他東西，所以關閉所有頁面上可見的彈出式選單。
            if (closest_trigger === null && closest_dropdown === null) {
                document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                    this.closeDropdown(dropdown);
                });
            }

            // 如果這個點擊事件是在點擊一個會開關 Dropdown 的觸發元素。
            if (closest_trigger !== null) {
                // 取得這個觸發元素原本會打開的 Dropdown 名稱。
                var name = closest_trigger.getAttribute(tocas.config.attributes.dropdown);

                // 透過該名稱搜尋對應的 Dropdown。
                var local_dropdown = searchScopeTargets(closest_trigger, name, tocas.config.scopes.dropdown, tocas.config.attributes.dropdown_name)[0];

                // 除了找到的這個對應 Dropdown 以外，關掉其他所有 Dropdown。
                this.closeDropdownsExcept(local_dropdown);
            }

            // 如果這個點擊事件是在點擊某個 Dropdown 容器或內部的項目。
            if (closest_dropdown !== null) {
                // 關閉這個 Dropdown 以外的其他所有 Dropdown。
                this.closeDropdownsExcept(closest_dropdown);
            }
        }

        // closeDropdownsExcept
        closeDropdownsExcept(excluded_dropdown) {
            document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                if (dropdown !== excluded_dropdown) {
                    this.closeDropdown(dropdown);
                }
            });
        }

        // bindEventListener
        bindEventListener(element) {
            element.removeEventListener("click", this.clickEventListener.bind(this));
            element.addEventListener("click", this.clickEventListener.bind(this));
        }

        // bindItemEventListener
        bindItemEventListener(element) {
            element.removeEventListener("click", this.itemClickEventListener.bind(this));
            element.addEventListener("click", this.itemClickEventListener.bind(this));
        }

        // closeDropdown
        closeDropdown(dropdown) {
            // 如果這個元素不包含 `ts-dropdown` 或者也不是可見狀態，就忽略不計。
            if (!dropdown.classList.contains(".ts-dropdown") && !dropdown.classList.contains("is-visible")) {
                return;
            }

            // 移除這個彈出式選單的可見狀態。
            dropdown.classList.remove("is-visible");

            // 如果這個彈出式選單有 FLoating UI 的清除函式，就呼叫該清除函式，
            // 然後重設對應的 CSS 變數。
            if (dropdown.tocas_dropdown !== undefined) {
                dropdown.tocas_dropdown();
                dropdown.tocas_dropdown = undefined;
                dropdown.style.removeProperty("--ts-dropdown-min-width");
                dropdown.style.removeProperty("--ts-dropdown-position");
            }
        }

        // itemClickEventListener
        itemClickEventListener(event) {
            // 取得這個點擊事件最鄰近的彈出式選單。
            var dropdown = event.target.closest(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);

            // 如果找不到點擊事件最鄰近的選單項目，
            // 那可能點擊的不是項目而是其他容器裡的東西，那就忽略這個動作。
            if (event.target.closest(".item") === null) {
                return;
            }

            // 項目點擊成功，關閉這個彈出式選單。
            this.closeDropdown(dropdown);
        }

        // clickEventListener
        clickEventListener(event) {
            //
            var element = event.target.closest(`[${tocas.config.attributes.dropdown}]`);

            // 取得這個觸發元素會切換的彈出式選單名稱。
            var name = element.getAttribute(tocas.config.attributes.dropdown);

            // 透過命名空間搜尋對應的彈出式選單。
            var target = searchScopeTargets(element, name, tocas.config.scopes.dropdown, tocas.config.attributes.dropdown_name)[0];

            // 取得目標選單的偏好位置設定。
            var position = this.position(target);

            // 如果那個選單有 Floating UI 清除函式，就先清除並且重設相關位置設定。
            if (target.tocas_dropdown !== undefined) {
                target.tocas_dropdown();
                target.tocas_dropdown = undefined;
                target.style.removeProperty("--ts-dropdown-min-width");
                target.style.removeProperty("--ts-dropdown-position");
            }

            // 切換目標彈出式選單的可見度。
            target.classList.toggle("is-visible");

            // 如果目標選單現在不再可見，就是被隱藏了，那就不需要執行接下來的行為。
            if (!target.classList.contains("is-visible")) {
                return;
            }

            // 設定選單的最小寬度和絕對位置，至少要跟切換觸發元素一樣寬。
            target.style.setProperty("--ts-dropdown-min-width", `${element.getBoundingClientRect().width}px`);
            target.style.setProperty("--ts-dropdown-position", `fixed`);

            // 透過 Floating UI 來觸發浮動顯示。
            target.tocas_dropdown = TocasFloatingUIDOM.autoUpdate(element, target, () => {
                TocasFloatingUIDOM.computePosition(element, target, {
                    strategy: "fixed",
                    placement: position,
                    middleware: [
                        // 選單某面如果沒有空間就被擠兌到另一邊。
                        TocasFloatingUIDOM.flip({
                            crossAxis: false,
                        }),

                        // 偏移選單的上下垂直留點空隙。
                        TocasFloatingUIDOM.offset(8),

                        // 選單會被螢幕左右推移，避免超出畫面空間。
                        TocasFloatingUIDOM.shift(),
                    ],
                }).then(({ x, y }) => {
                    // 賦予彈出式選單絕對位置。
                    Object.assign(target.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                });
            });
        }
    }

    /* ==========================================================================
       Tooltip
       ========================================================================== */

    class Tooltip {
        // attributeMutation
        attributeMutation(mutation) {
            // 如果追加的屬性包含 Tooltip 模組相關字樣，就監聽其互動事件。
            if (this.isTooltip(mutation.target)) {
                this.bindEventListener(mutation.target);
            }
        }

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            // 如果追加的 DOM 節點是一個 Tooltip 模組就監聽其互動事件。
            if (this.isTooltip(addedNode)) {
                this.bindEventListener(addedNode);
            }
        }

        // isTooltip
        isTooltip(element) {
            return element.matches(`[${tocas.config.attributes.tooltip}]`);
        }

        // bindEventListener
        bindEventListener(element) {
            // 重設這個元素的彈出提示計時器。
            element.tocas_tooltip_timer = null;

            // 監聽滑鼠移入跟移出的事件。
            this.enterEventListener(element);
            this.leaveEventListener(element);
        }

        // delay
        delay(element) {
            // 從元素的屬性裡取得延遲的定義，如果是 0 就回傳 0。
            // 不直接丟給 parseInt 是因為可能會被當 false 值而回傳預設的 200ms。
            var delay = element.getAttribute(tocas.config.attributes.tooltip_delay);
            if (delay === "0") {
                return 0;
            }
            return parseInt(delay, 10) || 200;
        }

        // position
        position(element) {
            return element.getAttribute(tocas.config.attributes.tooltip_position) || "bottom";
        }

        // enterEventListener
        enterEventListener(element) {
            element.addEventListener("mouseover", event => {
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
            });
        }

        // leaveEventListener
        leaveEventListener(element) {
            element.addEventListener("mouseleave", event => {
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
            });
        }

        // createTooltip
        createTooltip(element, arrow) {
            var tooltip = document.createElement("div");
            tooltip.innerText = element.getAttribute(tocas.config.attributes.tooltip);
            tooltip.classList.add("ts-tooltip", tocas.config.classes.tooltip_visible);
            tooltip.appendChild(arrow);
            return tooltip;
        }

        // createArrow
        createArrow() {
            var arrow = document.createElement("div");
            arrow.classList.add("arrow");
            return arrow;
        }

        // showTooltip
        showTooltip(element) {
            // 取得這個工具提示的位置設定。
            var position = this.position(element);

            // 初始化工具提示的箭頭 DOM 元素。
            var arrow = this.createArrow();

            // 使用剛才建立的箭頭元素來初始化工具提示本身的 DOM 元素。
            var tooltip = this.createTooltip(element, arrow);

            // 將工具提示插入到網頁中。
            document.body.appendChild(tooltip);

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
                            crossAxis: -15,
                            mainAxis: 10,
                        }),

                        // 會被螢幕左右推移。
                        TocasFloatingUIDOM.shift(),

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
        }
    }

    /* ==========================================================================
       Base
       ========================================================================== */

    // searchScopeTargets
    function searchScopeTargets(element, name, scope_attribute, name_attribute) {
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
    }

    // responsiveModule
    var responsiveModule = new Responsive();

    // tabModule
    var tabModule = new Tab();

    // toggleModule
    var toggleModule = new Toggle();

    // dropdownModule
    var dropdownModule = new Dropdown();

    // tooltipModule
    var tooltipModule = new Tooltip();

    // stashModule
    // var stashModule = new Stash();

    var mutation_observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes") {
                responsiveModule.attributeMutation(mutation);
                tabModule.attributeMutation(mutation);
                toggleModule.attributeMutation(mutation);
                dropdownModule.attributeMutation(mutation);
                tooltipModule.attributeMutation(mutation);
                // stashModule.attributeMutation(mutation);
            } else if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }
                    responsiveModule.addedNodeMutation(addedNode);
                    tabModule.addedNodeMutation(addedNode);
                    toggleModule.addedNodeMutation(addedNode);
                    dropdownModule.addedNodeMutation(addedNode);
                    tooltipModule.addedNodeMutation(addedNode);
                    // stashModule.addedNodeMutation(addedNode);
                });
            }
        });
    });

    //
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
        responsiveModule.windowResize(event);
    });

    /**
     * Window Click
     */

    window.addEventListener("click", event => {
        dropdownModule.windowClick(event);
    });
})();
