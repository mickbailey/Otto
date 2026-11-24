# Roles and permissions

Prototypes often need to show how the experience changes by role. The template ships five roles and one permission table so you can demo that realistically.

> This is a **prototype demo, not security.** Everything runs in the browser and anyone can switch roles. Never put real data behind it.

## Roles

| Role | Persona (sample) | Sees |
| --- | --- | --- |
| **Admin** | Jordan Park, Operations Admin | Everything, including settings and role management |
| **Manager** | Dana Whitfield, Recruiting Manager | Accounts, requisitions, contacts, candidates, employees, reports |
| **Recruiter** | Marisol Ortega, Senior Technical Recruiter | Accounts, requisitions, candidates, consultants (default role) |
| **Sales** | Alex Kiaya, Account Manager | Accounts, requisitions, contacts |
| **Contributor** | Sam Rivera, Product Designer | Read-only views and the design system, for designers, PMs and stakeholders |

Switch roles from the **account menu** in the top right. The side navigation, page access and actions update immediately. You can also link to a role with `?role=<id>`, e.g. `/#/?role=sales`.

## Side navigation by role

Each role gets its own rail, in this order. The source of truth is `ROLE_NAV` in `src/roles/roles.tsx`; an item also needs its permission to show, so the rail never links to a page the role can't open.

| Role | Side navigation |
| --- | --- |
| Admin | Home · Accounts · Requisitions · Contacts · Candidates · Employees · Design System · Settings |
| Sales (AM) | Home · Accounts · Requisitions · Contacts |
| Recruiter | Home · Accounts · Requisitions · Candidates · Consultants |
| Manager | Home · Accounts · Requisitions · Contacts · Candidates · Employees |
| Contributor | Home · Accounts · Requisitions · Contacts · Candidates · Design System |

Rail icons are Material Icons (filled) at 24px.

## Permissions

| Permission | Admin | Manager | Recruiter | Sales | Contributor |
| --- | :-: | :-: | :-: | :-: | :-: |
| `candidates.view` | ✓ | ✓ | ✓ | | ✓ |
| `candidates.edit` | ✓ | ✓ | ✓ | | |
| `activity.create` | ✓ | ✓ | ✓ | ✓ | |
| `requisitions.view` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `requisitions.manage` | ✓ | ✓ | | ✓ | |
| `accounts.view` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `contacts.view` | ✓ | ✓ | | ✓ | ✓ |
| `employees.view` | ✓ | ✓ | | | |
| `consultants.view` | ✓ | | ✓ | | |
| `reports.view` | ✓ | ✓ | | | ✓ |
| `settings.manage` | ✓ | | | | |
| `designSystem.view` | ✓ | | | | ✓ |
| `branches.switch` | ✓ | ✓ | ✓ | ✓ | ✓ |

The source of truth is `ROLE_PERMISSIONS` in `src/roles/roles.tsx`; the Settings page (admin only) renders the same table live.

## Use it in code

Check a permission, never a role name. That way changing who can do what is a one-line edit to the table.

```tsx
import { Can, useRole } from "../roles/roles";

// Hide an action
<Can permission="requisitions.manage">
  <Button variant="primary" icon="add">New requisition</Button>
</Can>

// Branch on it
const { can } = useRole();
if (can("reports.view")) { … }

// Protect a route (src/app/routes.tsx)
{ path: "reports", element: <RequirePermission permission="reports.view"><ReportsPage /></RequirePermission> }
```

Navigation destinations are defined once in `NAV` (`src/app/layout/RootLayout.tsx`); `ROLE_NAV` picks and orders them per role. A page the current role can't see explains why and how to switch, instead of showing a blank screen.

## Add a permission

1. Add it to `PERMISSIONS` and give it a label in `PERMISSION_LABELS`.
2. Grant it to roles in `ROLE_PERMISSIONS`.
3. Gate UI with `<Can>`, `can()` or `RequirePermission`.
4. Update the table in this file.

## Add or rename a role

Edit `ROLES` and `ROLE_INFO` (label, description, sample persona), then give it permissions in `ROLE_PERMISSIONS`. TypeScript will point out anything you missed.
