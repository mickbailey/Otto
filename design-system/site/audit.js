(function () {
  "use strict";

  var root = document.getElementById("audit-root");
  var ran = false;

  // Accepted exceptions: decided in the design-system debt review, not defects.
  // Keep this list short and reasoned — it exists so the audit stays a signal,
  // not permanent noise for things we've deliberately chosen not to change.
  var ACCEPTED = {
    cssSections: ["Base", "Type", "Responsive"], // infrastructure, not components
    nonPxClasses: ["is-num", "is-on"], // README: is-* is a separate, intentional state-hook convention
    hardcodedColors: [], // none: every color is a token (see docs/foundations/color.md)
    reservedTokens: ["--otto-on-surface-700", "--otto-success-900", "--otto-warning-900"], // scale steps from the Figma color foundations that no component uses yet
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function get(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) { return r.ok ? r.text() : ""; }).catch(function () { return ""; });
  }
  function getJson(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
  }

  // ---------- color math ----------
  function hexToRgb(hex) {
    var m = hex.replace("#", "");
    if (m.length === 3) m = m.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(m, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function parseColor(value) {
    value = value.trim();
    var hex = value.match(/^#([0-9a-fA-F]{3,8})$/);
    if (hex) {
      var rgb = hexToRgb(value);
      return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 };
    }
    var rgba = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
    if (rgba) {
      return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] !== undefined ? +rgba[4] : 1 };
    }
    return null;
  }
  function flatten(fg, bg) {
    // alpha-composite fg over an opaque bg
    var a = fg.a;
    return {
      r: fg.r * a + bg.r * (1 - a),
      g: fg.g * a + bg.g * (1 - a),
      b: fg.b * a + bg.b * (1 - a),
      a: 1,
    };
  }
  function luminance(c) {
    function ch(v) {
      v = v / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  }
  function contrast(c1, c2) {
    var l1 = luminance(c1), l2 = luminance(c2);
    var lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  function rgbCss(c) { return "rgb(" + Math.round(c.r) + "," + Math.round(c.g) + "," + Math.round(c.b) + ")"; }

  // ---------- parsing helpers ----------
  function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, function (m) {
      return m.replace(/[^\n]/g, " ");
    });
  }
  function lineOf(text, index) {
    return text.slice(0, index).split("\n").length;
  }
  function stripUrls(css) {
    // data: URIs (e.g. the select-arrow SVG) can contain dots-followed-by-letters
    // (http://www.w3.org/...) that would otherwise look like class selectors.
    return css.replace(/url\([^)]*\)/g, function (m) { return m.replace(/[^\n]/g, " "); });
  }

  function parseTokenMap(tokensRaw) {
    var map = {};
    var re = /(--otto-[\w-]+)\s*:\s*([^;]+);/g;
    var m;
    while ((m = re.exec(tokensRaw))) map[m[1]] = m[2].trim();
    return map;
  }

  function parseCssSections(componentsRaw) {
    // section headers use either ---- or ==== as the divider (both appear in components.css)
    var re = /\/\*\s*[-=]{2,}\s*(.+?)\s*[-=]{2,}\s*\*\//g;
    var out = [], m;
    while ((m = re.exec(componentsRaw))) out.push(m[1].trim());
    return out;
  }

  function slugify(name) {
    return name.replace(/\(.*?\)/g, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function parseReadmeComponents(readmeRaw) {
    var m = readmeRaw.match(/## Components\s*\n\n([^\n]+)/);
    if (!m) return [];
    return m[1].split("·").map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function findHardcodedColors(componentsRaw, tokenMap) {
    var stripped = stripUrls(stripComments(componentsRaw));
    var tokenValues = {};
    Object.keys(tokenMap).forEach(function (k) { tokenValues[tokenMap[k].toLowerCase()] = k; });
    var found = [];
    var re = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
    var m;
    while ((m = re.exec(stripped))) {
      var val = m[0];
      if (/^rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,/.test(val)) continue; // generic shadow/scrim alpha, low-value noise
      var line = lineOf(stripped, m.index);
      var normalized = val.toLowerCase().replace(/\s+/g, "");
      var dupOf = null;
      Object.keys(tokenValues).forEach(function (tv) {
        if (tv.replace(/\s+/g, "") === normalized) dupOf = tokenValues[tv];
      });
      found.push({ value: val, line: line, dupOf: dupOf });
    }
    return found;
  }

  function findNonPxClasses(componentsRaw) {
    var stripped = stripUrls(stripComments(componentsRaw));
    var re = /\.([a-zA-Z][\w-]*)/g;
    var seen = {}, out = [], m;
    while ((m = re.exec(stripped))) {
      var cls = m[1];
      if (seen[cls]) continue;
      seen[cls] = true;
      if (cls.indexOf("otto-") !== 0) out.push({ cls: cls, line: lineOf(stripped, m.index) });
    }
    return out;
  }

  function findDefinedPxClasses(componentsRaw) {
    var stripped = stripComments(componentsRaw);
    var re = /\.(otto-[\w-]*[a-zA-Z0-9])/g;
    var seen = {}, m;
    while ((m = re.exec(stripped))) seen[m[1]] = true;
    return Object.keys(seen);
  }

  function findUnusedTokens(tokenMap, haystack) {
    return Object.keys(tokenMap).filter(function (name) {
      return haystack.indexOf("var(" + name + ")") === -1 && ACCEPTED.reservedTokens.indexOf(name) === -1;
    });
  }

  // ---------- contrast pairs ----------
  function buildContrastChecks(tokenMap) {
    function resolve(spec) {
      // spec: token name, "hex:#fff", or {token, over} for alpha colors flattened onto another resolved color
      if (typeof spec === "string" && spec.indexOf("hex:") === 0) return parseColor(spec.slice(4));
      if (typeof spec === "string") return parseColor(tokenMap[spec]);
      var base = resolve(spec.over);
      var fg = typeof spec.token === "string" && spec.token.indexOf("hex:") === 0
        ? parseColor(spec.token.slice(4)) : parseColor(tokenMap[spec.token]);
      return flatten(fg, base);
    }
    var pairs = [
      { label: "Body text on surface", fg: "--otto-on-surface-800", bg: "--otto-surface-800" },
      { label: "Body text on sub-surface (app background)", fg: "--otto-on-surface-800", bg: "--otto-surface-900" },
      { label: "Muted text on surface", fg: "--otto-on-surface-600", bg: "--otto-surface-800" },
      { label: "Muted text on sub-surface", fg: "--otto-on-surface-600", bg: "--otto-surface-900" },
      { label: "Primary button text (surface-900) on primary-800", fg: "--otto-surface-900", bg: "--otto-primary-800" },
      { label: "Accent-ink (links/icons) on navy-600", fg: "--otto-accent-100", bg: "--otto-accent-900" },
      { label: "Accent-ink (links/icons) on navy-400", fg: "--otto-accent-100", bg: "--otto-accent-800" },
      { label: "White text on destructive button", fg: "hex:#FFFFFF", bg: "--otto-destructive-800" },
      { label: "Tooltip text (surface-900) on on-surface-800", fg: "--otto-surface-900", bg: "--otto-on-surface-800" },
      { label: "Body text on secondary (chip/count background)", fg: "--otto-on-surface-800", bg: "--otto-accent-200" },
      { label: "Primary badge text on primary-200, over surface", fg: { token: "--otto-primary-200", over: "--otto-surface-800" }, bg: { token: "--otto-primary-200", over: "--otto-surface-800" }, fgToken: "--otto-primary-800" },
      { label: "Error badge text (white) on destructive-900, over surface", fg: "hex:#FFFFFF", bg: { token: "--otto-destructive-900", over: "--otto-surface-800" } },
      { label: "Error text (destructive-200, field errors) on surface", fg: "--otto-destructive-200", bg: "--otto-surface-800" },
      { label: "Error text (destructive-200, field errors) on sub-surface", fg: "--otto-destructive-200", bg: "--otto-surface-900" },
    ];
    return pairs.map(function (p) {
      var bg = resolve(p.bg);
      var fg = p.fgToken ? flatten(parseColor(tokenMap[p.fgToken]), bg) : resolve(p.fg);
      if (!bg || !fg) return null;
      var ratio = contrast(fg, bg);
      return { label: p.label, ratio: ratio, fg: fg, bg: bg };
    }).filter(Boolean);
  }

  // ---------- rendering ----------
  function severityBadge(sev) {
    var cls = sev === "error" ? "otto-badge--error" : sev === "warning" ? "otto-badge--primary" : "";
    return '<span class="otto-badge ' + cls + '">' + sev.toUpperCase() + "</span>";
  }

  function section(title, countLabel, bodyHtml) {
    return '<div class="otto-card" style="margin-bottom:20px"><div class="otto-card__header"><strong class="otto-subtitle">' +
      esc(title) + "</strong>" + (countLabel ? '<span class="otto-muted" style="margin-left:auto">' + esc(countLabel) + "</span>" : "") +
      '</div><div class="otto-card__body">' + bodyHtml + "</div></div>";
  }

  function run() {
    Promise.all([
      get("/css/tokens.css"),
      get("/css/components.css"),
      get("/README.md"),
      getJson("/api/manifest"),
    ]).then(function (res) {
      var tokensRaw = res[0], componentsRaw = res[1], readmeRaw = res[2], manifest = res[3] || {};
      var tokenMap = parseTokenMap(tokensRaw);
      var readmeComponents = parseReadmeComponents(readmeRaw);
      var cssSections = parseCssSections(componentsRaw).filter(function (s) {
        return !ACCEPTED.cssSections.some(function (a) { return s === a || s.indexOf(a) === 0; });
      });
      var hardcoded = findHardcodedColors(componentsRaw, tokenMap).filter(function (h) { return ACCEPTED.hardcodedColors.indexOf(h.value.toUpperCase()) === -1; });
      var nonPx = findNonPxClasses(componentsRaw).filter(function (n) { return ACCEPTED.nonPxClasses.indexOf(n.cls) === -1; });
      var definedClasses = findDefinedPxClasses(componentsRaw);
      var contrastResults = buildContrastChecks(tokenMap);

      Promise.all((manifest.examples || []).map(function (f) { return get("/examples/" + f); }))
        .then(function (exampleTexts) {
          var examplesJoined = exampleTexts.join(" ");
          // a token is "used" if components.css consumes it, OR tokens.css composes it into another token
          var unusedTokens = findUnusedTokens(tokenMap, componentsRaw + " " + tokensRaw);
          var orphanClasses = definedClasses.filter(function (c) {
            return c !== "otto-theme" && examplesJoined.indexOf(c) === -1;
          });

          var html = "";

          // Summary
          var errCount = hardcoded.filter(function (h) { return h.dupOf; }).length + nonPx.length +
            contrastResults.filter(function (c) { return c.ratio < 3; }).length;
          var warnCount = hardcoded.filter(function (h) { return !h.dupOf; }).length +
            contrastResults.filter(function (c) { return c.ratio >= 3 && c.ratio < 4.5; }).length;
          html += '<div class="sc-intro" style="padding:0;margin-bottom:24px">' +
            '<span class="otto-overline otto-muted">Otto design system</span>' +
            '<h1 class="otto-display" style="font-size:30px">Audit</h1>' +
            '<p class="otto-body-lg otto-muted">Computed live from <code class="mono">css/tokens.css</code>, ' +
            '<code class="mono">css/components.css</code>, <code class="mono">README.md</code> ' +
            "and the files in <code class=\"mono\">docs/</code> and <code class=\"mono\">examples/</code> — re-run by reloading this tab.</p>" +
            '<div class="sc-row">' + severityBadge("error") + " " + errCount + " &nbsp; " + severityBadge("warning") + " " + warnCount + "</div>" +
            '<p class="otto-muted" style="margin-top:4px">' + (ACCEPTED.cssSections.length + ACCEPTED.nonPxClasses.length + ACCEPTED.hardcodedColors.length) +
            ' accepted exception(s) from past review are excluded below — see ACCEPTED in site/audit.js.</p>' +
            "</div>";

          // 1. Documentation coverage
          var missingDocs = readmeComponents.filter(function (name) {
            var slug = slugify(name);
            return !(manifest.componentDocs || []).some(function (f) { return f.toLowerCase() === slug + ".md"; });
          });
          var undocBody = '<p class="otto-muted">README lists ' + readmeComponents.length + " components; " +
            (manifest.componentDocs || []).length + " have a doc in <code class=\"mono\">docs/components/</code>.</p>";
          if (missingDocs.length) {
            undocBody += '<ul class="otto-detail-list" style="margin-top:12px">' + missingDocs.map(function (n) {
              return "<li>" + severityBadge("warning") + " <strong>" + esc(n) + "</strong> — no docs/components/" + esc(slugify(n)) + ".md</li>";
            }).join("") + "</ul>";
          } else {
            undocBody += '<p class="otto-muted">✓ every README component has a docs file.</p>';
          }
          html += section("Documentation coverage", missingDocs.length + " undocumented", undocBody);

          // 2. CSS/README drift (strip parens from both sides — a CSS section's
          // aside shouldn't block matching, same as a README item's parenthetical)
          function normalizeName(s) { return s.replace(/\(.*?\)/g, "").trim().toLowerCase(); }
          var undeclaredSections = cssSections.filter(function (s) {
            var base = normalizeName(s);
            return !readmeComponents.some(function (r) {
              var rn = normalizeName(r);
              return base.indexOf(rn) !== -1 || rn.indexOf(base) !== -1;
            });
          });
          var driftBody = undeclaredSections.length
            ? '<p class="otto-muted">components.css has sections not mentioned in the README\'s component list:</p><ul class="otto-detail-list" style="margin-top:8px">' +
              undeclaredSections.map(function (s) { return "<li>" + severityBadge("warning") + " " + esc(s) + "</li>"; }).join("") + "</ul>"
            : '<p class="otto-muted">✓ every components.css section is reflected in the README.</p>';
          html += section("README / CSS drift", undeclaredSections.length + " undeclared sections", driftBody);

          // 3. Token discipline
          var hcBody = "";
          if (hardcoded.length) {
            hcBody += '<ul class="otto-detail-list">' + hardcoded.map(function (h) {
              return "<li>" + (h.dupOf ? severityBadge("error") : severityBadge("warning")) +
                ' <code class="mono">' + esc(h.value) + "</code> — line " + h.line +
                (h.dupOf ? ' duplicates <code class="mono">var(' + esc(h.dupOf) + ")</code> — use the token" : " — not tokenized") +
                "</li>";
            }).join("") + "</ul>";
          } else {
            hcBody = '<p class="otto-muted">✓ no hard-coded colors found outside tokens.css.</p>';
          }
          html += section("Token discipline (hard-coded colors)", hardcoded.length + " found", hcBody);

          // 4. Unused tokens
          var unusedBody = unusedTokens.length
            ? '<p class="otto-muted">Declared in tokens.css, never referenced via <code class="mono">var()</code> in components.css:</p>' +
              '<div class="otto-tags" style="margin-top:8px">' + unusedTokens.map(function (t) { return '<span class="otto-tag">' + esc(t) + "</span>"; }).join("") + "</div>"
            : '<p class="otto-muted">✓ every token is used at least once.</p>';
          html += section("Unused tokens", unusedTokens.length + " unused", unusedBody);

          // 5. Naming consistency
          var nameBody = nonPx.length
            ? '<p class="otto-muted">README says "every class is prefixed otto-". These class selectors aren\'t:</p><ul class="otto-detail-list" style="margin-top:8px">' +
              nonPx.map(function (n) { return "<li>" + severityBadge("error") + ' <code class="mono">.' + esc(n.cls) + "</code> — line " + n.line + "</li>"; }).join("") + "</ul>"
            : '<p class="otto-muted">✓ every class is otto-prefixed.</p>';
          html += section("Naming consistency", nonPx.length + " exceptions", nameBody);

          // 6. Contrast
          var rows = contrastResults.map(function (c) {
            var sev = c.ratio < 3 ? "error" : c.ratio < 4.5 ? "warning" : null;
            return "<tr><td>" + esc(c.label) + '</td><td><span class="pg-swatch" style="display:inline-block;width:16px;height:16px;border-radius:3px;vertical-align:middle;margin-right:6px;background:' +
              rgbCss(c.fg) + '"></span><span class="pg-swatch" style="display:inline-block;width:16px;height:16px;border-radius:3px;vertical-align:middle;background:' + rgbCss(c.bg) + '"></span></td>' +
              '<td class="is-num">' + c.ratio.toFixed(2) + ":1</td><td>" + (sev ? severityBadge(sev) : '<span class="otto-badge otto-badge--final">AA PASS</span>') + "</td></tr>";
          }).join("");
          var contrastBody = '<div class="otto-table-wrap"><table class="otto-table"><thead><tr><th>Pair</th><th>Colors</th><th class="is-num">Ratio</th><th>WCAG AA (4.5:1)</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
          var contrastFails = contrastResults.filter(function (c) { return c.ratio < 4.5; }).length;
          html += section("Accessibility — contrast", contrastFails + " below 4.5:1", contrastBody);

          // 7. Example coverage (info-level)
          html += section("Example coverage", orphanClasses.length + " not demonstrated",
            '<p class="otto-muted">Classes defined in components.css that don\'t appear in any file under examples/ yet. ' +
            "Expected early on — useful as a showcase/example to-do list, not a defect.</p>" +
            '<details style="margin-top:8px"><summary class="otto-muted" style="cursor:pointer">Show ' + orphanClasses.length + ' classes</summary>' +
            '<div class="otto-tags" style="margin-top:8px">' + orphanClasses.map(function (c) { return '<span class="otto-tag otto-tag--muted">' + esc(c) + "</span>"; }).join("") + "</div></details>");

          root.querySelector("div").innerHTML = html;
        });
    });
  }

  function init() {
    if (ran) return;
    ran = true;
    run();
  }

  window.OttoAudit = { init: init };
})();
