import {vexo, customEvent} from "vexo-analytics"


if (!__DEV__) {
    vexo("e01e7bfe-dc2b-40ed-b8eb-2a58e1131065")
}

class Analytics {
    sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
        if (!__DEV__) {
            customEvent(eventName, params)
            return
        }
        // eslint-disable-next-line no-console
        console.log({
            eventName,
            params,
        })
    }

    sendScreenChange(currRoute: string, prevRoute: string, time: number): void {
        this.sendEvent("screen_change", {
            prevRoute,
            currRoute,
            time,
        })
    }
}

const analytics = new Analytics()

export default analytics
