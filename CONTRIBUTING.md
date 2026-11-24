# Contributing

## Adding or changing a component

1. **Check it doesn't exist.** Look in `src/components/ds/` and the Components showcase page first.
2. **Style with tokens.** Add CSS to `design-system/css/components.css` with a `otto-` class prefix. Use only tokens from `tokens.css`; if you need a new value, add a token.
3. **Build the React component** in `src/components/ds/`, export it from `src/components/ds/index.ts`, and use primitives from `src/components/primitives/` for portals, focus and positioning.
4. **Make it accessible:** native elements first, keyboard support, visible focus, labels for icon-only controls, and the matching WAI-ARIA pattern for composite widgets.
5. **Document it** with two files, following the existing ones:
   * `docs/components/<name>.md` — overview, when to use, variants, anatomy, behavior, accessibility, content, related, changelog
   * `docs/styling/<name>-styling.md` — dimensions, states, tokens, usage, changelog
   and add it to `docs/README.md`.
6. **Show it** on the Components page (`src/app/pages/design-system/ComponentsPage.tsx`) with every variant and state.
7. **Run `npm run build`** — it type-checks and builds.

## Exploring a design variant

Use the branching system instead of copying pages. See [BRANCHING.md](BRANCHING.md).

## Checklist before you share a prototype

- [ ] Pages use `StandardPage` and `PageHeader`
- [ ] No hard-coded colors, sizes or fonts
- [ ] No placeholder text in data-entry fields (search is the exception)
- [ ] Sentence case for UI text; Title Case only for page, section and tab titles
- [ ] One primary button per area; no + icon with the word "Add"
- [ ] Every interaction works with a keyboard
- [ ] Sample data is made up
