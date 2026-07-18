/* ============================================================
   Luke To — personal site behavior
   - Smooth scroll for nav links, scroll reveal/spy, back-to-top.
   All respect prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function initSmoothScroll() {
    var links = document.querySelectorAll('.site-nav a[href^="#"]');
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });
        // Move keyboard focus to the section for accessibility.
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /**
   * Fade + slide sections and entries into view as they're scrolled to.
   * Skipped entirely under reduced motion (elements just stay visible).
   */
  function initScrollReveal() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    var targets = document.querySelectorAll(
      ".section, .entry, .contact"
    );
    if (!targets.length) return;

    // Apply the hidden starting state only now that we know JS + motion are on.
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("reveal");
    });

    var revealedAny = false;

    function reveal(el) {
      el.classList.add("is-visible");
      revealedAny = true;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    Array.prototype.forEach.call(targets, function (el, i) {
      // small stagger for elements that share a container
      el.style.transitionDelay = (i % 6) * 40 + "ms";
      observer.observe(el);
    });

    // Failsafe: if nothing has revealed shortly after load, the observer is
    // likely not firing (paused/broken) — reveal everything so content is
    // never left invisible behind an animation that can't run.
    window.setTimeout(function () {
      if (revealedAny) return;
      observer.disconnect();
      Array.prototype.forEach.call(targets, function (el) {
        el.style.transitionDelay = "0ms";
        el.classList.add("is-visible");
      });
    }, 2500);
  }

  /**
   * Highlight the nav link for whichever section is currently in view.
   */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;

    var links = Array.prototype.slice.call(
      document.querySelectorAll('.site-nav a[href^="#"]')
    );
    var byId = {};
    links.forEach(function (link) {
      byId[link.getAttribute("href").slice(1)] = link;
    });

    var sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("active", link === byId[id]);
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        // pick the entry nearest the top that is intersecting
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    Array.prototype.forEach.call(sections, function (s) {
      observer.observe(s);
    });
  }

  /**
   * Show the back-to-top button after the user scrolls down; scroll up on click.
   */
  function initToTop() {
    var btn = document.querySelector(".to-top");
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle("show", window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSmoothScroll();
    initScrollReveal();
    initScrollSpy();
    initToTop();
  });
})();
