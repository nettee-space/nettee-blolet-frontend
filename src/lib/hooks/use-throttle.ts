import { useEffect, useMemo } from 'react';

import { throttle, type ThrottledFunction } from '../utils/throttle';

/**
 * 함수를 쓰로틀링하는 React 훅
 * @param callback 쓰로틀링할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns 쓰로틀된 함수
 */
export function useThrottle<F extends (...args: readonly unknown[]) => unknown>(
  callback: F,
  delay: number,
): ThrottledFunction<Parameters<F>> {
  const throttledCallback = useMemo(() => {
    return throttle(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      throttledCallback.cancel();
    };
  }, [throttledCallback]);

  return throttledCallback;
}
