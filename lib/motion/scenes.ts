import type { gsap as GsapInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import { startEclipse } from './eclipse';

type Gsap = typeof GsapInstance;
type ScrollTriggerStatic = typeof ScrollTriggerClass;
type Context = ReturnType<Gsap['context']>;
type Cleanup = () => void;

declare global {
  interface Window {
    __motionReady?: boolean;
    /** Development only: lets QA confirm no ScrollTriggers survive a language switch. */
    __scrollTriggerCount?: () => number;
  }
}

/** Long, weighted decelerations; no overshoot, no bounce. Transforms, opacity and CSS variables only. */
const EASE = {
  settle: 'power3.out',
  reveal: 'power4.out',
  pour: 'power2.inOut',
} as const;

const FPS = 24;

const $ = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) =>
  scope.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(selector));

/* ───────────── Opening: after the loader lifts, the title settles ───────────── */

function heroIntro(gsap: Gsap, context: Context, desktop: boolean): Cleanup {
  const root = document.documentElement;
  if (!root.classList.contains('motion-ok') || root.classList.contains('intro-done')) return () => {};

  const media = $('[data-film-media]');
  const lines = $$('[data-hero-line]');
  const fade = (name: string) => $$(`[data-hero-fade="${name}"]`);
  const distance = desktop ? 18 : 10;
  const animated = [media, ...lines, ...$$('[data-hero-fade]')].filter(Boolean) as HTMLElement[];

  let started = false;
  const play = () => {
    if (started) return;
    started = true;
    root.classList.add('intro-play');
    context.add(() => {
      gsap
        .timeline({
          defaults: { ease: EASE.settle },
          onComplete: () => {
            root.classList.add('intro-done');
            gsap.set(animated, { clearProps: 'transform,opacity' });
          },
        })
        .fromTo(media, { scale: 1.08 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
        // `y: 0` discards the pixel offset GSAP would otherwise parse from the CSS starting state.
        .fromTo(lines, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1.2, stagger: 0.12, ease: EASE.reveal }, 0.2)
        .fromTo(fade('sub'), { opacity: 0, y: distance }, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .fromTo(fade('cta'), { opacity: 0, y: distance }, { opacity: 1, y: 0, duration: 0.9 }, 0.68)
        .fromTo(fade('foot'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.85)
        .fromTo(fade('nav'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8);
    });
  };

  if (window.__loaderOpen) play();
  window.addEventListener('loader:open', play, { once: true });
  const fallback = window.setTimeout(play, 3200);
  return () => {
    window.removeEventListener('loader:open', play);
    window.clearTimeout(fallback);
  };
}

/* ───────────── The film follows the scroll ───────────── */

function heroFilm(gsap: Gsap, duration: number) {
  const track = $('[data-film-track]');
  const stage = $('[data-film-stage]');
  if (!track || !stage) return;

  const intro = $('[data-film-intro]');
  const foot = $('[data-hero-fade="foot"]');
  const shade = $('[data-film-shade]');
  const beat = $('[data-film-beat]');
  const sun = $('[data-film-sip]');

  // Seeks are queued: a new target waits for the previous seek to land, so the decoder is never flooded.
  const state = { time: 0 };
  let pending: number | null = null;
  const bound = new WeakSet<HTMLVideoElement>();
  const flush = (video: HTMLVideoElement) => {
    if (pending === null || video.seeking || video.readyState < 1) return;
    const target = Math.min(pending, (video.duration || duration) - 0.03);
    pending = null;
    if (Math.abs(video.currentTime - target) > 0.5 / FPS) video.currentTime = target;
  };
  const seek = () => {
    pending = state.time;
    const video = document.querySelector<HTMLVideoElement>('[data-film-video]');
    if (!video) return;
    if (!bound.has(video)) {
      bound.add(video);
      video.addEventListener('seeked', () => flush(video));
      video.addEventListener('loadeddata', () => flush(video));
    }
    flush(video);
  };

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        stage.style.setProperty('--film-p', self.progress.toFixed(4));
        // Once the camera drops to the bright ground, the header switches to dark text.
        track.dataset.liveTone = self.progress > 0.66 && self.progress < 0.93 ? 'dark' : 'light';
      },
    },
  });

  // The whole clip across the whole scroll, landing on its black last frame.
  tl.to(state, { time: duration, duration: 0.97, onUpdate: seek }, 0);

  // Beat A: the title lifts away as the light starts to drain; the shade goes with it.
  if (intro) tl.to(intro, { opacity: 0, y: -60, duration: 0.1 }, 0.03);
  if (foot) tl.to(foot, { opacity: 0, duration: 0.05 }, 0.02);
  if (shade) tl.to(shade, { opacity: 0.35, duration: 0.12 }, 0.06);

  // Beat B: "The light goes first." while the sky darkens.
  if (beat) {
    tl.fromTo(beat, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.06, ease: EASE.settle }, 0.12);
    tl.to(beat, { opacity: 0, y: 30, duration: 0.05 }, 0.28);
  }
  // Beat C: "Two minutes of night at noon." over the second shot.
  const second = $('[data-film-beat2]');
  if (second) {
    tl.fromTo(second, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.06, ease: EASE.settle }, 0.38);
    tl.to(second, { opacity: 0, y: 30, duration: 0.05 }, 0.58);
  }
  // Beat D: "Totality." as the camera finds the corona.
  if (sun) {
    tl.fromTo(sun, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.08, ease: EASE.settle }, 0.74);
    tl.to(sun, { opacity: 0, duration: 0.06 }, 0.93);
  }
}

/* ───────────── Reveals: headings, copy and pictures, once ───────────── */

function reveals(ScrollTrigger: ScrollTriggerStatic) {
  const items = $$('.rv, .rv-pop:not(.rv .rv-pop)');
  if (!items.length) return;
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => batch.forEach((element) => element.classList.add('in')),
  });
}

/* ───────────── Craft: each card settles back as the next one covers it ───────────── */

function craftStack(gsap: Gsap) {
  const cards = $$('[data-stack-card]');
  cards.slice(0, -1).forEach((card, i) => {
    const next = cards[i + 1]!;
    gsap.to(card, {
      scale: 0.93,
      opacity: 0.65,
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true },
    });
  });
}

/* ───────────── Moments: two rows drifting in opposite directions ───────────── */

function reels(gsap: Gsap, rtl: boolean) {
  $$('[data-reel]').forEach((viewport) => {
    const row = $('ul', viewport);
    if (!row) return;
    const direction = Number(viewport.dataset.reel ?? 1);
    const sign = rtl ? 1 : -1;
    const distance = () => Math.max(0, row.scrollWidth - viewport.clientWidth);
    gsap.fromTo(
      row,
      { x: () => (direction > 0 ? 0 : sign * distance()) },
      {
        x: () => (direction > 0 ? sign * distance() : 0),
        ease: 'none',
        scrollTrigger: { trigger: viewport, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
      },
    );
  });
}

/* ───────────── Depth: floating ice and the footer's name ───────────── */

function parallax(gsap: Gsap, desktop: boolean) {
  $$<HTMLElement>('[data-speed]').forEach((element) => {
    const speed = Number(element.dataset.speed ?? 0) * (desktop ? 1 : 0.5);
    const distance = () => (window.innerHeight * speed) / 100;
    gsap.fromTo(
      element,
      { y: () => distance() },
      {
        y: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      },
    );
  });

  const mark = $('[data-footer-mark]');
  if (mark) {
    gsap.fromTo(mark, { yPercent: 35 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }
}

/**
 * Builds every scene inside one gsap.context + gsap.matchMedia so a single `revert()` removes
 * all tweens, ScrollTriggers and inline styles — on unmount and before the other language mounts.
 * The day scene (sky, clock, header tone) follows the scroll with or without motion.
 */
export function initMotion(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic, filmDuration: number): () => void {
  window.__motionReady = true;
  if (process.env.NODE_ENV !== 'production') {
    window.__scrollTriggerCount = () => ScrollTrigger.getAll().length;
  }
  const root = document.documentElement;
  const rtl = root.dir === 'rtl';
  ScrollTrigger.config({ ignoreMobileResize: true });
  const stopDay = startEclipse();

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // matchMedia only runs a callback while one of its conditions matches, so desktop and
    // mobile are both listed explicitly.
    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        desktop: '(min-width: 1024px)',
        mobile: '(max-width: 1023.98px)',
      },
      (context) => {
        const { reduce, desktop } = context.conditions as { reduce: boolean; desktop: boolean };

        if (reduce) {
          // Final, readable states immediately; each hour keeps its own sky.
          root.classList.add('intro-done');
          $$('.rv, .rv-pop').forEach((element) => element.classList.add('in'));
          return;
        }

        root.classList.add('sky-live');
        const stopIntro = heroIntro(gsap, context, desktop);
        heroFilm(gsap, filmDuration);
        reveals(ScrollTrigger);
        craftStack(gsap);
        reels(gsap, rtl);
        parallax(gsap, desktop);

        return () => {
          stopIntro();
          root.classList.remove('sky-live');
        };
      },
    );
  });

  // A hash link (`/en#menu` from the language switch) can land before late layout settles.
  // Once measured, land on the target again — unless the visitor has already started moving.
  let moved = false;
  const markMoved = () => {
    moved = true;
  };
  const intents = ['wheel', 'touchmove', 'keydown', 'pointerdown'] as const;
  intents.forEach((type) => window.addEventListener(type, markMoved, { passive: true }));
  const landOnHash = () => {
    if (moved || !location.hash) return;
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  ScrollTrigger.addEventListener('refresh', landOnHash);
  landOnHash();

  // Layout-dependent triggers are measured again once fonts and critical media are ready.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh).catch(() => {});
  if (document.readyState !== 'complete') window.addEventListener('load', refresh, { once: true });

  return () => {
    window.removeEventListener('load', refresh);
    intents.forEach((type) => window.removeEventListener(type, markMoved));
    ScrollTrigger.removeEventListener('refresh', landOnHash);
    stopDay();
    ctx.revert();
  };
}
