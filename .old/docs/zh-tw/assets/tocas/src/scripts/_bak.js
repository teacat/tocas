
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

                text_container.classList.remove("has-invisible");
                text_container.classList.add("is-ghosting");
            });

            // 監聽輸入欄位的輸入事件，並且用來篩選、搜尋清單。
            append_input.addEventListener("input", event => {
                this.createComboDropdown(element);
                this.refreshComboDropdown(element);

                var text_container = this.getTextContainer(element);

                if (append_input.value.trim() === "") {
                    text_container.classList.remove("has-invisible");
                    text_container.classList.add("is-ghosting");
                } else {
                    text_container.classList.remove("is-ghosting");
                    text_container.classList.add("has-invisible");
                }
            });

            //
            append_input.addEventListener("blur", event => {
                var text_container = this.getTextContainer(element);

                append_input.value = "";

                text_container.classList.remove("is-ghosting");
                text_container.classList.remove("has-invisible");
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
                option.classList.add("has-hidden");
            });

            // 再單獨顯示合格的項目。
            options.forEach(option => {
                var item = dropdown.querySelector(`button.item[data-value="${option.value}"]`);

                // 有時候這個項目可能不存在於下拉式選單裡，因為值可能是空白或是被隱藏的。
                if (item === null) {
                    return;
                }

                item.classList.remove("has-hidden");
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
                option.classList.add("has-hidden");
            });

            // 再單獨顯示合格的項目。
            available_options.forEach(option => {
                dropdown.querySelector(`button.item[data-value="${option.value}"]`).classList.remove("has-hidden");
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

autoSizeModule.addedNodeMutation(node);
        inputModule.addedNodeMutation(node);
        filePlaceModule.addedNodeMutation(node);
        paginationModule.addedNodeMutation(node);
        // stashModule.addedNodeMutation(node);


        autoSizeModule.attributeMutation(mutation);
        inputModule.attributeMutation(mutation);
        filePlaceModule.attributeMutation(mutation);
        paginationModule.attributeMutation(mutation);
        // stashModule.attributeMutation(mutation);

        inputModule.windowClick(event);