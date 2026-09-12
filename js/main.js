// =========================================================
// RASIKA CODELAB
// Main JavaScript
// =========================================================

import("./auth-nav.js");

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-active");

            if (navLinks.classList.contains("mobile-active")) {
                menuBtn.innerHTML = "✕";
            } else {
                menuBtn.innerHTML = "☰";
            }

        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("mobile-active");

                menuBtn.innerHTML = "☰";

            });

        });
    }


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        });

    }


    /* =========================================
       CURRENT PAGE
    ========================================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* =========================================
       FOUNDATION CARD INTERACTION
    ========================================= */

    const foundationCards =
        document.querySelectorAll(".foundation-card");

    foundationCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.setProperty(
                "--mouse-x",
                "50%"
            );

        });

    });


    /* =========================================
       BUTTON RIPPLE EFFECT
    ========================================= */

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =========================================
       REVEAL SECTIONS ON SCROLL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .foundation-card, .intro-section"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "%cRasika CodeLab",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "C++ Practical Learning & Visualization Platform"
    );

});