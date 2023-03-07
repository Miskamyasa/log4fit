import * as SentryExpo from "sentry-expo"

import {appVersion} from "../constants/common"


const {Native: Sentry} = SentryExpo


const sentryConfig: SentryExpo.SentryExpoNativeOptions = {
  dsn: !__DEV__ ? "https://96d0fbde6d7f4a6e914a2b99effcb740@o409311.ingest.sentry.io/4504582925254656" : "",
  tracesSampleRate: 0.1,
  release: appVersion,
  environment: String(process.env.NODE_ENV),
  enableInExpoDevelopment: false,
  debug: false,
}

// https://sentry.io/organizations/miskamyasa/issues/
Sentry.init(sentryConfig)

export default Sentry
