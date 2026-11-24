---
title: "Page Shell — styling and implementation"
status: stable
last_updated: 2026-11-22
parent: "../components/page-shell.md"
---

# Page Shell — styling and implementation

Visual specs and usage. Rules live in [Page Shell](../components/page-shell.md). CSS: `design-system/css/components.css`. React: `src/components/ds/Page.tsx`.

## Dimensions

| Property | Value |
| --- | --- |
| Side nav | 64px collapsed · 232px expanded (`--otto-sidenav-expanded`); add `.otto-app--nav-expanded` to `.otto-app` |
| Top bar | 52px |
| Aside | 380px |
| Max content width | 1280px |

## Tokens

- `--otto-sidenav`
- `--otto-topbar`
- `--otto-aside`

Never hard-code a color or size; add a token to `tokens.css` instead.

## Usage

```tsx
<StandardPage header={<PageHeader title="Candidates" actions={<Button variant="primary" icon="add">New candidate</Button>} />}>
  …
</StandardPage>
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
