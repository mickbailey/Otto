---
title: "Cards"
status: draft
last_updated: 2026-11-23
---

## Overview

A card is a self-contained, raised surface that groups related content and actions — a form, a summary, a record's details. It's the system's default container (`--otto-surface-800`) when content needs visual separation from the page background but doesn't need a full page of its own.

- Surfaces are progressive: the page is `--otto-surface-900`, a card is `--otto-surface-800`, and anything nested inside a card (its header, wells, menus) steps up to `--otto-surface-700`. A card never sits flush against content of the same surface color — the point is the contrast. See [Color](../foundations/color.md).
- A card's header, if present, is visually distinct (`--otto-surface-700`) from its body.

## When to use

Use a card when:
- A group of fields, a summary, or a record needs a visible boundary on the page.
- The content has an optional header (title, status, actions) and a body.

Don't use it:
- For the page's own top-level layout shell — use the app shell.
- For a small, inline piece of metadata — use a panel section or a plain block instead; a card is for a self-contained unit, not every box on the page.

## Anatomy

| Part | Description |
| --- | --- |
| Header | *(Optional)* `otto-card__header`, raised background; holds a title and header-level actions (a badge, a button) |
| Body | `otto-card__body`, the card's padded content area |
| Contact strip | *(Optional)* `otto-contact` inside the header — a name plus contact links (email, phone, resume) |

## Behavior

- A card has a subtle resting shadow (`--otto-shadow-card`) to lift it slightly off the page; it doesn't change on hover — cards aren't, by default, interactive surfaces.
- Content inside the body manages its own spacing via the body's gap; don't add extra margins to direct children.

## Accessibility

- A card with a header acting as a form or record title should use a heading element (`<h2>`/`<h3>`) inside the header, not just styled text, so the structure is in the accessibility tree.
- A card is a grouping container, not a control — it has no role of its own and isn't focusable unless something inside it is.

## Content

- Card header titles are short noun phrases, Sentence case ("Card header", "Attached requisition"), not full sentences.
- Don't duplicate the card's title inside its own body.

## Related

- **Panel sections** — for a column of distinct, divided content blocks (typically beside a card, not inside one).
- **Record card** — a denser, record-specific layout (head, detail list, activity feed) built on the same surface conventions.
- **Expansion panel** — a card-like container that's collapsed by default.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: anatomy, behavior, accessibility, content |
