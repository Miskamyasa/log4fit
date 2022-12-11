import {memo, ReactElement, useMemo} from "react";
import {TextInput} from "react-native";

import {primaryColors, useThemeColor} from "../../colors";
import useFocus from "../../hooks/useFocus";

import {inputStyles} from "./styles";


type _Props = {
  value: string,
  onChange: (text: string) => void,
  maxLength?: number,
  width?: number,
};

function Input({value, onChange, maxLength = 3, width = (maxLength * 28)}: _Props): ReactElement {
  const [inFocus, onFocus, onBlur] = useFocus();

  const textColor = useThemeColor("text");
  const focusColor = useThemeColor("text", primaryColors.color);

  const styles = useMemo(() => {
    const defaultStyles = [inputStyles.input, {color: textColor, width}];
    return {
      default: [defaultStyles],
      inFocus: [...defaultStyles, {borderColor: focusColor}],
    };
  }, [textColor, focusColor, width]);

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
      keyboardType={"numeric"} />
  );
}

export default memo(Input);
