/**
 * Unit 4 — Page 7: קטלוג החומרים של אתחלתא
 * Filterable materials catalog, video modal, and development notice.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markPageAsViewed(4, "catalog");
  window.athaltaProgress.markUnitAsCompleted(4);
}

(function () {
  "use strict";

  var introVideoUrl = "";

  var materials = [
    {
      name: "חמש פנים לאמון - סדנה",
      categories: ["סדנה", "כלי", "אפליקציה"],
      audience: "מנחות",
      additionalAudience: "מנהלות, מורות חונכות, מדפ״יות",
      foundations: ["מסוגלות", "מקצוענות וניהול עצמי"],
      roleComponents: ["קשר עם הורים", "ניהול עצמי, שימור עצמי ומניעת שחיקה"],
      fileType: "PDF, Base44, Google Forms",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23966",
      hasVideo: true,
      videoUrl:
        "https://player.vimeo.com/video/1229403853?h=122285ce0a&app_id=122963"
    },
    {
      name: "חמש פנים לאמון - אפליקצית מדד אמון",
      categories: ["אפליקציה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מנהלות, מורות חונכות, מדפ״יות, אקו-סיסטם כולו, גננות",
      foundations: ["מסוגלות", "מקצוענות וניהול עצמי", "זהות"],
      roleComponents: [],
      fileType: "",
      status: "",
      resourceUrl: "https://copy-2b9b4da0.base44.app/",
      hasVideo: true,
      videoUrl: ""
    },
    {
      name: "מניפת סיורים",
      categories: ["כלי"],
      audience: "מנחות",
      additionalAudience: "מנהלות",
      foundations: ["ביטוי עצמי ושייכות", "זהות"],
      roleComponents: ["חינוך לערכים והכיתה כקבוצה חברתית", "שוויון הזדמנויות"],
      fileType: "PDF להדפסה",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23989",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "צ'אט בוט תכנון סיורים",
      categories: ["אפליקציה"],
      audience: "מנחות",
      additionalAudience: "",
      foundations: ["כולם"],
      roleComponents: [],
      fileType: "",
      status: "",
      resourceUrl:
        "https://chatgpt.com/g/g-67dfe0921964819198674d857d2753bd-bvt-tknvn-syvr-grsh-2",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "דומינו רעיונות - סדנה ומתודה",
      categories: ["כלי", "פרקטיקה", "סדנה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: ["ביטוי עצמי ושייכות", "זהות", "מקצוענות וניהול עצמי"],
      roleComponents: [
        "חינוך לערכים והכיתה כקבוצה חברתית",
        "שוויון הזדמנויות",
        "ראייה ותכלול הוליסטי של התלמיד"
      ],
      fileType: "PDF",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23990",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "כל הכיתה כל הזמן",
      categories: ["סדנה", "פרקטיקה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מורות חונכות, מדפ״יות",
      foundations: ["ביטוי עצמי ושייכות", "מסוגלות", "מקצוענות וניהול עצמי"],
      roleComponents: ["שוויון הזדמנויות"],
      fileType: "מצגת PDF",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23984",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "רשת הקשרים",
      categories: ["כלי", "אפליקציה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מורות חונכות, מדפ״יות, מנהלות",
      foundations: ["ביטוי עצמי ושייכות", "זהות", "מקצוענות וניהול עצמי"],
      roleComponents: ["עבודה עם שותפי תפקיד"],
      fileType: "Base44, PDF",
      status: "דורש עדכון",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23967",
      hasVideo: true,
      videoUrl:
        "https://player.vimeo.com/video/1229403849?h=b8571bbabf&app_id=122963"
    },
    {
      name: "ללמוד להיות מחנכת כיתה",
      categories: ["כלי", "אפליקציה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מנהלות, מורות חונכות, מדפ״יות",
      foundations: [
        "ביטוי עצמי ושייכות",
        "שליחות ומשמעות",
        "זהות",
        "מסוגלות",
        "מקצוענות וניהול עצמי"
      ],
      roleComponents: [
        "קשר עם הורים",
        "חינוך לערכים והכיתה כקבוצה חברתית",
        "ניהול עצמי, שימור עצמי ומניעת שחיקה",
        "עבודה עם שותפי תפקיד",
        "ראייה ותכלול הוליסטי של התלמיד"
      ],
      fileType: "Genially, PDF",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23969",
      hasVideo: true,
      videoUrl:
        "https://player.vimeo.com/video/1229403846?h=455a9a1cb5&app_id=122963"
    },
    {
      name: "גלגל החיים של מחנכת הכיתה",
      categories: ["כלי", "סדנה", "אפליקציה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [
        "ביטוי עצמי ושייכות",
        "שליחות ומשמעות",
        "זהות",
        "מסוגלות",
        "מקצוענות וניהול עצמי"
      ],
      roleComponents: [
        "קשר עם הורים",
        "חינוך לערכים והכיתה כקבוצה חברתית",
        "ניהול עצמי, שימור עצמי ומניעת שחיקה",
        "שוויון הזדמנויות",
        "עבודה עם שותפי תפקיד",
        "ראייה ותכלול הוליסטי של התלמיד"
      ],
      fileType: "PDF",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23971",
      hasVideo: true,
      videoUrl:
        "https://player.vimeo.com/video/1229403859?h=6b5ae3e46a&app_id=122963"
    },
    {
      name: "נתיבי האתיקה של מחנכות כיתה",
      categories: ["משחק", "סדנה", "כלי"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מנהלות",
      foundations: [
        "שליחות ומשמעות",
        "זהות",
        "מקצוענות וניהול עצמי",
        "ביטוי עצמי ושייכות"
      ],
      roleComponents: [
        "חינוך לערכים והכיתה כקבוצה חברתית",
        "שוויון הזדמנויות",
        "ראייה ותכלול הוליסטי של התלמיד",
        "עבודה עם שותפי תפקיד"
      ],
      fileType: "PDF, משחק פיזי",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23976",
      hasVideo: true,
      videoUrl:
        "https://player.vimeo.com/video/1229403995?h=1f3bc94558&app_id=122963"
    },
    {
      name: "סלון פילוסופי – סדנת משמעות",
      categories: ["פרקטיקה", "סדנה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: ["שליחות ומשמעות", "זהות", "ביטוי עצמי ושייכות"],
      roleComponents: ["חינוך לערכים והכיתה כקבוצה חברתית"],
      fileType: "PDF",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23972",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "ניעור מוחות למחנכת הכיתה",
      categories: ["פרקטיקה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "",
      foundations: ["כולם"],
      roleComponents: ["כולם"],
      fileType: "Canva, PDF",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=23973",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "שליטה בלמידה מרחוק",
      categories: ["מפגש מקוון"],
      audience: "מחנכות כיתה",
      additionalAudience: "מורות חונכות, מדפ״יות",
      foundations: ["מקצוענות וניהול עצמי", "ביטוי עצמי ושייכות", "מסוגלות"],
      roleComponents: [
        "חינוך לערכים והכיתה כקבוצה חברתית",
        "שוויון הזדמנויות",
        "ראייה ותכלול הוליסטי של התלמיד"
      ],
      fileType: "מפגשים מקוונים",
      status: "פורסם",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מודלי הפעלה של חממות",
      categories: ["מסמך"],
      audience: "מנחות",
      additionalAudience: "",
      foundations: [],
      roleComponents: [],
      fileType: "מסמך",
      status: "פורסם",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מסמך מודל אתחלתא - מלא",
      categories: ["מסמך"],
      audience: "מנחות",
      additionalAudience: "",
      foundations: [],
      roleComponents: [],
      fileType: "מסמך",
      status: "פורסם",
      resourceUrl: "https://moodle.macam.ac.il/mod/resource/view.php?id=23469",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מסמך מודל אתחלתא - מקוצר (תוכן)",
      categories: ["מסמך"],
      audience: "מנחות",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [],
      roleComponents: [],
      fileType: "",
      status: "",
      resourceUrl:
        "https://drive.google.com/drive/folders/1pSfaa3FzXcoKOgglK1Cpm9PcLGanZ0nQ",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מחקר אתחלתא: אינטר־סובייקטיביות במעורבות הורים",
      categories: ["מחקר"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [],
      roleComponents: [],
      fileType: "מחקר",
      status: "פורסם",
      resourceUrl:
        "https://drive.google.com/file/d/1qXWOC-QqLT97N-bzgnESejtILPTFOxSu/view",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מחקר אתחלתא: אקוסיסטם של חוסן",
      categories: ["מחקר"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [],
      roleComponents: [],
      fileType: "מחקר",
      status: "פורסם",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "סוגיות אתחלתא",
      categories: ["מסמך"],
      audience: "מנחות",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [],
      roleComponents: [],
      fileType: "מסמך",
      status: "פורסם",
      resourceUrl: "https://ebook.macam.ac.il/read/6/101220243",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מאמר תשפ״ה - אתגרים של מחנכות כיתה חדשות",
      categories: ["מאמר"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [],
      roleComponents: [],
      fileType: "מאמר",
      status: "פורסם",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מאמר תשפ״ו - יסודות אתחלתא",
      categories: ["מאמר"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "אקו-סיסטם כולו",
      foundations: [],
      roleComponents: [],
      fileType: "",
      status: "בתהליך",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "מערכת שעות והפוטנציאל הרגשי/חברתי הטמון בה",
      categories: ["סדנה", "כלי", "פרקטיקה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מורות חונכות, גננות",
      foundations: [
        "מקצוענות וניהול עצמי",
        "מסוגלות",
        "זהות",
        "ביטוי עצמי ושייכות"
      ],
      roleComponents: [],
      fileType: "",
      status: "פורסם",
      resourceUrl:
        "https://lionff.com/pedagogic-tools/%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA-%D7%A9%D7%A2%D7%95%D7%AA-%D7%95%D7%94%D7%A4%D7%95%D7%A0%D7%98%D7%A6%D7%99%D7%90%D7%9C-%D7%94%D7%97%D7%91%D7%A8%D7%AA%D7%99-%D7%A8%D7%92%D7%A9%D7%99-%D7%94%D7%98%D7%9E-2/",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "המחנכת כמובילת קהילת משמעות",
      categories: ["סדנה"],
      audience: "מנחות ומחנכות כיתה",
      additionalAudience: "מנהלות, מורות חונכות",
      foundations: ["ביטוי עצמי ושייכות", "מסוגלות", "זהות", "שליחות ומשמעות"],
      roleComponents: [
        "חינוך לערכים והכיתה כקבוצה חברתית",
        "שוויון הזדמנויות",
        "ראייה ותכלול הוליסטי של התלמיד"
      ],
      fileType: "",
      status: "דורש עדכון",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "גלגל החיים לחונכים",
      categories: ["סדנה", "כלי", "פרקטיקה"],
      audience: "מחנכות כיתה",
      additionalAudience: "מורות חונכות",
      foundations: ["כולם"],
      roleComponents: ["כולם"],
      fileType: "",
      status: "דורש עדכון",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "ערכה קליטה למנהל (סיגלית וינוקור) - אחווה",
      categories: ["כלי", "מסמך", "אפליקציה"],
      audience: "מנהלות, אקו-סיסטם כולו",
      additionalAudience: "",
      foundations: [],
      roleComponents: ["כולם"],
      fileType: "",
      status: "פורסם",
      resourceUrl: "",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "בין עשייה לזהות",
      categories: ["סדנה", "פרקטיקה"],
      audience: "",
      additionalAudience: "",
      foundations: [],
      roleComponents: [],
      fileType: "",
      status: "",
      resourceUrl: "https://moodle.macam.ac.il/course/view.php?id=505#section-11",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "האם זה בשבילי? - סדנת מסוגלות",
      categories: ["סדנה"],
      audience: "",
      additionalAudience: "",
      foundations: [],
      roleComponents: [],
      fileType: "",
      status: "",
      resourceUrl: "https://moodle.macam.ac.il/mod/resource/view.php?id=24893",
      hasVideo: false,
      videoUrl: ""
    },
    {
      name: "צימוד כפוי",
      categories: ["פרקטיקה"],
      audience: "",
      additionalAudience: "",
      foundations: [],
      roleComponents: [],
      fileType: "",
      status: "",
      resourceUrl: "https://moodle.macam.ac.il/mod/page/view.php?id=24344",
      hasVideo: false,
      videoUrl: ""
    }
  ];

  var foundationOrder = [
    "ביטוי עצמי ושייכות",
    "מקצוענות וניהול עצמי",
    "זהות",
    "מסוגלות",
    "שותפויות",
    "שליחות ומשמעות"
  ];

  var catalog = document.querySelector(".athchalta-tools-catalog");
  if (!catalog) {
    return;
  }

  var searchInput = catalog.querySelector(".atc-search");
  var searchClear = catalog.querySelector(".atc-search-clear");
  var categorySelect = catalog.querySelector(".atc-category");
  var foundationSelect = catalog.querySelector(".atc-foundation");
  var roleSelect = catalog.querySelector(".atc-role");
  var resetButton = catalog.querySelector(".atc-reset");
  var emptyReset = catalog.querySelector(".atc-empty-reset");
  var grid = catalog.querySelector(".atc-grid");
  var results = catalog.querySelector(".atc-results");
  var emptyState = catalog.querySelector(".atc-empty");
  var openingVideoSection = catalog.querySelector(".atc-opening-video-section");
  var openingVideo = catalog.querySelector(".atc-opening-video");
  var videoModal = catalog.querySelector(".atc-video-modal");
  var videoBackdrop = catalog.querySelector(".atc-video-modal-backdrop");
  var modalVideo = catalog.querySelector(".atc-modal-video");
  var modalIframe = catalog.querySelector(".atc-modal-iframe");
  var modalTitle = catalog.querySelector(".atc-video-modal-title");
  var videoClose = catalog.querySelector(".atc-video-close");
  var lastVideoTrigger = null;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeText(value) {
    return String(value || "")
      .replace(/[״”"]/g, '"')
      .replace(/[׳’]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function hasUsableUrl(url) {
    var value = String(url || "").trim();
    if (!value) {
      return false;
    }
    if (/^https?:\/\//i.test(value)) {
      return true;
    }
    if (/^(\.\/|\.\.\/|\/)/.test(value)) {
      return true;
    }
    return /\.(pdf|docx?|pptx?|xlsx?|mp4|webm)$/i.test(value);
  }

  function initialiseOpeningVideo() {
    if (!hasUsableUrl(introVideoUrl)) {
      openingVideoSection.hidden = true;
      return;
    }
    openingVideo.src = introVideoUrl;
    openingVideoSection.hidden = false;
  }

  function foundationClass(foundation) {
    switch (foundation) {
      case "ביטוי עצמי ושייכות":
        return "atc-foundation-belonging";
      case "מקצוענות וניהול עצמי":
        return "atc-foundation-professional";
      case "זהות":
        return "atc-foundation-identity";
      case "מסוגלות":
        return "atc-foundation-capability";
      case "שותפויות":
        return "atc-foundation-partnership";
      case "שליחות ומשמעות":
        return "atc-foundation-purpose";
      default:
        return "atc-foundation-all";
    }
  }

  function buildTypeTags(material) {
    return (material.categories || [])
      .map(function (category) {
        return '<span class="atc-type-tag">' + escapeHtml(category) + "</span>";
      })
      .join("");
  }

  function buildFoundationBlock(material) {
    var foundations = material.foundations || [];
    if (!foundations.length) {
      return "";
    }

    var tags;
    if (foundations.indexOf("כולם") !== -1) {
      tags =
        '<span class="atc-foundation-tag atc-foundation-all">כל היסודות</span>';
    } else {
      tags = foundations
        .map(function (foundation) {
          return (
            '<span class="atc-foundation-tag ' +
            foundationClass(foundation) +
            '">' +
            escapeHtml(foundation) +
            "</span>"
          );
        })
        .join("");
    }

    return (
      '<div class="atc-info-block">' +
      '<span class="atc-info-label">יסודות אתחלתא</span>' +
      '<div class="atc-tag-list">' +
      tags +
      "</div>" +
      "</div>"
    );
  }

  function buildRoleComponentsBlock(material) {
    var components = material.roleComponents || [];
    if (!components.length) {
      return "";
    }

    var tags;
    if (components.indexOf("כולם") !== -1) {
      tags = '<span class="atc-role-tag">כל מרכיבי התפקיד</span>';
    } else {
      tags = components
        .map(function (component) {
          return '<span class="atc-role-tag">' + escapeHtml(component) + "</span>";
        })
        .join("");
    }

    return (
      '<div class="atc-info-block">' +
      '<span class="atc-info-label">מרכיבי תפקיד</span>' +
      '<div class="atc-tag-list">' +
      tags +
      "</div>" +
      "</div>"
    );
  }

  function buildAudience(material) {
    var audience = material.audience || material.additionalAudience || "";
    if (!audience) {
      return "";
    }

    return (
      '<div class="atc-audience-block">' +
      '<span class="atc-audience-label">קהל יעד</span>' +
      '<span class="atc-audience-value">' +
      escapeHtml(audience) +
      "</span>" +
      "</div>"
    );
  }

  function buildActions(material) {
    var html = '<div class="atc-actions">';

    if (hasUsableUrl(material.resourceUrl)) {
      html +=
        '<a class="atc-resource-link" href="' +
        escapeHtml(material.resourceUrl) +
        '" target="_blank" rel="noopener noreferrer">לפתיחה</a>';
    } else {
      html +=
        '<span class="atc-resource-disabled" aria-disabled="true">לפתיחה</span>';
    }

    if (material.hasVideo) {
      var ready = hasUsableUrl(material.videoUrl);
      html +=
        '<button type="button" class="atc-video-button' +
        (ready ? "" : " atc-video-pending") +
        '" data-video-url="' +
        escapeHtml(material.videoUrl || "") +
        '" data-video-title="' +
        escapeHtml(material.name) +
        '">לצפייה בסרטון הסבר</button>';
    }

    html += "</div>";
    return html;
  }

  function buildCard(material) {
    return (
      '<article class="atc-card" role="listitem">' +
      '<div class="atc-card-top">' +
      '<h3 class="atc-card-title">' +
      escapeHtml(material.name) +
      "</h3>" +
      '<div class="atc-type-tags">' +
      buildTypeTags(material) +
      "</div>" +
      "</div>" +
      '<div class="atc-card-body">' +
      '<p class="atc-description">משאב שיכול להשתלב בתהליכי הלמידה וההנחיה בתוכנית.</p>' +
      buildFoundationBlock(material) +
      buildRoleComponentsBlock(material) +
      buildAudience(material) +
      buildActions(material) +
      "</div>" +
      "</article>"
    );
  }

  function populateCategories() {
    var categories = [];
    materials.forEach(function (material) {
      (material.categories || []).forEach(function (category) {
        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
      });
    });
    categories.sort(function (a, b) {
      return a.localeCompare(b, "he");
    });
    categories.forEach(function (category) {
      var option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  function populateFoundations() {
    foundationOrder.forEach(function (foundation) {
      var option = document.createElement("option");
      option.value = foundation;
      option.textContent = foundation;
      foundationSelect.appendChild(option);
    });
  }

  function populateRoleComponents() {
    var roles = [];
    materials.forEach(function (material) {
      (material.roleComponents || []).forEach(function (role) {
        if (role === "כולם") {
          return;
        }
        if (roles.indexOf(role) === -1) {
          roles.push(role);
        }
      });
    });
    roles.sort(function (a, b) {
      return a.localeCompare(b, "he");
    });
    roles.forEach(function (role) {
      var option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      roleSelect.appendChild(option);
    });
  }

  function updateClearButton() {
    searchClear.hidden = searchInput.value.trim() === "";
  }

  function filterMaterials() {
    var searchValue = normalizeText(searchInput.value);
    var selectedCategory = categorySelect.value;
    var selectedFoundation = foundationSelect.value;
    var selectedRole = roleSelect.value;

    var filtered = materials.filter(function (material) {
      var searchableText = normalizeText(
        [
          material.name,
          (material.categories || []).join(" "),
          material.audience,
          material.additionalAudience,
          (material.foundations || []).join(" "),
          (material.roleComponents || []).join(" "),
          material.fileType,
          material.status
        ].join(" ")
      );

      var matchesSearch =
        searchValue === "" || searchableText.indexOf(searchValue) !== -1;
      var matchesCategory =
        selectedCategory === "" ||
        (material.categories || []).indexOf(selectedCategory) !== -1;
      var foundations = material.foundations || [];
      var matchesFoundation =
        selectedFoundation === "" ||
        foundations.indexOf("כולם") !== -1 ||
        foundations.indexOf(selectedFoundation) !== -1;
      var roles = material.roleComponents || [];
      var matchesRole =
        selectedRole === "" ||
        roles.indexOf("כולם") !== -1 ||
        roles.indexOf(selectedRole) !== -1;

      return matchesSearch && matchesCategory && matchesFoundation && matchesRole;
    });

    updateClearButton();
    render(filtered);
  }

  function render(list) {
    grid.innerHTML = list.map(buildCard).join("");

    if (list.length === materials.length) {
      results.textContent = "מציגים " + materials.length + " חומרים";
    } else {
      results.textContent =
        "מציגים " + list.length + " מתוך " + materials.length + " חומרים";
    }

    grid.hidden = list.length === 0;
    emptyState.hidden = list.length !== 0;
    initialiseVideoButtons();
  }

  function isVimeoUrl(url) {
    return /(?:player\.)?vimeo\.com/.test(String(url || ""));
  }

  function clearModalMedia() {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();
      modalVideo.hidden = true;
    }
    if (modalIframe) {
      modalIframe.removeAttribute("src");
      modalIframe.hidden = true;
    }
  }

  function openVideoModal(url, title, trigger) {
    if (!hasUsableUrl(url)) {
      return;
    }

    lastVideoTrigger = trigger || null;
    modalTitle.textContent = "סרטון הסבר | " + (title || "");
    clearModalMedia();

    if (isVimeoUrl(url) && modalIframe) {
      modalIframe.hidden = false;
      modalIframe.title = title || "סרטון הסבר";
      modalIframe.src = url;
    } else if (modalVideo) {
      modalVideo.hidden = false;
      modalVideo.src = url;
    }

    videoModal.hidden = false;
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    videoClose.focus();
  }

  function closeVideoModal() {
    clearModalMedia();
    videoModal.hidden = true;
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastVideoTrigger && document.contains(lastVideoTrigger)) {
      lastVideoTrigger.focus();
    }
    lastVideoTrigger = null;
  }

  function initialiseVideoButtons() {
    grid.querySelectorAll(".atc-video-button").forEach(function (button) {
      button.addEventListener("click", function () {
        var url = button.getAttribute("data-video-url");
        if (!hasUsableUrl(url)) {
          return;
        }
        openVideoModal(url, button.getAttribute("data-video-title"), button);
      });
    });
  }

  function clearSearch() {
    searchInput.value = "";
    updateClearButton();
    filterMaterials();
    searchInput.focus();
  }

  function resetFilters() {
    searchInput.value = "";
    categorySelect.value = "";
    foundationSelect.value = "";
    roleSelect.value = "";
    updateClearButton();
    filterMaterials();
    searchInput.focus();
  }

  searchInput.addEventListener("input", filterMaterials);
  searchClear.addEventListener("click", clearSearch);
  categorySelect.addEventListener("change", filterMaterials);
  foundationSelect.addEventListener("change", filterMaterials);
  roleSelect.addEventListener("change", filterMaterials);
  resetButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  videoClose.addEventListener("click", closeVideoModal);
  videoBackdrop.addEventListener("click", closeVideoModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !videoModal.hidden) {
      closeVideoModal();
    }
  });

  populateCategories();
  populateFoundations();
  populateRoleComponents();
  initialiseOpeningVideo();
  updateClearButton();
  render(materials);
})();
