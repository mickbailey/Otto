---
title: "Fields — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/field.md"
---

# Fields — styling and implementation

Visual specs and usage. Rules live in [Fields](../components/field.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Field.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Height | 40px (`--otto-control`) |
| Padding | 6px 12px |
| Label gap | 6px |
| Two-column gutter | 16px |

## States

| State | Treatment |
| --- | --- |
| Default | 1px `--otto-border` border, `--otto-on-surface-200` fill |
| Hover | Border `--otto-on-surface-500` |
| Focus | Border `--otto-on-surface-800` (white) |
| Error | Border and text `--otto-destructive-200`, error icon |
| Disabled | `--otto-on-surface-300` fill, no border, `--otto-on-surface-400` text |

## Tokens

- `--otto-on-surface-200`
- `--otto-border`
- `--otto-primary-800`
- `--otto-text-label`
- `--otto-text-caption`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Input label="Email" type="email" required error={errors.email} />
<Select label="Activity type" emptyOption options={TYPES} />
<Input label="Search candidates" hideLabel leftIcon="search" placeholder="Search by name, role or skill..." />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
