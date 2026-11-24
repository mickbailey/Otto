---
title: "Banner"
status: stable
last_updated: 2026-11-22
styling: "../styling/banner-styling.md"
component: "src/components/ds/Overlay.tsx"
---

## Overview

An inline, persistent message tied to a page or section. It stays until the situation changes.

- Also known as: Inline alert, callout
- Import: `import { Banner } from "../components/ds"`

## When to use

- A state that affects the whole page (a requisition on hold)
- An AI or data-quality caveat
- A page-level error

Don't use it:

- Confirming an action — use a Toast
- More than one or two per page

## Variants

| Variant | Description |
| --- | --- |
| **Info** | Blue |
| **Success** | Green |
| **Warning** | Orange |
| **Error** | Red |

## Anatomy

| Part | Description |
| --- | --- |
| Container | Raised surface with a border and a 4px leading edge in the tone color, like a toast without the shadow |
| Icon | 20px |
| Title | Optional bold line |
| Message | Body |
| Action | Optional button |

## Behavior

- Sits at the top of the region it describes
- Not dismissible by default

## Accessibility

- role="status" (role="alert" for errors)
- Meaning carried by text, not just color

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| This requisition is on hold. Submittals are paused. | Warning! |

## Related

- [Toast](toast.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
