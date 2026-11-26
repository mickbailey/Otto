import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "../primitives/Icon";
import { Portal, cx, useId } from "../primitives";

/* ---------------- Page shell ---------------- */

export interface Crumb { label: string; to?: string }

/** Title (Title Case), optional description, back link and actions. */
export function PageHeader({ title, description, back, crumbs, actions, titleId }: { title: string; description?: ReactNode; back?: string; crumbs?: Crumb[]; actions?: ReactNode; /** Give the title an id so a StickyBar can watch it. */ titleId?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(crumbs || back) && (
        <nav className="otto-breadcrumb" aria-label="Breadcrumb">
          {back && <Link to={back} aria-label="Back"><Icon name="arrowBack" size={18} /></Link>}
          {crumbs?.map((c, i) => (
            <span key={c.label} style={{ display: "contents" }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="otto-page__head">
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginRight: "auto" }}>
          <h1 className="otto-display" id={titleId}>{title}</h1>
          {description && <p className="otto-muted" style={{ maxWidth: "72ch" }}>{description}</p>}
        </div>
        {actions && <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{actions}</div>}
      </div>
    </div>
  );
}

/**
 * Sticky bar: slides in at the top once the page title (the element with `watchId`) scrolls out of view.
 * Carries the page title and the page's actions. Forms put Cancel and Submit here so they stay in reach on a long page.
 * Submit buttons outside the <form> need `form="<form id>"`.
 */
export function StickyBar({ title, watchId, children }: { title: string; watchId: string; children?: ReactNode }) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e!.isIntersecting && e!.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);
  return (
    <div className={cx("otto-sticky", stuck && "is-on")} aria-hidden={!stuck}>
      <div className="otto-sticky__bar">
        <span className="otto-sticky__name">{title}</span>
        <span className="otto-sticky__actions">{children}</span>
      </div>
    </div>
  );
}

/** Scrollable content region with consistent page padding. */
export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("otto-page__main", className)} style={{ maxWidth: 1280, width: "100%", marginInline: "auto" }}>{children}</div>;
}

/** Preferred wrapper for every page: header + container (+ optional right-hand aside). */
export function StandardPage({ header, children, aside }: { header: ReactNode; children: ReactNode; aside?: ReactNode }) {
  if (aside) {
    return (
      <div className="otto-page otto-page--split">
        <div className="otto-page__main">{header}{children}</div>
        <aside className="otto-page__aside">{aside}</aside>
      </div>
    );
  }
  return <PageContainer>{header}{children}</PageContainer>;
}

export function Card({ title, actions, children, padded = true, id }: { title?: ReactNode; actions?: ReactNode; children: ReactNode; padded?: boolean; id?: string }) {
  return (
    <section className="otto-card" id={id} style={{ padding: padded ? 24 : 0, display: "flex", flexDirection: "column", gap: 16, scrollMarginTop: 72 }}>
      {(title || actions) && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {title && <h2 className="otto-title" style={{ marginRight: "auto" }}>{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ title, text, icon = "search", action }: { title: string; text?: string; icon?: IconName; action?: ReactNode }) {
  return (
    <div className="otto-empty">
      <span style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--otto-on-surface-300)", display: "grid", placeItems: "center", color: "var(--otto-on-surface-600)" }}>
        <Icon name={icon} size={28} />
      </span>
      <p className="otto-empty__title">{title}</p>
      {text && <p className="otto-empty__text">{text}</p>}
      {action}
    </div>
  );
}

/* ---------------- Expansion panel ---------------- */

/** Collapsible section for long forms. Uses native <details>, so it works with keyboard and screen readers. */
export function ExpansionPanel({ title, children, defaultOpen, id }: { title: string; children: ReactNode; defaultOpen?: boolean; id?: string }) {
  return (
    <details className="otto-expansion" open={defaultOpen} id={id} style={{ scrollMarginTop: 72 }}>
      <summary>{title}<Icon name="expandMore" /></summary>
      <div className="otto-expansion__body">{children}</div>
    </details>
  );
}

/* ---------------- Tooltip ---------------- */

/** Short label on hover and focus. Never put essential information only in a tooltip. */
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const id = useId("tip");
  const show = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ top: r.top + window.scrollY - 30, left: r.left + window.scrollX + r.width / 2 });
  };
  return (
    <span ref={ref} onMouseEnter={show} onMouseLeave={() => setPos(null)} onFocus={show} onBlur={() => setPos(null)} aria-describedby={pos ? id : undefined} style={{ display: "inline-flex" }}>
      {children}
      {pos && (
        <Portal>
          <span id={id} role="tooltip" className="otto-tooltip" style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}>{text}</span>
        </Portal>
      )}
    </span>
  );
}

/* ---------------- In-page navigation ---------------- */

export interface InPageSection {
  id: string;
  /** Title Case, matches the section heading. */
  label: string;
  icon: IconName;
  /** Optional status: true = required fields filled, false = not filled, undefined = no required fields. */
  complete?: boolean;
}

/**
 * Jump links to sections of one long page. Tracks the section in view and marks it aria-current.
 * Sticky positioning belongs to the page layout, not this component.
 */
export function InPageNavigation({ sections, collapsed, alternate, showStatus, label = "Page sections" }: { sections: InPageSection[]; collapsed?: boolean; alternate?: boolean; showStatus?: boolean; label?: string }) {
  const [current, setCurrent] = useState(sections[0]?.id);
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setCurrent(vis.target.id);
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav className={cx("otto-inpage-nav", collapsed && "otto-inpage-nav--collapsed", alternate && "otto-inpage-nav--alternate")} aria-label={label}>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="otto-inpage-nav__link"
          aria-current={current === s.id ? "true" : undefined}
          aria-label={collapsed ? s.label : undefined}
          data-tooltip={collapsed ? s.label : undefined}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            setCurrent(s.id);
          }}
        >
          {collapsed ? (
            <span className="otto-inpage-nav__icon-box"><Icon name={s.icon} className="otto-inpage-nav__icon" /></span>
          ) : (
            <Icon name={s.icon} className="otto-inpage-nav__icon" />
          )}
          <span className="otto-inpage-nav__label">{s.label}</span>
          {showStatus && !collapsed && s.complete !== undefined && (
            <>
              <Icon name={s.complete ? "checkCircle" : "radioOff"} className="otto-inpage-nav__status" />
              <span className="otto-sr">{s.complete ? "Required fields filled" : "Required fields not filled"}</span>
            </>
          )}
        </a>
      ))}
    </nav>
  );
}

/* ---------------- Notice ---------------- */

/** Quiet inline notice, e.g. the AI disclaimer at the top of a panel. */
export function Notice({ icon = "sparkle", children, boxed }: { icon?: IconName; children: ReactNode; boxed?: boolean }) {
  return (
    <p className={cx("otto-notice", boxed && "otto-notice--boxed")}>
      <Icon name={icon} />
      <span>{children}</span>
    </p>
  );
}
