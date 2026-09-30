/**
 * Unit 6 — Page 2: רכיבי התקציב התוספתי.
 * Original Moodle copy and expand/collapse behavior, with rem layout
 * and smooth scroll on open and close.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(6, "u6_p2");
}

(function initAthaltaBudgetComponents() {
  var root = document.getElementById("athalta-budget-components");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var grid = root.querySelector("#u6c-main-grid");
  var panel = root.querySelector("#u6c-expanded");
  var status = root.querySelector("#u6c-status");
  var buttons = Array.prototype.slice.call(root.querySelectorAll(".u6c-more"));
  var activeButton = null;
  var activeKey = null;

  var data = {
    people: {
      title: "כוח אדם",
      className: "people",
      introHtml:
        "<p>רכיב <strong>כוח האדם</strong> מתייחס לפעילותם של אנשי ונשות הצוות האקדמי השותפים בתוכנית אתחלתא, ובכלל זה ראשי וראשות יחידות הכניסה להוראה, רכזי ורכזות אתחלתא, ומנחי ומנחות החממות&nbsp;והסדנאות.</p>",
      subClass: "people-subcards",
      cards: [
        {
          title: "פיתוח התוכנית",
          icon: "../assets/unit6/peopleOrange.png",
          extraClass: "",
          text:
            "רכיב זה נוגע לעבודת כוח האדם השותף בתוכנית, ובכלל זה פיתוח תכנים ייחודיים לחממות ולסדנאות אתחלתא, השתתפות במפגשים, ימי למידה ופגישות עם צוות אתחלתא. התקציב עבור רכיב זה מועבר למוסד האקדמי, והוא האחראי לנהל את התשלום לצוות האקדמי הפועל במסגרת&nbsp;התוכנית.",
        },
      ],
      noteHtml:
        "<strong>דגש לדיווח התקציב:</strong> ביחס להוצאות ברכיב <strong>כוח אדם</strong>, על המוסד האקדמי לפרט במסגרת דיווח התקציב את שם חבר או חברת הצוות האקדמי שקיבל/ה את התשלום, מספר שעות העבודה והסכום&nbsp;ששולם.",
    },
    activity: {
      title: "תוכן ופעילות",
      className: "activity",
      introHtml:
        "<p>במסגרת רכיב תוכן ופעילות ניתן לממן פעילויות המעשירות את פעילות החממה או הסדנה מעבר למפגשים השוטפים, בהתאם לסוג המסגרת, להרכבה ולתקציב שנקבע מדי שנה על ידי התוכנית. את תוכנית המפגשים השנתית ואת הסילבוס מומלץ לתכנן מראש כך שיביאו לידי ביטוי את הפעילויות והמפגשים הייחודיים המתאפשרים במסגרת התקציב&nbsp;התוספתי.</p>",
      subClass: "",
      cards: [
        {
          title: "מומחי תוכן וסדנאות ייחודיות",
          icon: "../assets/unit6/slideGreen.png",
          extraClass: "",
          text:
            "הזמנה של מומחי תוכן או סדנאות ייחודיות לפעילות החממות והסדנאות. השימוש ברכיב זה נעשה בהתאם לסוג המסגרת, להרכב המשתתפות ולתקציב שנקבע מדי שנה על ידי&nbsp;התוכנית.",
        },
        {
          title: "מפגשי סימולציה",
          icon: "../assets/unit6/onboardingGreen.png",
          extraClass: "simulation",
          text:
            "קיום מפגשי סימולציה העוסקים בסוגיות מרכזיות בתחום חינוך כיתה, במסגרת פעילות החממות והסדנאות. התקציב ניתן בהתאם לסוג המסגרת, להרכב המשתתפות ולקיומו או אי קיומו של מרכז סימולציה במוסד&nbsp;האקדמי.",
        },
        {
          title: "אירועי פתיחה וסיום",
          icon: "../assets/unit6/partyGreen.png",
          extraClass: "",
          text:
            "קיום אירועי פתיחה וסיום חגיגיים בחממות ובסדנאות אתחלתא. האירועים מתקיימים בהתאם לסוג המסגרת, להרכב המשתתפות ולתקציב שנקבע מדי שנה על ידי&nbsp;התוכנית.",
        },
        {
          title: "כיבוד",
          icon: "../assets/unit6/coffeGreen.png",
          extraClass: "",
          text:
            "רכיב זה נועד לאפשר הזמנת כיבוד לפעילות השוטפת של החממה או הסדנה, בהתאם לסוג המסגרת, להרכב המשתתפות ולתקציב שנקבע מדי שנה על ידי&nbsp;התוכנית.",
        },
        {
          title: "סיור",
          icon: "../assets/unit6/busGreen.png",
          extraClass: "",
          text:
            "קיום סיור במסגרת פעילות החממה או הסדנה. רכיב זה ניתן לחממה או סדנה בהיקף של 60 שעות אקדמיות (הרכב מתמחות בלבד או הטרוגני). סיור במסגרת המיועדת למורות חדשות בלבד, ייבחן עקב פנייה ייעודית לתוכנית אתחלתא, בהתאם לתקציב שנקבע מדי&nbsp;שנה.",
        },
      ],
      noteHtml: null,
    },
    overhead: {
      title: "תקורה",
      className: "overhead",
      introHtml:
        "<p>רכיב <strong>תקורה</strong> נועד לממן את הפעילות התומכת של הגורמים הפנימיים במוסד האקדמי במסגרת תוכנית&nbsp;אתחלתא.</p>" +
        "<p>בשונה מרכיבי כוח אדם או תוכן ופעילות, רכיב זה אינו מתייחס ישירות לפעילות מול המחנכות או לפיתוח התכנים, אלא להיבטים הארגוניים והניהוליים הנדרשים כדי לאפשר את הפעלת התוכנית במוסד&nbsp;האקדמי.</p>" +
        "<p>התקורה מיועדת לתמוך בפעולות הפנימיות הנלוות להפעלת התוכנית, כגון ניהול, תיאום, טיפול אדמיניסטרטיבי, ליווי תהליכי התקשרות, עבודה מול גורמים פנימיים במוסד וסיוע בהיבטים תפעוליים הקשורים למימוש&nbsp;התקציב.</p>" +
        "<p><strong>גובה התקורה הוא 5% מהתקציב הכולל המועבר למוסד האקדמי מדי שנה במסגרת&nbsp;התוכנית.</strong></p>",
      subClass: "",
      cards: [],
      noteHtml: null,
    },
  };

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function scrollBehavior() {
    return prefersReducedMotion() ? "auto" : "smooth";
  }

  function scrollToStart(element) {
    if (!element || typeof element.scrollIntoView !== "function") {
      return;
    }

    element.scrollIntoView({
      behavior: scrollBehavior(),
      block: "start",
    });
  }

  function stickyHeaderOffset() {
    var header = document.querySelector(".site-header");
    var headerHeight = 0;

    if (header) {
      var position = window.getComputedStyle(header).position;

      if (position === "sticky" || position === "fixed") {
        headerHeight = header.getBoundingClientRect().height;
      }
    }

    return headerHeight + 16;
  }

  function scrollToInstruction() {
    var target =
      root.querySelector(".u6c-section-title") ||
      root.querySelector(".u6c-instruction-row");

    if (!target) {
      return;
    }

    var top =
      target.getBoundingClientRect().top +
      (window.scrollY || window.pageYOffset || 0);

    window.scrollTo({
      top: Math.max(0, top - stickyHeaderOffset()),
      behavior: scrollBehavior(),
    });
  }

  function createSubCard(card, index) {
    return (
      '<article class="u6c-subcard ' +
      (card.extraClass || "") +
      '" tabindex="0" data-u6c-sub-index="' +
      index +
      '">' +
      '<img class="u6c-sub-icon" src="' +
      card.icon +
      '" alt="" aria-hidden="true">' +
      '<h4 class="u6c-sub-title">' +
      card.title +
      "</h4>" +
      '<p class="u6c-sub-text">' +
      card.text +
      "</p>" +
      "</article>"
    );
  }

  function openPanel(button) {
    var key = button.getAttribute("data-u6c-key");
    var item = data[key];
    var cardsHtml = "";
    var noteHtml = "";

    if (!item || !panel) {
      return;
    }

    activeButton = button;
    activeKey = key;

    buttons.forEach(function (currentButton) {
      currentButton.setAttribute(
        "aria-expanded",
        currentButton === button ? "true" : "false"
      );
    });

    if (item.cards && item.cards.length) {
      cardsHtml =
        '<div class="u6c-subcards ' +
        (item.subClass || "") +
        '">' +
        item.cards
          .map(function (card, index) {
            return createSubCard(card, index);
          })
          .join("") +
        "</div>";
    }

    if (item.noteHtml) {
      noteHtml =
        '<div class="u6c-report-note">' +
        '<span class="u6c-exclamation" aria-hidden="true">!</span>' +
        '<p class="u6c-report-text">' +
        item.noteHtml +
        "</p>" +
        "</div>";
    }

    panel.className = "u6c-expanded " + item.className;
    panel.setAttribute("aria-labelledby", button.id);
    panel.innerHTML =
      '<button type="button" class="u6c-close" aria-label="סגירת המידע">×</button>' +
      '<h3 class="u6c-expanded-title"><span>' +
      item.title +
      "</span></h3>" +
      '<div class="u6c-expanded-intro">' +
      item.introHtml +
      "</div>" +
      cardsHtml +
      noteHtml;

    if (grid) {
      grid.hidden = true;
    }

    panel.hidden = false;

    window.requestAnimationFrame(function () {
      scrollToStart(panel);

      window.setTimeout(function () {
        var closeButton = panel.querySelector(".u6c-close");

        if (closeButton) {
          closeButton.focus();
        }
      }, 0);
    });

    if (status) {
      status.textContent = "נפתח מידע נוסף בנושא " + item.title + ".";
    }
  }

  function closePanel() {
    var previousButton = activeButton;

    activeKey = null;
    activeButton = null;

    if (panel) {
      panel.hidden = true;
      panel.innerHTML = "";
      panel.className = "u6c-expanded";
      panel.removeAttribute("aria-labelledby");
    }

    if (grid) {
      grid.hidden = false;
    }

    buttons.forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
    });

    if (status) {
      status.textContent = "המידע הנוסף נסגר.";
    }

    window.requestAnimationFrame(function () {
      scrollToInstruction();

      window.setTimeout(function () {
        if (previousButton) {
          previousButton.focus({ preventScroll: true });
        }
      }, 0);
    });
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-u6c-key");

      if (activeKey === key && panel && !panel.hidden) {
        closePanel();
      } else {
        openPanel(button);
      }
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

  if (panel) {
    panel.addEventListener("click", function (event) {
      if (event.target.closest(".u6c-close")) {
        closePanel();
      }
    });

    panel.addEventListener("keydown", function (event) {
      var closeButton;
      var subcards;
      var currentSubcard;
      var currentIndex;

      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }

      closeButton = panel.querySelector(".u6c-close");

      if (
        closeButton &&
        event.target === closeButton &&
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        panel.focus();
        return;
      }

      subcards = Array.prototype.slice.call(
        panel.querySelectorAll(".u6c-subcard")
      );

      if (event.target === panel && event.key === "ArrowDown") {
        if (subcards.length) {
          event.preventDefault();
          subcards[0].focus();
        }

        return;
      }

      if (event.target === panel && event.key === "ArrowUp") {
        if (closeButton) {
          event.preventDefault();
          closeButton.focus();
        }

        return;
      }

      currentSubcard = event.target.closest(".u6c-subcard");

      if (!currentSubcard) {
        return;
      }

      currentIndex = subcards.indexOf(currentSubcard);

      if (event.key === "ArrowDown") {
        if (currentIndex < subcards.length - 1) {
          event.preventDefault();
          subcards[currentIndex + 1].focus();
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();

        if (currentIndex > 0) {
          subcards[currentIndex - 1].focus();
        } else {
          panel.focus();
        }
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeKey) {
      closePanel();
    }
  });
})();
