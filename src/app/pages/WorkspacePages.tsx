import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Card, DataTable, Icon, Input, PageHeader, Pill, SideSheet, StandardPage, useToast, type Column } from "../../components/ds";
import { ACCOUNTS, CONSULTANTS, CONTACTS, EMPLOYEES, REQUISITIONS, type Requisition } from "../../data/sample";
import { Can, PERMISSIONS, PERMISSION_LABELS, ROLES, ROLE_INFO, ROLE_PERMISSIONS } from "../../roles/roles";

/* ---------------- Requisitions ---------------- */

export function RequisitionsPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Requisition | null>(null);
  const toast = useToast();
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REQUISITIONS.filter((r) => !q || `${r.title} ${r.client} ${r.location} ${r.id}`.toLowerCase().includes(q));
  }, [query]);

  const columns: Column<Requisition>[] = [
    { key: "title", header: "Requisition", sortValue: (r) => r.title, render: (r) => <span className="flex flex-col"><span style={{ fontWeight: 600 }}>{r.title}</span><span className="otto-caption otto-muted">{r.id} · {r.type}</span></span> },
    { key: "client", header: "Client", sortValue: (r) => r.client, render: (r) => r.client },
    { key: "location", header: "Location", sortValue: (r) => r.location, render: (r) => r.location },
    { key: "pay", header: "Pay", render: (r) => r.pay },
    { key: "status", header: "Status", sortValue: (r) => r.status, render: (r) => <Badge tone={r.status === "Interviewing" ? "primary" : r.status === "On hold" ? "error" : "default"}>{r.status}</Badge> },
    { key: "cpfs", header: "CPFs", numeric: true, sortValue: (r) => r.cpfs, render: (r) => r.cpfs },
    { key: "subs", header: "Submittals", numeric: true, sortValue: (r) => r.submittals, render: (r) => r.submittals },
  ];

  const totals = REQUISITIONS.reduce((a, r) => ({ cpfs: a.cpfs + r.cpfs, subs: a.subs + r.submittals }), { cpfs: 0, subs: 0 });

  return (
    <StandardPage
      header={
        <PageHeader
          title="Requisitions"
          description={`${REQUISITIONS.length} open requisitions · ${totals.cpfs} CPFs · ${totals.subs} submittals`}
          actions={<Can permission="requisitions.manage"><Button variant="primary" icon="add" onClick={() => toast.info("Requisition creation isn't part of this prototype.")}>New requisition</Button></Can>}
        />
      }
    >
      <Input label="Search requisitions" hideLabel leftIcon="search" placeholder="Search by title, client, location or ID..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="otto-card" style={{ padding: 16 }}>
        <DataTable caption="Requisitions" columns={columns} rows={rows} rowKey={(r) => r.id} onRowClick={setOpen} pageSize={8} emptyTitle="No requisitions match" />
      </div>
      <SideSheet
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.title ?? ""}
        footer={<Button variant="secondary" onClick={() => setOpen(null)}>Close</Button>}
      >
        {open && (
          <>
            <p className="otto-muted">{open.id} · {open.client} · {open.location}</p>
            <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 20px", margin: 0 }}>
              {[["Type", open.type], ["Pay", open.pay], ["Account manager", open.am], ["Hiring manager", open.hm], ["CPFs", String(open.cpfs)], ["Submittals", String(open.submittals)]].map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}><dt className="otto-muted">{k}</dt><dd style={{ margin: 0 }}>{v}</dd></div>
              ))}
            </dl>
            {open.summary && <><h3 className="otto-subtitle">What's this job really about?</h3><p style={{ lineHeight: 1.6 }}>{open.summary}</p></>}
          </>
        )}
      </SideSheet>
    </StandardPage>
  );
}

/* ---------------- Accounts ---------------- */

type Account = (typeof ACCOUNTS)[number];

export function AccountsPage() {
  const navigate = useNavigate();
  const columns: Column<Account>[] = [
    { key: "name", header: "Account", sortValue: (a) => a.name, render: (a) => <Link to={`/accounts/${a.id}`} className="otto-table-link" onClick={(e) => e.stopPropagation()}>{a.name}</Link> },
    { key: "industry", header: "Industry", sortValue: (a) => a.industry, render: (a) => a.industry },
    { key: "hq", header: "Headquarters", sortValue: (a) => a.hq, render: (a) => <span className="flex items-center gap-2"><Icon name="place" size={16} />{a.hq}</span> },
    { key: "am", header: "Account manager", sortValue: (a) => a.am, render: (a) => a.am },
    { key: "reqs", header: "Open reqs", numeric: true, sortValue: (a) => a.openReqs, render: (a) => a.openReqs },
  ];
  return (
    <StandardPage header={<PageHeader title="Accounts" description="Clients and the requisitions open with each." />}>
      <div className="otto-card" style={{ padding: 16 }}>
        <DataTable caption="Accounts" columns={columns} rows={ACCOUNTS} rowKey={(a) => a.id} onRowClick={(a) => navigate(`/accounts/${a.id}`)} />
      </div>
    </StandardPage>
  );
}

/* ---------------- Reports ---------------- */

export function ReportsPage() {
  const kpis = [
    { label: "CPFs this month", value: "39", delta: "+8 vs October" },
    { label: "Submittals", value: "17", delta: "+3 vs October" },
    { label: "Interviews", value: "9", delta: "Same as October" },
    { label: "Median days to submit", value: "4.5", delta: "−1.2 days" },
  ];
  const byReq = REQUISITIONS.slice(0, 6);
  const max = Math.max(...byReq.map((r) => r.cpfs));
  return (
    <StandardPage header={<PageHeader title="Reports" description="Sample team metrics. Replace with real data when you connect an API." />}>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {kpis.map((k) => (
          <div key={k.label} className="otto-card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="otto-label">{k.label}</span>
            <span style={{ font: "var(--otto-text-headline)", fontVariantNumeric: "tabular-nums" }}>{k.value}</span>
            <span className="otto-caption otto-muted">{k.delta}</span>
          </div>
        ))}
      </div>
      <Card title="CPFs by requisition">
        <div role="img" aria-label={byReq.map((r) => `${r.title}: ${r.cpfs}`).join(", ")} className="flex flex-col gap-3">
          {byReq.map((r) => (
            <div key={r.id} className="grid items-center gap-3" style={{ gridTemplateColumns: "minmax(140px, 260px) 1fr 32px" }}>
              <span className="otto-caption" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</span>
              <span style={{ height: 10, borderRadius: 5, background: "var(--otto-on-surface-300)" }}>
                <span style={{ display: "block", height: 10, borderRadius: 5, background: "var(--otto-accent-200)", width: `${(r.cpfs / max) * 100}%` }} />
              </span>
              <span className="otto-caption" style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.cpfs}</span>
            </div>
          ))}
        </div>
      </Card>
    </StandardPage>
  );
}

/* ---------------- Settings: roles and permissions ---------------- */

export function SettingsPage() {
  return (
    <StandardPage header={<PageHeader title="Roles and Permissions" description="Who can do what in this prototype. Edit ROLE_PERMISSIONS in src/roles/roles.tsx to change it." />}>
      <div className="otto-card" style={{ padding: 16 }}>
        <div className="otto-table-wrap">
          <table className="otto-table">
            <caption className="otto-sr">Permissions by role</caption>
            <thead>
              <tr>
                <th scope="col">Permission</th>
                {ROLES.map((r) => <th key={r} scope="col" style={{ textAlign: "center" }}>{ROLE_INFO[r].label}</th>)}
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((p) => (
                <tr key={p}>
                  <th scope="row" style={{ fontWeight: 400, color: "var(--otto-on-surface-800)", fontSize: 14, height: 48 }}>{PERMISSION_LABELS[p]}<span className="otto-caption otto-muted" style={{ display: "block", fontFamily: "var(--otto-font-mono)" }}>{p}</span></th>
                  {ROLES.map((r) => (
                    <td key={r} style={{ textAlign: "center" }}>
                      {ROLE_PERMISSIONS[r].includes(p)
                        ? <Icon name="check" label="Allowed" style={{ color: "var(--otto-success-800)" }} />
                        : <span className="otto-muted" aria-label="Not allowed">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {ROLES.map((r) => (
          <div key={r} className="otto-card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="otto-subtitle">{ROLE_INFO[r].label}</span>
            <span className="otto-caption">{ROLE_INFO[r].persona}</span>
            <span className="otto-caption otto-muted">{ROLE_INFO[r].description}</span>
          </div>
        ))}
      </div>
    </StandardPage>
  );
}

/* ---------------- Contacts ---------------- */

type Contact = (typeof CONTACTS)[number];

export function ContactsPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CONTACTS.filter((c) => !q || `${c.name} ${c.title} ${c.account}`.toLowerCase().includes(q));
  }, [query]);
  const columns: Column<Contact>[] = [
    { key: "name", header: "Name", sortValue: (c) => c.name, render: (c) => <span className="flex items-center gap-3"><Avatar name={c.name} size="sm" navy /><span className="flex flex-col"><span style={{ fontWeight: 600 }}>{c.name}</span><span className="otto-caption otto-muted">{c.title}</span></span></span> },
    { key: "account", header: "Account", sortValue: (c) => c.account, render: (c) => c.account },
    { key: "office", header: "Office", sortValue: (c) => c.office, render: (c) => <Pill icon="place">{c.office}</Pill> },
    { key: "phone", header: "Phone", render: (c) => c.phone },
    { key: "last", header: "Last contact", sortValue: (c) => Date.parse(c.lastContact), render: (c) => c.lastContact },
  ];
  return (
    <StandardPage header={<PageHeader title="Contacts" description="Hiring managers and decision makers at your accounts." actions={<Button variant="primary" icon="add">New contact</Button>} />}>
      <Input label="Search contacts" hideLabel leftIcon="search" placeholder="Search by name, title or account..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="otto-card" style={{ padding: 16 }}>
        <DataTable caption="Contacts" columns={columns} rows={rows} rowKey={(c) => c.id} emptyTitle="No contacts match" />
      </div>
    </StandardPage>
  );
}

/* ---------------- Employees ---------------- */

type Employee = (typeof EMPLOYEES)[number];

export function EmployeesPage() {
  const columns: Column<Employee>[] = [
    { key: "name", header: "Name", sortValue: (e) => e.name, render: (e) => <span className="flex items-center gap-3"><Avatar name={e.name} size="sm" /><span style={{ fontWeight: 600 }}>{e.name}</span></span> },
    { key: "role", header: "Role", sortValue: (e) => e.role, render: (e) => e.role },
    { key: "team", header: "Team", sortValue: (e) => e.team, render: (e) => e.team },
    { key: "office", header: "Office", sortValue: (e) => e.office, render: (e) => <Pill icon="place">{e.office}</Pill> },
    { key: "start", header: "Start date", render: (e) => e.start },
  ];
  return (
    <StandardPage header={<PageHeader title="Employees" description="Your internal team across offices." />}>
      <div className="otto-card" style={{ padding: 16 }}>
        <DataTable caption="Employees" columns={columns} rows={EMPLOYEES} rowKey={(e) => e.id} />
      </div>
    </StandardPage>
  );
}

/* ---------------- Consultants ---------------- */

type Consultant = (typeof CONSULTANTS)[number];

export function ConsultantsPage() {
  const columns: Column<Consultant>[] = [
    { key: "name", header: "Name", sortValue: (c) => c.name, render: (c) => <span className="flex items-center gap-3"><Avatar name={c.name} size="sm" navy /><span className="flex flex-col"><span style={{ fontWeight: 600 }}>{c.name}</span><span className="otto-caption otto-muted">{c.role}</span></span></span> },
    { key: "account", header: "Account", sortValue: (c) => c.account, render: (c) => c.account },
    { key: "location", header: "Location", sortValue: (c) => c.location, render: (c) => c.location },
    { key: "end", header: "Assignment ends", sortValue: (c) => Date.parse(c.end), render: (c) => c.end },
    { key: "status", header: "Status", sortValue: (c) => c.status, render: (c) => <Badge tone={c.status === "Ending soon" ? "primary" : "default"}>{c.status}</Badge> },
  ];
  return (
    <StandardPage header={<PageHeader title="Consultants" description="People you've placed who are on assignment now. Check in before assignments end." />}>
      <div className="otto-card" style={{ padding: 16 }}>
        <DataTable caption="Consultants on assignment" columns={columns} rows={CONSULTANTS} rowKey={(c) => c.id} />
      </div>
    </StandardPage>
  );
}
