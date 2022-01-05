import {memo, ReactElement} from "react";
import {View} from "react-native";

import {get, isEmpty} from "lodash";

import Div from "../../components/Div";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";


type _Props = {
  readonly exerciseId: Exercise["id"],
};

function CurrentApproaches({exerciseId}: _Props): ReactElement | null {
  const exercises = useAppSelector(state => state.currentWorkout.workout?.exercises);

  const approaches = get(exercises, [exerciseId, "approaches"], {});

  console.log({approaches});

  if (isEmpty(approaches)) {
    return null;
  }

  return (
    <Div>
      <View />
    </Div>
  );
}

export default memo(CurrentApproaches);
