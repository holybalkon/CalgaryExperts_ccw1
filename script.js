/* Calgary Window Compare: progressive enhancement only.
   All content exists in the HTML without this script. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var trigger = item.querySelector(".faq-trigger");
    if (!trigger) { return; }
    // Collapse after load; answers stay in the DOM (grid rows, never display:none).
    item.setAttribute("data-open", "false");
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", function () {
      var open = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", open ? "false" : "true");
      trigger.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  // Open a card's details block automatically when its sources hash is targeted.
  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target && target.closest) {
      var faq = target.closest(".faq-item");
      if (faq) {
        faq.setAttribute("data-open", "true");
        var t = faq.querySelector(".faq-trigger");
        if (t) { t.setAttribute("aria-expanded", "true"); }
      }
    }
  }
})();

/* Reviews carousel: native scroll-snap works without JS; this only adds the arrow buttons. */
(function () {
  "use strict";
  var wrappers = document.querySelectorAll(".g-reviews");
  Array.prototype.forEach.call(wrappers, function (box) {
    var track = box.querySelector(".g-track");
    var prev = box.querySelector(".g-prev");
    var next = box.querySelector(".g-next");
    if (!track || !prev || !next) { return; }
    function step() {
      var card = track.querySelector(".g-card");
      return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    }
    function update() {
      var scrollable = track.scrollWidth - track.clientWidth > 4;
      box.classList.toggle("has-scroll", scrollable);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();
