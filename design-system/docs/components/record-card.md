---
title: "Record card"
status: draft
last_updated: 2026-11-23
---

## Overview

A record card is a denser alternative to a table row: a single record (e.g. a candidate) shown with its name, key details, and a live activity feed side by side, for a list where each item needs more than a few columns can show.

## When to use

Use a record card when:
- Each item in a list has enough detail (contact info, tags, recent activity) that a table row would feel cramped or require a drill-in just to see the basics.

Don't use it:
- For a long, comparable list where columns genuinely help scanning — use a **table**.
- For a single, standalone record's full page — that's a bigger composition (see Account page), not a repeating list item.

## Anatomy

| Part | Description |
| --- | --- |
| Head | `otto-record__head`, the name and primary actions |
| Detail list | `otto-detail-list`, key facts with leading icons |
| Activity feed | `otto-record__feed`, a scrollable column of recent `otto-feed-entry` items |
| Meta pill | `otto-meta-pill`, small facts like location or date |

## Behavior

- Main details and the activity feed sit side by side on wide screens; below the container's own width threshold (not the viewport's — the card uses container queries), they stack: head, then main, then feed.
- The activity feed scrolls independently within its fixed height so a long history doesn't push the rest of the card down.
- A threaded reply within the feed (`otto-feed-entry__thread`) indents under its parent entry with a connecting rule.

## Accessibility

- The feed's scroll region should be reachable and operable by keyboard (focusable container or focusable items inside it), not a mouse-only scroll area.
- Icons in the detail list are decorative; the fact's text must stand alone without them.

## Content

- Detail list items: short, label-free facts paired with a recognizable icon (a phone icon next to a number, not "Phone: …").
- Feed entries: lead with who/what/when, then the note itself; keep each entry scannable at a glance.

## Related

- **Tables** — the denser, column-aligned alternative for simpler records.
- **Avatars and stacks** — used inside a record card's head for related people.
- **Note composer** — often the way new feed entries get added.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: anatomy, container-query stacking behavior, accessibility |
