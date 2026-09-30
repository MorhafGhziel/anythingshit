'use client';

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)';
const MOBILE_QUERY = '(max-width: 767px)';

function subscribeQuery(query: string) {
  return (callback: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener('change', callback);
    return () => list.removeEventListener('change', callback);
  };
}

const subscribeMotion = subscribeQuery(MOTION_QUERY);
const subscribeMobile = subscribeQuery(MOBILE_QUERY);

function emit(name: 'film:progress' | 'film:ready', detail?: number) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/**
 * Loads the scroll film and hands it to the motion system (`[data-film-video]`).
 * The file is fetched in full (every frame is a keyframe) so scroll can seek to any moment
 * without waiting on the network. Until then — or with reduced motion — the poster frame shows.
 */
interface FilmSources {
  mp4: string;
  webm: string;
}

/** H.264 where the browser has it (hardware-decoded, Safari), VP9 otherwise. */
function pickSource(video: HTMLVideoElement, sources: FilmSources) {
  return video.canPlayType('video/mp4; codecs="avc1.640028"') ? { url: sources.mp4, type: 'video/mp4' } : { url: sources.webm, type: 'video/webm' };
}

export function FilmPlayer({ desktop, mobile }: { desktop: FilmSources; mobile: FilmSources }) {
  const motion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MOTION_QUERY).matches, () => false);
  const isMobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches, () => false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sources = isMobile ? mobile : desktop;

  const attach = useCallback((video: HTMLVideoElement | null) => {
    videoRef.current = video;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!motion || !video) return;
    const controller = new AbortController();
    let objectUrl: string | null = null;
    const { url, type } = pickSource(video, sources);

    const markReady = () => {
      video.dataset.ready = 'true';
      emit('film:ready');
      // iOS paints seeked frames only after the element has played once; muted playback is allowed.
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
    };
    video.addEventListener('loadeddata', markReady, { once: true });

    (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const total = Number(response.headers.get('content-length')) || 0;
        if (!response.body || !total) throw new Error('no stream');
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let received = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          emit('film:progress', received / total);
        }
        objectUrl = URL.createObjectURL(new Blob(chunks as BlobPart[], { type }));
        video.src = objectUrl;
      } catch {
        if (controller.signal.aborted) return;
        // Streaming unavailable: let the browser fetch the file itself.
        video.src = url;
      }
      video.load();
    })();

    return () => {
      controller.abort();
      video.removeEventListener('loadeddata', markReady);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [motion, sources]);

  if (!motion) return null;

  return (
    <video
      ref={attach}
      key={sources.mp4}
      data-film-video
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
