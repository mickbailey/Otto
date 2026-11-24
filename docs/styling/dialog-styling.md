---
title: "Dialog — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/dialog.md"
---

# Dialog — styling and implementation

Visual specs and usage. Rules live in [Dialog](../components/dialog.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Overlay.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Width | max 480px |
| Radius | 12px |
| Header padding | 16px 16px 16px 24px |
| Body padding | 24px |

## Tokens

- `--otto-scrim`
- `--otto-radius-lg`
- `--otto-shadow-menu`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<Dialog open={open} onClose={close} title="Discard this activity?" footer={<><Button variant="secondary" onClick={close}>Keep editing</Button><Button variant="destructive" onClick={discard}>Discard</Button></>}>
  <p>Your notes won't be saved.</p>
</Dialog>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
