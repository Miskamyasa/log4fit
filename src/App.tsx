import type {ReactElement} from "react"

import {ClerkProvider} from "@clerk/clerk-expo"
import {tokenCache} from "@clerk/clerk-expo/token-cache"
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context"

import {Popups} from "./components/popups/Popups"
import {useBootstrapApp} from "./hooks/useBootstrapApp"
import {Navigation} from "./navigation/Navigation"
import {StoresProvider} from "./store/StoresProvider"

export function App(): ReactElement | null {
  const isLoadingComplete = useBootstrapApp()

  if (!isLoadingComplete) {
    return null
  }

  const key = String(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY)

  if (!key) {
    throw new Error(
      "Missing publishable key for Clerk. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables.",
    )
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ClerkProvider
        publishableKey={key}
        tokenCache={tokenCache}>
        <StoresProvider>
          <Navigation />
          <Popups />
        </StoresProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  )
}
