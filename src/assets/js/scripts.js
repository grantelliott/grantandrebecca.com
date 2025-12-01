// -----------------------------
// Copy Button
// -----------------------------
const copyBtn = document.getElementById("copyButton");
const copyTarget = document.getElementById("copyTarget");
const tooltip = document.getElementById("tooltip");

if (copyBtn && copyTarget && tooltip) {
  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(copyTarget.textContent.trim());

    tooltip.style.opacity = "1";
    setTimeout(() => {
      tooltip.style.opacity = "0";
    }, 1200);
  });
}


// -----------------------------
// Section Highlighting (Nav Active State)
// -----------------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const ACTIVE_CLASSES = ["bg-red-600", "text-white"];

function clearActive() {
  navLinks.forEach(link =>
    link.classList.remove(...ACTIVE_CLASSES)
  );
}

function activateLinkFor(id) {
  const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);
  if (navLink) navLink.classList.add(...ACTIVE_CLASSES);
}

const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -50% 0px",
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  const firstSection = sections[0];

  // Remove active when scrolling above first section
  if (window.scrollY < firstSection.offsetTop - window.innerHeight / 2) {
    clearActive();
    return;
  }

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      clearActive();
      activateLinkFor(id);
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));


// -----------------------------
// Countdown (Days Only)
// -----------------------------
const countdownEl = document.getElementById("countdown");
const targetUtc = Date.UTC(2026, 1, 12, 14, 0, 0); // 12 Feb 2026, 2pm UK

function updateCountdown() {
  if (!countdownEl) return;

  const now = Date.now();
  const diff = targetUtc - now;

  if (diff <= 0) {
    countdownEl.textContent = "0";
    return;
  }

  const MS_IN_DAY = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / MS_IN_DAY);

  countdownEl.textContent = days;
}

// Run once & then refresh every minute
updateCountdown();
setInterval(updateCountdown, 60_000);