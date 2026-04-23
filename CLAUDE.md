# The Monolith — Claude Code Project Guide

## Project Overview

**The Monolith** is a cinematic, industrial-style athletic club website.

## Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Animation:** GSAP (Core, ScrollTrigger, CustomEase, SplitText)
- **3D:** Three.js, React Three Fiber, React Three Drei
- **Scroll:** Lenis

## Design System

### Colors

| Role | Value |
|---|---|
| Background | `#0d141a` |
| Tertiary surface A | `#1B2228` |
| Tertiary surface B | `#2C302E` |
| Primary text | `#ffffff` / `#c5c6ca` |
| Muted text | `#A8A9AD` |

### Typography

- **Monument Extended** — display text and headlines only
- **Space Mono** — utility text, data, labels, UI text only
- No other fonts permitted.

### Radii

**0px globally.** No `border-radius`. No `rounded-*` Tailwind classes. No exceptions.

### Borders and Depth

No 1px solid dividers for sectioning. Depth and separation are achieved exclusively through background color shifts: `#0d141a` → `#1B2228` → `#2C302E`.

### Texture

A global low-opacity CSS noise/film grain overlay must always be present — fixed over the viewport, `pointer-events: none`. Never remove or conditionally hide it.

## Motion Rules

- **No generic fade-ins.** All motion must be snappy and intentional.
- **Global custom GSAP ease "monolith":** bezier `0.8, 0, 0.1, 1`. All micro-interactions use this ease at 0.4s or less.
- Animate only `transform` and `opacity`. Never animate layout properties.
- Always kill ScrollTrigger instances on component unmount.

## Banned Patterns

- Rounded corners in any form
- 1px solid borders for sectioning or decoration
- Generic fade-in animations
- Any motion not using the `"monolith"` GSAP ease
- Full-color static images (grayscale by default; color only as a hover interaction)
- Fonts outside Monument Extended and Space Mono
- Centered content boxes with large side margins
- Box shadows for depth

## Protected Areas

Do not modify global layout, scroll behavior, or the custom cursor component without explicit instruction.

## Current Site Layout

Section render order in `App.tsx`:

1. **Hero** — Full-viewport. HeroCanvas contains: ParticleSystem (all devices) + HeroFigure 3D orbital ring (desktop only, hidden at `< 1024px`). HeroHeadline overlays animated text ("DEFINE. YOUR LIMITS."), CTAs, and stats strip.
2. **Marquee** — Repeating horizontal scroll strip ("NO SHORTCUTS · NO EXCUSES · NO LIMITS ·")
3. **Arsenal** — Equipment showcase. 3-column grid on desktop → 1-column on mobile. Cards have grayscale-to-color hover.
4. **Marquee**
5. **Roster** — Coach profiles. 2-column grid on desktop → 1-column on mobile. Cards use tap (mobile) or hover (desktop) to reveal details.
6. **Marquee**
7. **Config** — 4-step membership configurator (Training Style → Schedule → Primary Goal → Equipment Access). Selections feed into Contact form.
8. **Marquee**
9. **Contact** — Two-column layout: brand info + social links (left), contact form with programme summary (right). Single-column on mobile.
10. **Footer** — Copyright + legal links.

**Not rendered:** `Ethos.tsx` component exists in the codebase but is **not used** in `App.tsx`.

## Mobile Strategy

- All section overrides live in `src/styles/global.css` in two media blocks: `@media (max-width: 1023px)` and `@media (max-width: 479px)`
- Components use inline styles for layout; named CSS classes expose key elements to the override system
- Custom cursor hidden on touch devices
- HeroFigure hidden on mobile (`< 1024px`); particles still render
- Mobile nav: hamburger menu, all section links hidden from desktop nav bar

## Notes on Evolution

Colors, typography tokens, and design decisions may be updated during the project. When changes are made, update this file and the relevant skill files under `.claude/skills/` accordingly.
