import {memo, ReactElement} from "react";
import {View} from "react-native";

import Div from "../../components/Div";
import {Workout} from "../../store/workouts/types";


type _Props = {
  readonly workoutId: Workout["id"],
};

function CurrentApproaches(props: _Props): ReactElement {
  console.log({props});
  return (
    <Div>
      <View />
    </Div>
  );
}

export default memo(CurrentApproaches);
