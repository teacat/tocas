///<reference path="./tocas.d.ts" />

declare type Selector = (Node | Node[] | NodeList | Tocas | string)


class EventListener {
    private mainObject: Tocas

    constructor(tocas: Tocas) {
        this.mainObject = tocas
    }

    public on() {

    }

    public one() {

    }

    public off() {

    }

    public trigger() {

    }

    public emulate() {

    }
}


export class Tocas {
    /** */
    public nodes: Node[]
    /** */
    public selector: Selector
    /** */
    public context: string
    /** */
    public previousObject?: Tocas

    constructor(selector: Selector, context: string = '') {
        /** */
        if (typeof selector === 'string' && selector[0] === '<') {
            var tag = selector.match(/<(.*)\/>|<(.*)>/)
            this.nodes = [document.createElement(tag[1] ? tag[1] : tag[2])]
        }
        /** */
        else if (typeof selector === 'string' && context === undefined) {
            document.querySelectorAll(selector).forEach((element) => this.nodes.push(element))
        }
        /** */
        else if (typeof selector === 'string' && context !== '') {
            this.nodes = new Tocas(selector).find(context).toArray()
        }
        /** */
        else if (selector instanceof NodeList) {
            selector.forEach((element) => this.nodes.push(element))
        }
        /** */
        else if (selector instanceof Tocas) {
            this.nodes = this.nodes.concat(selector.nodes)
            this.selector = selector.selector
            this.context = selector.context
        }
        /** */
        else if (Array.isArray(selector)) {
            this.nodes = this.nodes.concat(selector)
        }
        /** */
        else if (selector instanceof Element || selector instanceof HTMLBodyElement || selector instanceof HTMLElement || selector instanceof HTMLDocument) {
            this.nodes = [selector]
        }

        this.timer = new Timer(this)
    }

    public isPlainObject(object: object): boolean {
        return Object.prototype.toString.call(object) === '[object Object]'
    }

    public isTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }

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

    public fromPoint(x, y): Tocas {
        return new Tocas(document.elementFromPoint(x, y))
    }

    public createElement(html: string): ChildNode {
        var div = document.createElement('div')
        div.innerHTML = html.trim()
        return div.firstChild
    }

    public get(index: number = 0): Node {
        return this.nodes[index]
    }

    public toArray(): Node[] {
        return this.nodes
    }

    public each(callback: (element: (Node | Element), index: number) => void): Tocas {
        this.nodes.forEach((element, index) => {
            callback.call(element, element, index)
        })
        return this
    }

    public collectSwap(callback: (element: Element, index: number) => (Node | NodeList | Array<Node>)): Tocas {
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

    public eq(index: number): Tocas {
        return new Tocas(this.get(index))
    }

    public parent(): Tocas {
        return this.collectSwap((element) => {
            return element.parentNode
        })
    }

    public parents(selector: (string | Node)): Tocas {
        return this.collectSwap((element) => {
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

    public closest(selector: string): Tocas {
        return this.collectSwap((element) => {
            return element.closest(selector)
        })
    }

    public find(selector: string): Tocas {
        return this.collectSwap((element) => {
            return element.querySelectorAll(selector)
        })
    }

    public insertBefore(target: Node): Tocas {
        return this.each(function () {
            new Tocas(target).each((element) => {
                element.parentNode.insertBefore(this, element)
            })
        })
    }

    public insertAfter(target: Node): Tocas {
        return this.each(function () {
            new Tocas(target).each((element) => {
                element.parentNode.insertBefore(this, element.nextSibling)
            })
        })
    }

    public wrap(element: Node): Tocas {
        return this.each(function () {
            if (this.nextSibling) {
                this.parentNode.insertBefore(element, this.nextSibling)
            } else {
                this.parentNode.appendChild(element)
            }
            element.appendChild(this)
        })
    }

    public clone(): Tocas {
        return this.collectSwap((element) => {
            return element.cloneNode(true)
        })
    }

    public append(selector: (string | Tocas | Node)): Tocas {
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

    public appendTo(selector: Selector): Tocas {
        return this.each((element) => {
            new Tocas(selector).append(element)
        })
    }

    public prepend(selector: (string | Tocas | Node)): Tocas {
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

    public prependTo(selector): Tocas {
        return this.each((element) => {
            new Tocas(selector).prepend(element)
        })
    }

    public remove(): Tocas {
        return this.each((element) => {
            if (element.parentNode) {
                element.parentNode.removeChild(element)
            }
        })
    }

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

    public contains(selector: Selector): boolean {
        if (!this.get(0)) {
            return false
        }
        return this.get(0).contains(new Tocas(selector).get())
    }

    public exists(): boolean {
        return this.nodes.length !== 0
    }

    public not(selector: Selector): Tocas {
        return new Tocas(this.toArray().filter((element) => {
            return new Tocas(selector).toArray().indexOf(element) === -1
        }))
    }

    public filter(selector: Selector): Tocas {
        return new Tocas(this.toArray().filter((element) => {
            return new Tocas(selector).toArray().indexOf(element) !== -1
        }))
    }

    public slice(from: number, to?: number): Tocas {
        return new Tocas(this.toArray().slice(from, to))
    }

    public children(selector: string): Tocas {
        return this.collectSwap((element) => {
            return element.querySelectorAll(selector ? ':scope > ' + selector : ':scope > *')
        })
    }

    //public replaceWith(selector: Selector): Tocas {

    //}

    public last(): Tocas {
        return this.eq(this.nodes.length - 1)
    }

    public next(): Tocas {
        return this.collectSwap((element) => {
            return element.nextElementSibling
        })
    }

    public prev(): Tocas {
        return this.collectSwap((element) => {
            return element.previousElementSibling
        })
    }

    public nextAll(selector: string): Tocas {
        return this.collectSwap((element) => {
            var $self = new Tocas(element)
            var $parent = $self.parent()
            var $children = selector ? $parent.find(':scope > ' + selector) : $parent.find(':scope > *')
            var index = $self.index()
            return $children.slice(index + 1)
        })
    }

    public prevAll(selector: string): Tocas {
        return this.collectSwap((element) => {
            var $self = new Tocas(element)
            var $parent = $self.parent()
            var $children = selector ? $parent.find(':scope > ' + selector) : $parent.find(':scope > *')
            var index = $self.index()
            return $children.slice(0, index)
        })
    }

    public addBack(): Tocas {
        if (this.previousObject) {
            this.previousObject.toArray().forEach((element) => {
                this.nodes.push(element)
            })
        }
        return this
    }

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



    public attribute(key: string): string {
        if (!this.get()) {
            return null
        }
        return this.get().getAttribute(key)
    }

    public setAttribute(key: string, value: string): Tocas {
        return this.each((element) => {
            element.setAttribute(key, value)
        })
    }

    public removeAttribute(key: string): Tocas {
        return this.each((element) => {
            element.removeAttribute(key)
        })
    }

    public addClass(keys: string): Tocas {
        var array = Array.prototype.slice.call(keys).join(' ')
        return this.each((element) => {
            DOMTokenList.prototype.add.apply(element.classList, array.split(' ').fliter(Boolean))
        })
    }

    public removeClass(keys: string): Tocas {
        var array = Array.prototype.slice.call(keys).join(' ')
        return this.each((element) => {
            DOMTokenList.prototype.remove.apply(element.classList, array.split(' ').fliter(Boolean))
        })
    }

    public toggleClass(keys: string): Tocas {
        return this.each((element) => {
            keys.split(' ').forEach((name) => {
                element.classList.toggle(name)
            })
        })
    }

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

    public css(key: string): string {
        if (!this.get()) {
            return ''
        }
        return document.defaultView.getComputedStyle(this.get(), null).getPropertyPriority(key)
    }

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



    public text(): string {
        if (!this.get()) {
            return ''
        }
        return this.get().innerText
    }

    public setText(text: string): Tocas {
        return this.each((element) => {
            element.innerText = text
        })
    }

    public value(): string {
        if (!this.get()) {
            return ''
        }
        return this.get().value
    }

    public setValue(value: string): Tocas {
        return this.each((element) => {
            if (element instanceof Element)
                element.value = value
        })
    }

    public html(): string {
        if (!this.get()) {
            return ''
        }
        return this.get().innerHTML
    }

    public setHTML(html: string): Tocas {
        return this.each((element) => {
            if (element instanceof Element)
                element.innerHTML = html
        })
    }

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

    public prop(key: string): any {
        if (!this.get()) {
            return null
        }
        return this.get()[key]
    }

    public setProp(key: string, value: any) {
        return this.each((element) => {
            element[key] = value
        })
    }

    public data(key: string): any {
        if (!this.get() || this.get().$data === undefined) {
            return null
        }
        return this.get().$data[name]
    }

    public setData(key: string, value: any): Tocas {
        return this.each((element) => {
            if (element.$data === undefined) {
                element.$data = {}
            }
            element.$data[key] = value
        })
    }

    public removeData(key: string): Tocas {
        return this.each((element) => {
            if (element.$data[key]) {
                delete element.$data[key]
            }
        })
    }

    public hasTimer(key: string): boolean {
        if (!this.get() || this.get().$timers === undefined || this.get().$timers[key] === undefined) {
            return false
        }
        return true
    }

    public getTimer(key: string): Timer {
        if (!this.get() || this.get().$timers === undefined || this.get().$timers[key] === undefined) {
            return
        }
        return this.get().$timers[key]
    }

    public setTimer(): Tocas {

    }

    public pauseTimer(key: string): Tocas {
        return this.each((element) => {
            if (element.$timers === undefined || element.$timers[key] === undefined) {
                return
            }
            clearInterval(element.$timers[key].timer)
            element.$timers[key].paused = true
        })
    }

    public playTimer(key: string): Tocas {
        return this.each((element) => {
            if (element.$timers === undefined || element.$timers[key] === undefined || !element.$timers[key].paused) {
                return
            }
            element.$timers[key].timer = setInterval(element.$timers[key].initializer, 10)
            element.$timers[key].paused = false
        })
    }

    public removeTimer(key: string): Tocas {
        return this.each((element) => {
            if (element.$timers === undefined || element.$timers[key] === undefined) {
                return
            }
            clearInterval(element.$timers[key].timer)
            delete element.$timers[key]
        })
    }

    public repaint() {
        return this.each((element) => {
            void (element.offsetHeight)
        })
    }

    public uniqueID(): number {
        var id = this.get().$uniqueID
        if (id) {
            return id
        }
        this.get().$uniqueID = (Math.random().toString(16) + '000000000').substr(2, 8)
        return this.get().$uniqueID
    }
}


