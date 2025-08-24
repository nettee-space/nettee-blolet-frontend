import { useEffect, useLayoutEffect } from 'react';

/**
 * SSR 환경에서 안전하게 사용할 수 있는 동형 레이아웃 이펙트 훅
 * 클라이언트에서는 useLayoutEffect, 서버에서는 useEffect 사용
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
