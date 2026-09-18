/**
 * Unit 1 — Page 7: יסודות אתחלתא.
 * Marks the foundations page as viewed. Handles expandable cards
 * and the six-foundation map with SVG path routing.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(1, "foundations");
  window.athaltaProgress.markUnitAsCompleted(1);
}

(function initAthaltaFoundations() {
  var root = document.getElementById("athalta-foundations-page");
  if (!root) {
    return;
  }

  var shell = root.querySelector("#af-foundation-shell");
  var details = root.querySelector("#af-foundation-details");
  var map = root.querySelector(".af-foundations-map");
  var foundationButtons = root.querySelectorAll(".af-foundation-button");
  var detailsTitle = root.querySelector("#af-details-title");
  var detailsSubtitle = root.querySelector("#af-details-subtitle");
  var detailsAllows = root.querySelector("#af-details-allows");
  var detailsImportance = root.querySelector("#af-details-importance");
  var detailsExamples = root.querySelector("#af-details-examples");
  var detailsExampleLabel = root.querySelector("#af-details-example-label");
  var detailsClose = root.querySelector("#af-details-close");
  var mapWrap = root.querySelector(".af-map-wrap");
  var cardToggles = root.querySelectorAll(".af-card-inner");
  var STORAGE_KEY = "athalta_unit1_foundations_visited";
  var CHECKMARK_SVG =
    '<svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M2 6L6 10L14 2" stroke="#1F3D64" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";
  var visitedFoundations = loadVisited();

  root.querySelectorAll(".af-foundation-check").forEach(function (mark) {
    mark.innerHTML = CHECKMARK_SVG;
  });
  applyVisitedMarks();

  function loadVisited() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return [];
      }

      var parsed = JSON.parse(saved);
      var list = Array.isArray(parsed) ? parsed : parsed && parsed.visited;
      var clean = [];

      if (!Array.isArray(list)) {
        return [];
      }

      list.forEach(function (item) {
        var value = parseInt(item, 10);
        if (value >= 1 && value <= 6 && clean.indexOf(value) === -1) {
          clean.push(value);
        }
      });

      return clean;
    } catch (error) {
      return [];
    }
  }

  function saveVisited() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(visitedFoundations)
      );
    } catch (error) {
      /* Ignore quota / private-mode failures. */
    }
  }

  function applyVisitedMarks() {
    foundationButtons.forEach(function (button) {
      var number = parseInt(button.getAttribute("data-foundation"), 10);
      if (visitedFoundations.indexOf(number) !== -1) {
        button.classList.add("is-visited");
      }
    });
  }

  function markFoundationVisited(number) {
    var value = parseInt(number, 10);
    if (value < 1 || value > 6 || visitedFoundations.indexOf(value) !== -1) {
      return;
    }

    visitedFoundations.push(value);
    saveVisited();
    applyVisitedMarks();
  }

  if (mapWrap) {
    var revealMap = function () {
      mapWrap.classList.add("is-revealed");
    };

    if (
      prefersReducedMotion() ||
      !("IntersectionObserver" in window)
    ) {
      revealMap();
    } else {
      var mapObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealMap();
              mapObserver.disconnect();
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
      );
      mapObserver.observe(mapWrap);
    }
  }

  var svgNS = "http://www.w3.org/2000/svg";
  var routeSvg = document.createElementNS(svgNS, "svg");
  routeSvg.setAttribute("class", "af-route-svg");
  routeSvg.setAttribute("aria-hidden", "true");
  routeSvg.setAttribute("focusable", "false");

  var routePath = document.createElementNS(svgNS, "path");
  routePath.setAttribute("fill", "none");
  routePath.setAttribute("stroke-width", "8");
  routePath.setAttribute("stroke-linecap", "round");
  routePath.setAttribute("stroke-linejoin", "round");
  routePath.setAttribute("vector-effect", "non-scaling-stroke");
  routeSvg.appendChild(routePath);
  shell.insertBefore(routeSvg, shell.firstChild);

  var activeFoundation = null;
  var revealTimer = null;
  var closeTimer = null;
  var resizeTimer = null;

  var foundationData = {
    1: {
      title: "ביטוי עצמי ושייכות",
      subtitle:
        "מקום בטוח לביטוי עצמי, שיתוף, ושייכות | ביחס לאקלים בחממה ובסדנה",
      allows: [
        "מרחב בטוח לביטוי עצמי ושיתוף מצבים ומקרים מהיום-יום",
        "תחושת שייכות לקבוצה כחלק מתהליך הלמידה",
        "אקלים מיטיב התומך בהתנסות ובלמידה משותפת",
      ],
      importance:
        "יסוד ביטוי עצמי ושייכות מאפשר ליצור בקבוצה אקלים של ביטחון, פתיחות ושייכות, שהמחנכת יכולה לקחת איתה כמודל ליצירת אקלים דומה בכיתתה.",
      examples:
        "עידוד שיח פתוח ולא שיפוטי, פתיחת מפגשים בסבב אישי, עבודה בקבוצות קטנות ובזוגות, \"ניעור מוחות\", \"דומינו רצונות\", \"צימוד כפוי\" ופרטיקות נוספות להיכרות ושיח.",
      exampleLabel: "דוגמאות",
      color: "#ADD594",
    },
    2: {
      title: "מקצוענות וניהול עצמי",
      subtitle:
        "תנועה וחיבור בין תאוריה, פרקטיקה ומעשה בתפקיד חינוך כיתה | ביחס לרכיבי התפקיד",
      allows: [
        "הרחבת ארגז הכלים של מחנכות הכיתה",
        "חיבור בין העשייה בהווה לבין הידע, התיאוריה והפרקטה הרלוונטית לחינוך כיתה",
        "התאמת פתרונות יצירתיים, איכותיים ומגוונים למצבים ואתגרים משתנים במסגרת התפקיד",
      ],
      importance:
        "היסוד מחבר בין למידה, התנסות ויישום, ומפתח את היכולת של מחנכת הכיתה לתרגם ידע מקצועי לעשייה רלוונטית ומדויקת בשטח.",
      examples:
        "ניתוח תיאוריות בניהול כיתה, תרגול טכניקות לאקלים מיטבי, התנסות בכלים למיפוי כיתתי, סדנאות על קשר עם הורים.",
      exampleLabel: "דוגמאות",
      color: "#F69997",
    },
    3: {
      title: "זהות",
      subtitle:
        "מרחב להתפתחות זהות אישית ומקצעוית של מחנכות כיתה | המחנכת ביחס לעצמה",
      allows: [
        "רפלקציה על זהות אישית ומקצועית",
        "הכרת ה\"עצמי\" במצבים משתנים, ופיתוח \"טביעת אצבע\" מקצועית",
        "חיבור בין ערכים, תפיסות ואמונות לבין התפקיד",
        "חיזוק תחושת המסוגלות, הייחודיות והקול האישי בתוך העשייה החינוכית",
      ],
      importance:
        "היסוד מאפשר למחנכת הכיתה לברר מי היא כאשת חינוך, מה מנחה אותה בתגובותיה היום-יומיות, מה הסגנון שלה ואיזו מחנכת היא שואפת להיות.",
      examples:
        "בניית \"לוח חזון\" אישי, כתיבת \"אני מאמין\" חינוכי, סדנת \"מה בין זהות אישית למקצועית?\", מיפוי חוזקות ומשאבים אישיים.",
      exampleLabel: "דוגמאות",
      color: "#EBC0DB",
    },
    4: {
      title: "מסוגלות",
      subtitle:
        "מגרש להתנסות ולהתאמן בהרגלי הלב, הרגלי היד והרגלי הראש | ביחס ל”כאן ועכשיו”",
      allows: [
        "מרחב להתנסות, טעייה ולמידה",
        "חיזוק תחושת היכולת והאמונה בכוחות האישיים והמקצועיים",
        "פיתוח ביטחון לפעול, ליזום ולהתמודד עם אתגרים בתפקיד",
      ],
      importance:
        "היסוד שם דגש על התנסות ותרגול במרחב לא שיפוטי, זאת כדי לאפשר אימון ותרגול שיוביל לפיתוח תחושת מסוגלות ונכונות לפעול.",
      examples:
        "סימולציות להתמודדות עם קונפליקטים, ניתוח אירועים מהשטח, התמודדות עם בעיות משמעת ואלימות, עבודה עם תלמידים משולבים.",
      exampleLabel: "דוגמאות",
      color: "#FFEE81",
    },
    5: {
      title: "שותפויות",
      subtitle:
        "שולחן עגול המבוסס על שותפויות ומחבר בין גורמי הקליטה לבין המחנכות | ביחס לבתי- הספר ולהקשר המקומי והתרבותי",
      allows: [
        "חיזוק ההבנה שהתפקיד מתקיים בתוך רשת של קשרים ושותפים",
        "הרחבת המבט אל ההיבט הבית־ספרי, הקהילתי והחברתי",
        "פיתוח יכולת לפעול מתוך שיח, שיתוף פעולה וחיבור לגורמי קליטה נוספים",
      ],
      importance:
        "היסוד מעודד היכרות וביסוס תפיסה רחבה של התפקיד שנטועה בהקשרים מקומיים, במטרה לטייב את תהליך קליטתה וכניסתה לתפקיד של מחנכת הכיתה.",
      examples:
        "מפגשים וסיורים בבתי ספר שונים ביישוב, אירוח מנהלות וחונכות ותיקות, מפגש עם נציגי הרשות והפיקוח.",
      exampleLabel: "דוגמה מהשטח",
      color: "#B9E4ED",
    },
    6: {
      title: "שליחות ומשמעות",
      subtitle:
        "קרקע מצמיחה למחנכות כיתה שאוהבות את תפקידן ומאמינות ביכולתן להיות סוכנות שינוי | ביחס לתלמידות ותלמידים",
      allows: [
        "חיבור למשמעות הרחבה של התפקיד",
        "חיזוק תחושת הערך, ההשפעה והאחריות שבעשייה החינוכית",
        "טיפוח מחויבות, כיוון ומוטיבציה להמשך הדרך",
      ],
      importance:
        "היסוד מחזק חיבור פנימי לתפקיד ומעניק לעשייה החינוכית משמעות, כיוון וערך.",
      examples:
        "דיון על חיבור לערכים, משחק קופסה \"אתיקה\", סדנת \"בשביל מה את/ה פה?\", תכנון פרויקטים קהילתיים, שימוש בפרקטיקות לקידום הוגנות ושוויון הזדמנויות בכיתה כמו \"כל הכיתה כל הזמן\".",
      exampleLabel: "דוגמה מהשטח",
      color: "#F59EC4",
    },
  };

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  cardToggles.forEach(function (button) {
    var card = button.closest(".af-card");

    button.addEventListener("click", function () {
      var isFlipped = card.classList.toggle("is-flipped");
      button.setAttribute("aria-expanded", isFlipped ? "true" : "false");
      button.setAttribute("aria-pressed", isFlipped ? "true" : "false");
    });
  });

  function scrollElementIntoView(el, align) {
    if (!el) {
      return;
    }

    var rect = el.getBoundingClientRect();
    var viewHeight = window.innerHeight || document.documentElement.clientHeight;
    var targetY;

    if (align === "center") {
      targetY =
        window.scrollY + rect.top + rect.height / 2 - viewHeight / 2;
    } else {
      targetY = window.scrollY + rect.top - Math.max(24, viewHeight * 0.12);
    }

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function fillDetails(number) {
    var data = foundationData[number];
    detailsTitle.textContent = data.title;
    detailsSubtitle.textContent = data.subtitle;
    detailsAllows.innerHTML = "";

    var allowsList = document.createElement("ul");
    allowsList.className = "af-details-list";
    data.allows.forEach(function (item) {
      var allowsItem = document.createElement("li");
      allowsItem.textContent = item;
      allowsList.appendChild(allowsItem);
    });
    detailsAllows.appendChild(allowsList);

    detailsImportance.textContent = data.importance;
    detailsExamples.textContent = data.examples;
    detailsExampleLabel.textContent = data.exampleLabel;
    details.style.borderColor = data.color;
    details.style.setProperty("--af-active", data.color);
    detailsTitle.style.backgroundColor = data.color;
  }

  function clearButtons() {
    foundationButtons.forEach(function (button) {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-expanded", "false");
    });
  }

  function distance(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function toward(from, to, amount) {
    var total = distance(from, to);
    if (!total) {
      return { x: from.x, y: from.y };
    }
    return {
      x: from.x + ((to.x - from.x) / total) * amount,
      y: from.y + ((to.y - from.y) / total) * amount,
    };
  }

  function roundedPath(points, radius) {
    if (!points || points.length < 2) {
      return "";
    }

    var d = "M " + points[0].x + " " + points[0].y;
    for (var i = 1; i < points.length - 1; i += 1) {
      var previous = points[i - 1];
      var current = points[i];
      var next = points[i + 1];
      var r = Math.min(
        radius,
        distance(current, previous) / 2,
        distance(current, next) / 2
      );
      var before = toward(current, previous, r);
      var after = toward(current, next, r);
      d += " L " + before.x + " " + before.y;
      d += " Q " + current.x + " " + current.y + " " + after.x + " " + after.y;
    }

    var last = points[points.length - 1];
    d += " L " + last.x + " " + last.y;
    return d;
  }

  function drawRoute(button, number, animate) {
    if (
      !button ||
      !details.classList.contains("is-mounted") ||
      window.innerWidth <= 767
    ) {
      routeSvg.classList.remove("is-visible");
      return;
    }

    var shellRect = shell.getBoundingClientRect();
    var detailsRect = details.getBoundingClientRect();
    var mapRect = map.getBoundingClientRect();
    var buttonRect = button.getBoundingClientRect();
    var mapStyle = window.getComputedStyle(map);
    var columnGap = parseFloat(mapStyle.columnGap) || 12;
    var rowGap = parseFloat(mapStyle.rowGap) || 12;
    var svgWidth = shell.clientWidth;
    var svgHeight = Math.max(
      shell.scrollHeight,
      mapRect.bottom - shellRect.top + 70
    );

    routeSvg.setAttribute("viewBox", "0 0 " + svgWidth + " " + svgHeight);
    routeSvg.setAttribute("width", svgWidth);
    routeSvg.setAttribute("height", svgHeight);
    routeSvg.style.height = svgHeight + "px";

    var startX = detailsRect.left - shellRect.left + detailsRect.width / 2;
    var startY = detailsRect.bottom - shellRect.top - 1;
    var mapTop = mapRect.top - shellRect.top;
    var mapBottom = mapRect.bottom - shellRect.top;
    var targetLeft = buttonRect.left - shellRect.left;
    var targetRight = buttonRect.right - shellRect.left;
    var targetTop = buttonRect.top - shellRect.top;
    var targetBottom = buttonRect.bottom - shellRect.top;
    var targetCenterX = targetLeft + buttonRect.width / 2;
    var upperLaneY = mapTop - 42;
    var laneAbove = targetTop - rowGap / 2;
    var laneBelow = targetBottom + rowGap / 2;
    var points = [];

    if (number === "1") {
      points = [
        { x: startX, y: startY },
        { x: startX, y: upperLaneY },
        { x: targetCenterX, y: upperLaneY },
        { x: targetCenterX, y: targetTop },
      ];
    } else if (number === "2") {
      var verticalLane2 = targetLeft - columnGap / 2;
      points = [
        { x: startX, y: startY },
        { x: startX, y: upperLaneY },
        { x: verticalLane2, y: upperLaneY },
        { x: verticalLane2, y: laneAbove },
        { x: targetCenterX, y: laneAbove },
        { x: targetCenterX, y: targetTop },
      ];
    } else if (number === "3") {
      var verticalLane3 = targetLeft - columnGap / 2;
      points = [
        { x: startX, y: startY },
        { x: startX, y: upperLaneY },
        { x: verticalLane3, y: upperLaneY },
        { x: verticalLane3, y: laneAbove },
        { x: targetCenterX, y: laneAbove },
        { x: targetCenterX, y: targetTop },
      ];
    } else if (number === "4") {
      var verticalLane4 = targetLeft - columnGap / 2;
      points = [
        { x: startX, y: startY },
        { x: startX, y: upperLaneY },
        { x: verticalLane4, y: upperLaneY },
        { x: verticalLane4, y: laneBelow },
        { x: targetCenterX, y: laneBelow },
        { x: targetCenterX, y: targetBottom },
      ];
    } else if (number === "5") {
      var verticalLane5 = targetRight + columnGap / 2;
      points = [
        { x: startX, y: startY },
        { x: startX, y: upperLaneY },
        { x: verticalLane5, y: upperLaneY },
        { x: verticalLane5, y: laneAbove },
        { x: targetCenterX, y: laneAbove },
        { x: targetCenterX, y: targetTop },
      ];
    } else if (number === "6") {
      var verticalLane6 = targetLeft - columnGap / 2;
      var bottomLane = mapBottom + 26;
      points = [
        { x: startX, y: startY },
        { x: startX, y: upperLaneY },
        { x: verticalLane6, y: upperLaneY },
        { x: verticalLane6, y: bottomLane },
        { x: targetCenterX, y: bottomLane },
        { x: targetCenterX, y: targetBottom },
      ];
    }

    routePath.setAttribute("d", roundedPath(points, 10));
    routePath.setAttribute("stroke", foundationData[number].color);
    routePath.setAttribute("stroke-width", "8");
    routePath.setAttribute("stroke-linecap", "round");
    routePath.setAttribute("stroke-linejoin", "round");
    routeSvg.classList.add("is-visible");

    if (!animate || prefersReducedMotion()) {
      routePath.style.transition = "none";
      routePath.style.strokeDasharray = "none";
      routePath.style.strokeDashoffset = "0";
      return;
    }

    var length = routePath.getTotalLength();
    routePath.style.transition = "none";
    routePath.style.strokeDasharray = length + " " + length;
    routePath.style.strokeDashoffset = String(length);
    routePath.getBoundingClientRect();
    routePath.style.transition = "stroke-dashoffset 620ms ease-in-out";
    routePath.style.strokeDashoffset = "0";

    setTimeout(function () {
      if (activeFoundation !== number) {
        return;
      }
      routePath.style.transition = "none";
      routePath.style.strokeDasharray = "none";
      routePath.style.strokeDashoffset = "0";
    }, 650);
  }

  function closeFoundation() {
    if (revealTimer) {
      clearTimeout(revealTimer);
      revealTimer = null;
    }

    activeFoundation = null;
    clearButtons();
    details.classList.remove("is-visible");
    details.setAttribute("aria-hidden", "true");
    routeSvg.classList.remove("is-visible");
    routePath.style.transition = "none";
    routePath.style.strokeDasharray = "none";
    routePath.style.strokeDashoffset = "0";

    if (closeTimer) {
      clearTimeout(closeTimer);
    }

    closeTimer = setTimeout(function () {
      details.classList.remove("is-mounted");
      shell.classList.remove("is-active");
      closeTimer = null;
      scrollElementIntoView(mapWrap, "start");
    }, prefersReducedMotion() ? 0 : 330);
  }

  function selectFoundation(button) {
    var number = button.getAttribute("data-foundation");
    if (!foundationData[number]) {
      return;
    }

    markFoundationVisited(number);

    if (activeFoundation === number) {
      closeFoundation();
      return;
    }

    if (revealTimer) {
      clearTimeout(revealTimer);
      revealTimer = null;
    }
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    clearButtons();
    details.classList.remove("is-visible");
    routeSvg.classList.remove("is-visible");
    activeFoundation = number;
    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");
    button.setAttribute("aria-expanded", "true");
    fillDetails(number);
    details.classList.add("is-mounted");
    details.setAttribute("aria-hidden", "true");
    shell.classList.add("is-active");

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (activeFoundation !== number) {
          return;
        }

        drawRoute(button, number, true);

        revealTimer = setTimeout(
          function () {
            if (activeFoundation !== number) {
              return;
            }
            details.setAttribute("aria-hidden", "false");
            details.classList.add("is-visible");
            revealTimer = null;
            scrollElementIntoView(details, "center");
          },
          prefersReducedMotion() ? 0 : 680
        );
      });
    });
  }

  foundationButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectFoundation(button);
    });
  });

  if (detailsClose) {
    detailsClose.addEventListener("click", function () {
      if (activeFoundation) {
        closeFoundation();
      }
    });
  }

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (!activeFoundation) {
        return;
      }
      var button = root.querySelector(
        '.af-foundation-button[data-foundation="' + activeFoundation + '"]'
      );
      if (button) {
        drawRoute(button, activeFoundation, false);
      }
    }, 120);
  });

  (function initPersonalReflection() {
    var section = root.querySelector(".af-reflection");
    var textarea = root.querySelector("#af-reflection-text");
    var actionButton = root.querySelector("#af-reflection-action");
    var status = root.querySelector("#af-reflection-status");
    var REFLECTION_KEY = "athalta_unit1_foundations_reflection";
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
          return;
        }
      } catch (error) {
        try {
          var legacy = window.localStorage.getItem(REFLECTION_KEY);
          if (legacy) {
            textarea.value = legacy;
          }
        } catch (legacyError) {
          /* Ignore private-mode / blocked storage. */
        }
      }
    }

    loadState();

    textarea.addEventListener("input", function () {
      if (isLocked) {
        return;
      }

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

      if (!persistState()) {
        setStatus("לא ניתן לשמור כרגע. נסו שוב מאוחר יותר.");
        return;
      }

      applyMode(true, { announceSave: true, focus: "button" });
      persistState();
    });
  })();
})();
