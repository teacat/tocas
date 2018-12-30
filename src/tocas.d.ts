declare namespace Tocas {
    /** Selector 是 Tocas 允許的選擇器元素與型態。 */
    //type Selector = Element | Node | Node[] | NodeList | Tocas.Tocas | string | HTMLBodyElement | HTMLElement | HTMLDocument | Window

    interface SelectorElement {

    }

    //type Selector = (Element | Node | string | Window)


    /** DeviceType 是裝置的種類。 */
    enum DeviceType {
        /** Mobile 是行動裝置。 */
        Mobile = 'mobile',
        /** Tablet 是平板電腦。 */
        Tablet = 'table',
        /** Computer 是標準桌上型電腦。 */
        Computer = 'computer',
        /** Large 是大型螢幕裝置。 */
        Large = 'large',
    }

    /** DeviceInformation 是裝置的相關資訊與種類。 */
    type DeviceInformation = {
        /** device 是裝置的種類。 */
        device: DeviceType,
    }

    /** ForEachHandler 是遍歷時的回呼函式。 */
    type ForEachHandler = (element: Node, index: number) => void

    /** Rect 是元素即時渲染的尺寸與位置資訊。 */
    type Rect = {
        /** top 是元素距離視窗頂部的像素位置。 */
        top: number,
        /** right 是元素距離視窗右側的像素位置。 */
        right: number,
        /** bottom 是元素距離視窗底部的像素位置。 */
        bottom: number,
        /** left 是元素距離視窗最左側的像素位置。 */
        left: number,
        /** width 是元素的寬度。 */
        width: number,
        /** height 是元素的高度。 */
        height: number,
        /** x 是元素的水平像素位置。 */
        x: number,
        /** y 是元素的垂直像素位置。 */
        y: number,
    }

    /** Timer 呈現了一個計時器的相關資料。 */
    type Timer = {
        /** timer 是計時器的 setInterval 編號。 */
        timer: number,
        /** passed 表示目前計時器已經過了多少毫秒。 */
        passed: number,
        /** callback 是計時器的回呼函式。 */
        callback: () => void,
        /** interval 是計時器的執行週期毫秒。 */
        interval: number
        /** looping 表示計時器在執行過後是否要重新循環。 */
        looping: boolean,
        /** visible 表示是否僅在頁面可見的時候計時。 */
        visible: boolean,
        /** initializer 是該計時器的初始化函式。 */
        initializer: () => void,
        /** paused 表示這個計時器是否處於暫停狀態。 */
        paused: boolean,
    }

    /** TimerOptions 是單個計時器建立時的設置選項。 */
    type TimerOptions = {
        /** name 是計時器的名稱。 */
        name: string,
        /** callback 是時間到的回呼函式。 */
        callback: () => void,
        /** interval 是週期毫秒時間。 */
        interval: number,
        /** looping 表示計時器呼叫結束後，是否應該重新循環。 */
        looping: boolean,
        /** visible 表示是否僅在頁面可見的時候才繼續計時。 */
        visible: boolean,
    }

    type Element = any

    // interface Element {
    //     /** $data 是存放自訂資料的屬性。 */
    //     $data?: { [key: string]: any },
    //     /** $timers 是存放計時器的屬性。 */
    //     $timers?: { [key: string]: Timer },
    //     /** $events 是存放事件監聽和回呼函式的屬性。 */
    //     $events?: any
    // }

    interface Window {
        $media?: any
    }

    /** EventOptions 是事件監聽器註冊時的額外選項。 */
    type EventOptions = {
        /** once 表示事件是否僅觸發一次就不再繼續監聽。 */
        once: boolean,
    }

    /** EventListenerOptions 是事件監聽器的註冊主要選項與其回呼函式。 */
    type EventListenerOptions = {
        /** events 是欲監聽的事件名稱，可以透過空白相隔一次帶入多個事件名稱。事件後亦能帶有小數點（`.`）作為別名。 */
        events: string,
        /** handler 是事件回呼函式。 */
        handler: () => void,
        /** selector 是子節點監聽選擇器。 */
        selector?: string,
        /** data 是事件自訂資料，若有則會被傳入回呼函式中。 */
        data?: any,
        /** options 是事件監聽器的額外選項。 */
        options?: EventOptions,
    }

}