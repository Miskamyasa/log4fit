import {peek, persist, remove, size} from "./buffer"
import {collectAppInfo, collectDeviceInfo} from "./collect"
import {getSession} from "./session"
import {
  analyticsBatchRequestSchema,
  analyticsForbiddenErrorResponseSchema,
  analyticsInternalServerErrorResponseSchema,
  analyticsSuccessResponseSchema,
  analyticsValidationErrorResponseSchema,
} from "./types"

const ANALYTICS_ENDPOINT = "https://api.log4fit.app/api/analytics/events"
const BATCH_LIMIT = 500
const INITIAL_RETRY_DELAY_MS = 1000
const MAX_RETRY_DELAY_MS = 60000

let retryDelayMs = INITIAL_RETRY_DELAY_MS
let retryTimeoutId: ReturnType<typeof setTimeout> | null = null
let isFlushing = false
let flushNowRef: (() => Promise<void>) | null = null

const parseResponseJson = async (response: Response): Promise<unknown> => {
  try {
    return await response.json()
  }
  catch {
    return null
  }
}

const clearRetryTimer = (): void => {
  if (retryTimeoutId === null) {
    return
  }

  clearTimeout(retryTimeoutId)
  retryTimeoutId = null
}

const resetRetryBackoff = (): void => {
  clearRetryTimer()
  retryDelayMs = INITIAL_RETRY_DELAY_MS
}

const bumpRetryBackoff = (): void => {
  retryDelayMs = Math.min(retryDelayMs * 2, MAX_RETRY_DELAY_MS)
}

const scheduleRetry = (): void => {
  if (retryTimeoutId !== null) {
    return
  }

  retryTimeoutId = setTimeout(() => {
    retryTimeoutId = null
    if (flushNowRef) {
      void flushNowRef()
    }
  }, retryDelayMs)
}

const flushNow = async (): Promise<void> => {
  if (isFlushing) {
    return
  }

  if (size() === 0) {
    resetRetryBackoff()
    return
  }

  const apiKey = process.env.EXPO_PUBLIC_ANALYTICS_API_KEY as string | undefined
  if (!apiKey || apiKey.trim().length === 0) {
    console.error("Analytics sender misconfigured: EXPO_PUBLIC_ANALYTICS_API_KEY is missing")
    return
  }

  const events = peek(BATCH_LIMIT)
  if (events.length === 0) {
    resetRetryBackoff()
    return
  }

  const requestPayload = {
    app: collectAppInfo(),
    device: collectDeviceInfo(),
    session: getSession(),
    events,
  }

  const parsedRequestPayload = analyticsBatchRequestSchema.safeParse(requestPayload)
  if (!parsedRequestPayload.success) {
    console.error("Analytics sender payload validation failed", parsedRequestPayload.error)
    return
  }

  clearRetryTimer()
  isFlushing = true

  try {
    const response = await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(parsedRequestPayload.data),
    })

    const responseBody = await parseResponseJson(response)

    if (response.status === 200) {
      const parsedSuccess = analyticsSuccessResponseSchema.safeParse(responseBody)
      if (!parsedSuccess.success) {
        console.error("Analytics sender success response validation failed", parsedSuccess.error)
      }

      remove(events.length)
      await persist()
      resetRetryBackoff()
      return
    }

    if (response.status === 400) {
      const parsedValidationError = analyticsValidationErrorResponseSchema.safeParse(responseBody)
      if (parsedValidationError.success) {
        console.warn("Analytics sender rejected invalid payload", parsedValidationError.data.details)
      }
      else {
        console.warn("Analytics sender rejected invalid payload with unexpected body", responseBody)
      }

      remove(events.length)
      await persist()
      resetRetryBackoff()
      return
    }

    if (response.status === 403) {
      const parsedForbidden = analyticsForbiddenErrorResponseSchema.safeParse(responseBody)
      if (!parsedForbidden.success) {
        console.error("Analytics sender forbidden response validation failed", parsedForbidden.error)
      }

      console.error("Analytics sender forbidden: check EXPO_PUBLIC_ANALYTICS_API_KEY configuration")
      return
    }

    if (response.status >= 500) {
      const parsedServerError = analyticsInternalServerErrorResponseSchema.safeParse(responseBody)
      if (!parsedServerError.success) {
        console.warn("Analytics sender server error response validation failed", parsedServerError.error)
      }

      scheduleRetry()
      bumpRetryBackoff()
      return
    }

    console.warn("Analytics sender received unexpected response status", response.status)
  }
  catch (error) {
    console.warn("Analytics sender failed to flush events", error)
    scheduleRetry()
    bumpRetryBackoff()
  }
  finally {
    isFlushing = false
  }
}

flushNowRef = flushNow

export {
  flushNow,
  scheduleRetry,
}
