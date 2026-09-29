/**
 * Unit 1 — Page 2: Partners map.
 * Overview ↔ detail cards. No Moodle title hacks.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(1, "u1_p2");
}

(function () {
  "use strict";

  var network = document.querySelector(".athalta-network");
  var detail = document.getElementById("athalta-detail");
  var closeButton = document.querySelector(".athalta-close-card");
  var overviewButtons = document.querySelectorAll(".athalta-main-partner");
  var miniButtons = document.querySelectorAll(".athalta-mini-button");
  var cards = document.querySelectorAll(".athalta-partner-card");
  var lastPartner = null;

  function scrollToCard(card) {
    window.requestAnimationFrame(function () {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function fitContributionFrames(card) {
    if (!card) {
      return;
    }

    var list = card.querySelector(".athalta-contributions");
    if (!list) {
      return;
    }

    var items = list.querySelectorAll(".athalta-contribution");
    if (!items.length) {
      return;
    }

    var mobile = window.matchMedia("(max-width: 47.9375rem)").matches;

    items.forEach(function (item) {
      item.style.width = "max-content";
      item.style.whiteSpace = "nowrap";
    });

    var max = 0;
    items.forEach(function (item) {
      max = Math.max(max, item.getBoundingClientRect().width);
    });

    var gap = parseFloat(window.getComputedStyle(list).columnGap) || 0;
    var available = card.clientWidth;
    var columns = mobile ? 1 : 2;
    var limit = columns === 1 ? available : (available - gap) / 2;
    var wraps = max > limit;
    if (wraps) {
      max = limit;
    }

    var width = Math.ceil(max) + "px";
    items.forEach(function (item) {
      item.style.width = width;
      item.style.whiteSpace = wraps ? "normal" : "nowrap";
    });
  }

  function openPartner(partnerName, trigger) {
    if (!network || !detail) {
      return;
    }

    lastPartner = partnerName;

    network.hidden = true;
    detail.hidden = false;

    var openedCard = null;
    cards.forEach(function (card) {
      var active = card.getAttribute("data-card") === partnerName;
      card.hidden = !active;
      if (active) {
        openedCard = card;
        card.focus({ preventScroll: true });
      }
    });

    if (openedCard) {
      fitContributionFrames(openedCard);
      scrollToCard(openedCard);
    }

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
    if (!network || !detail) {
      return;
    }

    detail.hidden = true;
    network.hidden = false;

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

  window.addEventListener("resize", function () {
    cards.forEach(function (card) {
      if (!card.hidden) {
        fitContributionFrames(card);
      }
    });
  });
})();
