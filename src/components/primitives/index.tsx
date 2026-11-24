/**
 * Primitives: low-level building blocks used *inside* design-system components.
 * Page code should not import these directly; use the components in ../ds instead.
 */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";

/** Renders children into document.body, inside a .otto-theme wrapper so tokens apply. */
export function Portal({ children }: { children: ReactNode }) {
  const [el] = useState(() => {
    const d = document.createElement("div");
    d.className = "otto-theme";
    d.style.cssText = "position:absolute;top:0;left:0;right:0;height:0;background:transparent;container-type:normal";
    return d;
  });
  useLayoutEffect(() => {
    document.body.appendChild(el);
    return () => { el.remove(); };
  }, [el]);
  return createPortal(children, el);
}

/** Text only screen readers announce. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="otto-sr">{children}</span>;
}

/** Calls handler when a pointer goes down outside every ref. */
export function useOutsideClick(refs: RefObject<HTMLElement>[], handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (refs.every((r) => !r.current || !r.current.contains(e.target as Node))) handler();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [refs, handler, active]);
}

/** Calls handler on Escape. */
export function useEscape(handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handler(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handler, active]);
}

/** Position for a floating surface under (or above) an anchor, in page coordinates. */
export function useAnchorPosition(anchor: RefObject<HTMLElement>, open: boolean, align: "left" | "right" = "left", gap = 4) {
  const [pos, setPos] = useState<{ top: number; left?: number; right?: number; minWidth: number }>({ top: 0, left: 0, minWidth: 0 });
  useLayoutEffect(() => {
    if (!open || !anchor.current) return;
    const update = () => {
      const r = anchor.current!.getBoundingClientRect();
      const top = r.bottom + window.scrollY + gap;
      if (align === "right") setPos({ top, right: document.documentElement.clientWidth - r.right - window.scrollX, minWidth: r.width });
      else setPos({ top, left: r.left + window.scrollX, minWidth: r.width });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true); };
  }, [anchor, open, align, gap]);
  return pos;
}

/** Keeps Tab focus inside a container (dialogs, side sheets) and restores focus on close. */
export function useFocusTrap(container: RefObject<HTMLElement>, active: boolean) {
  const restore = useRef<Element | null>(null);
  useEffect(() => {
    if (!active || !container.current) return;
    restore.current = document.activeElement;
    const root = container.current;
    const focusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'));
    (focusables()[0] ?? root).focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("keydown", onKey);
      (restore.current as HTMLElement | null)?.focus?.();
    };
  }, [container, active]);
}

/** Stable unique id for label/description wiring. */
let uid = 0;
export function useId(prefix = "px") {
  const [id] = useState(() => `${prefix}-${++uid}`);
  return id;
}

/** Joins class names, skipping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
