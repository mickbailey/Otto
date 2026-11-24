---
title: "Data Table — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/data-table.md"
---

# Data Table — styling and implementation

Visual specs and usage. Rules live in [Data Table](../components/data-table.md). CSS: `design-system/css/components.css`. React: `src/components/ds/DataTable.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Header | 36px |
| Row | 56px |
| Cell padding | 0 8px |

## States

| State | Treatment |
| --- | --- |
| Row hover | `--otto-on-surface-300` |
| Current page | `--otto-accent-200` fill |

## Tokens

- `--otto-on-surface-300`
- `--otto-border`
- `--otto-accent-200`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<DataTable caption="Candidates" columns={columns} rows={rows} rowKey={(r) => r.id} onRowClick={open} />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
