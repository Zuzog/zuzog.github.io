document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const content = document.querySelector(".content");
  const body = document.body;
  const scrollArrow = document.querySelector(".scroll-arrow");

  // Fonction pour faire défiler vers la section
  scrollArrow.addEventListener("click", () => {
    const targetSection = document.getElementById("skills");
    targetSection.scrollIntoView({ behavior: "smooth" });
  });

  // Function to animate typing effect
  function typeEffect(element, text, delay) {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);
  }

  // Wait for resources to load
  window.addEventListener("load", () => {
    // Add the no-scroll class to block scrolling
    body.classList.add("no-scroll");

    // Delay to see the Lottie animation
    setTimeout(() => {
      // Slide up the loading screen
      loadingScreen.classList.add("slide-up");

      // Show content
      setTimeout(() => {
        content.classList.add("visible");

        // Remove the no-scroll class to allow scrolling
        body.classList.remove("no-scroll");

        // Animate titles simultaneously
        const titles = document.querySelectorAll(".animated-title");
        titles.forEach((title) => {
          const text = title.textContent;
          title.textContent = ""; // Clear the title text
          typeEffect(title, text, 100); // Call the typing effect for each title
        });
      }, 1000);
    }, 2500);
  });
});
