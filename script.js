// Flowmetric Labs — front-end interactions
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar shadow on scroll
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is tapped
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Contact form — front-end only
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var setInvalid = function (field, bad) {
      if (bad) field.classList.add("invalid");
      else field.classList.remove("invalid");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form__note";
      note.textContent = "";

      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];

      var bad = false;
      if (!name.value.trim()) { setInvalid(name, true); bad = true; } else setInvalid(name, false);
      if (!emailRe.test(email.value.trim())) { setInvalid(email, true); bad = true; } else setInvalid(email, false);
      if (!message.value.trim()) { setInvalid(message, true); bad = true; } else setInvalid(message, false);

      if (bad) {
        note.classList.add("error");
        note.textContent = "Please complete all fields with a valid email.";
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";

      // Simulate a request (no backend)
      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = orig;
        form.reset();
        note.classList.add("success");
        note.textContent = "Thanks — we'll reach out within one business day.";
      }, 700);
    });
  }
})();
