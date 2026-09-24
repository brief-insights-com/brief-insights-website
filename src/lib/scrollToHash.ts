const HEADER_OFFSET = 64;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function smoothScrollToId(id: string, duration = 700) {
  const el = document.getElementById(id);
  if (!el) return;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - HEADER_OFFSET;
  const distance = targetY - startY;

  if (Math.abs(distance) < 1) return;

  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
