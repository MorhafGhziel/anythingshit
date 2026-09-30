'use client';

import { useSyncExternalStore } from 'react';

/**
 * Tracks which `[data-section]` currently crosses the middle of the viewport.
 * One shared IntersectionObserver serves every subscriber (header nav, language switchers).
 */
let current = '';
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

function emit(next: string) {
  if (next === current) return;
  current = next;
  listeners.forEach((listener) => listener());
}

function start() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  const visible = new Set<string>();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      // Sections can nest (Visit sits inside Story): the last visible one in document order wins.
      const last = sections.findLast((section) => visible.has(section.id));
      if (last) emit(last.id);
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => observer?.observe(section));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!observer) start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
      current = '';
    }
  };
}

export function useActiveSection(): string {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => '',
  );
}
