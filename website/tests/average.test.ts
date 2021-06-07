import { average } from "../src/utils/average";

describe("average", () => {
  it("should average", () => {
    expect(average([1, 1, 1])).to.equal(1);
    expect(average([11, 10, 9])).to.equal(10);
  });
});
