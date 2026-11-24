import { AccountDetailPage } from "./pages/AccountDetailPage";
import { createHashRouter, Link } from "react-router-dom";
import { RequirePermission, RootLayout } from "./layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { CandidatesPage } from "./pages/CandidatesPage";
import { CandidateDetailPage } from "./pages/CandidateDetailPage";
import { NewActivityPage } from "./pages/NewActivityPage";
import { AccountsPage, ConsultantsPage, ContactsPage, EmployeesPage, ReportsPage, RequisitionsPage, SettingsPage } from "./pages/WorkspacePages";
import { DesignSystemLayout } from "./pages/design-system/DesignSystemLayout";
import { FoundationsPage } from "./pages/design-system/FoundationsPage";
import { ComponentsPage } from "./pages/design-system/ComponentsPage";
import { PatternsLayoutsPage } from "./pages/design-system/PatternsLayoutsPage";
import { EmptyState } from "../components/ds";

// Hash routing works on any static host (GitHub Pages, S3, a container) with no server rewrites.
export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "candidates", element: <RequirePermission permission="candidates.view"><CandidatesPage /></RequirePermission> },
      { path: "candidates/:id", element: <RequirePermission permission="candidates.view"><CandidateDetailPage /></RequirePermission> },
      { path: "candidates/:id/activity/new", element: <RequirePermission permission="activity.create"><NewActivityPage /></RequirePermission> },
      { path: "requisitions", element: <RequirePermission permission="requisitions.view"><RequisitionsPage /></RequirePermission> },
      { path: "accounts", element: <RequirePermission permission="accounts.view"><AccountsPage /></RequirePermission> },
      { path: "accounts/:id", element: <RequirePermission permission="accounts.view"><AccountDetailPage /></RequirePermission> },
      { path: "contacts", element: <RequirePermission permission="contacts.view"><ContactsPage /></RequirePermission> },
      { path: "employees", element: <RequirePermission permission="employees.view"><EmployeesPage /></RequirePermission> },
      { path: "consultants", element: <RequirePermission permission="consultants.view"><ConsultantsPage /></RequirePermission> },
      { path: "reports", element: <RequirePermission permission="reports.view"><ReportsPage /></RequirePermission> },
      { path: "settings", element: <RequirePermission permission="settings.manage"><SettingsPage /></RequirePermission> },
      {
        path: "design-system",
        element: <RequirePermission permission="designSystem.view"><DesignSystemLayout /></RequirePermission>,
        children: [
          { index: true, element: <FoundationsPage /> },
          { path: "components", element: <ComponentsPage /> },
          { path: "patterns", element: <PatternsLayoutsPage /> },
        ],
      },
      { path: "*", element: <div className="otto-page__main"><EmptyState title="Page not found" text="Check the address, or start again from the home page." action={<Link className="otto-btn otto-btn--secondary" to="/">Go to home</Link>} /></div> },
    ],
  },
]);
