import {vexo, customEvent} from "vexo-analytics"

if (!__DEV__) {
  vexo("e01e7bfe-dc2b-40ed-b8eb-2a58e1131065")
}

type ErrorContext = {
  extra?: Record<string, unknown>,
  source: string,
  trace?: string,
}

function getErrorPayload(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    const payload: Record<string, unknown> = {
      message: err.message,
      name: err.name,
      stack: err.stack,
    }
    for (const key of Object.keys(err)) {
      payload[key] = (err as unknown as Record<string, unknown>)[key]
    }
    return payload
  }

  if (typeof err === "object" && err !== null) {
    return {...err}
  }

  return {value: String(err)}
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
  trackError(err: unknown, context?: ErrorContext): void {
    const payload = {
      ...getErrorPayload(err),
      ...context?.extra,
      source: context?.source ?? "unknown",
      trace: context?.trace,
    }

    if (!__DEV__) {
      analytics.trackEvent("error_happened", payload)
      return
    }
    if (err instanceof Error) {
      console.error("ANALYTICS", payload.source, err)
      if (Object.keys(payload).length > 1) {
        console.error("ANALYTICS_META", payload)
      }
      if (payload.trace) {
        console.error("ANALYTICS_TRACE", payload.source, payload.trace)
      }
      return
    }
    console.error("ANALYTICS", payload.source, payload)
  },
}
