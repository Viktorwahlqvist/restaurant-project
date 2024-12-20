// IMPORT DATABAS AND DISPLAY FUNCTION
import {db} from "./db.js";
import {displayMenu} from "./ui.js";

// Get the menu button (hamburger button), navigation links, and the icon inside the menu button
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Add an event listener to the menu button for the click event
menuBtn.addEventListener("click", (e) => {
  // Toggle the "open" class on the navigation links to open/close the menu
  navLinks.classList.toggle("open");

  // Check if the menu is open and update the icon class accordingly
  const isOpen = navLinks.classList.contains("open");
  // If the menu is open, change the icon to a close icon, otherwise use the menu icon
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Add an event listener to the navigation links for the click event
navLinks.addEventListener("click", (e) => {
  // When a link in the menu is clicked, remove the "open" class to close the menu
  navLinks.classList.remove("open");
  // Reset the icon to the menu icon
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Configuration for scroll reveal animation
const scrollRevealOption = {
  distance: "50px",   // The element will move 50px when revealed
  origin: "bottom",   // The animation will start from the bottom of the element
  duration: 1000,     // The animation duration will be 1000 milliseconds (1 second)
};
// Change this when we have decided the menu
displayMenu(db.drinks);
displayMenu(db.pizzas);