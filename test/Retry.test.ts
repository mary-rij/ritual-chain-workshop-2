import { expect } from "chai";

import {
  retry,
  retryCount,
  shouldRetry,
  retryMessage,
} from "../utils/retry";

describe("retry helper", function () {
  it("returns a successful result", async function () {
    const result =
      await retry(
        async () => "ok",
        {
          attempts: 3,
        },
      );

    expect(result)
      .to.equal("ok");
  });

  it("retries after a failure", async function () {
    let calls = 0;

    const result =
      await retry(
        async () => {
          calls++;

          if (calls < 3) {
            throw new Error(
              "temporary",
            );
          }

          return "done";
        },
        {
          attempts: 3,
        },
      );

    expect(result)
      .to.equal("done");

    expect(calls)
      .to.equal(3);
  });

  it("throws after all attempts", async function () {
    let calls = 0;

    try {
      await retry(
        async () => {
          calls++;
          throw new Error(
            "failed",
          );
        },
        {
          attempts: 2,
        },
      );

      throw new Error(
        "expected failure",
      );
    } catch (error) {
      expect(calls)
        .to.equal(2);
    }
  });

  it("counts valid attempts", function () {
    expect(
      retryCount(3),
    ).to.equal(3);
  });

  it("rejects invalid retry count", function () {
    expect(
      retryCount(0),
    ).to.equal(0);
  });

  it("knows when another retry is possible", function () {
    expect(
      shouldRetry(1, 3),
    ).to.equal(true);

    expect(
      shouldRetry(3, 3),
    ).to.equal(false);
  });

  it("creates a retry message", function () {
    expect(
      retryMessage(1, 3),
    ).to.equal(
      "Retry 2/3",
    );
  });

  it("reports no retries left", function () {
    expect(
      retryMessage(3, 3),
    ).to.equal(
      "No retries left",
    );
  });
});
