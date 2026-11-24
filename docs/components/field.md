---
title: "Fields"
status: stable
last_updated: 2026-11-22
styling: "../styling/field-styling.md"
component: "src/components/ds/Field.tsx"
---

## Overview

Fields collect information. Labels sit above every data-entry field; helper text explains format; errors say what's wrong and how to fix it.

- Also known as: Input, text field, select, textarea
- Import: `import { Input, Select, Textarea, StaticField } from "../components/ds"`

## When to use

- Collecting short text, numbers, dates (Input)
- Choosing one option from a short known list (Select)
- Longer free text such as notes (Textarea)
- Showing read-only values in the same rhythm as a form (StaticField)

Don't use it:

- Placeholder text in data-entry fields — it reads as already filled in
- Asking for data you don't need
- Making people format data a component could parse

## Variants

| Variant | Description |
| --- | --- |
| **Input** | Single line. Optional leading icon for search. |
| **Select** | Native select with a custom chevron. Add `emptyOption` so nothing is pre-selected. |
| **Textarea** | Multi-line, vertical resize. |
| **Search** | Input with `leftIcon="search"`, a placeholder and a hidden label. |
| **Static** | Display-only field for detail views and mockups. |

## Anatomy

| Part | Description |
| --- | --- |
| Label | `--otto-text-label`, above the field |
| Required marker | Red asterisk after the label |
| Control | 44px tall, 8px radius, field fill |
| Helper text | Caption, muted, below |
| Error text | Caption with error icon; replaces helper text |

## Behavior

- Validate on submit; show every error at once and move focus to the first
- Errors stay until the value is fixed
- Two columns only for short related fields; long text spans the full width

## Accessibility

- Every control has a <label> (visually hidden for search)
- Errors and helper text are linked with aria-describedby
- Invalid fields set aria-invalid
- Required fields set the required attribute, not only the asterisk

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Email | Enter your email address here |
| Enter an email address like name@example.com. | Invalid input |
| Search by name, role or skill... | Search |

## Related

- [Autocomplete](autocomplete.md)
- [Checkbox Radio Switch](checkbox-radio-switch.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
