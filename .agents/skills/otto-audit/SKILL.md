---
name: otto-audit
description: Audit a finished or in-progress Otto prototype for design-system compliance and principle violations, then report and fix findings. Use after building or editing any screen, before saying a prototype is done, before a commit or PR, or when asked to check, review or audit the design system usage.
---

# Audit an Otto prototype

Two layers: an automated lint that finds rule violations in source, and a manual checklist for what a linter can't see. Run both. Don't mark work done while errors remain.

## 1. Run the automated audit

```bash
npm run audit                       # all of src/ + package.json
npm run audit -- src/app/pages/MyPage.tsx   # just what you changed
npm run audit -- --system           # also checks design-system/css (class prefix, contrast)
npm run audit -- --json             # machine-readable
npm run audit -- --strict           # warnings fail too (use before a PR)
npm run typecheck                   # types must pass too
```

(`npm run audit` runs `node scripts/audit-prototype.mjs`.) Exit code 1 means errors.

### What it checks

| Rule | Severity | Meaning |
| --- | --- | --- |
| `hardcoded-color`, `tailwind-palette-color`, `color-mix` | error | Any hex/rgb/hsl, Tailwind palette class or `color-mix`. Only black shadows are allowed |
| `undefined-token`, `old-prefix` | error | `var(--otto-x)` that tokens.css doesn't define, or leftover `--px-` |
| `raw-form-element` | error | Raw `<button/input/select/textarea>` in pages, unless it has an `otto-` class or is the `type="search"` input inside `.otto-search` |
| `primitives-import` | error | A page importing `components/primitives` |
| `placeholder-on-field`, `field-label` | error | Placeholder on non-search field; field without a label |
| `icon-button-label` | error | IconButton with no `label` |
| `plus-add` | error | A + icon button reading "Add ..." |
| `mono-in-product-ui`, `raw-font` | error | Mono or other fonts in product UI |
| `banned-dependency` | error | UI, icon or toast library in package.json |
| `contrast`, `non-otto-class` | error | With `--system`: failing color pairs, unprefixed component classes |
| `opacity-tint`, `raw-type-size`, `raw-radius`, `off-grid-spacing` | warning | Raw values instead of tokens or the 4px grid |
| `page-shell`, `page-header`, `one-primary` | warning | Page missing the shell or header; several primary buttons in a file |
| `vague-label`, `title-case-ui-text`, `friendly-error`, `exclamation-in-error` | warning | Copy rules |
| `clickable-div`, `img-alt`, `autofocus` | warning | Accessibility smells |

## 2. Fix, don't silence

- Fix every **error**. Replace the value with a token or ds component; don't add an ignore to get green.
- For each **warning**, either fix it or decide it's intentional. Raw sizes and off-grid spacing in an existing ds component are often legacy: fix only in code you touched, and mention the rest.
- A genuine exception (an illustration's brand colors, a legacy line) gets a reasoned comment, never a bare one:
  `// otto-audit-ignore <rule-id> why it is intentional` (same or previous line) or `// otto-audit-ignore-file <rule-id> why` (whole file).
- Re-run until errors are zero.

## 3. Manual checklist (the linter can't judge these)

Walk the screen in the browser (`npm run dev`) at 1440 and 375 wide, in the roles that can see it, and answer yes to each:

- [ ] Progressive shades read correctly: page 900, cards 800, nested 700; nothing important sits straight on 900 except page titles and loose text
- [ ] Exactly one primary per area; the primary is the main action
- [ ] Every control has hover, focus, selected, disabled and error where it applies; focus ring visible
- [ ] Tab through the whole screen: logical order, no traps, dialogs return focus
- [ ] Empty, loading, error and long-content states exist and look intentional
- [ ] Copy follows sentence case, the action verbs table, and error guidance (see **otto-principles**)
- [ ] Forms: labels above, no placeholders, errors under fields, Cancel then primary at the end
- [ ] Filters never hide options because of empty data
- [ ] Layout responds at 1024, 768, 375; no horizontal scroll
- [ ] Made-up data only; no real names, emails or credentials
- [ ] Nothing new was added to the system without docs (`docs/components`, `docs/styling`) and a Components page entry

For a visual check of the system itself, `python3 design-system/scripts/serve.py` then open `http://127.0.0.1:8420/site/` and read the **Audit** tab (unused tokens, docs coverage, contrast).

## 4. Report

End with a short report:

```
Audit: <n> errors, <n> warnings (typecheck: pass/fail)
Fixed: <what you changed>
Accepted: <each ignore or kept warning, with the reason>
Manual checks: <any you could not verify, and why>
```

Never claim a clean audit you didn't run, and say which manual items you didn't verify.
