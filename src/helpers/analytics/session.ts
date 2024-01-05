import {idGenerator} from "../idGenerator"

import type {AnalyticsSession} from "./types"

let sessionId = idGenerator()
let userId: string | null = null

const refreshSessionId = (): void => {
  sessionId = idGenerator()
}

const setUserId = (nextUserId: string | null): void => {
  userId = nextUserId
}

const getSession = (): AnalyticsSession => ({
  sessionId,
  userId,
})

export {
  getSession,
  refreshSessionId,
  setUserId,
}
