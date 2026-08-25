export type RetryOptions = {
  attempts: number;
};

export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  if (options.attempts < 1) {
    throw new Error(
      "attempts must be at least 1",
    );
  }

  let lastError: unknown;

  for (
    let attempt = 1;
    attempt <= options.attempts;
    attempt++
  ) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export function retryCount(
  attempts: number,
): number {
  if (attempts < 1) {
    return 0;
  }

  return attempts;
}

export function shouldRetry(
  currentAttempt: number,
  maxAttempts: number,
): boolean {
  return (
    currentAttempt <
    maxAttempts
  );
}

export function retryMessage(
  attempt: number,
  maxAttempts: number,
): string {
  if (
    !shouldRetry(
      attempt,
      maxAttempts,
    )
  ) {
    return "No retries left";
  }

  return `Retry ${attempt + 1}/${maxAttempts}`;
}
