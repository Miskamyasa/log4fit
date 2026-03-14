/* eslint-disable "no-console" --- IGNORE */
import {useEffect} from "react"

import * as Linking from "expo-linking"

export function useAppLinking(): void {

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
    const sub = Linking.addEventListener("url", ({url}) => {
      console.log("LINKING_URL", url)
    })
    void Linking.getInitialURL().then((url) => {
      console.log("INITIAL_URL", url)
    }).catch((err: unknown) => {
      console.warn("Error getting initial URL", err)
    })

    return () => {
      sub.remove()
    }
  }, [])

}
