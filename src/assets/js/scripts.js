const copyBtn = document.getElementById("copyButton");
const copyTarget = document.getElementById("copyTarget");
const tooltip = document.getElementById("tooltip");

copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(copyTarget.textContent.trim());

    tooltip.style.opacity = "1";
    setTimeout(() => {
        tooltip.style.opacity = "0";
    }, 1200);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -50% 0px", // trigger when section is roughly in middle
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    const firstSection = sections[0];

    // Remove active if above first section
    if (window.scrollY < firstSection.offsetTop - window.innerHeight / 2) {
    navLinks.forEach(link => link.classList.remove("bg-red-600", "text-white"));
    return;
  }

  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);

    if(entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("bg-red-600", "text-white"));
      if(navLink) {
        navLink.classList.add("bg-red-600", "text-white");
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
