---
title: "Chips"
status: draft
last_updated: 2026-11-23
---

## Overview

A chip represents a discrete value someone has actively chosen — a selected requisition in a search field, a filter applied to a list — shown with a secondary-colored pill and, usually, a way to remove it. Unlike a badge or tag, a chip's presence is the result of a choice, and it's usually removable.

## When to use

Use a chip when:
- Someone has picked a value from a search or combobox and it needs to be shown as "currently selected" (e.g. the requisition attached to an activity).
- The value can be removed by the same person who added it, right there in place.

Don't use it:
- For a fixed, system-assigned status — use a **badge**.
- For a dense list of static category labels — use **tags**.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Default** | `otto-chip` | Standard inline size, inside a search or combobox control |
| **Large** | `otto-chip otto-chip--lg` | Standalone, higher-emphasis placement (e.g. a summary panel's "attached requisition") |

## Anatomy

| Part | Description |
| --- | --- |
| Label | The chosen value's name |
| Remove control | *(Optional)* `otto-chip__remove`, a small button with an X icon |

## Behavior

- Removing a chip (via its remove button) clears that selection immediately — no confirmation dialog for a simple, reversible choice.
- A chip that can't currently be removed (e.g. read-only context) simply omits the remove control, rather than showing a disabled one.

## Accessibility

- The remove control is a real `<button>` with `aria-label="Remove <value>"` (not a generic "Remove"), since there's no visible text next to the icon.
- When a chip is removed, move focus somewhere sensible nearby (the field it came from), not to the start of the page.

## Content

- The label is the value's own name, verbatim — don't abbreviate or re-word it in the chip.

## Related

- **Combobox** — the typical source of a chip's value.
- **Tags** — static category labels, not user-removable choices.
- **Badges** — fixed status, not a selected value.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use vs. tags/badges, remove-control accessibility |
