import {renderHook} from "@testing-library/react-hooks";
import {useColorScheme} from "../useColorScheme";


const DEFAULT = "light";
jest.mock("../useColorScheme");
useColorScheme.mockReturnValue(DEFAULT);

describe("hooks: useColorScheme", () => {
  it("default (light)", () => {
    const {result} = renderHook(useColorScheme);
    expect(result.current).toStrictEqual(DEFAULT);
  });

  it("dark", () => {
    const DARK = "dark";
    useColorScheme.mockReturnValue(DARK);
    const {result} = renderHook(useColorScheme);
    expect(result.current).toStrictEqual(DARK);
  });

});
