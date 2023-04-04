import analytics from "./analytics"


function errorHandler(err: unknown): void {
    if (!__DEV__) {
        analytics.sendEvent((err as Error).message)
        return
    }

    typeof err === "object"
        ? console.warn(JSON.stringify({...err}, null, 2))
        : console.warn((err as Error).message)
}

export default errorHandler
