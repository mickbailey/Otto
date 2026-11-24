/**
 * Role-based access for prototypes. See ROLES_AND_PERMISSIONS.md.
 * This is a *demo* of role-specific experiences, not security: everything runs in the browser.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export const ROLES = ["admin", "manager", "recruiter", "sales", "contributor"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_INFO: Record<Role, { label: string; description: string; persona: string }> = {
  admin: { label: "Admin", description: "Everything, including settings and role management.", persona: "Jordan Park, Operations Admin" },
  manager: { label: "Manager", description: "Team performance, reports, accounts and every candidate.", persona: "Dana Whitfield, Recruiting Manager" },
  recruiter: { label: "Recruiter", description: "Candidates, activity and requisitions they're working.", persona: "Marisol Ortega, Senior Technical Recruiter" },
  sales: { label: "Sales", description: "Accounts, requisitions and client activity.", persona: "Alex Kiaya, Account Manager" },
  contributor: { label: "Contributor", description: "Read-only access for designers, PMs and stakeholders.", persona: "Sam Rivera, Product Designer" },
};

export const PERMISSIONS = [
  "candidates.view",
  "candidates.edit",
  "activity.create",
  "requisitions.view",
  "requisitions.manage",
  "accounts.view",
  "contacts.view",
  "employees.view",
  "consultants.view",
  "reports.view",
  "settings.manage",
  "designSystem.view",
  "branches.switch",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const PERMISSION_LABELS: Record<Permission, string> = {
  "candidates.view": "View candidates",
  "candidates.edit": "Edit candidates",
  "activity.create": "Log activity",
  "requisitions.view": "View requisitions",
  "requisitions.manage": "Create and close requisitions",
  "accounts.view": "View accounts",
  "contacts.view": "View client contacts",
  "employees.view": "View employees",
  "consultants.view": "View consultants on assignment",
  "reports.view": "View reports",
  "settings.manage": "Manage settings and roles",
  "designSystem.view": "View design system",
  "branches.switch": "Switch design variants",
};

/** The single source of truth for who can do what. Edit this table to change access. */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [...PERMISSIONS],
  manager: ["candidates.view", "candidates.edit", "activity.create", "requisitions.view", "requisitions.manage", "accounts.view", "contacts.view", "employees.view", "reports.view", "branches.switch"],
  recruiter: ["candidates.view", "candidates.edit", "activity.create", "requisitions.view", "accounts.view", "consultants.view", "branches.switch"],
  sales: ["requisitions.view", "requisitions.manage", "accounts.view", "contacts.view", "activity.create", "branches.switch"],
  contributor: ["candidates.view", "requisitions.view", "accounts.view", "contacts.view", "reports.view", "designSystem.view", "branches.switch"],
};

/**
 * Side navigation per role, in order. Each item still needs its permission to show,
 * so the rail can never link to a page the role can't open.
 */
export const NAV_ITEMS = ["home", "accounts", "requisitions", "contacts", "candidates", "consultants", "employees", "designSystem", "settings"] as const;
export type NavItemId = (typeof NAV_ITEMS)[number];

export const ROLE_NAV: Record<Role, NavItemId[]> = {
  admin: ["home", "accounts", "requisitions", "contacts", "candidates", "employees", "designSystem", "settings"],
  sales: ["home", "accounts", "requisitions", "contacts"],
  recruiter: ["home", "accounts", "requisitions", "candidates", "consultants"],
  manager: ["home", "accounts", "requisitions", "contacts", "candidates", "employees"],
  contributor: ["home", "accounts", "requisitions", "contacts", "candidates", "designSystem"],
};

interface RoleContextValue {
  role: Role;
  setRole: (r: Role) => void;
  can: (p: Permission) => boolean;
}

const RoleContext = createContext<RoleContextValue | null>(null);
const STORAGE_KEY = "otto-role";

function initialRole(): Role {
  try {
    const fromUrl = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("role");
    if (fromUrl && (ROLES as readonly string[]).includes(fromUrl)) return fromUrl as Role;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (ROLES as readonly string[]).includes(saved)) return saved as Role;
  } catch { /* storage unavailable: fall back to default */ }
  return "recruiter";
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(initialRole);
  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    try { localStorage.setItem(STORAGE_KEY, r); } catch { /* ignore */ }
  }, []);
  const value = useMemo(() => ({ role, setRole, can: (p: Permission) => ROLE_PERMISSIONS[role].includes(p) }), [role, setRole]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}

/** Renders children only when the current role has the permission. */
export function Can({ permission, children, fallback = null }: { permission: Permission; children: ReactNode; fallback?: ReactNode }) {
  return <>{useRole().can(permission) ? children : fallback}</>;
}
