import type { ReactNode } from "react";
import { Icon, type IconName } from "../primitives/Icon";
import { cx } from "../primitives";

/**
 * Chip (pill). Four types:
 * - input: a removable entity (pass onRemove)
 * - filter: toggles on and off (pass selected + onClick)
 * - choice: one of a set (selected + onClick)
 * - action: triggers something (onClick)
 * Only interactive chips have hover states.
 */
export interface TagProps {
  children: ReactNode;
  icon?: IconName;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  size?: "md" | "lg";
}

export function Tag({ children, icon, selected, onClick, onRemove, removeLabel, size = "md" }: TagProps) {
  if (onRemove) {
    return (
      <span className={cx("otto-chip", size === "lg" && "otto-chip--lg")}>
        {icon && <Icon name={icon} size={16} />}
        {children}
        <button type="button" className="otto-chip__remove" aria-label={removeLabel ?? `Remove ${typeof children === "string" ? children : ""}`.trim()} onClick={onRemove}>
          <Icon name="close" size={16} />
        </button>
      </span>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        className="otto-pill otto-pill--toggle"
        aria-pressed={selected}
        onClick={onClick}
      >
        {selected && <Icon name="check" size={14} />}
        {icon && !selected && <Icon name={icon} size={14} />}
        {children}
      </button>
    );
  }
  return <span className="otto-tag">{icon && <Icon name={icon} size={14} style={{ marginRight: 4 }} />}{children}</span>;
}

export function Tags({ children }: { children: ReactNode }) {
  return <span className="otto-tags">{children}</span>;
}

/** Location or metadata pill, e.g. an office. */
export function Pill({ children, icon }: { children: ReactNode; icon?: IconName }) {
  return <span className="otto-pill">{icon && <Icon name={icon} size={12} />}{children}</span>;
}

export type BadgeTone = "default" | "primary" | "navy" | "error" | "exploration" | "candidate" | "final";

/** Small status flag. Sentence case. */
export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={cx("otto-badge", tone !== "default" && `otto-badge--${tone}`)}>{children}</span>;
}

export function Count({ children, label }: { children: ReactNode; label?: string }) {
  return <span className="otto-count" aria-label={label}>{children}</span>;
}
