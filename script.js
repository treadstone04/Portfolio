// ===============================
// MOBILE NAVBAR TOGGLE
// ===============================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load


// ===============================
// TYPING EFFECT (RACING STYLE)
// ===============================
const typingElement = document.querySelector(".subtitle");

if (typingElement) {

    const words = [
        "Electric Vehicle Systems Engineer",
        "Motor Control Algorithm Developer",
        "Powertrain & Embedded Systems Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = "";
    let isDeleting = false;

    function typeEffect() {

        currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent =
                currentWord.substring(0, charIndex--);
        } else {
            typingElement.textContent =
                currentWord.substring(0, charIndex++);
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}


// ===============================
// CONTACT FORM VALIDATION
// ===============================
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.style.color = "#ff1e00";
            formMessage.textContent = "⚠ All fields are required!";
            return;
        }

        const emailPattern =
            /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailPattern)) {
            formMessage.style.color = "#ff1e00";
            formMessage.textContent = "⚠ Enter a valid email address!";
            return;
        }

        formMessage.style.color = "#00eaff";
        formMessage.textContent = "⚡ Message transmitted successfully!";

        form.reset();
    });

}


// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active-link");
        }
    });

});


// ===============================
// DARK MODE TOGGLE (Optional)
// ===============================
const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}
