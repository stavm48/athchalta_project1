/**
 * Athalta — shared accessibility helpers (focus trap / first focus).
 * Loaded before page scripts. Relative path from each HTML file.
 */
(function (window, document) {
  "use strict";

  var SELECTOR =
    'a[href]:not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),iframe,video[controls],audio[controls],[tabindex]:not([tabindex="-1"])';

  function isVisible(el) {
    if (!el || el.hidden) {
      return false;
    }
    if (el.getAttribute("aria-hidden") === "true") {
      return false;
    }
    var style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }
    return el.getClientRects().length > 0;
  }

  function getFocusable(container) {
    if (!container) {
      return [];
    }
    return Array.prototype.filter.call(
      container.querySelectorAll(SELECTOR),
      isVisible
    );
  }

  function focusFirst(container, fallback) {
    var list = getFocusable(container);
    var target = list[0] || fallback || container;
    if (target === container && container.getAttribute("tabindex") === null) {
      container.setAttribute("tabindex", "-1");
    }
    if (target && typeof target.focus === "function") {
      target.focus();
    }
  }

  function trap(container, event) {
    if (!container || !event || event.key !== "Tab") {
      return;
    }
    var list = getFocusable(container);
    if (!list.length) {
      event.preventDefault();
      if (container.getAttribute("tabindex") === null) {
        container.setAttribute("tabindex", "-1");
      }
      container.focus();
      return;
    }
    var first = list[0];
    var last = list[list.length - 1];
    var active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || !container.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || !container.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  }

  window.athaltaA11y = {
    getFocusable: getFocusable,
    focusFirst: focusFirst,
    trap: trap
  };
})(window, document);
