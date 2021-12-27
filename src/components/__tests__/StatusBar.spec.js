import renderer from "react-test-renderer";

import StatusBar from "../StatusBar";


describe("components: StatusBar", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<StatusBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
