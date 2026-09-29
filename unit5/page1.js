/**
 * Unit 5 — Page 1: אבני הדרך בתוכנית.
 * Records this page as viewed and toggles
 * the four partnership-milestone cards on the timeline.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(5, "u5_p1");
}

(function initAthaltaUnit5Roadmap() {
  var root = document.getElementById("athalta-unit5-roadmap");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var buttons = Array.prototype.slice.call(root.querySelectorAll(".u5-step"));
  var panel = root.querySelector("#u5-card-panel");
  var status = root.querySelector("#u5-status");
  var activeKey = null;
  var assetBase = "../assets/unit5/";

  var cards = {
    green: {
      image: assetBase + "greenBoard.png",
      color: "#ADD38B",
      title: "יצירת קשר והיכרות ראשונית",
      text:
        "יצירת קשר ראשוני עם תוכנית אתחלתא, השתתפות בפגישת היכרות עם צוות התוכנית ומטרותיה, והבעת נכונות של המוסד האקדמי להצטרף לתוכנית לאחר עיון במסמך התוכנית.",
      emphasis: "",
      emphasisLink: ""
    },
    pink: {
      image: assetBase + "pinkBoard.png",
      color: "#F698C2",
      title: "העמקת השותפות",
      text:
        "השתתפות בפגישה עם הצוות המקצועי של תוכנית אתחלתא: משרד החינוך, קרן משפחת ליאון ותוכנית אתחלתא. מטרת הפגישה היא הצגת המוסד האקדמי ויחידת הכניסה להוראה — תפיסה, ערכים, עקרונות מובילים וצוות היחידה, ובחינת אפשרויות ממשיות להקמת חממות וסדנאות.",
      emphasis: "",
      emphasisLink: ""
    },
    purple: {
      image: assetBase + "purpleBoard.png",
      color: "#EBC0DB",
      title: "הקמה והיערכות לפתיחה",
      text:
        "ביצוע פעולות להקמת חממות ו/או סדנאות חדשות למחנכות חדשות, וכן הכנה לפתיחה מחודשת של חממות קיימות.",
      emphasis: "ראו יחידה 3 - הקמה וניהול חממות וסדנאות אתחלתא.",
      emphasisLink: "../unit3/page1.html"
    },
    yellow: {
      image: assetBase + "yellowBoard.png",
      color: "#FFEE81",
      title: "הסדרה ופתיחת שנה",
      text:
        "חתימת חוזה מול תוכנית אתחלתא ומכון מופ״ת, והתאמת התקציב התוספתי בהתאם למספר החממות ו/או הסדנאות שייפתחו ולסוגן.",
      emphasis: "",
      emphasisLink: ""
    }
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function closeCard() {
    activeKey = null;

    buttons.forEach(function (button) {
      button.classList.remove("is-active");
      button.setAttribute("aria-expanded", "false");
    });

    panel.innerHTML = "";
    panel.hidden = true;
    panel.removeAttribute("aria-labelledby");

    if (status) {
      status.textContent = "המידע נסגר.";
    }
  }

  function openCard(button) {
    if (!button) {
      return;
    }

    var key = button.getAttribute("data-u5-step");
    var card = cards[key];

    if (!card) {
      return;
    }

    activeKey = key;

    buttons.forEach(function (item) {
      var active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-expanded", active ? "true" : "false");
    });

    var emphasisHtml = "";

    if (card.emphasis) {
      if (card.emphasisLink) {
        emphasisHtml =
          "<br /><strong class=\"u5-card-emphasis\"><a class=\"u5-card-link\" href=\"" +
          escapeHtml(card.emphasisLink) +
          "\">" +
          escapeHtml(card.emphasis) +
          "</a></strong>";
      } else {
        emphasisHtml =
          "<br /><strong class=\"u5-card-emphasis\">" +
          escapeHtml(card.emphasis) +
          "</strong>";
      }
    }

    panel.hidden = false;
    panel.setAttribute("aria-labelledby", button.id);
    panel.innerHTML =
      "<div class=\"u5-card-shell\" style=\"--u5-highlight:" +
      escapeHtml(card.color) +
      ';">' +
      '<img class="u5-card-image" src="' +
      escapeHtml(card.image) +
      '" alt="" aria-hidden="true" />' +
      '<div class="u5-card-copy">' +
      '<h4 class="u5-card-title"><span>' +
      escapeHtml(card.title) +
      "</span></h4>" +
      '<p class="u5-card-text">' +
      escapeHtml(card.text) +
      emphasisHtml +
      "</p></div></div>";

    if (status) {
      status.textContent = "נפתח מידע עבור " + card.title + ".";
    }

    scrollToOpenedCard();
  }

  function scrollToOpenedCard() {
    var target = panel.querySelector(".u5-card-shell") || panel;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    var didScroll = false;

    function doScroll() {
      if (didScroll || panel.hidden) {
        return;
      }

      didScroll = true;
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
        inline: "nearest"
      });
    }

    var image = panel.querySelector(".u5-card-image");

    if (image && !image.complete) {
      image.addEventListener("load", doScroll, { once: true });
      image.addEventListener("error", doScroll, { once: true });
      window.setTimeout(doScroll, 280);
      return;
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(doScroll);
    });
  }

  function toggleCard(button) {
    var key = button.getAttribute("data-u5-step");

    if (activeKey === key) {
      closeCard();
    } else {
      openCard(button);
    }
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      toggleCard(button);
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
      closeCard();
    }
  });
})();
