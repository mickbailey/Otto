import { useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "../primitives/Icon";
import { useId, useOutsideClick } from "../primitives";

/** Wraps matches of `query` in <b>. */
export function highlight(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <span>{text.slice(0, i)}<b style={{ fontWeight: 600 }}>{text.slice(i, i + q.length)}</b>{text.slice(i + q.length)}</span>;
}

export interface AutocompleteProps<T> {
  label: string;
  /** Search-style fields hide the label and use a placeholder instead. */
  hideLabel?: boolean;
  placeholder?: string;
  options: T[];
  getKey: (o: T) => string;
  getLabel: (o: T) => string;
  /** Text searched when filtering. Defaults to the label. */
  getSearchText?: (o: T) => string;
  renderOption?: (o: T, query: string) => ReactNode;
  value: T | null;
  onChange: (o: T | null) => void;
  noResultsText?: string;
}

/**
 * Searchable single select. The selection shows as a removable chip inside the field.
 * Keyboard: type to filter, Up/Down to move, Enter to pick, Escape to close, Backspace on an empty field removes the chip.
 */
export function Autocomplete<T>({ label, hideLabel, placeholder, options, getKey, getLabel, getSearchText, renderOption, value, onChange, noResultsText = "No matches" }: AutocompleteProps<T>) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId("ac");
  const refs = useMemo(() => [wrap], []);
  useOutsideClick(refs, () => setOpen(false), open);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => (getSearchText ?? getLabel)(o).toLowerCase().includes(q));
  }, [options, query, getLabel, getSearchText]);

  const pick = (o: T) => {
    onChange(o);
    setQuery("");
    setOpen(false);
    input.current?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && open && results[active]) { e.preventDefault(); pick(results[active]!); }
    else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Backspace" && !query && value) onChange(null);
  };

  return (
    <div className="otto-field">
      <label htmlFor={id} className={hideLabel ? "otto-sr" : "otto-label"}>{label}</label>
      <div ref={wrap} className="otto-combobox">
        <div className="otto-combobox__control" onClick={() => { input.current?.focus(); setOpen(true); }} style={{ borderColor: open ? "var(--otto-on-surface-800)" : undefined }}>
          <Icon name="search" size={24} />
          {value && (
            <span className="otto-chip">
              {getLabel(value)}
              <button type="button" className="otto-chip__remove" aria-label={`Remove ${getLabel(value)}`} onClick={(e) => { e.stopPropagation(); onChange(null); }}>
                <Icon name="close" size={16} />
              </button>
            </span>
          )}
          <input
            ref={input}
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-autocomplete="list"
            aria-activedescendant={open && results[active] ? `${id}-opt-${active}` : undefined}
            autoComplete="off"
            value={query}
            placeholder={value ? "" : placeholder}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKey}
            style={{ flex: "1 1 120px", minWidth: 0, height: 36, border: 0, outline: "none", background: "transparent", fontSize: 16 }}
          />
        </div>
        {open && (
          <div className="otto-combobox__menu" style={{ display: "block", maxHeight: 360, overflowY: "auto" }}>
            <div role="listbox" id={`${id}-list`} aria-label={label}>
              {results.map((o, i) => (
                <div
                  key={getKey(o)}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={value ? getKey(value) === getKey(o) : false}
                  className="otto-combobox__option"
                  style={{ background: i === active ? "var(--otto-accent-800)" : undefined }}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(o)}
                >
                  {renderOption ? renderOption(o, query) : <span className="otto-combobox__option-title">{highlight(getLabel(o), query)}</span>}
                </div>
              ))}
            </div>
            <span className="otto-combobox__footer" aria-live="polite">{results.length ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : noResultsText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
