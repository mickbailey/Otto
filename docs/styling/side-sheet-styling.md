---
title: "Side Sheet — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/side-sheet.md"
---

# Side Sheet — styling and implementation

Visual specs and usage. Rules live in [Side Sheet](../components/side-sheet.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Overlay.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Width | min(480px, 100vw) |
| Padding | 24px |

## States

| State | Treatment |
| --- | --- |
| Enter | Slide 32px and fade, 240ms |

## Tokens

- `--otto-surface-800`
- `--otto-scrim`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<SideSheet open={!!row} onClose={close} title={row?.title ?? ""}>…</SideSheet>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
