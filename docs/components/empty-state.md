---
title: "Empty State"
status: stable
last_updated: 2026-11-22
styling: "../styling/empty-state-styling.md"
component: "src/components/ds/Page.tsx"
---

## Overview

Explains why there's nothing to show and what to do next.

- Also known as: Zero state, no results
- Import: `import { EmptyState } from "../components/ds"`

## When to use

- No records yet
- Search or filters return nothing
- A page isn't available for the current role

Don't use it:

- As decoration on pages that have content

## Variants

| Variant | Description |
| --- | --- |
| **Default** | Icon, title, text, optional action |

## Anatomy

| Part | Description |
| --- | --- |
| Icon | 56px circle |
| Title | Title style |
| Text | Muted, max 360px |
| Action | Optional button |

## Behavior

- Offer the next action when there is one (New activity, Clear filters)

## Accessibility

- Title is real text, not an image

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| No activity yet | Nothing here :( |

## Related

- [Data Table](data-table.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
