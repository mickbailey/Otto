# Color

Otto is dark-first. Every color is a token defined in `css/tokens.css` and scoped to `.otto-theme`. Pages and components never use hex, rgb or hsl values. This page is the source of truth for how the tokens are used; the same rules appear on the **Design System → Foundations → Color** page in the app.

## How the numbers work

Every family has an **800 default**. The other numbers step away from it:

| Family | Meaning of the numbers |
| --- | --- |
| Surface | 900 is deeper (the page), 800 is the default surface, 700 is raised |
| On surface | 800 is the default (100% white). Lower numbers are more de-emphasized |
| Primary, success, warning, destructive | 800 is the solid color. 900 is the same color at 80%, used for hover, de-emphasis and containers |
| Accent | 200 is the solid accent, 300 is that color at 80%. 700 is the navy solid and 800 is navy at 80% |
| Light steps | `-200` on success and destructive, and `-100` on accent, are the light steps used for text, borders and icons on dark surfaces, where the 800 is too dark to read. `primary-200` is a 14% tint |

## Progressive shades (surfaces)

| Token | Value | Use |
| --- | --- | --- |
| `--otto-surface-900` | `#00131F` | **The page.** App background, page titles and loose text sit directly on it |
| `--otto-surface-800` | `#03212E` | **The default surface.** Cards, panels, expansion panels, record cards and the side navigation |
| `--otto-surface-700` | `#172E36` | **Nested in a card.** Card headers, wells, menus |

Page, then card, then nested content steps up one shade at a time:

```
page         --otto-surface-900   page titles, loose text
  card       --otto-surface-800   cards, panels, side nav
    nested   --otto-surface-700   card headers, wells, menus
```

For anything nested further than 700, use a translucent fill (`--otto-on-surface-200` or `-300`). White at opacity works on any surface, which is why ghost buttons use it.

## On surface

| Token | Value | Use |
| --- | --- | --- |
| `--otto-on-surface-800` | `#FFFFFF` | Default text and icons. Also focus rings and focused field borders |
| `--otto-on-surface-700` | white 80% | Secondary text. *Reserved: in the scale, no component uses it yet* |
| `--otto-on-surface-600` | white 72% | Supporting text: helper text, captions, labels. AA on every surface |
| `--otto-on-surface-500` | white 56% | Field border on hover |
| `--otto-on-surface-400` | white 32% | Borders and dividers, and disabled text and icons |
| `--otto-on-surface-300` | white 16% | Hover backgrounds, row separators, disabled fills |
| `--otto-on-surface-200` | white 8% | Field fill, subtle selected backgrounds |
| `--otto-border` | = `--otto-on-surface-400` | Borders and dividers, field borders. Use this name for borders so intent is clear |

## Brand

| Token | Value | Use |
| --- | --- | --- |
| `--otto-primary-800` | `#FFD700` | The one main action in an area. Use sparingly. Text on it is `--otto-surface-900` |
| `--otto-primary-900` | yellow 80% | Primary hover |
| `--otto-primary-200` | yellow 14% | Primary badge fill, search highlight (`<mark>`) |
| `--otto-accent-100` | `#8CC4E6` | Icons and links on accent surfaces |
| `--otto-accent-200` | `#307AA6` | Chips, counts, selection, active tab, switch track, info tone |
| `--otto-accent-300` | accent 80% | Hover on a selected accent fill (selected filter chip, current page) |
| `--otto-accent-700` | `#234F69` | Selected rows, avatars, boxed-notice border |
| `--otto-accent-800` | navy 80% | Hover rows, tags, ghost button hover, boxed-notice fill |

## Feedback

| Token | Value | Use |
| --- | --- | --- |
| `--otto-success-800` | `#30A677` | Success tone |
| `--otto-success-900` | success 80% | Success, de-emphasized. *Reserved: no component uses it yet* |
| `--otto-success-200` | `#9BE0AE` | Text on a success badge |
| `--otto-warning-800` | `#EC8355` | Warning tone |
| `--otto-warning-900` | warning 80% | Warning, de-emphasized. *Reserved: no component uses it yet* |
| `--otto-destructive-800` | `#B00020` | Destructive actions (fill, with white text) |
| `--otto-destructive-900` | destructive 80% | Destructive hover, error badge |
| `--otto-destructive-200` | `#FF8A8A` | Error text, invalid borders, destructive menu items, error tone on banners and toasts |

Reserve destructive colors for critical feedback and irreversible actions.

## Rules

1. **Tokens only.** Pages and components never use hex, rgb or hsl. The only literals are shadows and scrims (they have their own tokens) and illustrations, such as a flag.
2. **800 is the default.** Reach for the 800 of a family first. Step to 900 for hover and de-emphasis.
3. **Hover steps, never new colors.** Brand and feedback controls hover to their 900 step (accent hovers to `--otto-accent-300`). Neutral controls hover to `--otto-on-surface-300`. No one-off hover colors.
4. **Dark red is a fill, not text.** `--otto-destructive-800` under white text is 7.3:1, but as text on a dark surface it is only 2.3:1, which fails AA. Error text and invalid borders use `--otto-destructive-200` (7.3:1).
5. **Focus is white.** Focus rings and focused field borders use `--otto-on-surface-800`. Never rely on color change alone.
6. **No computed tints.** Don't use `color-mix` or opacity to make a new tint. Use a step that exists: a family's 900 or 200 step, `--otto-on-surface-200` or `-300`, or a navy accent step. If none fits, add a token to `tokens.css` and document it here.
7. **Disabled is a treatment, not a fade.** Disabled controls use `--otto-on-surface-400` for text and icons and, where the control has a fill, `--otto-on-surface-300`. Do not use `opacity`. Disabled controls stay visible.
8. **Surfaces are progressive.** Page 900, card 800, nested 700. Don't put an 800 card inside an 800 card, and don't reverse the order.
9. **Tailwind uses the same tokens.** `bg-background` is 900, `bg-surface` is 800, `bg-raised` is 700, `text-foreground` is `on-surface-800`, `text-muted` is `on-surface-600` and `border-border` is `--otto-border`. Do not write hex values in arbitrary classes.

## Component recipes

| Pattern | Treatment |
| --- | --- |
| Card | `--otto-surface-800` body, `--otto-surface-700` header |
| Menu, combobox menu | `--otto-surface-700`, `--otto-border` border, `--otto-shadow-menu` |
| Toast | `--otto-surface-700`, `--otto-border`, 4px left edge and icon in the tone color, shadow |
| Banner | Same as a toast without the shadow: `--otto-surface-700`, `--otto-border`, 4px left edge and icon in the tone color |
| Boxed notice | `--otto-accent-800` fill, `--otto-accent-700` border |
| Badge | Neutral by default. Primary `--otto-primary-200` fill, navy `--otto-accent-700`, error `--otto-destructive-900`, final `--otto-on-surface-300` fill with `--otto-success-200` text |
| Field | `--otto-on-surface-200` fill, `--otto-border` border, `--otto-on-surface-500` on hover, `--otto-on-surface-800` on focus, `--otto-destructive-200` when invalid |
| Disabled button, icon button | `--otto-on-surface-300` fill, `--otto-on-surface-400` text, no border |
| Disabled field | Same as a disabled button |
| Disabled checkbox, menu item, pagination button | `--otto-on-surface-400` text and icons |
| Ghost button | `--otto-on-surface-200` fill (works on any surface), `--otto-accent-800` on hover |
| Selected | Accent: `--otto-accent-200` for chips, counts, tabs and switches, `--otto-accent-700` for rows and avatars. A selected filter chip and the current page hover to `--otto-accent-300`; an unselected filter chip hovers to `--otto-on-surface-300` |
| Tooltip | `--otto-on-surface-800` fill, `--otto-surface-900` text |

## Reserved tokens

`--otto-on-surface-700`, `--otto-success-900` and `--otto-warning-900` are steps in the Figma color foundations that no component uses yet. They stay in the scale so the system matches the design file, and the Audit tab lists them as accepted (`ACCEPTED.reservedTokens` in `site/audit.js`). Use them when a component needs that step rather than adding a new value. Remove one from the list when a component starts using it.

## Checking your work

The design system site (`python3 scripts/serve.py`) has an **Audit** tab that checks for hard-coded colors, unused tokens and WCAG contrast on every color pair that matters. Run it after changing a token.
