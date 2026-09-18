/**
 * Unit 5 — Page 3: מפגשים וסדירויות בתוכנית.
 * Records this page as viewed and drives audience tabs plus
 * in-panel meeting accordions, including keyboard navigation.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(5, "meetings");
}

(function initAthaltaMeetings() {
  var root = document.getElementById("athalta-meetings");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var audienceButtons = Array.prototype.slice.call(
    root.querySelectorAll(".u5s-audience-button")
  );
  var panels = Array.prototype.slice.call(root.querySelectorAll(".u5s-panel"));
  var status = root.querySelector("#u5s-status");
  var folder = root.querySelector(".u5s-folder");
  var activeAudience = null;
  var ANIMATION_MS = 450;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function clearExpandTimer(el) {
    if (el._u5sExpandTimer) {
      window.clearTimeout(el._u5sExpandTimer);
      el._u5sExpandTimer = null;
    }
  }

  function expandFromTop(el, onDone) {
    clearExpandTimer(el);
    el.hidden = false;
    el.classList.remove("is-open");
    el.offsetHeight;

    window.requestAnimationFrame(function () {
      el.classList.add("is-open");

      if (typeof onDone === "function") {
        onDone();
      }
    });
  }

  function collapseToTop(el, onDone) {
    clearExpandTimer(el);
    el.hidden = false;
    el.classList.remove("is-open");

    function finish() {
      el._u5sExpandTimer = null;

      if (!el.classList.contains("is-open")) {
        el.hidden = true;
      }

      if (typeof onDone === "function") {
        onDone();
      }
    }

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    el._u5sExpandTimer = window.setTimeout(finish, ANIMATION_MS);
  }

  function setStatus(message) {
    if (status) {
      status.textContent = message;
    }
  }

  function resetAccordions(panel) {
    if (!panel) {
      return;
    }

    Array.prototype.slice
      .call(panel.querySelectorAll(".u5s-accordion-button"))
      .forEach(function (button) {
        button.setAttribute("aria-expanded", "false");
      });

    Array.prototype.slice
      .call(panel.querySelectorAll(".u5s-accordion-content"))
      .forEach(function (content) {
        content.classList.remove("is-open");
        content.hidden = true;
      });
  }

  function closeAccordionEl(button) {
    var target = document.getElementById(button.getAttribute("aria-controls"));

    button.setAttribute("aria-expanded", "false");

    if (!target) {
      return;
    }

    collapseToTop(target);
  }

  function openAccordionEl(button) {
    var target = document.getElementById(button.getAttribute("aria-controls"));

    button.setAttribute("aria-expanded", "true");

    if (!target) {
      return;
    }

    expandFromTop(target);
  }

  function hidePanelNow(panel) {
    clearExpandTimer(panel);
    panel.classList.remove("is-open");
    panel.hidden = true;
    resetAccordions(panel);
  }

  function showPanel(panel) {
    resetAccordions(panel);
    panel.hidden = false;
    panel.classList.remove("is-open");
    panel.offsetHeight;

    window.requestAnimationFrame(function () {
      panel.classList.add("is-open");
    });
  }

  function closeAudiencePanels() {
    activeAudience = null;

    if (folder) {
      folder.removeAttribute("data-open");
    }

    audienceButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
    });

    panels.forEach(hidePanelNow);
    setStatus("המידע נסגר.");
  }

  function openAudience(button) {
    var key = button.getAttribute("data-u5s-audience");
    var panel = root.querySelector("#u5s-panel-" + key);

    if (!panel) {
      return;
    }

    panels.forEach(function (currentPanel) {
      if (currentPanel !== panel) {
        hidePanelNow(currentPanel);
      }
    });

    if (folder) {
      folder.setAttribute("data-open", key);
    }

    audienceButtons.forEach(function (currentButton) {
      currentButton.setAttribute(
        "aria-expanded",
        currentButton === button ? "true" : "false"
      );
    });

    showPanel(panel);

    activeAudience = key;
    setStatus(
      "נפתח מידע עבור " + button.textContent.replace(/\s+/g, " ").trim() + "."
    );
  }

  audienceButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-u5s-audience");

      if (activeAudience === key) {
        closeAudiencePanels();
      } else {
        openAudience(button);
      }
    });

    button.addEventListener("keydown", function (event) {
      var nextIndex;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nextIndex = index + 1;
        if (nextIndex >= audienceButtons.length) {
          nextIndex = 0;
        }
        audienceButtons[nextIndex].focus();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextIndex = index - 1;
        if (nextIndex < 0) {
          nextIndex = audienceButtons.length - 1;
        }
        audienceButtons[nextIndex].focus();
      } else if (event.key === "ArrowDown") {
        if (button.getAttribute("aria-expanded") === "true") {
          var panel = document.getElementById(
            button.getAttribute("aria-controls")
          );
          var firstAccordion = panel && panel.querySelector(".u5s-accordion-button");

          if (firstAccordion) {
            event.preventDefault();
            firstAccordion.focus();
          }
        }
      } else if (event.key === "Home") {
        event.preventDefault();
        audienceButtons[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        audienceButtons[audienceButtons.length - 1].focus();
      }
    });
  });

  Array.prototype.slice
    .call(root.querySelectorAll(".u5s-accordion-button"))
    .forEach(function (button) {
      button.addEventListener("click", function () {
        var parentPanel = button.closest(".u5s-panel");
        var isOpen = button.getAttribute("aria-expanded") === "true";

        if (parentPanel) {
          Array.prototype.slice
            .call(parentPanel.querySelectorAll(".u5s-accordion-button"))
            .forEach(function (sibling) {
              if (sibling !== button) {
                closeAccordionEl(sibling);
              }
            });
        }

        if (isOpen) {
          closeAccordionEl(button);
          setStatus("פרטי המפגש נסגרו.");
        } else {
          openAccordionEl(button);
          setStatus(
            "נפתח מידע עבור " +
              button.textContent.replace(/\s+/g, " ").trim() +
              "."
          );
        }
      });

      button.addEventListener("keydown", function (event) {
        var panel = button.closest(".u5s-panel");

        if (!panel) {
          return;
        }

        var buttons = Array.prototype.slice.call(
          panel.querySelectorAll(".u5s-accordion-button")
        );
        var index = buttons.indexOf(button);

        if (event.key === "ArrowDown") {
          if (button.getAttribute("aria-expanded") === "true") {
            var content = document.getElementById(
              button.getAttribute("aria-controls")
            );

            if (content) {
              event.preventDefault();
              content.focus();
              return;
            }
          }

          if (index < buttons.length - 1) {
            event.preventDefault();
            buttons[index + 1].focus();
          }
        } else if (event.key === "ArrowUp") {
          if (index > 0) {
            event.preventDefault();
            buttons[index - 1].focus();
          } else {
            var audienceButton = document.getElementById(
              panel.getAttribute("aria-labelledby")
            );

            if (audienceButton) {
              event.preventDefault();
              audienceButton.focus();
            }
          }
        } else if (event.key === "Home") {
          event.preventDefault();
          buttons[0].focus();
        } else if (event.key === "End") {
          event.preventDefault();
          buttons[buttons.length - 1].focus();
        }
      });
    });

  Array.prototype.slice
    .call(root.querySelectorAll(".u5s-accordion-content"))
    .forEach(function (content) {
      content.addEventListener("keydown", function (event) {
        var heading = document.getElementById(
          content.getAttribute("aria-labelledby")
        );

        if (!heading) {
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          heading.focus();
        } else if (event.key === "ArrowDown") {
          var panel = content.closest(".u5s-panel");

          if (!panel) {
            return;
          }

          var buttons = Array.prototype.slice.call(
            panel.querySelectorAll(".u5s-accordion-button")
          );
          var currentIndex = buttons.indexOf(heading);

          if (currentIndex >= 0 && currentIndex < buttons.length - 1) {
            event.preventDefault();
            buttons[currentIndex + 1].focus();
          }
        }
      });
    });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeAudience) {
      closeAudiencePanels();
    }
  });
})();
