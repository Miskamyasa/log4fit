import renderer from "react-test-renderer";

import {useColorScheme} from "../../colors/useColorScheme";
import Span from "../Span";


jest.mock("../../colors/useColorScheme");

describe("components: Text", () => {
  const DEFAULT = "light";
  useColorScheme.mockReturnValue(DEFAULT);

  // const {result: colorScheme} = renderHook(() => useColorScheme());

  it("renders with default (light theme)", () => {
    const tree = renderer.create(<Span>Text</Span>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with dark theme", () => {
    const DARK = "dark";
    useColorScheme.mockReturnValue(DARK);
    const tree = renderer.create(<Span>Text</Span>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom color #999", () => {
    const color = "#999";
    const props = {light: color, dark: color};
    const tree = renderer.create(<Span {...props}>Text</Span>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom styles {fontSize: 12}", () => {
    const props = {style: {fontSize: 12}};
    const tree = renderer.create(<Span {...props}>Text</Span>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
