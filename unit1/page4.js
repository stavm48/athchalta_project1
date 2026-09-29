/**
 * Unit 1 — Page 4: אתגרי כניסה לתפקיד חינוך הכיתה.
 * Carousel slides, indicators, keyboard, and swipe. No Moodle title hacks.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(1, "u1_p4");
}

(function () {
  "use strict";

  var root = document.getElementById("athalta-challenges-v4");
  if (!root) {
    return;
  }

  var slides = Array.prototype.slice.call(root.querySelectorAll(".ac4-slide"));
  var indicators = Array.prototype.slice.call(
    root.querySelectorAll(".ac4-indicator")
  );
  var prevButton = root.querySelector(".ac4-arrow-prev");
  var nextButton = root.querySelector(".ac4-arrow-next");
  var viewport = root.querySelector(".ac4-viewport");
  var liveRegion = root.querySelector("#ac4-live-region");
  var currentIndex = 0;
  var touchStartX = null;
  var slideNames = [
    "חוסר בהיכרות עם רכיבי התפקיד",
    "פיתוח זהות מקצועית",
    "מתחים רגשיים",
    "חוסר בהיכרות עם המערכת הבית ספרית",
  ];

  function announce(index) {
    if (!liveRegion) {
      return;
    }

    liveRegion.textContent =
      "אתגר " + (index + 1) + " מתוך " + slides.length + ": " + slideNames[index];
  }

  function updateArrows() {
    var first = currentIndex === 0;
    var last = currentIndex === slides.length - 1;

    prevButton.classList.toggle("is-hidden", first);
    prevButton.setAttribute("aria-hidden", first ? "true" : "false");
    prevButton.tabIndex = first ? -1 : 0;

    nextButton.classList.toggle("is-hidden", last);
    nextButton.setAttribute("aria-hidden", last ? "true" : "false");
    nextButton.tabIndex = last ? -1 : 0;
  }

  function showSlide(index, shouldAnnounce) {
    if (index < 0 || index >= slides.length) {
      return;
    }

    currentIndex = index;

    slides.forEach(function (slide, i) {
      var active = i === currentIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");

      if (active) {
        slide.removeAttribute("hidden");
      } else {
        slide.setAttribute("hidden", "hidden");
      }
    });

    indicators.forEach(function (indicator, i) {
      var active = i === currentIndex;
      indicator.classList.toggle("is-active", active);

      if (active) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    updateArrows();

    if (shouldAnnounce !== false) {
      announce(currentIndex);
    }
  }

  prevButton.addEventListener("click", function () {
    showSlide(currentIndex - 1, true);
  });

  nextButton.addEventListener("click", function () {
    showSlide(currentIndex + 1, true);
  });

  indicators.forEach(function (indicator) {
    indicator.addEventListener("click", function () {
      var target = parseInt(indicator.getAttribute("data-go-to"), 10);
      showSlide(target, true);
    });
  });

  root.addEventListener("keydown", function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.key === "ArrowLeft" && currentIndex < slides.length - 1) {
      event.preventDefault();
      showSlide(currentIndex + 1, true);
    }

    if (event.key === "ArrowRight" && currentIndex > 0) {
      event.preventDefault();
      showSlide(currentIndex - 1, true);
    }
  });

  viewport.addEventListener(
    "touchstart",
    function (event) {
      if (!event.changedTouches || !event.changedTouches.length) {
        return;
      }
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchend",
    function (event) {
      if (
        touchStartX === null ||
        !event.changedTouches ||
        !event.changedTouches.length
      ) {
        return;
      }

      var distance = event.changedTouches[0].clientX - touchStartX;

      if (Math.abs(distance) > 45) {
        if (distance < 0 && currentIndex < slides.length - 1) {
          showSlide(currentIndex + 1, true);
        } else if (distance > 0 && currentIndex > 0) {
          showSlide(currentIndex - 1, true);
        }
      }

      touchStartX = null;
    },
    { passive: true }
  );

  showSlide(0, false);
})();
