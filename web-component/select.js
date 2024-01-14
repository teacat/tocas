// createElement
createElement = (html) => {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
};

getID = () => {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10 + 2);
};

class TocasSelectComponent extends HTMLElement {
    static observedAttributes = ["class"];

    view = createElement(`<div class="view"></div>`);
    dropdown = createElement(`<div class="ts-dropdown"></div>`);
    select = createElement(`<div class="ts-select"></div>`);
    content = createElement(`<div class="content"></div>`);

    constructor() {
        super();
    }

    // connectedCallback
    connectedCallback() {
        this.buildDOM();
        this.observeDOM();
    }

    // disconnectedCallback
    disconnectedCallback() {
    }

    // attributeChangedCallback
    attributeChangedCallback(name, old_value, new_value) {
        switch (name) {
            case "class":
                this.select.className = `ts-select${new_value ? ' ' + new_value : ''}`
                break;
        }
    }

    // buildDOM
    buildDOM() {
        this.dropdown.id = getID();

        this.select.setAttribute("data-dropdown", this.dropdown.id)
        this.select.className = `ts-select${this.getAttribute("class") ? ' ' + this.getAttribute("class") : ''}`
        this.select.append(this.content)
        this.view.append(this.select)
        this.view.append(this.dropdown)
        this.append(this.view)
    }

    // observeDOM
    observeDOM() {
        var mutation_observer = new MutationObserver(mutations => {
            var is_view_updated = false;

            mutations.forEach(mutation => {
                // 如果在本次週期已經更新過視圖了，就不要再更新一次。
                if (is_view_updated) {
                    return
                }

                // 如果是屬性的異動就交給屬性函式處理。
                if (mutation.type === "attributes") {

                    // 如果這個異動是與此 Select 有關的 Dropdown，那就檢查是不是 Dropdown 顯示了（有 is-visible），
                    // 如果是的話就在 Select 上加上 is-active，反之則移除。
                    if (mutation.attributeName === "class" && mutation.target === this.dropdown) {
                        this.updateSelect()
                        return
                    }

                    if (mutation.attributeName === "disabled" && mutation.target === this.underlying()) {
                        this.updateSelect()
                        return
                    }

                    // 如果是某個 Option 被停用或啟用，就更新視圖。
                    // 監聽所有屬性的變更，這樣使用者就可以即時更改 [data-icon] 這類的屬性。
                    if (this.isChildOption(mutation.target)) { // mutation.attributeName === "disabled" &&
                        is_view_updated = true
                        this.updateView()
                    }

                } else if (mutation.addedNodes && mutation.addedNodes.length) {
                    // 透過 isChildOption 確保是 Option 或 Optgroup 被加入，
                    // 以避免 Tocas 自己在更新視圖的時候又觸發了這個函式。
                    if (Array.from(mutation.addedNodes).some((added_node) => this.isChildOption(added_node))) {
                        is_view_updated = true
                        this.updateView()
                    }

                } else if (mutation.removedNodes && mutation.removedNodes.length) {
                    if (Array.from(mutation.removedNodes).some((removed_node) => this.isChildOption(removed_node))) {
                        is_view_updated = true
                        this.updateView()
                    }
                }
            })
        })

        mutation_observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
        });
    }

    // underlying
    underlying() {
        return this.querySelector("select")
    }

    // onUnderlyingChange
    onUnderlyingChange() {
        this.updateContent()
        this.updateSelecting()
    }

    // isChildOption
    isChildOption(element) {
        return this.contains(element) && (element.tagName === "OPTION" || element.tagName === "OPTGROUP")
    }

    // updateView
    updateView() {
        this.updateSelect()
        this.updateOptions()
        this.updateContent()

        // 在每次 updateView 的時候重新監聽 change 事件，
        // 避免整個 DOM 還沒出來，導致 Tocas 監聽不到東西，這是多餘但又安全的手段。
        this.underlying().removeEventListener("change", this.onUnderlyingChange.bind(this))
        this.underlying().addEventListener("change", this.onUnderlyingChange.bind(this))
    }

    // updateSelect
    updateSelect() {
        // 如果這個 Select 被停用，就在 Select 上加上 is-disabled，反之則移除。
        if (this.underlying().disabled) {
            this.select.classList.add("is-disabled")
        } else {
            this.select.classList.remove("is-disabled")
        }

        // 如果下拉式選單是顯示的，就在 Select 上加上 is-active，反之則移除。
        if (this.dropdown.classList.contains("is-visible")) {
            this.select.classList.add("is-active")
        } else {
            this.select.classList.remove("is-active")
        }
    }

    // updateSelecting
    updateSelecting() {
        var selected_index = this.underlying().selectedIndex

        // 遍歷所有的 Option，如果這個 Option 被選取，
        // 就在下拉選單中加上 is-selected，反之則移除。
        this.dropdown.querySelectorAll("button").forEach((item, index) => {
            if (selected_index === index) {
                item.classList.add("is-selected")
            } else {
                item.classList.remove("is-selected")
            }
        })
    }

    // appendHeader
    appendHeader(optgroup) {
        var is_header_exists = this.dropdown.querySelector(`.item.is-header[data-label="${optgroup.label}"]`) !== null

        // 如果這個標題已經存在，就不要再加入一次。
        if (is_header_exists) {
            return
        }

        var header_item = createElement(`<div class="item is-header" data-label="${optgroup.label}">${optgroup.label}</div>`)

        if (optgroup.disabled) {
            header_item.classList.add("is-disabled")
        }
        this.dropdown.append(header_item)
    }

    // updateOptions
    updateOptions() {
        this.dropdown.innerHTML = "";

        this.querySelectorAll("option").forEach((option, index) => {
            // 如果這個項目是屬於某個群組，就在下拉選單中加入一個標題。
            var optgroup = option.closest("optgroup")
            if (optgroup !== null) {
                this.appendHeader(optgroup)
            }

            // 如果這個項目被停用而且又沒有值，那很有可能只是一個預設的預置項目（Placeholder），
            // 就不要將這個渲染於清單中。
            if (option.disabled && option.value === "") {
                var empty_item = createElement(`<button class="item has-hidden" disabled></button>`)

                this.dropdown.append(empty_item)
                return
            }

            var option_data = this.parseOption(option)
            var item = createElement(`<button class="item" data-value="${option_data.value}">${option_data.default_text}</button>`)

            // 如果這個項目被停用，就套用停用樣式。
            if (option.disabled || optgroup?.disabled) {
                item.disabled = true
            }

            // 如果這個渲染的項目跟目前輸入欄位的值相同，就套用 `is-selected` 被選取的樣式。
            if (option.selected) {
                item.classList.add("is-selected");
            }
            if (option_data.icon) {
                var icon = createElement(`<span class="ts-icon is-${option_data.icon}-icon"></span>`)
                icon.style.setProperty("--color", option_data.icon_color || 'inherit')
                item.prepend(icon)
            }
            if (option_data.image) {
                item.prepend(createElement(`<span class="ts-avatar"><img src="${option_data.image}"></span>`))
            }
            if (option_data.avatar) {
                item.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${option_data.avatar}"></span>`))
            }
            if (option_data.flag) {
                item.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${option_data.flag}-flag"></span>`))
            }
            if (option_data.description) {
                item.append(createElement(`<span class="description">${option_data.description}</span>`))
            }

            item.style.setProperty("--color", option_data.color || 'inherit')

            item.addEventListener("click", () => {
                this.selectValue(index)
            })

            this.dropdown.append(item)
        })

    }

    // selectValue
    selectValue(index) {
        // 如果選取的項目跟目前的項目索引一樣，就不要觸發。
        if (this.underlying().selectedIndex === index) {
            return
        }

        this.underlying().selectedIndex = index
        this.underlying().dispatchEvent(new Event('change', {
            bubbles: true
        }));
    }

    // updateContent
    updateContent() {
        var selected_option = this.querySelectorAll("option")[this.underlying().selectedIndex]

        if (selected_option === undefined) {
            return
        }

        var option_data = this.parseOption(selected_option)

        this.content.innerHTML = ""

        // 如果有指定特別顯示的文字（data-text）那就以該文字為渲染方式為主，
        // 這樣使用者就可以只在 <select> 顯示國旗，但下拉選單裡的 <option> 顯示國旗跟國家名稱。
        this.content.prepend(option_data.text)

        if (option_data.icon) {
            var color = option_data.icon_color || 'inherit';
            this.content.prepend(createElement(`<span class="ts-icon is-${option_data.icon}-icon" style="color: ${color};"></span>`))
        }
        if (option_data.image) {
            this.content.prepend(createElement(`<span class="ts-avatar"><img src="${option_data.image}"></span>`))
        }
        if (option_data.avatar) {
            this.content.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${option_data.avatar}"></span>`))
        }
        if (option_data.flag) {
            this.content.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${option_data.flag}-flag"></span>`))
        }
        this.content.style.color = option_data.color || 'inherit';
    }

    // parseOption
    parseOption(option) {
        return {
            value: option.value,
            // [data-text] 可以是空白，這樣就能在 content 只顯示圖示、國旗。
            text: option.dataset.text === undefined ? option.innerText || option.value : option.dataset.text,
            default_text: option.innerText || option.value,
            icon: option.dataset.icon,
            icon_color: option.dataset.iconColor,
            color: option.dataset.color,
            avatar: option.dataset.avatar,
            image: option.dataset.image,
            flag: option.dataset.flag,
            description: option.dataset.description,
            selected: option.selected,
            disabled: option.disabled,
        }
    }
}

customElements.define('ts-select', TocasSelectComponent);