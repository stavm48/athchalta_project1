/**
 * Athalta — shared accessibility helpers (focus trap / first focus).
 * Loaded before page scripts. Relative path from each HTML file.
 */
(function (window, document) {
  "use strict";

  try {
    if (window.localStorage.getItem("athalta_fresh_start") !== "1") {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.localStorage.setItem("athalta_fresh_start", "1");
    }
  } catch (error) {}

  var SELECTOR =
    'a[href]:not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),iframe,video[controls],audio[controls],[tabindex]:not([tabindex="-1"])';

  function isVisible(el) {
    if (!el || el.hidden) {
      return false;
    }
    if (el.getAttribute("aria-hidden") === "true") {
      return false;
    }
    var style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }
    return el.getClientRects().length > 0;
  }

  function getFocusable(container) {
    if (!container) {
      return [];
    }
    return Array.prototype.filter.call(
      container.querySelectorAll(SELECTOR),
      isVisible
    );
  }

  function focusFirst(container, fallback) {
    var list = getFocusable(container);
    var target = list[0] || fallback || container;
    if (target === container && container.getAttribute("tabindex") === null) {
      container.setAttribute("tabindex", "-1");
    }
    if (target && typeof target.focus === "function") {
      target.focus();
    }
  }

  function trap(container, event) {
    if (!container || !event || event.key !== "Tab") {
      return;
    }
    var list = getFocusable(container);
    if (!list.length) {
      event.preventDefault();
      if (container.getAttribute("tabindex") === null) {
        container.setAttribute("tabindex", "-1");
      }
      container.focus();
      return;
    }
    var first = list[0];
    var last = list[list.length - 1];
    var active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || !container.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || !container.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  }

  window.athaltaA11y = {
    getFocusable: getFocusable,
    focusFirst: focusFirst,
    trap: trap
  };
})(window, document);

(function () {
  var script = document.currentScript;
  var src = ((script && script.getAttribute("src")) || "").split("?")[0].replace(/\\/g, "/");
  var root = "./";
  if (src && src.charAt(0) !== "/" && !/^https?:\/\//i.test(src)) {
    root = src.replace(/[^/]*$/, "") || "./";
  }

  function mountScrollTop() {
    if (document.querySelector(".scroll-to-top")) {
      return;
    }

    if (!document.getElementById("athalta-scroll-top-css")) {
      var style = document.createElement("style");
      style.id = "athalta-scroll-top-css";
      style.textContent =
        ".scroll-to-top{position:fixed;bottom:30px;left:30px;z-index:999;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:2px;border:0;border-radius:0.45rem;background:transparent;box-shadow:0 2px 5px rgba(0,0,0,0.05);cursor:pointer;opacity:0;pointer-events:none;transition:opacity 0.3s ease,transform 0.3s ease;}" +
        ".scroll-to-top img{width:100%;height:100%;object-fit:contain;flex-shrink:0;background:transparent;}" +
        ".scroll-to-top.is-visible{opacity:1;pointer-events:auto;}" +
        ".scroll-to-top:hover{transform:translateY(-4px);}" +
        ".scroll-to-top:focus-visible{outline:2px solid #49BBBD;outline-offset:3px;}" +
        "@media (max-width:768px){.scroll-to-top{display:none;}}" +
        "@media (prefers-reduced-motion:reduce){.scroll-to-top{transition:none;}}";
      document.head.appendChild(style);
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "scroll-to-top";
    button.setAttribute("aria-label", "חזרה לראש העמוד");
    button.innerHTML =
      '<img src="' +
      root +
      'assets/general/upArrow.png" alt="" aria-hidden="true">';
    document.body.appendChild(button);

    var base = 30;
    var gap = 12;
    var frame = 0;

    function update() {
      button.classList.toggle("is-visible", window.scrollY > 300);

      var footer = document.querySelector(".site-footer");
      var next = base;
      if (footer) {
        var lift = window.innerHeight - footer.getBoundingClientRect().top + gap;
        if (lift > base) {
          next = lift;
        }
      }
      button.style.bottom = next + "px";
    }

    function requestUpdate() {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(function () {
        frame = 0;
        update();
      });
    }

    button.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountScrollTop);
  } else {
    mountScrollTop();
  }
})();

/**
 * Reveals .reveal-on-scroll blocks when they enter the viewport.
 * data-reveal-scroll keeps the block hidden until the reader actually scrolls.
 * data-reveal-fallback="3000" stays hidden until that scroll, or until the delay elapses.
 */
(function () {
  "use strict";

  function show(el, observer) {
    if (!el || el.classList.contains("is-visible")) {
      return;
    }
    el.classList.add("is-visible");
    if (observer) {
      observer.unobserve(el);
    }
  }

  function initRevealOnScroll() {
    var nodes = document.querySelectorAll(".reveal-on-scroll");
    if (!nodes.length) {
      return;
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    function holdsForScroll(el) {
      return (
        el.hasAttribute("data-reveal-scroll") ||
        el.hasAttribute("data-reveal-fallback")
      );
    }

    var scrolled = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            el.setAttribute("data-in-view", "true");
          } else {
            el.removeAttribute("data-in-view");
          }
          if (!entry.isIntersecting) {
            return;
          }
          if (holdsForScroll(el) && !scrolled) {
            return;
          }
          show(el, observer);
        });
      },
      { threshold: 0.15 }
    );

    Array.prototype.forEach.call(nodes, function (el) {
      observer.observe(el);
      var wait = Number(el.getAttribute("data-reveal-fallback"));
      if (!wait) {
        return;
      }
      window.setTimeout(function () {
        show(el, observer);
      }, wait);
    });

    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY <= 8) {
          return;
        }
        scrolled = true;
        Array.prototype.forEach.call(nodes, function (el) {
          if (!holdsForScroll(el)) {
            return;
          }
          if (el.getAttribute("data-in-view") === "true") {
            show(el, observer);
          }
        });
      },
      { passive: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRevealOnScroll);
  } else {
    initRevealOnScroll();
  }
})();
