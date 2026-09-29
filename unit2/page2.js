/**
 * Unit 2 — Page 2: קהל היעד ומסגרות התוכנית.
 * Records this page as viewed and snaps the audience track
 * between intern and first-year teacher on click.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(2, "u2_p2");
}

(function initAudienceTrack() {
  var root = document.getElementById("athalta-audience-page");
  if (!root) {
    return;
  }

  var track = root.querySelector("#ata-track");
  var knob = root.querySelector("#ata-knob");
  var card = root.querySelector("#ata-info-card");
  var cardTitle = root.querySelector("#ata-card-title");
  var cardBody = root.querySelector("#ata-card-body");
  var plantButtons = root.querySelectorAll(".ata-plant-side");

  if (!track || !knob || !card || !cardTitle || !cardBody) {
    return;
  }

  var currentState = "intern";
  var content = {
    intern: {
      title: "מחנכת כיתה - מתמחה",
      body:
        'מחויבות להשתתף בסדנת התמחות בהיקף של 60 ש"ש לצורך עמידה בתנאי שנת ההתמחות וקבלת רישיון הוראה. כך, השתתפות בחממת מחנכות כיתה היא למעשה השתתפות בסדנת התמחות.',
      valueNow: "0",
      valueText: "מחנכת כיתה מתמחה",
    },
    teacher: {
      title: "מחנכת כיתה - מורה חדשה (שנה א׳)",
      body:
        'נדרשת להשתתף בקורס "מורה חדש" בהיקף של 30 ש״ש, כחלק מתהליך ההתפתחות המקצועית שלה. כך, השתתפות בחממת מחנכות כיתה היא למעשה השתתפות בקורס "מורה חדש".',
      valueNow: "1",
      valueText: "מחנכת כיתה מורה חדשה",
    },
  };

  function setState(state) {
    if (state !== "intern" && state !== "teacher") {
      return;
    }

    var changed = state !== currentState;
    currentState = state;

    track.classList.toggle("is-intern", state === "intern");
    track.classList.toggle("is-teacher", state === "teacher");

    plantButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-audience") === state;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    knob.setAttribute("aria-valuenow", content[state].valueNow);
    knob.setAttribute("aria-valuetext", content[state].valueText);

    if (!changed) {
      return;
    }

    card.classList.remove("is-intern", "is-teacher", "is-changing");
    card.classList.add(state === "intern" ? "is-intern" : "is-teacher");
    cardTitle.textContent = content[state].title;
    cardBody.textContent = content[state].body;
    void card.offsetWidth;
    card.classList.add("is-changing");
  }

  function toggleState() {
    setState(currentState === "intern" ? "teacher" : "intern");
  }

  track.addEventListener("click", function () {
    toggleState();
  });

  plantButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      setState(button.getAttribute("data-audience"));
    });
  });

  knob.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "Home") {
      event.preventDefault();
      setState("teacher");
    }

    if (event.key === "ArrowRight" || event.key === "End") {
      event.preventDefault();
      setState("intern");
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleState();
    }
  });

  setState("intern");
})();
