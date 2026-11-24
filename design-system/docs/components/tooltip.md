---
title: "Tooltip"
status: draft
last_updated: 2026-11-23
---

## Overview

A tooltip is a small label that appears on hover or focus to supplement — never replace — an element's accessible name. It's used both as a standalone popover (`otto-tooltip`) and as the built-in labeling mechanism for the collapsed in-page navigation rail.

## When to use

Use a tooltip when:
- An icon-only control's meaning could use a little extra confirmation on hover/focus, in addition to its `aria-label`.
- The collapsed variant of in-page navigation needs to show a link's label on hover/focus.

Don't use it:
- As the *only* way to learn a control's purpose — anything that needs a tooltip to be understood should also have a real accessible name (`aria-label`) that doesn't depend on hover.
- For content someone must read to proceed — tooltips are easy to miss, especially on touch.

## Anatomy

| Part | Description |
| --- | --- |
| Label | Short text, one line where possible |
| Container | `otto-tooltip`, positioned near its trigger; for in-page navigation, a CSS-only `::before` driven by `data-tooltip` |

## Behavior

- Appears on hover and on keyboard focus (never on focus alone without hover, or vice versa — both must trigger it).
- Disappears on blur/mouse-leave, or on Escape while focused.
- Never contains interactive content (a link or button) — if the content needs to be clickable, use a popover-style component instead.

## Accessibility

- A tooltip supplements an existing accessible name; it's exposed via `aria-describedby` pointing at the tooltip text, not by replacing `aria-label`.
- Must be dismissible without moving the pointer (Escape) and without moving focus away from the trigger.
- Never rely on tooltips to convey information with no other access path on touch devices, which have no hover.

## Content

- Short — a few words, not a sentence. If it needs to be longer, the control probably needs a visible label instead.

## Related

- **Icon buttons** — tooltips commonly supplement their `aria-label`.
- **In-page navigation** — the collapsed variant uses the CSS tooltip pattern for its labels.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: supplement-not-replace accessibility rule, hover+focus behavior |
