import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "../primitives/Icon";
import { EmptyState } from "./Page";

export interface Column<T> {
  key: string;
  /** Sentence case. */
  header: string;
  render: (row: T) => ReactNode;
  /** Return a value to make the column sortable. */
  sortValue?: (row: T) => string | number;
  numeric?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  caption: string;
  emptyTitle?: string;
  emptyText?: string;
  pageSize?: number;
}

/** Sortable, paginated table. Rows are keyboard-activatable when onRowClick is set. */
export function DataTable<T>({ columns, rows, rowKey, onRowClick, caption, emptyTitle = "No results", emptyText = "Try a different search or clear your filters.", pageSize = 10 }: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return rows;
    return [...rows].sort((a, b) => {
      const x = col.sortValue!(a), y = col.sortValue!(b);
      const r = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? r : -r;
    });
  }, [rows, sort, columns]);

  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, pages);
  const visible = sorted.slice((current - 1) * pageSize, current * pageSize);

  const toggle = (key: string) => {
    setSort((s) => (s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    setPage(1);
  };

  if (!rows.length) return <EmptyState title={emptyTitle} text={emptyText} />;

  return (
    <div>
      <div className="otto-table-wrap">
        <table className="otto-table">
          <caption className="otto-sr">{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={c.numeric ? "is-num" : undefined}
                  style={{ width: c.width }}
                  aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                >
                  {c.sortValue ? (
                    <button type="button" onClick={() => toggle(c.key)} style={{ display: "inline-flex", alignItems: "center", gap: 4, border: 0, background: "none", font: "inherit", color: "inherit", padding: 0, cursor: "pointer" }}>
                      {c.header}
                      <Icon name={sort?.key === c.key && sort.dir === "desc" ? "expandMore" : "sort"} size={14} style={{ opacity: sort?.key === c.key ? 1 : 0.4, transform: sort?.key === c.key && sort.dir === "asc" ? "rotate(180deg)" : undefined }} />
                    </button>
                  ) : c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr
                key={rowKey(r)}
                tabIndex={onRowClick ? 0 : undefined}
                style={{ cursor: onRowClick ? "pointer" : undefined }}
                onClick={onRowClick ? () => onRowClick(r) : undefined}
                onKeyDown={onRowClick ? (e) => { if (e.key === "Enter") onRowClick(r); } : undefined}
              >
                {columns.map((c) => <td key={c.key} className={c.numeric ? "is-num" : undefined}>{c.render(r)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 && <Pagination page={current} pages={pages} total={rows.length} pageSize={pageSize} onChange={setPage} />}
    </div>
  );
}

export function Pagination({ page, pages, total, pageSize, onChange }: { page: number; pages: number; total: number; pageSize: number; onChange: (p: number) => void }) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <nav className="otto-pagination" aria-label="Pagination" style={{ marginTop: 12 }}>
      <span>Showing {from}–{to} of {total}</span>
      <span className="otto-pagination__pages">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)}><Icon name="chevronLeft" size={16} /></button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button key={p} type="button" aria-current={p === page ? "page" : undefined} onClick={() => onChange(p)}>{p}</button>
        ))}
        <button type="button" aria-label="Next page" disabled={page === pages} onClick={() => onChange(page + 1)}><Icon name="chevronRight" size={16} /></button>
      </span>
    </nav>
  );
}
