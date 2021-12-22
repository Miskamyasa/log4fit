import {ColorSchemeName} from "../hooks/useColorScheme";

export type ColorNames =
  | "text"
  | "background"
;

type Colors = Record<ColorSchemeName, Record<ColorNames, string>>;

export const colors: Colors = Object.freeze({
  light: {
    text: "#333",
    background: "#fefefe",
  },
  dark: {
    text: "#fefefe",
    background: "#000",
  },
});
