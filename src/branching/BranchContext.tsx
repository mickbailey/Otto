import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { BRANCHES, FEATURES, STATUS_LABEL, baselineFor, branchById, type Branch } from "./branches";
import { Badge, Button, IconButton, Icon, useToast } from "../components/ds";
import { useRole } from "../roles/roles";

interface BranchContextValue {
  active: Record<string, string>;
  select: (branchId: string) => void;
  reset: () => void;
}

const BranchContext = createContext<BranchContextValue | null>(null);
const STORAGE_KEY = "otto-branches";

function load(): Record<string, string> {
  const base = Object.fromEntries(Object.keys(FEATURES).map((f) => [f, baselineFor(f).id]));
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, string>;
    for (const [f, id] of Object.entries(saved)) if (branchById(id)?.feature === f) base[f] = id;
  } catch { /* ignore */ }
  return base;
}

/**
 * Holds the active branch for each feature.
 * A ?branch=<id> URL parameter wins on load, so a shared link opens the exact variant.
 */
export function BranchProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState<Record<string, string>>(load);

  const fromUrl = params.get("branch");
  useEffect(() => {
    const b = branchById(fromUrl);
    if (b && active[b.feature] !== b.id) setActive((a) => ({ ...a, [b.feature]: b.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromUrl]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(active)); } catch { /* ignore */ }
  }, [active]);

  const select = useCallback((id: string) => {
    const b = branchById(id);
    if (!b) return;
    setActive((a) => ({ ...a, [b.feature]: id }));
    setParams((p) => { const n = new URLSearchParams(p); n.set("branch", id); return n; }, { replace: true });
  }, [setParams]);

  const reset = useCallback(() => {
    setActive(Object.fromEntries(Object.keys(FEATURES).map((f) => [f, baselineFor(f).id])));
    setParams((p) => { const n = new URLSearchParams(p); n.delete("branch"); return n; }, { replace: true });
  }, [setParams]);

  const value = useMemo(() => ({ active, select, reset }), [active, select, reset]);
  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
}

export function useBranches() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranches must be used inside <BranchProvider>");
  return ctx;
}

/** The active branch for a feature. */
export function useBranch(feature: string): Branch {
  const { active } = useBranches();
  return branchById(active[feature]) ?? baselineFor(feature);
}

/** Renders the variant for the active branch of a feature. Falls back to the baseline. */
export function BranchSwitch({ feature, variants }: { feature: string; variants: Record<string, ReactNode> }) {
  const b = useBranch(feature);
  return <>{variants[b.id] ?? variants[baselineFor(feature).id]}</>;
}

/** Floating variant switcher. Shown to roles with branches.switch. */
export function BranchPanel() {
  const { active, select, reset } = useBranches();
  const { can } = useRole();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!can("branches.switch")) return null;

  const copy = async (id: string) => {
    const url = new URL(window.location.href);
    const [path, query = ""] = url.hash.slice(1).split("?");
    const q = new URLSearchParams(query);
    q.set("branch", id);
    url.hash = `${path}?${q.toString()}`;
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success("Link copied. It opens this exact variant.");
    } catch {
      toast.info(url.toString(), { header: "Copy this link", duration: Infinity });
    }
  };

  const changed = Object.entries(active).filter(([f, id]) => baselineFor(f).id !== id).length;

  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 70, fontFamily: "var(--otto-font-mono)" }}>
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Design variants"
          style={{ position: "absolute", bottom: 52, right: 0, width: "min(420px, calc(100vw - 32px))", maxHeight: "70vh", overflowY: "auto", background: "var(--otto-surface-700)", border: "1px solid var(--otto-border)", borderRadius: 12, boxShadow: "var(--otto-shadow-menu)", padding: 16, display: "flex", flexDirection: "column", gap: 16, fontSize: 12 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="branch" size={18} />
            <strong style={{ fontSize: 13, marginRight: "auto" }}>Design variants</strong>
            <IconButton icon="close" label="Close variants" onClick={() => setOpen(false)} />
          </div>
          {Object.entries(FEATURES).map(([feature, info]) => (
            <fieldset key={feature} style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <legend style={{ padding: 0, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{info.name}</span>
                <span style={{ display: "block", color: "var(--otto-on-surface-600)" }}>{info.where}</span>
              </legend>
              {BRANCHES.filter((b) => b.feature === feature).map((b) => (
                <label key={b.id} style={{ display: "grid", gridTemplateColumns: "18px 1fr auto", gap: 8, padding: 10, borderRadius: 8, cursor: "pointer", background: active[feature] === b.id ? "var(--otto-accent-800)" : "transparent", border: "1px solid var(--otto-on-surface-300)" }}>
                  <input type="radio" name={feature} checked={active[feature] === b.id} onChange={() => select(b.id)} style={{ margin: "2px 0 0", accentColor: "var(--otto-accent-200)" }} />
                  <span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 600 }}>{b.name}</span>
                      <Badge tone={b.status}>{STATUS_LABEL[b.status]}</Badge>
                      {b.baseline && <span style={{ color: "var(--otto-on-surface-600)" }}>baseline</span>}
                    </span>
                    <span style={{ display: "block", marginTop: 4, color: "var(--otto-on-surface-600)", lineHeight: 1.5 }}>{b.description}</span>
                    <span style={{ display: "block", marginTop: 4, color: "var(--otto-on-surface-600)" }}>{b.id} · {b.owner} · {b.updated}</span>
                  </span>
                  <button type="button" onClick={(e) => { e.preventDefault(); copy(b.id); }} aria-label={`Copy link to ${b.name}`} title="Copy link" style={{ border: 0, background: "transparent", color: "var(--otto-accent-100)", cursor: "pointer", padding: 2, alignSelf: "start" }}>
                    <Icon name="link" size={16} />
                  </button>
                </label>
              ))}
            </fieldset>
          ))}
          <Button size="sm" variant="secondary" onClick={reset}>Reset all to baseline</Button>
        </div>
      )}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", borderRadius: 999, border: "1px solid var(--otto-border)", background: "var(--otto-surface-700)", color: "var(--otto-on-surface-800)", font: "600 12px var(--otto-font-mono)", cursor: "pointer", boxShadow: "var(--otto-shadow-menu)" }}
      >
        <Icon name="branch" size={16} />
        Variants
        {changed > 0 && <span className="otto-count" aria-label={`${changed} changed from baseline`}>{changed}</span>}
      </button>
    </div>
  );
}
