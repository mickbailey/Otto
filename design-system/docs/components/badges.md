---
title: "Badges"
status: draft
last_updated: 2026-11-23
---

## Overview

A badge is a small, static label that marks a status or category on or next to other content — "New" on a card header, a record's stage, a branching exploration's state. A badge never carries an action of its own; clicking the thing it's attached to (a row, a card) is fine, but the badge itself isn't a button.

## When to use

Use a badge when:
- A short, fixed piece of status needs to sit inline with other content without its own row (next to a title, in a table cell, in a card header).
- The set of possible values is small, known and stable (a handful of stages or categories).

Don't use it:
- For a numeric count — use **Counts**.
- For a removable, user-chosen value — use a **chip**.
- For a longer category label people scan a list of — a **tag** reads better at that density.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Default** | `otto-badge` | A neutral status with no particular urgency |
| **Primary** | `otto-badge otto-badge--primary` | A highlighted status worth drawing the eye to (e.g. "New"). `--otto-primary-200` fill, `--otto-primary-800` text |
| **Navy** | `otto-badge otto-badge--navy` | A status that should read as selected/active without using primary yellow. `--otto-accent-800` fill |
| **Error** | `otto-badge otto-badge--error` | A failed or blocked status. `--otto-destructive-900` fill, white text |
| **Exploration / Candidate / Final** | `otto-badge otto-badge--exploration/--candidate/--final` | Branch status pills marking where a UX exploration sits in its lifecycle. Final uses a `--otto-on-surface-300` fill with `--otto-success-200` text |

## Anatomy

| Part | Description |
| --- | --- |
| Label | 1–2 words, uppercase via `otto-text-overline`'s letter-spacing |
| Container | A single inline element, never interactive |

## Accessibility

- A badge's meaning must never rely on color alone — pair it with a legible label every time (not just a colored dot).
- If a badge is purely decorative alongside a status already stated in text nearby, mark its icon (if any) `aria-hidden="true"` so it isn't announced twice.

## Content

- One or two words, Sentence case in running UI text but the component itself renders as an overline (uppercase, letter-spaced) — write the label as a short status word ("New", "Final", "Error"), not a sentence.
- Keep the badge vocabulary small and consistent across the product; don't invent a new status word where an existing one already fits.

## Related

- **Counts** — a number, not a status word.
- **Chips** — removable, user-chosen values rather than fixed statuses.
- **Tags** — denser lists of category labels.
- **Pills** — a status/metadata label that includes a leading icon.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: variants including branch status pills, accessibility, content |
