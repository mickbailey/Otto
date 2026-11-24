---
title: "Banner — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/banner.md"
---

# Banner — styling and implementation

Visual specs and usage. Rules live in [Banner](../components/banner.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Overlay.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Padding | 12px 16px |
| Radius | 8px |

## States

| State | Treatment |
| --- | --- |
| Container | `--otto-surface-700` fill, 1px `--otto-border` border, 4px leading edge in the tone color |
| Tones | Leading edge and icon: success `--otto-success-800`, info `--otto-accent-200`, warning `--otto-warning-800`, error `--otto-destructive-200` |

## Tokens

- `--otto-surface-700`
- `--otto-border`
- `--otto-accent-200`
- `--otto-success-800`
- `--otto-warning-800`
- `--otto-destructive-200`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Banner tone="warning">This requisition is on hold. Submittals are paused.</Banner>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
