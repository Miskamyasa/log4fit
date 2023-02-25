import {StyleSheet, TextStyle, ViewStyle} from "react-native"


export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle }

export default function createStaticStyles<T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: T | NamedStyles<T>
): T {
  return StyleSheet.create(styles)
}
