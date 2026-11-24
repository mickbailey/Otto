---
title: "Button"
status: stable
last_updated: 2026-11-22
styling: "../styling/button-styling.md"
component: "src/components/ds/Button.tsx"
---

## Overview

Buttons trigger an action: submit a form, open a dialog, start a flow. Links navigate; buttons act.

- Also known as: Action button, CTA
- Import: `import { Button, IconButton } from "../components/ds"`

## When to use

- The person needs to perform an action on the current page
- A form needs a submit or cancel action
- A toolbar needs an icon-only action (use IconButton)

Don't use it:

- To navigate to another page — use a link styled as a button only when it's the primary path
- For more than one primary action in the same area
- With the + icon and the word Add — use New (New activity)

## Variants

| Variant | Description |
| --- | --- |
| **Primary** | Yellow fill. The one main action in an area. Use sparingly. |
| **Secondary** | Outlined. Cancel and supporting actions next to a primary. |
| **Tertiary** | Text only, accent ink. Low-emphasis actions like View details. |
| **Ghost** | Surface fill. Toolbar and in-card actions. |
| **Destructive** | Red fill. Permanent actions: Delete, Discard. |

## Anatomy

| Part | Description |
| --- | --- |
| Container | 40px tall (32 small, 44 large), 8px radius |
| Label | Sentence case, SemiBold |
| Leading icon | Optional, 16px |
| Trailing icon | Optional, 16px, e.g. expand for menu triggers |

## Behavior

- Paired actions read secondary Cancel, then primary Submit, left to right
- Disabled buttons keep their place and show the disabled treatment; explain why nearby when it isn't obvious
- Icon-only buttons always have a label, also shown as a native tooltip

## Accessibility

- Native <button type="button"> (or type="submit" in forms)
- IconButton requires `label`, used as aria-label
- Visible 2px white focus outline (`--otto-on-surface-800`)

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Submit | Okay |
| New activity | Add new activity |
| Delete candidate | Yes |

## Related

- [Menu](menu.md)
- [Dialog](dialog.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
