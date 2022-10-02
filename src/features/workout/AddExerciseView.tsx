import {memo, ReactElement} from "react";

import PageWrapper from "../../components/PageWrapper";
import ExercisesList from "../exercises/ExercisesList";


function AddExerciseView(): ReactElement {
  return (
    <PageWrapper>
      <ExercisesList />
    </PageWrapper>
  );
}

export default memo(AddExerciseView);
