import approachesReducer from "./approaches/reducer"
import commonReducer from "./common/reducer"
import offeringReducer from "./offering/reducer"
import skillsReducer from "./skills/reducer"
import workoutsReducer from "./workouts/reducer"


const rootReducer = {
  common: commonReducer,
  workouts: workoutsReducer,
  skills: skillsReducer,
  approaches: approachesReducer,
  offering: offeringReducer,
}

export default rootReducer
