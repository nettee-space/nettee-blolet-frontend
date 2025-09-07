/**
 * 디바운스된 함수 인터페이스
 */
export interface DebouncedFunction<TArgs extends readonly unknown[]> {
  /** 디바운스된 함수 호출 */
  (...args: TArgs): void;
  /** 대기 중인 실행을 취소하고 상태를 초기화 */
  cancel(): void;
}

/**
 * Debounce 함수 - 연속된 호출에서 마지막 호출만 지연 후 실행
 * @param func 디바운스할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns cancel 메서드를 포함한 디바운스된 함수
 */
export function debounce<TArgs extends readonly unknown[]>(
  func: (...args: TArgs) => void,
  delay: number,
): DebouncedFunction<TArgs> {
  let timerId: NodeJS.Timeout | null = null;
  let lastArgs: TArgs | null = null;

  const debouncedFn = (...args: TArgs) => {
    lastArgs = args;

    // 기존 타이머가 있으면 취소
    if (timerId) {
      clearTimeout(timerId);
    }

    // 새로운 타이머 설정
    timerId = setTimeout(() => {
      if (lastArgs !== null) {
        func(...lastArgs);
        lastArgs = null;
      }
      timerId = null;
    }, delay);
  };

  // 타이머 정리를 위한 cleanup 함수 추가
  debouncedFn.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    lastArgs = null;
  };

  return debouncedFn;
}
