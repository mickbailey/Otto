---
title: "Checkbox, Radio and Switch"
status: stable
last_updated: 2026-11-22
styling: "../styling/checkbox-radio-switch-styling.md"
component: "src/components/ds/Field.tsx"
---

## Overview

Selection controls let people choose options. Checkboxes pick any number, radios pick exactly one, switches turn a setting on or off immediately.

- Also known as: Selection controls, toggle
- Import: `import { Checkbox, RadioGroup, Switch } from "../components/ds"`

## When to use

- Checkbox: independent options, or one opt-in
- Radio: one choice from 2–5 visible options
- Switch: a setting that takes effect right away

Don't use it:

- A switch inside a form that needs Submit — use a checkbox
- Radios for more than about 5 options — use a select or autocomplete
- Hiding options that currently have no results

## Variants

| Variant | Description |
| --- | --- |
| **Checkbox** | Square, yellow when checked. |
| **Radio group** | Round, stacked by default; `inline` for short labels. |
| **Switch** | Track turns navy when on. |

## Anatomy

| Part | Description |
| --- | --- |
| Control | 20px box or circle; switch 40×24 |
| Label | Body text to the right, clickable |
| Group label | Radio groups use a legend |

## Behavior

- Conditional follow-up questions appear directly after the control that reveals them
- Disabled options stay visible, with the control border and label in `--otto-on-surface-400`

## Accessibility

- Native inputs inside labels
- Radio groups use fieldset + legend
- Switch sets role="switch"

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Open to relocation | Relocation? |
| Email notifications | Turn on email notifications toggle |

## Related

- [Field](field.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
