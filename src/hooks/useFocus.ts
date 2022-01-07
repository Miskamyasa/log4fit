import {useCallback, useState} from "react";


function useFocus(initialState = false): [boolean, () => void, () => void] {
  const [inFocus, setInFocus] = useState(initialState);

  const onFocus = useCallback(() => setInFocus(true), []);
  const onBlur = useCallback(() => setInFocus(false), []);

  return [inFocus, onFocus, onBlur];
}

export default useFocus;
