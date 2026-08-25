import {
  retry,
} from "../utils/retry";

let attempts = 0;

async function unstableOperation() {
  attempts++;

  console.log(
    "attempt:",
    attempts,
  );

  if (attempts < 3) {
    throw new Error(
      "temporary failure",
    );
  }

  return "success";
}

async function main() {
  try {
    const result =
      await retry(
        unstableOperation,
        {
          attempts: 4,
        },
      );

    console.log(
      "result:",
      result,
    );
  } catch (error) {
    console.error(
      "operation failed:",
      error,
    );
  }
}

main().catch(
  console.error,
);
