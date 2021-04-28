import { aggregateLogs } from "../src/utils/aggregateLogs";

import { log3 } from "../fixtures";

describe("aggregateLogs", () => {
  it("should chunk correctly", () => {
    const result = aggregateLogs(log3, 0, 50);
    expect(result[0]).to.eql({
      10: {
        co2: 1,
        voc: 10,
      },
      20: {
        co2: 2,
        voc: 11,
      },
      49: {
        co2: 3,
        voc: 11,
      },
      50: {
        co2: 4,
        voc: 12,
      },
    });

    expect(result[1]).to.eql({
      51: {
        co2: 40,
        voc: 1,
      },
      70: {
        co2: 5,
        voc: 12,
      },
      99: {
        co2: 6,
        voc: 13,
      },
      100: {
        co2: 7,
        voc: 14,
      },
    });

    expect(result[2]).to.eql({
      101: {
        co2: 8,
        voc: 14,
      },
      120: {
        co2: 9,
        voc: 12,
      },
    });

    expect(result[3]).to.eql({});

    expect(result[4]).to.eql({
      201: {
        co2: 10,
        voc: 10,
      },
    });

    expect(result[5]).to.eql({});

    expect(result[6]).to.eql({
      301: {
        co2: 3,
        voc: 3,
      },
      311: {
        co2: 4,
        voc: 4,
      },
      321: {
        co2: 4,
        voc: 4,
      },
    });
  });
});
