declare type EventHandler = (event: CustomEvent) => any

declare const enum ClassName {
    Active = 'active',
}

declare type Options = {
    /** exclusive 表示同一時間內，是否僅允許手風琴的其中一個分頁能被打開。 */
    exclusive: boolean,
    /** collapsible 表示展開的手風琴是否可以被使用者手動關閉。 */
    collapsible: boolean,
    /** closeNested 表示手風琴被關閉時，是否一同閉合子手風琴。 */
    closeNested: boolean,
    /** onOpening 回呼函式會在手風琴正在展開時呼叫。 */
    onOpening: { (): void; },
    /** onOpen 回呼函式會在手風琴展開結束時呼叫。 */
    onOpen: { (): void; },
    /** onClosing 回呼函式會在手風琴正在關閉時呼叫。 */
    onClosing: { (): void; },
    /** onClose 回呼函式會在手風琴關閉結束時呼叫。 */
    onClose: { (): void; },
    /** onChanging 回呼函式會在手風琴正在更改開閉合狀態時呼叫。 */
    onChanging: { (): void; },
    /** onChange 回呼函式會在手風琴更改開閉合狀態結束時呼叫。 */
    onChange: { (): void; },
}

declare const enum EventType {
    Opening = 'opening',
    Open = 'open',
    Closing = 'closing',
    Close = 'close',
    Change = 'change',
    Click = 'click',
}

declare const enum Selector {
    Title = '.title',
    Content = '.content',
    Accordion = '.ts.accordion',
    ActiveContent = '.active.content',
    Active = '.active',
}
