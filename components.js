/* ===================================================================
   Athalta — Shared Header / Footer loader.
   Include with <script src="../components.js"></script> (or ./ from root)
   after placing:
     <div id="global-header"></div>
     <div id="global-footer"></div>
   Asset and nav URLs are resolved from this script's folder (the site
   root) so they work from index.html and from nested unit pages,
   including when the site is hosted in a subdirectory.
   =================================================================== */

(function () {
  function sitePrefix() {
    var el = document.currentScript;
    var scripts;
    var src = "";
    var path;
    if (!el) {
      scripts = document.getElementsByTagName("script");
      el = scripts[scripts.length - 1];
    }
    src = (el && el.getAttribute && el.getAttribute("src")) || "";
    src = src.split("?")[0].replace(/\\/g, "/");
    if (src && src.charAt(0) !== "/" && !/^https?:\/\//i.test(src)) {
      return src.replace(/[^/]*$/, "") || "./";
    }
    path = (window.location.pathname || "").replace(/\\/g, "/");
    if (/\/(unit[1-7]|navigation)\/[^/]*$/i.test(path)) {
      return "../";
    }
    return "./";
  }

  var ROOT = sitePrefix();
  var pagePath = (window.location.pathname || "").replace(/\\/g, "/");
  var onRoadmap = /\/navigation\/navigation\.html$/i.test(pagePath);
  var onCatalog = /\/unit4\/page7\.html$/i.test(pagePath);
  var onMeetings = /\/unit7\/page2\.html$/i.test(pagePath);

  function currentAttrs(isCurrent) {
    return isCurrent ? ' class="active-nav-link" aria-current="page"' : "";
  }

  var roadmapAttrs = currentAttrs(onRoadmap);
  var catalogAttrs = currentAttrs(onCatalog);
  var meetingsAttrs = currentAttrs(onMeetings);

  var HEADER_HTML =
    '<header class="site-header">' +
    '<div class="header-inner">' +
    '<a class="logo" href="' +
    ROOT +
    'index.html">' +
    '<img src="' +
    ROOT +
    'assets/home/athalta.png" alt="אתחלתא" width="164" height="50" />' +
    "</a>" +
    '<input id="nav-toggle" class="nav-toggle" type="checkbox" />' +
    '<label class="nav-toggle-btn" for="nav-toggle" aria-label="פתיחת תפריט">' +
    "<span></span><span></span><span></span>" +
    "</label>" +
    '<nav class="main-nav" aria-label="ניווט ראשי">' +
    '<a href="' +
    ROOT +
    'index.html">ראשי</a>' +
    '<a href="' +
    ROOT +
    'navigation/navigation.html"' +
    roadmapAttrs +
    '>מפת הדרך שלי</a>' +
    '<a href="' +
    ROOT +
    'unit4/page7.html"' +
    catalogAttrs +
    '>קטלוג חומרים</a>' +
    '<a href="' +
    ROOT +
    'unit7/page2.html"' +
    meetingsAttrs +
    '>מתווה מפגשים</a>' +
    '<button type="button" class="about-nav-trigger" data-about-open>אודות</button>' +
    "</nav>" +
    "</div>" +
    "</header>";

  var FOOTER_HTML =
    '<footer class="site-footer" id="contact">' +
    '<div class="footer-grid">' +
    '<div class="footer-brand">' +
    '<img src="' +
    ROOT +
    'assets/home/athalta.png" alt="אתחלתא" />' +
    '<p class="footer-tagline">אתחלתא | חממה למחנכות ומחנכי כיתה חדשים</p>' +
    '<p class="footer-support">לשאלות, בירורים או צורך בתמיכה, מוזמנים ומוזמנות לפנות&nbsp;אלינו:</p>' +
    '<a class="footer-email" href="https://mail.google.com/mail/?view=cm&fs=1&to=athalta@macam.ac.il" target="_blank" rel="noopener noreferrer" aria-label="שליחת דוא״ל אל athalta@macam.ac.il">' +
    '<svg class="footer-email-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    "athalta@macam.ac.il</a>" +
    "</div>" +
    '<nav class="footer-nav" aria-label="ניווט תחתון">' +
    '<a href="' +
    ROOT +
    'index.html">ראשי</a>' +
    '<a href="' +
    ROOT +
    'navigation/navigation.html"' +
    roadmapAttrs +
    '>מפת הדרך שלי</a>' +
    '<a href="' +
    ROOT +
    'unit4/page7.html"' +
    catalogAttrs +
    '>קטלוג חומרים</a>' +
    '<a href="' +
    ROOT +
    'unit7/page2.html"' +
    meetingsAttrs +
    '>מתווה מפגשים</a>' +
    '<button type="button" class="about-nav-trigger" data-about-open>אודות</button>' +
    "</nav>" +
    '<div class="footer-partners">' +
    '<img class="logo-mofet" src="' +
    ROOT +
    'assets/general/mofetLogo.png" alt="לוגו מכון מופת" />' +
    '<img class="logo-leon" src="' +
    ROOT +
    'assets/general/leonFamilyLogo.png" alt="לוגו קרן משפחת ליאון" />' +
    '<img class="logo-hinuch" src="' +
    ROOT +
    'assets/general/hinuchLogo.png" alt="לוגו משרד החינוך" />' +
    "</div>" +
    "</div>" +
    "</footer>";

  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) {
      el.outerHTML = html;
    }
  }

  inject("global-header", HEADER_HTML);
  inject("global-footer", FOOTER_HTML);

  function appendScript(fileName, onload) {
    if (document.querySelector('script[src$="' + fileName + '"]')) {
      if (onload) {
        onload();
      }
      return;
    }
    var el = document.createElement("script");
    el.src = ROOT + fileName;
    el.async = false;
    if (onload) {
      el.onload = onload;
    }
    document.body.appendChild(el);
  }

  function loadSidebar() {
    if (!document.querySelector('link[href$="sidebar.css"]')) {
      var link = document.createElement("link");
      link.id = "athalta-sidebar-css";
      link.rel = "stylesheet";
      link.href = ROOT + "sidebar.css";
      document.head.appendChild(link);
    }

    function startSidebar() {
      if (window.athaltaSidebar || document.querySelector('script[src$="sidebar.js"]')) {
        return;
      }
      appendScript("sidebar.js");
    }

    appendScript("a11y.js", startSidebar);
  }

  loadSidebar();

  if (!document.querySelector('link[href$="about.css"]')) {
    var aboutCss = document.createElement("link");
    aboutCss.rel = "stylesheet";
    aboutCss.href = ROOT + "about.css";
    document.head.appendChild(aboutCss);
  }
  window.ATHALTA_ROOT = ROOT;
  appendScript("about.js");
})();
