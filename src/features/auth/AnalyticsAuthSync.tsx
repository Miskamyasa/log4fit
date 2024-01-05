import {useEffect, type ReactElement} from "react"

import {useAuth} from "@clerk/expo"

import {useStores} from "../../store/useStores"

export function AnalyticsAuthSync(): ReactElement | null {
  const {analyticsStore} = useStores()
  const {isLoaded, userId} = useAuth()

  useEffect(() => {
    if (!isLoaded) {
      analyticsStore.setUserId(null)
      return
    }

    analyticsStore.setUserId(userId ?? null)
  }, [analyticsStore, isLoaded, userId])

  return null
}
