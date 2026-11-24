---
title: "Icon buttons"
status: draft
last_updated: 2026-11-23
---

## Overview

An icon button is a button with no visible label — just an icon — for a single, well-known action in a tight space: a toolbar, a table row, a card header, a dialog's close control.

- Only use an icon alone when the icon's meaning is unambiguous and widely understood (edit, close, more options, delete). If it needs a tooltip to be understood on first use, it's a sign the action needs a label instead — use a regular [button](buttons.md).
- Three emphasis levels, mirroring buttons: **primary**, **secondary**, **ghost** — plus a **disabled** state. There's no destructive or link icon button; an irreversible or low-emphasis icon-only action should get a visible label instead ([button](buttons.md)).

## When to use

Use it when:
- Space is too tight for a labeled button (a table row's actions, a card header, a toolbar with several actions).
- The icon is a near-universal convention (pencil = edit, three dots = more options, X = close/remove).

Don't use it:
- For an infrequent or ambiguous action — use a labeled button so people don't have to guess.
- As the only way to reach a primary, high-stakes action (submit, delete an account) — those deserve a visible label.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Primary** | `otto-icon-btn otto-icon-btn--primary` | The one main icon-only action in the area, filled like a primary button |
| **Secondary** | `otto-icon-btn otto-icon-btn--secondary` | A supporting icon action that needs to read as a control on a busy or low-contrast background |
| **Ghost** | `otto-icon-btn otto-icon-btn--ghost` | The default, lowest-emphasis icon action — sits directly on its surface with no border (a toolbar, a card header, a table row) |

`otto-icon-btn` alone has no visual style of its own — always pair it with one of the three variant classes above, the same way a text button always needs a weight class.

## Anatomy

| Part | Description |
| --- | --- |
| Icon | 20×20, `aria-hidden="true"` — the icon itself carries no accessible name |
| Container | `<button>`, 40×40 touch target (`otto-icon-btn`) |
| Accessible name | Supplied by `aria-label` on the button, not by the icon |

## Behavior

- Ghost and secondary fill with `--otto-on-surface-300` on hover; primary darkens to `--otto-primary-900`, same as the primary button.
- `:disabled` switches the button to `--otto-on-surface-400` text and icon on a `--otto-on-surface-300` fill with no border, the same treatment as a disabled text button, and disables pointer events, for any of the three variants — it keeps the icon button visible rather than removing it, matching how text buttons handle disabled.

## Accessibility

- **Always set `aria-label`** — without a visible label, the icon alone has no accessible name. (`aria-label="Edit"`, not `aria-label="Edit icon button"`.)
- Never rely on a `title` attribute alone for the accessible name; it's inconsistently exposed and never shown on touch.
- If the same icon button appears many times in a list (e.g. "more options" per row), make each `aria-label` specific to its row ("More options for Priya Natarajan"), not identical across rows.

## Content

- No visible text, by definition — all of the content guidance lives in the `aria-label`: a verb phrase, same tone as a button label ("Edit", "Delete", "More options"), not a noun ("Edit icon", "Options").

## Related

- **Buttons** — the same emphasis levels, with a visible label.
- **Menu** — often opened by a "more options" icon button.
- **Tooltip** — can supplement (never replace) the `aria-label` on hover/focus for extra context.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use, anatomy, accessibility (aria-label requirement), content |
| 2026-11-23 | Mick Bailey | Replaced plain/outlined with primary/secondary/ghost variants plus a disabled state |
