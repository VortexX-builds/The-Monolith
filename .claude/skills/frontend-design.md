# Skill: Frontend Design System

This skill enforces the visual language of The Monolith. Every UI decision must trace back to one of these rules. When in doubt, default to restraint.

> **Note:** Colors, typography tokens, and specific values may be updated during the project. When the user makes a change, update this file to reflect the new values and keep CLAUDE.md in sync.

## Typography

| Role | Font |
|---|---|
| Display text, headlines, hero copy | **Monument Extended** |
| Utility text, data, labels, UI text, captions | **Space Mono** |

No other fonts. No mixing — a headline is never Space Mono, a label is never Monument Extended.

## Color Palette

| Role | Value |
|---|---|
| Page background | `#0d141a` |
| Raised surface / card | `#1B2228` |
| Elevated surface | `#2C302E` |
| Primary text | `#ffffff` / `#c5c6ca` |
| Muted text | `#A8A9AD` |

## Radii

**0px on every element.** This is non-negotiable.

- No `border-radius` in CSS.
- No `rounded-*`, `rounded`, or `rounded-sm` Tailwind classes.
- No exceptions for buttons, inputs, cards, modals, tags, or any other element.

## Depth and Separation

Depth is created exclusively by layering background colors:

```
Page background (#0d141a) → Raised surface (#1B2228) → Elevated surface (#2C302E)
```

- Never use `border: 1px solid` for sectioning or separation.
- Never use `box-shadow` for depth.
- No `divide-*` Tailwind utilities between sections.

## Noise Overlay

A global noise/film grain texture overlay must always be present:

- `position: fixed`, full viewport coverage
- `pointer-events: none`
- Low opacity (e.g., 3–6%)
- Never removed or conditionally hidden

## Spacing and Layout

- Full-viewport thinking: content fills the screen with intentional internal padding. No centered content boxes with large side margins.
- Generous whitespace — sections must breathe. Industrial and editorial in feel.
- No cramped layouts. Prefer large breathing room between sections.

## Imagery

- All images are grayscale by default across the site.
- Color is only introduced as a transition during a specific hover interaction (e.g., hover distortion effect).
- Never place full-color static images.

## Visual Hierarchy

Hierarchy is achieved through scale and weight contrast:

- Massive display text (Monument Extended) paired against small utility labels (Space Mono).
- Do not rely on color contrast alone to establish hierarchy.
- No colored text used as a hierarchy signal.

## Banned

- `rounded-*` or `border-radius` of any value
- Colored borders for sectioning (`border: 1px solid ...`)
- `box-shadow` for depth
- Full-color static images
- Any font outside Monument Extended and Space Mono
- Generic fade-in animations (see animation.md)
- Centered content boxes with large side margins
