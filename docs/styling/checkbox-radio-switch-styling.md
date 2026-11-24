---
title: "Checkbox, Radio and Switch — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/checkbox-radio-switch.md"
---

# Checkbox, Radio and Switch — styling and implementation

Visual specs and usage. Rules live in [Checkbox, Radio and Switch](../components/checkbox-radio-switch.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Field.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Checkbox / radio | 20×20px, 6px radius (checkbox) |
| Switch | 40×24px track, 18px thumb |
| Label gap | 10px |

## States

| State | Treatment |
| --- | --- |
| Unchecked | 1px `--otto-border` border |
| Checked | `--otto-primary-800` fill, `--otto-surface-900` mark; switch `--otto-accent-200` track |
| Focus | 2px `--otto-on-surface-800` (white) outline |
| Disabled | `--otto-on-surface-400` border and label; a checked control uses an `--otto-on-surface-300` fill |

## Tokens

- `--otto-primary-800`
- `--otto-accent-200`
- `--otto-border`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Checkbox label="Open to relocation" />
<RadioGroup label="Contact method" name="contact" value={v} onChange={setV} options={OPTIONS} />
<Switch label="Email notifications" defaultChecked />
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
