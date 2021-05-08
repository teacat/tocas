export function isWanted(value) {
    return value !== null && value !== false
}

export function notWanted(value) {
    return value === null
}