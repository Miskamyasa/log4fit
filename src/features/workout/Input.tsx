import {memo, ReactElement, useCallback, useMemo} from "react";
import {TextInput, Keyboard} from "react-native";

import {primaryColors, useThemeColor} from "../../colors";
import useFocus from "../../hooks/useFocus";
import {inputStyles} from "./styles";


type _Props = {
  readonly value: string,
  readonly onChange: (text: string) => void,
  readonly maxLength?: number,
};

function Input({value, onChange, maxLength}: _Props): ReactElement {
  const [inFocus, onFocus, onBlur] = useFocus();

  const textColor = useThemeColor("text");
  const focusColor = useThemeColor("text", primaryColors.color);

  const styles = useMemo(() => {
    const defaultStyles = [inputStyles.input, {color: textColor}];
    return {
      default: defaultStyles,
      inFocus: [...defaultStyles, {borderColor: focusColor}],
    };
  }, [textColor, focusColor]);

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
      keyboardType={"number-pad"} />
  );
}

export default memo(Input);
