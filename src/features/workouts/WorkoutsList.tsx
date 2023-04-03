import {memo, ReactElement, useCallback} from "react"
import {FlatList, ListRenderItemInfo} from "react-native"

import {isEmpty} from "lodash"


import EmptyCard from "../../components/EmptyCard"
import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../i18"
import {useAppSelector} from "../../store"

import WorkoutsListCard from "./WorkoutsListCard"
import WorkoutsListHeader from "./WorkoutsListHeader"


function WorkoutsList(): ReactElement {
  const ids = useAppSelector(state => state.workouts.ids)

  const renderItem = useCallback((data: ListRenderItemInfo<string>) => {
    return (
      <WorkoutsListCard id={data.item} />
    )
  }, [])

  return (
    <FlatList
      inverted
      contentContainerStyle={flatList.contentContainer}
      data={ids}
      keyboardShouldPersistTaps="always"
      ListFooterComponent={isEmpty(ids) ? <EmptyCard text={__t("workouts.noLogs")} /> : null}
      ListHeaderComponent={WorkoutsListHeader}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={flatList.root} />
  )
}

export default memo(WorkoutsList)
