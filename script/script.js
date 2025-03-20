// Barre de progression
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

// Initialiser la barre de progression à 0
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".progress-bar").style.transform = "scaleY(0)";
});

window.addEventListener("scroll", updateProgressBar);

// Animation au défilement
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});

// Défilement fluide au clique sur la navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Menu Burger pour les clients mobiles
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  document.body.classList.toggle("menu-open");
  updateScrollArrow();
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebar.classList.remove("active");
    document.body.classList.remove("menu-open");
    updateScrollArrow();
  }
});

// Gestion du déroulement des compétences
document.querySelectorAll(".skill-category").forEach((category) => {
  category.addEventListener("click", () => {
    const categoryId = category.getAttribute("data-category");

    // Masquer tous les contenus de détail
    document.querySelectorAll(".skill-detail-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Afficher le contenu correspondant
    const selectedContent = document.querySelector(
      `.skill-detail-content[data-category="${categoryId}"]`
    );
    selectedContent.classList.add("active");

    // Scroll vers le contenu sélectionné
    const navHeight = document.querySelector(".top-nav").offsetHeight;
    const selectedContentPosition =
      selectedContent.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: selectedContentPosition - navHeight - 100,
      behavior: "smooth",
    });
  });
});

// Gestion de la flèche de scroll pour les clients mobiles
const scrollArrow = document.querySelector(".scroll-arrow");
const sections = document.querySelectorAll(".section");

function updateScrollArrow() {
  if (window.innerWidth <= 768) {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollBottom = currentScroll + windowHeight;

    // Si on est en haut de la page, afficher la flèche
    if (currentScroll < 100 && !document.body.classList.contains("menu-open")) {
      scrollArrow.style.display = "flex";
      return;
    }

    // Si on est proche du bas de la page, masquer la flèche
    if (scrollBottom >= documentHeight - 100) {
      scrollArrow.style.display = "none";
      return;
    }

    // Trouver la section actuelle
    let currentSectionIndex = -1;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        currentSectionIndex = index;
      }
    });

    // Afficher/masquer la flèche
    if (
      currentSectionIndex >= 0 &&
      currentSectionIndex < sections.length - 1 &&
      !document.body.classList.contains("menu-open")
    ) {
      scrollArrow.style.display = "flex";
    } else {
      scrollArrow.style.display = "none";
    }
  } else {
    scrollArrow.style.display = "none";
  }
}

scrollArrow.addEventListener("click", () => {
  const currentScroll = window.scrollY;
  const windowHeight = window.innerHeight;

  // Si on est en haut de la page, scroll vers la première section
  if (currentScroll < 100) {
    const firstSection = sections[0];
    const navHeight = document.querySelector(".top-nav").offsetHeight;
    const targetPosition = firstSection.offsetTop - navHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
    return;
  }

  // Trouver la section actuelle
  let currentSectionIndex = -1;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSectionIndex = index;
    }
  });

  // Scroll vers la section suivante
  if (currentSectionIndex >= 0 && currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    const navHeight = document.querySelector(".top-nav").offsetHeight;
    const targetPosition = nextSection.offsetTop - navHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
});

// Appeler updateScrollArrow au chargement de la page
document.addEventListener("DOMContentLoaded", updateScrollArrow);
window.addEventListener("scroll", updateScrollArrow);
window.addEventListener("resize", updateScrollArrow);
