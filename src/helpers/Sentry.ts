import * as SentryExpo from "sentry-expo"

import {appVersion} from "../constants/common"


const Sentry = SentryExpo.Native

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

const sentryConfig: SentryExpo.SentryExpoNativeOptions = {
  dsn: "https://96d0fbde6d7f4a6e914a2b99effcb740@o409311.ingest.sentry.io/4504582925254656",
  integrations: function(integrations) {
    // integrations will be all default integrations
    integrations.push(
      new Sentry.ReactNativeTracing({routingInstrumentation})
    )

    return integrations.filter(function(integration) {
      return integration.name !== "Breadcrumbs"
    })
  },
  tracesSampleRate: 1,
  release: appVersion,
  environment: String(process.env.NODE_ENV),
}

if (process.env.NODE_ENV === "development") {
  sentryConfig.enableInExpoDevelopment = false
  sentryConfig.debug = true
}

SentryExpo.init(sentryConfig)

export {routingInstrumentation}

export default Sentry
