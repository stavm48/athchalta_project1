/**
 * Unit 7 — Page 2: מתווה מפגשים תשפ״ז.
 * Records this page as viewed and filters
 * schedule rows by audience checkboxes.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(7, "u7_p2");
}

(function initAthaltaUnit7Meetings() {
  var root = document.getElementById("athalta-unit7-meetings");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var filters = Array.prototype.slice.call(
    root.querySelectorAll("[data-u7m-filter]")
  );

  function applyFilters() {
    filters.forEach(function (input) {
      var key = input.getAttribute("data-u7m-filter");
      var row = root.querySelector('[data-u7m-row="' + key + '"]');

      if (!row) {
        return;
      }

      row.hidden = !input.checked;
    });
  }

  filters.forEach(function (input) {
    input.addEventListener("change", applyFilters);
  });

  applyFilters();
})();
