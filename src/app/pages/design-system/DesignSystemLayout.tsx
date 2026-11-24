import { NavLink, Outlet } from "react-router-dom";
import { PageContainer, PageHeader } from "../../../components/ds";

const SECTIONS = [
  { to: "/design-system", label: "Foundations", end: true },
  { to: "/design-system/components", label: "Components" },
  { to: "/design-system/patterns", label: "Patterns and Layouts" },
];

/** Living documentation: every page here is built only from the design system it documents. */
export function DesignSystemLayout() {
  return (
    <PageContainer>
      <PageHeader title="Design System" description="Otto foundations, components and page patterns. These pages double as a QA reference: if something looks wrong here, it's wrong everywhere." />
      <nav className="otto-tabs" aria-label="Design system sections">
        {SECTIONS.map((s) => (
          // NavLink sets aria-current="page" on the active link, which draws the tab underline.
          <NavLink key={s.to} to={s.to} end={s.end} className="otto-tab">{s.label}</NavLink>
        ))}
      </nav>
      <Outlet />
    </PageContainer>
  );
}
