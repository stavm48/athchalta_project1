/**
 * Unit 5 — Page 2: נקודות ציון במהלך שנת הפעילות.
 * Records this page as viewed and toggles the three year-milestone
 * panels with keyboard support.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(5, "year-milestones");
}

(function initAthaltaYearMilestones() {
  var root = document.getElementById("athalta-year-milestones");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var items = Array.prototype.slice.call(root.querySelectorAll(".u5m-item"));
  var buttons = Array.prototype.slice.call(root.querySelectorAll(".u5m-button"));
  var status = root.querySelector("#u5m-status");
  var activeKey = null;
  var closeTimer = null;

  function setStatus(message) {
    if (status) {
      status.textContent = message;
    }
  }

  function closePanel(detail) {
    if (!detail) {
      return;
    }

    detail.classList.remove("is-open");
    window.setTimeout(function () {
      if (!detail.classList.contains("is-open")) {
        detail.hidden = true;
      }
    }, 450);
  }

  function closeAll() {
    activeKey = null;

    items.forEach(function (item) {
      item.classList.remove("is-active");

      var button = item.querySelector(".u5m-button");
      var detail = item.querySelector(".u5m-detail");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }

      closePanel(detail);
    });

    setStatus("המידע נסגר.");
  }

  function openItem(button) {
    if (!button) {
      return;
    }

    var key = button.getAttribute("data-u5m-key");
    var selectedItem = button.closest(".u5m-item");

    if (!selectedItem) {
      return;
    }

    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    items.forEach(function (item) {
      var currentButton = item.querySelector(".u5m-button");
      var currentDetail = item.querySelector(".u5m-detail");
      var isCurrent = item === selectedItem;

      item.classList.toggle("is-active", isCurrent);

      if (currentButton) {
        currentButton.setAttribute("aria-expanded", isCurrent ? "true" : "false");
      }

      if (!currentDetail) {
        return;
      }

      if (isCurrent) {
        currentDetail.hidden = false;
        window.requestAnimationFrame(function () {
          currentDetail.classList.add("is-open");
        });
      } else {
        closePanel(currentDetail);
      }
    });

    activeKey = key;
    setStatus(
      "נפתחה נקודת הציון " +
        button.textContent.replace(/\s+/g, " ").trim() +
        "."
    );
  }

  function toggleItem(button) {
    var key = button.getAttribute("data-u5m-key");

    if (activeKey === key) {
      closeAll();
    } else {
      openItem(button);
    }
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      toggleItem(button);
    });

    button.addEventListener("keydown", function (event) {
      var nextIndex;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nextIndex = index + 1;
        if (nextIndex >= buttons.length) {
          nextIndex = 0;
        }
        buttons[nextIndex].focus();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextIndex = index - 1;
        if (nextIndex < 0) {
          nextIndex = buttons.length - 1;
        }
        buttons[nextIndex].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        buttons[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        buttons[buttons.length - 1].focus();
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeKey) {
      closeAll();
    }
  });
})();
