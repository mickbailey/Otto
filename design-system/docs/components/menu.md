---
title: "Menu"
status: draft
last_updated: 2026-11-23
---

## Overview

A menu is a popover list of actions or choices, opened from a trigger (usually an icon button) and dismissed once a choice is made or the person clicks elsewhere. It's lighter-weight than a dialog — nothing blocks the page behind it.

## When to use

Use a menu when:
- A control (often a "more options" icon button) needs to offer several related actions without taking up permanent space.
- A short list of mutually exclusive choices (e.g. "move to stage") needs a lightweight picker.

Don't use it:
- For a single action — just use a button.
- For a longer form or anything needing more than a short list of items — use a **dialog** or **side sheet**.

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Default** | `otto-menu` | Standard item height and padding |
| **Condensed** | `otto-menu otto-menu--condensed` | A denser list, e.g. many short items |

## Anatomy

| Part | Description |
| --- | --- |
| Item | `otto-menu__item`, an icon, label, and optional secondary text or trailing check |
| Divider | `otto-menu__divider`, separates groups of items (e.g. destructive actions from the rest) |
| Destructive item | `otto-menu__item--destructive`, colored to warn before an irreversible action |

## Behavior

- Opens anchored to its trigger; closes on selecting an item, pressing Escape, or clicking outside.
- A checked item (`otto-menu__check`) shows the current choice among mutually exclusive options; selecting another moves the check.
- Disabled items (`aria-disabled="true"`) stay visible but inert, so people can see what exists without it being actionable right now.

## Accessibility

- The trigger has `aria-haspopup="menu"` and `aria-expanded`; the menu itself is `role="menu"` with `role="menuitem"` items.
- Arrow keys move between items; Escape closes the menu and returns focus to the trigger.
- A destructive item still needs a clear, specific label ("Delete", not just a red color) — color alone never signals the risk.

## Content

- Each item: a short verb phrase ("Edit", "Move to stage", "Delete"), with optional secondary text for extra context, never a full sentence.
- Group related items together and separate distinct groups (especially destructive ones) with a divider.

## Related

- **Icon buttons** — the usual trigger for a menu.
- **Dialog and side sheet** — for anything heavier than a short list of actions.
- **Tooltip** — can label the trigger, not the menu itself.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: anatomy, keyboard behavior, destructive-item accessibility |
