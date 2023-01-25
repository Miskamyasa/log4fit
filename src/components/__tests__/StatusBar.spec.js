import renderer from "react-test-renderer"

import StatusBar from "../StatusBar"


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
describe("components: StatusBar", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<StatusBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
