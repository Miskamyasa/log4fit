import * as SentryExpo from "sentry-expo"

import {appVersion} from "../constants/common"


const {Native: Sentry} = SentryExpo

const ignore = new Set([
  "HttpContext",
  "Breadcrumbs",
])

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

const sentryConfig: SentryExpo.SentryExpoNativeOptions = {
  dsn: !__DEV__ ? "https://96d0fbde6d7f4a6e914a2b99effcb740@o409311.ingest.sentry.io/4504582925254656" : "",
  integrations: (integrations) => {
    integrations.push(
      new Sentry.ReactNativeTracing({routingInstrumentation}),
    )
    return integrations.filter(integration => !ignore.has(integration.name))
  },
  tracesSampleRate: 0.01,
  release: appVersion,
  environment: String(process.env.NODE_ENV),
  enableInExpoDevelopment: false,
  debug: false,
}

// https://sentry.io/organizations/miskamyasa/issues/
Sentry.init(sentryConfig)

export {
  routingInstrumentation,
}

export default Sentry
