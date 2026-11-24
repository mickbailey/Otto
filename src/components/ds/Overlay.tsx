import { useRef, type ReactNode } from "react";
import { Icon, type IconName } from "../primitives/Icon";
import { Portal, cx, useEscape, useFocusTrap, useId } from "../primitives";
import { IconButton } from "./Button";

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Buttons for the footer. Order: secondary (Cancel) then primary (Submit/Save). */
  footer?: ReactNode;
}

/** Modal dialog for short confirmations and focused tasks. Focus is trapped while open. */
export function Dialog({ open, onClose, title, children, footer }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId("dlg");
  useEscape(onClose, open);
  useFocusTrap(ref, open);
  if (!open) return null;
  return (
    <Portal>
      <div className="otto-scrim" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
        <div ref={ref} className="otto-dialog" role="dialog" aria-modal="true" aria-labelledby={id} tabIndex={-1}>
          <div className="otto-dialog__header">
            <h2 id={id}>{title}</h2>
            <IconButton icon="close" label="Close" onClick={onClose} />
          </div>
          <div className="otto-dialog__body">{children}</div>
          {footer && <div className="otto-dialog__footer">{footer}</div>}
        </div>
      </div>
    </Portal>
  );
}

/** Side sheet: a panel from the trailing edge for details or secondary forms without leaving the page. */
export function SideSheet({ open, onClose, title, children, footer }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId("sheet");
  useEscape(onClose, open);
  useFocusTrap(ref, open);
  if (!open) return null;
  return (
    <Portal>
      <div className="otto-scrim otto-scrim--sheet" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
        <div ref={ref} className="otto-sidesheet" role="dialog" aria-modal="true" aria-labelledby={id} tabIndex={-1}>
          <div className="otto-sidesheet__header">
            <h2 id={id}>{title}</h2>
            <IconButton icon="close" label="Close" onClick={onClose} />
          </div>
          <div className="otto-sidesheet__body">{children}</div>
          {footer && <div className="otto-sidesheet__footer">{footer}</div>}
        </div>
      </div>
    </Portal>
  );
}

export type BannerTone = "info" | "success" | "warning" | "error";
const bannerIcons: Record<BannerTone, IconName> = { info: "info", success: "checkCircle", warning: "warning", error: "error" };

/** Inline, persistent message tied to a page or section. Use Toast for transient feedback. */
export function Banner({ tone = "info", title, children, action }: { tone?: BannerTone; title?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className={cx("otto-banner", `otto-banner--${tone}`)} role={tone === "error" ? "alert" : "status"}>
      <Icon name={bannerIcons[tone]} />
      <div style={{ flex: 1 }}>
        {title && <strong className="otto-banner__title">{title}</strong>}
        <span>{children}</span>
      </div>
      {action}
    </div>
  );
}
