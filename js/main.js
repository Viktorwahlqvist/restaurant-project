//Import functions and database objects for displaying the menu and checkout.
import {db} from "./db.js";
import {displayMenu, searchMenu, displayCheckOut} from "./ui.js";

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
        const header = document.querySelector('header');
        checkOutBtn.appendChild(checkOutIcon);
        checkOutBtn.classList.add('checkout-btn');
        checkOutBtn.classList.remove('display-info');
        checkOutBtn.id = 'CheckoutBtn'
        
        header.insertAdjacentElement('afterend', checkOutBtn);

        //Add an event listener to redirect the user to the checkout page when clicked
        checkOutBtn.addEventListener('click', () => {
            location.assign('checkout.html');
            displayCheckOut();

        });
        //Create an input field for searching the menu
        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Enter rating, country or name.';
        searchInput.setAttribute('aria-label', 'Search for rating, country, or name');
        searchInput.classList.add('search-input');
        //Create a section that holds the search input field
        const inputSection = document.createElement('section');
        inputSection.classList.add('input-section');
        inputSection.appendChild(searchInput);
        //Use insertBefore to make the input section appear at the top of the webpage
        
        header.insertAdjacentElement('afterend', inputSection);
        //Event listener for the search input to filter the menu based on the input value
        searchInput.addEventListener('input', () => {
            searchMenu(searchInput.value, db);
        });
    });
}

// If user is on checkout.hmtl page, display checkout.
 if (window.location.pathname.endsWith('checkout.html')){
    document.addEventListener('DOMContentLoaded', () => {
    displayCheckOut();
    });
 }



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

if (window.location.pathname.endsWith('review.html')) {
  document.addEventListener('DOMContentLoaded', () => {
  // Get references to HTML elements
const reviewText = document.getElementById("review-text");
const submitButton = document.getElementById("submit-review");
const reviewsList = document.getElementById("reviews-list");
const stars = document.querySelectorAll(".star");

// Variable to track selected rating
let rating = 0;

// Variable to track the number of reviews submitted
let reviewCount = 0;

// Function to create a review with stars and text
function createReview(text, rating) {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review-item");

  const reviewTextElement = document.createElement("p");
  reviewTextElement.textContent = text;

  const reviewRatingElement = document.createElement("p");
  reviewRatingElement.textContent = `Rating: ${rating} stars`;

  reviewDiv.appendChild(reviewTextElement);
  reviewDiv.appendChild(reviewRatingElement);

  return reviewDiv;
}

// Function to handle when a star is clicked
stars.forEach(star => {
  star.addEventListener("click", function() {
    rating = parseInt(star.getAttribute("data-value"));
    updateStarsDisplay();
  });
});

// Update the display of the stars based on the rating
function updateStarsDisplay() {
  stars.forEach(star => {
    if (parseInt(star.getAttribute("data-value")) <= rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

// Function to handle when the user submits a review
submitButton.addEventListener("click", function() {
  const reviewTextValue = reviewText.value.trim();

  // If the text is not empty and a rating is selected
  if (reviewTextValue && rating > 0) {
    // Check if the user has already submitted two reviews
    if (reviewCount < 2) {
      // Create a new review and add it to the list
      const newReview = createReview(reviewTextValue, rating);
      reviewsList.appendChild(newReview);

      // Increment the review count
      reviewCount++;

      // Clear the textarea and reset rating
      reviewText.value = "";
      rating = 0;
      updateStarsDisplay();

      // Provide feedback to the user
      alert("Your review has been submitted!");

      // Disable the submit button if 2 reviews have been submitted
      if (reviewCount >= 2) {
        submitButton.disabled = true;
        alert("You can only submit two reviews.");
      }
    } else {
      // Inform the user if they have reached the limit of 2 reviews
      alert("You have already submitted two reviews.");
    }
  } else {
    alert("You must write a review and select a rating!");
  }
});

// Enable the submit button again if the user clears the text area
reviewText.addEventListener("input", function() {
  if (reviewText.value.trim() === "") {
    submitButton.disabled = false; // Re-enable the button when the textarea is cleared
  }
});
});
}
