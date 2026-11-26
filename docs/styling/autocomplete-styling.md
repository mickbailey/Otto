---
title: "Autocomplete — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/autocomplete.md"
---

# Autocomplete — styling and implementation

Visual specs and usage. Rules live in [Autocomplete](../components/autocomplete.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Autocomplete.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Control | 40px min height (`--otto-control`); grows with wrapped chips |
| Option padding | 14px 20px |
| Menu | 4px below the control, full width |

## States

| State | Treatment |
| --- | --- |
| Option hover / active | `--otto-accent-900` |
| Option selected | `--otto-accent-800` |
| Control open | Border `--otto-on-surface-800` |

## Tokens

- `--otto-accent-800`
- `--otto-accent-900`
- `--otto-accent-200`
- `--otto-shadow-menu`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Autocomplete<Requisition>
  label="Requisition"
  options={REQUISITIONS}
  value={req}
  onChange={setReq}
  getKey={(r) => r.id}
  getLabel={(r) => r.title}
/>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
