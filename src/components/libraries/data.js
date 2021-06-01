export function isFalse(value) {
    return value === null || value === false
}

export function isTrue(value) {
    return value !== null && value !== false
}