/**
 * Unit 1 — Page 6: מטרת חממות וסדנאות התוכנית.
 * Marks the goals page as viewed. Reveals foundation cards on scroll.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(1, "goals");
}

(function initFoundationReveal() {
  var section = document.querySelector(".ag-foundations");
  if (!section) {
    return;
  }

  var reveal = function () {
    section.classList.add("is-revealed");
  };

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    reveal();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
  );

  observer.observe(section);
})();
