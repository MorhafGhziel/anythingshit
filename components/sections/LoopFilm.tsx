'use client';

import { useEffect, useRef } from 'react';

/** A short muted loop that plays only while on screen, and never with reduced motion. */
export function LoopFilm({ mp4, webm, poster, className = '' }: { mp4: string; webm: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !reduce.matches) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} disablePictureInPicture>
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
