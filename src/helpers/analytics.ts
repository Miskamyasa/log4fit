import {vexo, customEvent} from "vexo-analytics"

if (!__DEV__) {
    vexo("e01e7bfe-dc2b-40ed-b8eb-2a58e1131065")
}

export const analytics = {
    sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
        if (!__DEV__) {
            customEvent(eventName, params)
        }
        else {
        // eslint-disable-next-line no-console
            console.log("ANALYTICS", {
                eventName,
                params,
            })
        }
    },
    sendScreenChange(currRoute: string, prevRoute: string, time: number): void {
        this.sendEvent("screen_change", {
            prevRoute,
            currRoute,
            time,
        })
    },
    sendError(err: unknown): void {
        if (!__DEV__) {
            analytics.sendEvent("error_happened", {
                message: (err as Error).message,
            })
            return
        }
        if (typeof err === "string") {
            console.warn("ANALYTICS", err)
        }
        else if (typeof err === "object") {
            console.warn("ANALYTICS", JSON.stringify({...err}, null, 2))
        }
        else {
            console.warn("ANALYTICS", err)
        }
    },
}
