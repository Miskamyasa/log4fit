import {renderHook} from "@testing-library/react-hooks";
import {useThemeColor} from "../useThemeColor";
import {colors} from "../../constants/Colors";
import {useColorScheme} from "../useColorScheme";

describe("hooks: useThemeColor", () => {
  const {result: colorScheme} = renderHook(() => useColorScheme());
  const keys = Object.keys(colorScheme.current);

  it("works", () => {
    keys.forEach((k) => {
      const {result: themeColor} = renderHook(() => useThemeColor(k));
      const currentColors = colors[colorScheme.current];
      expect(themeColor.current).toStrictEqual(currentColors[k]);
    });
  });

  it("works with props", () => {
    const color = "#999";
    const props = {light: color, dark: color};
    keys.forEach((k) => {
      const {result: themeColor} = renderHook(() => useThemeColor(k, props));
      expect(themeColor.current).toStrictEqual(color);
    });
  });
});
