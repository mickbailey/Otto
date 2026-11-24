---
title: "Empty states"
status: draft
last_updated: 2026-11-23
---

## Overview

An empty state fills the space a list, table or panel would otherwise show, when there's genuinely nothing to display — no results, no data yet, nothing matching the current filters. It replaces a blank, silent gap with a clear statement of why it's empty and, where possible, a way out.

## When to use

Use an empty state when:
- A list, table, or search has zero items to show — whether because nothing exists yet or because filters/search removed everything.

Don't use it:
- While data is still loading — that's a loading state, not an empty one; showing "No results" before the real answer arrives is misleading.
- For a single missing field inside an otherwise-populated record — that's just absent content, not an empty state.

## Anatomy

| Part | Description |
| --- | --- |
| Icon | *(Optional)* a simple, relevant illustration of the empty condition |
| Title | `otto-empty__title`, short statement of what's missing |
| Text | `otto-empty__text`, one line of explanation or next step |
| Action | *(Optional)* a button for the most useful next step (e.g. "Reset filters") |

## Behavior

- An empty state replaces the list/table content area entirely — it isn't an overlay on top of a stale list.
- If the emptiness is caused by filters or a search query, offer the action that undoes it ("Reset filters") rather than only describing the problem.

## Accessibility

- The title is a real heading (or at least `role="heading"`-equivalent emphasis) so assistive tech can jump to it like any other section content.
- Any icon is decorative (`aria-hidden="true"`); the title and text alone must convey the full meaning.

## Content

- Title: states the condition plainly ("No results", not a vague "Nothing here").
- Text: explains why, and what to try next, in one sentence ("Try removing a filter or widening the search.").
- Distinguish "nothing exists yet" (first-use empty state, often inviting creation) from "filtered to nothing" (inviting a filter reset) — the right next step differs.

## Related

- **Tables** — the most common content area that needs an empty state.
- **Pagination** — shouldn't appear alongside an empty state with zero results.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: loading vs. empty distinction, first-use vs. filtered-to-zero content guidance |
