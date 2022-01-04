import {memo, ReactElement, useCallback} from "react";

import Button from "../../components/Button";
import Div from "../../components/Div";
import layout from "../../layout/constants";
import {useAppDispatch} from "../../store";
import {toggleExerciseInWorkoutAction} from "../../store/currentWorkout/actions";


function AddExerciseView(): ReactElement {

  const dispatch = useAppDispatch();

  const handleToggle = useCallback((): void => {
    dispatch(toggleExerciseInWorkoutAction("4cb0CkusTE1n7WVne32Z"));
  }, [dispatch]);

  return (
    <Div
      style={{
        width: layout.width,
        borderWidth: 2,
        borderColor: "green",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Button onPress={handleToggle}>
        ADD EXERCISE
      </Button>
    </Div>
  );
}

export default memo(AddExerciseView);
