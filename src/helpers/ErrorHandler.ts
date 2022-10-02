import {Alert} from "react-native";

import * as Updates from "expo-updates";

import {__t} from "../i18";


export default function ErrorHandler(err: unknown): void {
  // eslint-disable-next-line no-console
  console.warn(err);
  return Alert.alert("", "Error", [
    {text: __t("reload"), onPress: (): void => void Updates.reloadAsync()},
  ]);
}
