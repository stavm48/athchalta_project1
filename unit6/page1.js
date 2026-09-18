/**
 * Unit 6 — Page 1: מקורות ומבנה התקציב.
 * Marks Unit 5 complete, records this page as viewed, and toggles
 * the budget-structure wheel slices and detail cards.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markUnitAsCompleted(5);
  window.athaltaProgress.markPageAsViewed(6, "budget");
}

(function initAthaltaBudgetSources() {
  var root = document.getElementById("athalta-budget");

  if (!root) {
    return;
  }

  if (root.getAttribute("data-athalta-initialized") === "true") {
    return;
  }

  root.setAttribute("data-athalta-initialized", "true");

  var cards = {
    blue: {
      title: "כמות החממות והסדנאות",
      body:
        "<p>ככל שהמוסד האקדמי מפעיל יותר חממות/סדנאות, כך התקציב שיוקצה לו יהיה גדול יותר. זאת, בהתאם למפתח המספרי שנקבע על-ידי התוכנית מדי&nbsp;שנה.</p>" +
        "<p>המפתח מתעדכן מדי שנת פעילות ומחושב לפי מספר המסגרות הפעילות בפועל במסגרת השותפות בתוכנית אתחלתא. לכן יש לדווח במדויק על כל חממה וסדנה המופעלת במוסד, כולל שינויים שחלים במהלך&nbsp;השנה.</p>" +
        "<ul class=\"u6-card-list\">" +
        "<li>כל חממה או סדנה שאושרה ונפתחה נספרת במפתח הכמות של אותה שנת&nbsp;פעילות.</li>" +
        "<li>שינוי במספר המסגרות במהלך השנה מחייב עדכון דיווח, כדי שהתקציב התוספתי יתאים להפעלה בפועל.</li>" +
        "</ul>" +
        "<p class=\"u6-card-note\">שימו לב: מסגרת שלא דווחה או שלא אושרה אינה נכללת בחישוב התקציב התוספתי.</p>",
    },
    yellow: {
      title: "הרכב החממה או הסדנה",
      body:
        "<p>הרכב המשתתפות בחממה או בסדנה קובע את היקף שעות ההנחיה ואת רכיבי התקציב התוספתי המוקצים למסגרת. ההבחנה המרכזית היא בין מסגרת בהיקף מלא לבין מסגרת בהיקף&nbsp;מצומצם:</p>" +
        "<ul class=\"u6-card-list\">" +
        "<li><strong>60 שעות אקדמיות</strong> — חממה למחנכות כיתה חדשות בהיקף מלא, בהתאם למודל ההפעלה של&nbsp;התוכנית.</li>" +
        "<li><strong>30 שעות אקדמיות</strong> — סדנה או מסגרת בהיקף מצומצם יותר, לפי הרכב המשתתפות ואופי&nbsp;הפעילות.</li>" +
        "</ul>" +
        "<p>יש להתאים את בקשת התקציב להרכב בפועל, ולעדכן אם ההרכב משתנה במהלך שנת&nbsp;הפעילות.</p>" +
        "<p class=\"u6-card-note\">שימו לב: אין להגיש בקשה לפי מפתח של 60 שעות אקדמיות כאשר המסגרת פועלת בפועל בהיקף של 30 שעות, ולהפך.</p>",
    },
    pink: {
      title: "סוג המסגרת",
      body:
        "<p>סוג המסגרת, חממה או סדנה, קובע אילו רכיבי תקציב מוקצים וכיצד הם מחושבים. לכל סוג מסגרת מפתח תקצוב משלו במסגרת התקציב&nbsp;התוספתי.</p>" +
        "<ul class=\"u6-card-list\">" +
        "<li><strong>חממה</strong> — מסגרת ייעודית למחנכות כיתה חדשות, עם רכיבי הנחיה, ריכוז וליווי בהיקף&nbsp;מלא.</li>" +
        "<li><strong>סדנה</strong> — מסגרת ממוקדת יותר, עם מפתח שעות ורכיבים שונים מאלה של&nbsp;החממה.</li>" +
        "</ul>" +
        "<p class=\"u6-card-note\">שימו לב: סוג המסגרת חייב להתאים לאישור התוכנית ולדיווח השנתי. אין לערב בין מפתחות התקצוב של חממה ושל&nbsp;סדנה.</p>",
    },
  };

  var stage = root.querySelector(".u6-stage");
  var slices = Array.prototype.slice.call(root.querySelectorAll(".u6-slice"));
  var sliceButtons = slices.map(function (slice) {
    return slice.querySelector(".u6-slice-hit");
  });
  var detailCard = root.querySelector("#u6-detail-card");
  var cardTitle = root.querySelector("#u6-card-title");
  var cardBody = root.querySelector("#u6-card-body");
  var closeButtons = Array.prototype.slice.call(
    root.querySelectorAll("[data-u6-close]")
  );
  var status = root.querySelector("#u6-status");
  var activeKey = null;
  var pickFromKeyboard = false;

  function setStatus(message) {
    if (status) {
      status.textContent = message;
    }
  }

  function setSliceState(slice, isFull) {
    var image = slice.querySelector(".u6-slice-image");

    slice.classList.toggle("is-full", isFull);
    slice.classList.toggle("is-dimmed", !isFull);

    if (!image) {
      return;
    }

    var nextSrc = isFull
      ? image.getAttribute("data-full")
      : image.getAttribute("data-empty");

    if (nextSrc) {
      image.src = nextSrc;
    }
  }

  function hideCard() {
    if (!detailCard) {
      return;
    }

    detailCard.classList.remove("is-open", "u6-yellow", "u6-blue", "u6-pink");
    detailCard.setAttribute("aria-hidden", "true");
    detailCard.removeAttribute("aria-labelledby");
    detailCard.hidden = true;
  }

  function showCard(key) {
    var data = cards[key];

    if (!detailCard || !data) {
      return;
    }

    detailCard.classList.remove("u6-yellow", "u6-blue", "u6-pink");
    detailCard.classList.add("u6-" + key);
    detailCard.setAttribute("aria-labelledby", "u6-slice-" + key);

    if (cardTitle) {
      cardTitle.textContent = data.title;
    }

    if (cardBody) {
      cardBody.innerHTML = data.body;
    }

    detailCard.hidden = false;
    detailCard.setAttribute("aria-hidden", "false");
    window.requestAnimationFrame(function () {
      detailCard.classList.add("is-open");
    });
  }

  function getActiveHit() {
    var slice;

    if (!activeKey) {
      return null;
    }

    slice = root.querySelector(
      '.u6-slice[data-u6-source="' + activeKey + '"]'
    );

    return slice ? slice.querySelector(".u6-slice-hit") : null;
  }

  function getCardFocusables() {
    if (!detailCard || detailCard.hidden) {
      return [];
    }

    return Array.prototype.slice
      .call(
        detailCard.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      )
      .filter(function (el) {
        return !el.hasAttribute("hidden");
      });
  }

  function isOnActiveSlice(el) {
    var hit = getActiveHit();
    return !!(hit && el && (el === hit || hit.contains(el)));
  }

  function handleOpenCardTab(event) {
    var focusables = getCardFocusables();
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var current = document.activeElement;
    var activeHit = getActiveHit();
    var navLink = document.querySelector(".ata-sequential-nav a");

    if (!first) {
      return;
    }

    if (!event.shiftKey && isOnActiveSlice(current)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && current === first) {
      event.preventDefault();
      if (activeHit) {
        activeHit.focus();
      }
      return;
    }

    if (!event.shiftKey && current === last) {
      event.preventDefault();
      if (navLink) {
        navLink.focus();
      }
    }
  }

  function closeAll() {
    var returningHit = null;

    if (
      document.activeElement &&
      detailCard &&
      detailCard.contains(document.activeElement)
    ) {
      returningHit = getActiveHit();
    }

    activeKey = null;

    if (stage) {
      stage.classList.remove("is-open");
    }

    slices.forEach(function (slice) {
      var hit = slice.querySelector(".u6-slice-hit");
      setSliceState(slice, true);
      if (hit) {
        hit.setAttribute("aria-expanded", "false");
      }
    });

    hideCard();
    setStatus("המידע נסגר.");

    if (returningHit) {
      returningHit.focus();
    }
  }

  function openSource(key) {
    if (!key || !cards[key]) {
      return;
    }

    activeKey = key;

    if (stage) {
      stage.classList.add("is-open");
    }

    slices.forEach(function (slice) {
      var hit = slice.querySelector(".u6-slice-hit");
      var isActive = slice.getAttribute("data-u6-source") === key;
      setSliceState(slice, isActive);
      if (hit) {
        hit.setAttribute("aria-expanded", isActive ? "true" : "false");
      }
    });

    showCard(key);
    setStatus("נפתח מידע עבור " + cards[key].title + ".");
  }

  function toggleSource(key) {
    if (activeKey === key) {
      closeAll();
    } else {
      openSource(key);
    }
  }

  slices.forEach(function (slice, index) {
    var hit = sliceButtons[index];

    if (!hit) {
      return;
    }

    hit.addEventListener("click", function () {
      toggleSource(slice.getAttribute("data-u6-source"));
    });

    hit.addEventListener("keydown", function (event) {
      var nextIndex;

      if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
        event.preventDefault();
        nextIndex = index + 1;
        if (nextIndex >= sliceButtons.length) {
          nextIndex = 0;
        }
        sliceButtons[nextIndex].focus();
      } else if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        event.preventDefault();
        nextIndex = index - 1;
        if (nextIndex < 0) {
          nextIndex = sliceButtons.length - 1;
        }
        sliceButtons[nextIndex].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        sliceButtons[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        sliceButtons[sliceButtons.length - 1].focus();
      }
    });
  });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      closeAll();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Tab" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowRight" ||
      event.key === "Home" ||
      event.key === "End"
    ) {
      pickFromKeyboard = true;
    }

    if (event.key === "Tab" && activeKey && detailCard && !detailCard.hidden) {
      handleOpenCardTab(event);
    }

    if (event.key === "Escape" && activeKey) {
      closeAll();
    }
  });

  document.addEventListener("mousedown", function () {
    pickFromKeyboard = false;
  });

  root.addEventListener("focusin", function (event) {
    var hit = event.target.closest(".u6-slice-hit");
    var slice;
    var key;
    var fromKeyboard = pickFromKeyboard;

    if (!hit || !root.contains(hit)) {
      return;
    }

    try {
      fromKeyboard = fromKeyboard || hit.matches(":focus-visible");
    } catch (error) {
      fromKeyboard = pickFromKeyboard;
    }

    if (!fromKeyboard) {
      return;
    }

    slice = hit.closest(".u6-slice");
    key = slice && slice.getAttribute("data-u6-source");

    if (key) {
      openSource(key);
    }
  });
})();
