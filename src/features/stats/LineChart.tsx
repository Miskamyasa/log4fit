import {memo, type ReactElement, useMemo} from "react"
import {View, type ViewStyle} from "react-native"

import {useThemeColor} from "../../colors/useThemeColor"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"

const DOT_SIZE = 6
const DOT_RADIUS = DOT_SIZE / 2
const SEGMENT_HEIGHT = 2
const CHART_WIDTH = layout.width - layout.gap * 3

type LineChartProps = {
  data: number[],
  height?: number,
  color?: string,
  label?: string,
}

type ChartPoint = {
  x: number,
  y: number,
  value: number,
}

type LineSegment = {
  key: string,
  style: ViewStyle,
}

const staticStyles = createStaticStyles({
  container: {
    width: CHART_WIDTH,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  latestValue: {
    marginLeft: "auto",
  },
  chartArea: {
    position: "relative",
  },
  dot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_RADIUS,
  },
  segment: {
    position: "absolute",
    height: SEGMENT_HEIGHT,
    borderRadius: SEGMENT_HEIGHT / 2,
  },
})

function normalizeValue(value: number, min: number, range: number, height: number): number {
  if (range === 0) {
    return height / 2
  }

  const scaled = ((value - min) / range) * height
  const y = height - scaled
  return Math.min(height - DOT_RADIUS, Math.max(DOT_RADIUS, y))
}

function buildSegment(from: ChartPoint, to: ChartPoint, color: string, index: number): LineSegment {
  const centerFromX = from.x + DOT_RADIUS
  const centerFromY = from.y + DOT_RADIUS
  const centerToX = to.x + DOT_RADIUS
  const centerToY = to.y + DOT_RADIUS

  const dx = centerToX - centerFromX
  const dy = centerToY - centerFromY
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx)

  return {
    key: `${index}-${from.value}-${to.value}`,
    style: {
      left: (centerFromX + centerToX) / 2 - length / 2,
      top: (centerFromY + centerToY) / 2 - SEGMENT_HEIGHT / 2,
      width: length,
      backgroundColor: color,
      transform: [{rotate: `${angle}rad`}],
    },
  }
}

export const LineChart = memo(function LineChart(props: LineChartProps): ReactElement | null {
  const {data, height = 80, color, label} = props

  const fallbackColor = useThemeColor("buttonBackground")
  const strokeColor = color ?? fallbackColor

  const latestValue = data[data.length - 1]

  const points = useMemo((): ChartPoint[] => {
    if (data.length === 0) {
      return []
    }

    if (data.length === 1) {
      return [{
        x: (CHART_WIDTH - DOT_SIZE) / 2,
        y: height / 2 - DOT_RADIUS,
        value: data[0],
      }]
    }

    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)
    const range = maxValue - minValue
    const drawableWidth = CHART_WIDTH - DOT_SIZE

    return data.map((value, index): ChartPoint => {
      const ratio = index / (data.length - 1)
      const centerX = DOT_RADIUS + drawableWidth * ratio
      const centerY = normalizeValue(value, minValue, range, height)

      return {
        x: centerX - DOT_RADIUS,
        y: centerY - DOT_RADIUS,
        value,
      }
    })
  }, [data, height])

  const segments = useMemo((): LineSegment[] => {
    if (points.length < 2) {
      return []
    }

    return points.slice(0, -1).map((point, index): LineSegment => {
      return buildSegment(point, points[index + 1], strokeColor, index)
    })
  }, [points, strokeColor])

  if (data.length === 0) {
    return null
  }

  return (
    <View style={staticStyles.container}>
      <View style={staticStyles.header}>
        {label ? (
          <Span
            size={10}
            weight="600">
            {label}
          </Span>
        ) : null}
        <Span
          size={12}
          style={staticStyles.latestValue}
          weight="600">
          {latestValue}
        </Span>
      </View>

      <View style={[staticStyles.chartArea, {height}]}>
        {segments.map((segment): ReactElement => (
          <View
            key={segment.key}
            style={[staticStyles.segment, segment.style]}/>
        ))}

        {points.map((point): ReactElement => (
          <View
            key={`${point.x}-${point.y}-${point.value}`}
            style={[
              staticStyles.dot,
              {
                left: point.x,
                top: point.y,
                backgroundColor: strokeColor,
              },
            ]}/>
        ))}
      </View>
    </View>
  )
})
