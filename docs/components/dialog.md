---
title: "Dialog"
status: stable
last_updated: 2026-11-22
styling: "../styling/dialog-styling.md"
component: "src/components/ds/Overlay.tsx"
---

## Overview

A modal window for confirmations and short, focused tasks. Use one cancel dialog for every exit from a form.

- Also known as: Modal
- Import: `import { Dialog } from "../components/ds"`

## When to use

- Confirming a destructive or irreversible action
- Discarding unsaved work

Don't use it:

- Long forms — use a page or side sheet
- Information people need while working on the page

## Variants

| Variant | Description |
| --- | --- |
| **Default** | 480px wide |

## Anatomy

| Part | Description |
| --- | --- |
| Scrim | 72% surface-900 |
| Header | Title and close button |
| Body | Content |
| Footer | Secondary then primary/destructive action |

## Behavior

- Focus moves in and is trapped; it returns to the trigger on close
- Escape or the scrim closes it
- In cancel dialogs the destructive choice (Discard, Delete) is the primary action

## Accessibility

- role="dialog" with aria-modal and aria-labelledby
- Close button labeled "Close"

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Discard this activity? | Are you sure? |
| Keep editing / Discard | No / Yes |

## Related

- [Side Sheet](side-sheet.md)
- [Button](button.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
