import {memo} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import Loader from "../../components/Loader"
import {useAppSelector} from "../../store"

const container: ViewStyle = {
    marginBottom: 20,
}

const staticStyles = StyleSheet.create({container})

function SkillsListLoader() {
    const loading = useAppSelector(state => state.skills.loading)

    return (
        <View style={staticStyles.container}>
            {loading
                ? (
                    <Loader />
                )
                : null}
        </View>
    )
}

export default memo(SkillsListLoader)
