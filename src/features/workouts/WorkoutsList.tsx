import {memo} from "react"

import {FlashList} from "@shopify/flash-list"
import {isEmpty} from "lodash"

import {EmptyCard} from "../../components/EmptyCard"
import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../helpers/i18n"
import {useAppSelector} from "../../store"

import {WorkoutsListCard} from "./WorkoutsListCard"
import {WorkoutsListHeader} from "./WorkoutsListHeader"

const renderItem = ({item}: {item: string}) => {
    return (
        <WorkoutsListCard id={item} />
    )
}

export const WorkoutsList = memo(function WorkoutsList() {
    const ids = useAppSelector(state => state.workouts.ids)
    return (
        <FlashList
            inverted
            contentContainerStyle={flatList.flashList}
            data={ids}
            estimatedItemSize={80}
            keyboardShouldPersistTaps="always"
            ListFooterComponent={isEmpty(ids) ? <EmptyCard text={__t("workouts.noLogs")} /> : null}
            ListHeaderComponent={WorkoutsListHeader}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false} />
    )
})
