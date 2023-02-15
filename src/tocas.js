/**
 * Responsive
 */

(function () {
    /**
     * breakpoint, breakpoint+, breakpoint-, breakpoint-breakpoint
     * [size]+, [size]-, [minSize-maxSize]
     *
     * @breakpoint, @breakpoint+, @breakpoint-, @breakpoint-breakpoint
     * @[size]+, @[size]-, @[minSize-maxSize]
     */

    var selector_container = `[class~="@container"]`;
    var selector_responsive = `[class*=":is-"],[class*=":u-"]`;
    var selector_toggle_class = `[data-toggle="class"]`;
    var selector_toggle_dropdown = `[data-toggle="dropdown"]`;

    // parseUnit
    function parseUnit(value) {
        var number = parseInt(value, 10);
        //
        if (!isNaN(number)) {
            return number;
        }
        return 0;
    }

    // getBreakpointSize
    function getBreakpointSize(breakpoint, element) {
        var computedStyle = window.getComputedStyle(element);
        //
        return {
            min: parseUnit(computedStyle.getPropertyValue(`--ts-breakpoint-${breakpoint}-min`)),
            max: parseUnit(computedStyle.getPropertyValue(`--ts-breakpoint-${breakpoint}-max`)),
        };
    }

    // parseRule
    function parseRule(rule, element) {
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
                return [parseUnit(min_breakpoint), 99999];
            }
            // [size]-
            if (isEqualOrLesser) {
                return [0, parseUnit(min_breakpoint)];
            }
            // [minSize-maxSize]
            return [parseUnit(min_breakpoint), parseUnit(max_breakpoint)];
        }

        //
        var from = getBreakpointSize(min_breakpoint, element);

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
        var to = getBreakpointSize(max_breakpoint, element);
        // breakpoint-breakpoint
        return [from.min, to.max];
    }

    function check(element, container_rect) {
        //
        element.classList.forEach(class_name => {
            //
            if (!class_name.includes(":is-") && !class_name.includes(":u-")) {
                return;
            }
            //
            var [rule, target_class] = class_name.split(":");
            var [min, max] = parseRule(rule, element);
            var isContainerQuery = rule.startsWith("@"); // @breakpoint
            var width = window.innerWidth;
            //
            if (isContainerQuery || container_rect !== undefined) {
                if (container_rect !== undefined) {
                    width = container_rect.width;
                } else {
                    var container = element.closest(selector_container);
                    if (container === null) {
                        throw {
                            message: "using a container query but @container was not defined",
                            element: element,
                        };
                    }
                    width = container.getBoundingClientRect().width;
                }
            }
            //
            if (width >= min && width <= max) {
                if (!element.classList.contains(target_class)) {
                    element.classList.add(target_class);
                }
            } else {
                if (element.classList.contains(target_class)) {
                    element.classList.remove(target_class);
                }
            }
        });
    }

    const resize_observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
            // @breakpoint:is-class
            entry.target.querySelectorAll(`[class^="@"]:is([class*=":is-"],[class*=":u-"])`).forEach(element => {
                check(element);
            });
        });
    });

    document.querySelectorAll(selector_container).forEach(element => {
        resize_observer.observe(element);
    });

    // toggleClass
    function toggleClass(event) {
        var element = event.target.closest("[data-toggle]");

        var target = element.getAttribute("data-toggle");
        var [selector, class_name] = target.split(":");

        document.querySelectorAll(selector).forEach(v => {
            v.classList.toggle(class_name);
        });
    }

    // bindToggle
    function bindToggle(element) {
        element.removeEventListener("click", toggleClass);
        element.addEventListener("click", toggleClass);
    }

    function toggleDropdown(event) {
        var element = event.target.closest(selector_toggle_dropdown);
        var dropdown = element.parentNode.querySelector(".ts-dropdown");

        dropdown.classList.toggle("is-visible");
    }

    function bindDropdown(element) {
        element.removeEventListener("click", toggleDropdown);
        element.addEventListener("click", toggleDropdown);
    }

    const mutation_observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            //
            if (mutation.type === "attributes") {
                check(mutation.target);

                if (mutation.target.matches(selector_container)) {
                    resize_observer.observe(mutation.target);
                }

                if (mutation.attributeName === "class") {
                    if (mutation.target.matches(".ts-dropdown.is-visible")) {
                        if (mutation.oldValue.includes("is-visible")) {
                            return;
                        }
                        if (mutation.target.parentNode.querySelector(selector_toggle_dropdown) === null) {
                            return;
                        }
                        mutation.target.dropdown = window.FloatingUIDOM.autoUpdate(mutation.target.parentNode.querySelector(selector_toggle_dropdown), mutation.target, () => {
                            window.FloatingUIDOM.computePosition(mutation.target.parentNode.querySelector(selector_toggle_dropdown), mutation.target, {
                                placement: "bottom-end",
                                middleware: [window.FloatingUIDOM.flip(), window.FloatingUIDOM.offset(10)],
                            }).then(({ x, y }) => {
                                Object.assign(mutation.target.style, {
                                    left: `${x}px`,
                                    top: `${y}px`,
                                });
                            });
                        });
                    }

                    if (mutation.target.matches(".ts-dropdown:not(.is-visible)")) {
                        if (!mutation.oldValue.includes("is-visible")) {
                            return;
                        }
                        mutation.target.dropdown();
                        mutation.target.dropdown = undefined;
                    }
                }
            } else if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }
                    if (addedNode.matches(selector_responsive)) {
                        check(addedNode);
                    }
                    if (addedNode.matches("[data-toggle]")) {
                        bindToggle(addedNode);
                    }
                    if (addedNode.matches(selector_toggle_dropdown)) {
                        bindDropdown(addedNode);
                    }

                    if (addedNode.matches("[data-tooltip]")) {
                        (function () {
                            var timer = null;

                            addedNode.addEventListener("mouseover", () => {
                                timer = setTimeout(() => {
                                    var tooltip = document.createElement("div");
                                    tooltip.innerText = addedNode.getAttribute("data-tooltip");
                                    tooltip.classList.add("ts-tooltip", "is-visible")

                                    var arrow = document.createElement("div");
                                    arrow.classList.add("arrow")

                                    tooltip.appendChild(arrow)

                                    document.body.appendChild(tooltip);

                                    addedNode.tooltip = window.FloatingUIDOM.autoUpdate(addedNode, tooltip, () => {
                                        window.FloatingUIDOM.computePosition(addedNode, tooltip, {

                                            strategy: "fixed",
                                            middleware: [window.FloatingUIDOM.autoPlacement({
                                                // 'right' and 'left' won't be chosen
                                                allowedPlacements: ['top', 'bottom'],
                                              }), window.FloatingUIDOM.offset({
                                                crossAxis: -15,
                                                mainAxis: 10,
                                            }), window.FloatingUIDOM.shift(), window.FloatingUIDOM.arrow({
                                                element: arrow,
                                              })],
                                        }).then(({middlewareData, x, y, placement}) => {
                                            Object.assign(tooltip.style, {
                                                left: `${x}px`,
                                                top: `${y}px`,
                                            });

                                            if (middlewareData.arrow) {
                                                const {x, y} = middlewareData.arrow;

                                                Object.assign(arrow.style, {
                                                  left: x != null ? `${x}px` : '',
                                                  top: y != null ? `${y}px` : '',
                                                });
                                            }

                                            if (placement) {
                                                if (placement === 'top') {
                                                    tooltip.classList.add("is-top")
                                                }
                                                if (placement === 'bottom') {
                                                    tooltip.classList.add("is-bottom")
                                                }
                                            }
                                        });
                                    });
                                }, 200);
                            });
                            // check leave tooltip
                            addedNode.addEventListener("mouseleave", () => {
                                if (addedNode.tooltip !== undefined) {
                                    addedNode.tooltip();
                                    addedNode.tooltip = undefined;
                                }
                                document.querySelectorAll(".ts-tooltip.is-visible").forEach((v) => {
                                    v.remove();
                                })
                                if (timer !== null) {
                                    clearTimeout(timer);
                                    timer = null;
                                }
                            });
                        })();
                    }

                    if (addedNode.matches(selector_container)) {
                        resize_observer.observe(addedNode);
                    }
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

    window.addEventListener("resize", event => {
        document.querySelectorAll(selector_responsive).forEach(element => {
            check(element);
        });
    });
})();

/**
 * Tab
 */

(function () {

})();



/**
 * Toggle
 */

(function () {

})();

/**
 * Dropdown
 */

(function () {

})();

/**
 * Tooltip
 */

(function () {

})();