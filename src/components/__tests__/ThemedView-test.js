import renderer from "react-test-renderer";
import {Text} from "react-native";
import ThemedView from "../ThemedView";
import {useColorScheme} from "../../hooks/useColorScheme";

jest.mock("../../hooks/useColorScheme");

describe("components: View", () => {
  const DEFAULT = "light";
  useColorScheme.mockReturnValue(DEFAULT);

  const children = <Text>View</Text>;

  // const {result: colorScheme} = renderHook(() => useColorScheme());

  it("renders with default (light theme)", () => {
    const tree = renderer.create(<ThemedView>{children}</ThemedView>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with dark theme", () => {
    const DARK = "dark";
    useColorScheme.mockReturnValue(DARK);
    const tree = renderer.create(<ThemedView>{children}</ThemedView>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom background color #AAA", () => {
    const background = "#AAA";
    const props = {light: background, dark: background};
    const tree = renderer.create(<ThemedView {...props}>{children}</ThemedView>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom styles {padding: 12}", () => {
    const props = {style: {padding: 12}};
    const tree = renderer.create(<ThemedView {...props}>{children}</ThemedView>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
