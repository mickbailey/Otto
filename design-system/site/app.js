(function () {
  "use strict";

  var tabs = document.querySelectorAll(".chrome-tab");
  var panels = document.querySelectorAll(".chrome-panel");
  var inited = { showcase: true }; // showcase iframe loads eagerly via its src attribute

  function activate(name) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.dataset.tab === name)); });
    panels.forEach(function (p) { p.setAttribute("data-active", String(p.dataset.panel === name)); });
    if (!inited[name]) {
      inited[name] = true;
      if (name === "playground" && window.OttoPlayground) window.OttoPlayground.init();
      if (name === "audit" && window.OttoAudit) window.OttoAudit.init();
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { activate(t.dataset.tab); });
  });

  var initial = (location.hash || "").replace("#", "");
  if (["showcase", "playground", "audit"].indexOf(initial) !== -1) activate(initial);
})();
