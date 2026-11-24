---
title: "Button — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/button.md"
---

# Button — styling and implementation

Visual specs and usage. Rules live in [Button](../components/button.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Button.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Height | 40px default · 32px `sm` · 44px `lg` |
| Padding | 0 20px (12px `sm`) |
| Gap | 8px between icon and label |
| Radius | `--otto-radius` 8px |
| Icon | 16px; IconButton 40×40 with a 20px icon |

## States

| State | Treatment |
| --- | --- |
| Default | Variant fill or border |
| Hover | Primary `--otto-primary-900`; secondary `--otto-on-surface-300` fill; ghost `--otto-accent-800`; destructive `--otto-destructive-900` |
| Focus | 2px `--otto-on-surface-800` (white) outline, 2px offset |
| Disabled | `--otto-on-surface-300` fill, `--otto-border` text, not-allowed cursor |

## Tokens

- `--otto-primary-800`
- `--otto-surface-900`
- `--otto-accent-200`
- `--otto-destructive-800`
- `--otto-text-label`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Button variant="primary" icon="add">New activity</Button>
<Button variant="secondary">Cancel</Button>
<IconButton icon="moreVert" label="More actions" />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
