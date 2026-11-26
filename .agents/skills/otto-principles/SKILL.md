---
name: otto-principles
description: Apply Otto's UX, content and accessibility principles (forms, action labels, sentence case, one primary action, empty and error states, filters, roles, made-up data) when designing or reviewing any prototype screen or flow. Use when deciding what a screen contains, writing UI copy, designing a form, or checking a flow before or after building it.
---

# Otto principles

These are the judgment rules that a linter can't fully check. Source of truth: `Guidelines.md` (sections Principles, Form design, Content and copy, Action labels). Apply them while designing, not after.

## Product principles

- **Team collaboration is the foundational principle.** Otto exists for people working together, so showcase the team and celebrate shared wins wherever a screen has the chance. Show who is on the work (avatar stacks, account teams, who did what with whom) and mark shared success (origin stories, milestones, recognition). Example: the account page's sticky bar keeps the team's avatars next to the account name as you scroll. On every screen ask "where does the team belong here?" and give that area visual weight. Favor people over counts; keep celebration warm and understated, using existing components and tokens (never primary yellow for it).
- Intentional, detail-oriented, consistent. Proven patterns first, creativity second. Prefer what's simple to build.
- Accessible by default: native elements, visible focus, AA contrast on every surface, a keyboard path for every interaction.
- **Primary yellow is rare**: one primary action per area. Accent carries selection, chips, counts, the active tab.
- **Never hide a filter option because nothing matches it now.** An empty result is expected; a missing option looks broken.
- Prototypes use made-up data only.

## Forms (Adam Silver, *Form Design Patterns*)

1. Ask only for what's needed. Explain why for unusual or sensitive data.
2. One thing at a time: reveal a follow-up question right after the question that triggers it.
3. Label above every field. **No placeholders** on data entry. Exceptions: search fields (placeholder + search icon + `hideLabel`) and `NoteComposer` ("Add a note...").
4. Simplest control that removes ambiguity: select, radio, checkbox, date, autocomplete.
5. Parse, format and pre-fill when the UI can.
6. Validation says what's wrong and how to fix it, sits under the field, replaces helper text. On submit show all errors and move focus to the first.
7. Single column by default. Two columns only for short, independent, related fields. Long text, addresses and notes are full width.
8. Actions at the end of the form or section: **Cancel (secondary), then Submit/Save (primary)**. Forms also get a `StickyBar` with the page title and the same Cancel and Submit once the title scrolls away (see Guidelines, Form design). Leaving with unsaved work always shows the same discard dialog; Discard is its primary, destructive action.

## Copy

- **Sentence case** for buttons, labels, column headers, field names, status, links, tooltips, helper text. **Title Case** only for page titles, section titles, tab labels, in-page navigation labels. Proper nouns keep capitals.
- Plain language. Say what happened and what to do next. No "Oops", no exclamation marks in errors.
- Action verbs are fixed. New (start creating), Create (confirm creation), Add (put an existing thing into a context), Save, Submit, Apply, Cancel, Discard, Delete (permanent), Remove (take out, not destroy), Edit, View details, Download/Upload, Log in/Log out, Back/Next. Avoid OK, Done, Yes when a specific verb exists.
- **A + icon never pairs with "Add".** Use "New ..." (New activity, New contact).
- Destructive styling is for critical feedback and irreversible actions only.

## Hierarchy and layout

- Build hierarchy with cards, sections and expansion panels, not stray divider lines.
- Progressive shades: page 900, cards 800, nested 700. Page titles may sit on the page; content sits on cards.
- Keep the primary action near the content it submits. Long forms: titled cards or `ExpansionPanel`, plus `InPageNavigation` when people need to jump.
- Chips: input chips are removable, filter chips toggle, tags are read-only, badges are status.
- Menus for 5+ options; destructive items last, after a divider; no nested submenus.
- Feedback: toast for transient results (success is most common), banner for page-level status, notice for in-context information, dialog only when a decision blocks progress.

## States to design every time

Empty (use `EmptyState` with a next step), loading, error, disabled-but-visible, long text, many items (pagination), and each role that can see it.

## Review checklist (use on your own output)

- [ ] The team is visible where it matters (who is on the work, who did what) and shared wins are celebrated
- [ ] Each area has at most one primary action
- [ ] No placeholder on a data field (except search, NoteComposer)
- [ ] Sentence case UI text; Title Case only where allowed
- [ ] Verbs from the action table; no "+ Add"
- [ ] Errors specific and next to the problem
- [ ] No filter option hidden by empty data
- [ ] Empty, error and disabled states exist and look intentional
- [ ] Works by keyboard; icon-only controls labeled
- [ ] Data is made up
