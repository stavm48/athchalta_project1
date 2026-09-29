(function () {
  var button = document.querySelector(".completion-save");
  var textarea = document.querySelector("#completion-reflection-text");
  if (!button || !textarea) {
    return;
  }

  function canSave() {
    return textarea.value.trim().length >= 2;
  }

  function syncSaveButton() {
    var hint = document.querySelector("#completion-reflection-hint");
    var ready = button.classList.contains("is-saved") || canSave();

    if (hint) {
      hint.hidden = ready;
    }

    if (button.classList.contains("is-saved")) {
      button.disabled = true;
      return;
    }

    button.disabled = !canSave();
  }

  syncSaveButton();

  textarea.addEventListener("input", syncSaveButton);

  button.addEventListener("click", function () {
    if (!canSave() || button.classList.contains("is-saved")) {
      syncSaveButton();
      return;
    }

    button.textContent = "נשמר בהצלחה!";
    button.classList.add("is-saved");
    button.disabled = true;
  });
})();
