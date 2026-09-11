/* ===================================================================
   Athalta — Shared Header / Footer loader.
   Include with <script src="/components.js"></script> from any page,
   after placing:
     <div id="global-header"></div>
     <div id="global-footer"></div>
   in the page markup. All asset/link paths below are root-absolute
   (start with "/") so this works identically no matter how deep the
   consuming page is nested, and regardless of whether the page's URL
   was opened with or without a trailing slash.
   =================================================================== */

(function () {
  var HEADER_HTML =
    '<header class="site-header">' +
    '<div class="header-inner">' +
    '<a class="logo" href="/index.html">' +
    '<img src="/assets/home/athalta.png" alt="אתחלתא" width="164" height="50" />' +
    "</a>" +
    '<input id="nav-toggle" class="nav-toggle" type="checkbox" />' +
    '<label class="nav-toggle-btn" for="nav-toggle" aria-label="פתיחת תפריט">' +
    "<span></span><span></span><span></span>" +
    "</label>" +
    '<nav class="main-nav" aria-label="ניווט ראשי">' +
    '<a href="/index.html">ראשי</a>' +
    '<a href="/navigation/navigation.html" class="active-nav-link" aria-current="page">הסביבה שלי</a>' +
    '<a href="/index.html#learning">כניסה לתפקיד</a>' +
    "</nav>" +
    '<div class="header-actions">' +
    '<a href="/index.html#contact" aria-label="דואר"><img src="/assets/icon-mail.png" alt="" width="28" height="29" /></a>' +
    '<a href="/index.html#contact" aria-label="הודעות"><img src="/assets/icon-message.png" alt="" width="21" height="20" /></a>' +
    '<a href="/index.html#contact" aria-label="התראות"><img src="/assets/icon-bell.png" alt="" width="27" height="26" /></a>' +
    '<button class="icon-btn" type="button" aria-label="חיפוש"><img src="/assets/icon-search.png" alt="" width="30" height="30" /></button>' +
    '<button class="user-btn" type="button" aria-label="פרופיל"><img src="/assets/icon-user.png" alt="" width="38" height="38" /><span class="user-caret" aria-hidden="true"></span></button>' +
    "</div>" +
    "</div>" +
    "</header>";

  var FOOTER_HTML =
    '<footer class="site-footer" id="contact">' +
    '<div class="footer-grid">' +
    '<div class="footer-brand">' +
    '<img src="/assets/home/athalta.png" alt="אתחלתא" />' +
    '<p class="footer-tagline">אתחלתא | חממה למחנכות ומחנכי כיתה חדשים</p>' +
    '<p class="footer-support">לשאלות, בירורים או צורך בתמיכה, מוזמנים ומוזמנות לפנות אלינו:</p>' +
    '<a class="footer-email" href="mailto:athalta@macam.ac.il"><img src="/assets/icon-mail-dark.png" alt="" width="18" height="14" />athalta@macam.ac.il</a>' +
    "</div>" +
    '<nav class="footer-nav" aria-label="ניווט תחתון">' +
    '<a href="/index.html">ראשי</a>' +
    '<a href="/navigation/navigation.html" class="active-nav-link" aria-current="page">הסביבה שלי</a>' +
    '<a href="/index.html#learning">כניסה לתפקיד</a>' +
    "</nav>" +
    '<div class="footer-partners">' +
    '<img class="logo-mofet" src="/assets/general/mofetLogo.png" alt="לוגו מכון מופת" />' +
    '<img class="logo-leon" src="/assets/general/leonFamilyLogo.png" alt="לוגו קרן משפחת ליאון" />' +
    '<img class="logo-hinuch" src="/assets/general/hinuchLogo.png" alt="לוגו משרד החינוך" />' +
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
})();
