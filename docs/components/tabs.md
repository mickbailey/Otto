---
title: "Tabs"
status: stable
last_updated: 2026-11-22
styling: "../styling/tabs-styling.md"
component: "src/components/ds/Tabs.tsx"
---

## Overview

Tabs switch between views where only one is shown at a time, such as a record's Overview and Activity.

- Also known as: Tab bar
- Import: `import { Tabs } from "../components/ds"`

## When to use

- Related content that people view one part of at a time
- Peer views of the same object

Don't use it:

- Sequential steps — use a stepper
- Sections of one long page — use In-page navigation
- App-level navigation

## Variants

| Variant | Description |
| --- | --- |
| **Default** | Text tabs with a navy underline on the selected tab. |

## Anatomy

| Part | Description |
| --- | --- |
| Tab list | Row with a bottom border; scrolls horizontally when tight |
| Tab | 15px label, Title Case |
| Indicator | 3px `--otto-accent-200` bar under the selected tab |
| Panel | Content for the selected tab |

## Behavior

- Left/Right arrows move between tabs, Home/End jump
- Only the selected tab is in the tab order

## Accessibility

- role="tablist", "tab" and "tabpanel" with aria-selected, aria-controls and aria-labelledby
- Selected state isn't color alone: weight changes too

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Overview | Overview Tab |
| Requisitions | Reqs |

## Related

- [In Page Navigation](in-page-navigation.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
