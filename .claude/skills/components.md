# Skill: Components

## Component Rules

- **Functional components only.** No class components.
- One component per file.
- File name matches the component name exactly, in PascalCase: `HeroSection.tsx`.
- Components live under `src/components/`. Feature-specific subfolders are encouraged.

## TypeScript

All props must be typed with a TypeScript `interface` declared at the top of the file:

```tsx
interface HeroSectionProps {
  headline: string;
  subline?: string;
}

export function HeroSection({ headline, subline }: HeroSectionProps) { ... }
```

No `any`. No implicit `any`. No `// @ts-ignore` without an accompanying explanation comment.

## Styling

- Use Tailwind utility classes.
- **No inline `style` props** except for dynamic values set by GSAP (e.g., transforms computed at runtime). If GSAP needs to set an initial value before animating, `gsap.set()` is preferred over a `style` prop.
- Never use `style={{ borderRadius: ... }}` — radii are 0px everywhere.

## State and Effects

- Prefer `useRef` for DOM nodes and mutable values that don't need to trigger renders.
- Keep `useState` minimal — avoid storing derived data.
- Layout-dependent effects (GSAP, split text, measurements) go in `useLayoutEffect`, not `useEffect`.

## Exports

Use named exports for all components. No default exports.
