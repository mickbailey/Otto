#!/usr/bin/env node
/**
 * Otto prototype audit: checks prototype source against the design system rules
 * in Guidelines.md and design-system/docs/foundations/color.md.
 *
 *   node scripts/audit-prototype.mjs                 audit src/
 *   node scripts/audit-prototype.mjs src/app/pages/X  audit specific files/folders
 *   node scripts/audit-prototype.mjs --json          machine-readable output
 *   node scripts/audit-prototype.mjs --system        also audit design-system/css
 *   node scripts/audit-prototype.mjs --strict        warnings fail the run too
 *
 * Exit code: 0 = no errors, 1 = errors (or warnings with --strict).
 *
 * Suppress a deliberate exception with a comment on the same or previous line:
 *   // otto-audit-ignore <rule-id> reason it is intentional
 * or for a whole file (e.g. an illustration with brand colors):
 *   // otto-audit-ignore-file <rule-id> reason it is intentional
 * No dependencies. Rules that need judgment are warnings; hard rules are errors.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const targets = args.filter((a) => !a.startsWith("--"));
const asJson = flags.has("--json");
const strict = flags.has("--strict");

// ---------- files ----------
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".backups"]);
function walk(p, out = []) {
  const abs = path.resolve(ROOT, p);
  if (!fs.existsSync(abs)) return out;
  const st = fs.statSync(abs);
  if (st.isFile()) return out.push(abs), out;
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const child = path.join(abs, e.name);
    e.isDirectory() ? walk(child, out) : /\.(tsx?|css)$/.test(e.name) && out.push(child);
  }
  return out;
}
const rel = (f) => path.relative(ROOT, f).split(path.sep).join("/");
const files = (targets.length ? targets : ["src"]).flatMap((t) => walk(t));

// Areas. "page" code is prototype work and gets every rule. The design-system
// showcase pages and the ds/ component layer are held to the color and token
// rules only, since they legitimately use raw elements and primitives.
const isShowcase = (r) => r.startsWith("src/app/pages/design-system/");
const isDsLayer = (r) => r.startsWith("src/components/") || r.startsWith("src/styles/");
const isPage = (r) => r.startsWith("src/app/") && !isShowcase(r) && /\.tsx$/.test(r);

// ---------- tokens ----------
const defined = new Set();
for (const f of [...walk("design-system/css"), ...walk("src/styles")]) {
  for (const m of fs.readFileSync(f, "utf8").matchAll(/(--otto-[\w-]+)\s*:/g)) defined.add(m[1]);
}

// ---------- findings ----------
const findings = [];
function add(rule, severity, file, line, message) {
  findings.push({ rule, severity, file: rel(file), line, message });
}

function stripComments(src, isCss) {
  // keep line numbers: blank out comment text, preserve newlines
  const blank = (m) => m.replace(/[^\n]/g, " ");
  let s = src.replace(/\/\*[\s\S]*?\*\//g, blank);
  if (!isCss) s = s.replace(/(^|[^:"'`\\])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)));
  return s;
}

function ignored(rawLines, i, rule) {
  const re = new RegExp("otto-audit-ignore(?:\\s+" + rule + ")?\\b");
  return re.test(rawLines[i] || "") || re.test(rawLines[i - 1] || "");
}

// ---------- rules ----------
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;
const FUNC_COLOR = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(\s*[^)]*\)/g;
const SHADOW_BLACK = /^rgba?\(\s*0\s*,\s*0\s*,\s*0\b/;
const TW_PALETTE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|decoration|accent|caret|placeholder)-(?:white|black|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})\b/g;
const TW_ARBITRARY_COLOR = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|shadow)-\[(?:#|rgb|hsl)[^\]]*\]/g;
const VAGUE = /^(OK|Done|Yes|No|Sign in|Sign out|Log off)$/;
const TITLE_CASE_LABEL = /^(?:[A-Z][a-z]+)(?:\s+(?:[A-Z][a-z]+)){1,}$/;
const SMALL_WORDS = new Set(["Of", "And", "Or", "To", "In", "On", "A", "The", "For"]);

function auditFile(file) {
  const r = rel(file);
  const isCss = file.endsWith(".css");
  const raw = fs.readFileSync(file, "utf8");
  const rawLines = raw.split("\n");
  const code = stripComments(raw, isCss);
  const lines = code.split("\n");
  const page = isPage(r);

  const fileIgnores = [...raw.matchAll(/otto-audit-ignore-file\s+([\w-]+)/g)].map((m) => m[1]);
  const report = (rule, sev, i, msg) => {
    if (!fileIgnores.includes(rule) && !ignored(rawLines, i, rule)) add(rule, sev, file, i + 1, msg);
  };

  lines.forEach((line, i) => {
    // --- color: applies to every source file, except token definitions themselves
    const isTokenFile = /design-system\/css\/tokens\.css$/.test(r);
    if (!isTokenFile) {
      for (const m of line.matchAll(HEX)) {
        if (/^#\d+$/.test(m[0]) && !/[a-fA-F]/.test(m[0]) && /href|to=|#\//.test(line)) continue; // anchors
        report("hardcoded-color", "error", i, `Hard-coded color ${m[0]}. Use a token from tokens.css (see docs/foundations/color.md).`);
      }
      for (const m of line.matchAll(FUNC_COLOR)) {
        if (SHADOW_BLACK.test(m[0])) continue; // black shadows are the one allowed literal
        report("hardcoded-color", "error", i, `Hard-coded color ${m[0]}. Use a token, or a translucent on-surface step.`);
      }
      for (const m of line.matchAll(TW_PALETTE)) {
        report("tailwind-palette-color", "error", i, `Tailwind palette color "${m[0]}". Use the mapped tokens (bg-surface, text-muted, border-border...).`);
      }
      for (const m of line.matchAll(TW_ARBITRARY_COLOR)) {
        report("tailwind-palette-color", "error", i, `Arbitrary color class "${m[0]}". Use a token.`);
      }
    }
    if (/color-mix\(/.test(line)) report("color-mix", "error", i, "color-mix() makes an off-scale tint. Use an existing step (-900, -200, on-surface-200/300) or add a token.");
    if (/\bopacity\s*:\s*0?\.\d+/.test(line) && !/transition|animation|keyframes/.test(line)) {
      report("opacity-tint", "warning", i, "opacity used as a tint or disabled state. Disabled uses on-surface-400 text and an on-surface-300 fill, never opacity.");
    }

    // --- tokens: every var(--otto-*) must exist
    for (const m of line.matchAll(/var\(\s*(--otto-[\w-]+)/g)) {
      if (!defined.has(m[1])) report("undefined-token", "error", i, `${m[1]} is not defined in tokens.css. Use an existing token or add it.`);
    }
    // old prefixes
    if (/var\(\s*--px-|["'`\s]px-(?:btn|card|tag|badge|field)\b/.test(line)) report("old-prefix", "error", i, "Old --px-/px- prefix. Everything is --otto- / otto-.");

    // --- typography and shape: raw values instead of tokens
    if (!isTokenFile && !/design-system\/css\/components\.css$/.test(r)) {
      if (/font-family\s*:|fontFamily\s*:/.test(line) && !/var\(--otto-font/.test(line) && !/inherit/.test(line)) {
        report("raw-font", "error", i, "Raw font-family. Poppins comes from the theme; mono is var(--otto-font-mono) and only for docs/variants panel.");
      }
      if (/(font-size\s*:\s*\d|fontSize\s*:\s*['"]?\d)/.test(line)) report("raw-type-size", "warning", i, "Raw font size. Use a type token or class (.otto-body, .otto-caption, --otto-text-*).");
      if (/(border-radius\s*:\s*\d|borderRadius\s*:\s*['"]?\d)/.test(line)) report("raw-radius", "warning", i, "Raw radius. Use --otto-radius-sm / --otto-radius / --otto-radius-lg / --otto-radius-pill.");
    }
    if (page && /--otto-font-mono|JetBrains/.test(line)) report("mono-in-product-ui", "error", i, "Mono font is for token names in docs and the variants panel only, never product UI.");

    // --- structure (page code only)
    if (page) {
      if (/from\s+["'][^"']*primitives[^"']*["']/.test(line)) report("primitives-import", "error", i, "Pages never import primitives. Import from components/ds (Icon is re-exported there).");
      const raw = line.match(/<(button|input|select|textarea)\b/);
      if (raw) {
        // Allowed: a native element carrying an otto- class, or the documented
        // search pattern (<input type="search"> inside .otto-search). Check the whole tag, which may span lines.
        const tag = tagAt(code, lines, i, raw[0]);
        if (!/otto-/.test(tag) && !/type=["']search["']/.test(tag)) {
          report("raw-form-element", "error", i, `Raw <${raw[1]}>. Use the ds component (Button, IconButton, Input, Select, Textarea...) or give it an otto- class.`);
        }
      }
      if (/<(div|span)\b[^>]*\bonClick=/.test(line)) report("clickable-div", "warning", i, "onClick on a div/span is not keyboard accessible. Use Button, IconButton or a link.");
      if (/<img\b(?![^>]*\balt=)/.test(line)) report("img-alt", "warning", i, "<img> without alt text.");
      if (/<IconButton\b/.test(line) && !/\blabel=/.test(line) && /\/>|>/.test(line)) {
        // multi-line props are caught below via the whole-tag check
        const tag = tagAt(code, lines, i, "<IconButton");
        if (tag && !/\blabel=/.test(tag)) report("icon-button-label", "error", i, "IconButton without a label. Icon-only controls need an accessible name.");
      }
      if (/style=\{\{[^}]*\b(?:margin|padding|gap)\w*\s*:\s*['"]?(\d+)/.test(line)) {
        for (const m of line.matchAll(/\b(?:margin|padding|gap)\w*\s*:\s*['"]?(\d+)/g)) {
          if (+m[1] % 4 !== 0) report("off-grid-spacing", "warning", i, `Spacing ${m[1]}px is off the 4px grid. Use 4, 8, 12, 16, 24, 32.`);
        }
      }
      if (/\b(?:autoFocus)\b/.test(line)) report("autofocus", "warning", i, "autoFocus can disorient keyboard and screen reader users. Only use it in a dialog's first field.");
    }
  });

  if (page) {
    pageWideRules(file, r, code, lines, rawLines, report);
  }
}

/** Returns the full opening tag that starts on line i (may span lines). */
function tagAt(code, lines, i, open) {
  const idx = lines[i].indexOf(open);
  if (idx < 0) return "";
  let text = lines[i].slice(idx);
  let j = i;
  while (!/\/?>\s*$|>/.test(text.replace(/=>/g, "")) && j < lines.length - 1 && j - i < 15) text += " " + lines[++j];
  return text;
}

function pageWideRules(file, r, code, lines, rawLines, report) {
  const isRouteScreen = /Page\.tsx$|Pages\.tsx$/.test(r);
  if (isRouteScreen) {
    if (!/\b(StandardPage|PageContainer)\b/.test(code)) report("page-shell", "warning", 0, "Page does not use StandardPage/PageContainer. Every page uses the shell (docs/components/page-shell.md).");
    if (!/\bPageHeader\b/.test(code) && !/\bStandardPage\b[^>]*\btitle=/.test(code)) report("page-header", "warning", 0, "Page has no PageHeader (Title Case title, optional description, actions).");
  }

  // Buttons: labels, "Add" + plus icon, vague verbs, title case, primary count
  let primaries = 0;
  const btnRe = /<Button\b/g;
  let m;
  const text = code;
  while ((m = btnRe.exec(text))) {
    const start = m.index;
    const lineNo = text.slice(0, start).split("\n").length - 1;
    const rest = text.slice(start);
    const end = rest.search(/<\/Button>|\/>/);
    const chunk = end < 0 ? rest.slice(0, 400) : rest.slice(0, end + 9);
    const openTag = chunk.slice(0, chunk.indexOf(">") + 1);
    const label = (chunk.match(/>\s*([^<>{}]+?)\s*<\/Button>/) || [])[1]?.trim();
    if (/variant=["']primary["']/.test(openTag)) primaries++;
    if (label) {
      if (/icon=["'](?:plus|add)["']/.test(openTag) && /^Add\b/.test(label)) report("plus-add", "error", lineNo, `"${label}" pairs a + icon with "Add". Use "New ..." (New activity, New contact).`);
      if (VAGUE.test(label)) report("vague-label", "warning", lineNo, `Vague label "${label}". Use a specific verb (Save, Discard, Delete...). Use "Log in/out", not "Sign in/out".`);
      const words = label.split(/\s+/);
      if (TITLE_CASE_LABEL.test(label) && words.filter((w) => !SMALL_WORDS.has(w)).length >= 2) {
        report("title-case-ui-text", "warning", lineNo, `"${label}" looks like Title Case. Buttons, labels and helper text use sentence case.`);
      }
    }
  }
  if (primaries > 1) report("one-primary", "warning", 0, `${primaries} primary buttons in one file. One primary per area; confirm each is in its own area.`);

  // Placeholders on data-entry fields
  const fieldRe = /<(Input|Textarea|Select|Autocomplete)\b/g;
  while ((m = fieldRe.exec(code))) {
    const lineNo = code.slice(0, m.index).split("\n").length - 1;
    const tag = code.slice(m.index, code.indexOf("/>", m.index) + 2 || m.index + 400);
    if (/\bplaceholder=/.test(tag)) {
      const isSearch = /leftIcon=["']search["']/.test(tag) || /hideLabel/.test(tag);
      if (!isSearch) report("placeholder-on-field", "error", lineNo, "Placeholder on a data-entry field. Use a visible label above; placeholders are only for search (hideLabel + search icon) and NoteComposer.");
    }
    if (!/\blabel=/.test(tag) && !/\{\.\.\./.test(tag)) report("field-label", "error", lineNo, `<${m[1]}> without a label. Every field has a visible label (or hideLabel for search).`);
  }

  // Copy
  lines.forEach((line, i) => {
    if (/\b(Oops|Whoops|Uh-oh)\b/i.test(line)) report("friendly-error", "warning", i, 'No "Oops" in errors. Say what happened and what to do next.');
    if (/(error|Error|toast\.error)[^\n]*!["'`<]/.test(line)) report("exclamation-in-error", "warning", i, "No exclamation marks in error messages.");
    if (/<(?:p|span|div|label)[^>]*>\s*(?:Lorem ipsum)/i.test(line)) report("lorem", "warning", i, "Lorem ipsum. Use realistic made-up data.");
  });
}

// ---------- design-system self checks (--system) ----------
function auditSystem() {
  const comp = path.join(ROOT, "design-system/css/components.css");
  if (!fs.existsSync(comp)) return;
  const css = stripComments(fs.readFileSync(comp, "utf8"), true).replace(/url\([^)]*\)/g, (m) => m.replace(/[^\n]/g, " "));
  css.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\.([a-zA-Z][\w-]*)\s*[{,:.\[>+~ ]/g)) {
      const c = m[1];
      if (!/^(otto-|is-)/.test(c) && !/^\d/.test(c) && !/\.(woff2?|svg|png)/.test(line)) {
        add("non-otto-class", "error", comp, i + 1, `Class .${c} is not prefixed otto-.`);
      }
    }
  });
  // WCAG contrast on pairs that matter
  const tokens = {};
  for (const m of fs.readFileSync(path.join(ROOT, "design-system/css/tokens.css"), "utf8").matchAll(/(--otto-[\w-]+)\s*:\s*([^;]+);/g)) tokens[m[1]] = m[2].trim();
  const resolve = (v, d = 0) => {
    const mm = v && v.match(/^var\((--otto-[\w-]+)\)$/);
    return mm && d < 5 ? resolve(tokens[mm[1]], d + 1) : v;
  };
  const parse = (v) => {
    v = resolve(v);
    let m = v && v.match(/^#([0-9a-f]{6})$/i);
    if (m) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: 1 };
    m = v && v.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\)$/);
    return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
  };
  const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
  const lum = (c) => 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  const ch = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const pairs = [
    ["--otto-on-surface-800", "--otto-surface-800", 4.5], ["--otto-on-surface-800", "--otto-surface-900", 4.5], ["--otto-on-surface-800", "--otto-surface-700", 4.5],
    ["--otto-on-surface-600", "--otto-surface-800", 4.5], ["--otto-on-surface-600", "--otto-surface-700", 4.5],
    ["--otto-surface-900", "--otto-primary-800", 4.5], ["--otto-accent-100", "--otto-accent-700", 4.5], ["--otto-accent-100", "--otto-accent-800", 4.5],
    ["--otto-on-surface-800", "--otto-accent-200", 4.5], ["--otto-destructive-200", "--otto-surface-800", 4.5], ["--otto-destructive-200", "--otto-surface-700", 4.5],
    ["--otto-success-200", "--otto-surface-800", 4.5],
  ];
  for (const [fg, bg, min] of pairs) {
    const b = parse(tokens[bg]), f = parse(tokens[fg]);
    if (!b || !f) continue;
    const base = over(b, parse(tokens["--otto-surface-800"]));
    const rt = ratio(over(f, base), base);
    if (rt < min) add("contrast", "error", path.join(ROOT, "design-system/css/tokens.css"), 1, `${fg} on ${bg} is ${rt.toFixed(2)}:1 (needs ${min}:1).`);
  }
}

// ---------- package.json: no new UI/icon/toast libs ----------
function auditPackage() {
  const p = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(p, "utf8"));
  const banned = /^(@mui|@chakra-ui|antd|@mantine|react-bootstrap|bootstrap|styled-components|@emotion|react-hot-toast|react-toastify|sonner|react-icons|lucide-react|@heroicons|@fortawesome|@radix-ui|@headlessui)/;
  for (const dep of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })) {
    if (banned.test(dep)) add("banned-dependency", "error", p, 1, `${dep}: no UI, icon or toast libraries. Build it in components/ds and add icons to primitives/Icon.tsx.`);
  }
}

// ---------- run ----------
for (const f of files) auditFile(f);
if (flags.has("--system")) auditSystem();
if (!targets.length) auditPackage();

const order = { error: 0, warning: 1 };
findings.sort((a, b) => order[a.severity] - order[b.severity] || a.file.localeCompare(b.file) || a.line - b.line);
const errors = findings.filter((f) => f.severity === "error").length;
const warnings = findings.length - errors;

if (asJson) {
  console.log(JSON.stringify({ scanned: files.length, errors, warnings, findings }, null, 2));
} else {
  console.log(`Otto audit: ${files.length} files scanned\n`);
  let last = "";
  for (const f of findings) {
    if (f.file !== last) console.log(`\n${f.file}`), (last = f.file);
    console.log(`  ${f.severity === "error" ? "ERROR" : "warn "}  ${String(f.line).padStart(4)}  [${f.rule}]  ${f.message}`);
  }
  console.log(`\n${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}`);
  if (!findings.length) console.log("Clean: no hard-coded colors, undefined tokens, raw elements or copy violations found.");
  console.log("Automated checks cover rules that can be linted. The review checklist in .agents/skills/otto-audit/SKILL.md covers the rest.");
}
process.exit(errors || (strict && warnings) ? 1 : 0);
