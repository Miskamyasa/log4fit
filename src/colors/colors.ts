import {ColorNames, ColorSchemeName, ThemeProps} from "./types"


type Colors = Record<ColorSchemeName, Record<ColorNames, string>>

export const mainBackgroundColor = "#000"
export const alwaysWhite = "#f7f7fa"

const header = {
  headerBackground: mainBackgroundColor,
  headerTitle: "#fefefe",
}

export const primaryColors: Record<"color" | "background", ThemeProps> = {
  color: {
    light: "#a8dcd2",
    dark: "#c0d72e",
  },
  background: {
    light: "#1d3557",
    dark: "#1a5e7e",
  },
}

export const secondaryColors: Record<"color" | "background", ThemeProps> = {
  color: {
    light: "#245",
    dark: "#f1f4f9",
  },
  background: {
    light: "rgba(210, 220, 230, 0.82)",
    dark: "rgba(29, 33, 37, 0.7)",
  },
}

export const schemes: Colors = Object.freeze({
  light: {
    text: "#234",
    viewBackground: "#fdfdfe",
    dimmedBackground: "rgba(238,241,243,0.6)",
    buttonText: alwaysWhite,
    buttonBackground: primaryColors.background.light,
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
    dimmedBackground: "rgba(47,46,46,0.86)",
    buttonBackground: primaryColors.background.dark,
    buttonText: alwaysWhite,
    screenBackground: mainBackgroundColor,
    loaderBackground: "transparent",
    loaderColor: "#f2f4f8",
    overlayBackground: "rgba(15, 16, 18, 0.79)",
    dividerColor: "rgba(29, 31, 41, 0.99)",
    alwaysWhite,
    ...header,
  },
})
