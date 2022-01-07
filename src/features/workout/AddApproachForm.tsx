import {ReactElement, useCallback, useMemo, useState} from "react";
import {
  Image,
  ImageStyle,
  Keyboard,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";


import Div from "../../components/Div";
import Divider from "../../components/Divider";
import Span from "../../components/Span";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import Input from "./Input";
import {borders} from "./styles";


type _Props = {
  readonly lastWeight: number,
  repeats: string,
  handleRepeatsChange: (text: string) => void,
  weight: string,
  handleWeightChange: (text: string) => void,
  warmup: boolean,
  setWarmup: (bool: boolean) => void,
};

const container: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  width: layout.width - (layout.gap),
  padding: layout.gap * 2,
};

const header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: layout.gap,
};

const warmupButton: ViewStyle = {
  width: 30,
  height: 30,
  justifyContent: "flex-end",
  alignItems: "center",
  ...borders,
  borderRadius: 15,
};

const warmupIcon: ImageStyle = {
  width: 24,
  height: 24,
};

const lastWeight: TextStyle = {
  flex: 0,
  fontSize: 16,
};

const inputsWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: layout.gap,
};

const label: TextStyle = {
  flex: 0,
  fontSize: 15,
  marginBottom: 3,
};

const staticStyles = StyleSheet.create({
  container,
  header,
  warmupButton,
  warmupButtonDisabled: {
    ...warmupButton,
    opacity: 0.4,
  },
  warmupIcon,
  lastWeight,
  inputsWrapper,
  label,
});

function AddApproachForm({
  lastWeight = 0, repeats, handleRepeatsChange, weight, handleWeightChange, warmup, setWarmup,
}: _Props): ReactElement {
  console.log({warmup})

  return (
    <Div style={staticStyles.container}>

      <View style={staticStyles.header}>
        <TouchableOpacity
          style={warmup ? staticStyles.warmupButton : staticStyles.warmupButtonDisabled}
          onPress={(): void => {
            console.log({warmup})
            setWarmup(!warmup);
          }}>
          <Image
            style={staticStyles.warmupIcon}
            source={require("../../../assets/images/warmup.png")} />
        </TouchableOpacity>
        <Span style={staticStyles.lastWeight}>{__t("workouts.lastWeight")} - {lastWeight}</Span>
      </View>

      <Divider />

      <View style={staticStyles.inputsWrapper}>

        <View>
          <Span style={staticStyles.label}>{__t("workouts.repeatsLabel")}</Span>
          <Input
            maxLength={2}
            value={repeats}
            onChange={handleRepeatsChange} />
        </View>

        <View>
          <Span colorName={"buttonText"}>OPTIONS</Span>
        </View>

        <View>
          <Span style={staticStyles.label}>{__t("workouts.weightLabel")}</Span>
          <Input
            maxLength={3}
            value={weight}
            onChange={handleWeightChange} />
        </View>

      </View>

    </Div>
  );
}

export default AddApproachForm;
