---
title: "Tables"
status: draft
last_updated: 2026-11-23
---

## Overview

A table shows a list of records as rows and columns, for scanning and comparing many items at once — a candidate list, a requisition list. It's the system's default for structured, multi-column data; a single column of records usually reads better as a list of record cards instead.

## When to use

Use a table when:
- Data has several comparable attributes per row (name, stage, score) that benefit from column alignment.
- People need to scan down a column (e.g. comparing scores) as much as across a row.

Don't use it:
- For a small number of fields per item with no real column-to-column comparison — a record card or a list is usually clearer.
- For data that needs a rich per-item layout (avatars, activity feeds, multi-line text) — a **record card** scales better than a wide table row.

## Anatomy

| Part | Description |
| --- | --- |
| Header row | Column labels, `otto-text-label` weight, muted color |
| Body rows | One record per row; `tbody tr:hover` highlights the row |
| Numeric column | `is-num`, right-aligned with tabular figures |
| Record link | `otto-table-link` for a row's primary identifying column (e.g. candidate name) |
| Wrapper | `otto-table-wrap` scrolls horizontally on narrow screens instead of squeezing columns |

## Behavior

- Rows highlight on hover to help horizontal scanning; this is a hover affordance only, not a selection state.
- On narrow screens, the table scrolls horizontally inside `otto-table-wrap` rather than wrapping cell content or hiding columns silently.

## Accessibility

- Use a real `<table>` with `<th>` for headers (`scope="col"` for column headers) — never a grid of `<div>`s styled to look like a table.
- A row's primary link (`otto-table-link`) should be reachable and operable by keyboard like any link; don't make the whole row a non-native click target without an equivalent focusable link inside it.
- Numeric alignment (`is-num`) is visual only — it doesn't change how the value is announced.

## Content

- Column headers: short noun phrases, Title Case or Sentence case consistent with the rest of the page.
- Keep cell content to one line where possible; if a value is naturally long, truncate with a full value available on hover/focus rather than wrapping and breaking row height consistency.

## Related

- **Pagination** — typically paired with a table to limit rows per page.
- **Record card** — an alternative to a table row when a record needs richer per-item content.
- **Empty states** — what a table shows when there are no rows.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use vs. record cards, anatomy, responsive behavior, accessibility |
