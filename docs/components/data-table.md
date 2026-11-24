---
title: "Data Table"
status: stable
last_updated: 2026-11-22
styling: "../styling/data-table-styling.md"
component: "src/components/ds/DataTable.tsx"
---

## Overview

Shows records in rows and columns for scanning and comparing, with sorting and pagination.

- Also known as: Table, grid
- Import: `import { DataTable, Pagination } from "../components/ds"`

## When to use

- Lists of records with several comparable attributes
- When people sort, scan or pick a row to open

Don't use it:

- A single attribute list — use a simple list
- Layout

## Variants

| Variant | Description |
| --- | --- |
| **Default** | Sortable headers, hover rows |
| **Clickable rows** | Pass `onRowClick` to open a record |

## Anatomy

| Part | Description |
| --- | --- |
| Header row | 12px SemiBold, muted, sentence case |
| Sort button | Icon shows direction |
| Rows | 56px tall |
| Pagination | Range text and page buttons |

## Behavior

- Click a sortable header to sort ascending, again for descending
- Rows open with click or Enter
- Empty results show an empty state

## Accessibility

- Visually hidden caption
- aria-sort on the sorted header
- Rows with actions are focusable

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Account manager | Account Manager |
| No candidates match | No data |

## Related

- [Side Sheet](side-sheet.md)
- [Empty State](empty-state.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
