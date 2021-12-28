import {ColorNames, ColorSchemeName} from "./types";


type Colors = Record<ColorSchemeName, Record<ColorNames, string>>;

export const mainBackgroundColor = "#000";

const header = {
  headerBackground: mainBackgroundColor,
  headerTitle: "#fefefe",
};

export const schemes: Colors = Object.freeze({
  light: {
    text: "#333",
    viewBackground: "#fefefe",
    buttonBackground: "#f7f8f9",
    buttonText: "#678",
    screenBackground: "#fefefe",
    loaderBackground: "transparent",
    loaderColor: "#248",
    gotoWorkoutText: "#245",
    gotoWorkoutBackground: "rgba(210, 220, 230, 0.82)",
    overlayBackground: "rgba(210, 220, 230, 0.93)",
    ...header,
  },
  dark: {
    text: "#fefefe",
    viewBackground: mainBackgroundColor,
    buttonBackground: "#070809",
    buttonText: "#f7f8f9",
    screenBackground: mainBackgroundColor,
    loaderBackground: "transparent",
    loaderColor: "#f2f4f8",
    gotoWorkoutText: "#f1f4f9",
    gotoWorkoutBackground: "rgba(0, 0, 0, 0.7)",
    overlayBackground: "rgba(0, 0, 0, 0.89)",
    ...header,
  },
});
