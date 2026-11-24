---
title: "Buttons"
status: draft
last_updated: 2026-11-23
---

## Overview

A button triggers a single, immediate action — submitting a form, opening a dialog, deleting a record. It never navigates to a different page on its own (use a link for that) and never holds a selection state (use Tabs or a toggle for that).

- Five visual weights — **primary**, **secondary**, **destructive**, **link**, **ghost** — each signaling a different level of emphasis, not a different meaning.
- **Primary yellow is rare.** One primary action per area (one `otto-btn--primary` visible at a time in a given header, card or form). Everything else is secondary, destructive, link or ghost.
- Two sizes only — default and small (`otto-btn--sm`). There's no large size; use default size for standalone, high-emphasis placements instead of scaling up.
- A button's icon can sit on either side of its label — just order the `<svg>` before or after the label text, the button lays out either way.

> **Button vs. link vs. icon button:** a button performs an action in place. A link (`otto-link`, `otto-breadcrumb`, `otto-table-link`) navigates. The **link** button variant (`otto-btn--link`) is still a button that performs an action — it's just styled with link-like color and no fill, for the lowest-emphasis action in a group. An icon button is a button with no visible label, for a single well-known, low-stakes action in a toolbar or row.

## When to use

Use a button when:
- The control performs an action immediately on click (Submit, Save, Delete, New activity).
- The action's outcome is visible on the current page, or opens a dialog/sheet.

Don't use it:
- To navigate to another page or anchor — use a link.
- For a toolbar action with no text label — use an icon button.
- To represent a selected state among options — use Tabs, a chip, or a toggle.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Primary** | `otto-btn otto-btn--primary` | The one main action in the area (Submit, Save, New activity) |
| **Secondary** | `otto-btn otto-btn--secondary` | A supporting action alongside primary (Cancel, Back) |
| **Destructive** | `otto-btn otto-btn--destructive` | An action that deletes or irreversibly removes something |
| **Link** | `otto-btn otto-btn--link` | The lowest-emphasis action, styled like a link (e.g. "View all") |
| **Ghost** | `otto-btn otto-btn--ghost` | A lower-emphasis action on a surface that's already raised (inside a card header, a toolbar) |

Sizes: default (`otto-btn`) and `otto-btn--sm` (compact rows, toolbars) — that's all; there's no large size. Add `otto-btn--block` to fill the width of its container.

## Anatomy

| Part | Description |
| --- | --- |
| Label | Sentence case, a verb phrase naming the action ("Save", "New activity") — never a noun alone |
| Leading icon | *(Optional)* 16×16, `aria-hidden="true"`, before the label |
| Container | `<button>` (or `<a>` styled as a button for a button-shaped link that still navigates) |

## Behavior

- `:disabled` removes the button from the tab order's interactive affordance (`--otto-on-surface-400` text on a `--otto-on-surface-300` fill, `cursor: not-allowed`; secondary keeps its outline in `--otto-border`) but keeps it visible — don't hide a button people expect to find, disable it with a reason nearby instead.
- Hover and focus states are built in; never remove the focus ring.

## Accessibility

- Use a native `<button>` (or `<a>` with `role` implied by `href`) — never a `<div>` or `<span>` with a click handler.
- The accessible name is the visible label. If an icon-only variant is needed, use an [icon button](icon-buttons.md) instead, which requires `aria-label`.
- Touch target is at least 40×40 (`otto-btn` default height); `otto-btn--sm` (32px) is for dense, mouse-oriented layouts only.

## Content

- **Sentence case**, a verb first: "New activity", "Save changes", not "Save Changes" or "Changes Saved".
- **A + icon never pairs with "Add".** Use "New …" instead ("New activity", "New contact").
- Keep labels to 1–3 words. If a button needs a full sentence to explain itself, the surrounding context is missing, not the button's job to supply.

## Related

- **Icon buttons** — the same emphasis levels, without a text label.
- **Links** (`otto-link`, `otto-table-link`) — for navigation, not action.
- **Tabs** — for switching views, not performing actions.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: variants, sizes, behavior, accessibility, content rules |
| 2026-11-23 | Mick Bailey | Removed the large size (unused anywhere in the app); renamed Tertiary to Link |
