/**
 * Unit 4 — Page 1: עקרונות לכתיבת סילבוס למחנכות כיתה חדשות.
 * Marks Unit 3 complete, records this page as viewed, and embeds
 * Vimeo players inside the syllabus video cards.
 */

if (window.athaltaProgress) {
  window.athaltaProgress.markUnitAsCompleted(3);
  window.athaltaProgress.markPageAsViewed(4, "syllabus");
}

function buildVimeoEmbedUrl(url) {
  if (!url) {
    return "";
  }

  var cleanUrl = String(url).trim();
  var videoIdMatch = cleanUrl.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);

  if (!videoIdMatch) {
    return "";
  }

  var videoId = videoIdMatch[1];
  var hashMatch = cleanUrl.match(/[?&]h=([a-zA-Z0-9]+)/);
  var privateHashMatch = cleanUrl.match(/vimeo\.com\/\d+\/([a-zA-Z0-9]+)/);
  var hash = hashMatch
    ? hashMatch[1]
    : privateHashMatch
      ? privateHashMatch[1]
      : "";

  var embedUrl = "https://player.vimeo.com/video/" + videoId + "?autoplay=1";

  if (hash) {
    embedUrl += "&h=" + encodeURIComponent(hash);
  }

  return embedUrl;
}

(function initAthaltaSyllabusPage() {
  var root = document.getElementById("athalta-syllabus-page");
  var modal = document.getElementById("as-dev-modal");
  var lastFocused = null;

  if (!root) {
    return;
  }

  function openDevModal() {
    if (!modal) {
      return;
    }

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("as-modal-open");

    var confirm = modal.querySelector(".as-modal-confirm");
    if (confirm) {
      confirm.focus();
    }
  }

  function closeDevModal() {
    if (!modal) {
      return;
    }

    modal.hidden = true;
    document.body.classList.remove("as-modal-open");

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target && event.target.hasAttribute("data-as-close")) {
        closeDevModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) {
        closeDevModal();
      }
    });
  }

  var cards = Array.prototype.slice.call(
    root.querySelectorAll(".as-video-card")
  );

  cards.forEach(function (card) {
    var playButton = card.querySelector(".as-video-play");
    var videoFrame = card.querySelector(".as-video-frame");
    var videoTitle = card.querySelector(".as-video-title");

    if (!playButton || !videoFrame || !videoTitle) {
      return;
    }

    playButton.addEventListener("click", function () {
      var embedUrl = buildVimeoEmbedUrl(
        card.getAttribute("data-vimeo-url") || ""
      );

      if (!embedUrl) {
        openDevModal();
        return;
      }

      var iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = videoTitle.textContent.replace(/\s+/g, " ").trim();
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("loading", "lazy");

      videoFrame.innerHTML = "";
      videoFrame.appendChild(iframe);
      videoFrame.hidden = false;
      card.classList.add("is-playing");
    });
  });
})();
