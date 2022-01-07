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

export const secondaryColors: Record<"color" | "background", ThemeProps> = {
  color: {
    light: "#245",
    dark: "#f1f4f9",
  },
  background: {
    light: "rgba(210, 220, 230, 0.82)",
    dark: "rgba(29, 33, 37, 0.7)",
  },
};

export const schemes: Colors = Object.freeze({
  light: {
    text: "#234",
    viewBackground: "#fdfdfe",
    buttonText: "#678",
    buttonBackground: "#f1f2f3",
    screenBackground: "#f8f8f9",
    loaderBackground: "transparent",
    loaderColor: "#173a4f",
    overlayBackground: "rgba(210, 220, 225, 0.88)",
    dividerColor: "rgba(238,239,239,0.55)",
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
    overlayBackground: "rgba(15, 16, 18, 0.79)",
    dividerColor: "rgba(29, 31, 41, 0.99)",
    alwaysWhite,
    ...header,
  },
});
