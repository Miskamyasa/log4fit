import {useCallback, useEffect, useState} from "react";
import {Keyboard, Platform} from "react-native";


const showEvent = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
const hideEvent = Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";

function useKeyboard(): [boolean, () => void] {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener(showEvent, () => setVisible(true));
    const hideListener = Keyboard.addListener(hideEvent, () => setVisible(false));
    return (): void => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const dismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return [visible, dismiss];
}

export default useKeyboard;
