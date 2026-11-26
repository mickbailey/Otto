---
name: otto-build
description: Build or change a prototype screen, page or feature in the Otto repo using only the Otto design system (tokens, ds components, page shell, icons, Tailwind for layout). Use whenever you create or edit anything under src/ that renders UI, add a page or route, or style something, before writing code.
---

# Build with the Otto design system

Goal: a screen that uses the system exactly as documented, so an audit finds nothing. Do these in order. Don't invent: if the system lacks something, say so and follow "When something is missing".

Companion skills: **otto-principles** (UX and copy rules to apply while designing) and **otto-audit** (run it before you say you're done).

## 1. Read before writing

- `Guidelines.md`: the rules. When code and guidelines disagree, guidelines win.
- `design-system/docs/foundations/color.md`: the numeric token scale (800 is every family's default).
- `src/components/ds/index.ts`: every component you may import. `docs/components/<name>.md` has usage; `docs/styling/<name>-styling.md` has tokens and states.
- `src/app/pages/design-system/PatternsLayoutsPage.tsx` and an existing page close to what you're building: copy their structure.

## 2. Compose from ds components

- Import from `src/components/ds` only. Never import `src/components/primitives` in a page (`Icon` is re-exported from ds).
- Every page: `StandardPage` > `PageHeader` (Title Case title) > content in `Card`s. Add the route in `src/app/routes.tsx` and the nav entry/permission in `src/roles/roles.tsx` if it needs one.
- No raw `<button>`, `<input>`, `<select>`, `<textarea>`: use `Button`, `IconButton`, `Input`, `Select`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Autocomplete`, `Menu`, `Tabs`, `Tag`, `Badge`, `DataTable`, `Dialog`, `SideSheet`, `Banner`, `Notice`, `useToast`, `ExpansionPanel`, `EmptyState`, `Tooltip`, `InPageNavigation`, `NoteComposer`.
- A native element is fine only when it carries an `otto-` class from `components.css` (e.g. `<button className="otto-link">`).
- Never add a UI, icon or toast library. Icons come from `Icon`; add missing ones to `primitives/Icon.tsx`.

## 3. Style with tokens, never values

| Need | Use |
| --- | --- |
| Page background / loose text | `--otto-surface-900` (`bg-background`) |
| Card, panel, side nav | `--otto-surface-800` (`bg-surface`) |
| Inside a card (headers, wells, nested) | `--otto-surface-700` (`bg-raised`) |
| Text / icons | `--otto-on-surface-800` default; step down 600 muted, 500, 400 disabled |
| Borders, dividers | `--otto-border` |
| The one main action | `--otto-primary-800` (via `Button variant="primary"`) |
| Selection, chips, counts, active tab | `--otto-accent-200` / `-700` / `-800` |
| Error text, borders, icons | `--otto-destructive-200` (800 fails contrast as text) |
| Success / warning | `--otto-success-*` / `--otto-warning-*` |
| Type | `.otto-display / headline / title / subtitle / body-lg / label / caption / muted` |
| Radius | Surfaces (cards, panels, dialogs) `--otto-radius-lg` 16; everything inside a surface `--otto-radius` 8; a surface nested in a surface 8; `-sm` 4, `-pill` |
| Spacing | 4, 8, 12, 16, 24, 32. **Outside a surface 24+, inside 16 or less.** Cards pad 16 (12 for small stacked cards), sections inside a card are 16 apart. A tab panel already starts 16 below its tab bar; the parent sets gaps, components add no outer margin. See `design-system/docs/foundations/shape-and-spacing.md` |

- No hex, `rgb()`, `color-mix`, or opacity tints. No Tailwind palette classes (`bg-gray-500`, `text-white`). Use a step that exists.
- Disabled = `on-surface-400` text + `on-surface-300` fill, never `opacity`.
- Tailwind is for **layout only** (flex, grid, gap, padding). Otto component classes win over utilities on the same element, so don't fight them.
- Use `var(--otto-...)` names exactly as defined in `design-system/css/tokens.css`. Check the file; don't guess a step.

## 4. States and accessibility (every interactive thing)

Focus ring is built in, so keep native elements and don't remove outlines. Provide hover, selected, disabled and error where they apply, from tokens. Every icon-only control has a `label`. Every field has a visible label. All of it works from the keyboard.

## 5. Data and variants

- Made-up data only, in `src/data/`. No real people or credentials.
- Exploring alternatives? Use branching (`BRANCHING.md`), not copied pages.
- Role-dependent UI? Use the permission table (`ROLES_AND_PERMISSIONS.md`).

## When something is missing

Don't hard-code a workaround. Follow `CONTRIBUTING.md`: build it in `ds/`, style it in `components.css` with `otto-` classes and existing tokens (add a token only if no step fits), document it in `docs/components` and `docs/styling`, show it on the Components page. If the user didn't ask for system changes, stop and ask first.

## Finish

Run `npm run typecheck`, then the **otto-audit** skill. Fix errors; justify or fix warnings. Don't report done with audit errors open.
