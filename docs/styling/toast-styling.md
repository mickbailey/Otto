---
title: "Toast — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/toast.md"
---

# Toast — styling and implementation

Visual specs and usage. Rules live in [Toast](../components/toast.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Toast.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Width | min(480px, 100vw − 32px) |
| Bottom offset | 24px |
| Leading edge | 4px |

## States

| State | Treatment |
| --- | --- |
| Enter | Fade and slide up 12px, 220ms |

## Tokens

- `--otto-success-800`
- `--otto-accent-200`
- `--otto-warning-800`
- `--otto-surface-700`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
const toast = useToast();
toast.success("Candidate added");
toast.error("Couldn't save changes", { action: { label: "Try again", onClick: retry } });
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
