---
title: "Avatar — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/avatar.md"
---

# Avatar — styling and implementation

Visual specs and usage. Rules live in [Avatar](../components/avatar.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Avatar.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Sizes | 24 / 28 / 32 / 56px |
| Stack overlap | −4px, 2px ring in the background color |

## States

| State | Treatment |
| --- | --- |
| Hover (stack) | translateY(−2px) |

## Tokens

- `--otto-accent-800`
- `--otto-border`
- `--otto-surface-900`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Avatar name="Marisol Ortega" size="sm" />
<AvatarStack people={team} max={6} />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
