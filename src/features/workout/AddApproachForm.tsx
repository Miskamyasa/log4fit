import {ReactElement, useCallback} from "react";
import {StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";


import {MaterialIcons} from "@expo/vector-icons";

import {primaryColors, ThemeProps, useThemeColor} from "../../colors";
import Div from "../../components/Div";
import Divider from "../../components/Divider";
import Span from "../../components/Span";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Skill} from "../../store/skills/types";

import ChangeValue from "./ChangeValue";
import Controls from "./Controls";
import FormWrapper from "./FormWrapper";
import Input from "./Input";
import {buttonsStyles} from "./styles";


type _Props = {
  dismiss: () => void,
  submit: () => void,
  lastWeight: number,
  repeats: string,
  handleRepeatsChange: (text: string) => void,
  weight: string,
  handleWeightChange: (text: string) => void,
  skillId: Skill["id"],
};

const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: layout.gap * 1.6,
};

const lastWeight: TextStyle = {
  fontSize: 16,
};

const label: TextStyle = {
  fontSize: 15,
  marginBottom: 3,
};

const inputItem: ViewStyle = {
  flexDirection: "row",
};

const staticStyles = StyleSheet.create({
  row,
  lastWeight,
  label,
  inputItem,
});

export const colors: Record<"divider", ThemeProps> = {
  divider: {
    light: "#e3e4e7",
    dark: "rgba(58,62,70,0.77)",
  },
};

function AddApproachForm(props: _Props): ReactElement {
  const {
    dismiss,
    submit,
    lastWeight = 0,
    repeats,
    handleRepeatsChange,
    weight,
    handleWeightChange,
    skillId,
  } = props;

  const textColor = useThemeColor("text");
  const dividerColor = useThemeColor("text", colors.divider);

  const increaseRepeats = useCallback(() => {
    handleRepeatsChange(String(Number(repeats) + 1));
  }, [repeats, handleRepeatsChange]);

  const decreaseRepeats = useCallback(() => {
    handleRepeatsChange(String(Number(repeats) - 1));
  }, [repeats, handleRepeatsChange]);

  const value = useAppSelector(state => state.common.weightSteps[skillId]) || 1;

  const increaseWeight = useCallback(() => {
    handleWeightChange(String(Number(weight) + Number(value)));
  }, [handleWeightChange, weight, value]);

  const decreaseWeight = useCallback(() => {
    handleWeightChange(String(Number(weight) - Number(value)));
  }, [handleWeightChange, weight, value]);

  return (
    <FormWrapper>
      <View style={staticStyles.row}>
        <Span style={staticStyles.lastWeight}>{__t("workouts.lastWeight")} - {lastWeight}</Span>
        <TouchableOpacity onPress={dismiss}>
          <MaterialIcons
            color={textColor}
            name={"close"}
            size={20} />
        </TouchableOpacity>
      </View>

      <View style={staticStyles.row}>
        <Divider color={dividerColor} />
      </View>

      <View style={staticStyles.row}>

        <View>
          <Span style={staticStyles.label}>{__t("workouts.repeatsLabel")}</Span>
          <View style={staticStyles.inputItem}>
            <Input
              maxLength={2}
              width={64}
              value={repeats}
              onChange={handleRepeatsChange} />
            <ChangeValue
              increase={increaseRepeats}
              decrease={decreaseRepeats} />
          </View>
        </View>

        <View>
          <Span style={staticStyles.label}>{__t("workouts.weightLabel")}</Span>
          <View style={staticStyles.inputItem}>
            <Input
              width={104}
              maxLength={5}
              value={weight}
              onChange={handleWeightChange} />
            <ChangeValue
              increase={increaseWeight}
              decrease={decreaseWeight} />
          </View>
        </View>

      </View>

      <View style={staticStyles.row}>
        <Span>&nbsp;</Span>
        <Controls skillId={skillId} />
      </View>

      <Div
        onPress={submit}
        style={buttonsStyles.submitButton}
        theme={primaryColors.background}>
        <Span colorName={"alwaysWhite"}>{__t("workouts.addApproach")}</Span>
      </Div>

    </FormWrapper>
  );
}

export default AddApproachForm;
