/**
 * Unit 1 — Page 6: המצפן שלנו: מטרות התוכנית.
 * Marks the goals page as viewed. Reveals foundation cards on scroll.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(1, "u1_p6");
}

(function initFoundationReveal() {
  var section = document.querySelector(".ag-foundations");
  var workshops = document.querySelector(".ag-workshops");
  if (!section) {
    return;
  }

  var revealed = false;

  function reveal() {
    if (revealed) {
      return;
    }
    revealed = true;
    section.classList.add("is-revealed");
  }

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

  function workshopsReady() {
    return !workshops || workshops.classList.contains("is-visible");
  }

  var inView = false;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        inView = entry.isIntersecting;
        if (!inView || !workshopsReady()) {
          return;
        }
        reveal();
        observer.disconnect();
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(section);

  if (workshops) {
    var watch = new MutationObserver(function () {
      if (!workshopsReady()) {
        return;
      }
      watch.disconnect();
      if (inView) {
        reveal();
        observer.disconnect();
      }
    });
    watch.observe(workshops, { attributes: true, attributeFilter: ["class"] });
  }
})();
