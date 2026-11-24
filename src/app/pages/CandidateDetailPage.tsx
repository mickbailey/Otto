import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Badge, Card, EmptyState, Icon, PageHeader, StandardPage, StaticField, Tabs, Tag, Tags } from "../../components/ds";
import { ACTIVITY, CANDIDATES, REQUISITIONS } from "../../data/sample";
import { Can } from "../../roles/roles";

export function CandidateDetailPage() {
  const { id } = useParams();
  const c = CANDIDATES.find((x) => x.id === id);
  const [tab, setTab] = useState("overview");
  if (!c) return <div className="otto-page__main"><EmptyState title="Candidate not found" text="They may have been removed from this sample data." action={<Link className="otto-btn otto-btn--secondary" to="/candidates">Back to candidates</Link>} /></div>;

  const activity = ACTIVITY.filter((a) => a.candidate === c.id);

  return (
    <StandardPage
      header={
        <PageHeader
          title={c.name}
          crumbs={[{ label: "Candidates", to: "/candidates" }, { label: c.name }]}
          back="/candidates"
          description={<span className="flex flex-wrap items-center gap-x-5 gap-y-2"><span>{c.currentRole}</span><Badge>{c.status}</Badge></span>}
          actions={
            <Can permission="activity.create">
              <Link to={`/candidates/${c.id}/activity/new`} className="otto-btn otto-btn--primary"><Icon name="add" size={16} />New activity</Link>
            </Can>
          }
        />
      }
    >
      <div className="otto-card">
        <div className="otto-card__header otto-contact">
          <Avatar name={c.name} navy />
          <a href={`mailto:${c.email}`}><Icon name="mail" size={18} />{c.email}</a>
          <a href={`tel:${c.phone.replace(/\D/g, "")}`}><Icon name="phone" size={18} />{c.phone}</a>
          <span className="flex items-center gap-2"><Icon name="place" size={18} />{c.location}</span>
        </div>
        <div style={{ padding: "8px 20px 24px" }}>
          <Tabs
            label="Candidate sections"
            value={tab}
            onChange={setTab}
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <div className="flex flex-col gap-4">
                    <div className="otto-field-row">
                      <StaticField label="Start availability" icon="calendar">{c.availability}</StaticField>
                      <StaticField label="Desired pay">{c.desiredPay}</StaticField>
                    </div>
                    <div className="otto-field-row">
                      <StaticField label="Education">{c.education}</StaticField>
                      <StaticField label="Recruiter">{c.recruiter}</StaticField>
                    </div>
                    <div className="otto-field"><span className="otto-label">Skill sets</span><Tags>{c.skills.map((s) => <Tag key={s}>{s}</Tag>)}</Tags></div>
                  </div>
                ),
              },
              {
                id: "activity",
                label: "Activity",
                content: activity.length ? (
                  <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
                    {activity.map((a) => {
                      const req = REQUISITIONS.find((r) => r.id === a.req);
                      return (
                        <li key={a.id} style={{ display: "grid", gridTemplateColumns: "32px minmax(0,1fr)", gap: 14, padding: "14px 0", borderTop: "1px solid var(--otto-on-surface-300)" }}>
                          <Avatar name={a.by} size="md" navy />
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <strong style={{ fontWeight: 600 }}>{a.by}</strong>
                              <span className="otto-muted">logged a</span>
                              <strong style={{ fontWeight: 600 }}>{a.type}</strong>
                              <span className="otto-caption otto-muted" style={{ marginLeft: "auto" }}>{a.when}</span>
                            </div>
                            <p>{a.note}</p>
                            {req && <span><span className="otto-tag"><Icon name="link" size={14} style={{ marginRight: 6 }} />{req.title}</span></span>}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                ) : <EmptyState icon="doc" title="No activity yet" text="Calls, notes and submittals for this candidate will show here." />,
              },
            ]}
          />
        </div>
      </div>
      <Card title="Open requisitions they fit">
        <Tags>{REQUISITIONS.slice(0, 3).map((r) => <Tag key={r.id} icon="badge">{r.title}</Tag>)}</Tags>
      </Card>
    </StandardPage>
  );
}
