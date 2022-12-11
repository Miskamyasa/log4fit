import {memo, ReactElement} from "react";

import ApproachCard from "../../components/ApproachCard";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";


type _Props = {
  id: Approach["id"],
};

function ApproachesListItem({id}: _Props): ReactElement | null {
  const data = useAppSelector(state => state.approaches.store[id]);

  return (
    <ApproachCard
      {...data}
      flex
      counter={1} />
  );
}

export default memo(ApproachesListItem);
