class Popover {
    #touch_start_y = 0
    #touch_start_x = 0

    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個追加的 DOM 元素是一個彈出內容，就監聽其開關事件。
        if (this.isPopover(added_node)) {
            this.bindEventListener(added_node)
        }
    }

    // isPopover
    isPopover = element => {
        return element.matches(`[data-popover][popover]`)
    }

    // position
    position = element => {
        return element.dataset.position || "bottom"
    }

    // bindEventListener
    bindEventListener = element => {
        // 在顯示之前先隱藏，這樣出現時就不會因為重新定位而閃爍。
        element.removeEventListener("beforetoggle", this.beforetoggleEventListener)
        element.addEventListener("beforetoggle", this.beforetoggleEventListener)

        element.removeEventListener("toggle", this.toggleEventListener)
        element.addEventListener("toggle", this.toggleEventListener)

        element.removeEventListener("wheel", this.wheelEventListener)
        element.removeEventListener("touchstart", this.touchstartEventListener)
        element.removeEventListener("touchmove", this.touchmoveEventListener)

        // 監聽捲軸滾動，讓捲軸可以滾穿 Top-Layer，
        // 這樣使用者就不會被 Popover 卡住不好捲動底層頁面。
        element.addEventListener("wheel", this.wheelEventListener)
        element.addEventListener("touchstart", this.touchstartEventListener)
        element.addEventListener("touchmove", this.touchmoveEventListener)
    }

    // wheelEventListener
    wheelEventListener = event => {
        this.universalWheelHandler(event.deltaX, event.deltaY, event)
    }

    // touchstartEventListener
    touchstartEventListener = event => {
        this.#touch_start_x = event.touches[0].clientX
        this.#touch_start_y = event.touches[0].clientY
    }

    // touchmoveEventListener
    touchmoveEventListener = event => {
        var touch_end_x = event.touches[0].clientX
        var touch_end_y = event.touches[0].clientY

        var delta_x = this.#touch_start_x - touch_end_x
        var delta_y = this.#touch_start_y - touch_end_y

        // 更新起始位置為目前的觸控點位置
        this.#touch_start_x = touch_end_x
        this.#touch_start_y = touch_end_y

        this.universalWheelHandler(delta_x, delta_y, event)
    }

    // universalWheelHandler
    universalWheelHandler = (delta_x, delta_y, event) => {
        var is_scrollable = event.target.scrollHeight > event.target.clientHeight || event.target.scrollWidth > event.target.clientWidth
        // 沒有內容的 Textarea 雖然 Overflow 是 Auto，但多數瀏覽器都允許滾動下層。
        // getComputedStyle(event.target).overflow === 'auto'    ||
        // getComputedStyle(event.target).overflow === 'scroll'

        // 如果 Popover 本身就可以捲動，那就不要干涉。
        if (is_scrollable) {
            return
        }

        // 找尋可捲動的父元素，沒有的話預設就捲動整個網頁。
        // 多數瀏覽器都是往上搜尋父元素，而不是搜尋這個元素肉眼底下可捲動的容器。
        var scrolling_element = this.findScrollableParent(event.target) || document.documentElement

        // NOTE: 如果 Textarea 已經滑到底，使用者此時按住 Textarea 往下滑，並不會讓網頁捲動。
        // 主要是 Input 不會將事件冒泡給 Popover 的 ontouchmove 監聽器，這暫時不重要，先不解決。
        scrolling_element.scrollTop += delta_y
        scrolling_element.scrollLeft += delta_x
    }

    // findScrollableParent
    findScrollableParent = element => {
        var parent = element.parentElement

        while (parent) {
            const is_scrollable =
                parent.scrollHeight > parent.clientHeight ||
                parent.scrollWidth > parent.clientWidth ||
                getComputedStyle(parent).overflow === "auto" ||
                getComputedStyle(parent).overflow === "scroll"
            if (is_scrollable) {
                return parent
            }
            parent = parent.parentElement
        }
        return null
    }

    // beforetoggleEventListener
    beforetoggleEventListener = event => {
        // 在顯示之前先隱藏，這樣出現時就不會因為重新定位而閃爍。
        if (event.newState === "open") {
            event.target.style.visibility = "hidden"
        }
    }

    // toggleEventListener
    toggleEventListener = event => {
        var popover = event.target

        // 取得這個觸發元素會切換的彈出式選單名稱。
        var target_id = popover.dataset.popover

        // 透過命名空間搜尋對應的彈出式選單。
        var target = document.getElementById(target_id)

        if (event.newState === "closed") {
            if (popover.tocas_popover !== undefined) {
                popover.tocas_popover()
                popover.tocas_popover = undefined
                // NOTE: 以後再來考慮 A11y。
                // target.removeAttribute("aria-expanded")
            }
            return
        }

        // NOTE: 以後再來考慮 A11y。
        // target.setAttribute("aria-expanded", "true")

        // 取得目標選單的偏好位置設定。
        var position = this.position(popover)

        // 設定彈出內容的絕對位置。
        popover.style.setProperty("--ts-popover-position", `fixed`)

        // 現在才顯示彈出內容，這樣就不會閃爍。
        popover.style.visibility = "visible"

        // 透過 Floating UI 來觸發浮動顯示。
        popover.tocas_popover = TocasFloatingUIDOM.autoUpdate(target, popover, () => {
            TocasFloatingUIDOM.computePosition(target, popover, {
                strategy: "fixed",
                placement: position,
                middleware: [
                    // 選單某面如果沒有空間就被擠兌到另一邊。
                    TocasFloatingUIDOM.flip({
                        crossAxis: false,
                    }),

                    // 偏移彈出內容的上下垂直留點空隙。
                    TocasFloatingUIDOM.offset(8),

                    // 選單會被螢幕左右推移，避免超出畫面空間。
                    TocasFloatingUIDOM.shift(),
                ],
            }).then(({ x, y }) => {
                // 賦予彈出式選單絕對位置。
                Object.assign(popover.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                })
            })
        })
    }
}

window.tocas_modules = [...window.tocas_modules, new Popover()]
