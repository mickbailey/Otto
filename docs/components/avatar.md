---
title: "Avatar"
status: stable
last_updated: 2026-11-22
styling: "../styling/avatar-styling.md"
component: "src/components/ds/Avatar.tsx"
---

## Overview

Represents a person with a photo or initials. Stacks show a team and celebrate the people working an account.

- Also known as: Profile image, initials, team stack
- Import: `import { Avatar, AvatarStack } from "../components/ds"`

## When to use

- Next to a person's name in lists, activity and menus
- To show the team on an account or requisition

Don't use it:

- As the only way to identify someone — show the name nearby or in the label

## Variants

| Variant | Description |
| --- | --- |
| **Sizes** | xs 24, sm 28, md 32, lg 56 |
| **Navy** | Navy fill for people in data; grey for the signed-in user |
| **Stack** | Overlapping, ends with +N |

## Anatomy

| Part | Description |
| --- | --- |
| Circle | Photo or initials |
| Overflow | +N in a surface circle |

## Behavior

- Initials use the first letters of the first two words
- Stack members lift 2px on hover

## Accessibility

- role="img" with the person's name
- Stacks announce the total number of people

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| MO | Marisol |

## Related

- [Chip](chip.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
