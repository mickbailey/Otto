---
title: "Notices"
status: draft
last_updated: 2026-11-23
---

## Overview

A notice is a persistent, low-urgency inline message giving context about the content near it — most often an AI-disclaimer ("Requisition summary and screening questions use AI. Check for accuracy.") or a quiet informational hint. It sits in the flow of the page, not as an overlay, and it doesn't go away on its own.

> **Notice vs. banner vs. toast:** a notice is calm, persistent, inline context. A banner is a stronger, persistent statement about a specific condition (success/warning/error) and usually sits at the top of a section. A toast is brief, temporary, and appears in response to an action, then disappears on its own.

## When to use

Use a notice when:
- Content needs a standing disclaimer or hint that should always be visible while it's relevant (an AI-use notice, a quiet tip).

Don't use it:
- For a time-sensitive success/error state tied to one action — use a **toast** or **banner**.
- For a blocking confirmation — use a **dialog**.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Plain** | `otto-notice` | An unobtrusive hint that blends into the surrounding panel |
| **Boxed** | `otto-notice otto-notice--boxed` | A notice that needs a visible container to stand apart from adjacent content (`--otto-accent-900` fill, `--otto-accent-800` border) |

## Anatomy

| Part | Description |
| --- | --- |
| Icon | 20×20, leading, `aria-hidden="true"` |
| Message | The notice text |

## Accessibility

- A notice is static content; it doesn't need `role="status"` or `role="alert"` since it isn't announcing a change — it's always-there context, read in document order like any other text.
- The icon is decorative and hidden from assistive tech; the message text alone must carry the full meaning.

## Content

- Calm, factual tone — state what's true, not an instruction or a warning ("…use AI. Check for accuracy.", not "Warning: AI-generated").
- Keep it to one short sentence or two; a notice that needs a paragraph belongs in a panel section instead.

## Related

- **Banners** — a stronger, tone-colored statement about success/warning/error.
- **Toasts** — brief, temporary feedback after an action.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: notice vs. banner vs. toast, variants, accessibility |
