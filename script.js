const scrollArrow = document.querySelector(".scroll-arrow");
const content = document.querySelector(".content");

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
const titles = document.querySelectorAll(".animated-title");
titles.forEach((title) => {
  const text = title.textContent;
  title.textContent = ""; // Clear the title text
  typeEffect(title, text, 150); // Call the typing effect for each title
});
