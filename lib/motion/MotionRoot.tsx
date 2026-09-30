'use client';

import { useEffect } from 'react';
import { media } from '@/content/site';

/**
 * Loads GSAP only after hydration and hands off to the scene definitions.
 * Mounted once per locale (keyed in the page), so switching language reverts every
 * ScrollTrigger before the new direction is measured — no duplicates, no stale layouts.
 */
export function MotionRoot() {
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('./scenes')])
      .then(([{ gsap }, { ScrollTrigger }, { initMotion }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        dispose = initMotion(gsap, ScrollTrigger, media.hero.duration);
      })
      .catch(() => {
        // Motion is an enhancement: if it cannot load, show everything in its final state.
        document.documentElement.classList.add('intro-done');
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return null;
}
