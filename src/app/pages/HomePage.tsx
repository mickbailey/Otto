import { Link } from "react-router-dom";
import { Badge, Card, Icon, PageHeader, StandardPage, type IconName } from "../../components/ds";
import { ROLE_INFO, useRole } from "../../roles/roles";
import { BRANCHES } from "../../branching/branches";

const tiles: Array<{ to: string; icon: IconName; title: string; text: string }> = [
  { to: "/candidates/c-1001/activity/new", icon: "edit", title: "Log an activity", text: "The recruiter flow: attach a requisition and get an AI summary and screening questions." },
  { to: "/design-system", icon: "sparkle", title: "Design system", text: "Foundations, every component with its states, and page patterns." },
  { to: "/settings", icon: "shield", title: "Roles and permissions", text: "Five roles, one permission table, role-specific navigation." },
  { to: "/candidates/c-1001/activity/new?branch=req-panel-tabs", icon: "branch", title: "Design variants", text: "Open the Variants panel to compare options live, then share a link to the exact one." },
];

export function HomePage() {
  const { role } = useRole();
  return (
    <StandardPage header={<PageHeader title="Otto" description="A design-system-driven starting point for deployable, high-fidelity prototypes. Fork it, rename it, and start on the product question instead of the plumbing." />}>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="otto-card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 8, background: "var(--otto-accent-800)", display: "grid", placeItems: "center", color: "var(--otto-accent-100)" }}><Icon name={t.icon} /></span>
            <span className="otto-subtitle">{t.title}</span>
            <span className="otto-muted">{t.text}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <Card title="You're viewing as">
          <p><strong style={{ fontWeight: 600 }}>{ROLE_INFO[role].label}</strong> · {ROLE_INFO[role].persona}</p>
          <p className="otto-muted">{ROLE_INFO[role].description} Switch roles from the account menu in the top right; the navigation and pages change to match.</p>
        </Card>
        <Card title="Variants in this prototype">
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {BRANCHES.map((b) => (
              <li key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ marginRight: "auto" }}>{b.name}</span>
                <Badge tone={b.status}>{b.status[0]!.toUpperCase() + b.status.slice(1)}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </StandardPage>
  );
}
