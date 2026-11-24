---
title: "Search"
status: draft
last_updated: 2026-11-23
---

## Overview

Search is a dedicated text field for querying a list or dataset — a single input with a leading search icon and no dropdown of its own. When typing needs to open a list of matching options to pick from, that's a **combobox**, not search.

## When to use

Use search when:
- Someone types free text to filter a list or table shown elsewhere on the page (e.g. filtering a candidate list), with no need to select a single structured option from a dropdown.

Don't use it:
- When the goal is to pick one specific record from a list of options as you type — use **Combobox**.
- For a single field in a form that just happens to be text — use a plain **field**.

## Anatomy

| Part | Description |
| --- | --- |
| Icon | 20×20, leading, `aria-hidden="true"` |
| Input | Plain `<input>`, no border of its own — the border lives on the `otto-search` container |

## Behavior

- Typing filters the associated list live, or on submit, depending on the context — but the search field itself has no dropdown or menu.
- Focus shows the field's border in `--otto-on-surface-800`, matching other field types.

## Accessibility

- Give the input an accessible name — a visible label nearby, or `aria-label` if the icon and placeholder are the only visual cues.
- Placeholder text is a hint, not a label — don't rely on it alone to tell people what the field searches.

## Content

- Placeholder states what's being searched ("Search candidates…"), not a generic "Search…" when the context benefits from specificity.

## Related

- **Combobox** — search that opens a list of selectable options.
- **Fields** — the general input/select/textarea family this doesn't belong to.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: search vs. combobox distinction, accessibility |
