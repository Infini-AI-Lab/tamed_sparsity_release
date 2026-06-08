// Copy citation to clipboard
const copyButton = document.querySelector(".copy-button");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const targetId = copyButton.dataset.copyTarget;
    const target = document.getElementById(targetId);
    if (!target) return;

    const text = target.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1400);
    } catch {
      copyButton.textContent = "Select text";
    }
  });
}

// Scroll-spy: highlight the nav link for the section currently in view
const navLinks = Array.from(document.querySelectorAll(".navlinks a"));
const linkBySection = new Map();
const watchedSections = [];

navLinks.forEach((link) => {
  const id = link.getAttribute("href");
  if (!id || !id.startsWith("#")) return;
  const section = document.querySelector(id);
  if (!section) return;
  linkBySection.set(section, link);
  watchedSections.push(section);
});

if (watchedSections.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.remove("is-active"));
        const active = linkBySection.get(entry.target);
        if (active) active.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  watchedSections.forEach((section) => spy.observe(section));
}

// Subtle reveal-on-scroll for sections and figures
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".section, .hero-overview, .figure-card, .hero-stats > div"
);

if (!prefersReduced && "IntersectionObserver" in window) {
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );
  revealTargets.forEach((el) => revealer.observe(el));
}
