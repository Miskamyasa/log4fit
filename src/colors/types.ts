import {type ColorSchemeName as SchemeName} from "react-native"

export type ColorNames
    = | "text"
    | "viewBackground"
    | "dimmedBackground"
    | "buttonBackground"
    | "buttonText"
    | "screenBackground"
    | "headerTitle"
    | "headerBackground"
    | "loaderColor"
    | "loaderBackground"
    | "overlayBackground"
    | "dividerColor"
    | "alwaysWhite"

export type ColorSchemeName = NonNullable<SchemeName>

export interface ThemeProps {
    light: string
    dark: string
}
