---
title: "Panel sections"
status: draft
last_updated: 2026-11-23
---

## Overview

A panel section is one block of a right-hand (or any secondary) panel, stacked with others and separated by a rule — "Attached requisition", "What's this job really about?", "Screening questions". Unlike an expansion panel, every section is always visible; the panel is just organized into labeled chunks.

## When to use

Use panel sections when:
- A side panel or aside needs to present several distinct, always-visible pieces of context, each with its own small heading.

Don't use it:
- For content that should default to collapsed — use an **expansion panel**.
- For the page's primary content — panel sections are a secondary-panel pattern, not a replacement for a card's body.

## Anatomy

| Part | Description |
| --- | --- |
| Heading | `<h3>`, `otto-text-label` weight |
| Body | Paragraphs, a chip, a question list — whatever the section needs |
| Divider | A top border automatically separates consecutive sections |

## Behavior

- Sections stack vertically with consistent padding and an automatic divider between them — no manual spacing needed between adjacent sections.
- A section's content area is flexible; it commonly holds a `otto-meta` row, a chip, or a `otto-qlist`.

## Accessibility

- Each section's heading is a real heading element so the panel has a navigable structure (important for a panel with several sections stacked in an aside).
- Headings should step logically relative to the page's own heading level — don't skip levels just for visual sizing.

## Content

- Heading: a short label, Title Case or Sentence case consistent with the rest of the panel ("Attached requisition", "Screening questions").

## Related

- **Expansion panel** — the collapsible counterpart.
- **Question lists** — a common content type inside a panel section.
- **App shell / split page** — panel sections typically live inside a `otto-page__aside`.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: anatomy, heading structure accessibility |
