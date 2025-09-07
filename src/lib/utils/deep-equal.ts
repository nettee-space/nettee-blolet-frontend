/**
 * 두 값 간의 깊은 동등성 비교를 수행합니다.
 * @param a - 비교할 첫 번째 값
 * @param b - 비교할 두 번째 값
 * @returns 값들이 깊은 동등성을 만족하면 true, 그렇지 않으면 false
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  // NaN 처리
  if (Number.isNaN(a) && Number.isNaN(b)) return true;

  // 타입이 다르거나 null/undefined인 경우
  if (typeof a !== typeof b || a == null || b == null) return false;

  // 배열
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // 객체
  if (typeof a === 'object' && typeof b === 'object') {
    // Date 특별 처리
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]))
        return false;
    }
    return true;
  }

  return false;
}

/**
 * deepEqual 함수의 타입 정의
 */
export type DeepEqualFn = typeof deepEqual;
