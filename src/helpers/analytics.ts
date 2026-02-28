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
      if (err instanceof Error) {
        analytics.trackEvent("error_happened", {
          name: err.name,
          message: err.message,
          stack: err.stack,
        })
      } else {
        analytics.trackEvent("error_happened", {
          name: "NonErrorThrow",
          message: String(err),
        })
      }
      return
    }
    const callerFrame = new Error().stack?.split("\n")[2] ?? ""
    const callerMatch = /([\w.]+:\d+):\d+/.exec(callerFrame)
    const callerTag = `[${callerMatch ? callerMatch[1] : "unknown"}]`
    if (err instanceof Error) {
      console.error("ANALYTICS", callerTag, err.stack)
      const extraKeys = Object.keys(err)
      if (extraKeys.length > 0) {
        const extras: Record<string, unknown> = {}
        for (const key of extraKeys) {
          extras[key] = (err as unknown as Record<string, unknown>)[key]
        }
        console.error("ANALYTICS", callerTag, extras)
      }
    }
    else if (typeof err === "object" && err !== null) {
      console.error("ANALYTICS", callerTag, JSON.stringify(err, null, 2))
    }
    else {
      console.error("ANALYTICS", callerTag, err)
    }
  },
}
