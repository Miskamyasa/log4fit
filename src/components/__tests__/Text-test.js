import renderer from "react-test-renderer";

import Text from "../Text";
import {useColorScheme} from "../../hooks/useColorScheme";

jest.mock("../../hooks/useColorScheme");

describe("components: Text", () => {
  const DEFAULT = "light";
  useColorScheme.mockReturnValue(DEFAULT);

  // const {result: colorScheme} = renderHook(() => useColorScheme());

  it("renders with default (light theme)", () => {
    const tree = renderer.create(<Text>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with dark theme", () => {
    const DARK = "dark";
    useColorScheme.mockReturnValue(DARK);
    const tree = renderer.create(<Text>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom color #999", () => {
    const color = "#999";
    const props = {light: color, dark: color};
    const tree = renderer.create(<Text {...props}>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom styles {fontSize: 12}", () => {
    const props = {style: {fontSize: 12}};
    const tree = renderer.create(<Text {...props}>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
