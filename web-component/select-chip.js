// createElement
createElement = (html) => {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
};

class TocasSelectChipComponent extends HTMLElement {
    static observedAttributes = ["color", "size"];


    view = createElement(`<div class="view"></div>`);
    dropdown = createElement(`<div class="dropdown"></div>`);
    select = createElement(`<div class="select"></div>`);
    content = createElement(`<div class="content"></div>`);
    append_input = createElement(`<input class="append" type="text" />`)
    wrap = createElement(`<div class="ts-wrap"></div>`)

    constructor() {
        super();
    }



    connectedCallback() {
        this.wrap.append(this.append_input)
        this.content.append(this.wrap)

        this.select.append(this.content)

        this.view.append(this.select)
        this.view.append(this.dropdown)

        this.append(this.view)

        var mutation_observer = new MutationObserver(mutations => {
            var is_view_updated = false;

            mutations.forEach(mutation => {
                // 如果在本次週期已經更新過視圖了，就不要再更新一次。
                if (is_view_updated) {
                    return
                }

                // 如果是屬性的異動就交給屬性函式處理。
                // NOTE: 暫時不處理，避免更新視圖之後又被屬性函式更新一次。
                if (mutation.type === "attributes" && this.contains(mutation.target)) {
                    return

                } else if (mutation.addedNodes && mutation.addedNodes.length) {

                    // 加上 added_node.tagName === "OPTION"
                    // 以避免 Tocas 自己在更新視圖的時候又觸發了這個函式。
                    if (Array.from(mutation.addedNodes).some((added_node) => added_node.tagName === "OPTION" && this.contains(added_node))) { //
                        is_view_updated = true
                        this.updateView()
                    }

                } else if (mutation.removedNodes && mutation.removedNodes.length) {
                    if (Array.from(mutation.removedNodes).some((removed_node) => removed_node.tagName === "OPTION" && this.contains(removed_node))) { //
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
        return this.querySelector("input:not(.append)")
    }

    //
    underlyingDatalist() {
        return this.querySelector("datalist")

    }

    onAppendInputKeydown(event) {
        if (event.key !== 'Enter' || event.keyCode !== 13) {
            return
        }

        var value = this.append_input.value.trim()
        var values = this.getUnderlyingValues()

        if (values.includes(value)) {
            this.append_input.value = ""
            return
        }

        this.underlying().value = [...values, value].join(",")

        this.append_input.value = ""

        this.updateContent()

        // TODO: lazy if only append

        // TODO: if met comman then crop or add value
    }

    //
    addValue() {

    }

    getUnderlyingValues() {
        return this.underlying().value.split(",").map(value => value.trim()).filter(value => value.length > 0)
    }

    updateView() {
        this.updateContent()

        this.append_input.removeEventListener("keydown", this.onAppendInputKeydown.bind(this))
        this.append_input.addEventListener("keydown", this.onAppendInputKeydown.bind(this))

        //this.underlying().removeEventListener("change", this.onUnderlyingChange.bind(this))
        //this.underlying().addEventListener("change", this.onUnderlyingChange.bind(this))
    }

    //
    updateContent() {
        // 將 Underlying 的值轉換成陣列並且過濾掉空白字串。

        //this.wrap.innerHTML = ""

        this.wrap.querySelectorAll(".ts-chip").forEach(chip => {
            chip.remove()
        })

        var values = this.getUnderlyingValues()

        values.forEach((value) => {
            var chip = createElement(`<div class="ts-chip"></div>`)
            var close = createElement(`<button class="ts-close" type="button"></button>`)

            chip.append(close)

            var option = this.underlyingDatalist().querySelector(`option[value="${value}"]`)

            if (option === null) {
                chip.prepend(value)
                this.wrap.insertBefore(chip, this.append_input)

                return
            }



            var option_data = this.parseOption(option)



            // 如果有指定特別顯示的文字（data-text）那就以該文字為渲染方式為主，
            // 這樣使用者就可以只在 <select> 顯示國旗，但下拉選單裡的 <option> 顯示國旗跟國家名稱。
            chip.prepend(option_data.text)

            if (option_data.icon) {
                var color = option_data.icon_color || 'inherit';
                chip.prepend(createElement(`<span class="ts-icon is-${option_data.icon}-icon" style="color: ${color};"></span>`))
            }
            if (option_data.image) {
                chip.prepend(createElement(`<span class="ts-avatar"><img src="${option_data.image}"></span>`))
            }
            if (option_data.avatar) {
                chip.prepend(createElement(`<span class="ts-avatar is-circular"><img src="${option_data.avatar}"></span>`))
            }
            if (option_data.flag) {
                chip.prepend(createElement(`<span class="ts-flag is-rounded is-bordered is-${option_data.flag}-flag"></span>`))
            }
            if (option_data.color) {
                chip.style.color = option_data.color || 'inherit';
            }

            this.wrap.insertBefore(chip, this.append_input)
        })
    }

    // disconnectedCallback
    disconnectedCallback() {
    }

    // attributeChangedCallback
    attributeChangedCallback() {
    }

    // parseOption
    parseOption(option) {
        return {
            value: option.getAttribute("value"),
            text: option.dataset.text || option.innerText || option.value,
            icon: option.dataset.icon,
            icon_color: option.dataset.iconColor,
            color: option.dataset.color,
            avatar: option.dataset.avatar,
            image: option.dataset.image,
            flag: option.dataset.flag,
            description: option.dataset.description,
            selected: option.hasAttribute("selected"),
            disabled: option.hasAttribute("disabled"),
        }
    }
}

customElements.define('ts-select-chip', TocasSelectChipComponent);