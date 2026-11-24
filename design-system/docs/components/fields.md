---
title: "Fields"
status: draft
last_updated: 2026-11-23
---

## Overview

A field is a single labeled piece of form input: a text input, a select, a textarea, or a read-only "static" field that displays a value without letting it be edited inline. Every field type shares the same label, help-text and error treatment, so a form reads consistently regardless of which control type a question needs.

- Also known as: form field, input field.
- A field is always labeled — there's no unlabeled variant.

## When to use

Use a field when:
- A person needs to enter or choose a single value as part of a form.
- A value needs to be shown but not edited in this context — use the **static** variant rather than a plain line of text, so it still lines up with the editable fields around it.

Don't use it:
- For search-as-you-type over a large result set — use **Search** or **Combobox**.
- For a single yes/no or on/off choice — use a checkbox or switch (see Checkboxes, radios and switches).

## Variants

| Variant | Class | Use for |
| --- | --- | --- |
| **Input** | `otto-input` | A single line of free text |
| **Select** | `otto-select` | Choosing one value from a short, known list |
| **Textarea** | `otto-textarea` | Multi-line free text (notes, descriptions) |
| **Static** | `otto-input otto-input--static` | A read-only value shown in the shape of a field (e.g. a value pulled from a resume, not editable here) |

Two fields side by side use `otto-field-row`; it collapses to one column on narrow screens.

## Anatomy

| Part | Description |
| --- | --- |
| Label | `otto-label`, always visible, above the control |
| Required marker | *(Optional)* `otto-required`, a trailing asterisk after the label text |
| Control | The input, select, textarea, or static display |
| Leading/trailing icon | *(Optional)* e.g. a calendar icon on a date field |
| Help text | *(Optional)* `otto-field__help`, below the control, for guidance that applies regardless of validity |
| Error message | *(Optional)* `otto-field__error`, below the control, replaces help text when the field is invalid |

## Behavior

- Hover lightens the border; focus shows a 1px `--otto-on-surface-800` ring on the field itself, not the bare native control.
- An invalid field sets `aria-invalid="true"`, which turns the border `--otto-destructive-200` and is paired with a `otto-field__error` message — color is never the only signal.
- A field shows either help text or an error message at a time, never both.

## Accessibility

- Every control has a programmatically associated label (a `<label>` wrapping it, or `for`/`id`).
- `aria-invalid="true"` is set on the control itself when `otto-field__error` is shown, and removed once the value is valid.
- The required marker is visual; also expose `required` or `aria-required="true"` on the control so assistive tech announces it.
- Static fields use a non-interactive container (a `<div>`, not a disabled input) so they're not mistaken for an editable-but-disabled control.

## Content

- Label: Sentence case, a short noun phrase ("Current role", not "What is your current role?").
- Help text explains format or constraints ("At least 8 characters"), not what the field obviously already says.
- Error messages state what to do, not just what's wrong ("Enter a valid email address", not "Invalid").

## Related

- **Search** — a dedicated text field for querying, not for arbitrary form input.
- **Combobox** — search-to-select from a list, with richer option content than a plain select.
- **Checkboxes, radios and switches** — single-choice and on/off controls outside the field shell.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: input/select/textarea/static variants, help/error states, accessibility |
