document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const content = document.querySelector(".content");

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
    // Delay to see the Lottie animation
    setTimeout(() => {
      // Slide up the loading screen
      loadingScreen.classList.add("slide-up");

      // Show content
      setTimeout(() => {
        content.classList.add("visible");

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
