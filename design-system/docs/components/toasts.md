---
title: "Toasts"
status: draft
last_updated: 2026-11-23
---

## Overview

A toast is a brief, temporary confirmation that appears after an action — "Activity logged" — then disappears on its own after a few seconds. It floats above the page content, bottom-center, and never blocks interaction with anything underneath it.

> **Notice vs. banner vs. toast:** see [Notices](notices.md) for the full comparison. A toast is the only one of the three that's temporary and action-triggered.

## When to use

Use a toast when:
- An action just completed and a brief acknowledgment is useful, but nothing on the page needs to change to show it (e.g. a background save).

Don't use it:
- For an error that needs investigation or stays relevant until fixed — use a **banner**, which persists.
- For anything the person must read before continuing — a toast can be missed, so never put a required action in one beyond a single, optional "Undo".

## Variants

| Variant | Class | Tone |
| --- | --- | --- |
| **Success** | `otto-toast otto-toast--success` | Confirms completion |
| **Info** | `otto-toast otto-toast--info` | Neutral update |
| **Warning** | `otto-toast otto-toast--warning` | Worth noting, not blocking |
| **Error** | `otto-toast otto-toast--error` | An action failed |

## Anatomy

| Part | Description |
| --- | --- |
| Icon | 20×20, tone-colored |
| Header | `otto-toast__header`, the message |
| Action | *(Optional)* `otto-toast__action`, a single text action like "Undo" |
| Region | `otto-toast-region`, fixed to the bottom-center of the viewport, stacks multiple toasts |

## Behavior

- A toast appears, stays long enough to read (several seconds), then dismisses itself automatically — it never requires a click to go away, though a close affordance can be offered.
- Multiple toasts stack in `otto-toast-region`; new ones appear below existing ones so the most recent is easiest to spot without older ones jumping around.
- Hovering a toast should pause its auto-dismiss timer so a slower reader isn't cut off.

## Accessibility

- Announce toasts via a `role="status"` (or `aria-live="polite"`) live region so assistive tech hears them without stealing focus; use `role="alert"`/assertive only for the error tone.
- Never put the *only* way to undo or correct something in a toast's action — if it's missed, there must be another way to get there.

## Content

- One short line: what happened, past tense ("Activity logged", "Couldn't save changes").
- The optional action is a single word or short verb phrase ("Undo"), never a full sentence.

## Related

- **Banners** — the persistent equivalent for a condition that should stay visible.
- **Notices** — calm, standing context, not triggered by an action.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: tone variants, auto-dismiss and stacking behavior, live-region accessibility |
