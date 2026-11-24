---
title: "App shell"
status: draft
last_updated: 2026-11-23
---

## Overview

The app shell is the persistent frame around every screen: a side navigation rail, a top bar with the user menu, and a page area that can optionally split into a main column and a right-hand aside. It's the one piece of layout every page in the product shares.

## When to use

Use the app shell when:
- Building any top-level, signed-in page of the product — it's the outermost layout, not optional per-page chrome.

Don't use it:
- For a modal or sheet's internal layout — those float above the shell, they don't nest inside its page area.
- For an embedded widget dropped into someone else's page (see the README's embed build) — the shell assumes it owns the whole viewport.

## Anatomy

| Part | Description |
| --- | --- |
| Side navigation | `otto-sidenav`, a fixed 64px icon rail; `otto-app--nav-expanded` widens it to show labels |
| Top bar | `otto-topbar`, holds the user menu at the trailing edge |
| User menu | `otto-user`, avatar + name + chevron, opens the account menu |
| Breadcrumb | `otto-breadcrumb`, below the top bar inside the page, shows the current location's path |
| Page | `otto-page`, the main content area; `otto-page--split` adds a right-hand `otto-page__aside` |
| Cropped split | `otto-page--cropped` cuts the aside at the main column's height, for a screenshot-style side panel |

## Behavior

- The side navigation toggles between icon-only and expanded (with labels) via its menu item; the page content reflows, it doesn't overlay.
- The side navigation is sticky within the viewport and scrolls independently if it's taller than the screen.
- Below a width threshold, the side navigation moves to a bottom/horizontal bar instead of a left rail, and a split page's aside stacks below the main column instead of beside it.

## Accessibility

- The side navigation is a `<nav aria-label="Main">`; the current section's item has `aria-current="page"`.
- The user menu button exposes the account name as visible text, not just an avatar, so it has a clear accessible name beyond the image.
- The breadcrumb is a `<nav aria-label="Breadcrumb">` with the current page marked `aria-current="page"` on a non-link span, since you're already there.

## Content

- Side navigation items: icon plus a short label when expanded, never a label alone with no icon.
- Breadcrumb segments: Title Case, matching the page titles they link to, shortest path that's still unambiguous.

## Related

- **In-page navigation** — within one page, not across the app.
- **Tabs** — within one record or view, nested inside the shell's page area.
- **Breadcrumb** is part of this component's anatomy, not a separate one.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: side nav, top bar, user menu, split/cropped page, breadcrumb; responsive behavior and accessibility |
