import FirebaseAnalytics from "@react-native-firebase/analytics"


const client = FirebaseAnalytics()

class Analytics {
    sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
        if (!__DEV__) {
            void client.logEvent(eventName, params)
            return
        }
        // eslint-disable-next-line no-console
        console.log({
            eventName,
            params,
        })
    }

    sendScreenChange(currRoute: string, prevRoute: string, time: number): void {
        this.sendEvent("screen_change", {prevRoute, currRoute, time})
        if (!__DEV__) {
            void client.logScreenView({
                screen_name: currRoute,
                screen_class: currRoute,
            })
        }
    }
}

const analytics = new Analytics()

export default analytics
