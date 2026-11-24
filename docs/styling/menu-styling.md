---
title: "Menu — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/menu.md"
---

# Menu — styling and implementation

Visual specs and usage. Rules live in [Menu](../components/menu.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Menu.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Min width | 200px |
| Max height | 320px |
| Item padding | 10px 16px (6px 12px condensed) |
| Icon | 18px |

## States

| State | Treatment |
| --- | --- |
| Hover / focus | `--otto-on-surface-300` |
| Destructive | `--otto-destructive-200` text and icon |
| Disabled | `--otto-on-surface-400` text and icon, not interactive |

## Tokens

- `--otto-surface-700`
- `--otto-shadow-menu`
- `--otto-accent-100`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<MenuTrigger
  items={[{ value: "edit", label: "Edit", icon: "edit" }, { value: "delete", label: "Delete", destructive: true }]}
  onSelect={handle}
  trigger={(p) => <IconButton {...p} icon="moreVert" label="Row actions" />}
/>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
