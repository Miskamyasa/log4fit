import {memo, type ReactElement, useMemo} from "react"
import {View, type ViewStyle} from "react-native"

import {useThemeColor} from "../../colors/useThemeColor"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"

const CELL_GAP = 6
const DAY_INDEXES = [0, 1, 2, 3, 4, 5, 6]

type WeeklyOverviewProps = {
  data: number[],
  dayLabels: string[],
}

const staticStyles = createStaticStyles({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayColumn: {
    alignItems: "center",
  },
  dayLabel: {
    marginTop: 4,
  },
})

export const WeeklyOverview = memo(function WeeklyOverview(props: WeeklyOverviewProps): ReactElement {
  const buttonBackground = useThemeColor("buttonBackground")
  const dimmedBackground = useThemeColor("dimmedBackground")

  const globalMax = Math.max(...props.data, 1)
  const cellSize = Math.floor((layout.width - layout.gap * 2 - CELL_GAP * 6) / 7)

  const dayColumnStyle = useMemo((): ViewStyle => ({
    width: cellSize,
  }), [cellSize])

  const cellStyle = useMemo((): ViewStyle => ({
    width: cellSize,
    height: cellSize,
    borderRadius: cellSize * 0.25,
    alignItems: "center",
    justifyContent: "center",
  }), [cellSize])

  return (
    <View style={staticStyles.container}>
      {DAY_INDEXES.map((index): ReactElement => {
        const value = props.data[index] ?? 0
        const dayLabel = props.dayLabels[index] ?? ""
        const backgroundColor = value > 0 ? buttonBackground : dimmedBackground
        const opacity = value > 0 ? Math.max(0.2, value / globalMax) : 1

        return (
          <View
            key={`${index}-${dayLabel}`}
            style={[staticStyles.dayColumn, dayColumnStyle]}>
            <View style={[cellStyle, {backgroundColor, opacity}]}>
              <Span
                center
                colorName={value > 0 ? "alwaysWhite" : undefined}
                size={14}
                weight="600">
                {value}
              </Span>
            </View>
            <Span
              center
              size={10}
              style={staticStyles.dayLabel}>
              {dayLabel}
            </Span>
          </View>
        )
      })}
    </View>
  )
})
