import {ColorSchemeName} from "../hooks/useColorScheme";

export type ColorNames =
  | "text"
  | "background"
  | "buttonBackground"
;

type Colors = Record<ColorSchemeName, Record<ColorNames, string>>;

export const colors: Colors = Object.freeze({
  light: {
    text: "#333",
    background: "#fefefe",
    buttonBackground: "#f7f8f9",
  },
  dark: {
    text: "#fefefe",
    background: "#000",
    buttonBackground: "#070809",
  },
});
