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
        return container.querySelectorAll(tocas.config.strict_responsive ? `[class^="@"]:is([class*=":is-"],[class*=":u-"],[class*=":has-"])` : `[class^="@"][class*=":"]`);
    };

    // getAllResponsiveElements
    getAllResponsiveElements = container => {
        return container.querySelectorAll(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"],[class*=":has-"]` : `[class*=":"]`);
    };

    // isContainer
    isContainer = element => {
        return element.matches(`[class~="${tocas.config.scopes.container}"]`);
    };

    // isResponsiveElement
    isResponsiveElement = element => {
        return element.matches(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"],[class*=":has-"]` : `[class*=":"]`);
    };

    // hasResponsiveClass
    hasResponsiveClass = class_name => {
        return tocas.config.strict_responsive ? class_name.includes(":is-") || class_name.includes(":u-") || class_name.includes(":has-") : class_name.includes(":");
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

window.tocas_modules = [...window.tocas_modules, new Responsive()]