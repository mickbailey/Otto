import { useState } from "react";
import { Banner, Button, Card, Checkbox, ExpansionPanel, InPageNavigation, Input, RadioGroup, Select, Textarea, useToast, type InPageSection } from "../../../components/ds";

/**
 * Living example of page structure and form layout rules (see Guidelines.md):
 * - single column by default, two columns only for short related fields
 * - long text, addresses and follow-up questions span the full width
 * - conditional questions appear directly after the question that triggers them
 * - actions sit at the end of the form: secondary Cancel, then primary Submit
 */
export function PatternsLayoutsPage() {
  const toast = useToast();
  const [authorized, setAuthorized] = useState("");
  const [name, setName] = useState("Priya Natarajan");
  const [email, setEmail] = useState("");

  const sections: InPageSection[] = [
    { id: "pf-candidate", label: "Candidate Details", icon: "person", complete: !!name && !!email },
    { id: "pf-job", label: "Job Details", icon: "work", complete: true },
    { id: "pf-authorization", label: "Work Authorization", icon: "shield", complete: !!authorized },
    { id: "pf-availability", label: "Availability", icon: "calendar" },
    { id: "pf-references", label: "References", icon: "group" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Banner tone="info" title="Pattern: long form with in-page navigation">
        Navigation sits on the leading edge and stays sticky because the layout sets it, not the component. Status icons show here because this form is one people come back to.
      </Banner>

      <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(0, auto) minmax(0, 1fr)" }}>
        <div className="max-[900px]:hidden">
          <div style={{ position: "sticky", top: 16 }}>
            <InPageNavigation label="Form sections" showStatus sections={sections} />
          </div>
        </div>

        <form className="flex flex-col gap-5" style={{ minWidth: 0 }} onSubmit={(e) => { e.preventDefault(); toast.success("Candidate profile saved"); }}>
          <Card id="pf-candidate" title="Candidate Details">
            <div className="otto-field-row">
              <Input label="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="otto-field-row">
              <Input label="Phone" type="tel" />
              <Input label="Current role" />
            </div>
          </Card>

          <Card id="pf-job" title="Job Details">
            <Select label="Requisition" options={["Embedded Systems Engineer, Fleet IoT", "Controls Engineer, Warehouse Automation"]} />
            <div className="otto-field-row">
              <Input label="Desired pay" helper="Annual salary or hourly rate." />
              <Select label="Employment type" options={["Full-time", "Contract", "Contract-to-hire"]} />
            </div>
          </Card>

          <Card id="pf-authorization" title="Work Authorization">
            <RadioGroup
              label="Are they authorized to work in the United States?"
              name="auth"
              value={authorized}
              onChange={setAuthorized}
              inline
              options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
            />
            {authorized === "no" && (
              <div className="flex flex-col gap-3" style={{ paddingLeft: 16, borderLeft: "2px solid var(--otto-border)" }}>
                <Select label="Will they need sponsorship?" emptyOption options={["Yes, now", "Yes, in the future", "Not sure"]} />
                <Textarea label="Visa details" rows={3} helper="Type of visa and expiry date, if known." />
              </div>
            )}
          </Card>

          <Card id="pf-availability" title="Availability">
            <div className="otto-field-row">
              <Input label="Start availability" type="date" />
              <Select label="Notice period" emptyOption options={["None", "1 week", "2 weeks", "1 month"]} />
            </div>
            <Checkbox label="Open to relocation" />
          </Card>

          <section id="pf-references" className="flex flex-col gap-3" style={{ scrollMarginTop: 72 }}>
            <h2 className="otto-title">References</h2>
            <ExpansionPanel title="Reference 1" defaultOpen>
              <div className="otto-field-row"><Input label="Name" /><Input label="Relationship" /></div>
              <Input label="Email" type="email" />
            </ExpansionPanel>
            <ExpansionPanel title="Reference 2">
              <div className="otto-field-row"><Input label="Name" /><Input label="Relationship" /></div>
            </ExpansionPanel>
          </section>

          <div className="flex justify-end gap-2" style={{ paddingBottom: 40 }}>
            <Button variant="secondary" onClick={() => toast.info("In a real form this opens the discard dialog.")}>Cancel</Button>
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
