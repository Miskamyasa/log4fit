import {JsonMap} from "@segment/analytics-react-native"

import segmentClient from "./segment"


class Analytics {
    sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
        if (!__DEV__) {
            void segmentClient.track(eventName, params as JsonMap)
        }
    }

    sendScreenChange(currRoute: string, prevRoute: string, time: number): void {
        if (!__DEV__) {
            void segmentClient.screen(currRoute, {
                prevRoute,
                time,
            })
        }
    }
}

const analytics = new Analytics()

export default analytics
