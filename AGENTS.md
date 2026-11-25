# Otto: instructions for coding agents

Otto is a design-system-driven template for high-fidelity product prototypes (React 18, TypeScript, Vite, Tailwind v4 for layout only). Every screen must use the Otto design system and follow its principles.

## Workflow for any UI work

1. **Build** with the `otto-build` skill: `.agents/skills/otto-build/SKILL.md`. Components, tokens, page shell, icons.
2. **Apply the principles** with `otto-principles`: `.agents/skills/otto-principles/SKILL.md`. Forms, copy, action labels, states, accessibility.
3. **Audit** with `otto-audit` before saying you're done: `.agents/skills/otto-audit/SKILL.md`. Run `npm run audit` and `npm run typecheck`; fix all errors.

If your agent doesn't load skills automatically, read those files directly. `.claude/skills` is a symlink to `.agents/skills`.

## Non-negotiables

- Import UI from `src/components/ds` only, never `src/components/primitives`. No raw `<button>/<input>/<select>/<textarea>`.
- No hard-coded colors, no `color-mix`, no opacity tints, no Tailwind palette classes. Use `--otto-*` tokens from `design-system/css/tokens.css`.
- Tailwind is for layout only. 4px spacing grid. Type from type tokens.
- One primary action per area. No placeholders on data fields (search and NoteComposer excepted). Sentence case. "New", never "+ Add".
- Made-up data only.
- When code and `Guidelines.md` disagree, the guidelines win.

Reference: [Guidelines.md](Guidelines.md) · [Color rules](design-system/docs/foundations/color.md) · [Component docs](docs/README.md) · [CONTRIBUTING.md](CONTRIBUTING.md)
