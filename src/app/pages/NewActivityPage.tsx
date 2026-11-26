import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete, Avatar, Button, Checkbox, Dialog, EmptyState, Icon, Input, Notice, PageHeader, Select, StandardPage, StickyBar, Tabs, Tag, Tags, Textarea, highlight, useToast,
} from "../../components/ds";
import { CANDIDATES, REQUISITIONS, type Requisition } from "../../data/sample";
import { BranchSwitch } from "../../branching/BranchContext";

const ACTIVITY_TYPES = ["Candidate profile (CPF)", "Call", "Note", "Submittal", "Interview"];

/* ---------- Right-hand panel variants (see branching/branches.ts) ---------- */

function ReqHeader({ req }: { req: Requisition }) {
  return (
    <div className="otto-section">
      <h3>Attached requisition</h3>
      <span className="otto-chip otto-chip--lg" style={{ alignSelf: "flex-start" }}>{req.title}</span>
      <span className="otto-body-lg">{req.client}</span>
      <span className="otto-meta"><span>AM: {req.am}</span><span>HM: {req.hm}</span></span>
    </div>
  );
}

function Questions({ req }: { req: Requisition }) {
  return (
    <ol className="otto-qlist">
      {req.questions.map((q) => (
        <li key={q.topic}><b>{q.topic}:</b> “{q.question}” <i>Listen for: {q.listenFor}</i></li>
      ))}
    </ol>
  );
}

function PanelSummary({ req }: { req: Requisition }) {
  return (
    <div>
      <ReqHeader req={req} />
      <div className="otto-section">
        <h3>What's this job really about?</h3>
        <p>{req.summary}</p>
        <h3>Screening questions</h3>
        <Questions req={req} />
      </div>
    </div>
  );
}

function PanelTabs({ req }: { req: Requisition }) {
  const [tab, setTab] = useState("summary");
  return (
    <div>
      <ReqHeader req={req} />
      <div className="otto-section">
        <Tabs
          label="Requisition help"
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "summary", label: "Summary", content: <p style={{ lineHeight: 1.6 }}>{req.summary}</p> },
            { id: "questions", label: "Questions", content: <Questions req={req} /> },
            {
              id: "details",
              label: "Details",
              content: (
                <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", margin: 0 }}>
                  {[["Location", req.location], ["Type", req.type], ["Pay", req.pay], ["CPFs", String(req.cpfs)], ["Submittals", String(req.submittals)]].map(([k, v]) => (
                    <div key={k} style={{ display: "contents" }}><dt className="otto-muted">{k}</dt><dd style={{ margin: 0 }}>{v}</dd></div>
                  ))}
                </dl>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function PanelChecklist({ req, onAddToNotes }: { req: Requisition; onAddToNotes: (text: string) => void }) {
  const [asked, setAsked] = useState<string[]>([]);
  const toggle = (t: string) => setAsked((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));
  return (
    <div>
      <ReqHeader req={req} />
      <div className="otto-section">
        <h3>In one sentence</h3>
        <p>{req.summary.split(". ")[0]}.</p>
        <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0, marginRight: "auto" }}>Call checklist</h3>
          <span className="otto-caption otto-muted" aria-live="polite">{asked.length} of {req.questions.length} asked</span>
        </div>
        <div className="flex flex-col gap-3">
          {req.questions.map((q) => (
            <Checkbox
              key={q.topic}
              checked={asked.includes(q.topic)}
              onChange={() => toggle(q.topic)}
              label={<span><b style={{ fontWeight: 600 }}>{q.topic}.</b> {q.question}<span className="otto-caption otto-muted" style={{ display: "block", marginTop: 4 }}>Listen for: {q.listenFor}</span></span>}
            />
          ))}
        </div>
        <Button size="sm" variant="secondary" icon="add" disabled={!asked.length} onClick={() => onAddToNotes(asked.map((t) => `asked re ${t.toLowerCase()}: `).join("\n"))} style={{ alignSelf: "flex-start", marginTop: 8 }}>
          Insert into notes
        </Button>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export function NewActivityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const c = CANDIDATES.find((x) => x.id === id) ?? CANDIDATES[0]!;

  const [req, setReq] = useState<Requisition | null>(REQUISITIONS[0]!);
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ type?: string; notes?: string }>({});
  const [confirmCancel, setConfirmCancel] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      type: type ? undefined : "Choose the type of activity you're logging.",
      notes: notes.trim() ? undefined : "Add a few words about what happened, so the next person has context.",
    };
    setErrors(next);
    if (next.type || next.notes) {
      document.getElementById(next.type ? "activity-type" : "activity-notes")?.focus();
      return;
    }
    toast.success(req ? `Activity logged and attached to ${req.title}` : "Activity logged");
    navigate(`/candidates/${c.id}`);
  };

  const panel = req ? (
    req.questions.length ? (
      <BranchSwitch
        feature="req-panel"
        variants={{
          "req-panel-summary": <PanelSummary req={req} />,
          "req-panel-tabs": <PanelTabs req={req} />,
          "req-panel-checklist": <PanelChecklist req={req} onAddToNotes={(t) => setNotes((n) => (n ? `${n}\n${t}` : t))} />,
        }}
      />
    ) : (
      <div><ReqHeader req={req} /><div className="otto-section"><p className="otto-muted">A summary and screening questions haven't been written for this requisition yet.</p></div></div>
    )
  ) : (
    <EmptyState icon="badge" title="No requisition attached" text="Attach one to see a plain-language summary of the job and screening questions for this call." />
  );

  return (
    <>
      <StickyBar title="New activity" watchId="new-activity-title">
        <Button variant="secondary" onClick={() => setConfirmCancel(true)}>Cancel</Button>
        <Button variant="primary" type="submit" form="new-activity-form">Submit</Button>
      </StickyBar>
      <StandardPage
        aside={<><Notice>Requisition summary and screening questions use AI. Check for accuracy.</Notice>{panel}</>}
        header={
          <PageHeader
            title="New activity"
            titleId="new-activity-title"
            back={`/candidates/${c.id}`}
            crumbs={[{ label: "Candidates", to: "/candidates" }, { label: c.name, to: `/candidates/${c.id}` }, { label: "Activity" }]}
          />
        }
      >
        <form id="new-activity-form" onSubmit={submit} noValidate className="otto-card">
          <div className="otto-card__header otto-contact">
            <strong>{c.name}</strong>
            <a href={`mailto:${c.email}`}><Icon name="mail" size={18} />{c.email}</a>
            <a href={`tel:${c.phone.replace(/\D/g, "")}`}><Icon name="phone" size={18} />{c.phone}</a>
            <Link to={`/candidates/${c.id}`}><Icon name="download" size={18} />Resume</Link>
          </div>

          <div className="otto-card__body">
            <h2 className="otto-title">Attach a requisition to this activity</h2>
            <Autocomplete<Requisition>
              label="Requisition"
              hideLabel
              placeholder="Search by title, client or AM..."
              options={REQUISITIONS}
              value={req}
              onChange={setReq}
              getKey={(r) => r.id}
              getLabel={(r) => r.title}
              getSearchText={(r) => `${r.title} ${r.client} ${r.am} ${r.hm} ${r.id}`}
              renderOption={(r, q) => (
                <span>
                  <span className="otto-combobox__option-title">{highlight(r.title, q)}</span>
                  <span className="otto-combobox__option-sub">{highlight(r.client, q)}</span>
                  <span className="otto-combobox__option-meta">AM: <Avatar name={r.am} size="xs" />{highlight(r.am, q)} · HM: {highlight(r.hm, q)}</span>
                </span>
              )}
            />

            <div className="otto-field-row">
              <Select id="activity-type" label="Activity type" required emptyOption options={ACTIVITY_TYPES} value={type} onChange={(e) => setType(e.target.value)} error={errors.type} />
              <Input label="Date" type="date" defaultValue="2026-11-09" />
            </div>
            <div className="otto-field-row">
              <Input label="Current role" defaultValue={c.currentRole} />
              <Input label="Start availability" type="date" defaultValue="2026-12-01" />
            </div>
            <div className="otto-field-row">
              <Select label="Education" emptyOption defaultValue={c.education} options={["BS, Computer Engineering", "BS, Electrical Engineering", "BS, Computer Science", "MS, Computer Engineering", "MS, Electrical Engineering", "Other"]} />
              <Input label="Desired pay" defaultValue={c.desiredPay} helper="Annual salary or hourly rate." />
            </div>
            <div className="otto-field">
              <span className="otto-label">Skill sets</span>
              <Tags>{c.skills.map((s) => <Tag key={s}>{s}</Tag>)}</Tags>
            </div>
            <Textarea id="activity-notes" label="Notes" required rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} error={errors.notes} />

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmCancel(true)}>Cancel</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </StandardPage>

      <Dialog
        open={confirmCancel}
        onClose={() => setConfirmCancel(false)}
        title="Discard this activity?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmCancel(false)}>Keep editing</Button>
            <Button variant="destructive" onClick={() => navigate(`/candidates/${c.id}`)}>Discard</Button>
          </>
        }
      >
        <p>Your notes and the attached requisition won't be saved.</p>
      </Dialog>
    </>
  );
}
