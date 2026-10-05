/* ==========================================================================
   main.js: rendering (from data.js), nav, theme, scroll effects,
   project lightbox and contact form.
   ========================================================================== */

(() => {
  "use strict";

  const D = window.PORTFOLIO_DATA;
  if (!D) {
    console.error("data.js did not load before main.js");
    return;
  }

  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Lets the CSS hide .reveal elements only when JS is able to show them again
  root.classList.add("js");

  /* ------------------------------------------------------------------
     Helpers: inline SVG icons (Lucide-style paths) and HTML escaping
     ------------------------------------------------------------------ */
  const ICONS = {
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    gitlab:
      '<path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    prev: '<path d="m15 18-6-6 6-6"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>',
    server: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  };

  const icon = (name, size = 20) =>
    `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const EXTERNAL = 'target="_blank" rel="noopener noreferrer"';

  const sectionHeading = (id, eyebrow, title, align = "") =>
    `<div class="section-head ${align} reveal">
       <p class="section-eyebrow">${esc(eyebrow)}</p>
       <h2 class="section-title" id="${id}">${esc(title)}</h2>
     </div>`;

  const socialLinks = (size) =>
    D.socials
      .filter((s) => s.url)
      .map((s) => `<li><a href="${esc(s.url)}" ${EXTERNAL}>${icon(s.icon, size)}<span>${esc(s.label)}</span></a></li>`)
      .join("");

  /* ------------------------------------------------------------------
     Theme: dark by default; the saved choice wins
     ------------------------------------------------------------------ */
  const THEME_KEY = "theme";
  const themeToggle = $("#theme-toggle");

  const readStoredTheme = () => {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const next = theme === "dark" ? "light" : "dark";
    themeToggle.innerHTML = icon(theme === "dark" ? "sun" : "moon");
    themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
  };

  applyTheme(readStoredTheme() || "dark");

  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  });

  /* ------------------------------------------------------------------
     Navbar + mobile menu
     ------------------------------------------------------------------ */
  const navList = $("#nav-links");
  const nav = $("#primary-nav");
  const menuToggle = $("#menu-toggle");
  const { cvPath, cvFileName } = D.site;

  navList.innerHTML =
    D.nav.map((item) => `<li><a href="#${item.id}" data-section="${item.id}">${esc(item.label)}</a></li>`).join("") +
    `<li class="nav-cv-mobile"><a href="${esc(cvPath)}" download="${esc(cvFileName)}" data-cv>Download CV</a></li>`;

  const navCv = $("#nav-cv");
  navCv.href = cvPath;
  navCv.setAttribute("download", cvFileName);
  navCv.setAttribute("data-cv", "");
  navCv.innerHTML = `${icon("download", 16)} Download CV`;

  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuToggle.innerHTML = icon(open ? "close" : "menu");
  };
  setMenu(false);

  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ------------------------------------------------------------------
     Hero: intro text and social buttons
     ------------------------------------------------------------------ */
  $("#hero-content").innerHTML = `
    <div class="hero-text reveal">
        <p class="pill"><span class="pill-dot" aria-hidden="true"></span>${esc(D.site.availability)}</p>
        <p class="hero-eyebrow">Hi, I'm</p>
        <h1 class="hero-name">${esc(D.site.name)}</h1>
        <p class="hero-title">${esc(D.site.title)}</p>
        <p class="hero-tagline">${esc(D.site.tagline)}</p>
        <div class="hero-actions">
          <a class="btn" href="#projects">View Projects</a>
          <a class="btn btn-outline" href="${esc(cvPath)}" download="${esc(cvFileName)}" data-cv>${icon("download", 18)} Download CV</a>
        </div>
        <ul class="social-list" aria-label="Social links">${socialLinks(22)}</ul>
    </div>

    </div>`;

  /* ------------------------------------------------------------------
     About
     ------------------------------------------------------------------ */
  const certCard = (c) => {
    const inner = `
      <span class="cert-icon">${icon("award", 24)}</span>
      <span class="cert-text">
        <span class="cert-name">${esc(c.title)}</span>
        <span class="cert-meta">${esc(c.issuer)} · ${esc(c.year)}</span>
      </span>
      ${c.url ? `<span class="cert-link">${icon("external", 18)}<span class="sr-only">(opens certificate in a new tab)</span></span>` : ""}`;
    return c.url
      ? `<li><a class="cert-card cert-card-link" href="${esc(c.url)}" ${EXTERNAL}>${inner}</a></li>`
      : `<li><div class="cert-card">${inner}</div></li>`;
  };

  $("#about-content").innerHTML = `
    ${sectionHeading("about-title", "About", "About me")}
    <div class="about-grid">
      <div class="about-text reveal">
        ${D.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        <p class="about-location">${icon("pin", 20)} ${esc(D.site.location)}</p>
      </div>
      <div class="reveal">
        <h3 class="cert-heading">Certifications</h3>
        <ul class="cert-list">${D.about.certifications.map(certCard).join("")}</ul>
      </div>`;

  /* ------------------------------------------------------------------
     Skills
     ------------------------------------------------------------------ */
  $("#skills-content").innerHTML = `
    ${sectionHeading("skills-title", "Skills", "Technologies I work with")}
    <div class="skills-grid">
      ${D.skills
        .map(
          (g) => `
        <div class="skill-card reveal">
          <h3><span class="skill-icon">${icon(g.icon, 22)}</span>${esc(g.group)}</h3>
          <ul>${g.items.map((i) => `<li><span class="badge">${esc(i)}</span></li>`).join("")}</ul>
        </div>`
        )
        .join("")}
    </div>`;

  /* ------------------------------------------------------------------
     Experience: date column (desktop) + card per role
     ------------------------------------------------------------------ */
  $("#experience-content").innerHTML = `
    ${sectionHeading("experience-title", "Experience", "Where I've worked")}
    <ol class="timeline">
      ${D.experience
        .map(
          (job) => `
        <li class="timeline-item reveal">
          <p class="timeline-period">${esc(job.period)}</p>
          <div class="timeline-card">
            <h3 class="timeline-role">${esc(job.role)}</h3>
            <p class="timeline-company">${esc(job.company)}</p>
            <ul class="timeline-bullets">${job.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          </div>
        </li>`
        )
        .join("")}
    </ol>`;

  /* ------------------------------------------------------------------
     Projects (featured first, original order kept otherwise)
     ------------------------------------------------------------------ */
  const projects = [...D.projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  const projectCard = (p, index) => {
    const count = p.images.length;
    // Private projects hide the buttons and show the note instead
    let footer = "";
    if (p.isPrivate) {
      footer = `<p class="private-note">${esc(p.privateNote)}</p>`;
    } else {
      const links = [
        p.githubUrl && `<a class="btn btn-outline btn-sm" href="${esc(p.githubUrl)}" ${EXTERNAL}>${icon("github", 18)} GitHub</a>`,
        p.liveUrl && `<a class="btn btn-sm" href="${esc(p.liveUrl)}" ${EXTERNAL}>${icon("external", 18)} Live demo</a>`,
      ].filter(Boolean);
      if (links.length) footer = `<div class="project-links">${links.join("")}</div>`;
    }

    return `
      <article class="project-card reveal${p.featured ? " featured" : ""}">
        <button class="project-media" type="button" data-project="${index}"
                aria-label="View ${count > 1 ? count + " screenshots" : "screenshot"} of ${esc(p.title)}">
          <img src="${esc(p.images[0])}" alt="Screenshot of ${esc(p.title)}" width="1280" height="800" loading="lazy">
          ${count > 1 ? `<span class="media-hint">${count} screenshots</span>` : ""}
        </button>
        <div class="project-body">
          <h3 class="project-title">${esc(p.title)}</h3>
          <p class="project-desc">${esc(p.description)}</p>
          <ul class="tech-list" aria-label="Technologies used">${p.tech.map((t) => `<li><span class="badge">${esc(t)}</span></li>`).join("")}</ul>
          ${footer}
        </div>
      </article>`;
  };

  $("#projects-content").innerHTML = `
    ${sectionHeading("projects-title", "Portfolio", "Selected Projects")}
    <div class="projects-grid">${projects.map(projectCard).join("")}</div>`;

  /* ------------------------------------------------------------------
     Lightbox: arrows, keyboard, counter, click-outside, focus trap
     ------------------------------------------------------------------ */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Project screenshots");
  lightbox.innerHTML = `
    <button class="lightbox-btn lightbox-close" type="button" aria-label="Close">${icon("close")}</button>
    <button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous image">${icon("prev")}</button>
    <figure class="lightbox-figure">
      <img class="lightbox-img" src="" alt="" width="1600" height="1000">
      <figcaption class="lightbox-counter" aria-live="polite"></figcaption>
    </figure>
    <button class="lightbox-btn lightbox-next" type="button" aria-label="Next image">${icon("next")}</button>`;
  document.body.appendChild(lightbox);

  const lbImg = $(".lightbox-img", lightbox);
  const lbCounter = $(".lightbox-counter", lightbox);
  const lbPrev = $(".lightbox-prev", lightbox);
  const lbNext = $(".lightbox-next", lightbox);
  const lbClose = $(".lightbox-close", lightbox);
  const lb = { project: null, index: 0, opener: null };

  const showImage = (i) => {
    const total = lb.project.images.length;
    lb.index = (i + total) % total;
    lbImg.src = lb.project.images[lb.index];
    lbImg.alt = `${lb.project.title} screenshot ${lb.index + 1} of ${total}`;
    lbCounter.textContent = `${lb.index + 1}/${total}`;
  };

  const openLightbox = (project, opener) => {
    lb.project = project;
    lb.opener = opener;
    const single = project.images.length < 2;
    lbPrev.hidden = single;
    lbNext.hidden = single;
    showImage(0);
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    lbClose.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lb.opener) lb.opener.focus();
  };

  $("#projects-content").addEventListener("click", (e) => {
    const trigger = e.target.closest(".project-media");
    if (trigger) openLightbox(projects[Number(trigger.dataset.project)], trigger);
  });

  lbPrev.addEventListener("click", () => showImage(lb.index - 1));
  lbNext.addEventListener("click", () => showImage(lb.index + 1));
  lbClose.addEventListener("click", closeLightbox);
  // Click on the dark backdrop (not the image or a button) closes it
  lightbox.addEventListener("click", (e) => {
    if (!e.target.closest("img, button")) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft" && !lbPrev.hidden) showImage(lb.index - 1);
    else if (e.key === "ArrowRight" && !lbNext.hidden) showImage(lb.index + 1);
    else if (e.key === "Tab") {
      // Focus trap: keep Tab cycling inside the dialog
      const focusable = $$("button", lightbox).filter((b) => !b.hidden);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!lightbox.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------------
     CV preview: "Download CV" first shows the PDF; the visitor scrolls
     through it and can download from inside. Browsers that cannot show PDFs
     inline (most phones) skip the preview and download straight away.
     ------------------------------------------------------------------ */
  const cvModal = document.createElement("div");
  cvModal.className = "cv-modal";
  cvModal.hidden = true;
  cvModal.setAttribute("role", "dialog");
  cvModal.setAttribute("aria-modal", "true");
  cvModal.setAttribute("aria-label", "CV preview");
  cvModal.innerHTML = `
    <div class="cv-panel">
      <div class="cv-bar">
        <p class="cv-title">${esc(cvFileName)}</p>
        <div class="cv-actions">
          <a class="btn btn-sm cv-download" href="${esc(cvPath)}" download="${esc(cvFileName)}">${icon("download", 16)} Download</a>
          <button class="icon-btn cv-close" type="button" aria-label="Close CV preview">${icon("close")}</button>
        </div>
      </div>
      <iframe class="cv-frame" title="CV preview (scroll to read)"></iframe>
    </div>`;
  document.body.appendChild(cvModal);

  const cvFrame = $(".cv-frame", cvModal);
  const cvCloseBtn = $(".cv-close", cvModal);
  let cvOpener = null;

  const openCv = (opener) => {
    cvOpener = opener;
    if (!cvFrame.getAttribute("src")) cvFrame.src = `${cvPath}#view=FitH`; // load the PDF on first open only
    cvModal.hidden = false;
    document.body.classList.add("no-scroll");
    cvCloseBtn.focus();
  };

  const closeCv = () => {
    cvModal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (cvOpener) cvOpener.focus();
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-cv]");
    if (!link || navigator.pdfViewerEnabled !== true) return; // fall back to a normal download
    e.preventDefault();
    openCv(link);
  });

  cvCloseBtn.addEventListener("click", closeCv);
  // Click on the dark backdrop (outside the panel) closes it
  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) closeCv();
  });

  document.addEventListener("keydown", (e) => {
    if (cvModal.hidden) return;
    if (e.key === "Escape") closeCv();
    else if (e.key === "Tab") {
      // Focus trap between the Download link and the Close button
      const first = $(".cv-download", cvModal);
      const last = cvCloseBtn;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!cvModal.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------------
     Contact: email + message, sent to a serverless function with fetch
     ------------------------------------------------------------------ */
  $("#contact-content").innerHTML = `
    ${sectionHeading("contact-title", "Contact", D.contact.heading, "center")}
    <p class="contact-line reveal">${esc(D.contact.line)}</p>
    <form class="contact-form reveal" id="contact-form">
      <div class="field">
        <label for="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="field">
        <label for="cf-message">Message</label>
        <textarea id="cf-message" name="message" required minlength="10"></textarea>
      </div>
      <!-- Honeypot: hidden from people, bots tend to fill it in -->
      <div class="hp" aria-hidden="true">
        <label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
      </div>
      <button class="btn" type="submit">Send message</button>
      <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
    </form>`;

  const form = $("#contact-form");
  const statusEl = $("#form-status");
  const submitBtn = $("button[type=submit]", form);
  const setStatus = (text, kind = "") => {
    statusEl.textContent = text;
    statusEl.className = `form-status ${kind}`.trim();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // native validation has already passed at this point

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    setStatus("");
    try {
      const res = await fetch(D.contact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      // No backend here (e.g. opened locally or on a static host)
      if ([404, 405, 501].includes(res.status)) {
        setStatus("The contact form isn't connected yet. Please check back soon.", "error");
        return;
      }

      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setStatus(result.error || "Something went wrong. Please try again in a moment.", "error");
        return;
      }
      form.reset();
      setStatus("Thanks! I'll get back to you soon.", "success");
    } catch {
      setStatus("Something went wrong. Please check your connection and try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });

  /* ------------------------------------------------------------------
     Footer: brand, links, socials, bottom bar
     ------------------------------------------------------------------ */
  $("#footer-content").innerHTML = `
    <div class="footer-main">
      <a class="logo" href="#home" aria-label="${esc(D.site.name)}, back to top">
        <span class="logo-mark">EA</span><span class="footer-name">${esc(D.site.name)}</span>
      </a>
      <p class="footer-tagline">${esc(D.site.footerTagline)}</p>
      <nav aria-label="Quick links">
        <ul class="footer-links">${D.nav.filter((n) => n.id !== "home").map((n) => `<li><a href="#${n.id}">${esc(n.label)}</a></li>`).join("")}</ul>
      </nav>
      <ul class="social-list footer-social" aria-label="Social links">${socialLinks(20)}</ul>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${esc(D.site.name)}. All rights reserved.</p>
      <a class="back-to-top" href="#home">Back to top <span aria-hidden="true">↑</span></a>
    </div>`;

  /* ------------------------------------------------------------------
     Scroll effects: fade-in on reveal + active nav link
     ------------------------------------------------------------------ */
  const revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const navLinks = $$("a[data-section]", navList);
  const setActive = (id) => {
    navLinks.forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window) {
    // A section is "current" while it crosses the middle band of the viewport
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    D.nav.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) sectionObserver.observe(section);
    });
  }

  // The last section can be too short to reach the middle band
  window.addEventListener(
    "scroll",
    () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(D.nav[D.nav.length - 1].id);
      }
    },
    { passive: true }
  );
})();
