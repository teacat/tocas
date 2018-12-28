namespace Tocas {

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
        callback: () => void,
        interval: number
        looping: boolean,
        visible: boolean,
        initializer: () => void,
        paused: boolean,
    }

    declare type TimerOptions = {
        name: string,
        callback: () => void,
        interval: number,
        looping: boolean,
        visible: boolean,
    }

    declare interface Node {
        $data: { [key: string]: any },
        $timers: { [key: string]: Timer },
        $events: any
    }

    declare type EventOptions = {
        once: boolean,
    }

    declare type EventListenerOptions = {
        events: string,
        handler: () => void,
        selector?: string,
        data?: any,
        options?: EventOptions,
    }

}