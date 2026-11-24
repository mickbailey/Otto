---
title: "Dialog and side sheet"
status: draft
last_updated: 2026-11-23
---

## Overview

A dialog and a side sheet are both modal overlays that interrupt the page to ask for a decision or collect input before anyone can get back to what they were doing. A **dialog** is centered and best for a short, focused decision (confirm a delete). A **side sheet** slides in from the trailing edge and suits a longer task (a filter form) without losing the sense of "still on this page."

## When to use

Use a dialog when:
- A quick yes/no or short-form decision needs to block the page until it's resolved (confirm delete, a short settings prompt).

Use a side sheet when:
- The task needs more room than a dialog comfortably gives (a multi-field filter, a longer form) but still shouldn't navigate away from the current page.

Don't use either:
- For a brief, non-blocking confirmation — use a **toast** or **banner** instead; reserve the scrim-and-focus-trap treatment for things that truly need a decision before continuing.

## Anatomy

| Part | Description |
| --- | --- |
| Scrim | `otto-scrim`, dims the page behind the overlay and closes it on click (dialog only — a side sheet's scrim doesn't dim as heavily, since it's a lighter interruption) |
| Header | `otto-dialog__header` / `otto-sidesheet__header`, holds the title and a close control |
| Body | `otto-dialog__body` / `otto-sidesheet__body`, scrolls independently if content overflows |
| Footer | `otto-dialog__footer` / `otto-sidesheet__footer`, right-aligned actions |

## Behavior

- Opening either traps focus inside it; closing returns focus to whatever triggered it.
- The scrim and Escape both close the overlay, same as the explicit close/cancel action.
- A side sheet slides in from the trailing edge; a dialog simply appears centered — neither should animate for more than ~250ms.

## Accessibility

- Both use `role="dialog"` (or `alertdialog` for a destructive confirmation) with `aria-modal="true"` and a label pointing at the header's heading.
- Focus moves to the dialog/sheet on open (typically its heading or first field) and is trapped inside until it closes — Tab never reaches the page behind the scrim.
- Escape always closes it, matching the explicit close control.

## Content

- Header: a short question or statement of what's being decided ("Delete activity?"), not a generic "Confirm".
- Footer actions: the lower-emphasis action (Cancel) first, the one that resolves the dialog (Delete, Apply) last, using the destructive button style when the action is irreversible.

## Related

- **Menu** — a lighter popover for a list of actions, not a full interruption.
- **Expansion panel** — for progressively revealing content inline, without blocking the page.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: dialog vs. side sheet, focus trap and Escape behavior, accessibility |
