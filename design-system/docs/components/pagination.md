---
title: "Pagination"
status: draft
last_updated: 2026-11-23
---

## Overview

Pagination splits a long list or table into pages and lets someone move between them — previous/next and a small set of page numbers, plus a result count. It's the default for large, flat lists where infinite scroll would make it hard to return to a specific position.

## When to use

Use pagination when:
- A list or table has more rows than comfortably fit on one screen and people may want to jump to a specific page or know how many results there are.

Don't use it:
- For a short list that already fits on screen — don't add pagination controls with nothing to paginate.
- For a feed meant to be scrolled continuously with no notion of "page" — that's a different pattern entirely.

## Anatomy

| Part | Description |
| --- | --- |
| Result count | e.g. "12 results", leading |
| Page buttons | `otto-pagination__pages`, previous/next arrows plus numbered pages |
| Current page | `aria-current="page"`, filled with `--otto-accent-200` |

## Behavior

- Previous/next disable at the first/last page rather than wrapping around.
- Changing pages scrolls the associated list/table back into view if it had scrolled out of view, so the result of the click is visible.

## Accessibility

- The container is `<nav aria-label="Pagination">`; each page control is a real `<button>`.
- The current page uses `aria-current="page"` in addition to its fill color — never color alone.
- Previous/next arrows have an `aria-label` ("Previous", "Next") since they're icon-only.

## Content

- Result count states the total, not just the current page's count ("12 results", not "Page 1").
- Page numbers are digits only; previous/next use icons with accessible labels, not text like "Prev"/"Next" that would need translating inconsistently.

## Related

- **Tables** — the most common thing pagination is paired with.
- **Empty states** — what to show if a filter leaves zero results, instead of an empty paginated page.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: anatomy, boundary behavior, accessibility |
