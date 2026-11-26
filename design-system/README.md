# Otto design system

Dark-first design system for operational recruiting and CRM tools. Compact, clear hierarchy, restrained accent.

## What's here

| Path | What it is |
| --- | --- |
| `css/tokens.css` | Color, type, space, shape, size and motion tokens, scoped to `.otto-theme` (put the class on `<html>` so the page background covers the whole canvas, including below the fold) |
| `css/components.css` | Components, all prefixed `otto-` |
| `dist/otto.embed.css` | Build for embedding in another site: adds an isolation reset so the host page can't restyle components |
| `docs/foundations/` | Foundations: [Color](docs/foundations/color.md) (the token scale and how to use it) and [Shape and spacing](docs/foundations/shape-and-spacing.md) (concentric radius, the 4px grid, gaps) |
| `docs/components/` | Usage guidelines per component (when to use, anatomy, behavior, accessibility, content) |
| `docs/styling/` | Styling and implementation per component (dimensions, tokens, states, markup) |
| `examples/` | Pages built only from the system |
| `scripts/build-embed.py` | Builds `dist/` |
| `site/` | Local tool to audit, edit and showcase the system (see below) |

## Use it

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/components.css">

<html class="otto-theme">
<body>
  <button class="otto-btn otto-btn--primary">Submit</button>
</body>
</html>
```

To drop a screen into another site (a portfolio page, a CMS block), run `python3 scripts/build-embed.py` and use the `.single.html` files in `dist/`.

## Audit, edit and showcase

```
python3 scripts/serve.py
```

Then open `http://127.0.0.1:8420/site/`. Three tabs, all reading the real files in this repo:

- **Showcase** — every component rendered with the live tokens and classes.
- **Playground** — a control for every token in `tokens.css`; every component updates live as you adjust one. Nothing touches disk until you click **Save to tokens.css**, which backs up the previous file to `css/.backups/` first.
- **Audit** — automated checks computed from the current files: hard-coded colors that should be tokens, README/CSS drift, missing component docs, non-`otto-` class names, WCAG contrast on every color pair that matters, unused tokens, and components not yet shown in `examples/`.

## Principles

- **Tokens, not hard-coded values.** Every color, size and space comes from `tokens.css`, so the whole system can be re-skinned in one place. No hex, no `color-mix`, no opacity tints: use a step that exists.
- **Primary yellow is rare.** One primary action per area. Accent (`--otto-accent-200`) carries selection, chips, counts and the active tab.
- **Concentric corners.** Surfaces (cards, panels, dialogs) are `--otto-radius-lg` (16px); everything inside a surface is `--otto-radius` (8px). Layered elements then nest cleanly.
- **Progressive shades.** The page is `--otto-surface-900`, cards and panels are `--otto-surface-800`, and anything nested in a card is `--otto-surface-700`. Every color family treats 800 as its default. See [Color](docs/foundations/color.md).
- **Sentence case** for UI text; Title Case only for page titles, section titles, tab labels and in-page navigation labels.
- **A + icon never pairs with "Add".** Use "New …" (New activity, New contact).
- **Accessible by default:** native elements, visible focus, AA contrast on every surface.
- **`otto-` is for components, `is-` is for state.** Every component class is prefixed `otto-`. A separate, unprefixed `is-*` convention (e.g. `is-num`, `is-on`) marks JS-toggled state on an element — it's never a component on its own, so it's exempt from the `otto-` rule.

## Components

Buttons · Icon buttons · Cards · Fields (input, select, textarea, static, help text, errors) · Search · Combobox · Chips · Tags · Pills · Badges · Counts · Avatars and stacks · Tabs · In-page navigation · Notices · Banners · Toasts · Menu · Tooltip · Dialog and side sheet · Expansion panel · Pagination · Panel sections · Question lists · Empty states · Tables · Record card · Note composer · Checkboxes, radios and switches · App shell (side nav, top bar, user menu, split page, breadcrumb) · Account page (hero, facts, roles, activity feed, sticky team bar, contacts)
