// script.js

// Smooth scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

// Fade-in on scroll + section micro-animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

// Blur nav on scroll + scroll progress + parallax + floating text
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  const progress = document.querySelector(".scroll-progress");
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  if (scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  if (progress) {
    progress.style.width = `${percent}%`;
  }

  const hero = document.querySelector(".parallax");
  const floatingText = document.querySelector(".hero-floating-text");
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
  if (floatingText) {
    floatingText.style.transform = `translateX(-50%) translateY(${scrollY * 0.08}px)`;
  }
});

// Animated skill bars
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const fill = bar.querySelector(".skill-fill");
      const percent = bar.getAttribute("data-skill");
      fill.style.width = percent + "%";
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Page wrapper cinematic intro
window.addEventListener("load", () => {
  const wrapper = document.querySelector(".page-wrapper");
  if (wrapper) {
    requestAnimationFrame(() => {
      wrapper.classList.add("ready");
    });
  }
});

// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// Magnetic cursor interactions
const magneticElements = document.querySelectorAll(".magnetic");
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

magneticElements.forEach(el => {
  el.addEventListener("mousemove", () => {
    const rect = el.getBoundingClientRect();
    const relX = mouseX - (rect.left + rect.width / 2);
    const relY = mouseY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${relX * 0.08}px, ${relY * 0.08}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0, 0)";
  });
});

// Button ripple effect
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-circle");

    const existingRipple = this.querySelector(".ripple-circle");
    if (existingRipple) {
      existingRipple.remove();
    }

    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
});

// Smart nav section highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        if (link.dataset.target === id) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// Nav link click smooth scroll
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.target;
    if (target) {
      scrollToSection(target);
    }
  });
});