class Rail {
    // attributeMutation
    attributeMutation = mutation => {};

    // addedNodeMutation
    addedNodeMutation = added_node => {
        if (this.isRail(added_node)) {
            this.bindEventListener(added_node);
        }
    };

    // isRail
    isRail = element => {
        return element.matches("[data-rail]");
    };

    // bindEventListener
    bindEventListener = element => {
        var content_element = element.querySelector(".content")

        window.removeEventListener("scroll", this.scrollHandler(content_element));
        window.addEventListener("scroll", this.scrollHandler(content_element));



        var ro = new ResizeObserver(entries => {

            var content_rect = content_element.getBoundingClientRect();
            var rail_rect = element.getBoundingClientRect();
            console.log( Math.abs(content_rect.bottom - rail_rect.bottom))
            if ( Math.abs(content_rect.bottom - rail_rect.bottom) <= 30 || content_rect.bottom > rail_rect.bottom) {


                if (this.isShorterThanView(content_element)) {
                    this.resetLocks(content_element)

                } else {
                    this.lockBottom(content_element)
                }
            } else {
                console.log(this.isShorterThanView(content_element))
                if (this.isShorterThanView(content_element)) {
                    this.resetLocks(content_element)

                } else {
                    this.lockMiddle(content_element)
                }

            }


        });

        ro.observe(content_element);
    };

    initRail = element => {};

    getStaticTop = element => {
        element.classList.add("is-calculating-top")
        var offset_top = element.offsetTop;

        element.classList.remove("is-calculating-top")
        return offset_top
    };

    // isLockedTop
    isLockedTop = element => {
        return element.classList.contains("is-locked-top")
    };

    // isLockedMiddle
    isLockedMiddle = element => {
        return element.classList.contains("is-locked-middle")
    };

    // isLockedBottom
    isLockedBottom = element => {
        return element.classList.contains("is-locked-bottom")
    };

    // isCollidedTop
    isCollidedTop = element => {
        var rect = element.getBoundingClientRect();

        return rect.top > 10

        //if (this.isLockedMiddle(element)) {
        //    var translate_y = parseInt(element.style.getPropertyValue('--translate-y'))
        //    return (translate_y + element.offsetHeight) - (window.scrollY + window.innerHeight) < 10
        //}
        //return false
    }

    // isCollidedBottom
    isCollidedBottom = element => {
        var rect = element.getBoundingClientRect();

        var element_bottom = rect.top + window.scrollY + element.offsetHeight
        var window_bottom = window.scrollY + window.innerHeight

        // 計算 元素頂部 + 元素高度，減去 視窗頂部 + 視窗高度 來計算出 元素底部 到 畫面底部 的距離。
        var distance = element_bottom - window_bottom

        console.log(distance)


        // 如果元素現在被鎖在中間，那他就是 `position: relative` 搭配 `translateY` 的狀態，
        // 這個時候 offsetTop 會不管用，所以要用當初鎖定的 transateY 去計算元素目前實際的位置。
        if (this.isLockedMiddle(element)) {
            var current_offset_top = parseInt(element.style.getPropertyValue('--top'))

            //console.log((current_offset_top + element.offsetHeight) - (window.scrollY + window.innerHeight))
            //var distance = (current_offset_top + element.offsetHeight) - (window.scrollY + window.innerHeight)
        }



        // 如果元素底部到畫面底部的距離小於 10px，就代表元素已經碰到畫面底部了。
        return distance < 10// Math.abs(element_bottom - window_bottom) < 10 //distance < 10 //&& distance > -10
    }

    // lockBottom
    lockBottom = (element) => {
        element.classList.remove("is-locked-top", "is-locked-middle")

        var static_offset_top = this.getStaticTop(element)
        var rect = element.getBoundingClientRect();

        element.style.setProperty('--top', `${window.innerHeight - rect.height}px`);
        element.classList.add("is-locked-bottom")
    }

    // lockMiddle
    lockMiddle = (element) => {
        if (this.isLockedMiddle(element)) {
            return
        }

        var static_offset_top = this.getStaticTop(element)
        var current_offset_top = element.offsetTop

        element.classList.remove("is-locked-top", "is-locked-bottom")

        element.style.setProperty('--top', `${current_offset_top - static_offset_top}px`);
        element.classList.add("is-locked-middle")
    }

    // lockTop
    lockTop = (element) => {
        element.classList.remove("is-locked-middle", "is-locked-bottom")
        element.classList.add("is-locked-top")
    }

    //
    isShorterThanView = element => {
        return element.offsetHeight < window.innerHeight
    }

    //
    resetLocks = element => {
        element.classList.remove("is-locked-middle", "is-locked-bottom")
        element.classList.add("is-locked-top")
    }

    // findScrollableParent
    findScrollableParent = element => {
        var parent = element.parentElement

        while (parent) {
            const is_scrollable = parent.scrollHeight > parent.clientHeight    ||
                                  parent.scrollWidth  > parent.clientWidth     ||
                                  getComputedStyle(parent).overflow === 'auto' ||
                                  getComputedStyle(parent).overflow === 'scroll'
            if (is_scrollable) {
                return parent
            }
            parent = parent.parentElement
        }
        return null
    }

    scrollHandler = element => {
        var last_scroll_top  = window.scrollY;

        return event => {
            var current_scroll_top = window.scrollY || document.documentElement.scrollTop;
            var scroll_direction   = current_scroll_top > last_scroll_top ? "down" : "up";
            last_scroll_top = current_scroll_top;

            if (this.isShorterThanView(element)) {
                this.resetLocks(element)
                return
            }

            if (scroll_direction === "up") {
                // 如果元素目前所在畫面頂部，使用者又剛好在往上滾，就什麼事都不要做。
                if (this.isLockedTop(element)) {
                    return

                // 如果元素已經鎖在中間，使用者就必須往上滾直至碰到元素頂部，元素才會吸附在螢幕頂部。
                } else if (this.isLockedMiddle(element) && this.isCollidedTop(element)) {
                    this.lockTop(element)
                    return

                // 如果元素目前底部是鎖定在畫面底部，現在往上滾的時候就先鎖定元素目前的位置，這樣就可以正常往上瀏覽。
                } else if (this.isLockedBottom(element)) {
                    this.lockMiddle(element)
                    return
                }

                //
                if (this.isCollidedTop(element)) {
                    this.lockTop(element)
                    return
                }
            } else {
                // 如果元素目前所在畫面底部，使用者又剛好在往下滾，就什麼事都不要做。
                if (this.isLockedBottom(element)) {
                    return

                // 如果元素已經鎖在中間，使用者就必須往下滾直至碰到元素底部，元素才會吸附在螢幕底部。
                } else if (this.isLockedMiddle(element) && this.isCollidedBottom(element)) {
                    this.lockBottom(element)
                    return

                //
                //} else if (this.isLockedMiddle(element)) {
                //    this.lockMiddle(element)
                //    return

                // 如果元素目前頂部是鎖定在畫面頂部，現在往下滾的時候就先鎖定元素目前的位置，這樣就可以正常往下瀏覽。
                } else if (this.isLockedTop(element)) {
                    this.lockMiddle(element)
                    return
                }


                //
                if (this.isCollidedBottom(element)) {
                    this.lockBottom(element)
                    return
                }
            }
        }
    };
}

window.tocas_modules = [...window.tocas_modules, new Rail()];