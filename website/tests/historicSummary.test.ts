import { historicSummary } from "../src/utils/historicSummary";

import { log1 } from "../fixtures";

describe("historicSummary", () => {
  it("should process good case", () => {
    const result = historicSummary(log1);
    expect(result.co2).to.include({ avg: 5.5, min: 1, max: 10 });
    expect(result.voc).to.include({ avg: 11.9, min: 10, max: 14 });
  });
});
