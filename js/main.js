// IMPORT DATABAS AND DISPLAY FUNCTION
import {db} from "./db.js";
import {displayMenu, searchMenu, displayCheckOut} from "./ui.js";

// Display menu, function from ui.js
displayMenu(db.drinks);
displayMenu(db.bbqs);
displayMenu(db.steaks);

// If user is on menu.html page, display menu, drinks, bbqs and steaks
if (window.location.pathname.endsWith('menu.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        displayMenu(db.drinks);
        displayMenu(db.bbqs);
        displayMenu(db.steaks);
        //Create a button that allows the user to navigate to the checkout page
        const checkOutBtn = document.createElement('button');
        const checkOutIcon = document.createElement("i");
        checkOutIcon.classList.add('bx', 'bx-cart');
        checkOutBtn.appendChild(checkOutIcon);
        checkOutBtn.classList.add('checkout-btn');
        checkOutBtn.classList.remove('display-info');
        checkOutBtn.id = 'CheckoutBtn'
        //Use insertBefore to make sure the button does not appear under the script link
        document.body.insertBefore(checkOutBtn, document.body.firstChild);
    });
  }
        //Add an event listener to redirect the user to the checkout page when clicked
        checkOutBtn.addEventListener('click', () => {
            location.assign('checkout.html');
            displayCheckOut();
        });
/* Create search input, add placeholder, maxlength, aria-label for accessibility,
class for styling, etc.*/
const searchInput = document.createElement('input');
searchInput.placeholder = 'Enter rating, country or name.';
searchInput.setAttribute('maxlength', '100');
searchInput.setAttribute('aria-label', 'Search for rating, country, or name');
searchInput.classList.add('search-input');
// Create a section to hold the input, add a class for styling
const inputSection = document.createElement('section');
inputSection.classList.add('input-section');
// Append the search input to the container
inputSection.appendChild(searchInput);
// Insert the container at the top of the body
document.body.insertBefore(inputSection, document.body.firstChild);
/* Add event listener to the search input,
calls searchMenu function from ui.js to filter the menu based on input*/
searchInput.addEventListener('input', () =>{
    //Calls searchMenu to filter and display search results
    searchMenu(searchInput.value, db)
})




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

