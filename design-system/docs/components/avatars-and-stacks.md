---
title: "Avatars and stacks"
status: draft
last_updated: 2026-11-23
---

## Overview

An avatar represents a person — a photo if one's on file, otherwise initials on a colored circle. A stack overlaps several avatars to show a group (a requisition's team, a record's followers) in a compact row, with a "+N" control for whatever doesn't fit.

## When to use

Use an avatar when:
- A person needs a compact, recognizable visual reference next to their name (a user menu, a combobox option, a record's owner).

Use a stack when:
- Several people are associated with the same record and showing all of them individually would take too much space.

Don't use it:
- As the only identifier for a person with no name nearby — initials alone are often ambiguous; pair an avatar with a name except in the tightest spaces (e.g. a combobox's meta row, where the full name sits right next to it).

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Extra small** | `otto-avatar otto-avatar--xs` | Inline next to text (e.g. a combobox meta row) |
| **Small** | `otto-avatar otto-avatar--sm` | The user menu |
| **Default** | `otto-avatar` | Most list and row contexts |
| **Large** | `otto-avatar otto-avatar--lg` | A record's primary contact or profile header |
| **Navy** | `otto-avatar otto-avatar--navy` | A fallback tint distinct from the default grey, for visual variety in a stack |

## Anatomy

| Part | Description |
| --- | --- |
| Image | *(Optional)* a photo, cropped to a circle |
| Initials | Fallback when there's no photo — one or two letters |
| Stack | `otto-avatar-stack` or `otto-stack`, overlapping avatars with a white ring separating them; hovering brings one forward |
| Overflow control | `otto-stack__more`, a "+N" circle for members not individually shown |

## Behavior

- Hovering an avatar within a stack lifts it slightly and brings it to the front, to help distinguish overlapping members without needing to click.
- The overflow "+N" is a real control if it reveals the rest of the group (e.g. opens a list); otherwise it's just a static count.

## Accessibility

- Every avatar image has `alt` text of the person's name; an initials-only avatar should still have an accessible name on its container if it's not immediately followed by visible text.
- The overflow control, if interactive, needs a descriptive `aria-label` ("3 more team members"), not just "+3" read literally.

## Content

- Initials: one or two characters, derived consistently (first + last initial), not a nickname or random abbreviation.

## Related

- **Record card** — commonly shows a stack of related people.
- **User menu** (part of App shell) — the most common single-avatar usage.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: sizes, stack/overflow behavior, accessibility |
