class SelectInput {
    //
    constructor() {
        setInterval(() => {
            document.querySelectorAll(`[data-input="select"]`).forEach(element => {
                this.updateView(element);
            });
        }, 100)
    }

    // windowClick
    windowClick = event => {

        // todo 限制是 data-input, 不然會關到範例的 select dorpdown
        // !!!!!!!!!!!!!
        // TODO
        // TODO
        var closest_container = event.target.closest(".ts-select");


        if (closest_container === null) {
            document.querySelectorAll(`.ts-select`).forEach(container => {
                this.closeDropdown(container);
            });
        }

        if (closest_container !== null) {
            this.closeDropdownsExcept(closest_container);
        }
    };

    // closeDropdownsExcept
    closeDropdownsExcept = excluded_container => {
        document.querySelectorAll(`.ts-select`).forEach(container => {
            if (container !== excluded_container) {
                this.closeDropdown(container);
            }
        });
    };

    // attributeMutation
    attributeMutation = mutation => { };

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Toggle 模組，就監聽其點擊事件。
        if (this.isSelectInput(added_node)) {
            this.initialize(added_node);
            this.bindEventListener(added_node);
        }
    }

    // bindEventListener
    bindEventListener = input => {};

    // isSelectInput
    isSelectInput = element => {
        return element.matches(`[${tocas.config.attributes.input}='select']`);
    };

    // getContainer
    getContainer = element => {
        return element.closest(`.ts-select`);
    };

    // initialize
    initialize = element => {
        var container = this.getContainer(element);

        // 如果容器被點擊的話就建立下拉式選單。
        container.addEventListener("click", event => {
            // 確保不是在點擊容器裡面的下拉式選單。
            if (event.target.closest(".ts-dropdown") !== null) {
                return;
            }

            if (container.classList.contains("is-active")) {
                this.closeDropdown(element);
            } else {
                this.createDropdown(element);
            }
        });

        // 賦予特殊標籤用以套用樣式。
        container.setAttribute("data-tocas", "input-select");

        // 將下拉式選單推送進容器裡。
        container.append(this.createTextContainer());
    };

    // updateView
    updateView = input => {
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

    // getDropdownItems
    getDropdownItems = element => {
        var dropdown = this.getDropdown(element);
        if (dropdown === null) {
            return [];
        }
        return dropdown.querySelectorAll("button.item[data-value]");
    };

    // getOptionByInputValue
    getOptionByInputValue = input => {
        return Array.from(this.getOptions(input)).find(option => option.value === input.value);
    };

    // getTextContainer
    getTextContainer = element => {
        return this.getContainer(element).querySelector("div.content");
    };

    // renderTextContainer
    renderTextContainer = (text_container, option) => {
        var definition = this.getOptionDefinition(option);
        var replacement = this.createTextContainer();

        // <optgroup>
        //
        if (option.disabled) {
            // opacity?
        }

        var attribute_text = option.getAttribute("data-text")
        var option_text = this.getOptionText(option);

        // 如果有指定特別顯示的文字（data-text）那就以該文字為渲染方式為主，
        // 這樣使用者就可以只在 <select> 顯示國旗，但下拉選單裡的 <option> 顯示國旗跟國家名稱。
        replacement.prepend(`${attribute_text !== null ? attribute_text : option_text}`);

        //
        if (definition.icon !== null) {
            var color = definition.icon_color || 'inherit';
            replacement.prepend(createElement(`<span class="ts-icon is-${definition.icon}-icon" style="color: ${color}"></span>`));
        }
        if (definition.image !== null) {
            replacement.prepend(createElement(`<span class="ts-avatar"><img src="${definition.image}"></span>`));
        }
        if (definition.avatar !== null) {
            replacement.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${definition.avatar}"></span>`));
        }
        if (definition.flag !== null) {
            replacement.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
        }
        if (definition.color !== null) {
            replacement.style.color = definition.color || 'inherit';
        }

        text_container.parentNode.replaceChild(replacement, text_container);
    };

    // createElement
    createElement = html => {
        var template = document.createElement("template");
        template.innerHTML = html.trim();
        return template.content.firstChild;
    };

    // createTextContainer
    createTextContainer = () => {
        return this.createElement(`<div class="content"></div>`);
    };

    // getDropdown
    getDropdown = element => {
        var sibling = this.getContainer(element).nextElementSibling;
        return sibling !== null && sibling.matches(".ts-dropdown") ? sibling : null  //.querySelector(".ts-dropdown");
    };

    // getOptions
    getOptions = element => {
        return this.getContainer(element).querySelectorAll("option");
    };

    // getOptionText
    getOptionText = option => {
        return option.text !== undefined && option.text.trim() !== "" ? option.text : option.value;
    };

    // createDropdownElement
    createDropdownElement = () => {
        return this.createElement(`<div class="ts-dropdown is-scrollable is-visible"></div>`);
    };

    // getOptionDefinition
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

    renderOption = (element, dropdown, option, is_selected) => {
        var text = this.getOptionText(option);
        var item = this.createElement(`<button data-value="${option.value}" class="item">${text}</button>`);
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

        // 如果這個渲染的項目跟目前輸入欄位的值相同，就套用 `is-selected` 被選取的樣式。
         if (is_selected) {
            item.classList.add("is-selected");
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
            item.prepend(this.createElement(`<span class="ts-avatar"><img src="${definition.image}"></span>`));
        }
        if (definition.avatar !== null) {
            item.prepend(this.createElement(`<span class="ts-avatar is-circular"><img src="${definition.avatar}"></span>`));
        }
        if (definition.flag !== null) {
            item.prepend(this.createElement(`<span class="ts-flag is-rounded is-bordered is-${definition.flag}-flag"></span>`));
        }
        if (definition.description !== null) {
            item.append(this.createElement(`<span class="description">${definition.description}</span>`));
        }
        if (definition.color !== null && !is_selected) {
            item.style.color = definition.color || 'inherit';
        }

        return item;
    };

    // closeDropdown
    closeDropdown = element => {
        var dropdown = this.getDropdown(element);
        if (dropdown === null) {
            return;
        }
        dropdown.remove();
        this.getContainer(element).classList.remove("is-active")
    };

    // displayDropdown
    displayDropdown = (input, dropdown) => {
        //
        input.classList.add("is-active")

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

    // createDropdown
    createDropdown = element => {
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
            var option_optgroup = option.closest("optgroup")

            if (option_optgroup !== null) {


                var optgroup_label = option_optgroup.getAttribute("label")


                if (dropdown.querySelector(`div.item.is-header[data-tocas-optgroup="${optgroup_label}"]`) === null) {
                    dropdown.append(this.createElement(`<div data-tocas-optgroup="${optgroup_label}" class="item is-header">${optgroup_label}</div>`));
               }


            }

            var option_element = this.renderOption(element, dropdown, option, element.value === option.value);


            if (!option_element) {
                return;
            }

            // 監聽每個項目的點擊事件。
            option_element.addEventListener("click", event => {
                // 被點擊之後就替換 `<select>` 的值，並且發送 `change` 事件來讓其他程式能夠捕捉到。
                element.value = option.value;
                element.dispatchEvent(new Event("change", { bubbles: true }));

                // 關閉下拉式選單。
                this.closeDropdown(element);
            });

            // 將這個項目推至下拉式選單裡。
            dropdown.append(option_element);
        });

        // 取得這個輸入欄位最頂級的包覆容器，然後插入新的下拉式選單。
        var container = this.getContainer(element);
        container.after(dropdown);

        // 透過 Floating UI 來觸發浮動顯示下拉式選單。
        dropdown.tocas_dropdown = this.displayDropdown(container, dropdown);
    };
}

window.tocas_modules = [...window.tocas_modules, new SelectInput()]