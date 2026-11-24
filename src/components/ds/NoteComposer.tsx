import { useRef, useState, type FocusEvent } from "react";
import { MenuTrigger } from "./Menu";
import { Icon } from "../primitives/Icon";
import { cx, useId } from "../primitives";

export interface NoteComposerProps {
  /** Accessible label; the field itself only shows the "Add a note..." placeholder. */
  label: string;
  /** Note types offered in the "Note type" menu. */
  types?: string[];
  /** Called with the note text and the chosen type (undefined if none picked). */
  onPost: (text: string, type: string | undefined) => void;
  className?: string;
}

/**
 * Free-text note field. Collapsed it's a one-line field reading "Add a note...".
 * On focus (or while it holds text) it grows, and collapses again once posted, gets a white outline, and shows a
 * "Note type" menu and a yellow Post button. Ctrl/Cmd + Enter posts; Escape on an
 * empty note collapses it.
 */
export function NoteComposer({ label, types = ["Call", "LMEM", "LMOM", "CPF", "Note"], onPost, className }: NoteComposerProps) {
  const id = useId();
  const [text, setText] = useState("");
  const [type, setType] = useState<string>();
  const [active, setActive] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);
  const open = active || text.length > 0;

  const post = () => {
    if (!text.trim()) return;
    onPost(text.trim(), type);
    setText("");
    setType(undefined);
    setActive(false);
    area.current?.blur();
  };

  // Stay open while focus moves to the type menu (it renders in a portal).
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as HTMLElement | null;
    if (next && (e.currentTarget.contains(next) || next.closest("[role=menu]"))) return;
    setActive(false);
  };

  return (
    <div className={cx("otto-note", open && "otto-note--open", className)} onFocus={() => setActive(true)} onBlur={onBlur}>
      <label htmlFor={id} className="otto-sr">{label}</label>
      <textarea
        id={id}
        ref={area}
        className="otto-note__input"
        placeholder="Add a note..."
        rows={open ? 3 : 1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); post(); }
          if (e.key === "Escape" && !text) { e.currentTarget.blur(); }
        }}
      />
      {open && (
        <div className="otto-note__bar">
          <MenuTrigger
            label="Note type"
            selected={type}
            items={types.map((t) => ({ value: t, label: t }))}
            onSelect={setType}
            trigger={(p) => (
              <button {...p} type="button" className="otto-note__type">
                {type ?? "Note type"}<Icon name="mExpandMore" size={22} />
              </button>
            )}
          />
          <button type="button" className="otto-btn otto-btn--primary otto-btn--sm otto-note__post" disabled={!text.trim()} onClick={post}>Post</button>
        </div>
      )}
    </div>
  );
}
