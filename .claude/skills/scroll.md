# Skill: Scroll (Lenis)

## Core Rule

All scroll logic routes through Lenis. Never add native `window.scroll`, `window.addEventListener("scroll", ...)`, or `element.scrollTop` listeners anywhere in the codebase in parallel with Lenis.

## Lenis Setup

Lenis is initialized once at the app root (e.g., in `App.tsx` or a dedicated `ScrollProvider`). The instance is exposed via a context or ref so components can access it without creating a second instance.

```ts
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

## Lenis + ScrollTrigger Integration

ScrollTrigger must be synced to Lenis's scroll position, not the native scroll position:

```ts
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

Do not run a separate `requestAnimationFrame` loop when using this pattern — GSAP's ticker drives both.

## Cleanup on Unmount

If Lenis or its event listeners are set up inside a component or effect, destroy them on unmount:

```ts
useEffect(() => {
  // setup
  return () => {
    lenis.destroy();
  };
}, []);
```

## Programmatic Scrolling

Use `lenis.scrollTo(target, { offset, duration, easing })` for all programmatic scroll actions. Never use `window.scrollTo` or `element.scrollIntoView` directly.

## Scroll-Linked Animation

Scroll-linked GSAP animations always use `ScrollTrigger` with a `scroller` property pointing to the Lenis-managed scroll container if needed. Prefer `scrub: true` on timeline tweens for parallax and reveal effects.
