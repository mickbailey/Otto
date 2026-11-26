---
title: "Chips, Tags and Badges — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/chip.md"
---

# Chips, Tags and Badges — styling and implementation

Visual specs and usage. Rules live in [Chips, Tags and Badges](../components/chip.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Tag.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Chip | 32px min height, 6px radius |
| Tag | 26px, pill |
| Badge | 20px, pill, 10px SemiBold |
| Gap | 6–8px between chips |

## States

| State | Treatment |
| --- | --- |
| Filter hover | `--otto-on-surface-300` |
| Filter selected | `--otto-accent-200` fill + check; hover `--otto-accent-300` |
| Remove hover | `--otto-on-surface-300` |

## Tokens

- `--otto-accent-200`
- `--otto-accent-900`
- `--otto-primary-200`
- `--otto-destructive-900`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Tag onRemove={() => remove(s)}>{s}</Tag>
<Tag selected={on} onClick={toggle}>Dallas</Tag>
<Badge tone="primary">Today</Badge>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
