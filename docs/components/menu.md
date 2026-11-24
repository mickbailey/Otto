---
title: "Menu"
status: stable
last_updated: 2026-11-22
styling: "../styling/menu-styling.md"
component: "src/components/ds/Menu.tsx"
---

## Overview

A temporary list of actions or choices, opened from a button, icon or field.

- Also known as: Dropdown menu, overflow menu, action list
- Import: `import { Menu, MenuTrigger } from "../components/ds"`

## When to use

- 5 or more actions in a small space
- Overflow actions on table rows
- Multi-select filters

Don't use it:

- Fewer than 5 options unless space is tight
- Deeply nested submenus

## Variants

| Variant | Description |
| --- | --- |
| **Default** | 10px 16px item padding |
| **Condensed** | 6px 12px for tables and toolbars |
| **One-line / two-line** | Optional secondary text under the label |
| **Single-select** | Closes on pick; trailing check marks the current value |
| **Multi-select** | Stays open; leading checks |

## Anatomy

| Part | Description |
| --- | --- |
| Surface | Raised surface, 8px radius, menu shadow |
| Item | Optional 18px leading icon, label, secondary text |
| Divider | Separates groups, especially destructive actions |

## Behavior

- Opens below and left-aligned to the trigger (`align="right"` near the edge)
- Closes on outside click, Escape or a single-select pick; focus returns to the trigger
- Up/Down, Home/End move; Enter/Space select
- Max height 320px, min width 200px

## Accessibility

- Single-select: role="menu" / "menuitem"
- Multi-select: role="listbox" with aria-multiselectable and aria-selected
- Trigger sets aria-haspopup and aria-expanded

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Submit to requisition | Submit |
| Delete candidate | Remove forever |

## Related

- [Button](button.md)
- [Autocomplete](autocomplete.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
