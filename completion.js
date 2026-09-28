(function () {
  var button = document.querySelector(".completion-save");
  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    button.textContent = "נשמר בהצלחה!";
    button.disabled = true;
  });
})();
