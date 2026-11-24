import { useState, type ReactNode } from "react";
import {
  Autocomplete, Avatar, AvatarStack, Badge, Banner, Button, Card, Checkbox, Count, DataTable, Dialog, EmptyState, ExpansionPanel, IconButton,
  InPageNavigation, Input, MenuTrigger, Pill, RadioGroup, Select, SideSheet, Switch, Tabs, Tag, Tags, Textarea, Tooltip, useToast, type InPageSection,
} from "../../../components/ds";
import { REQUISITIONS, type Requisition } from "../../../data/sample";

const SECTIONS: InPageSection[] = [
  { id: "ds-buttons", label: "Buttons", icon: "add" },
  { id: "ds-fields", label: "Fields", icon: "edit" },
  { id: "ds-autocomplete", label: "Autocomplete", icon: "search" },
  { id: "ds-chips", label: "Chips and Badges", icon: "badge" },
  { id: "ds-avatars", label: "Avatars", icon: "person" },
  { id: "ds-tabs", label: "Tabs", icon: "menu" },
  { id: "ds-menus", label: "Menus", icon: "moreVert" },
  { id: "ds-feedback", label: "Toasts and Banners", icon: "info" },
  { id: "ds-overlays", label: "Dialogs and Sheets", icon: "doc" },
  { id: "ds-table", label: "Data Table", icon: "sort" },
  { id: "ds-expansion", label: "Expansion Panel", icon: "expandMore" },
  { id: "ds-inpage", label: "In-Page Navigation", icon: "place" },
  { id: "ds-empty", label: "Empty State", icon: "search" },
];

function Demo({ id, title, usage, children }: { id: string; title: string; usage: ReactNode; children: ReactNode }) {
  return (
    <Card id={id} title={title}>
      <p className="otto-muted" style={{ maxWidth: "80ch" }}>{usage}</p>
      <div className="flex flex-col gap-4" style={{ padding: 20, borderRadius: 8, background: "var(--otto-surface-700)", border: "1px dashed var(--otto-border)" }}>{children}</div>
    </Card>
  );
}

const Row = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-center gap-3">{children}</div>;

export function ComponentsPage() {
  const toast = useToast();
  const [tab, setTab] = useState("overview");
  const [radio, setRadio] = useState("call");
  const [req, setReq] = useState<Requisition | null>(null);
  const [filters, setFilters] = useState<string[]>(["Dallas"]);
  const [chips, setChips] = useState(["C / C++", "FreeRTOS", "LTE-M"]);
  const [dialog, setDialog] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [multi, setMulti] = useState<string[]>(["new"]);

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(0, auto) minmax(0, 1fr)" }}>
      <div className="max-[900px]:hidden">
        <div style={{ position: "sticky", top: 16 }}>
          <InPageNavigation sections={SECTIONS} label="Components" />
        </div>
      </div>

      <div className="flex flex-col gap-5" style={{ minWidth: 0 }}>
        <Demo id="ds-buttons" title="Buttons" usage="One primary (yellow) button per area for the main action. Secondary for the rest, tertiary for low-emphasis text actions, destructive for permanent ones. A + icon never pairs with the word Add: use New.">
          <Row>
            <Button variant="primary">Submit</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="tertiary">View details</Button>
            <Button variant="ghost">Edit</Button>
            <Button variant="destructive">Delete</Button>
          </Row>
          <Row>
            <Button variant="primary" icon="add">New activity</Button>
            <Button variant="secondary" icon="download">Download</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <IconButton icon="edit" label="Edit" />
            <IconButton icon="moreVert" label="More actions" outlined />
          </Row>
        </Demo>

        <Demo id="ds-fields" title="Fields" usage="Labels above, no placeholder text in data-entry fields. Helper text explains format; errors replace it and say how to fix the problem. Search fields are the exception: placeholder and search icon, label hidden.">
          <div className="otto-field-row">
            <Input label="First name" required defaultValue="Priya" />
            <Input label="Desired pay" helper="Annual salary or hourly rate." />
          </div>
          <div className="otto-field-row">
            <Input label="Email" required defaultValue="priya@" error="Enter an email address like name@example.com." />
            <Select label="Activity type" emptyOption options={["Candidate profile (CPF)", "Call", "Note", "Submittal"]} />
          </div>
          <Input label="Search candidates" hideLabel leftIcon="search" placeholder="Search by name, role or skill..." />
          <Textarea label="Notes" rows={3} />
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div className="flex flex-col gap-3">
              <Checkbox label="Open to relocation" defaultChecked />
              <Checkbox label="Needs sponsorship" />
              <Checkbox label="Disabled option" disabled />
            </div>
            <RadioGroup label="Contact method" name="demo-radio" value={radio} onChange={setRadio} options={[{ value: "call", label: "Call" }, { value: "text", label: "Text" }, { value: "email", label: "Email" }]} />
            <div className="flex flex-col gap-3">
              <Switch label="Email notifications" defaultChecked />
              <Switch label="Weekly digest" />
            </div>
          </div>
        </Demo>

        <Demo id="ds-autocomplete" title="Autocomplete" usage="Searchable select for long lists. Type to filter, Up and Down to move, Enter to choose. The choice shows as a removable chip.">
          <Autocomplete<Requisition>
            label="Requisition"
            placeholder="Search by title, client or AM..."
            options={REQUISITIONS}
            value={req}
            onChange={setReq}
            getKey={(r) => r.id}
            getLabel={(r) => r.title}
            getSearchText={(r) => `${r.title} ${r.client} ${r.am}`}
          />
        </Demo>

        <Demo id="ds-chips" title="Chips and Badges" usage="Input chips are removable entities. Filter chips toggle (navy when on). Tags are read-only attributes. Badges are small status flags. Only interactive chips have hover states.">
          <Row>{chips.map((c) => <Tag key={c} onRemove={() => setChips((x) => x.filter((y) => y !== c))}>{c}</Tag>)}{!chips.length && <Button size="sm" variant="tertiary" onClick={() => setChips(["C / C++", "FreeRTOS", "LTE-M"])}>Reset chips</Button>}</Row>
          <Row>{["Dallas", "New York", "Remote"].map((f) => <Tag key={f} selected={filters.includes(f)} onClick={() => setFilters((x) => (x.includes(f) ? x.filter((y) => y !== f) : [...x, f]))}>{f}</Tag>)}</Row>
          <Tags><Tag>ARM Cortex-M</Tag><Tag>Zephyr</Tag><Tag>OTA updates</Tag></Tags>
          <Row>
            <Badge>New</Badge><Badge tone="primary">Today</Badge><Badge tone="navy">Submitted</Badge><Badge tone="error">Overdue</Badge>
            <Badge tone="exploration">Exploration</Badge><Badge tone="candidate">Candidate</Badge><Badge tone="final">Final</Badge>
            <Count label="12 results">12</Count><Pill icon="place">Dallas</Pill>
          </Row>
        </Demo>

        <Demo id="ds-avatars" title="Avatars" usage="Initials when there's no photo. Stacks overlap and end with +N.">
          <Row>
            <Avatar name="Marisol Ortega" size="xs" /><Avatar name="Marisol Ortega" size="sm" /><Avatar name="Marisol Ortega" /><Avatar name="Marisol Ortega" size="lg" navy />
            <AvatarStack people={["Alex Kiaya", "Marisol Ortega", "Dana Whitfield", "Jordan Park", "Sam Rivera", "Emily Carter", "Sofia Chen", "Marcus Lee"]} max={5} />
          </Row>
        </Demo>

        <Demo id="ds-tabs" title="Tabs" usage="Switch between views where only one shows at a time. Left and Right arrows move between tabs. For sections of one long page, use In-Page Navigation.">
          <Tabs label="Example" value={tab} onChange={setTab} tabs={[{ id: "overview", label: "Overview", content: <p>Overview content.</p> }, { id: "activity", label: "Activity", content: <p>Activity content.</p> }, { id: "reqs", label: "Requisitions", content: <p>Requisitions content.</p> }]} />
        </Demo>

        <Demo id="ds-menus" title="Menus" usage="Temporary list of actions. Single-select closes on pick and shows a trailing check; multi-select stays open with leading checks. Separate destructive actions with a divider.">
          <Row>
            <MenuTrigger
              label="Actions"
              items={[
                { value: "edit", label: "Edit", icon: "edit" },
                { value: "submit", label: "Submit to requisition", secondaryText: "Submit this candidate to an open req", icon: "badge" },
                { value: "download", label: "Download resume", icon: "download", dividerAfter: true },
                { value: "archive", label: "Archive", icon: "doc", disabled: true },
                { value: "delete", label: "Delete candidate", icon: "delete", destructive: true },
              ]}
              onSelect={(v) => toast.info(`Chose “${v}”`)}
              trigger={(p) => <Button {...p} trailingIcon="expandMore">Actions</Button>}
            />
            <MenuTrigger
              label="Status filter"
              multiple
              selected={multi}
              items={[{ value: "new", label: "New" }, { value: "screening", label: "Screening" }, { value: "submitted", label: "Submitted" }, { value: "interviewing", label: "Interviewing" }]}
              onSelect={(v) => setMulti((m) => (m.includes(v) ? m.filter((x) => x !== v) : [...m, v]))}
              trigger={(p) => <Button {...p} icon="filter">Status {multi.length > 0 && <Count>{multi.length}</Count>}</Button>}
            />
            <MenuTrigger
              label="Row actions"
              condensed
              items={[{ value: "view", label: "View details" }, { value: "copy", label: "Copy link" }, { value: "remove", label: "Remove", destructive: true }]}
              onSelect={(v) => toast.info(`Chose “${v}”`)}
              trigger={(p) => <IconButton {...p} icon="moreVert" label="Row actions" />}
            />
          </Row>
        </Demo>

        <Demo id="ds-feedback" title="Toasts and Banners" usage="Toasts are transient, bottom-center, close after about 6 seconds and show two at most. Banners are inline and stay until the situation changes.">
          <Row>
            <Button size="sm" onClick={() => toast.success("Candidate added")}>Success toast</Button>
            <Button size="sm" onClick={() => toast.info("Resume download started")}>Info toast</Button>
            <Button size="sm" onClick={() => toast.warning("Session expires in 5 minutes", { header: "Heads up" })}>Warning toast</Button>
            <Button size="sm" onClick={() => toast.error("Couldn't save changes", { action: { label: "Try again", onClick: () => toast.success("Saved") } })}>Error toast</Button>
          </Row>
          <Banner tone="info" title="Summaries use AI">Check the job summary against the requisition before you share it.</Banner>
          <Banner tone="success">Priya was submitted to Embedded Systems Engineer, Fleet IoT.</Banner>
          <Banner tone="warning">This requisition is on hold. Submittals are paused.</Banner>
          <Banner tone="error" title="Couldn't load activity">Refresh the page. If it keeps happening, contact support.</Banner>
        </Demo>

        <Demo id="ds-overlays" title="Dialogs and Sheets" usage="Dialogs confirm or focus a short task. Side sheets show details or a secondary form without leaving the page. Both trap focus and close with Escape.">
          <Row>
            <Button onClick={() => setDialog(true)}>Open dialog</Button>
            <Button onClick={() => setSheet(true)}>Open side sheet</Button>
          </Row>
          <Dialog open={dialog} onClose={() => setDialog(false)} title="Discard this activity?" footer={<><Button variant="secondary" onClick={() => setDialog(false)}>Keep editing</Button><Button variant="destructive" onClick={() => setDialog(false)}>Discard</Button></>}>
            <p>Your notes and the attached requisition won't be saved.</p>
          </Dialog>
          <SideSheet open={sheet} onClose={() => setSheet(false)} title="Embedded Systems Engineer, Fleet IoT" footer={<><Button variant="secondary" onClick={() => setSheet(false)}>Cancel</Button><Button variant="primary" onClick={() => { setSheet(false); toast.success("Saved"); }}>Save</Button></>}>
            <Input label="Hiring manager" defaultValue="Emily Carter" />
            <Select label="Status" options={["Open", "Interviewing", "On hold"]} defaultValue="Interviewing" />
            <Textarea label="Internal notes" rows={4} />
          </SideSheet>
        </Demo>

        <Demo id="ds-table" title="Data Table" usage="Sortable columns (click a header), keyboard-activatable rows and pagination. Column headers in sentence case; numbers right-aligned.">
          <DataTable<Requisition>
            caption="Example requisitions"
            rows={REQUISITIONS}
            rowKey={(r) => r.id}
            pageSize={4}
            columns={[
              { key: "title", header: "Requisition", sortValue: (r) => r.title, render: (r) => r.title },
              { key: "location", header: "Location", sortValue: (r) => r.location, render: (r) => r.location },
              { key: "cpfs", header: "CPFs", numeric: true, sortValue: (r) => r.cpfs, render: (r) => r.cpfs },
            ]}
          />
        </Demo>

        <Demo id="ds-expansion" title="Expansion Panel" usage="Groups a long form into titled sections people can open and close.">
          <ExpansionPanel title="Work History" defaultOpen><Input label="Most recent employer" /></ExpansionPanel>
          <ExpansionPanel title="References"><Input label="Reference name" /></ExpansionPanel>
        </Demo>

        <Demo id="ds-inpage" title="In-Page Navigation" usage="Jump links for sections of one long page. Expanded is the default; collapsed is icon-only with a tooltip; the status variant is an exception for forms people return to.">
          <div className="flex flex-wrap gap-8">
            <InPageNavigation label="Example sections" sections={[{ id: "ds-buttons", label: "Candidate Details", icon: "person" }, { id: "ds-fields", label: "Job Details", icon: "work" }, { id: "ds-tabs", label: "References", icon: "group" }]} />
            <InPageNavigation label="Example sections with status" showStatus sections={[{ id: "ds-buttons", label: "Candidate Details", icon: "person", complete: true }, { id: "ds-fields", label: "Work Authorization", icon: "shield", complete: false }, { id: "ds-tabs", label: "References", icon: "group" }]} />
            <InPageNavigation label="Collapsed sections" collapsed sections={[{ id: "ds-buttons", label: "Candidate Details", icon: "person" }, { id: "ds-fields", label: "Job Details", icon: "work" }, { id: "ds-tabs", label: "References", icon: "group" }]} />
          </div>
        </Demo>

        <Demo id="ds-empty" title="Empty State" usage="Say what would be here and how to get it. Offer the next action when there is one.">
          <EmptyState icon="doc" title="No activity yet" text="Calls, notes and submittals for this candidate will show here." action={<Button variant="primary" icon="add">New activity</Button>} />
        </Demo>

        <p className="otto-caption otto-muted">Tooltip: <Tooltip text="Tooltips add a short label. Never hide essential information in one."><IconButton icon="info" label="About tooltips" /></Tooltip></p>
      </div>
    </div>
  );
}
