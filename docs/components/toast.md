---
title: "Toast"
status: stable
last_updated: 2026-11-22
styling: "../styling/toast-styling.md"
component: "src/components/ds/Toast.tsx"
---

## Overview

A short, transient message confirming an action or reporting a status. Use the built-in Toast; don't add a third-party toast library.

- Also known as: Snackbar, notification
- Import: `import { ToastProvider, useToast } from "../components/ds"`

## When to use

- Success: confirming a completed action (most common)
- Info: status updates like a download starting
- Warning: something to watch that doesn't block
- Error: an action failed

Don't use it:

- For information people must act on — use a Banner or Dialog
- For validation errors — show them next to the field

## Variants

| Variant | Description |
| --- | --- |
| **Success** | Green accent |
| **Info** | Blue accent |
| **Warning** | Orange accent |
| **Error** | Red accent |

## Anatomy

| Part | Description |
| --- | --- |
| Container | Raised surface with a 4px colored leading edge |
| Icon | 20px, variant color |
| Header | Optional bold first line |
| Message | Body text |
| Action | Optional inline link |
| Close | Always visible |

## Behavior

- Bottom center, slides up
- Closes after 5s + 1s per 120 words; `duration: Infinity` keeps it
- At most 2 visible; older ones cycle out

## Accessibility

- role="status" (role="alert" for errors)
- Close button labeled "Close notification"
- Never the only place an error appears

## Content

Sentence case unless noted. Be specific.

| ✅ Do | ❌ Don't |
| --- | --- |
| Candidate added | Success! The candidate was added successfully! |
| Couldn't save changes | Error 500 |

## Related

- [Banner](banner.md)

## Changelog

| Date | Author | Change |
| --- | --- | --- |
| 2026-11-22 | Mick Bailey | Initial version |
