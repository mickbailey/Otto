---
title: "Autocomplete"
status: stable
last_updated: 2026-11-22
styling: "../styling/autocomplete-styling.md"
component: "src/components/ds/Autocomplete.tsx"
---

## Overview

A searchable select for long lists. People type to filter and pick one option, which then shows as a removable chip inside the field.

- Also known as: Combobox, typeahead, searchable select
- Import: `import { Autocomplete, highlight } from "../components/ds"`

## When to use

- Choosing from a long list (requisitions, people, countries)
- When people know part of the name they're looking for

Don't use it:

- Short lists of 5 or fewer — use radios or a select
- Free text entry that doesn't need to match a list

## Variants

| Variant | Description |
| --- | --- |
| **Default** | Label above, plain option rows. |
| **Rich options** | `renderOption` for multi-line rows, e.g. title, client, account manager and hiring manager. |

## Anatomy

| Part | Description |
| --- | --- |
| Control | Search icon, selected chip, text input |
| Menu | Panel below the control, 360px max height |
| Option | Title, optional secondary lines; matches in bold |
| Footer | Live count of matches |

## Behavior

- Opens on focus; filters as you type
- Up/Down move, Enter picks, Escape closes
- Backspace in an empty field removes the chip
- Picking closes the menu and keeps focus in the field

## Accessibility

- role="combobox" input with aria-expanded, aria-controls and aria-activedescendant
- Options use role="option" with aria-selected
- Match count is announced politely

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Search by title, client or AM... | Type here |
| No matches | Error: nothing found! |

## Related

- [Field](field.md)
- [Menu](menu.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
