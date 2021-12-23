import {ColorSchemeName} from "../hooks/useColorScheme";


export type ColorNames =
  | "text"
  | "viewBackground"
  | "buttonBackground"
  | "buttonText"
  | "screenBackground"
;

type Colors = Record<ColorSchemeName, Record<ColorNames, string>>;

export const colors: Colors = Object.freeze({
  light: {
    text: "#333",
    viewBackground: "#fefefe",
    buttonBackground: "#f7f8f9",
    buttonText: "#678",
    screenBackground: "#fefefe",
  },
  dark: {
    text: "#fefefe",
    viewBackground: "#000",
    buttonBackground: "#070809",
    buttonText: "#f7f8f9",
    screenBackground: "#fefefe",
  },
});
