import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon, type IconName } from "../primitives/Icon";
import { Portal } from "../primitives";

export type ToastVariant = "success" | "info" | "warning" | "error";

export interface ToastOptions {
  header?: string;
  action?: { label: string; onClick: () => void };
  /** Milliseconds. Defaults to 5s + 1s per 120 words. Use Infinity to keep it until closed. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  variant: ToastVariant;
  message: string;
}

type ToastApi = Record<ToastVariant, (message: string, options?: ToastOptions) => void>;

const ToastContext = createContext<ToastApi | null>(null);
const icons: Record<ToastVariant, IconName> = { success: "checkCircle", info: "info", warning: "warning", error: "error" };
const MAX_VISIBLE = 2;

function autoDuration(message: string) {
  const words = message.trim().split(/\s+/).length;
  return 5000 + Math.ceil(words / 120) * 1000;
}

/** Wrap the app once (done in RootLayout). Then call useToast() anywhere. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const next = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const push = useCallback((variant: ToastVariant, message: string, options: ToastOptions = {}) => {
    const id = next.current++;
    setToasts((t) => [...t, { id, variant, message, ...options }].slice(-MAX_VISIBLE));
  }, []);

  const api = useMemo<ToastApi>(() => ({
    success: (m, o) => push("success", m, o),
    info: (m, o) => push("info", m, o),
    warning: (m, o) => push("warning", m, o),
    error: (m, o) => push("error", m, o),
  }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Portal>
        <div className="otto-toast-region" role="region" aria-label="Notifications">
          {toasts.map((t) => <ToastView key={t.id} toast={t} onClose={() => dismiss(t.id)} />)}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

function ToastView({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  useEffect(() => {
    const ms = toast.duration ?? autoDuration(toast.message);
    if (!Number.isFinite(ms)) return;
    const t = setTimeout(onClose, ms);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <div className={`otto-toast otto-toast--${toast.variant}`} role={toast.variant === "error" ? "alert" : "status"}>
      <Icon name={icons[toast.variant]} className="otto-toast__icon" />
      <div>
        {toast.header && <strong className="otto-toast__header">{toast.header}</strong>}
        <span>{toast.message}</span>
        {toast.action && (
          <button type="button" className="otto-toast__action" onClick={() => { toast.action!.onClick(); onClose(); }}>{toast.action.label}</button>
        )}
      </div>
      <button type="button" className="otto-icon-btn" style={{ width: 32, height: 32 }} aria-label="Close notification" onClick={onClose}>
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
