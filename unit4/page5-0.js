/**
 * Unit 4 — Page 5.0: תכנים מוצעים — ביטוי עצמי ושייכות.
 * Marks this contents page as viewed and drives the idea carousel.
 */

if (window.athaltaProgress) {
  if (document.querySelector(".as-video-card")) {
    window.athaltaProgress.markPageAsViewed(4, "u4_p5_0");
  }
  if (document.querySelector(".u4c-carousel")) {
    window.athaltaProgress.markPageAsViewed(4, "u4_p5_01");
  }
}

(function initAthaltaUnit4BelongingContents() {
  var root = document.getElementById("athalta-unit4-contents-belonging");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var carousel = root.querySelector(".u4c-carousel");
  var slides = Array.prototype.slice.call(root.querySelectorAll(".u4c-slide"));
  var dots = Array.prototype.slice.call(root.querySelectorAll(".u4c-dot"));
  var previousButton = root.querySelector(".u4c-prev");
  var nextButton = root.querySelector(".u4c-next");
  var status = root.querySelector("#u4c-carousel-status");
  var currentSlide = 0;

  function getSlideTitle(index) {
    var title = slides[index]
      ? slides[index].querySelector(".u4c-card-title")
      : null;

    return title ? title.textContent.replace(/\s+/g, " ").trim() : "";
  }

  function showSlide(index, moveFocus) {
    if (index < 0 || index >= slides.length) {
      return;
    }

    currentSlide = index;

    slides.forEach(function (slide, slideIndex) {
      var active = slideIndex === currentSlide;

      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });

    dots.forEach(function (dot, dotIndex) {
      var active = dotIndex === currentSlide;

      dot.classList.toggle("is-active", active);

      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (previousButton) {
      previousButton.hidden = currentSlide === 0;
    }

    if (nextButton) {
      nextButton.hidden = currentSlide === slides.length - 1;
    }

    if (status) {
      status.textContent =
        "כרטיס " +
        (currentSlide + 1) +
        " מתוך " +
        slides.length +
        ": " +
        getSlideTitle(currentSlide);
    }

    if (moveFocus) {
      var title = slides[currentSlide].querySelector(".u4c-card-title");

      if (title) {
        title.focus();
      }
    }
  }

  if (previousButton) {
    previousButton.addEventListener("click", function () {
      showSlide(currentSlide - 1, true);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showSlide(currentSlide + 1, true);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var requestedSlide = parseInt(dot.getAttribute("data-u4c-dot"), 10);

      showSlide(requestedSlide, true);
    });
  });

  if (carousel) {
    carousel.addEventListener("keydown", function (event) {
      var nextIndex = null;

      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        nextIndex = Math.min(currentSlide + 1, slides.length - 1);
      } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        nextIndex = Math.max(currentSlide - 1, 0);
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = slides.length - 1;
      }

      if (nextIndex === null || nextIndex === currentSlide) {
        return;
      }

      event.preventDefault();
      showSlide(nextIndex, true);
    });
  }

  if (slides.length) {
    showSlide(0, false);
  }
})();
