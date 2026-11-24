---
title: "Empty State — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/empty-state.md"
---

# Empty State — styling and implementation

Visual specs and usage. Rules live in [Empty State](../components/empty-state.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Page.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Padding | 40px 16px |
| Gap | 8px |

## Tokens

- `--otto-text-title`
- `--otto-on-surface-600`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<EmptyState icon="doc" title="No activity yet" text="Calls, notes and submittals will show here." />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
