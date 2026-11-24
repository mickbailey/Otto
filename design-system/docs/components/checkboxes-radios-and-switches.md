---
title: "Checkboxes, radios and switches"
status: draft
last_updated: 2026-11-23
---

## Overview

Three related controls for simple choices outside the field shell: a **checkbox** for an independent on/off choice (often one of several), a **radio** for choosing exactly one from a visible set of options, and a **switch** for an immediate on/off setting that takes effect right away rather than waiting for a form submit.

> **Checkbox vs. radio vs. switch:** a checkbox can be one of many checked at once, or a single yes/no inside a form. A radio is always one of a mutually exclusive group. A switch changes a live setting immediately — it isn't part of a form that needs submitting.

## When to use

Use a checkbox when:
- Someone can select any number of independent options (zero, one, or many) — e.g. "Email updates", "SMS updates" as separate toggles.

Use a radio when:
- Exactly one option must be chosen from a visible, small set.

Use a switch when:
- A setting takes effect immediately on toggle, with no separate save step (e.g. "Enabled").

Don't use any of them:
- For choosing from a long list — a **select** or **combobox** scales better than many radios.

## Anatomy

| Part | Description |
| --- | --- |
| Control | `otto-check input[type=checkbox\|radio]` or `otto-switch input` |
| Label | Always present, wrapping or paired with the control via `otto-check`/`otto-switch` |

## Behavior

- Checkbox and radio reflect a pending choice inside a form — nothing happens until the form is submitted.
- A switch applies its new state immediately; there's no separate confirm step.
- Disabled state uses `--otto-on-surface-400` for the control's border and for its label, together; a disabled checked control swaps its fill to `--otto-on-surface-300`. It stays visible; nothing is faded with opacity.

## Accessibility

- Each control is a native `<input type="checkbox">` / `<input type="radio">` / the switch's checkbox-styled-as-a-switch — never a styled `<div>` standing in for one.
- Radios in the same group share a `name` so assistive tech and keyboard arrow navigation treat them as one set.
- A switch's accessible state should be announced as on/off (via its native `checked` state), not just visually implied by position.
- Labels are programmatically associated (wrapping the input, or `for`/`id`) — never a plain text node sitting unassociated next to the control.

## Content

- Label text states the choice plainly ("Email updates"), not a question ("Do you want email updates?").

## Related

- **Fields** — the text/select/textarea family these sit outside of.
- **Pills** — not an alternative input, but sometimes shown alongside a switch to indicate current state.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: checkbox vs. radio vs. switch distinction, native-control accessibility |
