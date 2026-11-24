---
title: "Banners"
status: draft
last_updated: 2026-11-23
---

## Overview

A banner is a persistent, tone-colored statement about a specific condition — saved successfully, needs review, couldn't submit. Unlike a toast, it doesn't disappear on its own; it stays until the condition it describes changes or someone dismisses it.

> **Notice vs. banner vs. toast:** see [Notices](notices.md) for the full comparison. A banner is for a specific, tone-colored condition that should stay visible until resolved.

## When to use

Use a banner when:
- A condition is true right now and worth stating clearly until it changes (a form couldn't submit and the error needs to stay visible while it's fixed).

Don't use it:
- For a transient confirmation after an action — use a **toast**, which clears itself.
- For calm, always-on context with no particular tone — use a **notice**.

## Variants

| Variant | Class | Tone |
| --- | --- | --- |
| **Success** | `otto-banner otto-banner--success` | Confirms something completed (`--otto-success-800`) |
| **Info** | `otto-banner otto-banner--info` | Neutral, informational condition (`--otto-accent-200`) |
| **Warning** | `otto-banner otto-banner--warning` | Needs attention but isn't blocking (`--otto-warning-800`) |
| **Error** | `otto-banner otto-banner--error` | Blocking or failed condition (`--otto-destructive-200`) |

## Anatomy

| Part | Description |
| --- | --- |
| Container | `--otto-surface-700` fill and 1px `--otto-border`, with a 4px leading edge in the tone color. The same pattern as a toast, without the shadow |
| Icon | 20×20, tone-colored, leading |
| Title | `otto-banner__title`, short statement of the condition |
| Supporting text | *(Optional)* one line of detail or next step |

## Accessibility

- The tone is never color-only: each variant uses a distinct icon shape (check for success, triangle for warning/error) alongside the color.
- A banner that appears in response to an action (e.g. a failed submit) should be announced to assistive tech — use `role="status"` for success/info, `role="alert"` for warning/error, on the container that appears.

## Content

- Title: a short statement of the condition ("Saved", "Needs review", "Couldn't submit"), not a generic label like "Error".
- Supporting text: what happened or what to do next, in one line ("Check the highlighted fields.").

## Related

- **Notices** — calm, persistent context with no tone.
- **Toasts** — the same four tones, but transient and triggered by an action.
- **Field errors** — for validation tied to a specific field, not the form as a whole.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: tone variants, accessibility (role per tone), content |
