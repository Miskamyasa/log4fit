export function validateRepeats(str = "1"): string {
    const n = parseInt(str, 10)
    if (!Number.isFinite(n) || n <= 1) {
        return "1"
    }
    if (n > 99) {
        return "99"
    }
    return String(n)
}

export function validateWeight(str = "0"): string {
    const [val, dec] = str.split(".")
    if (str.split(".").length === 1) {
        const n = Number(str)
        if (!Number.isFinite(n) || n <= 0) {
            return "0"
        }
        if (n > 999) {
            return "999"
        }
        return String(n)
    }
    return `${val}.${dec}`
}
