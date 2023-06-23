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
        attributeMutation = mutation => {
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
        };

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個追加的新元素帶有響應式樣式，就立即檢查響應式渲染。
            if (this.isResponsiveElement(added_node)) {
                this.check(added_node);
            }

            // 如果這個追加的新元素是一個 Container，就納入容器的尺寸監聽裡。
            if (this.isContainer(added_node)) {
                this.resize_observer.observe(added_node);
            }
        };

        // getAllContaineredElements
        getAllContaineredElements = container => {
            return container.querySelectorAll(tocas.config.strict_responsive ? `[class^="@"]:is([class*=":is-"],[class*=":u-"])` : `[class^="@"][class*=":"]`);
        };

        // getAllResponsiveElements
        getAllResponsiveElements = container => {
            return container.querySelectorAll(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"]` : `[class*=":"]`);
        };

        // isContainer
        isContainer = element => {
            return element.matches(`[class~="${tocas.config.scopes.container}"]`);
        };

        // isResponsiveElement
        isResponsiveElement = element => {
            return element.matches(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"]` : `[class*=":"]`);
        };

        // hasResponsiveClass
        hasResponsiveClass = class_name => {
            return tocas.config.strict_responsive ? class_name.includes(":is-") || class_name.includes(":u-") : class_name.includes(":");
        };

        // windowResize
        windowResize = () => {
            this.getAllResponsiveElements(document).forEach(element => {
                this.check(element);
            });
        };

        // unit
        unit = value => {
            return parseInt(value, 10) || 0;
        };

        // breakpointSize
        breakpointSize = (breakpoint, element) => {
            var style = window.getComputedStyle(element);

            return {
                min: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-min`)),
                max: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-max`)),
            };
        };

        // rule
        rule = (rule, element) => {
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
        };

        // compile
        compile = element => {
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
                    var width = rule.startsWith("@")
                        ? Math.round(element.closest(`[class~="${tocas.config.scopes.container}"]`).getBoundingClientRect().width)
                        : Math.round(window.innerWidth);

                    return {
                        min,
                        max,
                        width,
                        target_class,
                    };
                });
        };

        // check
        check = element => {
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
        };
    }

    /* ==========================================================================
       Stash
       ========================================================================== */

    /*class Stash {
        constructor() {}

        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(added_node) {
            if (addedNode.matches(`[data-stash]`)) {
                this.initial(added_node);
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

    /* ==========================================================================
       Toggle
       ========================================================================== */

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

    /* ==========================================================================
       Dropdown
       ========================================================================== */

    class Dropdown {
        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個追加的 DOM 元素是一個會觸發彈出式選單的元素，就監聽其點擊事件。
            if (this.isDropdownTrigger(added_node)) {
                this.bindEventListener(added_node);
            }

            // 如果這個追加的 DOM 元素是一個彈出式選單容器，就監聽其選項點擊事件。
            if (this.isDropdown(added_node)) {
                this.bindItemEventListener(added_node);
            }
        };

        // isDropdownTrigger
        isDropdownTrigger = element => {
            return element.matches(`[${tocas.config.attributes.dropdown}]`);
        };

        // isDropdown
        isDropdown = element => {
            return element.matches(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);
        };

        // position
        position = element => {
            return element.getAttribute(tocas.config.attributes.dropdown_position) || "bottom";
        };

        // windowClick
        windowClick = event => {
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
        };

        // closeDropdownsExcept
        closeDropdownsExcept = excluded_dropdown => {
            document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                if (dropdown !== excluded_dropdown) {
                    this.closeDropdown(dropdown);
                }
            });
        };

        // bindEventListener
        bindEventListener = element => {
            element.removeEventListener("click", this.clickEventListener);
            element.addEventListener("click", this.clickEventListener);
        };

        // bindItemEventListener
        bindItemEventListener = element => {
            element.removeEventListener("click", this.itemClickEventListener);
            element.addEventListener("click", this.itemClickEventListener);
        };

        // closeDropdown
        closeDropdown = dropdown => {
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
        };

        // itemClickEventListener
        itemClickEventListener = event => {
            // 取得這個點擊事件最鄰近的彈出式選單。
            var dropdown = event.target.closest(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);

            // 如果找不到點擊事件最鄰近的選單項目，
            // 那可能點擊的不是項目而是其他容器裡的東西，那就忽略這個動作。
            if (event.target.closest(".item") === null) {
                return;
            }

            // 項目點擊成功，關閉這個彈出式選單。
            this.closeDropdown(dropdown);
        };

        // clickEventListener
        clickEventListener = event => {
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
        };
    }

    /* ==========================================================================
       Tooltip
       ========================================================================== */

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

    /* ==========================================================================
       AutoSize
       ========================================================================== */

    class AutoSize {
        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果追加的 DOM 節點是一個 Tooltip 模組就監聽其互動事件。
            if (this.isAutoSize(added_node)) {
                this.bindEventListener(added_node);
            }
        };

        // isAutoSize
        isAutoSize = element => {
            return element.matches(`[data-autosize]`);
        };

        // bindEventListener
        bindEventListener = element => {
            element.addEventListener("input", event => {
                this.recalculateSize(event);
            });
            element.addEventListener("change", event => {
                // this.recalculateSize(event);
            });
        };

        // recalculateSize
        recalculateSize = event => {
            var element = event.target.closest(`input, textarea`);
            var direction = element.getAttribute("data-autosize");

            //
            if (direction === "horizontal") {
                var computed = window.getComputedStyle(element, null);
                var border_offset =
                    Math.round(parseFloat(computed.getPropertyValue("border-left-width"))) + Math.round(parseFloat(computed.getPropertyValue("border-right-width")));
                var padding_offset = Math.round(parseFloat(computed.getPropertyValue("padding-left"))) + Math.round(parseFloat(computed.getPropertyValue("padding-right")));

                element.style.width = `${this.calculateWidth(element) + border_offset + padding_offset}px`;
            }

            //
            if (direction === "vertical") {
                element.style.height = "";
                element.style.overflowY = "hidden";

                var max_rows = parseInt(element.getAttribute("data-max-rows")) || 0;
                var computed = window.getComputedStyle(element, null);
                var line_height = Math.round(parseFloat(computed.getPropertyValue("line-height")));
                var height = Math.round(this.calculateHeight(element));
                var rows = Math.floor(height / line_height);

                var border_offset =
                    Math.round(parseFloat(computed.getPropertyValue("border-top-width"))) + Math.round(parseFloat(computed.getPropertyValue("border-bottom-width")));
                var padding_offset = Math.round(parseFloat(computed.getPropertyValue("padding-top"))) + Math.round(parseFloat(computed.getPropertyValue("padding-bottom")));

                if (max_rows > 0 && rows >= max_rows) {
                    var max_height = Math.round(line_height * max_rows + border_offset + padding_offset);

                    element.style.overflowY = "auto";

                    element.style.height = `${max_height}px`;

                    return;
                }

                element.style.height = `${height + border_offset}px`;

                element.style.overflowY = "auto";
            }
        };

        // calculateHeight
        calculateHeight = element => {
            return element.scrollHeight;
        };

        // calculateWidth
        calculateWidth = element => {
            var canvas = this.calculateWidth.canvas || (this.calculateWidth.canvas = document.createElement("canvas"));
            var context = canvas.getContext("2d");
            var font = window.getComputedStyle(element, null).getPropertyValue("font");
            var text = element.value;
            context.font = font;
            var textMeasurement = context.measureText(text);
            return Math.floor(textMeasurement.width);
        };
    }

    /* ==========================================================================
       Input
       ========================================================================== */

    class Input {
        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果是密碼欄位。
            if (this.isPassword(added_node)) {
                this.initializePassword(added_node);
            }

            // 如果是標籤欄位。
            if (this.isChips(added_node)) {
                this.initializeChips(added_node);
                //this.bindChipsEventListener(added_node);
            }

            // 如果是多選欄位。
            if (this.isMultiInput(added_node)) {
                this.initializeMultiInput(added_node);
                this.bindMultiInputEventListener(added_node);
            }

            // 如果是豐富下拉式選擇。
            if (this.isSelect(added_node)) {
                this.initializeSelect(added_node);
                this.bindSelectEventListener(added_node);
            }

            // 如果是複合式輸入欄位。
            if (this.isCombo(added_node)) {
                this.initializeCombo(added_node);
                this.bindComboEventListener(added_node);
            }
        };

        //
        constructor() {
            setInterval(() => {
                document.querySelectorAll(`[data-input="chips"]`).forEach(element => {
                    this.updateChipsView(element);
                });
                document.querySelectorAll(`[data-input="combo"]`).forEach(element => {
                    this.updateComboView(element);
                });
                document.querySelectorAll(`[data-input="multi"]`).forEach(element => {
                    this.updateMultiInputView(element);
                });
                document.querySelectorAll(`[data-input="select"]`).forEach(element => {
                    this.updateSelectView(element);
                });
            }, 100);
        }

        // windowClick
        windowClick = event => {
            // todo 限制是 data-input, 不然會關到範例的 select dorpdown
            var closest_container = event.target.closest(".ts-input,.ts-select");

            if (closest_container === null) {
                document.querySelectorAll(`.ts-input,.ts-select`).forEach(container => {
                    //this.closeDropdown(container);
                });
            }

            if (closest_container !== null) {
                //this.closeDropdownsExcept(closest_container);
            }
        };

        // closeDropdownsExcept
        closeDropdownsExcept = excluded_container => {
            document.querySelectorAll(`.ts-input,.ts-select`).forEach(container => {
                if (container !== excluded_container) {
                    this.closeDropdown(container);
                }
            });
        };

        // closeDropdown
        closeDropdown = container => {
            var dropdown = this.getDropdown(container);
            if (dropdown === null) {
                return;
            }
            dropdown.remove();
        };

        // search
        /*search = (keyword, options) => {
            keyword = keyword.trim();

            if (keyword === "") {
                return options
            }

            // accent & caseinsentive

            var result = Array.from(options)
                .filter(option => option.value.includes(keyword) || option.text.includes(keyword))
                .sort((a, b) => {
                    const aIndex = a.value.indexOf(keyword);
                    const bIndex = b.value.indexOf(keyword);
                    const aSimilarity = this.similarity(a.value, keyword);
                    const bSimilarity = this.similarity(b.value, keyword);

                    if (aIndex === -1 && bIndex === -1) {
                        return 0;
                    }

                    if (aIndex !== -1 && bIndex === -1) {
                        return -1;
                    }

                    if (aIndex === -1 && bIndex !== -1) {
                        return 1;
                    }

                    // 先以位置排序，如果位置相同再以相似度排序
                    if (aIndex !== bIndex) {
                        return aIndex - bIndex;
                    } else {
                        return bSimilarity - aSimilarity;
                    }
                });

            return result;
        };*/

        // getContainer
        getContainer = element => {
            return element.closest(`.ts-input,.ts-select`);
        };

        // getTextContainer
        getTextContainer = element => {
            return this.getContainer(element).querySelector("div.content");
        };

        // getInput
        getInput = element => {
            return this.getContainer(element).querySelector("input:not(.append),select");
        };

        // getDatalist
        getDatalist = element => {
            return this.getContainer(element).querySelector("datalist");
        };

        // getOption
        getOption = (element, value) => {
            return this.getContainer(element).querySelector(`option[value="${value}"]`);
        };

        // getOptions
        getOptions = element => {
            return this.getContainer(element).querySelectorAll("option");
        };

        // getDropdown
        getDropdown = element => {
            return this.getContainer(element).querySelector(".ts-dropdown");
        };

        // getAppendInput
        getAppendInput = element => {
            return this.getContainer(element).querySelector(".append");
        };

        // getInputValues
        getInputValues = element => {
            return element.value.split(",").filter(v => v.trim() !== "");
        };

        // removeLastInputValue
        removeLastInputValue = element => {
            var data = element.value.split(",").filter(v => v.trim() !== "");

            if (data.length <= 0) {
                return;
            }

            //
            element.value = data.slice(0, -1).join(",").trim();

            //
            element.dispatchEvent(new Event("input", { bubbles: true }));
        };

        //
        getOptionValues = element => {
            return Array.from(this.getOptions(element)).map(option => option.value);
        };

        // getDatalistValues
        getDatalistValues = element => {
            var datalist = this.getDatalist(element);
            return datalist ? Array.from(datalist.querySelectorAll("option")).map(option => option.value) : [];
        };

        // getOptionText
        getOptionText = option => {
            //var datalist = this.getDatalist(element);

            return option.text !== undefined && option.text.trim() !== "" ? option.text : option.value;
        };

        // getOptionByValue
        getOptionByValue = (element, value) => {
            return Array.from(this.getOptions(element)).find(option => option.value === value);
        };

        //
        getOptionDefinition = option => {
            return {
                icon: option.getAttribute("data-icon") || null,
                image: option.getAttribute("data-image") || null,
                avatar: option.getAttribute("data-avatar") || null,
                flag: option.getAttribute("data-flag") || null,
                description: option.getAttribute("data-description") || null,
            };
        };

        //
        getDropdownItems = element => {
            var dropdown = this.getDropdown(element);
            if (dropdown === null) {
                return [];
            }
            return dropdown.querySelectorAll("button.item[data-value]");
        };

        // createElement
        createElement = html => {
            var template = document.createElement("template");
            template.innerHTML = html.trim();
            return template.content.firstChild;
        };

        // existsInputValue
        existsInputValue = (element, value) => {
            return this.getInputValues(element).includes(value);
        };

        // getEquivalentValue
        getEquivalentValue = (element, value) => {
            return this.getOption.value;
        };

        // mo dropdown if reach max_items

        // addInputValue
        addInputValue = (element, value) => {
            value = value.trim();

            var data = this.getInputValues(element);
            var max_items = parseInt(element.getAttribute("data-max-items")) || 0;

            //
            if (data.includes(value) || (max_items !== 0 && data.length >= max_items)) {
                return;
            }

            //
            element.value = [...data, value].join(",");

            //
            element.dispatchEvent(new Event("input", { bubbles: true }));
        };

        // removeInputValue
        removeInputValue = (element, value) => {
            var input = this.getInput(element);
            var data = this.getInputValues(element);

            //
            if (!data.includes(value)) {
                return;
            }

            //
            input.value = data.filter(v => v !== value).join(",");

            //
            input.dispatchEvent(new Event("input", { bubbles: true }));
        };

        // createTextContainer
        createTextContainer = () => {
            return createElement(`<div class="content"></div>`);
        };

        // createAppendInput
        createAppendInput = () => {
            return createElement(`<input class="append" type="text">`);
        };

        // createDropdown
        createDropdown = (input, dropdown) => {
            // 設定選單的最小寬度和絕對位置，至少要跟切換觸發元素一樣寬。
            dropdown.style.setProperty("--ts-dropdown-min-width", `${input.getBoundingClientRect().width}px`);
            dropdown.style.setProperty("--ts-dropdown-position", `fixed`);

            dropdown.tocas_dropdown = TocasFloatingUIDOM.autoUpdate(input, dropdown, () => {
                TocasFloatingUIDOM.computePosition(input, dropdown, {
                    strategy: "fixed",
                    placement: "bottom",
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
                    Object.assign(dropdown.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                });
            });
        };

        // getOptionByInputValue
        getOptionByInputValue = input => {
            return Array.from(this.getOptions(input)).find(option => option.value === input.value);
        };

        renderOption = (element, dropdown, option) => {
            var text = this.getOptionText(option);
            var item = createElement(`<button data-value="${option.value}" class="item">${text}</button>`);
            var definition = this.getOptionDefinition(option);

            // 如果這個項目被停用而且又沒有值，那很有可能只是一個預設的預置項目（Placeholder），
            // 就不要將這個渲染於清單中。
            if (option.disabled && option.value === "") {
                return null;
            }

            // 如果這個項目被停用，就套用停用樣式。
            if (option.disabled) {
                item.classList.add("is-disabled");
            }

            //
            if (definition.icon !== null) {
                dropdown.classList.add("is-start-icon");
                item.prepend(createElement(`<span class="ts-icon is-${definition.icon}-icon"></span>`));
            }

            //
            if (definition.image !== null) {
                item.prepend(createElement(`<span class="ts-avatar"><img src="${definition.image}"></span>`));
            }

            //
            if (definition.avatar !== null) {
                item.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${definition.avatar}"></span>`));
            }

            //
            if (definition.flag !== null) {
                item.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
            }

            //
            if (definition.description !== null) {
                item.append(createElement(`<span class="description">${definition.description}</span>`));
            }

            return item;
        };

        // renderTextContainer
        renderTextContainer = (text_container, option) => {
            var text = this.getOptionText(option);
            var definition = this.getOptionDefinition(option);
            var replacement = this.createTextContainer();

            // <optgroup>
            //
            if (option.disabled) {
                // opacity?
            }

            replacement.prepend(`${text}`);

            //
            if (definition.icon !== null) {
                replacement.prepend(createElement(`<span class="ts-icon is-${definition.icon}-icon"></span>`));
            }

            //
            if (definition.image !== null) {
                replacement.prepend(createElement(`<span class="ts-avatar"><img src="${definition.image}"></span>`));
            }

            //
            if (definition.avatar !== null) {
                replacement.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${definition.avatar}"></span>`));
            }

            //
            if (definition.flag !== null) {
                replacement.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
            }

            text_container.parentNode.replaceChild(replacement, text_container);
        };

        renderChip = option => {
            var text = this.getOptionText(option);
            var definition = this.getOptionDefinition(option);
            var chip = createElement(`<div class="ts-chip" data-value="${option.value}">${text}</div>`);

            //
            if (definition.icon !== null) {
                chip.prepend(createElement(`<span class="ts-icon is-${definition.icon}-icon"></span>`));
            }

            //
            if (definition.image !== null) {
                chip.prepend(createElement(`<span class="ts-image"><img src="${definition.image}"></span>`));
            }

            //
            if (definition.avatar !== null) {
                chip.prepend(createElement(`<span class="ts-image is-circular"><img src="${definition.avatar}"></span>`));
            }

            //
            if (definition.flag !== null) {
                chip.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
            }

            return chip;
        };

        // .normalize('NFC')
        // similarity
        similarity = (a, b) => {
            const m = a.length,
                n = b.length;
            const d = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
            for (let i = 1; i <= m; i++) d[i][0] = i;
            for (let j = 1; j <= n; j++) d[0][j] = j;
            for (let j = 1; j <= n; j++) {
                for (let i = 1; i <= m; i++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
                }
            }
            return 1 - d[m][n] / Math.max(m, n);
        };

        // getOptionsByInputValue
        getOptionsByInputValue = element => {
            var input_values = this.getInputValues(element);

            // if not option then..?
            return Array.from(this.getOptions(element))
                .filter(option => input_values.includes(option.value))
                .sort((a, b) => input_values.indexOf(a.value) - input_values.indexOf(b.value));
        };

        // getOptionsByInputUnselectedValue
        getOptionsByInputUnselectedValue = element => {
            var input_values = this.getInputValues(element);

            return Array.from(this.getOptions(element)).filter(option => !input_values.includes(option.value));
        };

        // filterByKeyword
        filterByKeyword = (options, keyword) => {
            return options.filter(option => {
                var search_value = option.value.toLowerCase().normalize("NFC");
                var search_text = option.text.toLowerCase().normalize("NFC");
                var search_keyword = keyword.toLowerCase().normalize("NFC");

                return search_value.includes(search_keyword) || search_text.includes(search_keyword);
            });
        };

        createDropdownElement = () => {
            return createElement(`<div class="ts-dropdown is-scrollable is-visible"></div>`);
        };

        /**
         * Combo
         */

        // isCombo
        isCombo = element => {
            return element.matches(`[data-input="combo"]`);
        };

        // createComboAppendInput
        createComboAppendInput = element => {
            var append_input = createElement(`<input class="append" type="text">`);

            // 監聽輸入欄位的聚焦事件，如果被聚焦了就打開下拉式選單。
            append_input.addEventListener("focus", event => {
                this.createComboDropdown(element);

                append_input.value = "";

                var text_container = this.getTextContainer(element);

                text_container.classList.remove("u-invisible");
                text_container.classList.add("is-ghosting");
            });

            // 監聽輸入欄位的輸入事件，並且用來篩選、搜尋清單。
            append_input.addEventListener("input", event => {
                this.createComboDropdown(element);
                this.refreshComboDropdown(element);

                var text_container = this.getTextContainer(element);

                if (append_input.value.trim() === "") {
                    text_container.classList.remove("u-invisible");
                    text_container.classList.add("is-ghosting");
                } else {
                    text_container.classList.remove("is-ghosting");
                    text_container.classList.add("u-invisible");
                }
            });

            //
            append_input.addEventListener("blur", event => {
                var text_container = this.getTextContainer(element);

                append_input.value = "";

                text_container.classList.remove("is-ghosting");
                text_container.classList.remove("u-invisible");
            });

            return append_input;
        };

        // refreshChipsDropdown
        refreshComboDropdown = element => {
            var dropdown = this.getDropdown(element);
            if (dropdown === null) {
                return;
            }

            // 取得所有項目。
            var options = Array.from(this.getOptions(element));

            // 取得 Append 輸入欄位。
            var append_input = this.getAppendInput(element);
            var keyword = append_input.value.trim();

            // 如果 Append 輸入欄位不是空的，表示使用者有想要搜尋的關鍵字，
            // 那就透過關鍵字先篩選項目。
            if (keyword !== "") {
                options = this.filterByKeyword(options, keyword);
            }

            // 經過篩選之後，如果沒有項目就表示每個項目都被過濾了，
            // 那就移除這個下拉式選單。
            if (options.length === 0) {
                this.closeDropdown(element);
                return;
            }

            // 先隱藏所有的選項。
            dropdown.querySelectorAll("button.item[data-value]").forEach(option => {
                option.classList.add("u-hidden");
            });

            // 再單獨顯示合格的項目。
            options.forEach(option => {
                var item = dropdown.querySelector(`button.item[data-value="${option.value}"]`);

                // 有時候這個項目可能不存在於下拉式選單裡，因為值可能是空白或是被隱藏的。
                if (item === null) {
                    return;
                }

                item.classList.remove("u-hidden");
            });
        };

        // bindComboEventListener
        bindComboEventListener = element => {
            var append_input = this.getAppendInput(element);

            //
            append_input.addEventListener("keyup", event => {
                if (event.key === "Enter") {
                    // this.addInputValue(input, event.target.value.trim());
                    // event.target.value = "";
                }
            });
        };

        // createComboDropdown
        createComboDropdown = element => {
            // 如果已經有出現下拉式選單，就不要再建立第二個。
            if (this.getDropdown(element) !== null) {
                return;
            }

            // 取得所有可用的對應 `option` 項目。
            var options = this.getOptions(element);

            // 建立一個下拉式選單。
            var dropdown = this.createDropdownElement();

            // 渲染每個選項到剛才建立的下拉式選單容器裡。
            options.forEach(option => {
                var option_element = this.renderOption(element, dropdown, option);

                if (!option_element) {
                    return;
                }

                // 如果這個渲染的項目跟目前輸入欄位的值相同，就套用 `is-selected` 被選取的樣式。
                if (element.value === option.value) {
                    option_element.classList.add("is-selected");
                }

                // 監聽每個項目的點擊事件。
                option_element.addEventListener("click", event => {
                    // 被點擊之後就替換 `<select>` 的值，並且發送 `input` 事件來讓其他程式能夠捕捉到。
                    element.value = option.value;
                    element.dispatchEvent(new Event("input", { bubbles: true }));

                    // 關閉下拉式選單。
                    this.closeDropdown(element);
                });

                // 將這個項目推至下拉式選單裡。
                dropdown.append(option_element);
            });

            // 取得這個輸入欄位最頂級的包覆容器，然後插入新的下拉式選單。
            var container = this.getContainer(element);
            container.append(dropdown);

            // 透過 Floating UI 來觸發浮動顯示下拉式選單。
            dropdown.tocas_dropdown = this.createDropdown(container, dropdown);
        };

        // initializeCombo
        initializeCombo = element => {
            var container = this.getContainer(element);
            var text_container = this.createTextContainer();
            var append_input = this.createComboAppendInput(element);

            // 賦予特殊標籤用以套用樣式。
            container.setAttribute("data-tocas", "input-combo");

            // 如果容器被點擊的話就聚焦到 Append 輸入欄位讓使用者可以打字。
            container.addEventListener("click", event => {
                // 確保使用者不是在點擊容器裡的下拉式選單或是標籤，
                // 我們不想因為這樣就聚焦到 Append 輸入欄位。
                if (event.target.closest(".ts-dropdown")) {
                    return;
                }

                // 聚焦到 `append_input` 這樣就可以讓使用者輸入。
                append_input.focus();
            });

            // 將新的輸入欄位插入進容器裡。
            container.append(append_input);

            // 將文字容器插入到容器中。
            container.append(text_container);
        };

        // updateComboView
        updateComboView = input => {
            // 如果這次的值跟上次的值相同，就略過本次檢查。
            if (input.tocas_input_old_value !== undefined && input.value === input.tocas_input_old_value) {
                return;
            }

            // 如果目前輸入欄位的內容跟某個項目的 `data-value` 相同，
            // 那就賦予該項目 `is-selected` 樣式，否則將其樣式移除。
            this.getDropdownItems(input).forEach(item => {
                if (item.getAttribute("data-value") === input.value) {
                    item.classList.add("is-selected");
                } else {
                    item.classList.remove("is-selected");
                }
            });

            // 取得現在這個下拉選單的對應 `option` 項目。
            var option = this.getOptionByInputValue(input);

            console.log(option, input);

            // 如果沒有對應項目就先不要更新。
            if (option === undefined) {
                return;
            }

            // 更新文字容器的呈現內容。
            this.renderTextContainer(this.getTextContainer(input), option);

            // 更換快取的舊值。
            input.tocas_input_old_value = input.value;
        };

        /**
         * Select
         */

        // isSelect
        isSelect = element => {
            return element.matches(`[data-input="select"]`);
        };

        // bindSelectEventListener
        bindSelectEventListener = input => {};

        // createSelectDropdown
        createSelectDropdown = element => {
            // 如果已經有出現下拉式選單，就不要再建立第二個。
            if (this.getDropdown(element) !== null) {
                return;
            }

            // 取得所有可用的對應 `option` 項目。
            var options = this.getOptions(element);

            // 建立一個下拉式選單。
            var dropdown = this.createDropdownElement();

            // 渲染每個選項到剛才建立的下拉式選單容器裡。
            options.forEach(option => {
                var option_element = this.renderOption(element, dropdown, option);

                if (!option_element) {
                    return;
                }

                // 如果這個渲染的項目跟目前輸入欄位的值相同，就套用 `is-selected` 被選取的樣式。
                if (element.value === option.value) {
                    option_element.classList.add("is-selected");
                }

                // 監聽每個項目的點擊事件。
                option_element.addEventListener("click", event => {
                    // 被點擊之後就替換 `<select>` 的值，並且發送 `input` 事件來讓其他程式能夠捕捉到。
                    element.value = option.value;
                    element.dispatchEvent(new Event("input", { bubbles: true }));

                    // 關閉下拉式選單。
                    this.closeDropdown(element);
                });

                // 將這個項目推至下拉式選單裡。
                dropdown.append(option_element);
            });

            // 取得這個輸入欄位最頂級的包覆容器，然後插入新的下拉式選單。
            var container = this.getContainer(element);
            container.append(dropdown);

            // 透過 Floating UI 來觸發浮動顯示下拉式選單。
            dropdown.tocas_dropdown = this.createDropdown(container, dropdown);
        };

        // updateSelectView
        updateSelectView = input => {
            // 如果這次的值跟上次的值相同，就略過本次檢查。
            if (input.tocas_input_old_value !== undefined && input.value === input.tocas_input_old_value) {
                return;
            }

            // 如果目前輸入欄位的內容跟某個項目的 `data-value` 相同，
            // 那就賦予該項目 `is-selected` 樣式，否則將其樣式移除。
            this.getDropdownItems(input).forEach(item => {
                if (item.getAttribute("data-value") === input.value) {
                    item.classList.add("is-selected");
                } else {
                    item.classList.remove("is-selected");
                }
            });

            // 取得現在這個下拉選單的對應 `option` 項目。
            var option = this.getOptionByInputValue(input);

            // 如果沒有對應項目就先不要更新。
            if (option === undefined) {
                return;
            }

            // 更新文字容器的呈現內容。
            this.renderTextContainer(this.getTextContainer(input), option);

            // 更換快取的舊值。
            input.tocas_input_old_value = input.value;
        };

        // initializeSelect
        initializeSelect = element => {
            var container = this.getContainer(element);

            // 如果容器被點擊的話就建立下拉式選單。
            container.addEventListener("click", event => {
                // 確保不是在點擊容器裡面的下拉式選單。
                if (event.target.closest(".ts-dropdown") !== null) {
                    return;
                }
                this.createSelectDropdown(element);
            });

            // 賦予特殊標籤用以套用樣式。
            container.setAttribute("data-tocas", "input-select");

            // 將下拉式選單推送進容器裡。
            container.append(this.createTextContainer());
        };

        /**
         * Multi
         */

        // isMultiInput
        isMultiInput = element => {
            return element.matches(`[data-input="multi"]`);
        };

        // createMultiInputTextContainer
        createMultiInputTextContainer = () => {
            return createElement(`<div class="content"></div>`);
        };

        // initializeMultiInput
        initializeMultiInput = element => {
            var container = this.getContainer(element);
        };

        // updateMultiInputView
        updateMultiInputView = input => {
            if (input.tocas_input_old_value !== undefined) {
                if (input.value === input.tocas_input_old_value) {
                    return;
                }
            }

            var dropdown = this.getDropdown(input);
            var data = input.value.split(",").filter(v => v.trim() !== "");

            if (dropdown !== null) {
                dropdown.querySelectorAll("button.item[data-value]").forEach(item => {
                    var value = item.getAttribute("data-value");

                    if (data.includes(value)) {
                        item.classList.add("is-checked");
                    } else {
                        item.classList.remove("is-checked");
                    }
                });
            }

            //
            input.tocas_input_old_value = input.value;
        };

        // createMultiInputDropdown
        createMultiInputDropdown = element => {
            if (this.getDropdown(element) !== null) {
                return;
            }

            var input = this.getInput(element);
            var dropdown = createElement(`<div class="ts-dropdown is-visible"></div>`);

            var datalist = this.getDatalist(element);
            if (datalist === null) {
                return;
            }

            datalist.querySelectorAll("option").forEach(option => {
                var text = this.getOptionText(option);
                var item = createElement(`<button data-value="${option.value}" class="item"><div class="checkbox"></div> ${text}</button>`);

                item.addEventListener("click", event => {
                    if (this.existsInputValue(element, option.value)) {
                        this.removeInputValue(element, option.value);
                    } else {
                        this.addInputValue(element, option.value);
                    }
                });

                if (this.existsInputValue(element, option.value)) {
                    item.classList.add("is-checked");
                }

                dropdown.append(item);
            });

            var container = this.getContainer(element);

            container.append(dropdown);

            // 透過 Floating UI 來觸發浮動顯示。
            dropdown.tocas_dropdown = this.createDropdown(input, dropdown);
        };

        //
        bindMultiInputEventListener = element => {
            var container = this.getContainer(element);

            container.addEventListener("click", event => {
                this.createMultiInputDropdown(event.target);
            });
        };

        /**
         * Chip
         */

        // isChips
        isChips = element => {
            return element.matches(`[data-input="chips"]`);
        };

        // createChipsItem
        createChipsItem = (element, option, value) => {
            // 建立一個新的關閉按鈕。
            var button = createElement(`<button class="ts-close is-small"></button>`);

            // 監聽關閉按鈕的點擊事件，如果被點擊就從輸入欄位中移除對應的項目。
            button.addEventListener("click", event => {
                this.removeInputValue(element, value);
                this.refreshChipsDropdown(element);
            });

            // 建立一個新的標籤項目，如果這個項目不是預先項目，
            // 那就是使用者自己追加的項目，我們以手動方式新增。
            var item = option ? this.renderChip(option, value) : createElement(`<div class="ts-chip" data-value="${value}">${value}</div>`);

            // 將關閉按鈕推入至標籤項目中。
            item.append(button);

            return item;
        };

        // createChipsAppendInput
        createChipsAppendInput = element => {
            // 建立一個用來輸入、搜尋關鍵字的額外輸入欄位。
            var append_input = createElement(`<input class="append" data-autosize="horizontal" type="text">`);

            // 監聽輸入欄位的聚焦事件，如果被聚焦了就打開下拉式選單。
            append_input.addEventListener("focus", event => {
                this.createChipsDropdown(element);
            });

            // 監聽輸入欄位的輸入事件，並且用來篩選、搜尋清單。
            append_input.addEventListener("input", event => {
                this.createChipsDropdown(element);
                this.refreshChipsDropdown(element);
            });

            // 監聽輸入欄位的刪除按下事件，這樣就可以讓使用者透過刪除鍵移除尾端的標籤項目。
            append_input.addEventListener("keydown", event => {
                // 按下的必須是 Backspace 或刪除按鈕。
                if (event.key !== "Backspace" && event.key !== "Delete") {
                    return;
                }

                // 輸入欄位裡面不能有任何文字，這樣才表示使用者想要刪除項目，而不是只是刪除打錯字。
                if (append_input.value.trim() !== "") {
                    return;
                }

                // 刪除清單裡最後一個項目。
                this.removeLastInputValue(element);

                // 嘗試打開下拉式選單，這樣如果原本選單裡沒項目，但是刪除之後項目回到選單，
                // 我們就可以看見選單了。
                this.createChipsDropdown(element);

                // 更新下拉式選單的項目。
                this.refreshChipsDropdown(element);
            });

            // 監聽輸入欄位的按鍵放開事件，用來處理使用者想要新增標籤的事件。
            append_input.addEventListener("keyup", event => {
                // 按下的必須是 Enter。
                if (event.key !== "Enter") {
                    return;
                }

                // 新增值到清單裡，然後清空目前輸入的文字，這樣才能繼續新增下一個而不受干擾。
                this.addInputValue(element, append_input.value);

                // 因為已經新增項目了，所以移除 Append 輸入欄位裡的文字。
                append_input.value = "";

                // 嘗試打開下拉式選單。
                this.createChipsDropdown(element);

                // 更新下拉式選單的項目。
                this.refreshChipsDropdown(element);

                // 立即更新文字容器裡的視圖。
                this.updateChipsView(element);
            });

            // 建立用來包覆輸入欄位的容器，這樣才能完好地與其他標籤項目混為一起。
            var wrapper = createElement(`<div></div>`);

            // 將輸入欄位推入至包覆容器裡。
            wrapper.append(append_input);

            return wrapper;
        };

        // refreshChipsDropdown
        refreshChipsDropdown = element => {
            var dropdown = this.getDropdown(element);
            if (dropdown === null) {
                return;
            }

            // 取得尚未選取的項目。
            var available_options = this.getOptionsByInputUnselectedValue(element);

            // 取得 Append 輸入欄位。
            var append_input = this.getAppendInput(element);
            var keyword = append_input.value.trim();

            // 如果 Append 輸入欄位不是空的，表示使用者有想要搜尋的關鍵字，
            // 那就透過關鍵字先篩選項目。
            if (keyword !== "") {
                available_options = this.filterByKeyword(available_options, keyword);
            }

            // 經過篩選之後，如果沒有尚未選取的項目就表示每個項目都已經被選取、過濾了，
            // 那就移除這個下拉式選單。
            if (available_options.length === 0) {
                this.closeDropdown(element);
                return;
            }

            // 先隱藏所有的選項。
            dropdown.querySelectorAll("button.item[data-value]").forEach(option => {
                option.classList.add("u-hidden");
            });

            // 再單獨顯示合格的項目。
            available_options.forEach(option => {
                dropdown.querySelector(`button.item[data-value="${option.value}"]`).classList.remove("u-hidden");
            });
        };

        // updateChipsView
        updateChipsView = element => {
            if (element.tocas_input_old_value !== undefined) {
                if (element.value === element.tocas_input_old_value) {
                    return;
                }
            }

            var input_values = this.getInputValues(element);
            var text_container = this.getTextContainer(element);
            var append_input = this.getAppendInput(element);

            // 先移除所有標籤。
            text_container.querySelectorAll(".ts-chip").forEach(chip => {
                chip.remove();
            });

            // 然後再依據目前有的值，去渲染每個標籤。
            input_values.forEach(value => {
                var option = this.getOptionByValue(element, value);
                var option_chip = this.createChipsItem(element, option, value);

                // 總是把標籤插入在 Append 輸入欄位之前。
                text_container.insertBefore(option_chip, append_input.parentNode);
            });

            // 更換快取的舊值。
            element.tocas_input_old_value = element.value;
        };

        // createChipsDropdown
        createChipsDropdown = element => {
            // 如果已經有下拉式選單出現在頁面上的話就忽略。
            if (this.getDropdown(element) !== null) {
                return;
            }

            // 判斷這個標籤輸入欄位有沒有設定最大項目數量。
            var max_items = parseInt(element.getAttribute("data-max-items")) || 0;
            if (max_items !== 0) {
                // 取得目前輸入欄位的所有值，如果超過指定數量就不要呈現這個下拉選單。
                if (this.getInputValues(element).length >= max_items) {
                    return;
                }
            }

            var append_input = this.getAppendInput(element);
            var dropdown = createElement(`<div class="ts-dropdown is-scrollable is-visible"></div>`);
            var options = this.getOptions(element);

            // 如果這個輸入欄位沒有定義 `<datalist>` 而找不到任何預先選項，就不需要建立這個下拉式選單。
            if (options.length === 0) {
                return;
            }

            options.forEach(option => {
                // 渲染這個 `option` 在清單裡的項目樣式元素。
                var option_element = this.renderOption(element, dropdown, option);

                // 如果這個項目被點擊之後，就將這個值加入到輸入欄位，
                // 並重新聚焦 Append 欄位讓使用者方便繼續輸入下個值。
                option_element.addEventListener("click", event => {
                    this.addInputValue(element, option.value);
                    append_input.value = "";
                    append_input.focus();
                    this.refreshChipsDropdown(element);
                });

                // 將這個項目推送進下拉式選單。
                dropdown.append(option_element);
            });

            // 取得這個輸入欄位的容器，然後把剛才建立的下拉式選單插入進容器裡。
            var container = this.getContainer(element);
            container.append(dropdown);

            // 立即重新整理下拉式選單的項目。
            this.refreshChipsDropdown(element);

            // 透過 Floating UI 來觸發浮動顯示。
            dropdown.tocas_dropdown = this.createDropdown(container, dropdown);
        };

        // initializeChips
        initializeChips = element => {
            var container = this.getContainer(element);
            var text_container = this.createTextContainer();
            var append_input = this.createChipsAppendInput(element);

            // 賦予特殊標籤用以套用樣式。
            container.setAttribute("data-tocas", "input-chips");

            // 如果容器被點擊的話就聚焦到 Append 輸入欄位讓使用者可以打字。
            container.addEventListener("click", event => {
                // 確保使用者不是在點擊容器裡的下拉式選單或是標籤，
                // 我們不想因為這樣就聚焦到 Append 輸入欄位。
                if (event.target.closest(".ts-dropdown, .ts-chip")) {
                    return;
                }

                // `append_input` 是一個 `div` 容器，裡面的 `firstChild` 才是真正的 `input`。
                append_input.firstChild.focus();
            });

            // 將 `append_input` 包覆容器推送到文字容器裡。
            text_container.append(append_input);

            // 將文字容器插入到最上層的輸入容器中。
            container.append(text_container);
        };

        /**
         * Password
         */

        // isPassword
        isPassword = element => {
            return element.matches(`[data-input="password"]`);
        };

        // getPasswordIcon
        getPasswordIcon = element => {
            return this.getContainer(element).querySelector(`button.ts-icon[data-tocas="visibility"]`);
        };

        // createPasswordIcon
        createPasswordIcon = () => {
            var icon = createElement(`<button class="ts-icon is-eye-icon" data-tocas="visibility"></button>`);

            // 如果使用者點擊圖示就切換輸入欄位的 `type` 種類。
            icon.addEventListener("click", this.togglePasswordVisibility);
            return icon;
        };

        // togglePasswordVisibility
        togglePasswordVisibility = event => {
            var input = this.getInput(event.target);
            var icon = this.getPasswordIcon(event.target);

            // 在 `password` 與 `text` 之間來回切換。
            input.type = input.type === "text" ? "password" : "text";

            // 依據目前不同的種類來切換圖示。
            if (input.type === "password") {
                icon.classList.remove("is-eye-slash-icon");
                icon.classList.add("is-eye-icon");
            } else {
                icon.classList.remove("is-eye-icon");
                icon.classList.add("is-eye-slash-icon");
            }
        };

        // initializePassword
        initializePassword = element => {
            var container = this.getContainer(element);

            // 套用 `is-end-action-icon` 樣式到輸入容器。
            container.classList.add("is-end-action-icon");

            // 初始化一個新的眼睛圖示按擰元素用來切換密碼欄位的可見度。
            container.append(this.createPasswordIcon());
        };
    }

    /* ==========================================================================
       FilePlace
       ========================================================================== */

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
            return element.matches(`[data-fileplace]`);
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

    /* ==========================================================================
       Pagination
       ========================================================================== */

    class Pagination {
        constructor() {}

        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個新追加的 DOM 節點是一個 Pagination 模組，就監聽其點擊事件。
            if (this.isPagination(added_node)) {
                // 監聽其點擊事件。
                this.initializePagination(added_node);
                this.bindEventListener(added_node);
            }
        };

        // isPagination
        isPagination = element => {
            return element.matches(`[data-pagination]`);
        };

        // bindEventListener
        bindEventListener = element => {
            var input = this.getPageInput(element);

            if (input === null) {
                return
            }

            // todo remove event listener
            input.addEventListener("change", event => {
                this.renderView(element);
            });
        };

        //
        renderView = element => {
            // 先清空原本的內容。
            element.innerHTML = "";

            // 取得總頁數。
            var total_page = this.getTotalPage(element);

            // 取得目前的頁數。
            var current_page = this.getCurrentPage(element);

            // 取得是否有連結規則。
            var pattern = this.getLinkPattern(element);

            //
            var distance = this.getDistance(element);

            // 產生「<」返回項目。
            var back_item;
            if (current_page <= 1) {
                back_item = this.createItem(element, "", "", pattern);
                back_item.classList.add("is-back", "is-disabled");
            } else {
                back_item = this.createItem(element, "", current_page - 1, pattern);
                back_item.classList.add("is-back");
            }


            // 產生「>」下一個項目。
            var next_item;
            if (current_page + 1 > total_page) {
                next_item = this.createItem(element, "", "", pattern);
                next_item.classList.add("is-next", "is-disabled");
            } else {
                next_item = this.createItem(element, "", current_page + 1, pattern);
                next_item.classList.add("is-next");
            }

            var dotshow = true;

            // 依據目前的頁數來決定要怎麼呈現未來的頁數距離。
            if (current_page == 2 || current_page == total_page - 1) {
                distance = distance;
            } else if (current_page >= 3 && current_page != total_page) {
                distance = distance;
            } else {
                distance = distance+1;
            }

            //
            element.append(back_item);



            if (total_page != 1) {
                for (let i = 1; i <= total_page; i++) {
                    if (i === 1 || i === total_page || (i >= current_page - distance && i <= current_page + distance)) {
                        dotshow = true;

                        var item = this.createItem(element, i, i, pattern);

                        if (i === current_page) {
                            item.classList.add("is-active");
                        }

                        element.append(item);
                    } else if (dotshow) {
                        dotshow = false;

                        var item = this.createItem(element, "...", "", pattern);
                        item.classList.add("is-skipped");
                        element.append(item);
                    }
                }

                //
                element.append(next_item);
            }
        };

        // createItem
        createItem = (element, text ="", page = "", pattern = "") => {
            var item;
            if (pattern !== "") {
                item = createElement(`<a href="${page === "" ? "#" : pattern.replace("${page}", page)}" class="item">${text}</a>`);
            } else {
                item = createElement(`<button class="item">${text}</button>`);

                if (text !== "...") {
                    item.addEventListener("click", event => {
                        this.updatePage(element, page);
                    });
                }
            }
            return item;
        };

        // getCurrentPage
        getCurrentPage = element => {
            var current = element.getAttribute("data-current");
            if (current !== null) {
                return parseInt(current) || 1;
            }
            return parseInt(this.getPageInput(element).value) || 1;
        };

        // getTotalPage
        getTotalPage = element => {
            return parseInt(element.getAttribute("data-total")) || 1;
        };

         // getDistance
        getDistance = element => {
            return parseInt(element.getAttribute("data-distance")) || 2;
        };

        // getLinkPattern
        getLinkPattern = element => {
            var pattern = element.getAttribute(`data-pagination`);
            return pattern.includes("${page}") ? pattern : "";
        };

        // getPageInput
        getPageInput = element => {
            var inputs = searchScopeTargets(element, element.getAttribute(`data-pagination`), `@scope`, `data-name`)
            return inputs.length !== 0 ? inputs[0] : null;
        };

        // updatePage
        updatePage = (element, page) => {
            if (this.getLinkPattern(element) !== "") {
                return;
            }
            var input = this.getPageInput(element);

            input.value = page;
            input.dispatchEvent(new Event("change", { bubbles: true }));
        };

        // initializePagination
        initializePagination = element => {
            this.renderView(element);
        };
    }

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

    // autoSizeModule
    var autoSizeModule = new AutoSize();

    // inputModule
    var inputModule = new Input();

    // filePlaceModule
    var filePlaceModule = new FilePlace();

    // paginationModule
    var paginationModule = new Pagination();

    // stashModule
    // var stashModule = new Stash();

    //
    addedNodeMutation = node => {
        responsiveModule.addedNodeMutation(node);
        tabModule.addedNodeMutation(node);
        toggleModule.addedNodeMutation(node);
        dropdownModule.addedNodeMutation(node);
        tooltipModule.addedNodeMutation(node);
        autoSizeModule.addedNodeMutation(node);
        inputModule.addedNodeMutation(node);
        filePlaceModule.addedNodeMutation(node);
        paginationModule.addedNodeMutation(node);
        // stashModule.addedNodeMutation(node);
    };

    //
    attributeMutation = mutation => {
        responsiveModule.attributeMutation(mutation);
        tabModule.attributeMutation(mutation);
        toggleModule.attributeMutation(mutation);
        dropdownModule.attributeMutation(mutation);
        tooltipModule.attributeMutation(mutation);
        autoSizeModule.attributeMutation(mutation);
        inputModule.attributeMutation(mutation);
        filePlaceModule.attributeMutation(mutation);
        paginationModule.attributeMutation(mutation);
        // stashModule.attributeMutation(mutation);
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
        responsiveModule.windowResize(event);
    });

    /**
     * Window Click
     */

    window.addEventListener("click", event => {
        dropdownModule.windowClick(event);
        inputModule.windowClick(event);
    });
})();
