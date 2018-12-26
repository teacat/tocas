///<reference path="./Accordion.d.ts" />
var Accordion = /** @class */ (function () {
    function Accordion(element, options) {
        this.options = options;
        if (element instanceof HTMLElement) {
            this.element = element;
        }
        else {
            this.element = document.querySelector(element);
        }
    }
    /**
     *
     * @param event This is the bar parameter
     * @returns 手風琴物件
     */
    Accordion.prototype.addEventListener = function (type, listener, options) {
        this.element.addEventListener.apply(this, arguments);
        return this;
    };
    /**
     *
     * @param event This is the bar parameter
     * @returns 手風琴物件
     */
    Accordion.prototype.removeEventListener = function (type, listener, options) {
        this.element.removeEventListener.apply(this, arguments);
        return this;
    };
    /**
     * open 能夠開啟指定的手風琴項目。
     *
     * @param index 欲開啟的項目索引
     * @returns 手風琴物件
     */
    Accordion.prototype.open = function (index) {
        this.setActive(index);
        this.trigger("open" /* Open */);
        if (this.options.exclusive) {
            this.closeOthers(index);
        }
        return this;
    };
    /**
     * close 能夠關閉指定的手風琴項目。
     *
     * @param index 欲關閉的項目索引
     * @returns 手風琴物件
     */
    Accordion.prototype.close = function (index) {
        this.setHidden(index);
        this.trigger("close" /* Close */);
        return this;
    };
    /**
     * toggle 可以切換指定手風琴項目的開關閉合。
     *
     * @param index 欲切換開關閉的項目索引
     * @returns 手風琴物件
     */
    Accordion.prototype.toggle = function (index) {
        return this;
    };
    /**
     *
     * @returns 手風琴物件
     */
    Accordion.prototype.closeChildren = function () {
        return this;
    };
    /**
     *
     * @param index 欲保持開啟的項目索引，此索引以外的項目都會被關閉
     * @returns 手風琴物件
     */
    Accordion.prototype.closeOthers = function (index) {
        return this;
    };
    /**
     *
     * @param event This is the bar parameter
     * @returns 手風琴物件
     */
    Accordion.prototype.closeAll = function () {
        return this;
    };
    // --------------------------------------------------------------
    // 內部方法
    // --------------------------------------------------------------
    Accordion.prototype.isActive = function () {
        return this.element.classList.contains("active" /* Active */);
    };
    // --------------------------------------------------------------
    // Set
    // --------------------------------------------------------------
    /**
     * setActive 能夠將指定的項目設置為啟用狀態。
     *
     * @param index 欲啟用的項目索引
     */
    Accordion.prototype.setActive = function (index) {
        this.element.querySelectorAll(".title" /* Title */)[index].classList.add("active" /* Active */);
        this.element.querySelectorAll(".content" /* Content */)[index].classList.add("active" /* Active */);
    };
    /**
     * setHidden 能夠將指定的項目設置為停用狀態。
     *
     * @param index 欲停用的項目索引
     */
    Accordion.prototype.setHidden = function (index) {
        this.element.querySelectorAll(".title" /* Title */)[index].classList.remove("active" /* Active */);
        this.element.querySelectorAll(".content" /* Content */)[index].classList.remove("active" /* Active */);
    };
    // --------------------------------------------------------------
    // Trigger
    // --------------------------------------------------------------
    /**
     * trigger 可以觸發指定的事件。
     *
     * @param event 欲觸發的事件名稱。
     */
    Accordion.prototype.trigger = function (event) {
        var customEvent = new CustomEvent(event, {});
        this.element.dispatchEvent(customEvent);
    };
    return Accordion;
}());
