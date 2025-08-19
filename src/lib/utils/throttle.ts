/**
 * 쓰로틀된 함수 인터페이스
 */
export interface ThrottledFunction<TArgs extends readonly unknown[]> {
  /** 쓰로틀된 함수 호출 */
  (...args: TArgs): void;
  /** 대기 중인 실행을 취소하고 상태를 초기화 */
  cancel(): void;
}

/**
 * Throttle 함수 - 지정된 시간 동안 최대 한 번만 실행 (trailing edge)
 * @param func 쓰로틀링할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns cancel 메서드를 포함한 쓰로틀된 함수
 */
export function throttle<TArgs extends readonly unknown[]>(
  func: (...args: TArgs) => void,
  delay: number,
): ThrottledFunction<TArgs> {
  let isThrottled = false;
  let lastArgs: TArgs | null = null;
  let timerId: NodeJS.Timeout | null = null;

  const throttledFn = (...args: TArgs) => {
    lastArgs = args;

    if (isThrottled) {
      return;
    }

    isThrottled = true;

    timerId = setTimeout(() => {
      isThrottled = false;
      if (lastArgs !== null) {
        func(...lastArgs);
        lastArgs = null;
      }
      timerId = null;
    }, delay);
  };

  // 타이머 정리를 위한 cleanup 함수 추가
  throttledFn.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    isThrottled = false;
    lastArgs = null;
  };

  return throttledFn;
}
