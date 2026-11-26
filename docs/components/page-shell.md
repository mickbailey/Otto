---
title: "Page Shell"
status: stable
last_updated: 2026-11-22
styling: "../styling/page-shell-styling.md"
component: "src/components/ds/Page.tsx"
---

## Overview

Every page uses the same shell: side navigation, top bar, then StandardPage with a PageHeader and content. Pages with a context panel add an aside.

- Also known as: App shell, layout, StandardPage
- Import: `import { StandardPage, PageHeader, PageContainer, Card } from "../components/ds"`

## When to use

- Every routed page

Don't use it:

- Custom page wrappers with their own padding
- Sticky behavior baked into components — the layout decides

## Variants

| Variant | Description |
| --- | --- |
| **Standard** | Header + content in a 1280px container |
| **Split** | Content + 380px aside, e.g. New activity |
| **Card** | Titled content section |

## Anatomy

| Part | Description |
| --- | --- |
| Side nav | 64px icon rail, role-filtered. A toggle at the top expands it to 232px with labels; the choice is remembered |
| Top bar | 52px, account menu with role switcher |
| Page header | Breadcrumb or back link, Title Case title, description, actions |
| Container | 28px top, 24px side padding |

## Behavior

- Single column by default; two columns only for short related fields
- Primary action sits near the content it submits
- The nav toggle sets aria-expanded and switches between "Expand navigation" and "Collapse navigation"; collapsed items keep their names as aria-labels and tooltips
- The aside stacks under the content below 1000px; the side nav becomes a top row below 640px

## Accessibility

- Skip link to main content
- <nav> landmarks with labels
- One h1 per page

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Find Candidates | find candidates |

## Related

- [In Page Navigation](in-page-navigation.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |

## Sticky bar

`StickyBar` is a bar that slides in at the top once the page title scrolls out of view. It holds the page title and the page's actions, so they stay in reach on a long page. The account page uses it for the team and **New activity**; forms use it for **Cancel** (secondary) and **Submit** or **Save** (primary).

```tsx
<StickyBar title="New activity" watchId="new-activity-title">
  <Button variant="secondary" onClick={cancel}>Cancel</Button>
  <Button variant="primary" type="submit" form="new-activity-form">Submit</Button>
</StickyBar>
<PageHeader title="New activity" titleId="new-activity-title" />
```

- Give `PageHeader` a `titleId` and pass the same id as `watchId`.
- A Submit button outside the `<form>` needs `form="<form id>"`.
- Keep the buttons at the end of the form too; the bar repeats them, it doesn't replace them.
