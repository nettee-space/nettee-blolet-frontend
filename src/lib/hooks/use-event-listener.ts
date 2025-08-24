import { useCallback, useEffect, useRef, type RefObject } from 'react';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

// MediaQueryList 이벤트 기반 useEventListener 인터페이스
function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList | null>,
  options?: boolean | AddEventListenerOptions,
): void;

// Window 이벤트 기반 useEventListener 인터페이스
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;

// Element 이벤트 기반 useEventListener 인터페이스
function useEventListener<
  K extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  T extends Element = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K] & SVGElementEventMap[K]) => void,
  element: RefObject<T | null>,
  options?: boolean | AddEventListenerOptions,
): void;

// Document 이벤트 기반 useEventListener 인터페이스
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document | null>,
  options?: boolean | AddEventListenerOptions,
): void;

/**
 * DOM 요소, window, 또는 미디어 쿼리 리스트에 이벤트 리스너를 연결하는 커스텀 훅
 * @template KW - window 이벤트의 타입
 * @template KH - HTML 또는 SVG 요소 이벤트의 타입
 * @template KM - 미디어 쿼리 리스트 이벤트의 타입
 * @template T - DOM 요소의 타입 (기본값: `HTMLElement`)
 * @param {KW | KH | KM} eventName - 수신할 이벤트의 이름
 * @param {(event: WindowEventMap[KW] | HTMLElementEventMap[KH] | SVGElementEventMap[KH] | MediaQueryListEventMap[KM] | Event) => void} handler - 이벤트 핸들러 함수
 * @param {RefObject<T>} [element] - 이벤트 리스너를 연결할 DOM 요소 또는 미디어 쿼리 리스트 (선택사항)
 * @param {boolean | AddEventListenerOptions} [options] - 이벤트 리스너의 특성을 지정하는 옵션 객체 (선택사항)
 * @example
 * ```tsx
 * // 예시 1: window 이벤트 리스너 연결
 * useEventListener('resize', handleResize);
 * ```
 * @example
 * ```tsx
 * // 예시 2: 옵션과 함께 document 이벤트 리스너 연결
 * const elementRef = useRef(document);
 * useEventListener('click', handleClick, elementRef, { capture: true });
 * ```
 * @example
 * ```tsx
 * // 예시 3: 요소 이벤트 리스너 연결
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useEventListener('click', handleButtonClick, buttonRef);
 * ```
 */
function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | SVGElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  const stableOptions = useRef(options);
  useIsomorphicLayoutEffect(() => {
    stableOptions.current = options;
  }, [options]);

  const eventListener = useCallback((event: Event) => {
    savedHandler.current(event);
  }, []);

  useEffect(() => {
    const targetElement: T | Window | null = element?.current ?? window;

    if (!targetElement?.addEventListener) return;

    const currentOptions = stableOptions.current;
    targetElement.addEventListener(eventName, eventListener, currentOptions);

    return () => {
      if (targetElement?.removeEventListener) {
        targetElement.removeEventListener(eventName, eventListener, currentOptions);
      }
    };
  }, [eventName, element, eventListener]);
}

export { useEventListener };
