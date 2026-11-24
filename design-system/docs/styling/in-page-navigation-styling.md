---
title: "In-page navigation — styling and implementation"
status: draft
last_updated: 2026-11-22
parent: "../components/in-page-navigation.md"
---

# In-page navigation — styling and implementation

Visual specs, tokens and markup. Usage rules live in [In-page navigation](../components/in-page-navigation.md).

## Container

| Property | Expanded | Collapsed |
| --- | --- | --- |
| Layout | Flex column | Flex column |
| Width | 208px | 48px |
| Vertical padding | 8px (`--otto-space-2`) | 8px |
| Radius | 8px (`--otto-radius`) | 8px |

## Section link

| Property | Expanded | Collapsed |
| --- | --- | --- |
| Height | 48px | 48px |
| Width | 208px | 48px |
| Padding | 12px (`--otto-space-3`) | 0, icon centered |
| Icon–label gap | 8px (`--otto-space-2`) | — |

## Icons

| Icon | Size | Token |
| --- | --- | --- |
| Leading | 20 × 20px | `--otto-accent-100` |
| Trailing status | 20 × 20px | `--otto-on-surface-600` |

## Typography

| Element | Font | Size / line height | Token |
| --- | --- | --- | --- |
| Label | Poppins SemiBold 600 | 14 / 20px | `--otto-text-label`, color `--otto-on-surface-800` |
| Tooltip | Poppins SemiBold 600 | 12 / 16px | `--otto-text-label` |

Labels truncate with an ellipsis on one line.

## Rail and current section

| Property | Rest | Current |
| --- | --- | --- |
| Thickness | 2px | 4px |
| Color | `--otto-border` | `--otto-accent-200` |
| Link fill | none | `--otto-on-surface-200` |
| Edge | Trailing (default); leading with `--alternate` | Same |

The current link also gets `aria-current="true"`, so the state isn't conveyed by color alone.

## States

| State | Treatment |
| --- | --- |
| Default | Label `--otto-on-surface-800`, icon `--otto-accent-100`, rail `--otto-border` |
| Hover (expanded) | Link fill `--otto-on-surface-300` |
| Hover (collapsed) | 36px icon box fill `--otto-on-surface-300`; the anchor stays the full 48px target |
| Current | 4px `--otto-accent-200` rail segment, `--otto-on-surface-200` fill |
| Focus | 2px `--otto-on-surface-800` (white) focus outline |

## Tooltip (collapsed)

| Property | Value |
| --- | --- |
| Background | `--otto-on-surface-800` (white) |
| Text | `--otto-surface-900` |
| Padding | 4px 8px |
| Radius | 4px (`--otto-radius-sm`) |
| Min height / max width | 24px / 200px |

## Markup

```html
<!-- Expanded -->
<nav class="otto-inpage-nav" aria-label="Form sections">
  <a class="otto-inpage-nav__link" href="#candidate-details" aria-current="true">
    <svg class="otto-inpage-nav__icon" aria-hidden="true">…</svg>
    <span class="otto-inpage-nav__label">Candidate Details</span>
  </a>
  <a class="otto-inpage-nav__link" href="#job-details">
    <svg class="otto-inpage-nav__icon" aria-hidden="true">…</svg>
    <span class="otto-inpage-nav__label">Job Details</span>
  </a>
</nav>

<!-- Collapsed: the anchor keeps the accessible name, data-tooltip shows it on hover -->
<nav class="otto-inpage-nav otto-inpage-nav--collapsed" aria-label="Form sections">
  <a class="otto-inpage-nav__link" href="#references" aria-label="References" data-tooltip="References">
    <span class="otto-inpage-nav__icon-box"><svg class="otto-inpage-nav__icon" aria-hidden="true">…</svg></span>
  </a>
</nav>

<!-- Optional status -->
<a class="otto-inpage-nav__link" href="#work-authorization">
  <svg class="otto-inpage-nav__icon" aria-hidden="true">…</svg>
  <span class="otto-inpage-nav__label">Work Authorization</span>
  <svg class="otto-inpage-nav__status" aria-hidden="true">…</svg>
  <span class="otto-sr">Required fields not filled</span>
</a>

<!-- Targets: offset for a persistent header -->
<section id="work-authorization" class="otto-section-target">
  <h2>Work Authorization</h2>
</section>
```

Sticky positioning is set by the layout:

```css
.my-form-layout .otto-inpage-nav { position: sticky; top: 16px; }
```

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Planex version: dimensions, tokens, rail, states, tooltip and markup |
