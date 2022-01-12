import {memo, ReactElement} from "react";

import ApproachCard from "../../components/ApproachCard";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";


type _Props = {
  readonly id: Approach["id"],
};

function ApproachesListItem({id}: _Props): ReactElement | null {
  const workoutId = useAppSelector(state => state.currentWorkout.workout?.id);
  const data = useAppSelector(state => state.approaches.store[id]);

  const showWarmups = useAppSelector(state => state.common.showWarmups);

  if (data.workoutId === workoutId || (!showWarmups && data.warmup)) {
    return null;
  }

  return (
    <ApproachCard
      {...data}
      flex
      counter={1} />
  );
}

export default memo(ApproachesListItem);
