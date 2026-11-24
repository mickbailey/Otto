# Case study: a prototyping platform for faster, higher-fidelity product decisions

*Mick Bailey · UX design and design systems*

> This repository is a public recreation of work I led on an internal team. Names, branding, fonts, data and infrastructure have been replaced with the fictional Otto system so the ideas can be shared. Replace the bracketed placeholders with numbers you're allowed to share.

---

## Summary

I turned prototyping from a one-off craft activity into a repeatable platform. New prototypes start from one governed template that already has the design system, navigation, theming, roles, a way to compare design variants with stakeholders, and a deployment pipeline. The team gets to a deployable, production-fidelity prototype in **[hours/days instead of weeks]**, and what stakeholders approve looks like what engineering can ship.

## The problem

Every prototype started from a blank canvas, and the costs compounded:

* **Reinvention tax.** Each prototype rebuilt navigation, buttons, inputs, tables and theming. **[Share of effort spent on boilerplate]**.
* **Drift.** Prototypes didn't match the real design system, so approved mockups didn't match what could be built. That meant rework and lost trust.
* **Slow comparisons.** "Option A vs. B" meant separate files or builds, shared as screenshots or fragile links.
* **Throwaway hand-off.** Engineers couldn't reuse prototype code, components or tokens, so the work happened twice.
* **No easy path to real users.** Getting something clickable in front of people needed ad-hoc hosting.

We were spending design time on plumbing instead of on the product questions.

## What I built

A **template** that teams fork to start a prototype. Fill in a name, description and owner, and you get a complete app wired up with:

### 1. A governed design system

* **Tokens for everything:** color, type, spacing, radius, size, motion. No hard-coded values, so the whole app re-skins from one file.
* **Two component layers:** design-system components for page code, and lower-level primitives (portals, focus traps, positioning, icons) used only inside them. Pages always build with the system, so prototypes look and behave like the product.
* **Living documentation:** Foundations, Components and Patterns pages built from the same components they document, doubling as a QA reference.
* **Two docs per component:** usage guidelines (when to use, anatomy, behavior, accessibility, content) and styling and implementation (dimensions, tokens, states, code).

### 2. Codified standards

A single [Guidelines.md](../Guidelines.md) covers typography, tokens, layout, forms (based on Adam Silver's *Form Design Patterns*), menus, chips, buttons, component states, copy and action labels. Because the rules live in the repo, output stays consistent whether a designer, an engineer or an AI assistant is building, without reviewing every pixel.

### 3. UX branching

Build several variants of the same feature, switch between them live, and send stakeholders a link to the exact one (`?branch=<id>`). Each variant carries a status, **Exploration → Candidate → Final**, so leadership can click through the options and see where each stands. See [BRANCHING.md](../BRANCHING.md).

### 4. Role-based experiences

Five roles (admin, manager, recruiter, sales, contributor) and one permission table drive navigation, page access and actions, so prototypes can demo role-specific experiences realistically. See [ROLES_AND_PERMISSIONS.md](../ROLES_AND_PERMISSIONS.md).

### 5. Automated delivery

Pushing to `main` builds and deploys. The original ran in containers on a Kubernetes cluster with GitOps rollouts and self-registered in a developer catalog; this recreation publishes to GitHub Pages and ships a Dockerfile and catalog file to show the same pattern.

## A flagship flow: logging recruiter activity

Recruiters log calls, candidate profiles, notes and submittals all day, and each one should be attached to the requisition it's for. In the prototype, attaching a requisition opens a side panel with a **plain-language summary of the job** and **four screening questions with what to listen for**, so a recruiter who isn't an engineer can run a credible technical screen.

I explored three variants of that panel with the branching system:

| Variant | Status | Idea |
| --- | --- | --- |
| Summary and questions | Final | Everything in one scroll |
| Tabbed panel | Candidate | Summary, questions and details in tabs |
| Live call checklist | Exploration | Tick questions off during the call and insert them into the notes |

## How it scales

1. **Scaffold, don't rebuild.** Each new prototype inherits the foundation; the marginal cost drops from **[before]** to **[after]**.
2. **Fix once, benefit everywhere.** Improvements to a component or token flow into every prototype built afterwards.
3. **Governance by default.** Standards live in the template, so quality scales without manual review.
4. **Safe exploration.** One feature can host many competing ideas without forks or risk to the baseline.
5. **Hands-off deployment.** No bespoke hosting per project.
6. **Hand-off becomes reuse.** Prototypes use real components, tokens and patterns, so engineering can **[reuse / reference / lift]** the work.

## Impact

| Metric | Before | After |
| --- | --- | --- |
| Time to a deployable prototype | [__] | [__] |
| Prototypes built from the template | — | [__] |
| Stakeholder variant comparison | Screenshots and separate files | Live, shareable links |
| Rework after hand-off | [__] | [__] |

**[A quote or story about a faster decision]**

**[A product decision de-risked by a high-fidelity prototype]**

## What I'd do next

* Visual regression tests on the showcase pages so token changes can't silently break components.
* Publishing the design system as a package so production apps can consume it directly.
* A formal prototype-to-engineering hand-off checklist.
