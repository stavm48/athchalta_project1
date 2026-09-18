/**
 * Unit 6 — Page 3: דיווח תקציב שנתי.
 * Marks this page (and Unit 6) viewed, and toggles timeline stations.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(6, "report");
  window.athaltaProgress.markUnitAsCompleted(6);
}

(function initAthaltaBudgetReport() {
  var root = document.getElementById("athalta-budget-report");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var status = root.querySelector("#u6r-status");
  var stations = Array.prototype.slice.call(
    root.querySelectorAll(".u6r-station")
  );
  var triggerButtons = Array.prototype.slice.call(
    root.querySelectorAll(".u6r-trigger")
  );

  function stationLabel(trigger) {
    return trigger.textContent.replace(/\s+/g, " ").trim();
  }

  function updateTopOpenState() {
    var hasOpenTop = stations.some(function (station) {
      var detail;

      if (!station.classList.contains("u6r-top")) {
        return false;
      }

      detail = station.querySelector(".u6r-detail");
      return detail && !detail.hidden;
    });

    root.classList.toggle("u6r-has-top-open", hasOpenTop);
  }

  function openStation(station) {
    var trigger = station.querySelector(".u6r-trigger");
    var detail = station.querySelector(".u6r-detail");

    if (!trigger || !detail) {
      return;
    }

    trigger.hidden = true;
    detail.hidden = false;
    station.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    updateTopOpenState();

    window.setTimeout(function () {
      var closeButton = detail.querySelector("[data-u6r-close]");

      if (closeButton) {
        closeButton.focus();
      } else {
        detail.focus();
      }
    }, 0);

    if (status) {
      status.textContent = "נפתח מידע עבור " + stationLabel(trigger) + ".";
    }
  }

  function closeStation(station, returnFocus) {
    var trigger = station.querySelector(".u6r-trigger");
    var detail = station.querySelector(".u6r-detail");

    if (!trigger || !detail) {
      return;
    }

    detail.hidden = true;
    trigger.hidden = false;
    station.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    updateTopOpenState();

    if (status) {
      status.textContent =
        "המידע עבור " + stationLabel(trigger) + " נסגר.";
    }

    if (returnFocus) {
      window.setTimeout(function () {
        trigger.focus();
      }, 0);
    }
  }

  triggerButtons.forEach(function (trigger, index) {
    trigger.addEventListener("click", function () {
      var station = trigger.closest(".u6r-station");
      openStation(station);
    });

    trigger.addEventListener("keydown", function (event) {
      var nextIndex;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nextIndex = index + 1;

        if (nextIndex >= triggerButtons.length) {
          nextIndex = 0;
        }

        triggerButtons[nextIndex].focus();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextIndex = index - 1;

        if (nextIndex < 0) {
          nextIndex = triggerButtons.length - 1;
        }

        triggerButtons[nextIndex].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        triggerButtons[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        triggerButtons[triggerButtons.length - 1].focus();
      }
    });
  });

  stations.forEach(function (station) {
    var detail = station.querySelector(".u6r-detail");

    if (!detail) {
      return;
    }

    var closeButton = station.querySelector("[data-u6r-close]");

    if (closeButton) {
      closeButton.addEventListener("click", function (event) {
        event.preventDefault();
        closeStation(station, true);
      });
    }

    detail.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeStation(station, true);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    stations.forEach(function (station) {
      var detail = station.querySelector(".u6r-detail");

      if (detail && !detail.hidden) {
        closeStation(station, true);
      }
    });
  });

  updateTopOpenState();
})();
