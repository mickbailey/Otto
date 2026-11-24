---
title: "Account page"
status: draft
last_updated: 2026-11-23
---

## Overview

The account page is the full-page composition for a company/account record: a hero with a map and key facts, a team avatar stack, a two-column body (actions and role cards beside a tabbed main area with an activity feed and contacts list), and a sticky team bar that appears once the hero scrolls out of view. It's a page-level pattern built from several other components, not a single atomic one — documented here because its own CSS (`otto-acct`, `otto-phero`, `otto-facts`, `otto-act`, `otto-sticky`, `otto-person-row`, etc.) doesn't belong to any of them individually.

## When to use

Use this pattern when:
- A single record needs a rich, full-page profile: a map/location hero, at-a-glance facts, the team associated with it, and a history of activity.

Don't use it:
- For a list item — use a **record card** instead.
- For a simpler record with no map, team, or activity history worth a dedicated hero — a plain card-based page is lighter weight.

## Anatomy

| Part | Description |
| --- | --- |
| Hero | `otto-phero`, title and key facts (`otto-facts`) beside a map (`otto-phero__map`) with a pin, or a no-map placeholder |
| Team stack | `otto-stack`, overlapping avatars of people on the account, with a "+N" overflow |
| Actions aside | `otto-actions`, primary actions for the record |
| Role cards | `otto-rolecard`, one per named role (e.g. account manager), each with a person and contact info |
| Origin card | `otto-origin`, how/who sourced this account |
| Tabbed body | `otto-tabs-card`, holding the activity feed and contacts tabs |
| Activity feed | `otto-day`/`otto-act__item`, grouped by day, each entry with a timestamp and body text (supports `<mark>` highlighting) |
| Contacts list | `otto-person-row`, one row per contact |
| Sticky team bar | `otto-sticky`, appears once the hero's own title scrolls out of view, repeating the name and team stack in a persistent header |

## Behavior

- The sticky bar is hidden until the hero scrolls past a threshold, then slides in with a staggered re-entrance of the team avatars; it disappears again when scrolling back up past that point.
- On narrower container widths, the two-column body collapses: the aside and role cards reflow into their own grid, then stack fully on the narrowest widths; the map hides below a small width to save vertical space.
- Role cards show a subtle hover border to signal they're worth a closer look, without implying the whole card is a single click target unless it actually is one.

## Accessibility

- The sticky bar duplicates information already on the page (name, team) — mark it so assistive tech doesn't announce the same content twice when it appears (e.g. `aria-hidden` while off-screen, or treat it as a visual-only reinforcement of the always-present heading).
- The activity feed's day grouping (`otto-day__label`) should use a real heading or at least a labeled region so the feed's structure survives for screen reader users, not just visually via spacing.
- Map pins and placeholder states are decorative; the facts list (`otto-facts`, a real `<dl>`) is the accessible source of truth for location and other key data.

## Content

- Facts (`dt`/`dd` pairs): short labels and tabular, consistently formatted values (dates, counts) so they stay scannable at a glance.
- Activity entries: lead with who and what, then when; use `<mark>` sparingly, only to highlight the specific term that matched a search or filter.

## Related

- **Avatars and stacks** — the team stack here is the same component.
- **Record card** — the list-item-sized alternative to this full-page pattern.
- **Tabs** — the tabbed body's switching mechanism.
- **App shell / split page** — the account page sits inside the shell's main page area.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: hero, facts, team stack, role/origin cards, tabbed activity/contacts body, sticky team bar |
