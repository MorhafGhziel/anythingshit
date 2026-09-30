'use client';

import { useEffect, useRef } from 'react';

const MAX_WAIT = 2600;

/**
 * Opening card: the moon crosses the sun as the film downloads. At totality the diamond-ring bead
 * flashes, then the black opens from the disc onto the first frame. Exists only when the boot script
 * allows motion (CSS gate) and never waits longer than MAX_WAIT.
 */
export function Loader({ label }: { label: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || getComputedStyle(root).display === 'none') {
      window.__loaderOpen = true;
      return;
    }
    let opened = false;
    let frame = 0;

    const setProgress = (value: number) => {
      root.style.setProperty('--load', value.toFixed(3));
      if (countRef.current) countRef.current.textContent = `${Math.round(value * 100)}%`;
    };

    const open = () => {
      if (opened) return;
      opened = true;
      setProgress(1);
      root.dataset.totality = 'true';
      const disc = root.querySelector('.loader-sun')?.getBoundingClientRect();
      const inner = disc ? disc.width * 0.42 : 60;
      if (disc) root.style.setProperty('--hole-y', `${disc.top + disc.height / 2}px`);
      const cover = (2 * Math.hypot(window.innerWidth, window.innerHeight)) / inner;
      const start = performance.now() + 550;
      const duration = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = t ** 3;
        root.style.setProperty('--hole', `${(inner * cover * eased).toFixed(1)}px`);
        if (t < 1) frame = requestAnimationFrame(tick);
        else root.hidden = true;
      };
      frame = requestAnimationFrame(tick);
      window.__loaderOpen = true;
      window.dispatchEvent(new Event('loader:open'));
    };

    const onProgress = (event: Event) => setProgress((event as CustomEvent<number>).detail * 0.96);
    window.addEventListener('film:progress', onProgress);
    window.addEventListener('film:ready', open);
    const timer = window.setTimeout(open, MAX_WAIT);

    return () => {
      window.removeEventListener('film:progress', onProgress);
      window.removeEventListener('film:ready', open);
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="loader-sun">
        <defs>
          <radialGradient id="loader-glow">
            <stop offset="55%" stopColor="var(--ember)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#loader-glow)" className="loader-corona" />
        <circle cx="60" cy="60" r="34" fill="var(--corona)" />
        <circle cx="60" cy="60" r="34.5" fill="var(--void)" className="loader-moon" />
        <circle cx="86" cy="36" r="5" fill="#fff4e0" className="loader-bead" />
      </svg>
      <p className="loader-label">
        <span>{label}</span>
        <span ref={countRef} className="num">
          0%
        </span>
      </p>
    </div>
  );
}

declare global {
  interface Window {
    __loaderOpen?: boolean;
  }
}
