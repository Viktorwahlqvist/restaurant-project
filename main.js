// IMPORT DATABASE AND DISPLAY FUNCTION
import { db } from "./db.js";
import { displayMenu, searchMenu } from "./ui.js";

// Display menu, function from ui.js
displayMenu(db.drinks);
displayMenu(db.bbqs);
displayMenu(db.steaks);

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
calls searchMenu function from ui.js to filter the menu based on input */
searchInput.addEventListener('input', () => {
    // Calls searchMenu to filter and display search results
    searchMenu(searchInput.value, db);
});

function displayFeaturedItems(items, theme = 'food') {
    const container = document.getElementById("selection-container");
    container.innerHTML = ""; // Clear previous content

    items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("small-card");

        

        // Image element
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.dsc;

        img.onerror = () => {
            console.warn(`Image failed to load: ${item.name}`);
        };

        card.appendChild(img);

        // Add card content
        card.innerHTML += `
            <h3>${item.name}</h3>
        `;

        container.appendChild(card);
    });

    // Apply theme class
    const section = document.querySelector('.selected');
    section.className = theme === 'food' ? 'selected food-theme' : 'selected drinks-theme';
}

function addCarouselNavigation() {
    const container = document.getElementById("selection-container");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    // Scroll left
    leftBtn.addEventListener("click", () => {
        container.scrollLeft -= 300;
    });

    // Scroll right
    rightBtn.addEventListener("click", () => {
        container.scrollLeft += 300;
    });
}

function setupMenuToggles() {
    const weeklyFoodsBtn = document.getElementById("weekly-foods");
    const weeklyDrinksBtn = document.getElementById("weekly-drinks");

    // Add event listeners for weekly foods and drinks
    weeklyFoodsBtn.addEventListener("click", () => {
        displayFeaturedItems(db.weeklyFoods, 'food');
        toggleActive(weeklyFoodsBtn, weeklyDrinksBtn);
    });

    weeklyDrinksBtn.addEventListener("click", () => {
        displayFeaturedItems(db.weeklyDrinks, 'drinks');
        toggleActive(weeklyDrinksBtn, weeklyFoodsBtn);
    });

    // Initial Load: Display weekly foods by default
    displayFeaturedItems(db.weeklyFoods, 'food');
    toggleActive(weeklyFoodsBtn, weeklyDrinksBtn);
    addCarouselNavigation();
}

function toggleActive(active, inactive) {
    active.classList.add("active");
    inactive.classList.remove("active");
}

// Ensure this is called after the DOM is fully loaded
window.onload = setupMenuToggles;






