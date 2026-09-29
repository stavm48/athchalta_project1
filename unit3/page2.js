/**
 * Unit 3 — Page 2: הקמת סדנאות אתחלתא.
 * Records this page as viewed and drives the workshop notes accordion.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(3, "u3_p2");
}

(function initWorkshopsAccordion() {
  var root = document.getElementById("athalta-workshops-accordion");
  if (!root) {
    return;
  }

  var items = Array.prototype.slice.call(
    root.querySelectorAll(".aw-accordion-item")
  );

  function setOpen(item, shouldOpen) {
    var button = item.querySelector(".aw-accordion-button");
    var panel = item.querySelector(".aw-accordion-panel");
    if (!button || !panel) {
      return;
    }

    item.classList.toggle("is-open", shouldOpen);
    button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    panel.hidden = !shouldOpen;
  }

  items.forEach(function (item) {
    var button = item.querySelector(".aw-accordion-button");
    if (!button) {
      return;
    }

    setOpen(item, false);

    button.addEventListener("click", function () {
      var isOpen = button.getAttribute("aria-expanded") === "true";

      items.forEach(function (otherItem) {
        setOpen(otherItem, false);
      });

      if (!isOpen) {
        setOpen(item, true);
      }
    });
  });
})();
