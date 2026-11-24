import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Icon, type IconName } from "../primitives/Icon";
import { cx, useId } from "../primitives";

interface FieldShellProps {
  id: string;
  label?: string;
  required?: boolean;
  helper?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label above, control, then helper or error text. Errors replace helper text. */
export function FieldShell({ id, label, required, helper, error, hideLabel, className, children }: FieldShellProps) {
  return (
    <div className={cx("otto-field", className)}>
      {label && (
        <label htmlFor={id} className={cx("otto-label", hideLabel && "otto-sr")}>
          {label}
          {required && <span className="otto-required" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="otto-field__error" id={`${id}-msg`}><Icon name="error" size={16} />{error}</p>
      ) : helper ? (
        <p className="otto-field__help" id={`${id}-msg`}>{helper}</p>
      ) : null}
    </div>
  );
}

interface CommonFieldProps {
  label?: string;
  helper?: ReactNode;
  error?: ReactNode;
  /** Hides the label visually (search fields). Keep it for screen readers. */
  hideLabel?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, CommonFieldProps {
  leftIcon?: IconName;
}

/**
 * Text input. Data-entry fields have a label and no placeholder.
 * Search fields are the exception: placeholder + search icon, label hidden.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, error, hideLabel, leftIcon, required, className, id: idProp, ...rest },
  ref,
) {
  const auto = useId("in");
  const id = idProp ?? auto;
  const control = (
    <input
      ref={ref}
      id={id}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={error || helper ? `${id}-msg` : undefined}
      className={cx(!leftIcon && "otto-input", className)}
      {...rest}
    />
  );
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error} hideLabel={hideLabel}>
      {leftIcon ? (
        <div className="otto-search" aria-invalid={error ? true : undefined}>
          <Icon name={leftIcon} size={20} />
          {control}
        </div>
      ) : control}
    </FieldShell>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, CommonFieldProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helper, error, hideLabel, required, className, id: idProp, ...rest },
  ref,
) {
  const auto = useId("ta");
  const id = idProp ?? auto;
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error} hideLabel={hideLabel}>
      <textarea
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || helper ? `${id}-msg` : undefined}
        className={cx("otto-textarea", className)}
        {...rest}
      />
    </FieldShell>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, CommonFieldProps {
  options: Array<string | { value: string; label: string; disabled?: boolean }>;
  /** Adds an empty first option so nothing is pre-selected. */
  emptyOption?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, error, hideLabel, required, options, emptyOption, className, id: idProp, ...rest },
  ref,
) {
  const auto = useId("sel");
  const id = idProp ?? auto;
  return (
    <FieldShell id={id} label={label} required={required} helper={helper} error={error} hideLabel={hideLabel}>
      <select
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || helper ? `${id}-msg` : undefined}
        className={cx("otto-select", className)}
        {...rest}
      >
        {emptyOption && <option value="" />}
        {options.map((o) =>
          typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>,
        )}
      </select>
    </FieldShell>
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx("otto-check", className)}>
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}

export interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  inline?: boolean;
}

export function RadioGroup({ label, name, value, onChange, options, inline }: RadioGroupProps) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="otto-label" style={{ marginBottom: 8 }}>{label}</legend>
      <div style={{ display: "flex", flexDirection: inline ? "row" : "column", flexWrap: "wrap", gap: inline ? 20 : 10 }}>
        {options.map((o) => (
          <label key={o.value} className="otto-check">
            <input type="radio" name={name} value={o.value} checked={value === o.value} disabled={o.disabled} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Switch({ label, className, ...rest }: SwitchProps) {
  return (
    <label className={cx("otto-switch", className)}>
      <input type="checkbox" role="switch" {...rest} />
      <span>{label}</span>
    </label>
  );
}

/** Display-only field for read-only details and static mockups. */
export function StaticField({ label, children, icon }: { label: string; children: ReactNode; icon?: IconName }) {
  return (
    <div className="otto-field">
      <span className="otto-label">{label}</span>
      <div className="otto-input otto-input--static">
        {children}
        {icon && <Icon name={icon} size={18} />}
      </div>
    </div>
  );
}
