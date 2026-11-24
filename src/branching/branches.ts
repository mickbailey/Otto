/**
 * Branch registry: every design variant in the prototype. See BRANCHING.md.
 *
 * A *feature* is one area of the UI being explored (e.g. the requisition panel).
 * A *branch* is one variant of that feature. Exactly one branch per feature is the baseline.
 *
 * Status:
 *  - exploration: early idea, may change a lot
 *  - candidate:   a serious option being compared with stakeholders
 *  - final:       the chosen direction (usually also the baseline)
 */
export type BranchStatus = "exploration" | "candidate" | "final";

export interface Branch {
  id: string;
  feature: string;
  name: string;
  status: BranchStatus;
  description: string;
  owner: string;
  updated: string;
  baseline?: boolean;
}

export const FEATURES: Record<string, { name: string; where: string }> = {
  "req-panel": { name: "Requisition panel", where: "New activity → right-hand panel" },
  "candidate-list": { name: "Candidate list", where: "Candidates" },
};

export const BRANCHES: Branch[] = [
  {
    id: "req-panel-summary",
    feature: "req-panel",
    name: "Summary and questions",
    status: "final",
    description: "Plain-language job summary followed by four screening questions with what to listen for.",
    owner: "Mick Bailey",
    updated: "2026-11-20",
    baseline: true,
  },
  {
    id: "req-panel-tabs",
    feature: "req-panel",
    name: "Tabbed panel",
    status: "candidate",
    description: "Summary, questions and requisition details split into tabs to shorten the panel.",
    owner: "Mick Bailey",
    updated: "2026-11-18",
  },
  {
    id: "req-panel-checklist",
    feature: "req-panel",
    name: "Live call checklist",
    status: "exploration",
    description: "Questions become a checklist the recruiter ticks off during the call; answered items feed the notes.",
    owner: "Mick Bailey",
    updated: "2026-11-15",
  },
  {
    id: "candidate-list-cards",
    feature: "candidate-list",
    name: "Record cards",
    status: "final",
    description: "Card per candidate: contact details, notice, pay and skills on the left, a scrolling activity feed with a quick-note field on the right.",
    owner: "Mick Bailey",
    updated: "2026-11-23",
    baseline: true,
  },
  {
    id: "candidate-list-table",
    feature: "candidate-list",
    name: "Table",
    status: "candidate",
    description: "Dense, sortable table for scanning many candidates at once.",
    owner: "Mick Bailey",
    updated: "2026-11-12",
  },
];

export const STATUS_LABEL: Record<BranchStatus, string> = { exploration: "Exploration", candidate: "Candidate", final: "Final" };

export const baselineFor = (feature: string) => BRANCHES.find((b) => b.feature === feature && b.baseline)!;
export const branchById = (id: string | null | undefined) => BRANCHES.find((b) => b.id === id);
