# Shape and spacing

Corners and gaps follow a few rules so layered elements nest cleanly. The same rules appear on the **Design System → Foundations** page in the app.

## Radius: surfaces 16, inside 8

| Token | Value | Use |
| --- | --- | --- |
| `--otto-radius-lg` | 16px | **Surfaces:** cards and card headers, panels, expansion panels, record cards, dialogs |
| `--otto-radius` | 8px | **Everything inside a surface:** buttons, fields, search, rows and their hover fills, nested panels, menus, banners, notices, tooltips, toasts |
| `--otto-radius-sm` | 4px | Tiny controls and marks |
| `--otto-radius-pill` | 999px | Chips, pills, badges, counts. Avatars are 50% |

```
surface       16px   card, panel, dialog
  inside       8px   button, field, row, hover fill, nested panel
```

### Rules

1. **A surface is 16, what sits on it is 8.** A 16px corner with an 8px inset around an 8px corner gives parallel, concentric curves where the layers meet.
2. **A surface inside a surface steps down to 8.** The system does this for you (`.otto-card .otto-card`). Don't nest 16 inside 16.
3. **Don't use 16 on a control, or 8 on a top-level surface.**
4. **Floating elements are 8.** Menus, banners, notices, toasts and tooltips are treated as elements, not surfaces.
5. **Full-bleed edges have no radius.** The side navigation, the side sheet and a card cropped to the window edge keep square corners on the edge they touch.
6. **Never hard-code a radius.** Use the token. The audit warns on a raw `border-radius`.

## Spacing

All spacing is on a 4px grid: **4, 8, 12, 16, 24, 32**.

### Outside a surface 24 or more, inside 16 or less

This is the core spacing rule. It's what makes a surface read as a unit.

- **Outside a surface** (page padding, the gap between a surface and the page edge, between page regions, between columns of surfaces) is **24px or more**.
- **Inside a surface** (padding, and the gaps between things within it) is **16px or less**.

```
page          24+ margins and gutters
  surface     padding 16 (12 for small stacked cards)
    inside    gaps 16, 12, 8, 4
```

The first element in a surface sits at the surface's padding, with nothing added on top. A tab bar's labels start 16px from the top edge of its card; the tabs have no top padding of their own.

| Gap | Use |
| --- | --- |
| 4 | Inside dense controls, between related label parts |
| 8 | Icon to label, between chips, compact metadata, between buttons in a stack |
| 12 | Small grouped rows, card headers, toolbar items |
| 16 | **Inside surfaces:** card padding, between the stacked sections of a card (tabs, toolbar, content), default spacing in forms |
| 24 | **Outside surfaces:** page padding, gutters between columns, gaps between page regions |
| 32+ | Outside surfaces only: page-level separation |

### Rules

1. **Inside a surface, 16 or less.** Don't use 20, 24 or 32 for padding or gaps between things in a surface.
2. **Sections inside a surface are 16 apart.** Tab bar, toolbar (search, filters), then content: one 16px gap each, not two gaps added together.
3. **A tab panel starts 16 below the tab bar.** The `Tabs` component adds it. Don't add top padding inside a panel's content.
4. **The parent sets the gap, the child doesn't.** Use `gap` on the stack or grid; don't put margins on a component's root to push it away from its neighbor. Two components that each add spacing produce a double gap.
5. **Surface padding is 16, or 12 for small stacked cards** (a role card). Keep the same padding on all four sides.
6. **Rows are 8px of padding.** List and feed entries use 8px padding, and their hover fill uses `--otto-radius`.
7. **No off-grid values.** 10, 14, 6 and similar are warnings in the audit. Use the nearest grid step.
8. **Nothing between 16 and 24.** 20 is neither inside nor outside; the audit warns on 17-23px spacing.
