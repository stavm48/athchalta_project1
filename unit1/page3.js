/**
 * Unit 1 — Page 3: שלבי הכניסה להוראה.
 * Note open/close animation and accessibility. No Moodle title hacks.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(2, "entry_process");
}

(function () {
  "use strict";

  var root = document.getElementById("athalta-entry-process");
  if (!root) {
    return;
  }

  var labels = {
    "1": {
      closed:
        "שנה 1, שנת ההתמחות בהוראה. סטאז׳, סדנת התמחות, ליווי והערכה לקראת רישיון הוראה. לחצו להצגת פירוט.",
      open: "שנה 1, שנת ההתמחות בהוראה. הפירוט פתוח. לחצו לסגירה.",
    },
    "2": {
      closed:
        "שנה 2, מורה חדש או חדשה בליווי. השתלבות במערכת, ליווי מקצועי וחיזוק תחושת המסוגלות. לחצו להצגת פירוט.",
      open: "שנה 2, מורה חדש או חדשה בליווי. הפירוט פתוח. לחצו לסגירה.",
    },
    "3": {
      closed:
        "שנה 3, המשך הליווי וההתנסות. התנסות מקצועית, חיזוק דפוסי עבודה, שייכות וביטחון בתפקיד. לחצו להצגת פירוט.",
      open: "שנה 3, המשך הליווי וההתנסות. הפירוט פתוח. לחצו לסגירה.",
    },
  };

  var notes = root.querySelectorAll(".aep-note");
  var liveRegion = root.querySelector("#aep-live-region");

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function setNoteOpen(note, willOpen) {
    var number = note.getAttribute("data-note");
    var details = document.getElementById(note.getAttribute("aria-controls"));

    note.classList.toggle("aep-open", willOpen);
    note.setAttribute("aria-expanded", willOpen ? "true" : "false");
    note.setAttribute(
      "aria-label",
      willOpen ? labels[number].open : labels[number].closed
    );

    if (details) {
      details.hidden = !willOpen;
    }

    if (liveRegion) {
      liveRegion.textContent = willOpen
        ? "פירוט שנה " +
          number +
          " נפתח. ניתן לעבור לפריט הבא כדי לקרוא את הפירוט המלא."
        : "פירוט שנה " + number + " נסגר.";
    }
  }

  notes.forEach(function (note) {
    var busy = false;

    note.addEventListener("click", function () {
      if (busy) {
        return;
      }

      busy = true;

      var currentlyOpen = note.getAttribute("aria-expanded") === "true";
      var willOpen = !currentlyOpen;
      var reducedMotion = prefersReducedMotion();

      if (!reducedMotion) {
        note.classList.add("aep-turning");
      }

      window.setTimeout(
        function () {
          setNoteOpen(note, willOpen);
          note.classList.remove("aep-turning");

          window.setTimeout(
            function () {
              busy = false;
            },
            reducedMotion ? 0 : 190
          );
        },
        reducedMotion ? 0 : 180
      );
    });

    note.addEventListener("keydown", function (event) {
      if (
        event.key !== "Escape" ||
        note.getAttribute("aria-expanded") !== "true"
      ) {
        return;
      }

      event.preventDefault();
      note.classList.remove("aep-turning");
      setNoteOpen(note, false);
    });
  });
})();
