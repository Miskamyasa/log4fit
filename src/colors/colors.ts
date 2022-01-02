import {ColorNames, ColorSchemeName, ThemeProps} from "./types";


type Colors = Record<ColorSchemeName, Record<ColorNames, string>>;

export const mainBackgroundColor = "#000";
export const alwaysWhite = "#fdfeff";

const header = {
  headerBackground: mainBackgroundColor,
  headerTitle: "#fefefe",
};

export const primaryColors: Record<"color" | "background", ThemeProps> = {
  color: {
    light: "#a8dcd2",
    dark: "#c0d72e",
  },
  background: {
    light: "#1d3557",
    dark: "#1a5e7e",
  },
};

export const schemes: Colors = Object.freeze({
  light: {
    text: "#234",
    viewBackground: "#fdfeff",
    buttonText: "#678",
    buttonBackground: "#f1f2f3",
    screenBackground: "#f8f9fa",
    loaderBackground: "transparent",
    loaderColor: "#248",
    overlayBackground: "rgba(210, 220, 230, 0.93)",
    dividerColor: "rgba(178, 181, 185, 0.87)",
    alwaysWhite,
    ...header,
  },
  dark: {
    text: "#f2f3f4",
    viewBackground: mainBackgroundColor,
    buttonBackground: "#070809",
    buttonText: "#f7f8f9",
    screenBackground: mainBackgroundColor,
    loaderBackground: "transparent",
    loaderColor: "#f2f4f8",
    overlayBackground: "rgba(0, 0, 0, 0.89)",
    dividerColor: "rgba(29, 31, 41, 0.99)",
    alwaysWhite,
    ...header,
  },
});
