# UX branching

Build several design variants of the same feature, switch between them live in the browser, and share a link to the exact variant you want someone to see. No forks, no duplicate builds, no screenshots.

## Concepts

| Term | Meaning |
| --- | --- |
| **Feature** | One area of the UI being explored, e.g. the requisition panel on New activity |
| **Branch** | One variant of a feature. Every branch has an id, a name, a status and an owner |
| **Baseline** | The branch shown by default. Exactly one per feature |
| **Status** | Where the variant stands: **Exploration** → **Candidate** → **Final** |

Statuses show as pills in the Variants panel, on the home page and wherever you list branches, so stakeholders can see what's under consideration and what's been chosen.

| Status | Use when |
| --- | --- |
| Exploration | An early idea. Expect it to change or be dropped |
| Candidate | A serious option you're comparing with stakeholders |
| Final | The chosen direction. Usually also the baseline |

## How it works

* `src/branching/branches.ts` — the registry: features and their branches.
* `src/branching/BranchContext.tsx` — keeps the active branch per feature, reads `?branch=` from the URL, remembers choices in local storage, and provides:
  * `<BranchSwitch feature variants>` — renders the active variant
  * `useBranch(feature)` — the active branch, for smaller differences inside one component
  * `<BranchPanel />` — the floating **Variants** panel (bottom right) for switching and copying links

A link with `?branch=<id>` opens that variant, e.g. `/#/candidates/c-1001/activity/new?branch=req-panel-tabs`. The panel's link button copies one for you.

The panel only shows for roles with the `branches.switch` permission, so you can demo a "clean" experience by switching to a role without it.

## Add a variant

1. **Register it** in `src/branching/branches.ts`:

   ```ts
   {
     id: "req-panel-timeline",          // unique, kebab-case, starts with the feature id
     feature: "req-panel",
     name: "Timeline",
     status: "exploration",
     description: "Shows the requisition's history above the questions.",
     owner: "Your Name",
     updated: "2026-11-22",
   }
   ```

2. **Render it** where the feature lives:

   ```tsx
   <BranchSwitch
     feature="req-panel"
     variants={{
       "req-panel-summary": <PanelSummary req={req} />,
       "req-panel-tabs": <PanelTabs req={req} />,
       "req-panel-timeline": <PanelTimeline req={req} />,
     }}
   />
   ```

3. **Share it:** open the Variants panel, pick the variant, select the link icon.

## Add a feature

Add it to `FEATURES` in `branches.ts` with a name and where it lives, then register at least one branch with `baseline: true`.

## Promote a variant

When a decision is made:

1. Set the chosen branch to `status: "final"` and `baseline: true`; remove `baseline` from the old one.
2. Leave the others in place for a review or two so links keep working, marking them `exploration`.
3. Once the decision is settled, delete the losing variants and their components. Links to deleted branches fall back to the baseline.

## Rules

* Variants share data, routes and the design system. Only the part being explored changes.
* Keep variant components next to the feature (same file or a sibling), named after the branch.
* Every variant must meet the same accessibility bar as the baseline.
* Don't use branches for permanent role differences. That's what roles are for (ROLES_AND_PERMISSIONS.md).
