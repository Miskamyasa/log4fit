import * as Localization from "expo-localization"
import i18n from "i18n-js" // https://github.com/fnando/i18n-js
import {memoize, get, mapValues} from "lodash"

import english from "../../locales/english.json"
import russian from "../../locales/russian.json"

export const locales = ["en", "ru"] as const

export type Locales = typeof locales[number]
type Translation = typeof english
type Translations = Record<Locales, Translation>

type Scope<T extends Record<string, unknown>> = keyof {
    [K in keyof T as T[K] extends string
        ? K
        : T[K] extends Record<string, unknown>
            ? `${K & string}.${Scope<T[K]> & string}` : never]: unknown
}

const translations: Translations = {
    en: english,
    ru: russian,
}

// eslint-disable-next-line import-x/no-named-as-default-member
i18n.translations = translations

const [{languageCode}] = Localization.getLocales()

// eslint-disable-next-line import-x/no-named-as-default-member
i18n.locale = languageCode ?? "en"
// eslint-disable-next-line import-x/no-named-as-default-member
i18n.fallbacks = true

function onError(scope: Scope<Translation>, result: unknown, locale = i18n.locale): string {
    if (__DEV__) {
        const err = JSON.stringify({locale, scope: scope as string, result}, null, 2)
        throw Error(`Translations error: \n ${err}`)
    }
    return ""
}

function checkTranslations(scope: Scope<Translation>): void {
    setTimeout(() => {
        const entries: [string, Translation][] = Object.entries<Translation>(translations)
        entries.forEach(([locale, translation]) => {
            const tr: unknown = get(translation, scope)
            if (!tr || typeof tr === "object") {
                onError(scope, tr ?? "Missing translation", locale)
            }
        })
    }, 1)
}

const __t = memoize((scope: Scope<Translation>) => {
    if (__DEV__) {
        // in development will check for other locales
        checkTranslations(scope)
    }
    // eslint-disable-next-line import-x/no-named-as-default-member
    const res = i18n.t(scope)
    if (typeof res === "object") {
        return onError(scope, res)
    }
    return res
})

const __date = (date: string | number | Date): string => i18n.localize("date.formats.date", date)

const __day = (date: string | number | Date): string => i18n.localize("date.formats.day", date)

const __locale = memoize((): Locales => (String(i18n.currentLocale()).slice(0, 2) as Locales))

const __create = (text: string): Record<Locales, string> => mapValues(translations, () => text)

export {
    __t,
    __date,
    __day,
    __locale,
    __create,
}
