/**
 * Unit 2 — Page 1: בעלות התפקידים בתוכנית.
 * Marks Unit 1 complete, records this page as viewed, and drives
 * the three-role timeline with localStorage progress.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markUnitAsCompleted(1);
  window.athaltaProgress.markPageAsViewed(2, "roles");
}

(function initUnit2Roles() {
  var root = document.getElementById("athalta-unit2-page");
  if (!root) {
    return;
  }

  var STORAGE_KEY = "athalta_unit2_roles_progress";
  var CHECKMARK_SVG =
    '<svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M2 6L6 10L14 2" stroke="#1F3D64" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";
  var ACTIVE_DOT_HTML = '<span class="athalta-inner-dot"></span>';

  var steps = root.querySelectorAll(".athalta-step");
  var contents = root.querySelectorAll(".athalta-content-section");
  var prevButton = root.querySelector("#athalta-role-prev");
  var nextButton = root.querySelector("#athalta-role-next");
  var savedProgress = loadProgress();
  var visitedSteps = savedProgress.visited;
  var activeStep = savedProgress.active;

  function loadProgress() {
    var fallback = { visited: [1], active: 1 };

    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return fallback;
      }

      var parsed = JSON.parse(saved);
      var cleanVisited = [];
      var visited =
        parsed && Array.isArray(parsed.visited) ? parsed.visited : [1];

      visited.forEach(function (item) {
        var value = parseInt(item, 10);
        if (value >= 1 && value <= 3 && cleanVisited.indexOf(value) === -1) {
          cleanVisited.push(value);
        }
      });

      if (cleanVisited.length === 0) {
        cleanVisited = [1];
      }

      var active = parseInt(parsed.active, 10);
      if (active < 1 || active > 3) {
        active = cleanVisited[cleanVisited.length - 1] || 1;
      }

      if (cleanVisited.indexOf(active) === -1) {
        cleanVisited.push(active);
      }

      return { visited: cleanVisited, active: active };
    } catch (error) {
      return fallback;
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          visited: visitedSteps,
          active: activeStep,
        })
      );
    } catch (error) {
      /* Ignore quota / private-mode failures. */
    }
  }

  function renderTimeline(activeIndex) {
    steps.forEach(function (step) {
      var index = parseInt(step.getAttribute("data-step"), 10);
      var circle = step.querySelector(".athalta-circle");

      step.classList.remove("is-active", "is-pending", "is-completed");
      step.removeAttribute("aria-current");
      step.setAttribute("aria-selected", "false");

      if (index === activeIndex) {
        step.classList.add("is-active");
        step.setAttribute("aria-current", "step");
        step.setAttribute("aria-selected", "true");
        circle.innerHTML = ACTIVE_DOT_HTML;
      } else if (visitedSteps.indexOf(index) !== -1) {
        step.classList.add("is-completed");
        circle.innerHTML = CHECKMARK_SVG;
      } else {
        step.classList.add("is-pending");
        circle.textContent = String(index);
      }
    });
  }

  function showContent(stepIndex) {
    contents.forEach(function (section) {
      var isActive = section.id === "content-step-" + stepIndex;
      section.classList.toggle("active-content", isActive);
      if (isActive) {
        section.removeAttribute("hidden");
      } else {
        section.setAttribute("hidden", "");
      }
    });
  }

  function activateStep(stepIndex) {
    if (stepIndex < 1 || stepIndex > 3) {
      return;
    }

    if (visitedSteps.indexOf(stepIndex) === -1) {
      visitedSteps.push(stepIndex);
    }

    activeStep = stepIndex;
    saveProgress();
    renderTimeline(activeStep);
    showContent(activeStep);
    updateRoleNav();
  }

  function updateRoleNav() {
    if (prevButton) {
      prevButton.disabled = activeStep <= 1;
    }
    if (nextButton) {
      nextButton.disabled = activeStep >= 3;
    }
  }

  steps.forEach(function (step) {
    step.addEventListener("click", function () {
      activateStep(parseInt(step.getAttribute("data-step"), 10));
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      activateStep(activeStep - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      activateStep(activeStep + 1);
    });
  }

  renderTimeline(activeStep);
  showContent(activeStep);
  updateRoleNav();
})();
