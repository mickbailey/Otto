---
title: "Tabs — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/tabs.md"
---

# Tabs — styling and implementation

Visual specs and usage. Rules live in [Tabs](../components/tabs.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Tabs.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Tab padding | 12px 16px |
| Indicator | 3px, rounded top |
| Gap | 8px |

## States

| State | Treatment |
| --- | --- |
| Hover | `--otto-border` indicator |
| Selected | `--otto-accent-200` indicator, SemiBold |

## Tokens

- `--otto-accent-200`
- `--otto-border`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Tabs label="Candidate sections" value={tab} onChange={setTab} tabs={[{ id: "overview", label: "Overview", content: <Overview /> }]} />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
