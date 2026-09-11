/**
 * Unit 1 — Page 2: Partners map.
 * Overview ↔ detail cards. No Moodle title hacks.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(1, "partners");
}

(function () {
  "use strict";

  var overview = document.getElementById("athalta-overview");
  var intro = document.querySelector(".athalta-partners-intro");
  var detail = document.getElementById("athalta-detail");
  var closeButton = document.querySelector(".athalta-close-card");
  var overviewButtons = document.querySelectorAll(".athalta-main-partner");
  var miniButtons = document.querySelectorAll(".athalta-mini-button");
  var cards = document.querySelectorAll(".athalta-partner-card");
  var lastPartner = null;

  function openPartner(partnerName, trigger) {
    if (!overview || !detail) {
      return;
    }

    lastPartner = partnerName;

    overview.hidden = true;
    if (intro) {
      intro.hidden = true;
    }
    detail.hidden = false;

    cards.forEach(function (card) {
      var active = card.getAttribute("data-card") === partnerName;
      card.hidden = !active;
      if (active) {
        card.focus();
      }
    });

    miniButtons.forEach(function (button) {
      var active = button.getAttribute("data-partner") === partnerName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (trigger && trigger.classList.contains("athalta-main-partner")) {
      lastPartner = partnerName;
    }
  }

  function closePartner() {
    if (!overview || !detail) {
      return;
    }

    detail.hidden = true;
    overview.hidden = false;
    if (intro) {
      intro.hidden = false;
    }

    if (lastPartner) {
      var previousButton = document.querySelector(
        '.athalta-main-partner[data-partner="' + lastPartner + '"]'
      );
      if (previousButton) {
        previousButton.focus();
      }
    }
  }

  overviewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openPartner(button.getAttribute("data-partner"), button);
    });
  });

  miniButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openPartner(button.getAttribute("data-partner"), button);
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closePartner);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && detail && !detail.hidden) {
      closePartner();
    }
  });
})();
