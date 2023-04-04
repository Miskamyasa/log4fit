import {renderHook} from "@testing-library/react-hooks"
import _ from "lodash"

import {schemes} from "../colors"
import {useColorScheme} from "../useColorScheme"
import {useThemeColor} from "../useThemeColor"


describe("hooks: useThemeColor", () => {
    const {result: colorScheme} = renderHook(() => useColorScheme())
    const keys = _.keys(colorScheme.current)

    it("works", () => {
        keys.forEach((k) => {
            const {result: themeColor} = renderHook(() => useThemeColor(k))
            const currentColors = schemes[colorScheme.current]
            expect(themeColor.current).toStrictEqual(currentColors[k])
        })
    })

    it("works with props", () => {
        const color = "#999"
        const props = {light: color, dark: color}
        keys.forEach(k => {
            const {result: themeColor} = renderHook(() => useThemeColor(k, props))
            expect(themeColor.current).toStrictEqual(color)
        })
    })
})
