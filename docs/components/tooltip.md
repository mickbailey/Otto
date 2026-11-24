---
title: "Tooltip"
status: stable
last_updated: 2026-11-22
styling: "../styling/tooltip-styling.md"
component: "src/components/ds/Page.tsx"
---

## Overview

A short label that appears on hover and focus.

- Also known as: Hint
- Import: `import { Tooltip } from "../components/ds"`

## When to use

- Naming icon-only controls (IconButton also sets a native tooltip)
- Short clarifications

Don't use it:

- Essential information or anything people must act on
- Interactive content

## Variants

| Variant | Description |
| --- | --- |
| **Default** | Inverse surface above the target |

## Anatomy

| Part | Description |
| --- | --- |
| Container | Light inverse surface, 4px radius |
| Text | 12px SemiBold |

## Behavior

- Shows on hover and keyboard focus; hides on leave and blur

## Accessibility

- role="tooltip" linked with aria-describedby while visible

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Copy link | Click this button to copy the link |

## Related

- [In Page Navigation](in-page-navigation.md)
- [Button](button.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
