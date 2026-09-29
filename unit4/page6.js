/**
 * Unit 4 — Page 6: לסיכום — מחברים את כל החלקים.
 * Marks this summary page as viewed. Unit 4 completes on the catalog page.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(4, "u4_p6");
}

(function initSummaryReflection() {
  var section = document.querySelector(".af-reflection");
  var textarea = document.querySelector("#u4sum-reflection-text");
  var actionButton = document.querySelector("#u4sum-reflection-action");
  var status = document.querySelector("#u4sum-reflection-status");
  var REFLECTION_KEY = "athalta_unit4_summary_reflection";
  var SAVE_LABEL = "שמירת הרפלקציה";
  var EDIT_LABEL = "עריכה";
  var isLocked = false;
  var draftTimer = null;
  var statusTimer = null;

  if (!section || !textarea || !actionButton) {
    return;
  }

  function setStatus(message) {
    if (!status) {
      return;
    }

    status.textContent = message;

    if (statusTimer) {
      window.clearTimeout(statusTimer);
    }

    if (!message) {
      return;
    }

    statusTimer = window.setTimeout(function () {
      status.textContent = "";
      statusTimer = null;
    }, 4000);
  }

  function persistState() {
    try {
      window.localStorage.setItem(
        REFLECTION_KEY,
        JSON.stringify({
          text: textarea.value,
          locked: isLocked
        })
      );
    } catch (error) {
      return false;
    }

    return true;
  }

  function canSave() {
    return textarea.value.trim().length >= 2;
  }

  function syncSaveButton() {
    var ready = isLocked || canSave();
    actionButton.disabled = isLocked ? false : !canSave();
    var hint = section.querySelector("#u4sum-reflection-hint");
    if (hint) {
      hint.hidden = ready;
    }
  }

  function applyMode(locked, options) {
    var settings = options || {};

    isLocked = !!locked;
    section.classList.toggle("is-saved", isLocked);
    textarea.readOnly = isLocked;
    textarea.setAttribute("aria-readonly", isLocked ? "true" : "false");
    actionButton.textContent = isLocked ? EDIT_LABEL : SAVE_LABEL;
    actionButton.setAttribute(
      "aria-label",
      isLocked ? "עריכת הרפלקציה" : SAVE_LABEL
    );

    if (settings.announceSave) {
      setStatus("הרפלקציה נשמרה. ניתן לערוך אותה בכל עת.");
    } else if (settings.announceEdit) {
      setStatus("ניתן לערוך את הרפלקציה.");
    }

    if (settings.focus === "textarea") {
      textarea.focus();
    } else if (settings.focus === "button") {
      actionButton.focus();
    }

    syncSaveButton();
  }

  function loadState() {
    try {
      var raw = window.localStorage.getItem(REFLECTION_KEY);

      if (!raw) {
        return;
      }

      var parsed = JSON.parse(raw);

      if (typeof parsed === "string") {
        textarea.value = parsed;
        applyMode(false, {});
        return;
      }

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        textarea.value = typeof parsed.text === "string" ? parsed.text : "";
        applyMode(!!parsed.locked, {});
      }
    } catch (error) {
      return;
    }
  }

  loadState();
  syncSaveButton();

  textarea.addEventListener("input", function () {
    if (isLocked) {
      return;
    }

    syncSaveButton();

    if (draftTimer) {
      window.clearTimeout(draftTimer);
    }

    draftTimer = window.setTimeout(function () {
      persistState();
      draftTimer = null;
    }, 400);
  });

  actionButton.addEventListener("click", function () {
    if (isLocked) {
      applyMode(false, { announceEdit: true, focus: "textarea" });
      persistState();
      return;
    }

    if (!canSave()) {
      syncSaveButton();
      return;
    }

    if (!persistState()) {
      setStatus("לא ניתן לשמור כרגע. נסו שוב מאוחר יותר.");
      return;
    }

    applyMode(true, { announceSave: true, focus: "button" });
    persistState();
  });
})();
