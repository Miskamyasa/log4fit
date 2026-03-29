import {Platform} from "react-native"

import * as Application from "expo-application"
import * as Device from "expo-device"
import * as Localization from "expo-localization"

import {appVersion} from "../../constants/common"

import type {AnalyticsApp, AnalyticsDevice} from "./types"

const DEFAULT_LOCALE = "en-US"
const DEFAULT_TIMEZONE = "UTC"
const DEFAULT_OS_VERSION = "unknown"

const collectVersion = (): string => appVersion

const collectBuildNumber = (): string | undefined => {
  const buildNumber = Application.nativeBuildVersion?.trim() ?? ""

  if (buildNumber.length === 0) {
    return undefined
  }

  return buildNumber
}

const collectEnvironment = (): string => (__DEV__ ? "development" : "production")

const collectPlatform = (): AnalyticsDevice["platform"] => {
  return Platform.OS as AnalyticsDevice["platform"]
}

const collectOsVersion = (): string => {
  const deviceOsVersion = Device.osVersion?.trim() ?? ""

  if (deviceOsVersion.length > 0) {
    return deviceOsVersion
  }

  if (typeof Platform.Version === "string") {
    return Platform.Version
  }

  if (typeof Platform.Version === "number") {
    return String(Platform.Version)
  }

  return DEFAULT_OS_VERSION
}

const collectLocale = (): string => {
  const [locale] = Localization.getLocales()
  const localeTag = locale.languageTag.trim()

  if (localeTag.length > 0) {
    return localeTag
  }

  const languageCode = (locale.languageCode ?? "").trim()
  const regionCode = (locale.regionCode ?? "").trim()

  if (languageCode.length > 0 && regionCode.length > 0) {
    return `${languageCode}-${regionCode}`
  }

  if (languageCode.length > 0) {
    return languageCode
  }

  return DEFAULT_LOCALE
}

const collectTimezone = (): string => {
  const [calendar] = Localization.getCalendars()
  const timezone = (calendar.timeZone ?? "").trim()

  if (timezone.length > 0) {
    return timezone
  }

  return DEFAULT_TIMEZONE
}

const collectAppInfo = (): AnalyticsApp => ({
  name: "log4fit",
  version: collectVersion(),
  buildNumber: collectBuildNumber(),
  environment: collectEnvironment(),
})

const collectDeviceInfo = (): AnalyticsDevice => ({
  platform: collectPlatform(),
  osVersion: collectOsVersion(),
  locale: collectLocale(),
  timezone: collectTimezone(),
})

export {
  collectAppInfo,
  collectDeviceInfo,
}
