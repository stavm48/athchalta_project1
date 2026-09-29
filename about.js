/* About (אודות) modal. Opened from the header and footer nav. */
(function () {
  if (window.athaltaAbout) {
    return;
  }

  function sitePrefix() {
    var el = document.currentScript;
    var scripts;
    var src = "";
    if (!el) {
      scripts = document.getElementsByTagName("script");
      el = scripts[scripts.length - 1];
    }
    src = (el && el.getAttribute && el.getAttribute("src")) || "";
    src = src.split("?")[0].replace(/\\/g, "/");
    if (src && src.charAt(0) !== "/" && !/^https?:\/\//i.test(src)) {
      return src.replace(/[^/]*$/, "") || "./";
    }
    if (window.ATHALTA_ROOT) {
      return window.ATHALTA_ROOT;
    }
    return "./";
  }

  var ROOT = sitePrefix();
  var lastTrigger = null;

  function modalHtml() {
    return (
      '<dialog class="about-modal" id="about-modal" aria-labelledby="about-modal-title">' +
      '<div class="about-modal-scroll">' +
      '<button type="button" class="about-close" data-about-close aria-label="סגירה">×</button>' +
      '<img class="about-logo-mark" src="' +
      ROOT +
      'assets/home/finalLogo.png" alt="אתחלתא" width="481" height="148" />' +
      '<h2 class="about-title" id="about-modal-title">אודות מרחב הלמידה - מ׳אתחלה</h2>' +
      '<p class="about-vision">המרחב מיועד לתהליכי כניסה לתפקיד (Onboarding) ותמיכה מקצועית, ומרכז עבור בעלי ובעלות התפקידים בתוכנית אתחלתא את כלל חומרי הקליטה וההדרכה באופן נגיש, מדויק ומותאם&nbsp;לצרכים.</p>' +
      '<ul class="about-credits">' +
      "<li><strong>פותח עבור:</strong> תוכנית אתחלתא, מכון מופ\"ת.</li>" +
      "<li><strong>שמות הסטודנטיות:</strong> שחר סביר, סתו מרום.</li>" +
      "<li><strong>הנחיה אקדמית:</strong> ד\"ר לילך גל, קרן כהן.</li>" +
      "<li><strong>מסגרת אקדמית:</strong> " +
      '<a class="about-faculty-link" href="https://www.hit.ac.il/academic/instructional-technologies/" target="_blank" rel="noopener noreferrer">הפקולטה לטכנולוגיות למידה</a>' +
      " (HIT), המכון הטכנולוגי חולון, <span class=\"about-tech-end\">תשפ\"ו (2026).</span></li>" +
      "</ul>" +
      '<p class="about-tech">המרחב והגרפיקות המוצגות בו פותחו ונערכו בשילוב כלי הבינה המלאכותית Cursor, Gemini <span class="about-tech-end">ו-ChatGPT.</span></p>' +
      '<div class="about-logos">' +
      '<a href="https://www.hit.ac.il/academic/instructional-technologies/" target="_blank" rel="noopener noreferrer">' +
      '<img src="' +
      ROOT +
      'assets/general/hit-logo.png" alt="לוגו המכון הטכנולוגי חולון" />' +
      "</a>" +
      '<a href="https://www.hit.ac.il/academic/instructional-technologies/" target="_blank" rel="noopener noreferrer">' +
      '<img src="' +
      ROOT +
      'assets/general/telem-logo.png" alt="לוגו הפקולטה לטכנולוגיות למידה" />' +
      "</a>" +
      "</div>" +
      "</div>" +
      "</dialog>"
    );
  }

  function dialogEl() {
    var existing = document.getElementById("about-modal");
    if (existing) {
      return existing;
    }
    var holder = document.createElement("div");
    holder.innerHTML = modalHtml();
    var dialog = holder.firstChild;
    document.body.appendChild(dialog);
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeAbout();
      }
    });
    dialog.addEventListener("close", function () {
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    });
    dialog.addEventListener("cancel", function () {
      /* Native Escape closes the dialog and then fires close. */
    });
    return dialog;
  }

  function closeAbout() {
    var dialog = document.getElementById("about-modal");
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  function openAbout(trigger) {
    var dialog = dialogEl();
    if (dialog.open) {
      return;
    }
    lastTrigger = trigger || null;
    var toggle = document.getElementById("nav-toggle");
    if (toggle) {
      toggle.checked = false;
    }
    dialog.showModal();
  }

  document.addEventListener("click", function (event) {
    var openBtn = event.target.closest("[data-about-open]");
    if (openBtn) {
      event.preventDefault();
      openAbout(openBtn);
      return;
    }
    if (event.target.closest("[data-about-close]")) {
      event.preventDefault();
      closeAbout();
    }
  });

  window.athaltaAbout = { open: openAbout, close: closeAbout };
})();
