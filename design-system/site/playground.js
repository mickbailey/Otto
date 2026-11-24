(function () {
  "use strict";

  var TOKENS_URL = "/css/tokens.css";
  var SAVE_URL = "/api/save-tokens";

  var state = {
    raw: "",          // last-saved (or just-fetched) tokens.css text
    entries: [],      // [{name, value, comment, section}] in file order
    overrides: {},     // name -> edited value (only entries that differ from baseline)
    ready: false,
  };

  var rail = document.getElementById("pg-rail");
  var frame = document.getElementById("playground-frame");

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function parseTokens(raw) {
    var lines = raw.split("\n");
    var section = "General";
    var entries = [];
    var sectionRe = /^\s*\/\*\s*-{2,}\s*(.+?)\s*-{2,}\s*\*\/\s*$/;
    var varRe = /^\s*(--otto-[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var sm = line.match(sectionRe);
      if (sm) { section = sm[1]; continue; }
      var vm = line.match(varRe);
      if (vm) {
        entries.push({ name: vm[1], value: vm[2].trim(), comment: vm[3] || "", section: section });
      }
    }
    return entries;
  }

  function classify(value) {
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return "color";
    if (/^-?\d+(\.\d+)?(px|s)$/.test(value)) return "length";
    return "text";
  }

  function swatchColor(value) {
    // best-effort preview color for the little square next to non-color controls too
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return value;
    if (/^rgba?\(/.test(value)) return value;
    return null;
  }

  function friendlyName(name) {
    return name.replace("--otto-", "").split("-").join(" ");
  }

  function buildRail() {
    var bySection = {};
    var order = [];
    state.entries.forEach(function (e) {
      if (!bySection[e.section]) { bySection[e.section] = []; order.push(e.section); }
      bySection[e.section].push(e);
    });

    var html = "";
    html += '<div class="pg-rail__actions">' +
      '<button class="pg-btn" id="pg-reset">Reset</button>' +
      '<button class="pg-btn" id="pg-download">Download</button>' +
      '<button class="pg-btn pg-btn--primary" id="pg-save">Save to tokens.css</button>' +
      "</div>";
    html += '<p class="pg-status" id="pg-status">Edit a value to see every component update live. Nothing is written to disk until you click Save.</p>';

    order.forEach(function (section, idx) {
      html += '<details class="pg-section"' + (idx < 2 ? " open" : "") + '><summary>' + escapeHtml(section) + "</summary>";
      bySection[section].forEach(function (e) {
        var type = classify(e.value);
        var swatch = swatchColor(e.value);
        html += '<div class="pg-row" data-token="' + e.name + '">';
        html += '<label>' + escapeHtml(friendlyName(e.name)) + '<span class="name">' + escapeHtml(e.name) + "</span></label>";
        if (swatch) html += '<span class="pg-swatch" style="background:' + escapeHtml(swatch) + '"></span>';
        if (type === "color") {
          html += '<input type="color" value="' + e.value + '" data-type="color">';
        } else if (type === "length") {
          html += '<input type="text" value="' + escapeHtml(e.value) + '" data-type="length" style="width:72px">';
        } else {
          html += '<input type="text" value="' + escapeHtml(e.value) + '" data-type="text">';
        }
        html += "</div>";
      });
      html += "</details>";
    });

    rail.innerHTML = html;
    rail.querySelectorAll(".pg-row input").forEach(function (input) {
      input.addEventListener("input", onInputChange);
    });
    document.getElementById("pg-reset").addEventListener("click", resetAll);
    document.getElementById("pg-download").addEventListener("click", downloadTokens);
    document.getElementById("pg-save").addEventListener("click", saveTokens);
  }

  function setStatus(msg, tone) {
    var el = document.getElementById("pg-status");
    if (!el) return;
    el.textContent = msg;
    if (tone) el.setAttribute("data-tone", tone); else el.removeAttribute("data-tone");
  }

  function onInputChange(ev) {
    var input = ev.target;
    var row = input.closest(".pg-row");
    var name = row.getAttribute("data-token");
    var original = state.entries.find(function (e) { return e.name === name; }).value;
    var value = input.value;
    if (value === original) {
      delete state.overrides[name];
      input.classList.remove("pg-changed");
    } else {
      state.overrides[name] = value;
      input.classList.add("pg-changed");
    }
    var swatch = row.querySelector(".pg-swatch");
    if (swatch) swatch.style.background = value;
    applyOverrides();
  }

  function overrideCss() {
    var names = Object.keys(state.overrides);
    if (!names.length) return "";
    var body = names.map(function (n) { return "  " + n + ": " + state.overrides[n] + ";"; }).join("\n");
    return ".otto-theme {\n" + body + "\n}";
  }

  function injectInto(doc) {
    if (!doc || !doc.head) return;
    var style = doc.getElementById("otto-live-overrides");
    if (!style) {
      style = doc.createElement("style");
      style.id = "otto-live-overrides";
      doc.head.appendChild(style);
    }
    style.textContent = overrideCss();
  }

  function applyOverrides() {
    try {
      if (frame.contentDocument && frame.contentDocument.readyState === "complete") {
        injectInto(frame.contentDocument);
      }
    } catch (e) { /* cross-origin, shouldn't happen on same host */ }
  }

  function resetAll() {
    state.overrides = {};
    rail.querySelectorAll(".pg-row").forEach(function (row) {
      var name = row.getAttribute("data-token");
      var original = state.entries.find(function (e) { return e.name === name; }).value;
      var input = row.querySelector("input");
      input.value = original;
      input.classList.remove("pg-changed");
      var swatch = row.querySelector(".pg-swatch");
      if (swatch) swatch.style.background = original;
    });
    applyOverrides();
    setStatus("Reset to the values currently saved in tokens.css.");
  }

  function fullTextWithOverrides() {
    var text = state.raw;
    Object.keys(state.overrides).forEach(function (name) {
      var re = new RegExp("(" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*:\\s*)([^;]+)(;)");
      text = text.replace(re, function (m, pre, _old, post) { return pre + state.overrides[name] + post; });
    });
    return text;
  }

  function downloadTokens() {
    var text = fullTextWithOverrides();
    var blob = new Blob([text], { type: "text/css" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "tokens.css";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function saveTokens() {
    var names = Object.keys(state.overrides);
    if (!names.length) { setStatus("Nothing changed yet.", null); return; }
    var text = fullTextWithOverrides();
    setStatus("Saving…", null);
    fetch(SAVE_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: text })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j.ok) throw new Error((res.j && res.j.error) || "Save failed");
        state.raw = text;
        state.entries = parseTokens(text);
        state.overrides = {};
        rail.querySelectorAll(".pg-row input").forEach(function (i) { i.classList.remove("pg-changed"); });
        setStatus("Saved. Backup kept at " + res.j.backup + ".", "ok");
        // reflect the real committed file everywhere, including the Showcase tab
        try { frame.contentWindow.location.reload(); } catch (e) {}
        var showcaseFrame = document.getElementById("showcase-frame");
        if (showcaseFrame) { try { showcaseFrame.contentWindow.location.reload(); } catch (e) {} }
      })
      .catch(function (err) {
        setStatus("Couldn't save (" + err.message + "). Is scripts/serve.py running? Use Download instead.", "error");
      });
  }

  function init() {
    if (state.ready) return;
    fetch(TOKENS_URL, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(function (raw) {
        state.raw = raw;
        state.entries = parseTokens(raw);
        state.ready = true;
        buildRail();
        if (frame.contentDocument && frame.contentDocument.readyState === "complete") {
          applyOverrides();
        } else {
          frame.addEventListener("load", applyOverrides);
        }
      })
      .catch(function (err) {
        rail.innerHTML = '<p class="pg-status" data-tone="error">Couldn\'t load /css/tokens.css (' + escapeHtml(err.message) +
          "). Make sure you're viewing this through scripts/serve.py, not as a file:// path.</p>";
      });
  }

  window.OttoPlayground = { init: init };
})();
