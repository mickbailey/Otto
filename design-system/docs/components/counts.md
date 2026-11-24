---
title: "Counts"
status: draft
last_updated: 2026-11-23
---

## Overview

A count is a small circular or pill-shaped badge holding a number — unread notifications, items in a filtered list, candidates attached to a requisition. It's the numeric-only sibling of a badge: same visual weight, but it always contains a digit, not a status word.

## When to use

Use a count when:
- A number needs to sit next to a label, icon, or nav item to show "how many" (a sidenav item's unread count, a filter's result count).

Don't use it:
- For a status word — use a **badge**.
- For a number that's the primary content of what you're looking at (a table's score column, a KPI) — a count is for a secondary, at-a-glance number next to something else, not the main data point.

## Anatomy

| Part | Description |
| --- | --- |
| Number | Tabular figures so the width doesn't jump as the value changes |
| Container | `otto-count`, pill-shaped, `--otto-accent-200` background |

## Behavior

- A count that can reach double or triple digits still fits on one line — the pill widens rather than wrapping or truncating. For very large numbers, cap the displayed value (e.g. "99+") rather than letting the badge grow indefinitely.
- A count updates in place as the underlying number changes; it doesn't need its own loading state for a simple increment/decrement.

## Accessibility

- If the count sits beside an icon-only control (e.g. a bell icon with an unread count), make sure the combined accessible name states the number ("Notifications, 3 unread"), not just the digit alone with no context.
- Don't use a count as the only way to convey "zero" vs. "some" — hide it entirely at zero rather than showing an empty or "0" badge that still draws the eye.

## Content

- Digits only. No label, no unit, no punctuation.

## Related

- **Badges** — status words instead of numbers.
- **Pagination** — page numbers use their own button styling, not counts.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use vs. badges, behavior at scale, accessibility |
