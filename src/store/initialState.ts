import {resetCommonState} from "./common/reducer";
import {resetExercisesState} from "./exercises/reducer";
import {resetWorkoutsState} from "./workouts/reducer";


const initialState = {
  common: resetCommonState(),
  workouts: resetWorkoutsState(),
  exercises: resetExercisesState(),
};

export default initialState;
