/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Localization from "expo-localization";
/* https://github.com/fnando/i18n-js */
import i18n from "i18n-js";

import {TLangs, TLocale} from "./types";

const translations: Record<TLangs, TLocale> = {
  en: require("./locales/english"),
  ru: require("./locales/russian"),
};

i18n.translations = translations;

i18n.locale = Localization.locale;
i18n.fallbacks = true;

i18n.missingTranslation = (scope, options): string | null => {
  throw Error("missing translation");
};

const __t = i18n.t;

export {
  __t,
};
