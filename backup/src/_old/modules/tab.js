"use strict";

// EVENT_TYPE 是事件種類。
const EVENT_TYPE = {
    TOGGLE: "toggle",
    FIRST_SHOW: "firstshow",
    SHOW: "show",
    FIRST_HIDE: "firsthide",
    HIDE: "hide",
};

// SELECTOR 是選擇器。
const SELECTOR = {
    ITEM: ":scope > .item",
};

// VARIATION 是樣式名稱。
const VARIATION = {
    ACTIVE: "active",
};

// ATTRIBUTE 是 HTML 屬性名稱。
const ATTRIBUTE = {
    NAME: "data-tab-name",
};

// Tab 是分頁籤模組，同一個分頁組可以在不同的頁籤來回切換顯示。
export class Tab {
    constructor(element) {
        //
        if (!!element && !element) {
            console.log("[TOCAS] TAB element not found.");
            return;
        }

        //
        this._handlers = {};
        this._handlers[EVENT_TYPE.TOGGLE] = [];
        this._handlers[EVENT_TYPE.FIRST_SHOW] = [];
        this._handlers[EVENT_TYPE.SHOW] = [];
        this._handlers[EVENT_TYPE.FIRST_HIDE] = [];
        this._handlers[EVENT_TYPE.HIDE] = [];
        //
        this._element = element;
        //
        this._init();
        //
        return this;
    }

    /**
     * 系統函式
     */

    // _hasInit 會表示這個模組先前是否初始化過。
    _hasInit() {
        return this._element.$tocasTab !== undefined;
    }

    // _init 是初始化整個模組的過程。
    _init() {
        // 如果這個模組先前初始化過，就摧毀重來。
        if (this._hasInit()) {
            this.destory();
        }
        // 替所有頁籤元素加上點擊切換事件監聽器。
        this._element.querySelectorAll(SELECTOR.ITEM).forEach(v => {
            v.addEventListener("click", this._boundClickEvent);
        });
        // 將模組存放於元素內供之後複用。
        this._element.$tocasTab = this;
    }

    /**
     * 事件函式
     */

    //
    _boundClickEvent = event => {
        this._clickEvent(event);
    };

    // _clickEvent 是頁籤點擊事件，點擊後會切換對應的頁籤內容。
    _clickEvent(event) {
        this.toggle(event.target.getAttribute(ATTRIBUTE.NAME));
    }

    /**
     * 通用函式
     */

    // destory 會摧毀這個模組，讓所有功能不可用。
    destory() {
        //
        this._element.querySelectorAll(SELECTOR.ITEM).forEach(v => {
            v.removeEventListener("click", this._boundClickEvent);
        });
        //
        delete this._element.$tocas.tab;
    }

    // addEventListener 會新增一個新的事件監聽器在這個分頁組上。
    addEventListener(event, handler) {
        return this;
    }

    // removeEventListener 會移除原先附著在這個分頁組上的事件監聽器。
    removeEventListener(event, handler) {
        return this;
    }

    /**
     * 功能函式
     */

    // toggle 會切換到指定的分頁籤頁面。
    toggle(tabName) {
        this._element.querySelectorAll(SELECTOR.ITEM).forEach(v => {
            if (v.getAttribute(ATTRIBUTE.NAME) === tabName) {
                v.classList.add(VARIATION.ACTIVE);
                return;
            }
            v.classList.remove(VARIATION.ACTIVE);
        });
        return this;
    }

    // Push State & Hash
}
