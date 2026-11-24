---
title: "In-page navigation"
status: draft
last_updated: 2026-11-22
styling: "../styling/in-page-navigation-styling.md"
---

## Overview

In-page navigation helps people move between sections of one long page or form. It is **navigation, not progression**: people jump freely between sections instead of advancing through a required sequence.

- Also known as: section navigation, form section navigation, anchor navigation.
- Each link scrolls to its matching section on the **same page**. It never switches views or loads a new page.
- Only use it when the page is long enough that scrolling to find a section is a burden.

> **Navigation vs. progression:** if only one view shows at a time, use Tabs. If steps are sequential and required, use a stepper. In-page navigation is for free movement within one continuous page.

## When to use

Use it when:

- A page or form has **several distinct sections** on one continuous page.
- People would otherwise **scroll a lot** to find a section.
- People may need to move between sections **in any order**.
- Keeping the section list in view **while scrolling** helps.

Don't use it:

- For **sequential, required steps** — use a stepper.
- To switch between **separate views** — use Tabs.
- For **global or app-level** navigation — use the side navigation.
- On **short pages** where every section is already visible.

## Variants

| Variant | Description |
| --- | --- |
| **Expanded** (default) | Leading icon and text label for each section. No trailing icon. |
| **Expanded + status** | Adds a trailing status icon. An exception, only for forms people leave and return to several times before submitting. |
| **Collapsed** | Icons only, for tight layouts. A tooltip shows the label on hover and focus. |

## Anatomy

| Part | Description |
| --- | --- |
| Navigation container | The `<nav>` landmark that groups the links and carries the accessible label |
| Section link | A native `<a href="#section">` that scrolls to its section |
| Leading icon | Identifies the section; decorative when a label is visible |
| Label | Text naming the destination section |
| Trailing status icon | *(Optional)* Required fields filled / not filled |
| Rail and current-section indicator | Vertical rail on the trailing edge; the current section's segment is thicker and tinted |
| Tooltip | *(Collapsed only)* Shows the label on hover and focus |

## Placement

- **Leading edge (default):** the left side in left-to-right layouts.
- **Trailing edge:** an alternative when the page layout needs it.
- Say **leading** and **trailing**, not left and right, so placement follows reading direction.

## Sticky behavior

The navigation may stay **sticky** while people scroll. Sticky positioning belongs to the **page layout**, not the component, so the same component also works where sticky isn't appropriate.

## Optional trailing status icon

| Condition | Treatment |
| --- | --- |
| Required fields not filled | Incomplete status |
| All required fields filled | Complete status |
| No required fields in the section | No status icon |

- Optional fields never change the status.
- "Complete" doesn't mean the values are valid; validation stays in the form.
- The status is informational: not focusable, separate from the current-section indicator, and never implies an order.
- Use distinct symbols, not color alone. Expanded variant only.

## Behavior

- Selecting a link scrolls its section heading clearly into view.
- With a persistent header, offset the scroll (`scroll-margin-top`) so the heading isn't hidden.
- Collapsing the navigation never changes its order or behavior.
- **Current section:** marked with `aria-current="true"` and a thicker rail segment, so it never relies on color alone.

## Accessibility

- Use native anchors, never clickable `<span>`s.
- Wrap links in `<nav aria-label="Form sections">`.
- Leading icons are `aria-hidden="true"` when a label is visible.
- Collapsed links keep an accessible name with `aria-label`.
- Status icons are hidden from assistive technology; give the status as visually hidden text inside the link.
- No custom keyboard pattern: links sit in the normal tab order and activate with Enter.
- Touch targets are at least **48 × 48 px**.

## Content

Use Title Case for section labels. Keep them short, specific and matched to the section heading.

| ✅ Do | ❌ Don't |
| --- | --- |
| Candidate Details | Candidate |
| Job Details | Job |
| Availability | Other |
| Work Authorization | More Info |

## Related

- **Tabs** — one view at a time.
- **Tooltip** — labels for the collapsed variant.
- **Side navigation** — app-level navigation.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Planex version: expanded, collapsed and status variants, placement, sticky behavior and accessibility |
