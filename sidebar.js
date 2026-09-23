/**
 * Athalta — Course index sidebar.
 * Right-side drawer, accordion units, and progress from localStorage.
 */

(function () {
  "use strict";

  var UNIT_COUNT = 7;
  var STORAGE_PREFIX = "athalta_unit_";

  function sitePrefix() {
    var el = document.currentScript;
    var scripts;
    var src = "";
    var path;
    if (!el) {
      scripts = document.getElementsByTagName("script");
      el = scripts[scripts.length - 1];
    }
    src = (el && el.getAttribute && el.getAttribute("src")) || "";
    src = src.split("?")[0].replace(/\\/g, "/");
    if (src && src.charAt(0) !== "/" && !/^https?:\/\//i.test(src)) {
      return src.replace(/[^/]*$/, "") || "./";
    }
    path = (window.location.pathname || "").replace(/\\/g, "/");
    if (/\/(unit[1-7]|navigation)\/[^/]*$/i.test(path)) {
      return "../";
    }
    return "./";
  }

  var SITE_ROOT = sitePrefix();

  function fromRoot(href) {
    return SITE_ROOT + String(href || "").replace(/^\//, "");
  }

  var UNITS = [
    {
      id: 1,
      progressId: 1,
      title: "יחידה 1 | הכניסה לתפקיד והבסיס התפיסתי של אתחלתא",
      pages: [
        {
          href: "unit1/index.html",
          label: "הגדרת הצורך והקמת תוכנית אתחלתא"
        },
        { href: "unit1/page2.html", label: "השותפים בתוכנית" },
        { href: "unit1/page3.html", label: "שלבי הכניסה להוראה בישראל" },
        {
          href: "unit1/page4.html",
          label: "אתגרי כניסה לתפקיד חינוך הכיתה"
        },
        {
          href: "unit1/page5.html",
          label: "רפלקציה על אתגרי הכניסה לתפקיד"
        },
        {
          href: "unit1/page6.html",
          label: "מטרת חממות וסדנאות התוכנית"
        },
        {
          href: "unit1/page7.html",
          label: "יסודות אתחלתא"
        }
      ]
    },
    {
      id: 2,
      progressId: 2,
      title: "יחידה 2 | תפקיד המנחה ומבנה מסגרות הליווי",
      pages: [
        { href: "unit2/page1.html", label: "בעלות התפקידים בתוכנית" },
        { href: "unit2/page2.html", label: "קהל היעד ומסגרות התוכנית" }
      ]
    },
    {
      id: 3,
      progressId: 3,
      title: "יחידה 3 | הקמה וניהול חממות וסדנאות אתחלתא",
      pages: [
        { href: "unit3/page1.html", label: "הקמת חממות אתחלתא" },
        { href: "unit3/page2.html", label: "הקמת סדנאות אתחלתא" }
      ]
    },
    {
      id: 4,
      progressId: 4,
      title: "יחידה 4 | תכנון שנתי ותכנים להנחייה",
      pages: [
        {
          href: "unit4/page1.html",
          label: "עקרונות לכתיבת סילבוס למחנכות כיתה חדשות"
        },
        {
          href: "unit4/page2.html",
          label: "ארבעת העקרונות לכתיבת סילבוס למחנכות כיתה חדשות"
        },
        {
          href: "unit4/page5-0.html",
          label: "תכנים מוצעים - ביטוי עצמי ושייכות"
        },
        {
          href: "unit4/page5-1.html",
          label: "תכנים מוצעים - מקצוענות וניהול עצמי"
        },
        {
          href: "unit4/page5-2.html",
          label: "תכנים מוצעים - זהות"
        },
        {
          href: "unit4/page5-3.html",
          label: "תכנים מוצעים - זהות"
        },
        {
          href: "unit4/page5-4.html",
          label: "תכנים מוצעים - מסוגלות עצמית"
        },
        {
          href: "unit4/page5-5.html",
          label: "תכנים מוצעים - שותפויות"
        },
        {
          href: "unit4/page5-6.html",
          label: "תכנים מוצעים - שליחות ומשמעות"
        },
        {
          href: "unit4/page6.html",
          label: "לסיכום — מחברים את כל החלקים"
        },
        {
          href: "unit4/page7.html",
          label: "קטלוג החומרים של אתחלתא"
        }
      ]
    },
    {
      id: 5,
      progressId: 5,
      title: "יחידה 5 | מפת הדרכים: אבני דרך וסדירויות",
      pages: [
        { href: "unit5/page1.html", label: "אבני הדרך בתוכנית" },
        {
          href: "unit5/page2.html",
          label: "נקודות ציון במהלך שנת הפעילות"
        },
        { href: "unit5/page3.html", label: "מפגשים וסדירויות בתוכנית" }
      ]
    },
    {
      id: 6,
      progressId: 6,
      title: "יחידה 6 | תקציב ודיווח",
      pages: [
        { href: "unit6/page1.html", label: "מקורות ומבנה התקציב" },
        { href: "unit6/page2.html", label: "רכיבי התקציב התוספתי" },
        { href: "unit6/page3.html", label: "דיווח תקציב שנתי" }
      ]
    },
    {
      id: 7,
      progressId: 7,
      title: "יחידה 7 | שאלות נפוצות ולוח מפגשים",
      pages: [
        { href: "unit7/page1.html", label: "שאלות נפוצות (FAQ)" },
        { href: "unit7/page2.html", label: "מתווה מפגשים תשפ״ז" }
      ]
    }
  ];

  var ICONS = {
    menu:
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
      "</svg>",
    calendar:
      '<svg class="athalta-sidebar-progress-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.8"/>' +
      '<path d="M8 3.5v4M16 3.5v4M3.5 10.5h17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      "</svg>",
    book:
      '<svg class="athalta-sidebar-book" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M6 4.5h11.5A1.5 1.5 0 0 1 19 6v13.2H8.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M6 4.5A2 2 0 0 0 4 6.5v12A1.5 1.5 0 0 0 5.5 20H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path d="M8.2 8h7.3M8.2 12h7.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      "</svg>",
    chevron:
      '<svg class="athalta-sidebar-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>",
    check:
      '<span class="athalta-sidebar-check" hidden>' +
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="10" fill="currentColor"/>' +
      '<path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>" +
      "</span>"
  };

  var lastFocus = null;

  function currentPath() {
    return window.location.pathname.replace(/\\/g, "/");
  }

  function isActiveHref(href) {
    var path = currentPath();
    var target = href.replace(/\\/g, "/");
    return path === target || path.endsWith(target);
  }

  function isMapPage() {
    var path = currentPath();
    return (
      path.indexOf("/navigation/navigation.html") !== -1 ||
      /\/navigation\/?$/.test(path)
    );
  }

  function findActiveUnitId() {
    var path = currentPath();
    var i;
    var j;
    var pages;
    if (isMapPage()) {
      return 0;
    }
    for (i = 0; i < UNITS.length; i += 1) {
      pages = UNITS[i].pages;
      for (j = 0; j < pages.length; j += 1) {
        if (path.endsWith(pages[j].href) || path === pages[j].href) {
          return UNITS[i].id;
        }
      }
    }
    if (path.indexOf("/unit7/") !== -1) {
      return 7;
    }
    if (path.indexOf("/unit6/") !== -1) {
      return 6;
    }
    if (path.indexOf("/unit5/") !== -1) {
      return 5;
    }
    if (path.indexOf("/unit4/") !== -1) {
      return 4;
    }
    if (path.indexOf("/unit3/") !== -1) {
      return 3;
    }
    if (path.indexOf("/unit2/") !== -1) {
      return 2;
    }
    if (path.indexOf("/unit1/") !== -1) {
      return 1;
    }
    return 0;
  }

  function buildMapLink() {
    var active = isMapPage();
    return (
      '<li class="athalta-sidebar-map">' +
      '<a class="athalta-sidebar-map-link' +
      (active ? " is-active" : "") +
      '" href="' +
      fromRoot("navigation/navigation.html") +
      '"' +
      (active ? ' aria-current="page"' : "") +
      ">" +
      "מפת הדרך שלך" +
      "</a>" +
      "</li>"
    );
  }

  function isUnitCompleted(unitId) {
    if (window.athaltaProgress && window.athaltaProgress.isUnitCompleted) {
      return window.athaltaProgress.isUnitCompleted(unitId);
    }
    try {
      return localStorage.getItem(STORAGE_PREFIX + unitId) === "completed";
    } catch (error) {
      return false;
    }
  }

  function completedCount() {
    var count = 0;
    var i;
    for (i = 1; i <= UNIT_COUNT; i += 1) {
      if (isUnitCompleted(i)) {
        count += 1;
      }
    }
    return count;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function countLabel(unit) {
    return unit.pages.length + " מקטעים";
  }

  function buildPages(unit) {
    return unit.pages
      .map(function (page, index) {
        var active = isActiveHref(page.href);
        return (
          '<li class="athalta-sidebar-page">' +
          '<a class="athalta-sidebar-link' +
          (active ? " is-active" : "") +
          '" href="' +
          escapeHtml(fromRoot(page.href)) +
          '"' +
          (active ? ' aria-current="page"' : "") +
          ">" +
          '<span class="athalta-sidebar-page-index">' +
          (index + 1) +
          ".</span>" +
          "<span>" +
          escapeHtml(page.label) +
          "</span>" +
          "</a>" +
          "</li>"
        );
      })
      .join("");
  }

  function buildUnit(unit, openId) {
    var open = unit.id === openId;
    var panelId = "sidebar-unit-panel-" + unit.id;
    return (
      '<li class="athalta-sidebar-unit' +
      (open ? " is-open" : "") +
      '" data-unit-id="' +
      unit.id +
      '">' +
      '<button class="athalta-sidebar-unit-toggle" type="button" aria-expanded="' +
      (open ? "true" : "false") +
      '" aria-controls="' +
      panelId +
      '">' +
      '<span class="athalta-sidebar-unit-copy">' +
      '<span class="athalta-sidebar-unit-title-row">' +
      '<span class="athalta-sidebar-unit-title">' +
      escapeHtml(unit.title) +
      "</span>" +
      ICONS.check +
      "</span>" +
      '<span class="athalta-sidebar-unit-meta">' +
      ICONS.book +
      "<span>" +
      escapeHtml(countLabel(unit)) +
      "</span>" +
      "</span>" +
      "</span>" +
      ICONS.chevron +
      "</button>" +
      '<div class="athalta-sidebar-panel" id="' +
      panelId +
      '">' +
      '<div class="athalta-sidebar-panel-inner">' +
      '<ol class="athalta-sidebar-pages">' +
      buildPages(unit) +
      "</ol>" +
      "</div>" +
      "</div>" +
      "</li>"
    );
  }

  function buildSegments() {
    var html = "";
    var i;
    for (i = 0; i < UNIT_COUNT; i += 1) {
      html +=
        '<span class="athalta-sidebar-segment" data-segment="' +
        (i + 1) +
        '"></span>';
    }
    return html;
  }

  function buildMarkup() {
    var openId = findActiveUnitId();
    return (
      '<button class="athalta-sidebar-open" type="button" aria-expanded="false" aria-controls="athalta-sidebar" id="athalta-sidebar-open" aria-label="פתיחת ניווט בין יחידות הסביבה">' +
      ICONS.menu +
      "</button>" +
      '<nav class="athalta-sidebar" id="athalta-sidebar" aria-label="ניווט בין יחידות הסביבה">' +
      '<div class="athalta-sidebar-header">' +
      '<h2 class="athalta-sidebar-title">ניווט בין יחידות הסביבה</h2>' +
      '<button class="athalta-sidebar-close" type="button" aria-label="סגירת התפריט">' +
      ICONS.menu +
      "</button>" +
      "</div>" +
      '<div class="athalta-sidebar-progress">' +
      '<div class="athalta-sidebar-progress-meta">' +
      '<span id="sidebar-progress-text" class="athalta-sidebar-progress-text">0/7 יחידות הושלמו</span>' +
      ICONS.calendar +
      "</div>" +
      '<div class="athalta-sidebar-segments" aria-hidden="true">' +
      buildSegments() +
      "</div>" +
      "</div>" +
      '<div class="athalta-sidebar-scroll">' +
      '<ul class="athalta-sidebar-list">' +
      buildMapLink() +
      UNITS.map(function (unit) {
        return buildUnit(unit, openId);
      }).join("") +
      "</ul>" +
      "</div>" +
      "</nav>"
    );
  }

  function ensureHost() {
    var host = document.getElementById("athalta-sidebar-root");
    if (!host) {
      host = document.createElement("div");
      host.id = "athalta-sidebar-root";
      host.className = "athalta-sidebar-root";
      document.body.appendChild(host);
    } else {
      host.classList.add("athalta-sidebar-root");
    }
    if (!host.hasAttribute("data-ready")) {
      host.innerHTML = buildMarkup();
      host.setAttribute("data-ready", "true");
    }
    return host;
  }

  function setOpen(open) {
    var root = document.getElementById("athalta-sidebar-root");
    var panel = document.getElementById("athalta-sidebar");
    var btn = document.getElementById("athalta-sidebar-open");
    var closeBtn = document.querySelector(".athalta-sidebar-close");
    if (!panel || !btn) {
      return;
    }
    if (root) {
      root.classList.toggle("is-open", open);
    }
    panel.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      lastFocus = document.activeElement;
      if (closeBtn) {
        closeBtn.focus();
      }
    } else if (lastFocus && document.contains(lastFocus)) {
      lastFocus.focus();
    }
  }

  function toggleUnit(unitEl) {
    var list = unitEl.parentElement;
    var open = !unitEl.classList.contains("is-open");
    if (!list) {
      return;
    }
    Array.prototype.forEach.call(list.children, function (item) {
      var toggle = item.querySelector(".athalta-sidebar-unit-toggle");
      var isThis = item === unitEl && open;
      item.classList.toggle("is-open", isThis);
      if (toggle) {
        toggle.setAttribute("aria-expanded", isThis ? "true" : "false");
      }
    });
  }

  function updateSidebarProgress() {
    var total = UNIT_COUNT;
    var done = completedCount();
    var text = document.getElementById("sidebar-progress-text");
    var segments = document.querySelectorAll(".athalta-sidebar-segment");
    var units = document.querySelectorAll(".athalta-sidebar-unit[data-unit-id]");

    if (text) {
      text.textContent = done + "/" + total + " יחידות הושלמו";
    }

    Array.prototype.forEach.call(segments, function (segment, index) {
      segment.classList.toggle("is-filled", index < done);
    });

    Array.prototype.forEach.call(units, function (unitEl) {
      var id = Number(unitEl.getAttribute("data-unit-id"));
      var unitData = UNITS.filter(function (unit) {
        return unit.id === id;
      })[0];
      var check = unitEl.querySelector(".athalta-sidebar-check");
      var complete = unitData
        ? isUnitCompleted(unitData.progressId)
        : isUnitCompleted(id);
      if (check) {
        check.hidden = !complete;
      }
    });
  }

  function bindEvents() {
    var openBtn = document.getElementById("athalta-sidebar-open");
    var closeBtn = document.querySelector(".athalta-sidebar-close");

    if (openBtn) {
      openBtn.addEventListener("click", function () {
        setOpen(true);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });
    }

    document.addEventListener("click", function (event) {
      var toggle = event.target.closest(".athalta-sidebar-unit-toggle");
      if (!toggle) {
        return;
      }
      var unitEl = toggle.closest(".athalta-sidebar-unit");
      if (unitEl) {
        toggleUnit(unitEl);
      }
    });

    document.addEventListener("keydown", function (event) {
      var panel = document.getElementById("athalta-sidebar");
      if (event.key === "Escape" && panel && panel.classList.contains("is-open")) {
        setOpen(false);
      }
    });
  }

  function init() {
    var host = document.getElementById("athalta-sidebar-root");
    if (host && host.getAttribute("data-ready") === "true") {
      updateSidebarProgress();
      return;
    }
    ensureHost();
    bindEvents();
    updateSidebarProgress();
  }

  window.updateSidebarProgress = updateSidebarProgress;
  window.athaltaSidebar = {
    updateSidebarProgress: updateSidebarProgress,
    open: function () {
      setOpen(true);
    },
    close: function () {
      setOpen(false);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
