import {combineEpics} from "redux-observable";

import startWorkoutEpic from "./currentWorkout/epics";


const rootEpic = combineEpics(
  startWorkoutEpic
);

export default rootEpic;
