///<reference path="./tocas.d.ts" />

declare type Selector = (Node | Node[] | NodeList | Tocas.Tocas | string)

namespace Tocas {
    /**
     * Tocas 是 Tocas UI 中的主要元素選擇器核心類別。
     */
    export class Tocas {
        /** nodes 是選擇器核心中所選擇的節點元素。 */
        public nodes: Node[]
        /** selector 是選擇器選擇時的依據字串或元素。 */
        public selector: Selector
        /** context 是選擇器的上下文選擇器，用以作為子元素搜尋依據。 */
        public context: string
        /** previousObject 是這個選擇器的上一個選擇器物件，用來得知相關的連結關係。 */
        public previousObject?: Tocas

        constructor(selector: Selector, context: string = '') {
            /** 如果選擇器是文字，但是是標籤（如：`<div>`）就建立新的元素 */
            if (typeof selector === 'string' && selector[0] === '<') {
                var tag = selector.match(/<(.*)\/>|<(.*)>/)
                this.nodes = [document.createElement(tag[1] ? tag[1] : tag[2])]
            }
            /** 如果選擇器是一般的文字，就選取元素。 */
            else if (typeof selector === 'string' && context === undefined) {
                document.querySelectorAll(selector).forEach((element) => this.nodes.push(element))
            }
            /** 如果選擇器有上下文選擇器，就透過選擇器找出上下文元素。 */
            else if (typeof selector === 'string' && context !== '') {
                this.nodes = new Tocas(selector).find(context).toArray()
            }
            /** 如果選擇器是 NodeList 就轉換成元素陣列然後取出來接著繼續。 */
            else if (selector instanceof NodeList) {
                selector.forEach((element) => this.nodes.push(element))
            }
            /** 傳入的是一個選擇器，就取出裡面的元素然後繼續。 */
            else if (selector instanceof Tocas) {
                this.nodes = this.nodes.concat(selector.nodes)
                this.selector = selector.selector
                this.context = selector.context
            }
            /** 如果選擇器是陣列，就當作是元素陣列，取出來然後繼續。 */
            else if (Array.isArray(selector)) {
                this.nodes = this.nodes.concat(selector)
            }
            /** 如果是單個 DOM 元素，就放入選擇器然後繼續。 */
            else if (selector instanceof Element || selector instanceof HTMLBodyElement || selector instanceof HTMLElement || selector instanceof HTMLDocument) {
                this.nodes = [selector]
            }
        }

        /**
         * isPlainObject 會判斷傳入的參數是否為物件。
         *
         * @param object 欲判斷的參數。
         */
        public isPlainObject(object: object): boolean {
            return Object.prototype.toString.call(object) === '[object Object]'
        }

        /**
         * isTouchDevice 會判斷目前的裝置是否為可觸控螢幕裝置。
         */
        public isTouchDevice(): boolean {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0
        }

        /**
         * device 可以取得裝置的型態與資料。
         */
        public device(): DeviceInformation {
            var device: DeviceType
            if (window.innerWidth < 767) {
                device = DeviceType.Mobile
            } else if (window.innerWidth > 767 && window.innerWidth < 991) {
                device = DeviceType.Tablet
            } else if (window.innerWidth > 991 && window.innerWidth < 1199) {
                device = DeviceType.Computer
            } else if (window.innerWidth > 1199 && window.innerWidth < 1919) {
                device = DeviceType.Large
            }
            return {
                device,
            }
        }

        /**
         * fromPoint 會基於傳入的座標回傳位於該座標的元素。
         *
         * @param x 水平像素座標。
         * @param y 垂直像素座標。
         */
        public fromPoint(x, y): Tocas {
            return new Tocas(document.elementFromPoint(x, y))
        }

        /**
         * createElement 會將傳入的 HTML 轉換成元素節點。
         *
         * @param html 欲轉換成節點的 HTML 原始標籤
         */
        public createElement(html: string): ChildNode {
            var div = document.createElement('div')
            div.innerHTML = html.trim()
            return div.firstChild
        }

        /**
         * get 能夠取得選擇器中指定索引的元素。
         *
         * @param index 欲取得的元素索引。
         */
        public get(index: number = 0): Node {
            return this.nodes[index]
        }

        /**
         * toArray 可以將選擇器轉換成元素節點陣列。
         */
        public toArray(): Node[] {
            return this.nodes
        }

        /**
         * each 能夠以 forEach 遍歷整個選擇器的元素，這樣可以針對每一個元素進行使用。
         *
         * @param callback 針對每個元素作為處理的回呼函式。
         */
        public each(callback: (element: (Node | Element), index: number) => void): Tocas {
            this.nodes.forEach((element, index) => {
                callback.call(element, element, index)
            })
            return this
        }

        /**
         * collectSwap 會收集遍歷回呼函式的回傳內容並整合成一個新的選擇器回傳。
         *
         * @param callback 針對每個元素作為處理的回呼函式。
         */
        private _collectSwap(callback: (element: Element, index: number) => (Node | NodeList | Array<Node>)): Tocas {
            var collection: Node[]

            this.each((element, index) => {
                var result = callback.call(element, element, index)
                /** */
                if (result === undefined || result === null) {
                    return
                }
                /** */
                if (result instanceof NodeList) {
                    result.forEach((element) => {
                        collection.push(element)
                    })
                }
                /** */
                else if (Array.isArray(result)) {
                    collection = collection.concat(result)
                }
                /** */
                else {
                    if (collection.indexOf(result) === -1) {
                        collection.push(result)
                    }
                }
            })
            /** */
            var set = new Set(collection)
            /** */
            var newTocas = newTocas([...collection])
            /** */
            newTocas.previousObject = this
            return newTocas
        }

        /**
         * eq 可以取得指定元素並將其作為唯一的選擇器元素並繼續使用。
         *
         * @param index 欲使用的元素索引。
         */
        public eq(index: number): Tocas {
            return new Tocas(this.get(index))
        }

        /**
         * parent 可以取得元素的父節點，並以此作為新的選擇器繼續使用。
         */
        public parent(): Tocas {
            return this._collectSwap((element) => {
                return element.parentNode
            })
        }

        /**
         * parents 能夠取得元素的所有父節點，並以此作為新的選擇器繼續使用。
         *
         * @param selector 最頂的父節點比對選擇器，若父節點與此選擇器結果相同，則不繼續往上搜尋
         */
        public parents(selector: (string | Node)): Tocas {
            return this._collectSwap((element) => {
                var parents: Node[]
                var matchedSelector: boolean

                while (element) {
                    element = element.parentNode
                    if (element.nodeType === 9) {
                        break
                    }
                    parents.push(element)
                    if (new Tocas(element).is(selector)) {
                        matchedSelector = true
                        break
                    }
                }

                if (selector && !matchedSelector) {
                    return []
                }
                return parents
            })
        }

        /**
         * closest 能夠取得距離元素最近的指定父元素。
         *
         * @param selector 欲搜尋的最近元素選擇器
         */
        public closest(selector: string): Tocas {
            return this._collectSwap((element) => {
                return element.closest(selector)
            })
        }

        /**
         * find 可以在元素內搜尋指定的元素。
         *
         * @param selector 欲搜尋的元素選擇器
         */
        public find(selector: string): Tocas {
            return this._collectSwap((element) => {
                return element.querySelectorAll(selector)
            })
        }

        /**
         * insertBefore 可以將元素插入在指定元素節點之前。
         *
         * @param target 欲插入之前的目標元素節點
         */
        public insertBefore(target: Node): Tocas {
            return this.each(function () {
                new Tocas(target).each((element) => {
                    element.parentNode.insertBefore(this, element)
                })
            })
        }

        /**
         * insertAfter 可以將元素插入在指定元素節點之後。
         *
         * @param target 欲插入之後的目標元素節點
         */
        public insertAfter(target: Node): Tocas {
            return this.each(function () {
                new Tocas(target).each((element) => {
                    element.parentNode.insertBefore(this, element.nextSibling)
                })
            })
        }

        /**
         * wrap 可以將此元素以另一個元素包覆起來。
         *
         * @param container 作為容器的元素
         */
        public wrap(container: Node): Tocas {
            return this.each((element) => {
                if (element.nextSibling) {
                    element.parentNode.insertBefore(container, element.nextSibling)
                } else {
                    element.parentNode.appendChild(container)
                }
                container.appendChild(element)
            })
        }

        /**
         * clone 會複製選擇器裡的節點，這將導致選擇器裡的節點都是一份副本而不會指向原本的地方。
         */
        public clone(): Tocas {
            return this._collectSwap((element) => {
                return element.cloneNode(true)
            })
        }

        /**
         * append 可以將某個元素插入到自己節點內部的最後作為子元素。
         *
         * @param selector 欲作為插入子元素的選擇器
         */
        public append(selector: Selector): Tocas {
            var shouldClone = this.nodes.length !== 1
            if (selector instanceof Tocas) {
                return this.each((element) => {
                    selector.each((e) => element.appendChild(shouldClone ? e.cloneNode(true) : e))
                })
            }
            /** */
            else if (typeof selector === 'string') {
                return this.each((element) => {
                    if (element instanceof Element) {
                        element.insertAdjacentHTML('beforeend', selector)
                    }
                })
            }
            /** */
            return this.each((element) => {
                element.appendChild(shouldClone ? selector.cloneNode(true) : selector)
            })
        }

        /**
         * appendTo 能將目前選擇器元素插入到指定元素的內部最後面。
         *
         * @param selector 欲插入的目標對象選擇器
         */
        public appendTo(selector: Selector): Tocas {
            return this.each((element) => {
                new Tocas(selector).append(element)
            })
        }

        /**
         * prepend 能將元素插入在目前選擇器元素的內部最前面。
         *
         * @param selector 欲作為插入子元素的選擇器
         */
        public prepend(selector: Selector): Tocas {
            var shouldClone = this.nodes.length !== 1
            if (selector instanceof Tocas) {
                return this.each((element) => {
                    if (element instanceof Element) {
                        selector.each((e) => element.prepend(shouldClone ? e.cloneNode(true) : e))
                    }
                })
            }
            /** */
            else if (typeof selector === 'string') {
                return this.each((element) => {
                    if (element instanceof Element) {
                        element.insertAdjacentHTML('afterbegin', selector)
                    }
                })
            }
            /** */
            return this.each((element) => {
                if (element instanceof Element) {
                    element.prepend(shouldClone ? selector.cloneNode(true) : selector)
                }
            })
        }

        /**
         * 能將目前選擇器元素插入到指定元素的內部最前面。
         *
         * @param selector 欲插入的目標對象選擇器
         */
        public prependTo(selector): Tocas {
            return this.each((element) => {
                new Tocas(selector).prepend(element)
            })
        }

        /**
         * remove 可以移除元素節點。
         */
        public remove(): Tocas {
            return this.each((element) => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element)
                }
            })
        }

        /**
         * is 可以比對選擇器內的元素是否與比較選擇器內的相符。
         *
         * @param selector 欲比較的元素選擇器。
         */
        public is(selector: Selector): boolean {
            var isInElements: boolean
            if (selector instanceof HTMLElement) {
                if (!this.get(0)) {
                    return false
                }
                return this.get(0).isSameNode(selector)
            }
            this.each((element) => {
                new Tocas(selector).each((compareElement) => {
                    isInElements = element === compareElement
                })
            })
            return isInElements
        }

        /**
         * contains 可以確認目前的選擇器有沒有包含指定的元素。
         *
         * @param selector 欲確認是否存在的元素選擇器。
         */
        public contains(selector: Selector): boolean {
            if (!this.get(0)) {
                return false
            }
            return this.get(0).contains(new Tocas(selector).get())
        }

        /**
         * exists 表示目前的選擇器內有沒有任何元素。
         */
        public exists(): boolean {
            return this.nodes.length !== 0
        }

        /**
         * not 會將目前選擇器內的元素與指定目標選擇器比較，如果兩者相符就從目前的選擇器中淘汰掉該元素。
         *
         * @param selector 欲淘汰的元素選擇器
         */
        public not(selector: Selector): Tocas {
            return new Tocas(this.toArray().filter((element) => {
                return new Tocas(selector).toArray().indexOf(element) === -1
            }))
        }

        /**
         * filter 會將目前選擇器內的元素與指定目標選擇器比較，如果兩者不相符就從目前的選擇器中淘汰掉該元素。
         *
         * @param selector 欲保留的元素選擇器
         */
        public filter(selector: Selector): Tocas {
            return new Tocas(this.toArray().filter((element) => {
                return new Tocas(selector).toArray().indexOf(element) !== -1
            }))
        }

        /**
         * slice 能替元素陣列進行切分。
         *
         * @param from 起始索引
         * @param to 結束索引
         */
        public slice(from: number, to?: number): Tocas {
            return new Tocas(this.toArray().slice(from, to))
        }

        /**
         * children 可以取得元素的第一層子節點。
         *
         * @param selector 欲特別指定的子節點選擇器。
         */
        public children(selector: string = ''): Tocas {
            return this._collectSwap((element) => {
                return element.querySelectorAll(selector !== '' ? ':scope > ' + selector : ':scope > *')
            })
        }

        //public replaceWith(selector: Selector): Tocas {

        //}

        /**
         * last 會讓整個選擇器中剩下最後一個元素。
         */
        public last(): Tocas {
            return this.eq(this.nodes.length - 1)
        }

        /**
         * next 會選擇元素的下一個元素。
         */
        public next(): Tocas {
            return this._collectSwap((element) => {
                return element.nextElementSibling
            })
        }

        /**
         * prev 會選擇元素的上一個元素。
         */
        public prev(): Tocas {
            return this._collectSwap((element) => {
                return element.previousElementSibling
            })
        }

        /**
         * nextAll 會選擇元素的所有下一個元素。
         */
        public nextAll(selector: string): Tocas {
            return this._collectSwap((element) => {
                var $self = new Tocas(element)
                var $parent = $self.parent()
                var $children = selector ? $parent.find(':scope > ' + selector) : $parent.find(':scope > *')
                var index = $self.index()
                return $children.slice(index + 1)
            })
        }

        /**
         * prevAll 會選擇元素的所有上一個元素。
         */
        public prevAll(selector: string): Tocas {
            return this._collectSwap((element) => {
                var $self = new Tocas(element)
                var $parent = $self.parent()
                var $children = selector ? $parent.find(':scope > ' + selector) : $parent.find(':scope > *')
                var index = $self.index()
                return $children.slice(0, index)
            })
        }

        /**
        * addBack 會將上一次的選擇器元素全部加入到目前的選擇器中。
        */
        public addBack(): Tocas {
            if (this.previousObject) {
                this.previousObject.toArray().forEach((element) => {
                    this.nodes.push(element)
                })
            }
            return this
        }

        /**
        * index 會回傳選擇器中元素位於節點列表中的索引號碼。
        */
        public index(): number {
            var node = this.get()
            var index = 0

            if (!node) {
                return -1
            }
            while (node = node.previousElementSlibling) {
                index++
            }
            return index
        }

        /**
         * attribute 能夠取得指定的標籤屬性內容。
         *
         * @param key 欲取得的標籤屬性鍵名
         */
        public attribute(key: string): string {
            if (!this.get()) {
                return null
            }
            return this.get().getAttribute(key)
        }

        /**
         * setAttribute 能夠設置指定的標籤屬性內容。
         *
         * @param key 欲設置的標籤屬性鍵名
         * @param value 欲設置的標籤屬性字串值
         */
        public setAttribute(key: string, value: string): Tocas {
            return this.each((element) => {
                element.setAttribute(key, value)
            })
        }

        /**
         * removeAttribute 能夠移除元素中的指定的標籤屬性。
         *
         * @param key 欲移除的標籤屬性鍵名
         * @param value 欲設置的標籤屬性字串值
         */
        public removeAttribute(key: string): Tocas {
            return this.each((element) => {
                element.removeAttribute(key)
            })
        }

        /**
         * addClass 能夠在元素上追加樣式類別。
         *
         * @param keys 欲追加的樣式類別，能以空白分隔一次追加多個樣式類別
         */
        public addClass(keys: string): Tocas {
            var array = Array.prototype.slice.call(keys).join(' ')
            return this.each((element) => {
                DOMTokenList.prototype.add.apply(element.classList, array.split(' ').fliter(Boolean))
            })
        }

        /**
         * addClass 能夠移除元素上的指定樣式類別。
         *
         * @param keys 欲移除的樣式類別，能以空白分隔一次移除多個樣式類別
         */
        public removeClass(keys: string): Tocas {
            var array = Array.prototype.slice.call(keys).join(' ')
            return this.each((element) => {
                DOMTokenList.prototype.remove.apply(element.classList, array.split(' ').fliter(Boolean))
            })
        }

        /**
         * toggleClass 能夠切換元素上的指定樣式類別。
         *
         * @param keys 欲切換的樣式類別，能以空白分隔一次切換多個樣式類別
         */
        public toggleClass(keys: string): Tocas {
            return this.each((element) => {
                keys.split(' ').forEach((name) => {
                    element.classList.toggle(name)
                })
            })
        }

        /**
         * hasClass 能表示元素是否包含指定的樣式類別。
         *
         * @param keys 欲檢查是否存在的樣式類別
         */
        public hasClass(key: string): boolean {
            if (!this.get()) {
                return false
            }
            return this.get().classList.contains(key)
        }

        public setCSS(key: string, value: string): Tocas {
            return this.each((element) => {
                element.style[key] = value
            })
        }

        /**
         * css 能夠取得元素的指定樣式。
         *
         * @param key 欲取得的樣式屬性名稱
         */
        public css(key: string): string {
            if (!this.get()) {
                return ''
            }
            return document.defaultView.getComputedStyle(this.get(), null).getPropertyPriority(key)
        }

        /**
         * rect 會回傳元素目前的渲染寬度與位置樣式。
         */
        public rect(): Rect {
            if (!this.get()) {
                return {}
            }
            var r = this.get().getBoundingClientRect()
            return {
                top: r.top,
                right: r.right,
                bottom: r.bottom,
                left: r.left,
                width: r.width,
                height: r.height,
                x: r.x,
                y: r.y
            }
        }

        /**
         * onWithOptions 能夠以進階的方式在元素中註冊事件監聽器。
         *
         * @param options 事件監聽器的相關選項
         */
        public onWithOptions(options: EventListenerOptions): Tocas {
            var events = this._eventAlias(options.events)

            return this.each((element) => {
                if (events[0] === '(' && events[events.length - 1] === ')') {
                    if (element !== window) {
                        return
                    }
                    if (window.$media === undefined) {
                        window.$media = {}
                    }
                    if (window.$media[events] === undefined) {
                        window.$media[events] = []
                        window.matchMedia(events).addListener(function (mq) {
                            for (var i = 0; i < window.$media[events].length; i++) {
                                window.$media[events][i].func.call(this, mq);
                            }
                        })
                    }
                    window.$media[events].push({
                        data: {},
                        func: options.handler,
                    })
                    return
                }

                if (!element.hasOwnProperty('addEventListener')) {
                    return
                }
                if (element.$events === undefined) {
                    element.$events = {}
                }
                events.split(' ').forEach((eventName) => {
                    var event = eventName.split('.')
                    var hasAlias = event.length > 1
                    var eventName = event[0]
                    var eventAlias = hasAlias ? event[1] : ''

                    if (element.$events[eventName] === undefined) {
                        element.$events[eventName] = {
                            anonymous: []
                        }

                        element.addEventListener(eventName, (event) => {
                            var hasArgs = event.detail && event.detail.args && event.deftail.args.length > 0
                            var calledAlias = event.detail && event.detail.alias !== ''

                            if (element.$events[eventName] === undefined) {
                                return
                            }

                            for (var alias in element.$events[eventName]) {
                                if (calledAlias && calledAlias !== alias) {
                                    continue
                                }

                                var index = element.$events[eventName][alias].length
                                while (index--) {
                                    if (element.$events[eventName] === undefined) {
                                        continue
                                    }
                                    if (element.$events[eventName][alias] === undefined) {
                                        continue
                                    }
                                    single = element.$events[eventName][alias][index]
                                    content = element

                                    if (single.selector !== undefined) {
                                        selector = single.selector
                                        closest = new Tocas(event.target).closest(selector)
                                        if (this.closest.length === 0) {
                                            continue
                                        } else {
                                            context = closest.get()
                                        }
                                    }
                                    event.data = single.data
                                    if (hasArgs) {
                                        single.func.call(context, event, ...event.detail.args)
                                    } else {
                                        single.func.call(context, event)
                                    }
                                    if (single.once === true) {
                                        element.$events[eventName][alias].splice(index, 1)
                                    }
                                }
                            }
                        })
                    }

                    if (hasAlias) {
                        if (element.$events[eventName][eventAlias] === undefined) {
                            element.$events[eventName][eventAlias] = []
                        }
                        element.$events[eventName][eventAlias].push({
                            func: handler,
                            selector: selector,
                            data: data,
                            once: options ? options.once : false,
                        })
                    } else {
                        element.$events[eventName].anonymous.push({
                            func: handler,
                            selector: selector,
                            data: data,
                            once: options ? options.once : false,
                        })
                    }
                })
            })
        }

        /**
         * on 能夠在元素中註冊事件監聽器。
         *
         * @param events 欲註冊的事件名稱，可透過空白一次註冊多個事件，事件名稱後能以小數點（`.`）追加事件別名
         * @param handler 事件監聽器的回呼函式
         * @param options 註冊時的相關選項
         */
        public on(events: string, handler: () => void, options?: EventOptions): Tocas {

        }


        /**
         * onWithData 能夠在元素中註冊帶有自訂額外資料的事件監聽器。
         *
         * @param events 欲註冊的事件名稱，可透過空白一次註冊多個事件，事件名稱後能以小數點（`.`）追加事件別名
         * @param handler 事件監聽器的回呼函式
         * @param data 自訂的事件資料，將會在呼叫回呼函式時傳入
         * @param options 註冊時的相關選項
         */
        public onWithData(events: string, handler: () => void, data: any, options?: EventOptions) {

        }

        /**
         * onChild 能夠在元素中註冊子元素的事件監聽器，這樣可以節省大量的子元素事件監聽器以增進效能。
         *
         * @param events 欲註冊的事件名稱，可透過空白一次註冊多個事件，事件名稱後能以小數點（`.`）追加事件別名
         * @param selector 欲偵測的子元素選擇器
         * @param handler 事件監聽器的回呼函式
         * @param options 註冊時的相關選項
         */
        public onChild(events: string, selector: string, handler: () => void, options?: EventOptions): Tocas {

        }

        /**
         * onChildWithData 能夠在元素中註冊帶有自訂額外資料的子元素事件監聽器，這樣可以節省大量的子元素事件監聽器以增進效能。
         *
         * @param events 欲註冊的事件名稱，可透過空白一次註冊多個事件，事件名稱後能以小數點（`.`）追加事件別名
         * @param selector 欲偵測的子元素選擇器
         * @param data 自訂的事件資料，將會在呼叫回呼函式時傳入
         * @param handler 事件監聽器的回呼函式
         * @param options 註冊時的相關選項
         */
        public onChildWithData(events: string, selector: string, data: any, handler: () => void, options?: EventOptions)

        public one(): Tocas {

        }

        /**
         * off 能夠移除某個元素中的指定或所有事件監聽器。
         *
         * @param events 欲移除的事件名稱，可透過空白一次移除多個事件，事件名稱後能以小數點（`.`）追加事件別名
         * @param handler 事件監聽器的回呼函式，用作移除判定用途
         */
        public off(events: string, handler?: () => void): Tocas {
            if (events !== undefined) {
                events = this._eventAlias(events)

            }

            return this.each((element) => {
                if (events && events[0] === '(' && events[events.length - 1] === ')') {
                    if (element !== window) {
                        return
                    }
                    if (window.$media === undefined) {
                        return
                    }
                    if (window.$media[events] === undefined) {
                        return
                    }
                    if (handler !== undefined) {
                        window.$media[events].forEach((item, index) => {
                            if (handler === item.func) {
                                window.$media[events].splice(index, 1)
                            }
                        })
                    }
                    else {
                        window.$media[events] = []
                    }
                    return
                }

                if (element.$events === undefined) {
                    return
                }

                if (events === undefined) {
                    element.$events = {}
                    return
                }

                events.split(' ').forEach((eventName) => {
                    event = eventName.split('.')
                    isAlias = eventName[0] === '.'
                    hasAlias = event.length === 2 && event[0] !== ''
                    aliasName = hasAlias || isAlias ? event[1] : ''
                    eventName = !isAlias ? event[0] : ''

                    if (handler !== undefined && element.$events[eventName] !== undefined) {
                        element.$events[eventName].anonymous.forEach((item, index) => {
                            if (handler === item.func) {
                                element.$events[eventName].anonymous.splice(index, 1)
                            }
                        })
                    }
                    else if (!isAlias && hasAlias && element.$events[eventName] !== undefined) {
                        delete element.$events[eventName][aliasName]
                    }
                    else if (isAlias && !hasAlias) {
                        for (event in element.$events) {
                            for (alias in element.$events[event]) {
                                if (aliasName === alias) {
                                    delete element.$events[event][aliasName]
                                }
                            }
                        }
                    }
                    else if (element.$events[eventName] !== undefined) {
                        delete element.$events[eventName]
                    }
                })
            })


        }

        /**
         * trigger 能夠手動觸發某個事件，而不用等到該事件真的發生。
         *
         * @param events 欲觸發的事件名稱，可透過空白一次觸發多個事件，事件名稱後能以小數點（`.`）追加事件別名
         */
        public trigger(events: string): Tocas {
            events = this._eventAlias(events)
            var customArguments: any[] = [].slice.call(arguments, 1)

            this.each((element) => {
                events.split(' ').forEach((eventName) => {
                    var event = eventName.split('.')
                    var name = event[0]
                    var alias = event.length > 1 ? event[1] : ''

                    element.dispatchEvent(new CustomEvent(name, {
                        detail: {
                            args: customArguments,
                            alias: alias,
                        }
                    }))
                })
            })
        }

        /**
         * _eventAlias 是事件的別名處理函式。
         *
         * @param events 欲處理的事件名稱，可透過空白一次處理多個事件，事件名稱後能以小數點（`.`）追加事件別名
         */
        private _eventAlias(events: string): string {
            var pair = events.split('.')
            var alias = pair[1] !== undefined ? `.${pair[1]}` : ''

            if (pair.indexOf('animationend') !== -1) {
                return `webkitAnimationEnd${alias} mozAnimationEnd${alias} MSAnimationEnd${alias} oanimationend${alias} animationend${alias}`
            }
            else if (pair.indexOf('transitionend') !== -1) {
                return `webkitTransitionEnd${alias} mozTransitionEnd${alias} oTransitionEnd${alias} msTransitionEnd${alias} transitionend${alias}`
            }
            else {
                return events
            }
        }

        /**
         * emulate 能夠強迫一個事件在指定時間內被觸發。如果該事件沒有任何外力因素觸發，會被強迫觸發，若已經被觸發則忽略，這用來確保某個事件回呼函式一定有被呼叫。
         * @param events 欲觸發的事件名稱，可透過空白一次觸發多個事件，事件名稱後能以小數點（`.`）追加事件別名
         * @param duration 等待觸發的時間
         */
        public emulate(events: string, duration: number): Tocas {
            return this.each((element) => {
                var called: boolean
                new Tocas(element).one(event, () => {
                    called = true
                })
                setTimeout(() => {
                    if (called) {
                        return
                    }
                    new Tocas(element).trigger(event)
                }, duration)
            })
        }

        /**
         * text 能夠取得元素的標準文字。
         */
        public text(): string {
            if (!this.get()) {
                return ''
            }
            return this.get().innerText
        }

        /**
         * setText 可以設置元素的標準文字。
         *
         * @param text 欲設置的文字
         */
        public setText(text: string): Tocas {
            return this.each((element) => {
                element.innerText = text
            })
        }

        /**
         * value 能夠取得元素的值。
         */
        public value(): string {
            if (!this.get()) {
                return ''
            }
            return this.get().value
        }

        /**
         * setValue 能夠設置元素的值。
         *
         * @param value 欲設置的值
         */
        public setValue(value: string): Tocas {
            return this.each((element) => {
                if (element instanceof Element)
                    element.value = value
            })
        }

        /**
         * html 能夠取得元素的 HTML 標籤原始碼。
         */
        public html(): string {
            if (!this.get()) {
                return ''
            }
            return this.get().innerHTML
        }

        /**
         * setHTML 能夠設置元素的 HTML 標籤原始碼。
         *
         * @param html 欲設置的 HTML 原始碼內容
         */
        public setHTML(html: string): Tocas {
            return this.each((element) => {
                if (element instanceof Element)
                    element.innerHTML = html
            })
        }

        /**
         * empty 會清除元素的文字、內容、值。
         */
        public empty() {
            return this.each((element) => {
                if (element.value !== undefined) {
                    element.value = null
                }
                if (element.innerHTML !== undefined) {
                    element.innerHTML = null
                }
                if (element.innerText !== undefined) {
                    element.innerText = null
                }
            })
        }

        /**
         * prop 會取得元素的屬性資料。
         *
         * @param key 欲取得的屬性資料鍵名
         */
        public prop(key: string): any {
            if (!this.get()) {
                return null
            }
            return this.get()[key]
        }

        /**
         * setProp 能設置元素的屬性資料。
         *
         * @param key 欲設置的屬性資料鍵名
         * @param value 欲設置的資料內容
         */
        public setProp(key: string, value: any) {
            return this.each((element) => {
                element[key] = value
            })
        }

        /**
         * data 能取得存在元素內的資料。
         *
         * @param key 欲取得的資料鍵名
         */
        public data(key: string): any {
            if (!this.get() || this.get().$data === undefined) {
                return null
            }
            return this.get().$data[name]
        }

        /**
         * setData 能夠設置資料並儲存在元素內。
         *
         * @param key 欲設置的資料鍵名
         * @param value 欲設置的資料內容
         */
        public setData(key: string, value: any): Tocas {
            return this.each((element) => {
                if (element.$data === undefined) {
                    element.$data = {}
                }
                element.$data[key] = value
            })
        }

        /**
         * removeData 會移除元素中的指定資料。
         *
         * @param key 欲移除的資料鍵名
         */
        public removeData(key: string): Tocas {
            return this.each((element) => {
                if (element.$data[key]) {
                    delete element.$data[key]
                }
            })
        }

        /**
         * hasTimer 會表示元素是否有指定的計時器。
         *
         * @param key 欲查詢是否存在的計時器名稱
         */
        public hasTimer(key: string): boolean {
            if (!this.get() || this.get().$timers === undefined || this.get().$timers[key] === undefined) {
                return false
            }
            return true
        }

        /**
         * getTimer 能從元素中取得指定的計時器。
         *
         * @param key 欲取得的計時器名稱
         */
        public getTimer(key: string): Timer {
            if (!this.get() || this.get().$timers === undefined || this.get().$timers[key] === undefined) {
                return
            }
            return this.get().$timers[key]
        }

        /**
         * setTimer 能夠替一個元素設置計時器。
         *
         * @param options 欲設置的計時器相關資料與選項
         */
        public setTimer(options: TimerOptions): Tocas {
            setTimeout(() => {
                options = {
                    ...{
                        name: '',
                        callback: () => { },
                        interval: 0,
                        looping: false,
                        visible: false,
                    },
                    ...options,
                }

                this.each((element) => {
                    if (element.$timers === undefined) {
                        element.$timers = {}
                    }
                    if (element.$timers[options.name] !== undefined) {
                        clearInterval(element.$timers[options.name].timer)
                    }
                    var timer = () => {
                        if (options.visible && document.hidden) {
                            return
                        }
                        element.$timers[options.name].passed += 10
                        if (element.$timers[options.name].passed < options.interval) {
                            return
                        }
                        options.callback()
                        if (options.looping) {
                            element.$timers[options.name].passed = 0
                        } else {
                            if (element.$timers[options.name] !== undefined) {
                                clearInterval(element.$timers[options.name].timer)
                                // delete @$timers[options.name]
                            }
                        }
                    }
                    element.$timers[options.name] = {
                        timer: setInterval(timer, 10),
                        passed: 0,
                        callback: options.callback,
                        interval: options.interval,
                        looping: options.looping,
                        visible: options.visible,
                        initializer: timer,
                        paused: false,
                    }
                })
            }, 0)
            return this
        }

        /**
         * pauseTimer 可以暫停元素中的指定計時器。
         *
         * @param key 欲暫停的計時器名稱
         */
        public pauseTimer(key: string): Tocas {
            return this.each((element) => {
                if (element.$timers === undefined || element.$timers[key] === undefined) {
                    return
                }
                clearInterval(element.$timers[key].timer)
                element.$timers[key].paused = true
            })
        }

        /**
         * playTimer 會啟動元素中指定的計時器。
         *
         * @param key 欲啟動的計時器名稱。
         */
        public playTimer(key: string): Tocas {
            return this.each((element) => {
                if (element.$timers === undefined || element.$timers[key] === undefined || !element.$timers[key].paused) {
                    return
                }
                element.$timers[key].timer = setInterval(element.$timers[key].initializer, 10)
                element.$timers[key].paused = false
            })
        }

        /**
         * removeTimer 會移除元素中的指定計時器。
         *
         * @param key 欲移除的計時器名稱
         */
        public removeTimer(key: string): Tocas {
            return this.each((element) => {
                if (element.$timers === undefined || element.$timers[key] === undefined) {
                    return
                }
                clearInterval(element.$timers[key].timer)
                delete element.$timers[key]
            })
        }

        /**
         * repaint 會強制頁面重新繪圖。
         */
        public repaint() {
            return this.each((element) => {
                void (element.offsetHeight)
            })
        }

        /**
         * uniqueID 會產生獨立編號，用來辨識特定的元素時很好用。
         */
        public uniqueID(): number {
            var id = this.get().$uniqueID
            if (id) {
                return id
            }
            this.get().$uniqueID = (Math.random().toString(16) + '000000000').substr(2, 8)
            return this.get().$uniqueID
        }
    }


}