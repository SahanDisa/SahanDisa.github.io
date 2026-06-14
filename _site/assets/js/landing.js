/* Landing page interactions: particle network, typed roles, scroll reveal */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------
     Edge-to-edge breakout width (excludes scrollbar gutter that 100vw
     includes, so full-bleed sections don't leave an edge gap)
     ---------------------------------------------------------------- */
  var setViewportWidth = function () {
    document.documentElement.style.setProperty("--vw", document.documentElement.clientWidth + "px");
  };
  setViewportWidth();
  window.addEventListener("resize", setViewportWidth);

  /* ----------------------------------------------------------------
     Typed role rotator
     ---------------------------------------------------------------- */
  var typedEl = document.getElementById("typed-roles");
  if (typedEl) {
    var roles = [
      "Data Scientist",
      "ML / GNN Researcher",
      "MLOps Engineer",
      "Reinforcement Learning Enthusiast",
      "Open-Source Contributor"
    ];

    if (reduceMotion) {
      typedEl.textContent = roles[0];
    } else {
      var roleIndex = 0;
      var charIndex = 0;
      var deleting = false;

      var tick = function () {
        var current = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1600);
            return;
          }
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }

        setTimeout(tick, deleting ? 35 : 65);
      };

      tick();
    }
  }

  /* ----------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------------
     Smooth scroll for in-page anchors
     ---------------------------------------------------------------- */
  document.querySelectorAll('.landing a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  });

  /* ----------------------------------------------------------------
     Particle network background (hero canvas)
     ---------------------------------------------------------------- */
  var canvas = document.getElementById("network-canvas");
  if (!canvas || reduceMotion) return;

  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;
  var nodes = [];
  var NODE_COUNT = 60;
  var MAX_DIST = 140;

  function resize() {
    var oldWidth = canvas.width;
    var oldHeight = canvas.height;
    var newWidth = hero.offsetWidth;
    var newHeight = hero.offsetHeight;

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Re-distribute existing nodes proportionally so they don't end up
    // clustered in a corner when the viewport is resized (e.g. fullscreen).
    if (oldWidth && oldHeight && nodes.length) {
      var scaleX = newWidth / oldWidth;
      var scaleY = newHeight / oldHeight;
      nodes.forEach(function (n) {
        n.x *= scaleX;
        n.y *= scaleY;
      });
    }
  }

  function init() {
    resize();
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      });
    }
  }

  var resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      for (var j = i + 1; j < nodes.length; j++) {
        var m = nodes[j];
        var dx = n.x - m.x;
        var dy = n.y - m.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          ctx.strokeStyle = "rgba(34, 211, 238, " + (1 - dist / MAX_DIST) * 0.18 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(139, 92, 246, 0.6)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  init();
  step();
})();
