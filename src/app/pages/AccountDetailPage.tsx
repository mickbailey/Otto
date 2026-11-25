import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Avatar, Button, DataTable, EmptyState, Icon, MenuTrigger, Tabs, Tag, useToast, type Column,
} from "../../components/ds";
import { ACCOUNTS, CONTACTS, REQUISITIONS, accountDetail, type AccountActivity, type Requisition } from "../../data/sample";
import mapImage from "../../assets/planet-express-map.jpg";

/* ---------- Small pieces ---------- */

function Mark({ text, q }: { text: string; q: string }) {
  const term = q.trim();
  if (!term) return <>{text}</>;
  const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return <>{parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))}</>;
}

function TeamStack({ people, total, id }: { people: string[]; total: number; id?: string }) {
  const toast = useToast();
  return (
    <ul className="otto-stack" id={id} aria-label={`Account team, ${total} people`}>
      {people.map((p, i) => <li key={p} style={{ ["--i" as string]: i }}><Avatar name={p} navy /></li>)}
      {total > people.length && (
        <li style={{ ["--i" as string]: people.length }}>
          <button type="button" className="otto-stack__more" aria-label={`Show ${total - people.length} more team members`} onClick={() => toast.info(`${total} people work this account`)}>
            +{total - people.length}
          </button>
        </li>
      )}
    </ul>
  );
}

// otto-audit-ignore-file hardcoded-color the US flag is an illustration, its colors are not UI colors
function FlagUS() {
  return (
    <svg width="16" height="11" viewBox="0 0 26 18" role="img" aria-label="United States">
      <rect width="26" height="18" rx="2" fill="#fff" />
      <path d="M0 0h26v1.4H0zM0 2.8h26v1.4H0zM0 5.5h26v1.4H0zM0 8.3h26v1.4H0zM0 11.1h26v1.4H0zM0 13.8h26v1.4H0zM0 16.6h26V18H0z" fill="#c8323c" />
      <rect width="11.5" height="9.7" fill="#2f3f84" />
    </svg>
  );
}

/* ---------- Activity tab ---------- */

function ActivityTab({ days, total }: { days: Array<{ day: string; items: AccountActivity[] }>; total: number }) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const all = days.flatMap((d) => d.items);
  const managers = [...new Set(all.map((a) => a.by))];
  const offices = [...new Set(all.map((a) => a.office))];
  const items = [
    ...managers.map((m, i) => ({ value: `m:${m}`, label: m, secondaryText: "Account manager", dividerAfter: i === managers.length - 1 })),
    ...offices.map((o) => ({ value: `o:${o}`, label: o, secondaryText: "Office" })),
  ];
  const ms = filters.filter((f) => f.startsWith("m:")).map((f) => f.slice(2));
  const os = filters.filter((f) => f.startsWith("o:")).map((f) => f.slice(2));
  const match = (a: AccountActivity) =>
    (!ms.length || ms.includes(a.by)) &&
    (!os.length || os.includes(a.office)) &&
    (!q.trim() || `${a.by} ${a.with} ${a.note}`.toLowerCase().includes(q.trim().toLowerCase()));
  const shown = days.map((d) => ({ ...d, items: d.items.filter(match) })).filter((d) => d.items.length);
  const count = shown.reduce((n, d) => n + d.items.length, 0);
  const filtered = !!(q.trim() || filters.length);
  const toggle = (v: string) => setFilters((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  return (
    <div className="flex flex-col gap-3" style={{ paddingTop: 16 }}>
      <div className="flex gap-3 items-center">
        <div className="otto-search" style={{ flex: 1, minHeight: 40, minWidth: 0 }}>
          <Icon name="search" size={18} />
          <label htmlFor="acct-act-search" className="otto-sr">Search activity</label>
          <input id="acct-act-search" type="search" placeholder="Search activity..." value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
        </div>
        <MenuTrigger
          label="Filter activity"
          multiple
          align="right"
          selected={filters}
          items={items}
          onSelect={toggle}
          trigger={(p) => (
            <button {...p} type="button" className="otto-btn otto-btn--secondary" style={{ height: 40, gap: 12 }}>
              Filters{filters.length > 0 && <span className="otto-count">{filters.length}</span>}<Icon name="mFilterList" size={20} />
            </button>
          )}
        />
      </div>
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center" aria-label="Active filters">
          {filters.map((f) => (
            <Tag key={f} onRemove={() => toggle(f)} removeLabel={`Remove filter ${f.slice(2)}`}>{f.startsWith("m:") ? "Manager" : "Office"}: {f.slice(2)}</Tag>
          ))}
          <button type="button" className="otto-btn otto-btn--link otto-btn--sm" onClick={() => setFilters([])}>Clear filters</button>
        </div>
      )}
      <p className="otto-muted" aria-live="polite" style={{ fontSize: 14 }}>Showing {count} of {filtered ? count : total}</p>
      {shown.length === 0 ? (
        <EmptyState title="No activity matches" text="Try a different search, or clear your filters." action={<Button onClick={() => { setQ(""); setFilters([]); }}>Clear filters</Button>} />
      ) : (
        shown.map((d) => (
          <section key={d.day} className="otto-day" aria-label={d.day}>
            <h3 className="otto-day__label">{d.day}</h3>
            <ul className="otto-act">
              {d.items.map((a, i) => (
                <li key={`${a.time}-${i}`} className="otto-act__item">
                  <Avatar name={a.by} navy />
                  <div>
                    <div className="otto-act__head">
                      <strong>{a.by}</strong><span className="otto-muted">{a.verb}</span><strong>{a.with}</strong>
                      <span className="otto-loc"><Icon name="place" size={12} />{a.office}</span>
                      <span className="otto-act__time">{a.time}</span>
                    </div>
                    <p className="otto-act__body"><Mark text={a.note} q={q} /></p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

/* ---------- Page ---------- */

export function AccountDetailPage() {
  const { id = "" } = useParams();
  // Keyed by id so search, filters and the open tab reset when you move between accounts.
  return <AccountView key={id} id={id} />;
}

function AccountView({ id }: { id: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const account = ACCOUNTS.find((a) => a.id === id);
  const [tab, setTab] = useState("activity");
  const [stuck, setStuck] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // The sticky bar shows once the account name scrolls under the top of the window.
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e!.isIntersecting && e!.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  const reqs = useMemo(() => REQUISITIONS.filter((r) => r.client === account?.name), [account]);
  const contacts = useMemo(() => CONTACTS.filter((c) => c.account === account?.name), [account]);

  if (!account) {
    return (
      <div className="otto-page__main">
        <EmptyState title="Account not found" text="It may have been merged or removed." action={<Link to="/accounts" className="otto-btn otto-btn--secondary">Back to accounts</Link>} />
      </div>
    );
  }

  const d = accountDetail(account.id, account.am);
  const actions = [
    { value: "agreements", label: "Manage agreements" },
    { value: "requisition", label: "Add a requisition" },
  ];
  const runAction = (v: string) => {
    if (v === "requisition") navigate("/requisitions");
    else toast.info("Agreements open in the contracts system");
  };

  const reqColumns: Column<Requisition>[] = [
    { key: "title", header: "Requisition", sortValue: (r) => r.title, render: (r) => <span className="flex flex-col"><span style={{ fontWeight: 600 }}>{r.title}</span><span className="otto-caption otto-muted">{r.id} · {r.type}</span></span> },
    { key: "location", header: "Location", sortValue: (r) => r.location, render: (r) => r.location },
    { key: "pay", header: "Pay", render: (r) => r.pay },
    { key: "cpfs", header: "CPFs", numeric: true, sortValue: (r) => r.cpfs, render: (r) => r.cpfs },
    { key: "subs", header: "Submittals", numeric: true, sortValue: (r) => r.submittals, render: (r) => r.submittals },
  ];

  const panel = (children: ReactNode) => <div style={{ paddingTop: 16 }}>{children}</div>;

  return (
    <div className="otto-acct">
      <div className={stuck ? "otto-sticky is-on" : "otto-sticky"} aria-hidden={!stuck}>
        <div className="otto-sticky__bar">
          <span className="otto-sticky__name">{account.name}</span>
          <TeamStack people={d.team} total={d.teamSize} />
          <span className="otto-sticky__actions">
            <Button variant="ghost" tabIndex={stuck ? 0 : -1} onClick={() => toast.info("Editing is not part of this prototype")}>Edit</Button>
            <MenuTrigger
              label="Account actions"
              align="right"
              items={actions}
              onSelect={runAction}
              trigger={(p) => (
                <button {...p} type="button" tabIndex={stuck ? 0 : -1} className="otto-btn otto-btn--secondary otto-sticky__menu-btn">
                  Actions<Icon name="mExpandMore" size={20} />
                </button>
              )}
            />
          </span>
        </div>
      </div>

      <section className="otto-phero" aria-labelledby="acct-title">
        <div className="otto-phero__main">
          <div className="otto-hero__top">
            <h1 className="otto-hero__title" id="acct-title" ref={titleRef}>{account.name}</h1>
            <Button variant="ghost" onClick={() => toast.info("Editing is not part of this prototype")}>Edit</Button>
          </div>
          <TeamStack people={d.team} total={d.teamSize} />
          <hr className="otto-hero__rule" />
          <dl className="otto-facts">
            <div><dt>Industry</dt><dd>{account.industry}</dd></div>
            <div><dt>Headquarters</dt><dd><FlagUS />{account.hq}</dd></div>
            <div><dt>YTD revenue</dt><dd>{d.revenue}</dd></div>
            <div><dt>Contractors</dt><dd>{d.contractors}</dd></div>
          </dl>
        </div>
        <figure className="otto-phero__map">
          {d.map ? (
            <>
              <img className="otto-mapimg" src={mapImage} alt={d.mapAlt ?? ""} />
              <svg className="otto-hero__pin" viewBox="0 0 24 32" aria-hidden="true"><path d="M12 31C4.5 21.5 1 16 1 11a11 11 0 0 1 22 0c0 5-3.5 10.5-11 20z" fill="var(--otto-destructive-800)" stroke="var(--otto-surface-900)" strokeWidth="1.5" /><circle cx="12" cy="11" r="4" fill="var(--otto-surface-900)" opacity=".45" /></svg>
            </>
          ) : (
            <span className="otto-phero__nomap"><Icon name="mPlace" size={28} />{account.hq}</span>
          )}
        </figure>
      </section>

      <div className="otto-pbody">
        <aside className="otto-aside" aria-label="Account actions and team">
          <div className="otto-card otto-actions">
            <h2>Account actions</h2>
            {actions.map((a) => <Button key={a.value} variant="secondary" block onClick={() => runAction(a.value)}>{a.label}</Button>)}
          </div>
          <div className="otto-roles-col">
            {d.roles.map((r) => (
              <div key={r.role} className="otto-card otto-rolecard">
                <h3>{r.role}</h3>
                <div className="otto-rolecard__person">
                  <Avatar name={r.name} navy />
                  <div><div className="otto-rolecard__name">{r.name}</div><div className="otto-rolecard__phone">{r.phone}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="otto-card otto-origin">
            <span className="otto-origin__av">
              <Avatar name={d.origin.by} size="lg" navy />
              <span className="otto-origin__badge" aria-hidden="true"><Icon name="pickaxe" size={14} /></span>
            </span>
            <p>Account broken in {d.origin.year}<br />by {d.origin.by}</p>
          </div>
        </aside>

        <section className="otto-card otto-tabs-card" aria-label="Account details">
          <Tabs
            label="Account sections"
            value={tab}
            onChange={setTab}
            tabs={[
              { id: "overview", label: "Overview", content: panel(<EmptyState icon="info" title="Overview" text="Account health, open requisitions and recent wins will live here." />) },
              { id: "activity", label: "Activity", content: <ActivityTab days={d.activity} total={d.activityTotal} /> },
              {
                id: "contacts", label: "Contacts",
                content: panel(contacts.length ? (
                  <ul className="otto-people">
                    {contacts.map((c) => (
                      <li key={c.id} className="otto-person-row">
                        <Avatar name={c.name} navy />
                        <span><strong style={{ fontWeight: 600 }}>{c.name}</strong><small>{c.title}</small></span>
                        <span className="otto-muted">{c.email}</span>
                        <span className="otto-loc"><Icon name="place" size={12} />{c.office}</span>
                      </li>
                    ))}
                  </ul>
                ) : <EmptyState icon="person" title="No contacts yet" text="Hiring managers and decision makers at this account will show here." />),
              },
              {
                id: "reqs", label: "Requisitions",
                content: panel(
                  <div className="flex flex-col gap-3">
                    <p className="otto-muted" style={{ fontSize: 14 }}>
                      {reqs.length} open requisitions · {reqs.reduce((n, r) => n + r.cpfs, 0)} CPFs · {reqs.reduce((n, r) => n + r.submittals, 0)} submittals
                    </p>
                    <DataTable caption={`${account.name} requisitions`} columns={reqColumns} rows={reqs} rowKey={(r) => r.id} onRowClick={() => navigate("/requisitions")} emptyTitle="No open requisitions" />
                  </div>,
                ),
              },
              { id: "kb", label: "Knowledge base", content: panel(<EmptyState icon="doc" title="Knowledge base is empty" text="Site guides, onboarding docs and account notes will collect here." />) },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
