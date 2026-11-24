import { cx } from "../primitives";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  navy?: boolean;
}

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
}

/** Photo or initials. The name is the accessible label (set title for hover). */
export function Avatar({ name, src, size = "md", navy }: AvatarProps) {
  return (
    <span className={cx("otto-avatar", size !== "md" && `otto-avatar--${size}`, navy && "otto-avatar--navy")} role="img" aria-label={name} title={name}>
      {src ? <img src={src} alt="" /> : initials(name)}
    </span>
  );
}

/** Overlapping team stack with a "+N" overflow. */
export function AvatarStack({ people, max = 6, size = "md" }: { people: string[]; max?: number; size?: AvatarProps["size"] }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="otto-avatar-stack" aria-label={`${people.length} people`}>
      {shown.map((p) => <Avatar key={p} name={p} size={size} navy />)}
      {extra > 0 && <span className={cx("otto-avatar", size !== "md" && `otto-avatar--${size}`)} style={{ background: "var(--otto-surface-800)", fontWeight: 400 }}>+{extra}</span>}
    </span>
  );
}
