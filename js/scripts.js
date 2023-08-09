import { aboutMeContent, contactContent, projectsContent } from "./content.js";

document.addEventListener("DOMContentLoaded", function () {
    const arrow = document.getElementById("arrow");
    const nameTypingText = document.getElementById("name-typing-text");
    const typingText = document.getElementById("typing-text");
    const descriptionTypingText = document.getElementById("desc-typing-text");
    const landingSection = document.getElementById("landing");

    const landingBackground = document.querySelector(".landing-background");
    const numberOfBalls = 50; // Adjust the number of balls as needed

    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("nav a");
    const contentContainers = document.querySelectorAll(".content");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            const contentContainer = targetSection.querySelector(".content");

            sections.forEach(function (section) {
                section.classList.remove("active");
            });

            contentContainers.forEach(function (container) {
                container.innerHTML = ""; // Clear previous content
            });

            if (targetId === "#about") {
                contentContainer.innerHTML = aboutMeContent;
            } else if (targetId === "#projects") {
                contentContainer.innerHTML = projectsContent;
            } else if (targetId === "#contact") {
                contentContainer.innerHTML = contactContent;
            }

            targetSection.classList.add("active");
        });
    });

    let scrollCount = 0; // Counter for scroll events
    let scrolledToHeader = false; // Flag to track scrolling to header

    // Set the hidden state to true in local storage while loading the page
    localStorage.setItem("landingHidden", "false");
    
    arrow.addEventListener("click", function () {
        // Hide the landing section by adding the hidden class
        landingSection.classList.add("hidden");

        // Store the hidden state in local storage
        localStorage.setItem("landingHidden", "true");
    });

    // Check if user has scrolled up or if it's stored in local storage
    const isHidden = localStorage.getItem("landingHidden") === "true";

    if (!isHidden) {
        landingSection.classList.remove("hidden"); // Show the landing section by default
        arrow.style.visibility = "hidden";
        typeHeaderAndParagraphs();
        // Generate and add balls to the landing background using the createBalls function
        createBalls(numberOfBalls, landingBackground);
    }

    function typeText(text, element, callback) {
        
        let textIndex = 0;
        const interval = setInterval(function () {
            if (textIndex < text.length) {
                element.textContent += text[textIndex];
                textIndex++;
            } else {
                clearInterval(interval);
                if (callback) {
                    callback(); // Call the callback function if provided
                }
            }
        }, 40); // Adjust the interval to control the typing speed
    }

    function typeHeaderAndParagraphs() {
        nameTypingText.innerHTML = ""; // Clear previous content
        typingText.innerHTML = ""; // Clear previous content
        descriptionTypingText.innerHTML = "";
        // Hide the arrow initially
        arrow.style.visibility = "hidden";
        
        // Apply the transparent color to the text and arrow
        descriptionTypingText.style.color = "transparent"; 
        arrow.style.color = "transparent";
    
        // const typingDelay = 100; // Delay before starting to type each character
        const paragraphDelay = 1000; // Delay before typing the next paragraph
    
        typeText("Hi there! Welcome to my portfolio :)", nameTypingText, function () {
            typeText("My name is Chandan Thapa and I'm a Web Applications & Software Developer", typingText, function () {
                typingText.appendChild(document.createElement("br")); // Add a line break
                setTimeout(function () {
                    descriptionTypingText.textContent += "Please click on the below arrow to know more about me and my projects";
                    arrow.style.visibility = "visible"; // Show the arrow
                    descriptionTypingText.style.color = "#494b49"; // Change text color gradually
                    arrow.style.color = "#494b49"; // Change the arrow color gradually
                }, paragraphDelay);
            });
        });
    }
    

    // Listen for scroll events to show the landing section when scrolling up
    // window.addEventListener("scroll", function () {
    //     if (window.scrollY === 0) {
    //         if (scrolledToHeader) {
    //             scrollCount++;

    //             if (scrollCount >= 2) {
    //                 landingSection.classList.remove("hidden");
    //                 localStorage.removeItem("landingHidden");
    //                 scrolledToHeader = false; // Reset the flag
    //                 scrollCount = 0; // Reset the counter
    //                 typeHeaderAndParagraphs(); // Retype header and paragraphs
    //             }
    //         }
    //     } else if (!scrolledToHeader) {
    //         scrolledToHeader = true;
    //     }
    // });

    
    function createBalls(numberOfBalls, landingBackground) {
        const colors = ['#ff5733', '#00a8ff', '#ffc107', '#0febf3', '#9b80f5', '#fe5cd0']; // List of colors
    
        for (let i = 0; i < numberOfBalls; i++) {
            const ball = document.createElement("div");
            ball.classList.add("ball");
            ball.style.left = `${Math.random() * 100}vw`;
            ball.style.animationDelay = `${Math.random() * 5}s`; // Add random animation delay
    
            // Set a random color from the colors array
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            ball.style.backgroundColor = randomColor;
    
            landingBackground.appendChild(ball);
        }
    }
});