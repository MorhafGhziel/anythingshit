/**
 * Runs before first paint. It only *allows* the hero intro: if the motion code has not
 * reported in within 3.5s (slow network, blocked script), the page falls back to its
 * final, fully visible state. Content never depends on GSAP to become readable.
 */
export const motionBootScript = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ok');setTimeout(function(){if(!window.__motionReady){d.classList.remove('motion-ok');d.classList.add('intro-done');}},3500);}catch(e){}})();`;
