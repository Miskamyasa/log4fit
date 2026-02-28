import {memo, type ReactElement, useEffect, useRef} from "react"
import {ScrollView, View} from "react-native"

import {useThemeColor} from "../../colors/useThemeColor"
import {Span} from "../../components/Span"
import {createStaticStyles} from "../../helpers/createStaticStyles"

type PatternTimelineProps = {
  patterns: string[],
  label?: string,
}

const staticStyles = createStaticStyles({
  label: {
    marginBottom: 4,
  },
  contentContainer: {
    flexDirection: "row",
  },
  chip: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
})

export const PatternTimeline = memo(function PatternTimeline(props: PatternTimelineProps): ReactElement | null {
  const {patterns, label} = props
  const scrollViewRef = useRef<ScrollView | null>(null)
  const dimmedBackground = useThemeColor("dimmedBackground")
  const buttonBackground = useThemeColor("buttonBackground")

  useEffect((): void => {
    if (patterns.length === 0) {
      return
    }

    scrollViewRef.current?.scrollToEnd({animated: false})
  }, [patterns])

  if (patterns.length === 0) {
    return null
  }

  const patternOccurrences: Record<string, number> = {}

  return (
    <View>
      {label ? (
        <Span
          size={10}
          style={staticStyles.label}
          weight="600">
          {label}
        </Span>
      ) : null}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={staticStyles.contentContainer}
        showsHorizontalScrollIndicator={false}>
        {patterns.map((pattern, index): ReactElement => {
          const isLast = index === patterns.length - 1
          const currentPatternOccurrence = (patternOccurrences[pattern] ?? 0) + 1
          patternOccurrences[pattern] = currentPatternOccurrence

          return (
            <View
              key={`${pattern}-${currentPatternOccurrence}`}
              style={[
                staticStyles.chip,
                {
                  backgroundColor: isLast ? buttonBackground : dimmedBackground,
                  marginRight: isLast ? 0 : 4,
                },
              ]}>
              <Span
                colorName={isLast ? "alwaysWhite" : undefined}
                size={10}
                weight={isLast ? "600" : "400"}>
                {pattern}
              </Span>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
})
