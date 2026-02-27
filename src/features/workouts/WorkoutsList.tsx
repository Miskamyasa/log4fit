import {type ReactElement} from "react"

import {FlashList} from "@shopify/flash-list"
import {observer} from "mobx-react"

import {EmptyCard} from "../../components/EmptyCard"
import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../helpers/i18n"
import {useStores} from "../../store/useStores"

import {WorkoutsListCard} from "./WorkoutsListCard"
import {WorkoutsListHeader} from "./WorkoutsListHeader"

function renderItem({item: id}: {item: string}): ReactElement {
  return (
    <WorkoutsListCard id={id} />
  )
}

export const WorkoutsList = observer(function WorkoutsList() {
  const {workoutsStore} = useStores()

  return (
    <FlashList
      inverted
      contentContainerStyle={flatList.flashList}
      data={workoutsStore.ids}
      estimatedItemSize={80}
      keyboardShouldPersistTaps="always"
      ListFooterComponent={!workoutsStore.ids.length ? <EmptyCard text={__t("workouts.noLogs")} /> : null}
      ListHeaderComponent={WorkoutsListHeader}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false} />
  )
})
