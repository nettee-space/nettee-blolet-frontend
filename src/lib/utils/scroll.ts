/**
 * window 스크롤 진행률 계산
 */
export function getWindowScrollProgress(): number {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const viewHeight = window.innerHeight;
  const docHeight = scrollHeight - viewHeight;

  if (docHeight <= 0) return 0;
  return Math.min((scrollTop / docHeight) * 100, 100);
}
