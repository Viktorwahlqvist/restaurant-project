// Import functions and database objects for displaying the menu and checkout.
import {db} from "./db.js";
import {displayMenu, displayWeeklyMenu, searchMenu, displayCheckOut} from "./ui.js";

// If user is on menu.html page, display menu, drinks, bbqs, and steaks in respective containers.
if (window.location.pathname.endsWith('menu.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Display drinks in the weekly container
        displayWeeklyMenu(db.weeklyDrinks, db.weeklyFoods);

        // Display bbqs and steaks in the main menu container
        displayMenu(db.bbqs);
        displayMenu(db.steaks);

        // Create a button that allows the user to navigate to the checkout page
        const checkOutBtn = document.createElement('button');
        const checkOutIcon = document.createElement("i");
        checkOutIcon.classList.add('bx', 'bx-cart');
        const header = document.querySelector('header');
        checkOutBtn.appendChild(checkOutIcon);
        checkOutBtn.classList.add('checkout-btn');
        checkOutBtn.classList.remove('display-info');
        checkOutBtn.id = 'CheckoutBtn';

        header.insertAdjacentElement('afterend', checkOutBtn);

        // Add an event listener to redirect the user to the checkout page when clicked
        checkOutBtn.addEventListener('click', () => {
            location.assign('checkout.html');
            displayCheckOut();
        });

        // Create an input field for searching the menu
        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Enter rating, country, or name.';
        searchInput.setAttribute('aria-label', 'Search for rating, country, or name');
        searchInput.classList.add('search-input');

        // Create a section that holds the search input field
        const inputSection = document.createElement('section');
        inputSection.classList.add('input-section');
        inputSection.appendChild(searchInput);

        // Use insertBefore to make the input section appear at the top of the webpage
        header.insertAdjacentElement('afterend', inputSection);

        // Event listener for the search input to filter the menu based on the input value
        searchInput.addEventListener('input', () => {
            searchMenu(searchInput.value, db);
        });
    });
}

// If user is on checkout.html page, display checkout.
if (window.location.pathname.endsWith('checkout.html')) {
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
// Contact Sida
document.querySelectorAll('.question').forEach(item => {
    item.addEventListener('click', event => {
        const answer = item.nextElementSibling;
        const arrow = item.querySelector('.arrow');
        
        // Byt värdet på aria-expanded för att indikera om svaret är öppet eller stängt
        const isExpanded = item.getAttribute('aria-expanded') === 'true';
        
        // När svaret ska öppnas
        if (isExpanded) {
            answer.style.maxHeight = '1px'; // Changed from null to 1px for better transition
            void answer.offsetHeight;  // Trigger reflow
            
            // Nu stänger vi svaret
            answer.style.maxHeight = '0';
            arrow.style.transform = 'rotate(0deg)';
            item.setAttribute('aria-expanded', 'false');
        } else {
            // För att öppna svaret, sätt max-height till scrollHeight
            answer.style.maxHeight = answer.scrollHeight + 'px';
            arrow.style.transform = 'rotate(180deg)';
            item.setAttribute('aria-expanded', 'true');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const weeklyFoods = document.getElementById('weekly-foods');
    if (weeklyFoods) {
        weeklyFoods.addEventListener('click', () => {
            populateSelectedCarousel('weeklyFoods');
        });
    } else {
        console.error("Element with ID 'weekly-foods' not found.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const weeklyFoods = document.getElementById('weekly-drinks');
    if (weeklyFoods) {
        weeklyFoods.addEventListener('click', () => {
            populateSelectedCarousel('weeklyDrinks');
        });
    } else {
        console.error("Element with ID 'weekly-drinks' not found.");
    }
});

// Add event listeners for the buttons
document.getElementById('weekly-foods').addEventListener('click', () => {
    document.getElementById('weekly-foods').classList.add('active');
    document.getElementById('weekly-drinks').classList.remove('active');
});

document.getElementById('weekly-drinks').addEventListener('click', () => {
    document.getElementById('weekly-drinks').classList.add('active');
    document.getElementById('weekly-foods').classList.remove('active');

    
});

// Get references to buttons and weekly container
const weeklyFoodsButton = document.getElementById('weekly-foods');
const weeklyDrinksButton = document.getElementById('weekly-drinks');

// Function to switch carousel content
function switchWeeklyContent(category) {
    if (category === 'weeklyFoods') {
        displayWeeklyMenu(db.weeklyFoods); // Display Weekly Foods
    } else if (category === 'weeklyDrinks') {
        displayWeeklyMenu(db.weeklyDrinks); // Display Weekly Drinks
    }
}

// Add event listeners for buttons
weeklyFoodsButton.addEventListener('click', () => {
    weeklyFoodsButton.classList.add('active');
    weeklyDrinksButton.classList.remove('active');
    switchWeeklyContent('weeklyFoods');
});

weeklyDrinksButton.addEventListener('click', () => {
    weeklyDrinksButton.classList.add('active');
    weeklyFoodsButton.classList.remove('active');
    switchWeeklyContent('weeklyDrinks');
});

// Initialize with Weekly Foods on page load
document.addEventListener('DOMContentLoaded', () => {
    weeklyFoodsButton.classList.add('active');
    switchWeeklyContent('weeklyFoods');
});






