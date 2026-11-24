---
title: "Question lists"
status: draft
last_updated: 2026-11-23
---

## Overview

A question list is a numbered set of screening questions, each paired with a "listen for" hint describing what a good answer sounds like — written for someone running a live screening call, not for the candidate.

## When to use

Use a question list when:
- Presenting a small, ordered set of questions someone will ask out loud, each needing a short note on what to listen for in the answer.

Don't use it:
- For a form someone fills in themselves — that's a sequence of **fields**, not a question list.
- For general reference content with no question/hint structure — a panel section's plain paragraph is simpler.

## Anatomy

| Part | Description |
| --- | --- |
| Question | A short label (e.g. "Experience:") followed by the question in quotes |
| Listen-for hint | Italicized, on its own line beneath the question |
| List | `otto-qlist`, numbered, with consistent spacing between items |

## Behavior

- Purely static, read-only content — there's no interaction model here, just a formatted list.

## Accessibility

- Uses a native `<ol>` so the numbering is programmatic, not just visual.
- The "listen for" hint is regular text content (not an attribute or tooltip), so it's read by default, not hidden behind an interaction.

## Content

- Lead each question with a short category label in bold ("Experience:", "Troubleshooting:") followed by the question in quotation marks, written as it would actually be asked aloud.
- The listen-for hint names concrete signals of a good answer (specific tools, numbers, behaviors), not vague advice like "listen carefully."

## Related

- **Panel sections** — the typical container for a question list.
- **Record card** — screening questions often appear in a panel beside a candidate's record.

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-23 | Mick Bailey | Initial doc: anatomy, content pattern (category label + quoted question + listen-for hint) |
