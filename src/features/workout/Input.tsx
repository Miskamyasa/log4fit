import {memo, ReactElement, useMemo} from "react";
import {KeyboardTypeOptions, TextInput, TextStyle} from "react-native";

import {primaryColors, useThemeColor} from "../../colors";
import useBoolean from "../../hooks/useBoolean";

import {inputStyles} from "./styles";


type _Props = {
  value: string,
  onChange: (text: string) => void,
  maxLength?: number,
  width?: number,
  keyboardType?: KeyboardTypeOptions,
  style?: TextStyle,
};

function Input(props: _Props): ReactElement {
  const {
    value,
    onChange,
    maxLength = 3,
    width = (maxLength * 28),
    keyboardType = "numeric",
    style,
  } = props;

  const [inFocus, onFocus, onBlur] = useBoolean();

  const textColor = useThemeColor("text");
  const focusColor = useThemeColor("text", primaryColors.color);

  const styles = useMemo(() => {
    const defaultStyles = [inputStyles.input, {color: textColor, width}, style];
    return {
      default: defaultStyles,
      inFocus: [...defaultStyles, {borderColor: focusColor}],
    };
  }, [textColor, focusColor, width, style]);

  return (
    <TextInput
      maxLength={maxLength}
      autoCorrect={false}
      underlineColorAndroid={"transparent"}
      style={inFocus ? styles.inFocus : styles.default}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChange}
      keyboardType={keyboardType} />
  );
}

export default memo(Input);
