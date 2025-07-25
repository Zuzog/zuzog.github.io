// Variables
const lightSwitch = document.getElementById("light-switch").addEventListener("change", switchLightSwitch);
const lightSwitchLabel = document.getElementById("light-switch-label");
const theme = localStorage.getItem('theme');
const sidebarToggle = document.getElementById("sidebar-button");
const navToggle = document.getElementById("nav-button");
const sidebar = document.getElementById("sidebar");
const nav = document.getElementById("top-nav-items");
const scrollArrow = document.getElementById("scroll-arrow");
const sections = document.querySelectorAll(".section");

// Core Functions //

// Light Switch //
// Get the theme from local storage
function getTheme() {
  if (theme === 'dark') {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("light-switch").checked = true;
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}
// Switch the theme
function switchLightSwitch() {
  var isChecked = document.getElementById("light-switch").checked;
  if (isChecked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem('theme', 'light');
  }
};

// Progress Bar //
// Update the progress bar
function updateProgressBar() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector(".progress-bar").style.transform = `scaleY(${
    scrolled / 100
  })`;
}
// Initialize the progress bar to 0
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".progress-bar").style.transform = "scaleY(0)";
});
window.addEventListener("scroll", updateProgressBar);

// Animation on scroll //
// Options for the observer
const observerOptions = {
  threshold: 0.1,
};
// Create the observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);
// Add the animation to the sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});

// Navigation //
// Smooth scroll on when using the navigation menu
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Skills Section //
// Management of the skills
document.querySelectorAll(".skill-category").forEach((category) => {
  category.addEventListener("click", () => {
    const categoryId = category.getAttribute("data-category");
    // Show/Hide the corresponding content
    const selectedContent = document.querySelector(
      `.skill-detail-content[data-category="${categoryId}"]`
    );
    if (selectedContent.classList.contains("active")) {
      selectedContent.classList.remove("active");
    } else {
      document.querySelectorAll(".skill-detail-content").forEach((content) => {
        content.classList.remove("active");
      });
      selectedContent.classList.add("active");
    }
    // Scroll to the selected content
    const navHeight = document.querySelector(".top-nav").offsetHeight;
    const selectedContentPosition =
      selectedContent.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: selectedContentPosition - navHeight - 100,
      behavior: "smooth",
    });
  });
});

// Scroll CTA
const scrollCta = document.querySelector(".scroll-cta");
scrollCta.addEventListener("click", () => {
  const firstSection = document.querySelector("#skills");
  const navHeight = document.querySelector(".top-nav").offsetHeight;
  const targetPosition = firstSection.offsetTop - navHeight - 20;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});


// Mobile//

// Burger Menu
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  document.body.classList.toggle("sidebar-open");
});
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
    sidebar.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }
});


// Light Switch autohide
if (window.innerWidth <= 980) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      lightSwitchLabel.style.display = "none";
    } else {
      lightSwitchLabel.style.display = "block";
    }
  });
}

// Execution / Initialization
getTheme();
switchLightSwitch();
