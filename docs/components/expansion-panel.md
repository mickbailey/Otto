---
title: "Expansion Panel"
status: stable
last_updated: 2026-11-22
styling: "../styling/expansion-panel-styling.md"
component: "src/components/ds/Page.tsx"
---

## Overview

Groups a long form or page into titled sections people can open and close.

- Also known as: Accordion, collapsible section
- Import: `import { ExpansionPanel } from "../components/ds"`

## When to use

- Long forms with several topics
- Optional or repeated groups such as references

Don't use it:

- Hiding required fields people will miss
- Content everyone needs to see

## Variants

| Variant | Description |
| --- | --- |
| **Default** | Card surface with chevron |

## Anatomy

| Part | Description |
| --- | --- |
| Header | 56px, subtitle text, chevron |
| Body | Fields or content |

## Behavior

- Open by default when it holds required fields
- Chevron rotates when open

## Accessibility

- Native <details>/<summary>: keyboard and screen readers work without extra code

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Work History | Click to expand |

## Related

- [In Page Navigation](in-page-navigation.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
