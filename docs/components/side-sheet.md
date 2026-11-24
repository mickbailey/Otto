---
title: "Side Sheet"
status: stable
last_updated: 2026-11-22
styling: "../styling/side-sheet-styling.md"
component: "src/components/ds/Overlay.tsx"
---

## Overview

A panel from the trailing edge for details or a secondary form without leaving the page.

- Also known as: Drawer, panel
- Import: `import { SideSheet } from "../components/ds"`

## When to use

- Viewing a record's details from a list
- Short edit forms tied to the current page

Don't use it:

- Primary, long forms — give them a page
- Stacking sheets on sheets

## Variants

| Variant | Description |
| --- | --- |
| **Default** | 480px, full height |

## Anatomy

| Part | Description |
| --- | --- |
| Scrim | Covers the page |
| Header | Title and close |
| Body | Scrolls |
| Footer | Actions at the end |

## Behavior

- Slides in from the trailing edge
- Focus trapped; Escape and the scrim close it

## Accessibility

- role="dialog" with aria-modal and aria-labelledby

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Embedded Systems Engineer, Fleet IoT | Details |

## Related

- [Dialog](dialog.md)
- [Data Table](data-table.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
