import {useCallback, useState} from "react";


type ReturnObject = [boolean, () => void, () => void];

function useBoolean(
  initialState = false,
  callbackOnTrue?: () => void,
  callbackOnFalse?: () => void
): ReturnObject {
  const [isTrue, setBoolean] = useState(initialState);

  const setTrue = useCallback(() => {
    setBoolean(true);
    if (callbackOnTrue) {
      callbackOnTrue();
    }
  }, [callbackOnTrue]);

  const setFalse = useCallback(() => {
    setBoolean(false);
    if (callbackOnFalse) {
      callbackOnFalse();
    }
  }, [callbackOnFalse]);

  return [isTrue, setTrue, setFalse];
}

export default useBoolean;
