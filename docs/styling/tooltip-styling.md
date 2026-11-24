---
title: "Tooltip — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/tooltip.md"
---

# Tooltip — styling and implementation

Visual specs and usage. Rules live in [Tooltip](../components/tooltip.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Page.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Padding | 4px 8px |
| Max width | 240px |

## Tokens

- `--otto-on-surface-800`
- `--otto-surface-900`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Tooltip text="Copy link"><IconButton icon="link" label="Copy link" /></Tooltip>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
