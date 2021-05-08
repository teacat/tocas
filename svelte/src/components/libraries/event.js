export function dispatchEvent(element, name, data) {
    element.dispatchEvent(new CustomEvent(name, {
        detail  : data,
        bubbles : true,
        composed: true,
    }))
}

export function listenEvent(element, name, handler) {
    element.addEventListener(name, (event) => {
        event.stopPropagation()
        handler.call(event, event)
    })
}

