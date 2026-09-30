/**
 * The eclipse scene. As the page scrolls, it
 * - blends the page's sky from one stop to the next (`--page-bg` on the readers that need it),
 * - slides the indicator's moon across the sun and names the phase,
 * - gives the header the tone of the section under it.
 * It runs with reduced motion too: nothing here animates on its own, it only follows the scroll.
 */

type RGB = [number, number, number];

interface Stop {
  el: HTMLElement;
  top: number;
  rgb: RGB;
  moon: number;
  tone: string;
  phase: string;
}

const hex = (value: string): RGB => {
  const h = value.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
};
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => Math.round(a[i]! + (b[i]! - a[i]!) * t)) as RGB;

export function startEclipse(): () => void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const indicator = document.querySelector<HTMLElement>('[data-indicator]');
  const phaseLabel = indicator?.querySelector<HTMLElement>('[data-indicator-phase]');
  const phases: Record<string, string> = JSON.parse(indicator?.dataset.phases ?? '{}');
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-eclipse]'));
  if (!elements.length) return () => {};
  const skyReaders = [header, indicator, document.querySelector<HTMLElement>('[data-film-track] + section')].filter(Boolean) as HTMLElement[];

  let stops: Stop[] = [];
  let frame = 0;
  let lastSky = '';
  let lastPhase = '';

  const measure = () => {
    stops = elements.map((el) => ({
      el,
      top: el.getBoundingClientRect().top + window.scrollY,
      rgb: hex(el.dataset.sky ?? '#06070b'),
      moon: Number(el.dataset.moon ?? 0),
      tone: el.dataset.tone ?? 'light',
      phase: el.dataset.phase ?? 'totality',
    }));
    update();
  };

  const update = () => {
    frame = 0;
    const y = window.scrollY;
    const vh = window.innerHeight;

    // Sky: the stop entering from the bottom takes over as its top climbs to 35 % of the screen.
    let i = 0;
    for (let k = 0; k < stops.length; k++) if (stops[k]!.top <= y + vh) i = k;
    const current = stops[i]!;
    const previous = stops[i - 1] ?? current;
    const p = smooth(clamp((y + vh - current.top) / (vh * 0.65)));
    const [r, g, b] = mix(previous.rgb, current.rgb, p);
    const sky = `rgb(${r} ${g} ${b})`;
    if (sky !== lastSky) {
      lastSky = sky;
      document.body.style.backgroundColor = sky;
      skyReaders.forEach((element) => element.style.setProperty('--page-bg', sky));
    }

    // Moon: pinned to the moment each section reaches the middle of the screen.
    let moon = stops[0]!.moon;
    for (let k = 0; k < stops.length; k++) {
      const here = stops[k]!.top - vh * 0.5;
      const next = stops[k + 1];
      if (y < here) break;
      if (!next) {
        moon = stops[k]!.moon;
        break;
      }
      const there = next.top - vh * 0.5;
      moon = stops[k]!.moon + (next.moon - stops[k]!.moon) * clamp((y - here) / Math.max(1, there - here));
    }
    // Before the film is scrolled, the moon is still arriving.
    if (y < vh * 0.5) moon = -0.9 + (stops[0]!.moon + 0.9) * clamp(y / (vh * 0.5));
    if (indicator) {
      indicator.style.setProperty('--moon', moon.toFixed(3));
      indicator.dataset.visible = String(y > vh * 0.3);
    }
    let phase = stops[0]!.phase;
    for (const stop of stops) if (stop.top - vh * 0.5 <= y) phase = stop.phase;
    if (y < vh * 0.25) phase = 'first';
    if (phaseLabel && phase !== lastPhase) phaseLabel.textContent = phases[phase] ?? '';
    lastPhase = phase;

    // Header: the tone of the section under it; glass once the film is behind.
    if (header) {
      let under = stops[0]!;
      for (const stop of stops) if (stop.top <= y + 48) under = stop;
      const onFilm = under === stops[0] && under.el.hasAttribute('data-film-track');
      header.dataset.tone = onFilm ? 'light' : under.tone;
      header.dataset.glass = String(!onFilm);
    }
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure);
  const observer = new ResizeObserver(() => measure());
  observer.observe(document.body);

  return () => {
    document.body.style.backgroundColor = '';
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', measure);
    observer.disconnect();
    cancelAnimationFrame(frame);
  };
}
