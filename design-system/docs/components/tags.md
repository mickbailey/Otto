---
title: "Tags"
status: draft
last_updated: 2026-11-23
---

## Overview

A tag is a small, pill-shaped label for a static category or attribute, shown in a dense list alongside others of its kind — a candidate's skill set ("C / C++", "ARM Cortex-M", "FreeRTOS"), for example. Tags are read-only in the UI; they describe, rather than represent a choice someone can remove.

## When to use

Use tags when:
- Several short category labels need to sit together in a compact, wrapping list.
- The labels are descriptive attributes, not a status and not a user-removable selection.

Don't use it:
- For something the viewer chose and can remove — use a **chip**.
- For a single status word attached to a record — use a **badge**.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Default** | `otto-tag` | Standard outlined tag |
| **Muted** | `otto-tag otto-tag--muted` | A lower-emphasis tag among others, when one set needs to recede |
| **Navy** | `otto-tag otto-tag--navy` | A tag that should read with more weight (e.g. a primary skill) |

## Anatomy

| Part | Description |
| --- | --- |
| Label | The attribute's name |
| Container | `otto-tags` wraps a `flex` row of `otto-tag` elements with consistent gaps |

## Behavior

- Tags wrap to multiple lines as needed; they never truncate or scroll horizontally within their container.
- There's no interaction on a tag itself — no hover or focus state, since it isn't a control.

## Accessibility

- Since tags aren't interactive, they don't need a role or focus handling — a plain inline element is correct. If a tag ever becomes a filter you can toggle, it should adopt button semantics and likely become a chip instead.
- When a tag list is the only way a piece of information is conveyed (e.g. required skills), make sure it's still readable by a screen reader as a simple sequence of text, not an image or icon-only list.

## Content

- Keep labels short and literal (an acronym, a product name, a skill) — tags are scanned quickly in a list, not read as sentences.

## Related

- **Chips** — the same shape, but for a removable, user-chosen value.
- **Badges** — a single status word, not a list of attributes.
- **Pills** — similar size, but typically includes a leading icon and reads as metadata (e.g. a date) rather than a category.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use vs. chips/badges, wrapping behavior, accessibility |
