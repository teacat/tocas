class InputChip {
    // attributeMutation
    attributeMutation = mutation => { };

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Toggle 模組，就監聽其點擊事件。
        if (this.isChips(added_node)) {
            this.initialize(added_node);

        }
    }

    //
    constructor() {
        setInterval(() => {
            document.querySelectorAll(`[data-input="chips"]`).forEach(element => {
                this.updateChipsView(element);
            });
        }, 100);
    }

    // getOptionByValue
    getOptionByValue = (element, value) => {
        return Array.from(this.getOptions(element)).find(option => option.value === value);
    };

    // getTextContainer
    getTextContainer = element => {
        return this.getContainer(element).querySelector("div.content");
    };

    // getInputValues
    getInputValues = element => {
        return element.value.split(",").filter(v => v.trim() !== "");
    };

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

    // getOptions
    getOptions = element => {
        return this.getContainer(element).querySelectorAll("option");
    };

    // getDropdown
    getDropdown = element => {
        return this.getContainer(element).querySelector(".ts-dropdown");
    };

    // isChips
    isChips = element => {
        return element.matches(`[data-input="chips"]`);
    };

    // getContainer
    getContainer = element => {
        return element.closest(`.ts-input,.ts-select`);
    };

    // createTextContainer
    createTextContainer = () => {
        return this.createElement(`<div class="content"></div>`);
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
        var dropdown = this.createElement(`<div class="ts-dropdown is-scrollable is-visible"></div>`);
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

            var icon = this.createElement(`<span class="ts-icon is-${definition.icon}-icon"></span>`)
            if (!is_selected) {
                icon.style.color = definition.icon_color || 'inherit';
            }
            item.prepend(icon);
        }

        //
        if (definition.image !== null) {
            item.prepend(createElement(`<span class="ts-avatar"><img src="${definition.image}"></span>`));
        }
        if (definition.avatar !== null) {
            item.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${definition.avatar}"></span>`));
        }
        if (definition.flag !== null) {
            item.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
        }
        if (definition.description !== null) {
            item.append(createElement(`<span class="description">${definition.description}</span>`));
        }
        if (definition.color !== null && !is_selected) {
            item.style.color = definition.color || 'inherit';
        }

        return item;
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

    renderChip = option => {
        var text = this.getOptionText(option);
        var definition = this.getOptionDefinition(option);
        var chip = createElement(`<div class="ts-chip" data-value="${option.value}">${text}</div>`);

        //
        if (definition.icon !== null) {
            var color = definition.icon_color || 'inherit';
            chip.prepend(createElement(`<span class="ts-icon is-${definition.icon}-icon" style="color: ${color}"></span>`));
        }
        if (definition.image !== null) {
            chip.prepend(createElement(`<span class="ts-image"><img src="${definition.image}"></span>`));
        }
        if (definition.avatar !== null) {
            chip.prepend(createElement(`<span class="ts-image is-circular"><img src="${definition.avatar}"></span>`));
        }
        if (definition.flag !== null) {
            chip.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
        }
        if (definition.color !== null) {
            chip.style.color = definition.color || 'inherit';
        }

        return chip;
    };

    //
    getOptionDefinition = option => {
        return {
            icon: option.getAttribute("data-icon") || null,
            icon_color: option.getAttribute("data-icon-color") || null,
            image: option.getAttribute("data-image") || null,
            avatar: option.getAttribute("data-avatar") || null,
            flag: option.getAttribute("data-flag") || null,
            description: option.getAttribute("data-description") || null,
            color: option.getAttribute("data-color") || null,
        };
    };

    // getOptionText
    getOptionText = option => {
        //var datalist = this.getDatalist(element);

        return option.text !== undefined && option.text.trim() !== "" ? option.text : option.value;
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

    // getOptionsByInputUnselectedValue
    getOptionsByInputUnselectedValue = element => {
        var input_values = this.getInputValues(element);

        return Array.from(this.getOptions(element)).filter(option => !input_values.includes(option.value));
    };

    // getAppendInput
    getAppendInput = element => {
        return this.getContainer(element).querySelector(".append");
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

    // closeDropdown
    closeDropdown = container => {
        var dropdown = this.getDropdown(container);
        if (dropdown === null) {
            return;
        }
        dropdown.remove();
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

    // createElement
    createElement = html => {
        var template = document.createElement("template");
        template.innerHTML = html.trim();
        return template.content.firstChild;
    };

    // getInput
    getInput = element => {
        return this.getContainer(element).querySelector("input:not(.append),select");
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

    // createChipsAppendInput
    createChipsAppendInput = element => {
        // 建立一個用來輸入、搜尋關鍵字的額外輸入欄位。
        var append_input = this.createElement(`<input class="append" data-autosize="horizontal" type="text">`);

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
        var wrapper = this.createElement(`<div></div>`);

        // 將輸入欄位推入至包覆容器裡。
        wrapper.append(append_input);

        return wrapper;
    };

    // initialize
    initialize = element => {
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
}


window.tocas_modules = [...window.tocas_modules, new InputChip()]