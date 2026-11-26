---
title: "Chips, Tags and Badges"
status: stable
last_updated: 2026-11-22
styling: "../styling/chip-styling.md"
component: "src/components/ds/Tag.tsx"
---

## Overview

Compact elements for entities, attributes, filters and status. Interactive chips filter or act; tags and badges only describe.

- Also known as: Pills, filter chips, status flags
- Import: `import { Tag, Tags, Pill, Badge, Count } from "../components/ds"`

## When to use

- Input chip: a selected entity that can be removed
- Filter chip: toggles a filter on or off
- Tag: a read-only attribute such as a skill
- Badge: a short status like Interviewing or Overdue
- Count: a number next to a label

Don't use it:

- Hover states on non-interactive tags
- Long sentences inside a chip
- Color alone to signal status — the badge text carries the meaning

## Variants

| Variant | Description |
| --- | --- |
| **Input** | Secondary fill with a remove button. |
| **Filter / choice** | Outlined; `--otto-accent-200` fill and check when selected. |
| **Tag** | `--otto-accent-900` fill, read-only. |
| **Badge** | Tones: default, primary, navy, error, exploration, candidate, final. |
| **Pill** | Outlined metadata, e.g. an office location. |

## Anatomy

| Part | Description |
| --- | --- |
| Container | Pill shape (badges 20px, tags 26px, chips 32px) |
| Label | Sentence case |
| Icon | Optional leading icon; remove button on input chips |

## Behavior

- Removing an input chip returns focus to the field it belongs to
- Filter chips show the active count elsewhere on the page

## Accessibility

- Filter chips are buttons with aria-pressed
- Remove buttons are labeled "Remove …"
- Counts carry an aria-label when the context isn't obvious

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| In job market | In Job Market |
| Interviewing | INTERVIEWING!! |

## Related

- [Autocomplete](autocomplete.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
