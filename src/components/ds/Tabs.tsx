import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { useId } from "../primitives";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Tabs switch between views where only one shows at a time.
 * Keyboard: Left/Right move between tabs, Home/End jump. Tab labels are Title Case.
 */
export function Tabs({ tabs, value, onChange, label }: { tabs: TabItem[]; value: string; onChange: (id: string) => void; label: string }) {
  const base = useId("tabs");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const index = Math.max(0, tabs.findIndex((t) => t.id === value));

  const onKey = (e: KeyboardEvent) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[next]!.id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="otto-tabs" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-controls={`${base}-panel-${t.id}`}
            aria-selected={t.id === value}
            tabIndex={t.id === value ? 0 : -1}
            className="otto-tab"
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`${base}-panel-${t.id}`} aria-labelledby={`${base}-tab-${t.id}`} hidden={t.id !== value} style={{ paddingTop: 16 }}>
          {t.id === value && t.content}
        </div>
      ))}
    </div>
  );
}
