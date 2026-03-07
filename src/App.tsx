import {type ReactElement, useEffect} from "react"

import {ClerkProvider} from "@clerk/clerk-expo"
import {tokenCache} from "@clerk/clerk-expo/token-cache"
import * as Linking from "expo-linking"
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context"

import {Popups} from "./components/popups/Popups"
import {useBootstrapApp} from "./hooks/useBootstrapApp"
import {Navigation} from "./navigation/Navigation"
import {StoresProvider} from "./store/StoresProvider"

export function App(): ReactElement | null {
  const isLoadingComplete = useBootstrapApp()

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
    const sub = Linking.addEventListener("url", ({url}) => {
      console.debug("LINKING_URL", url)
    })
    void Linking.getInitialURL().then((url) => {
      console.debug("INITIAL_URL", url)
    }).catch((err: unknown) => {
      console.warn("Error getting initial URL", err)
    })

    return () => {
      sub.remove()
    }
  }, [])

  if (!isLoadingComplete) {
    return null
  }

  const key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined

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
