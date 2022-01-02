import {ReactElement, useState} from "react";
import {Switch} from "react-native";

import {memoize} from "lodash";

import {primaryColors, useThemeColor} from "../colors";


type Props = {
  readonly onToggle?: (state: boolean) => void,
  readonly defaultValue?: boolean,
};

const inactiveColor = "rgba(155,166,171,0.38)";
const trackColor = memoize((activeColor: string) => ({false: inactiveColor, true: activeColor}));
const thumbColor = memoize((state, activeColor: string) => state ? activeColor : "rgb(122,122,122)");

function Toggle({onToggle, defaultValue = false}: Props): ReactElement {
  const [state, setState] = useState(defaultValue);
  const trackThemeColor = useThemeColor("buttonBackground", primaryColors.background);
  const thumbThemeColor = useThemeColor("buttonText", primaryColors.color);

  const handleToggle = (): void => {
    setState(!state);
    if (onToggle) {
      onToggle(!state);
    }
  };

  return (
    <Switch
      trackColor={trackColor(trackThemeColor)}
      thumbColor={thumbColor(state, thumbThemeColor)}
      ios_backgroundColor={inactiveColor}
      onValueChange={handleToggle}
      value={state} />
  );
}

export default Toggle;
