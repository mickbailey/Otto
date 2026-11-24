---
title: "Expansion Panel — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/expansion-panel.md"
---

# Expansion Panel — styling and implementation

Visual specs and usage. Rules live in [Expansion Panel](../components/expansion-panel.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Page.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Header | 56px, padding 0 20px |
| Body | 8px 20px 24px |

## States

| State | Treatment |
| --- | --- |
| Hover | `--otto-on-surface-300` |
| Open | Chevron rotated 180° |

## Tokens

- `--otto-surface-800`
- `--otto-text-subtitle`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<ExpansionPanel title="Work History" defaultOpen>…</ExpansionPanel>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
