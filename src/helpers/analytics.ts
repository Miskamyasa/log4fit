import {vexo, customEvent} from "vexo-analytics"

if (!__DEV__) {
    vexo("e01e7bfe-dc2b-40ed-b8eb-2a58e1131065")
}

export const analytics = {
    trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
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
    trackScreenChange(currRoute: string, prevRoute: string, time: number): void {
        this.trackEvent("screen_change", {
            prevRoute,
            currRoute,
            time,
        })
    },
    trackError(err: unknown): void {
        if (!__DEV__) {
            analytics.trackEvent("error_happened", {
                message: (err as Error).message,
            })
            return
        }
        if (typeof err === "object") {
            console.error("ANALYTICS", JSON.stringify(err, null, 2))
        }
        else {
            console.error("ANALYTICS", err)
        }
    },
}
