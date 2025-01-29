// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

// Form Validation
function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name.length < 2) {
    alert("Please enter a valid name");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  if (message.length < 10) {
    alert("Please enter a message with at least 10 characters");
    return false;
  }

  alert("Form submitted successfully!");
  return true;
}

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document
  .querySelectorAll(".project-card")
  .forEach((el) => observer.observe(el));

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form Storage
const form = document.getElementById("contact-form");
form.addEventListener("input", function (e) {
  localStorage.setItem(e.target.id, e.target.value);
});

// Restore form data
window.addEventListener("load", function () {
  ["name", "email", "message"].forEach((field) => {
    const value = localStorage.getItem(field);
    if (value) document.getElementById(field).value = value;
  });
});

// Clear form storage after successful submission
form.addEventListener("submit", function () {
  ["name", "email", "message"].forEach((field) => {
    localStorage.removeItem(field);
  });
});
