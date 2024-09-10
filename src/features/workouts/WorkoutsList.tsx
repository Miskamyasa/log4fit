import {memo, ReactElement, useCallback} from "react"
import {View} from "react-native"

import {FlashList} from "@shopify/flash-list"
import {isEmpty} from "lodash"


import EmptyCard from "../../components/EmptyCard"
import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../helpers/i18n"
import {useAppSelector} from "../../store"

import WorkoutsListCard from "./WorkoutsListCard"
import WorkoutsListHeader from "./WorkoutsListHeader"


function WorkoutsList(): ReactElement {
    const ids = useAppSelector(state => state.workouts.ids)

    const renderItem = useCallback(({item}: {item: string}) => {
        return (
            <WorkoutsListCard id={item} />
        )
    }, [])

    return (
        <View style={flatList.root}>
            <FlashList
                inverted
                contentContainerStyle={flatList.contentContainer}
                data={ids}
                estimatedItemSize={80}
                keyboardShouldPersistTaps="always"
                ListFooterComponent={isEmpty(ids) ? <EmptyCard text={__t("workouts.noLogs")} /> : null}
                ListHeaderComponent={WorkoutsListHeader}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false} />
        </View>
    )
}

export default memo(WorkoutsList)
