---
title: "Combobox"
status: draft
last_updated: 2026-11-23
---

## Overview

A combobox combines a text input with a menu of selectable, richly-described options — searching for a requisition by title, client or account manager, then picking one from results that show more than just a name. It opens while focused and closes on selection or blur.

## When to use

Use a combobox when:
- Someone needs to find and select one (or a few, shown as chips) specific record from a list that's too long to show all at once, and the options benefit from showing more than a plain label (a subtitle, metadata, an avatar).

Don't use it:
- For filtering a list shown elsewhere on the page with no selection step — use **Search**.
- For choosing from a short, simple list of plain text options — a `otto-select` is simpler.

## Anatomy

| Part | Description |
| --- | --- |
| Control | `otto-combobox__control`, holds the search icon, any selected chips, and the placeholder/input |
| Menu | `otto-combobox__menu`, opens below the control while focused |
| Option | `otto-combobox__option`, a title, optional subtitle, and optional meta row (e.g. an avatar + name) |
| Footer | `otto-combobox__footer`, e.g. a result count |

## Behavior

- The menu opens automatically while the control has focus and closes on blur or selection.
- A selected option appears as a chip inside the control, which can be removed to return to the empty/placeholder state.
- Selected/highlighted options are visually distinguished (`aria-selected="true"`) independent of hover.

## Accessibility

- The control has `role="combobox"` with `aria-expanded` and `aria-controls` pointing at the menu (`role="listbox"`); options are `role="option"`.
- Arrow keys move through options without leaving the input; Enter selects the highlighted option; Escape closes the menu without selecting.
- Each option's accessible name includes enough of its content (title and subtitle) to disambiguate it from similar options, not just the title alone when titles repeat.

## Content

- Option title: the record's primary name. Subtitle: the next most useful disambiguator (a client, a company). Meta row: supporting facts (an owner's name and avatar), not required for every combobox.
- Footer: a short count or hint ("3 open requisitions"), not an action — actions belong in the page, not the menu footer.

## Related

- **Search** — filtering without a selection step.
- **Chips** — how a combobox shows what's currently selected.
- **Fields / Select** — for a short, plain list with no need for rich option content.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use vs. search/select, anatomy, keyboard behavior, accessibility |
