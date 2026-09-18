/**
 * Unit 4 — Page 2: ארבעת העקרונות לכתיבת סילבוס.
 * Marks this reminder page as viewed and toggles corkboard notes.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(4, "syllabus-reminder");
}

(function initAthaltaSyllabusReminder() {
  var pageRoot = document.getElementById("athalta-syllabus-reminder-page");
  var board = document.getElementById("athalta-corkboard");

  if (!pageRoot || !board) {
    return;
  }

  if (pageRoot.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  pageRoot.setAttribute("data-athalta-initialized", "true");

  var stage = board.querySelector(".asr-corkboard-stage");
  var notes = Array.prototype.slice.call(board.querySelectorAll(".asr-note"));

  if (!stage || !notes.length) {
    return;
  }

  function closeAllNotes() {
    board.classList.remove("has-open-note");
    stage.classList.remove("has-open-note");

    notes.forEach(function (note) {
      note.classList.remove("is-active");
      note.setAttribute("aria-expanded", "false");
      note.style.removeProperty("--stack-index");

      var explanation = note.querySelector(".asr-note-explanation");
      if (explanation) {
        explanation.setAttribute("aria-hidden", "true");
      }
    });
  }

  function openNote(selectedNote) {
    if (selectedNote.classList.contains("is-active")) {
      closeAllNotes();
      return;
    }

    board.classList.add("has-open-note");
    stage.classList.add("has-open-note");

    var stackIndex = 0;

    notes.forEach(function (note) {
      var isSelected = note === selectedNote;

      note.classList.toggle("is-active", isSelected);
      note.setAttribute("aria-expanded", isSelected ? "true" : "false");

      if (isSelected) {
        note.style.removeProperty("--stack-index");
      } else {
        note.style.setProperty("--stack-index", String(stackIndex));
        stackIndex += 1;
      }

      var explanation = note.querySelector(".asr-note-explanation");
      if (explanation) {
        explanation.setAttribute("aria-hidden", isSelected ? "false" : "true");
      }
    });
  }

  notes.forEach(function (note) {
    note.addEventListener("click", function () {
      openNote(note);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && board.classList.contains("has-open-note")) {
      closeAllNotes();
    }
  });

  closeAllNotes();
})();
