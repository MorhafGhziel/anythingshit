'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 1000);
  return () => window.clearInterval(timer);
}

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const;

/** Counts down to totality. Computed in the browser only, never at build time. */
export function Countdown({ target, labels, live }: { target: string; labels: Record<(typeof UNITS)[number], string>; live: string }) {
  const at = Date.parse(target);
  const now = useSyncExternalStore(subscribe, () => Math.floor(Date.now() / 1000), () => null);
  if (now !== null && now * 1000 >= at) return <p className="countdown-live">{live}</p>;
  const left = now === null ? null : Math.max(0, Math.floor(at / 1000) - now);
  const values = left === null ? null : [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60];

  return (
    <dl className="countdown">
      {UNITS.map((unit, i) => (
        <div key={unit} className="countdown-cell">
          <dt>{labels[unit]}</dt>
          <dd className="num">{values ? String(values[i]).padStart(unit === 'days' ? 3 : 2, '0') : '--'}</dd>
        </div>
      ))}
    </dl>
  );
}
