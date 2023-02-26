window.tocas = {
    config: {
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
            hidden: "u-hidden"
        }
    },
};

//
(function () {
    /* ==========================================================================
       Responsive
       ========================================================================== */

    class Responsive {
        constructor() {
            this.resize_observer = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    // @breakpoint:is-class
                    entry.target.querySelectorAll(`[class^="@"]:is([class*=":is-"],[class*=":has-"])`).forEach(element => {
                        this.check(element);
                    });
                });
            });
        }

        // attributeMutation
        attributeMutation(mutation) {
            this.check(mutation.target);

            if (mutation.target.matches(`[class~="${tocas.config.scopes.container}"]`)) {
                this.resize_observer.observe(mutation.target);
            }
        }

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            if (addedNode.matches(`[class*=":is-"],[class*=":has-"]`)) {
                this.check(addedNode);
            }
            if (addedNode.matches(`[class~="${tocas.config.scopes.container}"]`)) {
                this.resize_observer.observe(addedNode);
            }
        }

        // windowResize
        windowResize(event) {
            document.querySelectorAll(`[class*=":is-"],[class*=":has-"]`).forEach(element => {
                this.check(element);
            });
        }

        // unit
        unit(value) {
            var number = parseInt(value, 10);
            if (!isNaN(number)) {
                return number;
            }
            return 0;
        }

        // breakpointSize
        breakpointSize(breakpoint, element) {
            var computedStyle = window.getComputedStyle(element);
            return {
                min: this.unit(computedStyle.getPropertyValue(`--ts-breakpoint-${breakpoint}-min`)),
                max: this.unit(computedStyle.getPropertyValue(`--ts-breakpoint-${breakpoint}-max`)),
            };
        }

        // rule
        rule(rule, element) {
            var isContainerQuery = rule.startsWith("@"); // @breakpoint
            var isEqualOrGreater = rule.endsWith("+"); // breakpoint+, [size]+
            var isEqualOrLesser = rule.endsWith("-"); // breakpoint-, [size]-
            var isCustomSize = rule.includes("["); // [size]

            // 移除首要的 @ 符號。
            if (isContainerQuery) {
                rule = rule.substring(1);
            }
            // 移除結尾的 +, - 符號。
            if (isEqualOrGreater || isEqualOrLesser) {
                rule = rule.substring(0, rule.length - 1);
            }
            // 移除首要跟結尾的 [, ] 符號
            if (isCustomSize) {
                rule = rule.substring(1).substring(0, rule.length - 1);
            }
            // 從 breakpoint-breakpoint 拆出 min, max 值。
            var [min_breakpoint, max_breakpoint] = rule.split("-");

            // 如果是自訂尺寸的話，就直接解析 Unit，不要去讀 Breakpoint 定義。
            if (isCustomSize) {
                // [size]+
                if (isEqualOrGreater) {
                    return [this.unit(min_breakpoint), 99999];
                }
                // [size]-
                if (isEqualOrLesser) {
                    return [0, this.unit(min_breakpoint)];
                }
                // [minSize-maxSize]
                return [this.unit(min_breakpoint), this.unit(max_breakpoint)];
            }
            //
            var from = this.breakpointSize(min_breakpoint, element);
            //
            if (max_breakpoint === undefined) {
                // breakpoint+
                if (isEqualOrGreater) {
                    return [from.min, 99999];
                }
                // breakpoint-
                if (isEqualOrLesser) {
                    return [0, from.max];
                }
                // breakpoint
                return [from.min, from.max];
            }
            //
            var to = this.breakpointSize(max_breakpoint, element);
            // breakpoint-breakpoint
            return [from.min, to.max];
        }

        // check
        check(element) {

            if (element.tocas_checking === true) {
                return
            }
            element.tocas_checking = true

            var checked = []


            element.classList.forEach(class_name => {
                if (!class_name.includes(":is-") && !class_name.includes(":has-")) {
                    return;
                }
                var [rule, target_class] = class_name.split(":");
                var [min, max] = this.rule(rule, element);
                var width = window.innerWidth;
                // @breakpoint
                if (rule.startsWith("@")) {
                    var container = element.closest(`[class~="${tocas.config.scopes.container}"]`);
                    if (container === null) {
                        throw {
                            message: "using a container query but @container was not defined",
                            element: element,
                        };
                    }
                    width = container.getBoundingClientRect().width;
                }
                if (width >= min && width <= max) {
                    if (!element.classList.contains(target_class)) {
                       // buuuug checked = [...checked, target_class];
                        element.classList.add(target_class);
                    }
                } else {
                    if (element.classList.contains(target_class)) {
                       // console.log(checked)
                       // if (checked.includes(target_class)) {
                       //     return;
                       // }
                        element.classList.remove(target_class);
                    }
                }
            });

            setTimeout(() => {
                element.tocas_checking = undefined
            }, 1)

        }
    }



    /* ==========================================================================
       Stash
       ========================================================================== */

    class Stash {
        constructor() {


        }

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
            clone.classList.add("cloned");

            element.after(clone);


            const observer = new IntersectionObserver((entries, owner) => {
                console.log(owner); // IntersectionObserver 實體
                entries.forEach(entry => {
                    console.log(entry); // IntersectionObserverEntry 物件

                    var stash = entry.target.getAttribute("data-target")

                    if (entry.isIntersecting) {
                        element.querySelector(`[data-target="${stash}"]`).classList.remove(tocas.config.classes.hidden)
                        document.querySelector(`[data-name="${stash}"]`).classList.add(tocas.config.classes.hidden)
                    } else {
                        element.querySelector(`[data-target="${stash}"]`).classList.add(tocas.config.classes.hidden)
                        document.querySelector(`[data-name="${stash}"]`).classList.remove(tocas.config.classes.hidden)
                    }


                    if (element.querySelectorAll(`.${tocas.config.classes.hidden}[data-target]`).length > 0) {
                        element.querySelector(`[data-stash-more]`).classList.remove(tocas.config.classes.hidden)
                    } else {
                        element.querySelector(`[data-stash-more]`).classList.add(tocas.config.classes.hidden)
                   }



                });
            }, {
                root: clone,
                rootMargin: "0px -100px 0px 0px",
                threshold: [0.99],
            });

            clone.querySelectorAll("[data-target]").forEach(v => {
                observer.observe(v)
            })
        }

    }

    /* ==========================================================================
       Tab
       ========================================================================== */

    class Tab {
        constructor() {}

        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            if (addedNode.matches(`[${tocas.config.attributes.tab}]`)) {
                this.bindEventListener(addedNode);
            }
        }

        // todo: 初始化 hidden all

        // toggle
        toggle(event) {
            var element = event.target.closest(`[${tocas.config.attributes.tab}]`);
            var tab_name = element.getAttribute(tocas.config.attributes.tab);
            var container = element.closest(`[class*="${tocas.config.scopes.tab}"]`) || document;

            var tab_group_element = element.closest(".ts-tab");
            var should_close = [];

            tab_group_element.querySelectorAll(`[${tocas.config.attributes.tab}]`).forEach(v => {
                if (v.getAttribute(tocas.config.attributes.tab) === tab_name) {
                    v.classList.add("is-active");
                } else {
                    should_close = [...should_close, v.getAttribute(tocas.config.attributes.tab)];
                    v.classList.remove("is-active");
                }
            });

            container.querySelectorAll(`[${tocas.config.attributes.tab_name}]`).forEach(v => {
                var closest_container = v.closest(`[class*="${tocas.config.scopes.tab}"]`) || document;

                // Prevent closed nested child tab with same name
                if (container !== closest_container) {
                    return;
                }

                if (v.getAttribute(tocas.config.attributes.tab_name) === tab_name) {
                    v.classList.remove(tocas.config.classes.hidden);
                } else if (should_close.includes(v.getAttribute(tocas.config.attributes.tab_name))) {
                    v.classList.add(tocas.config.classes.hidden);
                }
            });
        }

        // bindEventListener
        bindEventListener(element) {
            element.removeEventListener("click", this.toggle);
            element.addEventListener("click", this.toggle);
        }
    }

    function searchScopeTargets(element, name, scope_attribute, name_attribute) {
        var container = element.closest(`[class*="${scope_attribute}"]`) || document;
        var targets = Array.from(container.querySelectorAll(`[${name_attribute}="${name}"]`)).filter(item => {
            return item.closest(`[class*="${scope_attribute}"]`) || document === container;
        });
        if (targets.length > 0) {
            return targets;
        }
        if (container === document) {
            throw {
                message: "relying on non-exist",
                name: name,
                scope_attribute: scope_attribute,
                name_attribute: name_attribute,
                element: element,
            };
        }
        return this.searchScopeTargets(container.parentNode, name, scope_attribute, name_attribute);
    }

    /* ==========================================================================
       Toggle
       ========================================================================== */

    class Toggle {
        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            if (addedNode.matches(`[${tocas.config.attributes.toggle}]`)) {
                this.bindEventListener(addedNode);
            }
        }

        // toggle
        toggle(event) {
            var element = event.target.closest(`[${tocas.config.attributes.toggle}]`);
            var [name, class_name] = element.getAttribute(tocas.config.attributes.toggle).split(":");
            var targets = searchScopeTargets(element, name, tocas.config.scopes.toggle, tocas.config.attributes.toggle_name);

            targets.forEach(v => {
                v.classList.toggle(class_name);
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

        //
        position(element) {
            return element.getAttribute(tocas.config.attributes.dropdown_position) || "bottom";
        }

        //
        windowClick(event) {
            var closest_trigger = event.target.closest(`[${tocas.config.attributes.dropdown}]`);
            var closest_dropdown = event.target.closest(`[${tocas.config.attributes.dropdown_name}]`);

            if (closest_trigger === null && closest_dropdown === null) {
                document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                    this.closeDropdown(dropdown);
                });
            }

            if (closest_trigger !== null) {
                var name = closest_trigger.getAttribute(tocas.config.attributes.dropdown);
                var local_dropdown = searchScopeTargets(closest_trigger, name, tocas.config.scopes.dropdown, tocas.config.attributes.dropdown_name)[0];

                document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                    if (dropdown !== local_dropdown) {
                        this.closeDropdown(dropdown);
                    }
                });
            }

            if (closest_dropdown !== null) {
                document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                    if (dropdown !== closest_dropdown) {
                        this.closeDropdown(dropdown);
                    }
                });
            }
        }

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            if (addedNode.matches(`[${tocas.config.attributes.dropdown}]`)) {
                this.bindEventListener(addedNode);
            }
            if (addedNode.matches(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`)) {
                this.bindItemEventListener(addedNode);
            }
        }

        //
        bindEventListener(element) {
            element.removeEventListener("click", this.clickEventListener.bind(this));
            element.addEventListener("click", this.clickEventListener.bind(this));
        }

        //
        bindItemEventListener(element) {
            element.removeEventListener("click", this.itemClickEventListener.bind(this));
            element.addEventListener("click", this.itemClickEventListener.bind(this));
        }

        closeDropdown(dropdown) {
            if (!dropdown.classList.contains(".ts-dropdown") && !dropdown.classList.contains("is-visible")) {
                return;
            }
            dropdown.classList.remove("is-visible");

            if (dropdown.tocas_dropdown !== undefined) {
                dropdown.tocas_dropdown();
                dropdown.tocas_dropdown = undefined;
                dropdown.style.removeProperty("--ts-dropdown-min-width");
                dropdown.style.removeProperty("--ts-dropdown-position");
            }
        }

        //
        itemClickEventListener(event) {
            var dropdown = event.target.closest(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);

            if (event.target.closest(".item") === null) {
                return;
            }

            this.closeDropdown(dropdown);
        }

        //
        clickEventListener(event) {
            var element = event.target.closest(`[${tocas.config.attributes.dropdown}]`);

            var name = element.getAttribute(tocas.config.attributes.dropdown);
            var target = searchScopeTargets(element, name, tocas.config.scopes.dropdown, tocas.config.attributes.dropdown_name)[0];
            var position = this.position(target);

            if (target.tocas_dropdown !== undefined) {
                target.tocas_dropdown();
                target.tocas_dropdown = undefined;
                target.style.removeProperty("--ts-dropdown-min-width");
                target.style.removeProperty("--ts-dropdown-position");
            }

            target.classList.toggle("is-visible");

            if (!target.classList.contains("is-visible")) {
                return;
            }

            target.style.setProperty("--ts-dropdown-min-width", `${element.getBoundingClientRect().width}px`);
            target.style.setProperty("--ts-dropdown-position", `fixed`);

            target.tocas_dropdown = FloatingUIDOM.autoUpdate(element, target, () => {
                FloatingUIDOM.computePosition(element, target, {
                    strategy: "fixed",
                    placement: position,
                    middleware: [
                        FloatingUIDOM.flip({
                            crossAxis: false,
                        }),
                        FloatingUIDOM.offset(8),
                        FloatingUIDOM.shift(),
                    ],
                }).then(({ x, y }) => {
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
            if (mutation.target.matches(`[${tocas.config.attributes.tooltip}]`)) {
                this.bindEventListener(addedNode);
            }
        }

        // addedNodeMutation
        addedNodeMutation(addedNode) {
            if (addedNode.matches(`[${tocas.config.attributes.tooltip}]`)) {
                this.bindEventListener(addedNode);
            }
        }

        // bindEventListener
        bindEventListener(element) {
            element.tocas_tooltip_timer = null;
            this.enterEventListener(element);
            this.leaveEventListener(element);
        }

        // delay
        delay(element) {
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
                if (window.matchMedia("(pointer: coarse)").matches) {
                    return;
                }
                if (element.tocas_tooltip_timer !== null || element.tocas_tooltip !== undefined) {
                    return;
                }
                element.tocas_tooltip_timer = setTimeout(() => {
                    this.showTooltip(element);
                }, this.delay(element) + 1);
            });
        }

        // leaveEventListener
        leaveEventListener(element) {
            element.addEventListener("mouseleave", event => {
                if (event.target !== element) {
                    return;
                }
                if (element.tocas_tooltip !== undefined) {
                    element.tocas_tooltip();
                    element.tocas_tooltip = undefined;
                }
                if (element.tocas_tooltip_timer !== null) {
                    clearTimeout(element.tocas_tooltip_timer);
                    element.tocas_tooltip_timer = null;
                }
                document.querySelectorAll(".ts-tooltip").forEach(v => {
                    v.remove();
                });
            });
        }

        // createTooltip
        createTooltip(element, arrow) {
            var tooltip = document.createElement("div");
            tooltip.innerText = element.getAttribute(tocas.config.attributes.tooltip);
            tooltip.classList.add("ts-tooltip", "is-visible");
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
            var position = this.position(element);
            var arrow = this.createArrow();
            var tooltip = this.createTooltip(element, arrow);
            //
            document.body.appendChild(tooltip);
            //
            element.tocas_tooltip = FloatingUIDOM.autoUpdate(element, tooltip, () => {
                FloatingUIDOM.computePosition(element, tooltip, {
                    strategy: "fixed",
                    placement: position,
                    middleware: [
                        FloatingUIDOM.flip({
                            crossAxis: false,
                        }),
                        FloatingUIDOM.offset({
                            crossAxis: -15,
                            mainAxis: 10,
                        }),
                        FloatingUIDOM.shift(),
                        FloatingUIDOM.arrow({
                            element: arrow,
                        }),
                    ],
                }).then(({ middlewareData, x, y, placement }) => {
                    Object.assign(tooltip.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                    if (middlewareData.arrow) {
                        const { x, y } = middlewareData.arrow;
                        arrow.style.setProperty("--ts-tooltip-x", x != null ? `${x}px` : "0");
                    }
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

    var responsiveModule = new Responsive();
    var tabModule = new Tab();
    var toggleModule = new Toggle();
    var dropdownModule = new Dropdown();
    var tooltipModule = new Tooltip();
    var stashModule = new Stash();

    var mutation_observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes") {
                responsiveModule.attributeMutation(mutation);
                tabModule.attributeMutation(mutation);
                toggleModule.attributeMutation(mutation);
                dropdownModule.attributeMutation(mutation);
                tooltipModule.attributeMutation(mutation);
                stashModule.attributeMutation(mutation);
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
                    stashModule.addedNodeMutation(addedNode);
                });
            }
        });
    });

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
