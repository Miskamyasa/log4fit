import * as Localization from "expo-localization";
import i18n from "i18n-js"; // https://github.com/fnando/i18n-js
import {memoize, get} from "lodash";

import english from "../../locales/english.json";
import russian from "../../locales/russian.json";


type Locales = "en" | "ru";
type Translation = typeof english;
type Translations = Record<Locales, Translation>;

const translations: Translations = {
  en: english,
  ru: russian,
};

i18n.translations = translations;

i18n.locale = Localization.locale;
i18n.fallbacks = true;

function onError(scope: string, result: unknown, locale = i18n.locale): string {
  if (__DEV__) {
    const err = JSON.stringify({locale, scope, result}, null, 2);
    throw Error(`Translations error: \n ${err}`);
  }
  return "";
}

function checkTranslations(scope: string): void {
  setTimeout(() => {
    Object.entries<Translation>(translations).forEach(([locale, translation]) => {
      const tr: unknown = get(translation, scope);
      if (!tr || typeof tr === "object") {
        onError(scope, tr || "Missing translation", locale);
      }
    });
  }, 1);
}

const __t = memoize((scope: string) => {
  if (__DEV__) {
    // in development will check for other locales
    checkTranslations(scope);
  }
  const res = i18n.t(scope);
  if (typeof res === "object") {
    return onError(scope, res);
  }
  return res;
});

export {__t};
