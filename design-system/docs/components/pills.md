---
title: "Pills"
status: draft
last_updated: 2026-11-23
---

## Overview

A pill is a small, outlined, icon-led label for a single piece of metadata — "Remote", a date, a location. It sits between a tag (no icon, pure category) and a badge (no icon, pure status): a pill's leading icon does some of the communicating, so the label itself can stay short.

- `otto-meta-pill` (slightly larger, square-cornered) and `otto-loc` (for a location specifically) share the same pattern for denser metadata rows, e.g. in a record card's header.

## When to use

Use a pill when:
- One fact about a record needs an icon plus a short label (a work-mode pill, a date, a location) inline with other metadata.

Don't use it:
- For a removable, chosen value — use a **chip**.
- For a plain category label with no natural icon — a **tag** is simpler.

## Anatomy

| Part | Description |
| --- | --- |
| Icon | 12×12 (`otto-pill`) or 16×16 (`otto-meta-pill`), `aria-hidden="true"` |
| Label | The fact being shown |
| Container | Pill-shaped (`otto-pill`) or slightly squared (`otto-meta-pill`), outlined |

## Accessibility

- The icon is decorative; the label text must stand on its own without it (never rely on the icon shape to convey meaning no text repeats).
- Pills aren't interactive — no focus, hover or role needed unless one becomes clickable, in which case give it real button semantics.

## Content

- Short and literal: a single fact ("Remote", "Red Oak, TX", "Nov 9, 2026"), never a sentence.

## Related

- **Tags** — the icon-free equivalent for plain category labels.
- **Badges** — a status word instead of a metadata fact.
- **Record card** — a common home for rows of metadata pills.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: pill vs. meta-pill/loc, when to use vs. tags, accessibility |
