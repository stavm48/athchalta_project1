/**
 * Unit 3 — Page 1: הקמת חממות אתחלתא.
 * Marks Unit 2 complete, records this page as viewed, and drives
 * the seven-step greenhouse roadmap with localStorage visit marks.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markUnitAsCompleted(2);
  window.athaltaProgress.markPageAsViewed(3, "greenhouse-roadmap");
}

(function initGreenhouseRoadmap() {
  var root = document.getElementById("athalta-greenhouse-roadmap");
  if (!root) {
    return;
  }

  var STORAGE_KEY = "athalta-unit3-greenhouse-visited-v2";
  var VALID_STEPS = ["1", "2", "3", "4", "5", "6", "7"];
  var steps = Array.prototype.slice.call(root.querySelectorAll(".agr-step"));
  var modals = Array.prototype.slice.call(
    document.querySelectorAll("[id^='agr-modal-']")
  );
  var visited = loadVisited();
  var activeStep = null;
  var lastFocused = null;
  var ignoreStepClick = false;

  function loadVisited() {
    var map = {};

    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) {
        return map;
      }

      saved.forEach(function (step) {
        var value = String(step);
        if (VALID_STEPS.indexOf(value) !== -1) {
          map[value] = true;
        }
      });
    } catch (error) {
      return map;
    }

    return map;
  }

  function saveVisited() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.keys(visited)));
    } catch (error) {
      /* Ignore quota / private-mode failures. */
    }
  }

  function render() {
    steps.forEach(function (link) {
      var step = String(link.getAttribute("data-step"));
      var check = link.querySelector("[data-agr-check]");
      var isActive = activeStep === step;
      var isVisited = !!visited[step];

      link.classList.toggle("is-active", isActive);

      if (check) {
        check.hidden = !(isVisited && !isActive);
      }
    });
  }

  function openModal(step) {
    var modal = document.getElementById("agr-modal-" + step);
    if (!modal) {
      return;
    }

    lastFocused = document.activeElement;
    activeStep = step;
    visited[step] = true;
    saveVisited();
    render();

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("agr-modal-open");

    var dialog = modal.querySelector(".agr-modal-dialog");
    var closeButton = modal.querySelector(".agr-modal-close");
    if (window.athaltaA11y) {
      window.athaltaA11y.focusFirst(dialog, closeButton);
    } else if (closeButton) {
      closeButton.focus();
    }
  }

  function closeModals() {
    ignoreStepClick = true;
    modals.forEach(function (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("agr-modal-open");
    activeStep = null;
    render();

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }

    window.setTimeout(function () {
      ignoreStepClick = false;
    }, 250);
  }

  steps.forEach(function (link) {
    link.addEventListener("click", function () {
      if (ignoreStepClick) {
        return;
      }

      var step = String(link.getAttribute("data-step"));
      if (VALID_STEPS.indexOf(step) === -1) {
        return;
      }
      openModal(step);
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest("[data-agr-close]")) {
      closeModals();
    }
  });

  document.addEventListener("keydown", function (event) {
    var openModal = modals.filter(function (modal) {
      return !modal.hidden;
    })[0];
    if (!openModal) {
      return;
    }
    if (event.key === "Escape") {
      closeModals();
      return;
    }
    if (event.key === "Tab" && window.athaltaA11y) {
      window.athaltaA11y.trap(
        openModal.querySelector(".agr-modal-dialog") || openModal,
        event
      );
    }
  });

  render();
})();
