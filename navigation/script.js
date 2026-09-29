/**
 * Athalta — strict page-visit progress.
 *
 * Each learning page sets data-page-id on <body> (for example u1_p1).
 * On load that id is stored in localStorage under "visitedPages".
 * A unit is completed only when every id in unitConfig for that unit
 * is present. Reaching the last page, or opening the next unit, does
 * not complete a unit by itself.
 *
 * Storage shape:
 *   visitedPages -> JSON array of page ids, e.g. ["u1_p1","u2_p1"]
 */

(function () {
  "use strict";

  var VISITED_KEY = "visitedPages";

  /**
   * Required pages per unit, in sidebar order.
   * Keys are "unit1" … "unit7". isUnitCompleted also accepts 1 or "1".
   */
  var unitConfig = {
    unit1: ["u1_p1", "u1_p2", "u1_p3", "u1_p4", "u1_p5", "u1_p6", "u1_p7"],
    unit2: ["u2_p1", "u2_p2"],
    unit3: ["u3_p1", "u3_p2"],
    unit4: [
      "u4_p1",
      "u4_p2",
      "u4_p5_0",
      "u4_p5_01",
      "u4_p5_1",
      "u4_p5_3",
      "u4_p5_4",
      "u4_p5_5",
      "u4_p5_6",
      "u4_p6",
      "u4_p7"
    ],
    unit5: ["u5_p1", "u5_p2", "u5_p3"],
    unit6: ["u6_p1", "u6_p2", "u6_p3"],
    unit7: ["u7_p1", "u7_p2"]
  };

  var PAGE_BY_HREF = {
    "unit1/index.html": "u1_p1",
    "unit1/page2.html": "u1_p2",
    "unit1/page3.html": "u1_p3",
    "unit1/page4.html": "u1_p4",
    "unit1/page5.html": "u1_p5",
    "unit1/page6.html": "u1_p6",
    "unit1/page7.html": "u1_p7",
    "unit2/page1.html": "u2_p1",
    "unit2/page2.html": "u2_p2",
    "unit3/page1.html": "u3_p1",
    "unit3/page2.html": "u3_p2",
    "unit4/page1.html": "u4_p1",
    "unit4/page2.html": "u4_p2",
    "unit4/page5-0.html": "u4_p5_0",
    "unit4/page5-01.html": "u4_p5_01",
    "unit4/page5-1.html": "u4_p5_1",
    "unit4/page5-3.html": "u4_p5_3",
    "unit4/page5-4.html": "u4_p5_4",
    "unit4/page5-5.html": "u4_p5_5",
    "unit4/page5-6.html": "u4_p5_6",
    "unit4/page6.html": "u4_p6",
    "unit4/page7.html": "u4_p7",
    "unit5/page1.html": "u5_p1",
    "unit5/page2.html": "u5_p2",
    "unit5/page3.html": "u5_p3",
    "unit6/page1.html": "u6_p1",
    "unit6/page2.html": "u6_p2",
    "unit6/page3.html": "u6_p3",
    "unit7/page1.html": "u7_p1",
    "unit7/page2.html": "u7_p2"
  };

  var knownIds = [];
  Object.keys(unitConfig).forEach(function (unitKey) {
    unitConfig[unitKey].forEach(function (pageId) {
      if (knownIds.indexOf(pageId) === -1) {
        knownIds.push(pageId);
      }
    });
  });

  function readVisited() {
    try {
      var raw = localStorage.getItem(VISITED_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function isKnownPageId(pageId) {
    return !!pageId && knownIds.indexOf(pageId) !== -1;
  }

  function recordPageVisit(pageId) {
    if (!isKnownPageId(pageId)) {
      return false;
    }
    var visited = readVisited();
    if (visited.indexOf(pageId) !== -1) {
      return false;
    }
    visited.push(pageId);
    try {
      localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * Read data-page-id from <body> or <main> only.
   * Sidebar links also carry data-page-id, so a generic query would
   * record the wrong page.
   */
  function currentPageId() {
    var bodyId = document.body && document.body.getAttribute("data-page-id");
    if (bodyId) {
      return bodyId;
    }
    var main = document.querySelector("main[data-page-id]");
    return main ? main.getAttribute("data-page-id") : "";
  }

  function trackCurrentPage() {
    recordPageVisit(currentPageId());
  }

  function requiredPagesFor(unitId) {
    var key = String(unitId || "");
    if (unitConfig[key]) {
      return unitConfig[key];
    }
    if (unitConfig["unit" + key]) {
      return unitConfig["unit" + key];
    }
    return null;
  }

  function isPageVisited(pageId) {
    return readVisited().indexOf(pageId) !== -1;
  }

  function isUnitCompleted(unitId) {
    var required = requiredPagesFor(unitId);
    if (!required || !required.length) {
      return false;
    }
    var visited = readVisited();
    return required.every(function (pageId) {
      return visited.indexOf(pageId) !== -1;
    });
  }

  function pageIdForHref(href) {
    var path = String(href || "").replace(/\\/g, "/").split("?")[0];
    var key;
    for (key in PAGE_BY_HREF) {
      if (Object.prototype.hasOwnProperty.call(PAGE_BY_HREF, key)) {
        if (path === key || path.slice(-key.length) === key) {
          return PAGE_BY_HREF[key];
        }
      }
    }
    return "";
  }

  function refreshUnitBadges() {
    var cards = document.querySelectorAll(".ata-unit-card[data-unit-id]");
    Array.prototype.forEach.call(cards, function (card) {
      var unitId = card.getAttribute("data-unit-id");
      var badge = card.querySelector("[data-status-badge]");
      var completed;
      if (!badge) {
        return;
      }
      completed = isUnitCompleted(unitId);
      badge.textContent = completed ? "בוצעה" : "טרם בוצעה";
      badge.classList.toggle("is-completed", completed);
      badge.classList.toggle("is-pending", !completed);
    });
  }

  function syncProgressUi() {
    refreshUnitBadges();
    if (typeof window.updateSidebarProgress === "function") {
      window.updateSidebarProgress();
    }
  }

  /**
   * Kept so older page scripts do not throw.
   * Only a catalog id (u1_p1 and similar) is recorded.
   * This never marks a unit complete on its own.
   */
  function markPageAsViewed(unitId, pageId) {
    if (recordPageVisit(pageId)) {
      syncProgressUi();
    }
  }

  /**
   * No longer writes a completion flag.
   * Unit status is derived only from visitedPages + unitConfig.
   */
  function markUnitAsCompleted() {}

  trackCurrentPage();

  document.addEventListener("DOMContentLoaded", function () {
    trackCurrentPage();
    syncProgressUi();
  });

  window.athaltaProgress = {
    unitConfig: unitConfig,
    markPageAsViewed: markPageAsViewed,
    markUnitAsCompleted: markUnitAsCompleted,
    isUnitCompleted: isUnitCompleted,
    isPageVisited: isPageVisited,
    getVisitedPages: readVisited,
    pageIdForHref: pageIdForHref,
    refreshUnitBadges: refreshUnitBadges,
    syncProgressUi: syncProgressUi
  };
})();
