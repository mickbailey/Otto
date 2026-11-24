import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactElement, type RefObject } from "react";
import { Icon, type IconName } from "../primitives/Icon";
import { Portal, cx, useAnchorPosition, useEscape, useId, useOutsideClick } from "../primitives";

export interface MenuItem {
  value: string;
  label: string;
  secondaryText?: string;
  icon?: IconName;
  dividerAfter?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
  open: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  anchorRef: RefObject<HTMLElement>;
  align?: "left" | "right";
  /** Dense padding for tables and toolbars. */
  condensed?: boolean;
  /** Multi-select: leading checkmarks, stays open after each pick. */
  multiple?: boolean;
  /** Selected value(s): a trailing check for single-select, leading checks for multi-select. */
  selected?: string | string[];
  minWidth?: number;
  label?: string;
}

/**
 * Menu: a temporary list of actions or choices.
 * Keyboard: Up/Down move, Home/End jump, Enter/Space select, Escape closes and returns focus.
 */
export function Menu({ items, open, onClose, onSelect, anchorRef, align = "left", condensed, multiple, selected, minWidth = 200, label }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const pos = useAnchorPosition(anchorRef, open, align);
  const id = useId("menu");
  const sel = useMemo(() => new Set(Array.isArray(selected) ? selected : selected ? [selected] : []), [selected]);
  const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);

  const close = useCallback(() => { onClose(); anchorRef.current?.focus(); }, [onClose, anchorRef]);
  const refs = useMemo(() => [menuRef, anchorRef as RefObject<HTMLElement>], [anchorRef]);
  useOutsideClick(refs, onClose, open);
  useEscape(close, open);

  useEffect(() => {
    if (!open) return;
    const first = enabled[0] ?? -1;
    setActive(first);
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>(`[data-index="${first}"]`)?.focus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const move = (to: number) => {
    setActive(to);
    menuRef.current?.querySelector<HTMLElement>(`[data-index="${to}"]`)?.focus();
  };
  const pick = (it: MenuItem) => {
    if (it.disabled) return;
    onSelect(it.value);
    if (!multiple) close();
  };
  const onKey = (e: KeyboardEvent) => {
    const at = enabled.indexOf(active);
    if (e.key === "ArrowDown") { e.preventDefault(); move(enabled[(at + 1) % enabled.length]!); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(enabled[(at - 1 + enabled.length) % enabled.length]!); }
    else if (e.key === "Home") { e.preventDefault(); move(enabled[0]!); }
    else if (e.key === "End") { e.preventDefault(); move(enabled[enabled.length - 1]!); }
    else if (e.key === "Tab") onClose();
  };

  return (
    <Portal>
      <div
        ref={menuRef}
        id={id}
        className={cx("otto-menu", condensed && "otto-menu--condensed")}
        role={multiple ? "listbox" : "menu"}
        aria-multiselectable={multiple || undefined}
        aria-label={label}
        style={{ top: pos.top, left: pos.left, right: pos.right, minWidth: Math.max(minWidth, pos.minWidth) }}
        onKeyDown={onKey}
      >
        {items.map((it, i) => (
          <div key={it.value} style={{ display: "contents" }}>
            <button
              type="button"
              data-index={i}
              tabIndex={i === active ? 0 : -1}
              role={multiple ? "option" : "menuitem"}
              aria-selected={multiple ? sel.has(it.value) : undefined}
              aria-disabled={it.disabled || undefined}
              data-active={i === active}
              className={cx("otto-menu__item", it.destructive && "otto-menu__item--destructive")}
              onMouseEnter={() => !it.disabled && setActive(i)}
              onClick={() => pick(it)}
            >
              {multiple && <Icon name="check" size={18} style={{ color: "var(--otto-accent-100)", opacity: sel.has(it.value) ? 1 : 0 }} />}
              {it.icon && <Icon name={it.icon} size={18} />}
              <span className="otto-menu__item-text">
                <span>{it.label}</span>
                {it.secondaryText && <span className="otto-menu__item-secondary">{it.secondaryText}</span>}
              </span>
              {!multiple && sel.has(it.value) && <Icon name="check" size={18} className="otto-menu__check" />}
            </button>
            {it.dividerAfter && <hr className="otto-menu__divider" />}
          </div>
        ))}
      </div>
    </Portal>
  );
}

export interface MenuTriggerProps extends Omit<MenuProps, "open" | "onClose" | "anchorRef"> {
  /** Render the trigger. Spread the props onto a Button or IconButton. */
  trigger: (props: { ref: RefObject<HTMLButtonElement>; onClick: () => void; "aria-haspopup": "menu" | "listbox"; "aria-expanded": boolean }) => ReactElement;
}

/** Manages open/close and positions the menu under its trigger. */
export function MenuTrigger({ trigger, multiple, ...menu }: MenuTriggerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      {trigger({ ref, onClick: () => setOpen((o) => !o), "aria-haspopup": multiple ? "listbox" : "menu", "aria-expanded": open })}
      <Menu {...menu} multiple={multiple} open={open} onClose={() => setOpen(false)} anchorRef={ref as RefObject<HTMLElement>} />
    </>
  );
}
