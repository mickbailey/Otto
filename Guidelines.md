# Otto Guidelines

These guidelines keep every prototype built from this template consistent and on-system, whoever builds it (person or AI assistant). Follow them for all new features. When the code and these guidelines disagree, the guidelines win; fix the code.

---

## Fonts and typography

Two font families are allowed:

* **Inter** — all product UI: headings, body, labels, buttons, inputs, tables, tags.
* **JetBrains Mono** (`var(--otto-font-mono)`) — the design-variants panel and token names in docs only. Never in product UI.

Use the type tokens from `design-system/css/tokens.css`, never raw sizes:

| Token | Use | Size / weight |
| --- | --- | --- |
| `--otto-text-display` | Page titles | 28 / Medium |
| `--otto-text-headline` | Large figures, record names | 24 / Regular |
| `--otto-text-title` | Card and section titles | 20 / Regular |
| `--otto-text-subtitle` | Emphasis, list titles | 16 / SemiBold |
| `--otto-text-body-lg` | Menu options, large chips | 16 / Regular |
| `--otto-text-body` | Default text | 14 / Regular |
| `--otto-text-label` | Field labels, buttons, bold small text | 14 / SemiBold |
| `--otto-text-caption` | Metadata, helper text | 12 / Regular |
| `--otto-text-caption-bold` | Bold small text, small headings | 12 / SemiBold |

Classes: `.otto-display`, `.otto-headline`, `.otto-title`, `.otto-subtitle`, `.otto-body-lg`, `.otto-label`, `.otto-caption`, `.otto-muted`.

## Tokens and theming

All color, spacing, radius, size and type come from `design-system/css/tokens.css`. **Never hard-code a color** (`#333`, `rgb(…)`) in a page or component. To restyle the app, edit the tokens. Don't make new tints with `color-mix` or `opacity` either: use a step that exists (a family's `-900` or `-200`, or `--otto-on-surface-200`/`-300`), or add a token. The full scale and every rule is in [Color](design-system/docs/foundations/color.md); it's also on the Design System → Foundations page in the app.

Key groups:

* **Surfaces (progressive shades):** `--otto-surface-900` is the page: page titles and loose text sit on it. `--otto-surface-800` is the default surface for cards, panels and the side nav. Anything nested inside a card steps up to `--otto-surface-700` (card headers, wells, nested buttons). Translucent fills (`--otto-on-surface-200`, `-300`) work at any level
* **On surface:** `--otto-on-surface-800` is the default text and icon color (100%). Step down to de-emphasize: `-700` 80%, `-600` 72%, `-500` 56%, `-400` 32%, `-300` 16%, `-200` 8%. White at opacity, so it works on any surface
* **Borders and dividers:** `--otto-border` (same value as `--otto-on-surface-400`)
* **Brand:** yellow is the primary color: `--otto-primary-800` (the one main action) and `--otto-primary-900` (hover, 80%). Accent steps support elevated and navigational surfaces: `--otto-accent-200` (chips, counts, selection, active tab), `-300` (80%), `-700` (selected rows, avatars), `-800` (hover rows, tags, 80%), plus `--otto-accent-100` for icons and links on accent. `--otto-primary-200` is the primary tint (14%). Text on primary and on tooltips uses `--otto-surface-900`; tooltips sit on `--otto-on-surface-800`. Info uses `--otto-accent-200`
* **Feedback:** `--otto-success-800`, `--otto-warning-800` and `--otto-destructive-800`, each with a `-900` step (80%) for hover, de-emphasis and containers (the error badge uses `--otto-destructive-900`). Destructive and success also have a light `-200` step for text, borders and icons on dark surfaces, where 800 is too dark to read (`--otto-destructive-200` for error text, `--otto-success-200` on a success tint). `--otto-accent-200` follows `--otto-accent-200`. Reserve destructive for critical feedback and irreversible actions
* **Shape:** `--otto-radius-lg` 16 for **surfaces** (cards, panels, expansion panels, dialogs, record cards); `--otto-radius` 8 for **everything inside a surface** (buttons, fields, rows, hover fills, nested panels, menus); `--otto-radius-sm` 4; `--otto-radius-pill`. A surface nested in a surface steps down to 8, so corners layer concentrically instead of fighting. Don't use 16 on a control or 8 on a top-level surface. Full rules: [Shape and spacing](design-system/docs/foundations/shape-and-spacing.md)
* **Focus:** `--otto-on-surface-800` (white, the same token as default text). A 2px white outline on every focusable element; text fields get a 2px white border instead

Tailwind utilities are mapped to the same tokens in `src/styles/theme.css` (`bg-surface`, `text-muted`, `border-border`…). Use Tailwind for **layout** (flex, grid, gap, padding). Otto component classes are unlayered, so they win over utilities on the same element; don't fight them with utilities.

## Spacing and layout

Spacing uses a 4px base. Use these values; don't invent new ones. **Outside a surface, spacing and margins are 24px or more; inside a surface they are 16px or less.** Sections stacked inside a card are 16 apart, and a tab panel starts 16 below its tab bar (the `Tabs` component adds that, so don't add it again). The parent sets the gap; a component never adds outer margin. See [Shape and spacing](design-system/docs/foundations/shape-and-spacing.md).

* **4px** — inside dense controls, between related label elements
* **8px** — icon to label, between chips and tags, compact metadata
* **12px** — small grouped rows, card headers
* **16px** — inside surfaces: card padding (12px for small stacked cards), default spacing in forms, gaps between a card's sections
* **24px** — outside surfaces: page padding, gutters between columns, separation between page regions
* **32px+** — outside surfaces only: page-level separation

### Page shell

Every page uses the shell (see `docs/components/page-shell.md`):

* **`StandardPage`** — the wrapper for page content; pass `aside` for a right-hand context panel
* **`PageHeader`** — Title Case title, optional description, breadcrumb or back link, actions
* **`PageContainer`** — consistent page padding inside a 1280px max width

`src/app/pages/design-system/PatternsLayoutsPage.tsx` is the living example.

### Layout rules

* Default to a **single-column flow**.
* Use **two columns** only for short, related fields people answer independently (city and state, pay and type).
* Long text, addresses, notes and conditional follow-up questions span the **full width**.
* Create hierarchy with cards, sections and expansion panels, not stray divider lines.
* Keep the primary action close to the content it submits.
* Breakpoints: 1440, 1024, 768, 375. Components respond to their container width.

## Component layers

| Layer | Location | When to use |
| --- | --- | --- |
| **Design-system components** | `src/components/ds/` | **Always use these in pages.** Button, IconButton, Input, Select, Textarea, Checkbox, RadioGroup, Switch, Autocomplete, Tag, Badge, Avatar, Tabs, Menu, Toast, Banner, Dialog, SideSheet, DataTable, Pagination, ExpansionPanel, InPageNavigation, Tooltip, EmptyState, StandardPage… |
| **Primitives** | `src/components/primitives/` | Only inside design-system components: Portal, focus trap, outside click, anchor positioning, Icon. Never import them in page code (Icon is re-exported from `ds`). |

Need something new? Build it in `ds/`, document it in `docs/` (guidelines + styling), and add it to the Components showcase page. See CONTRIBUTING.md.

## Icons

Icons live in one set, `src/components/primitives/Icon.tsx`, drawn in `currentColor`:

* **Material Icons (filled)** — names starting with `m` (`mHome`, `mBusiness`, `mWork`…). Used for the side navigation at **24px**.
* **Line icons** — rounded, one stroke weight, for actions and inline UI.

* Import through the design system: `import { Icon } from "../components/ds"`.
* Size with the `size` prop (16 in buttons, 18 in menus and fields, 20 default, 24 in navigation).
* Color comes from the parent's text color or a token: `style={{ color: "var(--otto-accent-100)" }}`.
* Icons next to a visible label are decorative. Icons that stand alone need a `label`.
* Don't add an icon library. Add missing icons to the set so everything matches.

## Toast

Use `useToast()` for transient feedback. Don't add a third-party toast library.

```tsx
const toast = useToast();
toast.success("Candidate added");
toast.info("Resume download started");
toast.warning("Session expires in 5 minutes");
toast.error("Couldn't save changes", { action: { label: "Try again", onClick: retry } });
```

* **Success** confirms a completed action (most common). **Info** reports status. **Warning** is cautionary but not blocking. **Error** reports a failure.
* Bottom center, slides up, closes after about 6 seconds (5s + 1s per 120 words). `duration: Infinity` keeps it open.
* The close button is always visible. At most two toasts show at once.
* Optional `header`, `action` and `duration`.

## Input fields

* Data-entry fields have a **label above** (`--otto-text-label`) and **no placeholder text**. Placeholders suggest the field is already filled in.
* Mark required fields with the `required` prop; it adds the asterisk and the attribute.
* Helper text explains format or consequences only when needed.
* Errors replace helper text, sit right under the field, and say how to fix the problem.

### Search fields

Search fields on landing pages (Candidates, Requisitions) are the exception: **placeholder instead of a visible label**, plus a search icon. The placeholder says what can be searched: "Search by name, role or skill...". Keep the label for screen readers with `hideLabel`.

```tsx
<Input label="Search candidates" hideLabel leftIcon="search" placeholder="Search by name, role or skill..." />
```

### Note fields

Quick free-text notes (activity feeds, record cards) use `NoteComposer`, the second exception to "no placeholders":

* Placeholder is always **"Add a note..."**, label kept for screen readers.
* Collapsed it's one line. On focus it grows, takes a white outline, and shows a **Note type** menu and a small primary **Post** button. Post is disabled until there's text.
* Ctrl/Cmd + Enter posts. Escape on an empty note collapses it.

```tsx
<NoteComposer label={`Note for ${c.name}`} onPost={(text, type) => save(text, type ?? "Note")} />
```

## Form design

Forms follow the principles in Adam Silver's *Form Design Patterns*:

* **Ask only for what's needed.**
* **One thing at a time:** reveal conditional questions directly after the question that triggers them.
* **Labels over placeholders.** Search is the only exception.
* **Choose the simplest control:** select, radio, checkbox, date or autocomplete when they remove ambiguity.
* **Help people answer correctly:** parse, format and pre-fill when the UI can.
* **Explain why** you need unusual or sensitive information.
* **Specific validation and recovery:** say what's wrong and how to fix it; on submit, show every error and move focus to the first.
* **Familiar flows** over clever layouts.

Structure:

* Use `ExpansionPanel` or titled cards for long forms with several topics; add `InPageNavigation` when people need to jump between sections.
* Group related questions; keep helper copy next to its field.
* Actions sit at the end of the form or section they control: **secondary Cancel, then primary Submit/Save**, left to right.
* Every exit from a form with unsaved work (Cancel or navigating away) uses the same discard dialog, and the destructive choice (Discard) is its primary action.

## Chips

* **Input chips** — removable entities (`<Tag onRemove>`).
* **Filter / choice chips** — toggle on and off (`<Tag selected onClick>`); navy with a check when selected.
* **Tags** — read-only attributes such as skills (`<Tag>`).
* **Badges** — short status flags (`<Badge tone>`).
* Pill shape, sentence case. Only interactive chips have hover states.

## Menus

* Two densities: **default** (10px 16px) for primary menus, **condensed** (6px 12px) for tables and toolbars.
* One-line or two-line items (`secondaryText`). Optional 18px leading icons in `--otto-on-surface-600`; destructive items use the error color.
* **Single-select** closes on pick and shows a trailing check. **Multi-select** stays open with leading checks.
* Opens below, left-aligned (`align="right"` near the edge). Max height 320px, min width 200px.
* Closes on outside click, Escape or a single-select pick. Up/Down, Home/End, Enter/Space work.
* Use menus for 5+ options. Separate destructive actions with a divider. No nested submenus.

## Buttons

* **Primary** — yellow fill. One per area, for the main action.
* **Secondary** — outlined. Next to a primary, for supporting actions like Cancel.
* **Tertiary** — text only. Available but not emphasized.
* **Ghost** — surface fill. Toolbars and in-card actions.
* **Destructive** — red fill. Permanent actions.
* Sizes: 40px default, 32px `sm`, 44px `lg`; icon buttons are 40×40. Text fields, selects and search are 40px tall, the same as a default button, so a row of them lines up.
* **A + icon never pairs with the word "Add".** Use "New …" (New activity, New contact). "Add a requisition" without an icon is fine.

## Component states

* **Focus:** 2px white (`--otto-on-surface-800`) outline on everything focusable; text fields show it on their outer border instead of around the bare input. Never rely on color change alone.
* **Hover:** subtle, from tokens (`--otto-on-surface-300`, `--otto-accent-800`). No one-off hover colors.
* **Selected / current:** distinct from hover. Accent (`--otto-accent-200`, `--otto-accent-700`) carries selection.
* **Disabled:** `--otto-on-surface-400` for text and icons, plus an `--otto-on-surface-300` fill where the control has one. Never `opacity`. Not interactive, still visible. Don't hide unavailable options people need to know exist.
* **Error:** `--otto-destructive-200` for text, borders and icons (never `--otto-destructive-800` as text on a dark surface; it fails contrast); messages specific and next to the problem.

## Content and copy

* **Sentence case** for buttons, labels, placeholders, column headers, field names, status flags, links, tooltips and helper text.
* **Title Case** only for page titles, section titles, tab labels and in-page navigation labels.
* Proper nouns keep their capitals (LinkedIn, Planet Express).
* Plain language. Say what happened and what to do next. No "Oops", no exclamation marks in errors.

| ✅ | ❌ |
| --- | --- |
| New note | Add Note |
| Search by resume keyword... | Search by Resume Keyword... |
| Account manager | Account Manager |
| In job market | In Job Market |

## Action labels

Use consistent verbs so people can predict what a button does (adapted from the Carbon Design System's action labels).

| Label | Use for |
| --- | --- |
| New | Starting to create something: New activity |
| Create | Confirming creation after details are entered |
| Add | Putting an existing thing into a new context: Add to requisition |
| Save | Saving changes without leaving |
| Submit | Sending a completed form and returning to where you came from |
| Apply | Applying settings without closing |
| Cancel | Stopping and closing; warn if work will be lost |
| Discard | Throwing away unsaved work (cancel dialogs) |
| Delete | Destroying something permanently |
| Remove | Taking something out of a context without destroying it |
| Edit | Changing values |
| View details | Opening more information |
| Download / Upload | Moving files to or from the person's device |
| Log in / Log out | Not "Sign in / Sign out" |
| Back / Next | Moving through steps |

Avoid vague labels (OK, Done, Yes) when a specific verb exists.

## Principles

* Intentional, detail-oriented and consistent. Proven patterns first, then creativity.
* Prefer what's simple to build. Push for something new when the use case earns it.
* **Never hide filter options because no data matches them right now.** A filter that returns nothing is expected; a missing option looks broken.
* Accessible by default: native elements, visible focus, AA contrast on every surface, keyboard paths for every interaction.
* Prototypes use made-up data only. No real people, customers or credentials in the repo.
