import commonReducer from "./common/reducer";
import currentWorkoutReducer from "./currentWorkout/reducer";
import exercisesReducer from "./exercises/reducer";
import workoutsReducer from "./workouts/reducer";


const rootReducer = {
  common: commonReducer,
  workouts: workoutsReducer,
  exercises: exercisesReducer,
  currentWorkout: currentWorkoutReducer,
};

export default rootReducer;
