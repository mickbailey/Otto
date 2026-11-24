---
title: "Note composer"
status: draft
last_updated: 2026-11-23
---

## Overview

The note composer is a single-line input that grows into a small form once focused — a note type selector and a Post button appear below the textarea — then collapses back to one line when it's empty and loses focus. It's for adding a quick note or activity entry without opening a dialog.

## When to use

Use the note composer when:
- Someone needs to add a short, informal entry (a note, a quick update) directly into a feed or record, without the weight of a full form or dialog.

Don't use it:
- For structured data entry with several distinct fields — use a regular form with **fields**.
- For a reply that needs to reference a specific prior entry in a thread — that's part of the activity feed's own threading, not the composer.

## Anatomy

| Part | Description |
| --- | --- |
| Input | `otto-note__input`, a single-line textarea that expands when the composer opens |
| Type selector | `otto-note__type`, a dropdown-style control for the kind of entry being added |
| Post button | `otto-note__post`, right-aligned, submits the note |

## Behavior

- Collapsed (unfocused, empty): a single line, minimal height, matching a plain input visually.
- Open (`otto-note--open`, on focus or once text is entered): grows to a multi-line textarea and reveals the type selector and Post button below it.
- The whole composer's border carries the focus ring, not the bare textarea inside it, so the expand/collapse doesn't cause the ring to jump.
- Collapses back to one line once it's empty and loses focus; it doesn't stay open with no content.

## Accessibility

- The textarea has an accessible name (a visible label or `aria-label`) even though it visually looks like a placeholder-only field when collapsed.
- The type selector is a real button exposing its current value and opening a menu — not a plain-text label that happens to be clickable.
- Post is a real `<button>`, disabled (not hidden) until there's content to submit, so its presence is predictable.

## Content

- Placeholder: an inviting, specific prompt ("Add a note…"), not a generic "Type here."
- Post button label stays "Post" (or the equivalent verb for the context) — short, and consistent wherever the composer appears.

## Related

- **Record card** — the activity feed the note composer typically adds to.
- **Fields** — for structured input the composer intentionally avoids.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: collapsed/open behavior, focus-ring placement, accessibility |
