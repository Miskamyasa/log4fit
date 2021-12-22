import * as Localization from "expo-localization";
/* https://github.com/fnando/i18n-js */
import i18n from "i18n-js";
import {TLangs, TLocale} from "./types";
import english from "./locales/english";
import russian from "./locales/russian";

const translations: Record<TLangs, TLocale> = {
  en: english,
  ru: russian,
};

i18n.translations = translations;

i18n.locale = Localization.locale;
i18n.fallbacks = true;

// eslint-disable-next-line
i18n.missingTranslation = (scope, options): string | null => {
  throw Error("missing translation");
};

const __t = i18n.t;

export {
  __t,
};
