---
title: "Tabs"
status: draft
last_updated: 2026-11-23
---

## Overview

Tabs switch between several views of related content, showing exactly one view at a time. They're for **selection among equals** ("Overview", "Activity", "Contacts", "Roles" on the same record), not for navigating between unrelated pages or for a required, sequential flow.

> **Tabs vs. in-page navigation:** if only one view shows at a time, use Tabs. If the page is one continuous scroll and the control just jumps between its sections, use in-page navigation instead.

## When to use

Use Tabs when:
- Several views belong to the same object or context (a candidate's Overview/Activity/Contacts/Roles) and only one needs to be visible at a time.
- The set of views is short enough to show all at once, without scrolling the tab list on most screens.

Don't use it:
- For a required, ordered sequence of steps — use a stepper.
- For jumping between sections of one long page that's otherwise all visible — use in-page navigation.
- For global, app-level navigation — use the side navigation.

## Anatomy

| Part | Description |
| --- | --- |
| Tab list | `otto-tabs`, the row of tabs (16px gap, 8px side padding); scrolls horizontally if it overflows |
| Tab | `otto-tab`, one `role="tab"` button per view, 38px tall (4px top, 8px sides and bottom padding) |
| Selection indicator | A 4px underline in `--otto-accent-200` under the selected tab |

## Behavior

- Selecting a tab shows its view and hides the others; it never navigates to a new page or changes the URL's path.
- The underline and `aria-selected="true"` always move together — never rely on the underline alone.
- On narrow screens the tab list scrolls horizontally rather than wrapping, so tab order stays stable.

## Accessibility

- The tab list is `role="tablist"`; each tab is `role="tab"` with `aria-selected`, and each view is `role="tabpanel"` referenced by `aria-controls`/`aria-labelledby`.
- Left/Right arrow keys move focus between tabs (Home/End to the first/last); only the focused tab is in the regular tab order (roving tabindex).
- The selected tab's underline isn't the only indicator — `aria-selected="true"` and the bold label weight carry the same information for assistive tech and for color-blind users.

## Content

- Title Case for tab labels ("Overview", "In Review"), short enough to never wrap to two lines.
- Order tabs by how often they're used or by natural sequence (Overview before Activity before Contacts), and keep that order stable across sessions.

## Related

- **In-page navigation** — jumps between sections of one continuous page instead of switching views.
- **App shell / side navigation** — for app-level, not within-record, navigation.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: when to use vs. in-page navigation, anatomy, keyboard behavior, accessibility |
