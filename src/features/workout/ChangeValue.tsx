import {memo} from "react"
import {TouchableOpacity, View, type ViewStyle} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"

import {useThemeColor} from "../../colors/useThemeColor"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"

import {borders, controlHeight, inputHeight} from "./styles"

const staticStyles: {
    button: ViewStyle,
    container: ViewStyle,
} = createStaticStyles({
    button: {
        width: controlHeight + 10,
        height: controlHeight,
        alignItems: "center",
        justifyContent: "center",
        ...borders,
    },
    container: {
        height: inputHeight,
        marginLeft: layout.gap / 2,
        justifyContent: "space-between",
    },
})

export const ChangeValue = memo(function ChangeValue(props: {
    increase: () => void,
    decrease: () => void,
}) {
    const {increase, decrease} = props
    const color = useThemeColor("text")
    return (
        <View style={staticStyles.container}>
            <TouchableOpacity
                style={staticStyles.button}
                onPress={increase}>
                <MaterialIcons
                    color={color}
                    name="add"
                    size={20} />
            </TouchableOpacity>
            <TouchableOpacity
                style={staticStyles.button}
                onPress={decrease}>
                <MaterialIcons
                    color={color}
                    name="remove"
                    size={20} />
            </TouchableOpacity>
        </View>
    )
})
