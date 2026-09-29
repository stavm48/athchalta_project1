/**
 * Mobile tap target for Vimeo iframes and catalog videos.
 * A transparent button covers the player until the first tap, then steps aside
 * so the player controls can be used.
 */
(function initMobileVideoPlay() {
  function play(frame, button, event) {
    if (!frame || frame.classList.contains("is-playing")) {
      return;
    }
    if (event) {
      event.preventDefault();
    }

    var iframe = frame.querySelector("iframe");
    var video = frame.querySelector("video");

    if (iframe && !iframe.hidden && iframe.getAttribute("src") && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
    } else if (video && !video.hidden && typeof video.play === "function") {
      video.play();
    }

    frame.classList.add("is-playing");
    if (button) {
      button.hidden = true;
    }
  }

  function bind(button) {
    var frame = button.parentElement;
    if (!frame || button.getAttribute("data-mobile-play") === "true") {
      return;
    }
    button.setAttribute("data-mobile-play", "true");
    button.addEventListener("pointerup", function (event) {
      play(frame, button, event);
    });
    button.addEventListener("click", function (event) {
      play(frame, button, event);
    });
  }

  document.querySelectorAll(".as-video-play").forEach(bind);

  window.athaltaMobileVideo = {
    reset: function (frame) {
      if (!frame) {
        return;
      }
      var button = frame.querySelector(".as-video-play");
      frame.classList.remove("is-playing");
      if (button) {
        button.hidden = false;
        bind(button);
      }
    }
  };
})();
