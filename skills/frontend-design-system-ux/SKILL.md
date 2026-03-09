---
name: frontend-design-system-ux
description: Design and implement high-fidelity frontend interfaces and lightweight design systems with strong UX, accessibility, and visual hierarchy. Use when Codex needs to build or redesign screens, dashboards, forms, landing pages, and product UI; translate Figma, screenshots, or brand direction into code; define or extend tokens and reusable components; or review an existing frontend for clarity, consistency, responsiveness, and polish.
---

# Frontend Design System UX

Build interfaces that feel deliberate, shippable, and specific to the product. Favor strong hierarchy, reusable tokens, accessible interactions, and visual choices that look intentional instead of defaulting to generic SaaS styling.

## Start By Reading The Product

1. Inspect the existing stack, routes, theme files, token files, and reusable components before designing anything.
2. Preserve the current visual language when the project already has one. Introduce a new direction only when the request is a redesign or the current UI is clearly inconsistent.
3. Infer the product type, user goal, and emotional tone from the codebase and copy when the prompt is thin. State assumptions briefly when they materially affect layout or styling.
4. Avoid adding a third-party component library unless the repository already uses it or the user asks for it.

## Choose The Job

Pick one primary path before editing:

- **New screen or flow**: define direction, tokens, structure, states, then implement.
- **Design-system extension**: update tokens, primitives, and variants before touching feature screens.
- **UI polish or redesign**: identify the weakest hierarchy, spacing, color, and state problems first, then refactor the smallest set of components that raises the whole experience.
- **UX review**: inspect the flow, surface findings, then patch the highest-impact issues.
- **Mockup or screenshot to code**: extract layout rhythm, component anatomy, spacing, and states; call out any values that are inferred rather than explicit.

## Run The Workflow

### 1. Establish Direction

Write a compact internal brief before making edits:

- product and user
- primary task on the screen
- visual tone in 3-5 adjectives
- constraints from the existing brand or codebase
- success conditions on desktop and mobile

When the prompt asks for "better design" but gives no style direction, choose a specific direction instead of drifting into neutral defaults.

### 2. Build The Foundation

Create a compact token system first:

- color: canvas, surface, text, muted text, primary, accent, border, positive, warning, danger
- type: display, heading, body, small
- spacing: use a 4px or 8px rhythm unless the project already defines one
- radius: keep 2-4 deliberate steps
- elevation: keep 2-3 reusable levels
- motion: define fast, default, slow, and easing

Prefer CSS custom properties for raw tokens. If the project also stores theme values in JS or TS, keep both sources synchronized.

Read [references/design-system-foundations.md](references/design-system-foundations.md) when the task needs concrete token rules, hierarchy guidance, or accessibility thresholds.

### 3. Shape The Component System

Define the minimum reusable primitives:

- page shell
- section, card, or panel
- button, link, and icon button
- input, select, textarea, and toggle
- tag, badge, or status chip
- navigation
- feedback blocks for empty, loading, error, and success

Unify states across components: default, hover, focus-visible, active, selected, disabled, invalid, and loading.

Read [references/component-and-state-patterns.md](references/component-and-state-patterns.md) when implementing forms, dashboards, dense information layouts, or responsive navigation.

### 4. Compose The Experience

Make hierarchy obvious:

- keep one clear primary action per section
- use headings that create scan order
- keep spacing rhythm consistent
- use surfaces to separate meaning, not just decoration
- group dense content into digestible zones

Write concise UI copy. Prefer labels that describe the user task, not internal system language.

Read [references/ux-review-checklist.md](references/ux-review-checklist.md) when auditing flows, forms, dashboards, onboarding, or settings screens.

### 5. Implement With Framework Discipline

- follow the host stack and folder conventions
- reuse existing utilities and shared components before creating new ones
- keep styling colocated with the existing approach
- avoid mixing in a second styling paradigm casually
- respect `prefers-reduced-motion`
- use semantic HTML first; add ARIA only when semantics are insufficient
- ensure keyboard access for navigation, dialogs, menus, tabs, and custom controls
- check new or changed color pairs with `scripts/check_contrast.py`

### 6. Finish With A Quality Pass

Do not stop at "looks better". Verify:

- desktop and mobile layouts both work
- empty, loading, error, success, and disabled states exist where relevant
- tab order and focus visibility are intact
- contrast is acceptable for body text and controls
- repeated patterns use shared tokens or components rather than one-off styles
- motion is purposeful and not constant decoration
- the interface feels specific to the product

## Hold This Quality Bar

Aim for these outcomes in the finished work:

- recognizable visual direction, not template drift
- tokenized colors, spacing, radius, and motion
- accessible interactive states
- consistent component anatomy
- clean responsive behavior
- minimal explanation, strong execution

## Use The Bundled Resources

Read only what the task needs:

- [references/design-system-foundations.md](references/design-system-foundations.md) for token rules, visual hierarchy, and accessibility baseline
- [references/component-and-state-patterns.md](references/component-and-state-patterns.md) for component anatomy, states, and responsive patterns
- [references/ux-review-checklist.md](references/ux-review-checklist.md) for UX audits and common failure modes

Use `scripts/check_contrast.py` for deterministic contrast checks:

```bash
python3 scripts/check_contrast.py "#111827" "#F8FAFC"
python3 scripts/check_contrast.py "#6B7280" "#FFFFFF" --mode large
```

Treat contrast failures as blockers for body text and primary actions unless the user explicitly accepts the tradeoff.
