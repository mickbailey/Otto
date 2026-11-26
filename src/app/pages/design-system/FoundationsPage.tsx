import { Button, Card, Icon, Tooltip, iconNames } from "../../../components/ds";

const COLORS: Array<{ group: string; tokens: Array<[string, string]> }> = [
  { group: "Surface", tokens: [["--otto-surface-900", "Page: app background, page titles, loose text"], ["--otto-surface-800", "Default surface: cards, panels, side nav"], ["--otto-surface-700", "Nested in a card: headers, wells, menus"]] },
  { group: "On surface", tokens: [["--otto-on-surface-800", "Default text and icons, focus rings · 100%"], ["--otto-on-surface-700", "Secondary text · 80%"], ["--otto-on-surface-600", "Supporting text · 72%"], ["--otto-on-surface-500", "Field border hover · 56%"], ["--otto-on-surface-400", "Borders, dividers, disabled · 32%"], ["--otto-on-surface-300", "Hover · 16%"], ["--otto-on-surface-200", "Field fill · 8%"]] },
  { group: "Brand", tokens: [["--otto-primary-200", "Primary tint · 14%"], ["--otto-primary-800", "Primary action (rare)"], ["--otto-primary-900", "Primary action, hover · 80%"], ["--otto-accent-100", "Icons and links on accent"], ["--otto-accent-200", "Chips, counts, selection, active tab, info"], ["--otto-accent-300", "Accent, de-emphasized · 80%"], ["--otto-accent-800", "Selected rows, avatars"], ["--otto-accent-900", "Hover rows, tags · 80%"]] },
  { group: "Feedback", tokens: [["--otto-success-200", "Success text on a tint"], ["--otto-success-800", "Success"], ["--otto-success-900", "Success, de-emphasized · 80%"], ["--otto-warning-800", "Warning"], ["--otto-warning-900", "Warning, de-emphasized · 80%"], ["--otto-destructive-200", "Error text, invalid borders, error tone"], ["--otto-destructive-800", "Destructive actions"], ["--otto-destructive-900", "Destructive hover, error containers · 80%"]] },
];

/** Color rules shown under the swatches. Keep in step with design-system/css/tokens.css and Guidelines.md. */
const SURFACE_RULES: Array<[string, string]> = [
  ["Page is 900", "Page titles and loose text sit directly on --otto-surface-900."],
  ["Cards and panels are 800", "Cards, panels, expansion panels, record cards and the side nav use --otto-surface-800."],
  ["Nested steps up to 700", "Card headers, wells and menus inside an 800 surface use --otto-surface-700. For anything nested further, use a translucent fill (--otto-on-surface-200 or -300), which works on any surface."],
];

const ON_SURFACE_RULES: Array<[string, string, string]> = [
  ["800", "Default", "Text, icons, focus rings and focused field borders."],
  ["700", "Secondary", "Secondary text."],
  ["600", "Supporting", "Helper text, captions, labels. AA on every surface."],
  ["500", "Field hover", "Field border on hover."],
  ["400", "Border, disabled", "Borders and dividers (use --otto-border, same value) and disabled text and icons."],
  ["300", "Hover", "Hover backgrounds and row separators."],
  ["200", "Fill", "Field fill and subtle selected backgrounds."],
];

const FAMILY_RULES: Array<[string, string, string, string, string]> = [
  ["Primary", "800 · the one main action", "900 · hover", "200 · 14% tint (primary badge)", "One per area. Text on it is --otto-surface-900."],
  ["Accent", "200 · chips, counts, selection, active tab, info", "300 · de-emphasized", "100 · icons and links on accent", "700 and 800 are navigational and selected surfaces: selected rows, avatars, hover rows, tags."],
  ["Success", "800", "900", "200 · text on a success tint", "Success text on a tint uses 200."],
  ["Warning", "800", "900", "none", "Reserved for caution, not errors."],
  ["Destructive", "800 · irreversible actions", "900 · hover and error containers", "200 · error text, invalid borders, error tone", "Reserve for critical feedback and irreversible actions."],
];

const COLOR_RULES: Array<[string, string]> = [
  ["Tokens only", "Pages and components never use hex, rgb or hsl. The only literals are shadows and scrims (they have their own tokens) and illustrations such as a flag."],
  ["800 is the default", "Every family has an 800 default. Number meaning: on surfaces 900 is deeper and 700 is raised; on on-surface, lower numbers are more de-emphasized; on brand and feedback, 900 is the 80% step and 200 is the light or tint step."],
  ["Hover steps, never new colors", "Brand and feedback controls hover to their 900 step. Neutral controls hover to --otto-on-surface-300. No one-off hover colors."],
  ["Dark red is a fill, not text", "--otto-destructive-800 under white text is 7.3:1, but as text on a dark surface it is only 2.3:1. Error text and invalid borders use --otto-destructive-200 (7.3:1)."],
  ["Focus is white", "Focus rings and focused field borders use --otto-on-surface-800. Never rely on color change alone."],
  ["No off-scale tints", "Never make a tint with color-mix or opacity. Use a step that exists (a family's 900 or 200, or --otto-on-surface-200/300), or add a token."],
  ["Tailwind uses the same tokens", "bg-background is 900, bg-surface is 800, bg-raised is 700, text-foreground is on-surface-800, text-muted is on-surface-600 and border-border is --otto-border. Do not write hex values in arbitrary classes."],
];

const SHAPE_RULES: Array<[string, string]> = [
  ["A surface is 16, what sits on it is 8", "Cards, panels, expansion panels, record cards and dialogs use --otto-radius-lg (16px). Buttons, fields, rows, hover fills, nested panels, menus, banners and tooltips use --otto-radius (8px). The curves are parallel where layers meet."],
  ["Nested surfaces step down", "A card inside a card is 8px. The system does this automatically; don't nest 16 inside 16."],
  ["Full-bleed edges stay square", "The side navigation, side sheet and a card cropped to the window edge have no radius on the edge they touch."],
  ["Never hard-code a radius", "Use the token. The audit warns on a raw border-radius."],
];

const SPACING_RULES: Array<[string, string]> = [
  ["Outside 24 or more, inside 16 or less", "Page padding, column gutters and gaps between regions are 24px or more. Padding and gaps inside a surface are 16px or less. The first thing in a surface sits at its padding, with nothing added above it."],
  ["4px grid", "4, 8, 12, 16, 24, 32. Off-grid values like 10 or 14 are audit warnings."],
  ["Sections in a surface are 16 apart", "Tab bar, toolbar, content: one 16px gap each, never two gaps added together."],
  ["A tab panel starts 16 below its tab bar", "The Tabs component adds it. Don't add top padding inside the panel's content."],
  ["The parent sets the gap", "Use gap on the stack or grid. A component never adds outer margin to push away its neighbor."],
  ["Rows pad 8", "List and feed entries use 8px padding and an 8px hover fill."],
];

const TILE: React.CSSProperties = { border: "1px solid var(--otto-border)", borderRadius: 8, padding: "10px 12px" };
const CODE: React.CSSProperties = { fontFamily: "var(--otto-font-mono)", fontSize: 11 };

const TYPE: Array<[string, string, string]> = [
  ["--otto-text-display", "Display", "Page titles · 28 / Medium"],
  ["--otto-text-headline", "Headline", "Large figures · 24 / Regular"],
  ["--otto-text-title", "Title", "Card and section titles · 20 / Regular"],
  ["--otto-text-subtitle", "Subtitle", "Emphasis, list titles · 16 / SemiBold"],
  ["--otto-text-body-lg", "Body large", "Menu options, chips · 16 / Regular"],
  ["--otto-text-body", "Body", "Default text · 14 / Regular"],
  ["--otto-text-label", "Label", "Field labels, buttons · 14 / SemiBold"],
  ["--otto-text-caption", "Caption", "Metadata, helper text · 12 / Regular"],
  ["--otto-text-caption-bold", "Caption bold", "Small headings · 12 / SemiBold"],
];

const SPACE = [["--otto-space-1", 4], ["--otto-space-2", 8], ["--otto-space-3", 12], ["--otto-space-4", 16], ["--otto-space-5", 20], ["--otto-space-6", 24], ["--otto-space-8", 32], ["--otto-space-10", 40]] as const;

export function FoundationsPage() {
  return (
    <div className="flex flex-col gap-5">
      <Card title="Color">
        <p className="otto-muted">Dark-first. Every color is a token; pages never use hex values. Surfaces use progressive shades, and every color family treats 800 as its default.</p>
        {COLORS.map((g) => (
          <div key={g.group} className="flex flex-col gap-2">
            <h3 className="otto-label">{g.group}</h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
              {g.tokens.map(([t, use]) => (
                <div key={t} style={{ border: "1px solid var(--otto-border)", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ height: 56, background: `var(${t})`, borderBottom: "1px solid var(--otto-border)" }} />
                  <div style={{ padding: "8px 10px" }}>
                    <code style={{ fontFamily: "var(--otto-font-mono)", fontSize: 11 }}>{t}</code>
                    <span className="otto-caption otto-muted" style={{ display: "block" }}>{use}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-3" style={{ marginTop: 8 }}>
          <h3 className="otto-subtitle">Color rules</h3>

          <h3 className="otto-label">Progressive shades</h3>
          <div style={{ background: "var(--otto-surface-900)", border: "1px solid var(--otto-border)", borderRadius: 8, padding: 16 }}>
            <span className="otto-label">Page · --otto-surface-900</span>
            <div style={{ background: "var(--otto-surface-800)", borderRadius: 8, padding: 16, marginTop: 10 }}>
              <span className="otto-label">Card · --otto-surface-800</span>
              <div style={{ background: "var(--otto-surface-700)", borderRadius: 8, padding: 16, marginTop: 10 }}>
                <span className="otto-label">Nested · --otto-surface-700</span>
              </div>
            </div>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {SURFACE_RULES.map(([t, d]) => (
              <div key={t} style={TILE}>
                <span className="otto-label">{t}</span>
                <span className="otto-caption otto-muted" style={{ display: "block", marginTop: 2 }}>{d}</span>
              </div>
            ))}
          </div>

          <h3 className="otto-label" style={{ marginTop: 8 }}>On surface: 800 is the default, step down to de-emphasize</h3>
          <div className="flex flex-col">
            {ON_SURFACE_RULES.map(([n, name, use]) => (
              <div key={n} className="grid items-baseline gap-4" style={{ gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 2fr)", padding: "8px 0", borderTop: "1px solid var(--otto-border)" }}>
                <span><code style={CODE}>--otto-on-surface-{n}</code> <span className="otto-caption otto-muted">{name}</span></span>
                <span className="otto-caption otto-muted">{use}</span>
              </div>
            ))}
          </div>

          <h3 className="otto-label" style={{ marginTop: 8 }}>Brand and feedback families</h3>
          <div style={{ overflowX: "auto" }}>
            <table className="otto-table" style={{ minWidth: 760 }}>
              <thead>
                <tr><th>Family</th><th>Default</th><th>Hover, de-emphasis</th><th>Light or tint</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {FAMILY_RULES.map(([f, a, b, c, n]) => (
                  <tr key={f} style={{ height: "auto" }}>
                    <td style={{ whiteSpace: "normal", padding: "10px 8px", fontWeight: 600 }}>{f}</td>
                    <td style={{ whiteSpace: "normal", padding: "10px 8px" }}>{a}</td>
                    <td style={{ whiteSpace: "normal", padding: "10px 8px" }}>{b}</td>
                    <td style={{ whiteSpace: "normal", padding: "10px 8px" }}>{c}</td>
                    <td style={{ whiteSpace: "normal", padding: "10px 8px" }} className="otto-muted">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="otto-label" style={{ marginTop: 8 }}>Rules</h3>
          <ol className="flex flex-col gap-2" style={{ margin: 0, paddingLeft: 20 }}>
            {COLOR_RULES.map(([t, d]) => (
              <li key={t}><span className="otto-label" style={{ display: "inline" }}>{t}.</span> <span className="otto-muted">{d}</span></li>
            ))}
          </ol>
        </div>
      </Card>

      <Card title="Typography">
        <p className="otto-muted">One family, Inter, at three weights. Sentence case everywhere except page titles, section titles and tab labels.</p>
        <div className="flex flex-col">
          {TYPE.map(([t, name, use]) => (
            <div key={t} className="grid items-baseline gap-4" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(160px, 260px)", padding: "12px 0", borderTop: "1px solid var(--otto-on-surface-300)" }}>
              <span style={{ font: `var(${t})` }}>{name}</span>
              <span className="otto-caption otto-muted">{use}<code style={{ display: "block", fontFamily: "var(--otto-font-mono)", fontSize: 11 }}>{t}</code></span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <Card title="Spacing">
          <p className="otto-muted">A 4px base. 8 between related items, 16 inside cards and forms, 24 for card padding and form gutters, 32+ between page regions.</p>
          {SPACE.map(([t, px]) => (
            <div key={t} className="flex items-center gap-3">
              <code style={{ fontFamily: "var(--otto-font-mono)", fontSize: 11, width: 110 }}>{t}</code>
              <span style={{ width: px * 3, height: 12, background: "var(--otto-accent-200)", borderRadius: 2 }} />
              <span className="otto-caption otto-muted">{px}px</span>
            </div>
          ))}
        </Card>
        <Card title="Shape and size">
          {[["--otto-radius-sm", "4px · tooltips, small controls"], ["--otto-radius", "8px · everything inside a surface"], ["--otto-radius-lg", "16px · surfaces: cards, panels, dialogs"], ["--otto-radius-pill", "999px · chips, pills, badges"]].map(([t, d]) => (
            <div key={t} className="flex items-center gap-3">
              <span style={{ width: 48, height: 32, border: "2px solid var(--otto-accent-100)", borderRadius: `var(${t})` }} />
              <span><code style={{ fontFamily: "var(--otto-font-mono)", fontSize: 11 }}>{t}</code><span className="otto-caption otto-muted" style={{ display: "block" }}>{d}</span></span>
            </div>
          ))}
          <p className="otto-caption otto-muted">Controls: 32px small, 40px default, 44px large. Text fields, selects and search: 40px, the same as a default button. Touch targets at least 44px.</p>
        </Card>
      </div>

      <Card title="Shape and spacing rules">
        <div className="flex flex-col gap-5">
          <p className="otto-muted">Surfaces are 16px and what sits on them is 8px, so layered corners nest. Spacing is a 4px grid with 16px between the sections of a surface.</p>
          <div style={{ background: "var(--otto-surface-900)", padding: 16, borderRadius: 0 }}>
            <div style={{ background: "var(--otto-surface-800)", borderRadius: "var(--otto-radius-lg)", padding: 16 }} className="flex flex-col gap-4">
              <span className="otto-caption otto-muted"><code style={CODE}>--otto-radius-lg</code> 16 · surface</span>
              <div style={{ background: "var(--otto-surface-700)", borderRadius: "var(--otto-radius)", padding: 12 }}>
                <span className="otto-caption otto-muted"><code style={CODE}>--otto-radius</code> 8 · nested panel</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save</Button>
              </div>
            </div>
          </div>
          <h3 className="otto-label">Shape</h3>
          <ol className="flex flex-col gap-2" style={{ margin: 0, paddingLeft: 20 }}>
            {SHAPE_RULES.map(([t, d]) => (
              <li key={t}><span className="otto-label" style={{ display: "inline" }}>{t}.</span> <span className="otto-muted">{d}</span></li>
            ))}
          </ol>
          <h3 className="otto-label">Spacing</h3>
          <ol className="flex flex-col gap-2" style={{ margin: 0, paddingLeft: 20 }}>
            {SPACING_RULES.map(([t, d]) => (
              <li key={t}><span className="otto-label" style={{ display: "inline" }}>{t}.</span> <span className="otto-muted">{d}</span></li>
            ))}
          </ol>
        </div>
      </Card>

      <Card title="Icons">
        <p className="otto-muted">Rounded 24px line icons in one stroke weight. Decorative next to a label; give standalone icons a label.</p>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))" }}>
          {iconNames.map((n) => (
            <Tooltip key={n} text={n}>
              <span tabIndex={0} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 4px", borderRadius: 8, background: "var(--otto-on-surface-200)" }}>
                <Icon name={n} size={24} />
                <code style={{ fontFamily: "var(--otto-font-mono)", fontSize: 10, color: "var(--otto-on-surface-600)" }}>{n}</code>
              </span>
            </Tooltip>
          ))}
        </div>
      </Card>
    </div>
  );
}
