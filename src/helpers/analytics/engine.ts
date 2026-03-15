import {idGenerator} from "../idGenerator"

import {append, persist, restore} from "./buffer"
import {flushNow, scheduleRetry} from "./sender"
import {refreshSessionId, setUserId as setSessionUserId} from "./session"
import {analyticsEventSchema, type AnalyticsEvent} from "./types"

const FLUSH_INTERVAL_MS = 10000

type ErrorContext = {
  extra?: Record<string, unknown>,
  source: string,
  trace?: string,
}

let isInitialized = false
let flushIntervalId: ReturnType<typeof setInterval> | null = null

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

function createEvent(name: string, params: Record<string, unknown>): AnalyticsEvent | null {
  const parsedEvent = analyticsEventSchema.safeParse({
    eventId: idGenerator(),
    name,
    timestamp: new Date().toISOString(),
    params,
  })

  if (!parsedEvent.success) {
    console.warn("Invalid analytics event payload", parsedEvent.error)
    return null
  }

  return parsedEvent.data
}

async function init(): Promise<void> {
  if (isInitialized) {
    return
  }

  isInitialized = true

  await restore()

  flushIntervalId ??= setInterval(() => {
    console.log("Flushed")
    void flushNow()
  }, FLUSH_INTERVAL_MS)

  void flushNow()
}

function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log("ANALYTICS", {
      eventName: name,
      params,
    })
  }

  const event = createEvent(name, params)
  if (!event) {
    return
  }

  append(event)
  void persist()
  scheduleRetry()
}

function trackError(err: unknown, context?: ErrorContext): void {
  const payload = {
    ...getErrorPayload(err),
    ...context?.extra,
    source: context?.source ?? "unknown",
    trace: context?.trace,
  }

  if (!__DEV__) {
    trackEvent("error_happened", payload)
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
}

function trackScreenChange(currRoute: string, prevRoute: string, time: number): void {
  trackEvent("screen_change", {
    prevRoute,
    currRoute,
    time,
  })
}

function setUserId(userId: string | null): void {
  setSessionUserId(userId)
}

function startNewSession(): void {
  refreshSessionId()
}

function onAppBackground(): void {
  void persist()
  void flushNow()
}

export const analytics = {
  init,
  onAppBackground,
  setUserId,
  startNewSession,
  trackEvent,
  trackError,
  trackScreenChange,
}
