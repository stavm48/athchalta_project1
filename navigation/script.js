/**
 * Athalta onboarding — navigation hub progress tracking.
 *
 * Progress is tracked silently using vanilla localStorage only
 * (no backend, no accounts — matches the project's static-site rules).
 *
 * Storage shape:
 *   athalta_unit_<unitId>         -> "completed" | (unset)
 *   athalta_unit_<unitId>_pages   -> JSON array of viewed pageIds
 */

(function () {
  "use strict";

  var STORAGE_PREFIX = "athalta_unit_";

  /**
   * Mark a single page within a unit as viewed.
   *
   * Call this from inside each unit's own pages (unit1/index.html,
   * unit1/page2.html, etc.) on load — no "Finish Unit" button required.
   *
   * Usage:
   *   markPageAsViewed("1", "index");
   *
   * Optionally pass the full list of required page ids for the unit as a
   * third argument; the unit is only flagged "completed" once every
   * required page has been viewed. If omitted, the unit is marked
   * completed as soon as any page in it has been viewed.
   *
   * @param {string|number} unitId
   * @param {string} pageId
   * @param {string[]} [requiredPageIds]
   */
  function markPageAsViewed(unitId, pageId, requiredPageIds) {
    if (!unitId || !pageId) {
      return;
    }

    var pagesKey = STORAGE_PREFIX + unitId + "_pages";
    var viewedPages = readJson(pagesKey, []);

    if (viewedPages.indexOf(pageId) === -1) {
      viewedPages.push(pageId);
      localStorage.setItem(pagesKey, JSON.stringify(viewedPages));
    }

    var isUnitComplete =
      !requiredPageIds ||
      requiredPageIds.every(function (id) {
        return viewedPages.indexOf(id) !== -1;
      });

    if (isUnitComplete) {
      localStorage.setItem(STORAGE_PREFIX + unitId, "completed");
    }
  }

  /**
   * @param {string|number} unitId
   * @returns {boolean}
   */
  function isUnitCompleted(unitId) {
    return localStorage.getItem(STORAGE_PREFIX + unitId) === "completed";
  }

  /**
   * Reads every .ata-unit-card on the navigation hub and toggles its
   * status badge text + pastel "completed" class based on localStorage.
   */
  function refreshUnitBadges() {
    var cards = document.querySelectorAll(".ata-unit-card[data-unit-id]");

    cards.forEach(function (card) {
      var unitId = card.getAttribute("data-unit-id");
      var badge = card.querySelector("[data-status-badge]");

      if (!badge) {
        return;
      }

      var completed = isUnitCompleted(unitId);

      badge.textContent = completed ? "בוצעה" : "טרם בוצעה";
      badge.classList.toggle("is-completed", completed);
      badge.classList.toggle("is-pending", !completed);
    });
  }

  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  document.addEventListener("DOMContentLoaded", refreshUnitBadges);

  // Expose a small public API so unit pages (loaded separately) can call
  // markPageAsViewed without duplicating this file's internals.
  window.athaltaProgress = {
    markPageAsViewed: markPageAsViewed,
    isUnitCompleted: isUnitCompleted,
    refreshUnitBadges: refreshUnitBadges,
  };
})();
