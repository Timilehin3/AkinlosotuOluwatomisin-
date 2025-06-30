// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

// Form Validation
function validateForm(event) {
  event.preventDefault();

  // Clear previous errors
  ["name", "email", "message"].forEach((field) => {
    document.getElementById(field + "-error").textContent = "";
  });
  document.getElementById("form-status").textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const website = document.getElementById("website").value;

  let valid = true;

  // Honeypot spam check
  if (website !== "") {
    document.getElementById("form-status").textContent = "Spam detected. Submission blocked.";
    document.getElementById("form-status").style.color = "red";
    return false;
  }

  if (name.length < 2) {
    document.getElementById("name-error").textContent = "Please enter a valid name.";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (message.length < 10) {
    document.getElementById("message-error").textContent = "Please enter a message with at least 10 characters.";
    valid = false;
  }

  if (!valid) {
    document.getElementById("form-status").textContent = "Please fix the errors above and try again.";
    document.getElementById("form-status").style.color = "red";
    return false;
  }

  // If validation passes, submit via AJAX
  submitForm();
  return false;
}

// Async Form Submission
function submitForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const data = new FormData(form);

  fetch("https://formspree.io/f/mrbqjjwp", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.textContent = "Thank you! Your message has been sent.";
        status.style.color = "green";
        form.reset();
        ["name", "email", "message"].forEach((field) => {
          localStorage.removeItem(field);
        });
      } else {
        response.json().then((data) => {
          status.textContent = data.errors
            ? data.errors.map((e) => e.message).join(", ")
            : "Oops! There was a problem submitting your form.";
          status.style.color = "red";
        });
      }
    })
    .catch((error) => {
      status.textContent = "Oops! There was a problem submitting your form.";
      status.style.color = "red";
    });
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
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  navLinks.classList.toggle("active");
  mobileMenuBtn.setAttribute(
    "aria-expanded",
    navLinks.classList.contains("active").toString()
  );
}

document
  .querySelector(".mobile-menu-btn")
  ?.addEventListener("click", toggleMobileMenu);

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

// Attach validation to form submit
form.addEventListener("submit", validateForm);
