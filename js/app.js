/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("theme-btn");

// Check saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
} else {
    themeBtn.textContent = "🌙";
}

// Toggle Theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";

    }

});


/* ==========================
   MOBILE HAMBURGER MENU
========================== */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* ==========================
   SMOOTH CLOSE MENU
========================== */

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ==========================
   BUTTON INTERACTIONS
========================== */

const getStartedBtn = document.querySelector(".primary-btn");
const demoBtn = document.querySelector(".secondary-btn");

if (getStartedBtn) {

   getStartedBtn.addEventListener("click", () => {

    window.location.href = "dashboard.html";


        /*
        Later replace with:

        window.location.href = "dashboard.html";
        */

    });

}

if (demoBtn) {

    demoBtn.addEventListener("click", () => {

        alert("Demo video coming soon 🎥");

    });

}


/* ==========================
   SCROLL ANIMATION
========================== */

const animatedElements = document.querySelectorAll(
    ".feature-card, .stat-box, .timeline-step, .testimonial-card"
);

function revealOnScroll() {

    animatedElements.forEach(element => {

        const position = element.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (position < windowHeight - 100) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}

// Initial State
animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all 0.8s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ==========================
   LOGIN BUTTON
========================== */

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        alert("Login feature coming in future updates 🔐");

    });

}


/* ==========================
   DASHBOARD CARD HOVER
========================== */

const dashboardCards = document.querySelectorAll(".dashboard-card");

dashboardCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-5px)";
        card.style.transition = "0.3s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});


/* ==========================
   CONSOLE MESSAGE
========================== */

console.log(`
🚀 PlacementPrep AI

Built by Aman Choudhary

Premium Landing Page Loaded Successfully.
`);