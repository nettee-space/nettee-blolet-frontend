import { useState, useCallback } from 'react';

import { useEventListener } from './use-event-listener';
import { useThrottle } from './use-throttle';
import { getWindowScrollProgress } from '../utils/scroll';

/**
 * Window 스크롤 진행률 관리 훅
 * @returns 0에서 100 사이의 스크롤 진행률 값 (퍼센트)
 */
export function useWindowScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  // 스크롤 진행률 업데이트 함수
  const updateProgress = useCallback(() => {
    setProgress(getWindowScrollProgress());
  }, []);

  // throttle된 스크롤 핸들러 생성 (16ms ≈ 60fps)
  const throttledScrollHandler = useThrottle(updateProgress, 16);

  // useEventListener로 스크롤 이벤트 관리
  useEventListener('scroll', throttledScrollHandler);

  return progress;
}
