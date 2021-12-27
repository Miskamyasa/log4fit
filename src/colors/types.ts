import {ColorSchemeName as SchemeName} from "react-native";


export type ColorNames =
  | "text"
  | "viewBackground"
  | "buttonBackground"
  | "buttonText"
  | "screenBackground"
  | "headerTitle"
  | "headerBackground"
  | "loaderColor"
  | "loaderBackground"
  | "gotoWorkoutText"
  | "gotoWorkoutBackground"
  | "overlayBackground"
;

export type ColorSchemeName = NonNullable<SchemeName>;

export type ThemeProps = {
  light?: string,
  dark?: string,
};
