declare enum DeviceType {
    Mobile = 'mobile',
    Tablet = 'table',
    Computer = 'computer',
    Large = 'large',
}

declare type DeviceInformation = {
    device: DeviceType,
}

declare type ForEachHandler = (element: Node, index: number) => void

declare type Rect = {
    top: number,
    right: number,
    bottom: number,
    left: number,
    width: number,
    height: number,
    x: number,
    y: number,
}

declare type Timer = {
    timer: number,
    passed: number,
    callback: () => {},
    interval: number
    looping: boolean,
    visible: boolean,
    initializer: () => {},
    paused: boolean,
}

declare interface Node {
    $data: { [key: string]: any },
    $timers: { [key: string]: Timer },
    $events: any
}