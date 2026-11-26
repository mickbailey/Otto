import { useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar, Badge, Button, DataTable, EmptyState, Icon, IconButton, MenuTrigger, NoteComposer, PageHeader, SideSheet, StandardPage, Tag, useToast, type Column, type IconName,
} from "../../components/ds";
import { CANDIDATES, CANDIDATE_CARDS, NOTICE, type Candidate, type CandidateCard, type FeedEntry } from "../../data/sample";
import { BranchSwitch } from "../../branching/BranchContext";

const STATUSES: Candidate["status"][] = ["New", "Screening", "Submitted", "Interviewing"];
const SORTS = [
  { value: "recent", label: "Most recently contacted" },
  { value: "submitted", label: "Most recently submitted" },
  { value: "name", label: "Name A–Z" },
];
const PAGE_SIZES = [10, 25, 50];

function cardFor(c: Candidate): CandidateCard {
  return (
    CANDIDATE_CARDS[c.id] ?? {
      submitted: "1w ago",
      lastTouch: "LMEM: 1w ago",
      quickNote: "",
      feed: [{ type: "CPF", when: c.lastActivity, by: c.recruiter, tags: ["Passive", c.desiredPay] }],
      rates: [{ date: c.lastActivity, rate: c.desiredPay, req: "No requisition yet" }],
    }
  );
}

/* ---------- Search fields (search inputs: placeholder + icon, label hidden) ---------- */

function SearchField({ id, icon, label, value, onChange }: { id: string; icon: IconName; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="otto-search" style={{ minWidth: 0, borderColor: "var(--otto-border)" }}>
      <Icon name={icon} size={22} />
      <label htmlFor={id} className="otto-sr">{label}</label>
      <input id={id} type="search" placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" />
    </div>
  );
}

/* ---------- One candidate card ---------- */

function FeedItem({ e }: { e: FeedEntry }) {
  return (
    <div className="otto-feed-entry">
      <div className="otto-feed-entry__head">
        <Icon name="mPhone" size={20} />
        <span>{e.type}</span>
        <span className="otto-feed-entry__time">{e.when}</span>
      </div>
      <div className="otto-feed-entry__thread">
        <span className="otto-feed-entry__by"><Avatar name={e.by} size="xs" navy />{e.by}</span>
        {e.note && <span style={{ fontSize: 15 }}>{e.note}</span>}
        {e.tags && (
          <span className="otto-tags">
            {e.tags.map((t, i) => <span key={t} className={i === 0 ? "otto-tag otto-tag--muted" : "otto-tag otto-tag--navy"}>{t}</span>)}
          </span>
        )}
      </div>
    </div>
  );
}

function CandidateRecord({ c, onRates }: { c: Candidate; onRates: (c: Candidate) => void }) {
  const toast = useToast();
  const card = cardFor(c);
  const [feed, setFeed] = useState<FeedEntry[]>(card.feed);
  const addNote = (note: string, type: string | undefined) => {
    setFeed((f) => [{ type: type ?? "Note", when: "Just now", by: "Marisol Ortega", note }, ...f]);
    toast.success(`Note added to ${c.name}`);
  };

  return (
    <article className="otto-record" aria-labelledby={`cand-${c.id}`}>
      <div className="otto-record__head">
        <h2 id={`cand-${c.id}`} className="otto-record__name"><Link to={`/candidates/${c.id}`}>{c.name}</Link></h2>
        <span className="otto-meta-pill"><Icon name="mArticle" size={16} />Submitted {card.submitted}</span>
        <span className="otto-meta-pill"><Icon name="mPhone" size={16} />{card.lastTouch}</span>
        <span className="otto-record__actions">
          <Link to={`/candidates/${c.id}`} className="otto-icon-btn" aria-label={`View ${c.name}'s profile`} title="View profile" style={{ background: "var(--otto-on-surface-200)", width: 40, height: 32 }}>
            <Icon name="mContactPage" size={22} />
          </Link>
          <Link to={`/candidates/${c.id}/activity/new`} className="otto-btn otto-btn--ghost otto-btn--sm" style={{ height: 32, fontSize: 14, background: "var(--otto-on-surface-200)" }}>New activity</Link>
        </span>
      </div>

      <div className="otto-record__main">
        <p style={{ fontSize: 15 }}>{c.currentRole}</p>
        <ul className="otto-detail-list" style={{ fontSize: 15 }}>
          <li><Icon name="mPhone" /><span>{c.phone}</span></li>
          <li><Icon name="mMail" /><span>{c.email}</span></li>
          <li><Icon name="mPlace" /><span>{c.location}</span></li>
        </ul>
        <span className="otto-tags">
          <span className="otto-tag otto-tag--muted">{NOTICE[c.id] ?? `Available ${c.availability}`}</span>
          <span className="otto-tag otto-tag--navy">{c.desiredPay}</span>
          {c.skills.slice(0, 3).map((s) => <span key={s} className="otto-tag otto-tag--navy">{s}</span>)}
        </span>
        <button type="button" className="otto-link" onClick={() => onRates(c)}>View rate history</button>
      </div>

      <div className="otto-record__feed" role="region" aria-label={`Recent activity for ${c.name}`} tabIndex={0}>
        <NoteComposer label={`Note for ${c.name}`} onPost={addNote} />
        {feed.map((e, i) => <FeedItem key={`${e.when}-${i}`} e={e} />)}
      </div>
    </article>
  );
}

/* ---------- Page ---------- */

export function CandidatesPage() {
  const navigate = useNavigate();
  const [resume, setResume] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [statuses, setStatuses] = useState<Candidate["status"][]>([]);
  const [sort, setSort] = useState("recent");
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);
  const [rates, setRates] = useState<Candidate | null>(null);

  const anyFilter = !!(resume || notes || name || phone || email || statuses.length);
  const reset = () => { setResume(""); setNotes(""); setName(""); setPhone(""); setEmail(""); setStatuses([]); setPage(1); };

  const rows = useMemo(() => {
    const has = (v: string, q: string) => v.toLowerCase().includes(q.trim().toLowerCase());
    const filtered = CANDIDATES.filter((c) => {
      const card = cardFor(c);
      const feedText = [...card.feed.map((f) => `${f.note ?? ""} ${(f.tags ?? []).join(" ")}`)].join(" ");
      return (
        (!statuses.length || statuses.includes(c.status)) &&
        (!resume.trim() || has(`${c.currentRole} ${c.skills.join(" ")} ${c.education}`, resume)) &&
        (!notes.trim() || has(feedText, notes)) &&
        (!name.trim() || has(c.name, name)) &&
        (!phone.trim() || c.phone.replace(/\D/g, "").includes(phone.replace(/\D/g, ""))) &&
        (!email.trim() || has(c.email, email))
      );
    });
    const sorted = [...filtered];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "submitted") sorted.sort((a, b) => cardFor(a).submitted.localeCompare(cardFor(b).submitted));
    else sorted.sort((a, b) => Date.parse(b.lastActivity) - Date.parse(a.lastActivity));
    return sorted;
  }, [resume, notes, name, phone, email, statuses, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages);
  const visible = rows.slice((current - 1) * pageSize, current * pageSize);
  const from = rows.length ? (current - 1) * pageSize + 1 : 0;
  const to = Math.min(rows.length, current * pageSize);

  const columns: Column<Candidate>[] = [
    { key: "name", header: "Name", sortValue: (c) => c.name, render: (c) => <span className="flex items-center gap-3"><Avatar name={c.name} size="sm" navy /><span style={{ fontWeight: 600 }}>{c.name}</span></span> },
    { key: "role", header: "Current role", sortValue: (c) => c.currentRole, render: (c) => c.currentRole },
    { key: "location", header: "Location", sortValue: (c) => c.location, render: (c) => c.location },
    { key: "status", header: "Status", sortValue: (c) => c.status, render: (c) => <Badge tone={c.status === "Interviewing" ? "primary" : c.status === "Submitted" ? "navy" : "default"}>{c.status}</Badge> },
    { key: "last", header: "Last activity", sortValue: (c) => Date.parse(c.lastActivity), render: (c) => c.lastActivity },
  ];

  const filters: ReactNode = (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <SearchField id="f-resume" icon="mSearch" label="Search keywords in resume" value={resume} onChange={(v) => { setResume(v); setPage(1); }} />
        <SearchField id="f-notes" icon="mSearch" label="Search notes" value={notes} onChange={(v) => { setNotes(v); setPage(1); }} />
      </div>
      <div className="otto-cand-filters">
        <SearchField id="f-name" icon="mPersonSearch" label="Candidate name" value={name} onChange={(v) => { setName(v); setPage(1); }} />
        <SearchField id="f-phone" icon="mPhone" label="Phone number" value={phone} onChange={(v) => { setPhone(v); setPage(1); }} />
        <SearchField id="f-email" icon="mMail" label="Email address" value={email} onChange={(v) => { setEmail(v); setPage(1); }} />
        <MenuTrigger
          label="Filter by status"
          multiple
          selected={statuses}
          items={STATUSES.map((s) => ({ value: s, label: s }))}
          onSelect={(v) => { setStatuses((cur) => (cur.includes(v as Candidate["status"]) ? cur.filter((x) => x !== v) : [...cur, v as Candidate["status"]])); setPage(1); }}
          trigger={(p) => (
            <button {...p} type="button" className="otto-btn otto-btn--secondary otto-btn--xl" style={{ gap: 12 }}>
              Filters <Icon name="mFilterList" size={22} />
            </button>
          )}
        />
        <Button variant="secondary" size="xl" disabled={!anyFilter} onClick={reset} style={{ borderColor: anyFilter ? undefined : "var(--otto-on-surface-300)" }}>Reset</Button>
      </div>
      {statuses.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Active filters">
          {statuses.map((s) => <Tag key={s} onRemove={() => setStatuses((cur) => cur.filter((x) => x !== s))} removeLabel={`Remove status ${s}`}>Status: {s}</Tag>)}
        </div>
      )}
    </div>
  );

  return (
    <StandardPage
      header={<PageHeader title="Candidates" actions={<Button variant="primary" icon="mAdd" onClick={() => navigate("/candidates/c-1001/activity/new")}>New candidate</Button>} />}
    >
      <section className="otto-card flex flex-col gap-4" style={{ padding: 16 }} aria-label="Candidate search and results">
        {filters}

        <div className="grid items-center gap-3" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          <MenuTrigger
            label="Sort candidates"
            selected={sort}
            items={SORTS}
            onSelect={setSort}
            trigger={(p) => (
              <button {...p} type="button" className="otto-btn otto-btn--link" style={{ color: "var(--otto-on-surface-800)", justifySelf: "start", paddingLeft: 0, fontSize: 15, fontWeight: 500 }}>
                {SORTS.find((s) => s.value === sort)!.label}<Icon name="mExpandMore" size={22} />
              </button>
            )}
          />
          <span className="otto-caption" aria-live="polite" style={{ fontSize: 13 }}>{from}–{to} of {rows.length.toLocaleString()} candidates</span>
        </div>

        <BranchSwitch
          feature="candidate-list"
          variants={{
            "candidate-list-cards": visible.length ? (
              <div className="flex flex-col gap-4">
                {visible.map((c) => <CandidateRecord key={c.id} c={c} onRates={setRates} />)}
              </div>
            ) : (
              <EmptyState title="No candidates match" text="Try a different search, or reset your filters." action={<Button onClick={reset}>Reset</Button>} />
            ),
            "candidate-list-table": <DataTable caption="Candidates" columns={columns} rows={visible} rowKey={(c) => c.id} onRowClick={(c) => navigate(`/candidates/${c.id}`)} pageSize={pageSize} emptyTitle="No candidates match" />,
          }}
        />

        <nav className="flex flex-wrap items-center justify-between gap-3 otto-caption otto-muted" aria-label="Pagination" style={{ fontSize: 13 }}>
          <span>Showing {from}–{to} of {rows.length} results</span>
          <span className="flex items-center gap-6">
            <MenuTrigger
              label="Results per page"
              selected={String(pageSize)}
              align="right"
              items={PAGE_SIZES.map((n) => ({ value: String(n), label: `${n} per page` }))}
              onSelect={(v) => { setPageSize(Number(v)); setPage(1); }}
              trigger={(p) => <button {...p} type="button" className="otto-btn otto-btn--link" style={{ color: "var(--otto-on-surface-800)", height: 32, fontSize: 13, fontWeight: 400 }}>{pageSize} per page<Icon name="mExpandMore" size={18} /></button>}
            />
            <span className="flex items-center gap-2" style={{ color: "var(--otto-on-surface-800)" }}>
              <IconButton icon="mChevronLeft" label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)} style={{ width: 32, height: 32, opacity: current === 1 ? 0.4 : 1 }} />
              <span>Page {current} of {pages}</span>
              <IconButton icon="mChevronRight" label="Next page" disabled={current === pages} onClick={() => setPage(current + 1)} style={{ width: 32, height: 32, opacity: current === pages ? 0.4 : 1 }} />
            </span>
          </span>
        </nav>
      </section>

      <SideSheet open={!!rates} onClose={() => setRates(null)} title={rates ? `Rate history · ${rates.name}` : ""} footer={<Button onClick={() => setRates(null)}>Close</Button>}>
        {rates && (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
            {cardFor(rates).rates.map((r) => (
              <li key={r.date} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 4, padding: "14px 0", borderTop: "1px solid var(--otto-on-surface-300)" }}>
                <span style={{ fontWeight: 600 }}>{r.rate}</span>
                <span className="otto-caption otto-muted">{r.date}</span>
                <span className="otto-muted" style={{ gridColumn: "1 / -1" }}>{r.req}</span>
              </li>
            ))}
          </ol>
        )}
      </SideSheet>
    </StandardPage>
  );
}
