import { useState, type ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Avatar, EmptyState, Icon, MenuTrigger, ToastProvider, useToast, type IconName } from "../../components/ds";
import { ROLES, ROLE_INFO, ROLE_NAV, RoleProvider, useRole, type NavItemId, type Permission } from "../../roles/roles";
import { BranchPanel, BranchProvider } from "../../branching/BranchContext";

interface NavItem { to: string; label: string; icon: IconName; permission?: Permission; end?: boolean }

/** Every destination the rail can show. Which ones each role sees, and in what order, is ROLE_NAV in roles.tsx. */
export const NAV: Record<NavItemId, NavItem> = {
  home: { to: "/", label: "Home", icon: "mHome", end: true },
  accounts: { to: "/accounts", label: "Accounts", icon: "mBusiness", permission: "accounts.view" },
  requisitions: { to: "/requisitions", label: "Requisitions", icon: "mWork", permission: "requisitions.view" },
  contacts: { to: "/contacts", label: "Contacts", icon: "mPerson", permission: "contacts.view" },
  candidates: { to: "/candidates", label: "Candidates", icon: "mPeople", permission: "candidates.view" },
  consultants: { to: "/consultants", label: "Consultants", icon: "mBadge", permission: "consultants.view" },
  employees: { to: "/employees", label: "Employees", icon: "mBadge", permission: "employees.view" },
  designSystem: { to: "/design-system", label: "Design System", icon: "mStyle", permission: "designSystem.view" },
  settings: { to: "/settings", label: "Settings", icon: "mSettings", permission: "settings.manage" },
};

const NAV_KEY = "otto-nav-expanded";

function SideNav({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  const { can, role } = useRole();
  const items = ROLE_NAV[role].map((id) => NAV[id]).filter((n) => !n.permission || can(n.permission));
  return (
    <nav id="otto-sidenav" className="otto-sidenav" aria-label="Main">
      <button
        type="button"
        className="otto-sidenav__item otto-sidenav__item--menu"
        aria-expanded={expanded}
        aria-controls="otto-sidenav"
        aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
        title={expanded ? "Collapse navigation" : "Expand navigation"}
        onClick={onToggle}
      >
        <Icon name={expanded ? "mMenuOpen" : "mMenu"} size={24} />
      </button>
      {items.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          end={n.end}
          className="otto-sidenav__item"
          aria-label={expanded ? undefined : n.label}
          title={expanded ? undefined : n.label}
        >
          <Icon name={n.icon} size={24} />
          <span className="otto-sidenav__label">{n.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function UserMenu() {
  const { role, setRole } = useRole();
  const toast = useToast();
  const persona = ROLE_INFO[role].persona;
  const name = persona.split(",")[0]!;
  return (
    <MenuTrigger
      label="Account menu"
      selected={role}
      align="right"
      minWidth={280}
      items={[
        ...ROLES.map((r, i) => ({ value: r, label: `View as ${ROLE_INFO[r].label}`, secondaryText: ROLE_INFO[r].persona, icon: "person" as IconName, dividerAfter: i === ROLES.length - 1 })),
        { value: "logout", label: "Log out", icon: "logout" as IconName },
      ]}
      onSelect={(v) => {
        if (v === "logout") { toast.info("This is a prototype, so there's nothing to log out of."); return; }
        setRole(v as typeof role);
        toast.success(`Now viewing as ${ROLE_INFO[v as typeof role].label}`);
      }}
      trigger={(p) => (
        <button {...p} type="button" className="otto-user">
          <Avatar name={name} size="sm" />
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.2 }}>
            <span>{name}</span>
            <span className="otto-caption otto-muted">{ROLE_INFO[role].label}</span>
          </span>
          <Icon name="expandMore" size={18} />
        </button>
      )}
    />
  );
}

function Shell() {
  const [expanded, setExpanded] = useState(() => {
    try { return localStorage.getItem(NAV_KEY) === "1"; } catch { return false; }
  });
  const toggle = () => setExpanded((e) => {
    try { localStorage.setItem(NAV_KEY, e ? "0" : "1"); } catch { /* ignore */ }
    return !e;
  });
  return (
    <div className={expanded ? "otto-app otto-app--nav-expanded" : "otto-app"} style={{ minHeight: "100vh" }}>
      <a href="#main" className="otto-sr" style={{ position: "absolute" }} onFocus={(e) => e.currentTarget.classList.remove("otto-sr")} onBlur={(e) => e.currentTarget.classList.add("otto-sr")}>Skip to content</a>
      <SideNav expanded={expanded} onToggle={toggle} />
      <div className="otto-app__main">
        <header className="otto-topbar">
          <UserMenu />
        </header>
        <main id="main" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Outlet />
        </main>
      </div>
      <BranchPanel />
    </div>
  );
}

/** Providers + app shell. Every route renders inside <Outlet />. */
export function RootLayout() {
  return (
    <RoleProvider>
      <ToastProvider>
        <BranchProvider>
          <Shell />
        </BranchProvider>
      </ToastProvider>
    </RoleProvider>
  );
}

/** Wrap a page that needs a permission. Shows an explanation instead of the page when the role lacks it. */
export function RequirePermission({ permission, children }: { permission: Permission; children: ReactNode }) {
  const { can, role } = useRole();
  if (can(permission)) return <>{children}</>;
  return (
    <div className="otto-page__main">
      <EmptyState icon="shield" title="This page isn't available for your role" text={`You're viewing as ${ROLE_INFO[role].label}. Switch roles from the account menu in the top right to see it.`} />
    </div>
  );
}
