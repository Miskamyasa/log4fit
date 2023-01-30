import {memo, ReactElement, useCallback} from "react"
import {FlatList, ListRenderItemInfo} from "react-native"

import {isEmpty} from "lodash"


import EmptyCard from "../../components/EmptyCard"
import {flatList} from "../../constants/defaultStyles"
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
      style={flatList.root}
      contentContainerStyle={flatList.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      ListFooterComponent={isEmpty(ids) ? <EmptyCard /> : null}
      ListHeaderComponent={WorkoutsListHeader}
      inverted
      data={ids}
      renderItem={renderItem} />
  )
}

export default memo(WorkoutsList)
