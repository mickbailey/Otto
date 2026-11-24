---
title: "Expansion panel"
status: draft
last_updated: 2026-11-23
---

## Overview

An expansion panel hides secondary content behind a clickable summary, revealing it in place when opened — "What's this job really about?" expanding into a paragraph. It's for progressive disclosure within a page, not for a decision that needs a response.

## When to use

Use an expansion panel when:
- Content is useful but not always needed, and collapsing it by default keeps the surrounding page shorter and easier to scan.

Don't use it:
- For content everyone needs to see — don't hide something essential behind a click.
- For a decision that blocks progress — use a **dialog**.
- For switching between several views — use **Tabs**.

## Anatomy

| Part | Description |
| --- | --- |
| Summary | `<summary>`, the always-visible clickable header with a chevron |
| Body | `otto-expansion__body`, revealed when open |

## Behavior

- Built on native `<details>`/`<summary>`, so open/closed state needs no JavaScript.
- The chevron rotates 180° when open, giving a consistent visual cue independent of the body's content.
- Multiple panels on a page are independent by default — opening one doesn't close another unless the page explicitly groups them as an accordion.

## Accessibility

- Native `<details>`/`<summary>` already exposes the expanded/collapsed state and toggling via Enter/Space to assistive tech — no extra ARIA is needed on top of it.
- The summary text alone must make sense out of context, since it's the only thing visible before opening.

## Content

- Summary: a short question or label describing what's inside ("What's this job really about?"), specific enough that people can decide whether to open it without guessing.

## Related

- **Panel sections** — static, always-visible sections, the non-collapsible counterpart.
- **Dialog** — for a decision, not disclosure.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: native details/summary behavior, accessibility, content |
