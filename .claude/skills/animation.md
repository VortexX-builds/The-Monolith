# Skill: Animation (GSAP)

## Custom Ease

Always register and use the project's custom ease before any animation:

```js
CustomEase.create("monolith", "0.8, 0, 0.1, 1");
```

Every GSAP tween in this project uses `ease: "monolith"`. No other ease is permitted unless the user explicitly overrides it for a specific case.

Micro-interactions must be `duration: 0.4` or less.

## ScrollTrigger Setup Pattern

Register ScrollTrigger once at the app level. In components, create triggers inside `useLayoutEffect` or `useGSAP`, and always clean up:

```js
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({ ... });
  }, containerRef);

  return () => ctx.revert();
}, []);
```

Never create ScrollTrigger instances outside a GSAP context or without a corresponding cleanup.

## SplitText Usage

- Always split inside a layout effect after the DOM has mounted.
- Re-split on window resize if the element reflows.
- Revert the SplitText instance on unmount to restore original DOM nodes.

```js
useLayoutEffect(() => {
  const split = new SplitText(ref.current, { type: "lines,words,chars" });
  // animate split.chars / split.words / split.lines
  return () => split.revert();
}, []);
```

## Property Rules

- **Animate only:** `transform` (x, y, scaleX, scaleY, rotation) and `opacity`.
- **Never animate:** `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size`, or any layout-affecting property.

## Cleanup Checklist

On every component unmount:
- `ctx.revert()` for all GSAP contexts
- `ScrollTrigger.kill()` or context revert handles child triggers
- `split.revert()` for any SplitText instances
