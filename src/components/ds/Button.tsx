import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon, type IconName } from "../primitives/Icon";
import { cx } from "../primitives";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action in an area (yellow, use sparingly). secondary: outlined. tertiary: text only. ghost: low emphasis. destructive: permanent actions. */
  variant?: ButtonVariant;
  /** sm 32px, md 40px (default), lg 44px, xl 48px (beside a text field or search). */
  size?: ButtonSize;
  /** Leading icon. Never pair the "add" icon with the word "Add" — use "New …". */
  icon?: IconName;
  trailingIcon?: IconName;
  block?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", icon, trailingIcon, block, className, type = "button", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx("otto-btn", `otto-btn--${variant === "tertiary" ? "link" : variant}`, size !== "md" && `otto-btn--${size}`, block && "otto-btn--block", className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={16} />}
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Required: the accessible name, also shown as the native tooltip. */
  label: string;
  outlined?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, outlined, className, type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} aria-label={label} title={label} className={cx("otto-icon-btn", outlined && "otto-icon-btn--secondary", className)} {...rest}>
      <Icon name={icon} size={20} />
    </button>
  );
});
